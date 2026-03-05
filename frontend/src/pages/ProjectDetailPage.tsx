import { useParams, Link, useNavigate } from 'react-router';
import { useEffect, useRef, useState } from 'react';
import { gsap } from '../shared/lib/gsap-init';
import { ArrowLeft, ArrowRight, MapPin, Ruler, Clock, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { PremiumTextReveal } from '../shared/ui/PremiumTextReveal';
import { getProjectBySlug } from '../services/projectsAPI';
import { LoadingSpinner } from '../shared/ui/LoadingSpinner';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

function resolveUrl(src: string | undefined | null): string {
  if (!src) return '';
  if (src.startsWith('http://') || src.startsWith('https://')) return src;
  return `${BACKEND_URL}${src.startsWith('/') ? src : `/${src}`}`;
}

interface ProjectImage { before: string; after: string; label?: string; }

interface ProjectDetail {
  id: number; slug: string; number: string; title: string;
  category: string; location: string; description: string;
  image?: string; thumbnail_image?: string;
  images: ProjectImage[]; duration?: string; surface?: string;
}

// ─── Fullscreen Before/After Lightbox ────────────────────────────────────────
function ImageLightbox({ images, currentIndex, onClose, onNavigate }: {
  images: ProjectImage[]; currentIndex: number;
  onClose: () => void; onNavigate: (dir: 'prev' | 'next') => void;
}) {
  const [viewMode, setViewMode] = useState<'before' | 'after'>('after');
  useEffect(() => { setViewMode('after'); }, [currentIndex]);
  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onNavigate('prev');
      if (e.key === 'ArrowRight') onNavigate('next');
    };
    window.addEventListener('keydown', handle);
    return () => window.removeEventListener('keydown', handle);
  }, [onClose, onNavigate]);

  const img = images[currentIndex];
  const src = viewMode === 'before' ? img.before : img.after;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.96)', backdropFilter: 'blur(20px)' }}
      onClick={onClose}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 z-50"
      >
        <X className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
      </button>

      {/* Toggle — Avant / Après */}
      <div className="flex justify-center mb-3 sm:mb-5 z-10 px-4" onClick={e => e.stopPropagation()}>
        <div className="inline-flex rounded-full overflow-hidden border border-white/20"
          style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(20px)' }}>
          {(['before', 'after'] as const).map(mode => (
            <button key={mode} onClick={() => setViewMode(mode)}
              className={`px-6 sm:px-8 py-2.5 sm:py-3 text-xs sm:text-sm font-bold uppercase tracking-widest transition-all ${viewMode === mode ? 'bg-white text-black' : 'text-white/60 hover:text-white'}`}>
              {mode === 'before' ? 'Avant' : 'Après'}
            </button>
          ))}
        </div>
      </div>

      {/* Image — full width on mobile, max-w on desktop */}
      <div
        className="relative w-full max-w-[96vw] sm:max-w-[90vw] lg:max-w-7xl sm:px-14 px-0"
        onClick={e => e.stopPropagation()}
      >
        <div
          className="relative overflow-hidden w-full"
          style={{
            /* Mobile: near-fullscreen portrait; desktop: large */
            height: 'min(80vh, 95vw)',
          }}
        >
          <img
            key={src}
            src={src}
            alt={viewMode === 'before' ? 'Avant' : 'Après'}
            className="w-full h-full object-contain"
          />
          {/* Label badge */}
          <div className="absolute bottom-4 left-4 px-3 py-1.5"
            style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(10px)', clipPath: 'polygon(6px 0, calc(100% - 6px) 0, 100% 6px, 100% calc(100% - 6px), calc(100% - 6px) 100%, 6px 100%, 0 calc(100% - 6px), 0 6px)' }}>
            <span className="text-white text-xs sm:text-sm font-semibold uppercase tracking-wider">
              {viewMode === 'before' ? 'Avant Rénovation' : 'Après Rénovation'}
            </span>
          </div>
          <div className="absolute bottom-4 right-4 text-right">
            {img.label && <p className="text-white text-xs sm:text-sm font-medium mb-1">{img.label}</p>}
            {images.length > 1 && <p className="text-white/50 text-xs">{currentIndex + 1} / {images.length}</p>}
          </div>
        </div>

        {/* Prev / Next — overlaid on sides, only if multiple images */}
        {images.length > 1 && (
          <>
            <button
              onClick={e => { e.stopPropagation(); onNavigate('prev'); }}
              className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 z-50"
            >
              <ChevronLeft className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
            </button>
            <button
              onClick={e => { e.stopPropagation(); onNavigate('next'); }}
              className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 z-50"
            >
              <ChevronRight className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<ProjectDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => { if (slug) loadProject(); }, [slug]);

  const loadProject = async () => {
    try {
      setLoading(true);
      const data = await getProjectBySlug(slug!);
      setProject({
        id: data.id, slug: data.slug, number: data.number, title: data.title,
        category: data.category, location: data.location, description: data.description,
        duration: data.duration, surface: data.surface,
        image: resolveUrl((data as any).image),
        thumbnail_image: resolveUrl((data as any).thumbnail_image),
        images: ((data as any).images ?? []).map((img: any) => ({
          before: resolveUrl(img.before_image ?? img.before ?? ''),
          after: resolveUrl(img.after_image ?? img.after ?? ''),
          label: img.label,
        })),
      });
    } catch { setError('Projet non trouvé'); }
    finally { setLoading(false); }
  };

  const navigateImage = (dir: 'prev' | 'next') => {
    if (!project) return;
    const max = project.images.length - 1;
    setSelectedImageIndex(prev => dir === 'prev' ? (prev > 0 ? prev - 1 : max) : (prev < max ? prev + 1 : 0));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (heroRef.current && project) {
      gsap.fromTo(heroRef.current.querySelectorAll('.animate-in'), { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: 'power3.out' });
    }
    if (contentRef.current && project) {
      contentRef.current.querySelectorAll('.fade-in').forEach(el => {
        gsap.fromTo(el, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' } });
      });
    }
  }, [project]);

  if (loading) return <LoadingSpinner fullScreen text="Chargement du projet..." />;
  if (error || !project) {
    return (
      <div className="min-h-screen bg-[#FAFAF9] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4" style={{ color: '#2A2522' }}>Projet non trouvé</h1>
          <Link to="/realisations" className="inline-flex items-center gap-2 px-6 py-3 font-medium" style={{ background: 'rgba(0,0,0,0.85)', color: '#F6F2E8', clipPath: 'polygon(8px 0, calc(100% - 8px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px), 0 8px)' }}>
            <ArrowLeft className="w-5 h-5" /> Retour aux projets
          </Link>
        </div>
      </div>
    );
  }

  const glassStyle: React.CSSProperties = {
    background: 'rgba(255,255,255,0.4)',
    backdropFilter: 'blur(40px) saturate(180%)',
    WebkitBackdropFilter: 'blur(40px) saturate(180%)',
    boxShadow: '0 8px 32px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.2)',
    border: '1px solid rgba(255,255,255,0.3)',
  };
  const clip12 = 'polygon(12px 0, calc(100% - 12px) 0, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px), 0 12px)';
  const clip8 = 'polygon(8px 0, calc(100% - 8px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px), 0 8px)';

  // Parse multi-paragraph description
  const descriptionParagraphs = project.description
    ? project.description.split(/\n\n+/).filter(p => p.trim())
    : [];

  // Hero image: explicit image > thumbnail_image > first after image
  const heroImage = project.image || project.thumbnail_image
    || (project.images.length > 0 ? (project.images[0].after || project.images[0].before) : '');

  return (
    <div className="min-h-screen bg-[#FAFAF9]">

      {/* ── 1. HEADER ── */}
      <section ref={heroRef} className="px-4 pt-32 pb-8">
        <div className="max-w-5xl mx-auto">
          <button onClick={() => navigate('/realisations')} className="inline-flex items-center gap-2 px-5 py-2.5 mb-6 font-medium transition-all hover:scale-105 animate-in"
            style={{ ...glassStyle, clipPath: clip8, color: '#2A2522' }}>
            <ArrowLeft className="w-4 h-4" /> Retour aux projets
          </button>
          <div className="inline-flex px-5 py-2 mb-5 animate-in" style={{ ...glassStyle, clipPath: clip8 }}>
            <span className="text-xs font-medium uppercase tracking-widest" style={{ color: '#2A2522' }}>PROJET {project.number}</span>
          </div>
          <PremiumTextReveal>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-[0.95] mb-0" style={{ color: '#2A2522' }}>
              {project.title}
            </h1>
          </PremiumTextReveal>
        </div>
      </section>

      {/* ── 2. HERO IMAGE ── */}
      {heroImage && (
        <section className="px-4 pb-8">
          <div className="max-w-5xl mx-auto">
            <div className="overflow-hidden animate-in" style={{ aspectRatio: '16/9', clipPath: 'polygon(16px 0, calc(100% - 16px) 0, 100% 16px, 100% calc(100% - 16px), calc(100% - 16px) 100%, 16px 100%, 0 calc(100% - 16px), 0 16px)', boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}>
              <img src={heroImage} alt={project.title} className="w-full h-full object-cover" />
            </div>
          </div>
        </section>
      )}

      {/* ── 3. SPECS BAR ── */}
      <section className="px-4 pb-10">
        <div className="max-w-5xl mx-auto">
          <div className="fade-in flex flex-wrap gap-6 sm:gap-10 px-6 py-5 sm:px-10 sm:py-6" style={{ ...glassStyle, clipPath: clip12 }}>
            {project.location && (
              <div className="flex items-center gap-2.5">
                <MapPin className="w-5 h-5 flex-shrink-0" style={{ color: '#2A2522' }} />
                <div>
                  <p className="text-xs uppercase tracking-wider mb-0.5" style={{ color: '#9A9A9A' }}>Localisation</p>
                  <p className="font-semibold text-sm sm:text-base" style={{ color: '#2A2522' }}>{project.location}</p>
                </div>
              </div>
            )}
            {project.duration && (
              <div className="flex items-center gap-2.5">
                <Clock className="w-5 h-5 flex-shrink-0" style={{ color: '#2A2522' }} />
                <div>
                  <p className="text-xs uppercase tracking-wider mb-0.5" style={{ color: '#9A9A9A' }}>Durée</p>
                  <p className="font-semibold text-sm sm:text-base" style={{ color: '#2A2522' }}>{project.duration}</p>
                </div>
              </div>
            )}
            {project.surface && (
              <div className="flex items-center gap-2.5">
                <Ruler className="w-5 h-5 flex-shrink-0" style={{ color: '#2A2522' }} />
                <div>
                  <p className="text-xs uppercase tracking-wider mb-0.5" style={{ color: '#9A9A9A' }}>Surface</p>
                  <p className="font-semibold text-sm sm:text-base" style={{ color: '#2A2522' }}>{project.surface} m²</p>
                </div>
              </div>
            )}
            {project.category && (
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 flex-shrink-0 flex items-center justify-center">
                  <span className="text-lg leading-none">🏷</span>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider mb-0.5" style={{ color: '#9A9A9A' }}>Catégorie</p>
                  <p className="font-semibold text-sm sm:text-base capitalize" style={{ color: '#2A2522' }}>{project.category}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── 4. THE STORY ── */}
      {descriptionParagraphs.length > 0 && (
        <section ref={contentRef} className="px-4 pb-10">
          <div className="max-w-5xl mx-auto">
            <div className="fade-in p-8 sm:p-12" style={{ ...glassStyle, clipPath: clip12 }}>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6" style={{ color: '#2A2522' }}>Le projet</h2>
              <div className="space-y-5">
                {descriptionParagraphs.map((para, i) => (
                  <p key={i} className="text-base sm:text-lg leading-relaxed" style={{ color: '#5A5A5A' }}>{para}</p>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── 5. GALLERY — Before & After ── */}
      {project.images.length > 0 && (
        <section className="px-4 pb-10">
          <div className="max-w-5xl mx-auto">
            <div className="fade-in">
              <h2 className="text-2xl sm:text-3xl font-bold mb-2" style={{ color: '#2A2522' }}>Galerie Avant / Après</h2>
              <p className="text-sm mb-6" style={{ color: '#5A5A5A' }}>Cliquez sur une image pour l'agrandir et comparer</p>

              {/* Grid: 1 col mobile, 2 col md+ */}
              <div className={`grid gap-4 sm:gap-5 ${project.images.length === 1 ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'}`}>
                {project.images.map((image, idx) => (
                  <button
                    key={idx}
                    onClick={() => { setSelectedImageIndex(idx); setLightboxOpen(true); }}
                    className="relative group transition-all duration-300 hover:scale-[1.02] focus:outline-none"
                    style={{
                      display: 'block', width: '100%',
                      /* Mobile: tall enough to actually see the image */
                      aspectRatio: project.images.length === 1 ? '16/9' : '4/3',
                      overflow: 'hidden',
                      clipPath: 'polygon(12px 0, calc(100% - 12px) 0, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px), 0 12px)',
                    }}
                  >
                    <img
                      src={image.after || image.before}
                      alt={`${project.title} — Après ${idx + 1}`}
                      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                      onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
                    />
                    {/* APRÈS badge */}
                    <div className="absolute top-3 left-3 px-3 py-1.5" style={{ background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(10px)', clipPath: 'polygon(4px 0, calc(100% - 4px) 0, 100% 4px, 100% calc(100% - 4px), calc(100% - 4px) 100%, 4px 100%, 0 calc(100% - 4px), 0 4px)' }}>
                      <span className="text-white text-xs font-bold uppercase tracking-widest">Après</span>
                    </div>
                    {/* Hover overlay */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2"
                      style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)' }}>
                      <span className="text-white text-base sm:text-lg font-bold uppercase tracking-wider">Voir Avant / Après</span>
                      {image.label && <span className="text-white/70 text-sm">{image.label}</span>}
                    </div>
                    {/* Label */}
                    {image.label && (
                      <div className="absolute bottom-3 right-3 px-3 py-1" style={{ background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(10px)', clipPath: 'polygon(4px 0, calc(100% - 4px) 0, 100% 4px, 100% calc(100% - 4px), calc(100% - 4px) 100%, 4px 100%, 0 calc(100% - 4px), 0 4px)' }}>
                        <span className="text-white text-xs font-medium">{image.label}</span>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── 6. CTA ── */}
      <section className="px-4 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="fade-in p-10 sm:p-14 text-center" style={{ ...glassStyle, clipPath: 'polygon(16px 0, calc(100% - 16px) 0, 100% 16px, 100% calc(100% - 16px), calc(100% - 16px) 100%, 16px 100%, 0 calc(100% - 16px), 0 16px)' }}>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4" style={{ color: '#2A2522' }}>
              Cette transformation vous inspire ?
            </h2>
            <p className="text-base sm:text-lg mb-8 max-w-xl mx-auto leading-relaxed" style={{ color: '#5A5A5A' }}>
              Discutons de votre projet et découvrons ensemble comment nous pouvons transformer votre espace.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 font-bold transition-all hover:scale-105"
                style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(40px)', color: '#F6F2E8', clipPath: clip12, border: '1px solid rgba(80,80,80,0.25)', textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: '0.875rem' }}>
                Démarrer mon projet <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/realisations" className="inline-flex items-center justify-center gap-2 px-8 py-4 font-bold transition-all hover:scale-105"
                style={{ background: 'rgba(255,255,255,0.6)', backdropFilter: 'blur(40px)', color: '#2A2522', clipPath: clip12, border: '1px solid rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: '0.875rem' }}>
                Voir tous les projets
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxOpen && (
        <ImageLightbox images={project.images} currentIndex={selectedImageIndex} onClose={() => setLightboxOpen(false)} onNavigate={navigateImage} />
      )}
    </div>
  );
}