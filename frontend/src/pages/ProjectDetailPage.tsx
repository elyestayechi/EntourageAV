import { useParams, Link, useNavigate } from 'react-router';
import { useEffect, useRef, useState } from 'react';
import { gsap } from '../shared/lib/gsap-init';
import { 
  ArrowLeft, Calendar, MapPin, Ruler, Clock,
  ChevronLeft, ChevronRight, X
} from 'lucide-react';
import { PremiumTextReveal } from '../shared/ui/PremiumTextReveal';
import { getProjectBySlug } from '../services/projectsAPI';
import { LoadingSpinner } from '../shared/ui/LoadingSpinner';
import { getImageUrl } from '../shared/utils/images';

interface ProjectImage {
  before: string;
  after: string;
  label?: string;
}

// Only fields actually returned by the API
interface ProjectDetail {
  id: number;
  slug: string;
  number: string;
  title: string;
  category: string;
  location: string;
  description: string;
  images: ProjectImage[];
  duration?: string;
  surface?: string;
}

function ImageLightbox({ 
  images, currentIndex, onClose, onNavigate 
}: { 
  images: ProjectImage[], currentIndex: number, onClose: () => void,
  onNavigate: (direction: 'prev' | 'next') => void
}) {
  const [viewMode, setViewMode] = useState<'before' | 'after'>('before');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onNavigate('prev');
      if (e.key === 'ArrowRight') onNavigate('next');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onNavigate]);

  const currentImage = images[currentIndex];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0, 0, 0, 0.95)', backdropFilter: 'blur(20px)' }}
      onClick={onClose}
    >
      <button onClick={onClose} className="absolute top-6 right-6 p-4 transition-all duration-300 hover:opacity-70 z-50">
        <X className="w-6 h-6 text-white drop-shadow-lg" />
      </button>
      {images.length > 1 && (
        <>
          <button onClick={(e) => { e.stopPropagation(); onNavigate('prev'); }} className="absolute left-6 p-4 transition-all duration-300 hover:opacity-70 z-50">
            <ChevronLeft className="w-8 h-8 text-white drop-shadow-lg" />
          </button>
          <button onClick={(e) => { e.stopPropagation(); onNavigate('next'); }} className="absolute right-6 p-4 transition-all duration-300 hover:opacity-70 z-50">
            <ChevronRight className="w-8 h-8 text-white drop-shadow-lg" />
          </button>
        </>
      )}
      <div className="relative max-w-6xl w-full" onClick={(e) => e.stopPropagation()}>
        <div className="relative aspect-video overflow-hidden" style={{ clipPath: 'polygon(16px 0, calc(100% - 16px) 0, 100% 16px, 100% calc(100% - 16px), calc(100% - 16px) 100%, 16px 100%, 0 calc(100% - 16px), 0 16px)' }}>
          <img
            src={viewMode === 'before' ? getImageUrl(currentImage.before) : getImageUrl(currentImage.after)}
            alt={viewMode === 'before' ? 'Avant' : 'Après'}
            className="w-full h-full object-cover transition-opacity duration-500"
          />
          <div className="absolute top-6 left-1/2 -translate-x-1/2 flex items-center gap-6">
            <button onClick={() => setViewMode('before')} className={`px-2 py-1 text-sm font-bold tracking-wider transition-all duration-300 ${viewMode === 'before' ? 'opacity-100 scale-110' : 'opacity-50 hover:opacity-75'}`}>
              <span className="text-white drop-shadow-lg">AVANT</span>
            </button>
            <span className="text-white/30">|</span>
            <button onClick={() => setViewMode('after')} className={`px-2 py-1 text-sm font-bold tracking-wider transition-all duration-300 ${viewMode === 'after' ? 'opacity-100 scale-110' : 'opacity-50 hover:opacity-75'}`}>
              <span className="text-white drop-shadow-lg">APRÈS</span>
            </button>
          </div>
          <div className="absolute bottom-6 left-6">
            <span className="text-white text-sm font-medium drop-shadow-lg">{viewMode === 'before' ? 'Avant Rénovation' : 'Après Rénovation'}</span>
          </div>
          <div className="absolute bottom-6 right-6 text-right">
            {currentImage.label && <p className="text-white text-sm font-medium drop-shadow-lg mb-1">{currentImage.label}</p>}
            {images.length > 1 && <p className="text-white/60 text-xs drop-shadow-lg">{currentIndex + 1} / {images.length}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

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

  useEffect(() => {
    if (slug) loadProject();
  }, [slug]);

  const loadProject = async () => {
    try {
      setLoading(true);
      const data = await getProjectBySlug(slug!);
      // Map API image shape (before_image/after_image) to local shape (before/after)
      const mapped: ProjectDetail = {
        id: data.id,
        slug: data.slug,
        number: data.number,
        title: data.title,
        category: data.category,
        location: data.location,
        description: data.description,
        duration: data.duration,
        surface: data.surface,
        images: (data.images ?? []).map((img: any) => ({
          before: img.before_image ?? img.before ?? '',
          after: img.after_image ?? img.after ?? '',
          label: img.label,
        })),
      };
      setProject(mapped);
    } catch {
      setError('Projet non trouvé');
    } finally {
      setLoading(false);
    }
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (!project) return;
    const maxIndex = project.images.length - 1;
    setSelectedImageIndex(prev => direction === 'prev' ? (prev > 0 ? prev - 1 : maxIndex) : (prev < maxIndex ? prev + 1 : 0));
  };

  useEffect(() => {
    if (heroRef.current && project) {
      gsap.fromTo(heroRef.current.querySelectorAll('.animate-in'), { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: 'power3.out' });
    }
    if (contentRef.current && project) {
      contentRef.current.querySelectorAll('.fade-in-section').forEach((element) => {
        gsap.fromTo(element, { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: element, start: 'top 85%', toggleActions: 'play none none none' } });
      });
    }
  }, [project]);

  if (loading) return <LoadingSpinner fullScreen text="Chargement du projet..." />;

  if (error || !project) {
    return (
      <div className="min-h-screen bg-[#FAFAF9] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4" style={{ color: '#2A2522' }}>Projet non trouvé</h1>
          <Link to="/realisations" className="inline-flex items-center gap-2 px-6 py-3 font-medium transition-all duration-300" style={{ background: 'rgba(0, 0, 0, 0.85)', color: 'var(--color-base-cream)', clipPath: 'polygon(8px 0, calc(100% - 8px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px), 0 8px)' }}>
            <ArrowLeft className="w-5 h-5" />
            Retour aux projets
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAF9]">
      {/* Hero */}
      <section ref={heroRef} className="relative min-h-[60vh] flex items-center justify-center px-4 pt-32 pb-20">
        <div className="max-w-5xl mx-auto w-full relative z-10">
          <button
            onClick={() => navigate('/realisations')}
            className="inline-flex items-center gap-2 px-6 py-3 mb-8 font-medium transition-all duration-300 hover:scale-105 animate-in"
            style={{ background: 'rgba(255, 255, 255, 0.6)', backdropFilter: 'blur(40px) saturate(180%)', WebkitBackdropFilter: 'blur(40px) saturate(180%)', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)', border: '1px solid rgba(255, 255, 255, 0.5)', clipPath: 'polygon(8px 0, calc(100% - 8px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px), 0 8px)', color: '#2A2522' }}
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Retour aux projets</span>
          </button>

          <div className="inline-flex px-6 py-3 mb-6 animate-in" style={{ background: 'rgba(255, 255, 255, 0.4)', backdropFilter: 'blur(40px) saturate(180%)', WebkitBackdropFilter: 'blur(40px) saturate(180%)', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)', border: '1px solid rgba(255, 255, 255, 0.3)', clipPath: 'polygon(8px 0, calc(100% - 8px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px), 0 8px)' }}>
            <span className="text-sm font-medium" style={{ color: '#2A2522' }}>PROJET {project.number}</span>
          </div>

          <PremiumTextReveal>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 leading-[0.95]" style={{ color: '#2A2522' }}>{project.title}</h1>
          </PremiumTextReveal>

          <div className="flex flex-wrap gap-4 mb-6 animate-in">
            <div className="flex items-center gap-2" style={{ color: '#5A5A5A' }}>
              <MapPin className="w-5 h-5" />
              <span className="font-medium">{project.location}</span>
            </div>
            {project.duration && (
              <div className="flex items-center gap-2" style={{ color: '#5A5A5A' }}>
                <Clock className="w-5 h-5" />
                <span className="font-medium">{project.duration}</span>
              </div>
            )}
            {project.surface && (
              <div className="flex items-center gap-2" style={{ color: '#5A5A5A' }}>
                <Ruler className="w-5 h-5" />
                <span className="font-medium">{project.surface}</span>
              </div>
            )}
          </div>

          <p className="text-lg sm:text-xl max-w-3xl leading-relaxed animate-in" style={{ color: '#5A5A5A' }}>{project.description}</p>
        </div>
      </section>

      {/* Stats (only show available data) */}
      {(project.surface || project.duration) && (
        <section className="py-12 px-4 bg-[#FAFAF9]">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-wrap justify-center gap-12 p-8" style={{ background: 'rgba(255, 255, 255, 0.4)', backdropFilter: 'blur(40px) saturate(180%)', WebkitBackdropFilter: 'blur(40px) saturate(180%)', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)', border: '1px solid rgba(255, 255, 255, 0.3)', clipPath: 'polygon(12px 0, calc(100% - 12px) 0, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px), 0 12px)' }}>
              {project.surface && (
                <div className="text-center">
                  <Ruler className="w-8 h-8 mx-auto mb-3" style={{ color: '#2A2522' }} />
                  <div className="text-2xl font-bold mb-1" style={{ color: '#2A2522' }}>{project.surface}</div>
                  <div className="text-sm" style={{ color: '#5A5A5A' }}>Surface</div>
                </div>
              )}
              {project.duration && (
                <div className="text-center">
                  <Clock className="w-8 h-8 mx-auto mb-3" style={{ color: '#2A2522' }} />
                  <div className="text-2xl font-bold mb-1" style={{ color: '#2A2522' }}>{project.duration}</div>
                  <div className="text-sm" style={{ color: '#5A5A5A' }}>Durée</div>
                </div>
              )}
              <div className="text-center">
                <Calendar className="w-8 h-8 mx-auto mb-3" style={{ color: '#2A2522' }} />
                <div className="text-2xl font-bold mb-1" style={{ color: '#2A2522' }}>{project.category}</div>
                <div className="text-sm" style={{ color: '#5A5A5A' }}>Catégorie</div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Main Content */}
      <section ref={contentRef} className="py-20 px-4 bg-[#FAFAF9]">
        <div className="max-w-5xl mx-auto space-y-16">

          {/* Images Gallery */}
          {project.images.length > 0 && (
            <div className="fade-in-section">
              <h2 className="text-3xl font-bold mb-8" style={{ color: '#2A2522' }}>Transformation Visuelle</h2>
              <div className={`grid gap-6 ${project.images.length === 1 ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'}`}>
                {project.images.map((image, idx) => (
                  <button
                    key={idx}
                    onClick={() => { setSelectedImageIndex(idx); setLightboxOpen(true); }}
                    className="relative group overflow-hidden transition-all duration-300 hover:scale-[1.02]"
                    style={{ clipPath: 'polygon(12px 0, calc(100% - 12px) 0, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px), 0 12px)', aspectRatio: project.images.length === 1 ? '16/9' : '4/3' }}
                  >
                    <img src={getImageUrl(image.before)} alt={`${project.title} - ${image.label ?? `Image ${idx + 1}`}`} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center" style={{ background: 'rgba(0, 0, 0, 0.6)', backdropFilter: 'blur(4px)' }}>
                      <div className="text-white text-center">
                        <p className="text-lg font-medium mb-2">Voir Avant / Après</p>
                        {image.label && <p className="text-sm opacity-75">{image.label}</p>}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Description */}
          <div className="fade-in-section p-8" style={{ background: 'rgba(255, 255, 255, 0.4)', backdropFilter: 'blur(40px) saturate(180%)', WebkitBackdropFilter: 'blur(40px) saturate(180%)', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)', border: '1px solid rgba(255, 255, 255, 0.3)', clipPath: 'polygon(12px 0, calc(100% - 12px) 0, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px), 0 12px)' }}>
            <h2 className="text-3xl font-bold mb-6" style={{ color: '#2A2522' }}>Description du Projet</h2>
            <p className="text-lg leading-relaxed" style={{ color: '#5A5A5A' }}>{project.description}</p>
            <div className="mt-6 pt-6 border-t border-white/20">
              <p className="text-sm font-medium" style={{ color: '#5A5A5A' }}>
                <strong style={{ color: '#2A2522' }}>Catégorie:</strong> {project.category}
              </p>
              <p className="text-sm font-medium mt-2" style={{ color: '#5A5A5A' }}>
                <strong style={{ color: '#2A2522' }}>Localisation:</strong> {project.location}
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="fade-in-section p-12 text-center" style={{ background: 'rgba(255, 255, 255, 0.4)', backdropFilter: 'blur(40px) saturate(180%)', WebkitBackdropFilter: 'blur(40px) saturate(180%)', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)', border: '1px solid rgba(255, 255, 255, 0.3)', clipPath: 'polygon(16px 0, calc(100% - 16px) 0, 100% 16px, 100% calc(100% - 16px), calc(100% - 16px) 100%, 16px 100%, 0 calc(100% - 16px), 0 16px)' }}>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6" style={{ color: '#2A2522' }}>Un Projet Similaire en Tête ?</h2>
            <p className="text-lg mb-8 leading-relaxed max-w-2xl mx-auto" style={{ color: '#5A5A5A' }}>Contactez-nous pour discuter de votre projet et découvrir comment nous pouvons vous aider à le concrétiser.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="inline-flex items-center justify-center gap-3 px-10 py-5 font-medium transition-all duration-300 hover:scale-105" style={{ background: 'rgba(0, 0, 0, 0.85)', backdropFilter: 'blur(40px) saturate(180%)', WebkitBackdropFilter: 'blur(40px) saturate(180%)', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.06)', border: '1px solid rgba(80, 80, 80, 0.25)', clipPath: 'polygon(12px 0, calc(100% - 12px) 0, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px), 0 12px)', color: 'var(--color-base-cream)' }}>
                <span className="uppercase tracking-wider text-sm font-bold">Contactez-Nous</span>
              </Link>
              <Link to="/realisations" className="inline-flex items-center justify-center gap-3 px-10 py-5 font-medium transition-all duration-300 hover:scale-105" style={{ background: 'rgba(255, 255, 255, 0.6)', backdropFilter: 'blur(40px) saturate(180%)', WebkitBackdropFilter: 'blur(40px) saturate(180%)', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)', border: '1px solid rgba(255, 255, 255, 0.5)', clipPath: 'polygon(12px 0, calc(100% - 12px) 0, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px), 0 12px)', color: '#2A2522' }}>
                <span className="uppercase tracking-wider text-sm font-bold">Voir Tous Les Projets</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {lightboxOpen && (
        <ImageLightbox images={project.images} currentIndex={selectedImageIndex} onClose={() => setLightboxOpen(false)} onNavigate={navigateImage} />
      )}
    </div>
  );
}