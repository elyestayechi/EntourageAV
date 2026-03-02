import { Link } from 'react-router';
import { useState, useRef, useEffect } from 'react';
import { gsap } from '../shared/lib/gsap-init';
import { MapPin, ArrowRight } from 'lucide-react';
import { PremiumTextReveal } from '../shared/ui/PremiumTextReveal';
import { getAllProjects } from '../services/projectsAPI';
import { LoadingSpinner } from '../shared/ui/LoadingSpinner';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

function resolveUrl(src: string | undefined | null): string {
  if (!src) return '';
  if (src.startsWith('http://') || src.startsWith('https://')) return src;
  return `${BACKEND_URL}${src.startsWith('/') ? src : `/${src}`}`;
}

interface Project {
  id: number;
  slug: string;
  number: string;
  title: string;
  category: string;
  location: string;
  duration?: string;
  surface?: string;
  image?: string;
  thumbnail_image?: string;
  images: Array<{ before: string; after: string; label?: string }>;
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState('tous');
  const [projects, setProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const heroRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  useEffect(() => { loadProjects(); }, []);

  const loadProjects = async () => {
    try {
      setLoading(true);
      const data = await getAllProjects();
      const mapped: Project[] = data.map((p: any) => ({
        id: p.id,
        slug: p.slug,
        number: p.number,
        title: p.title,
        category: p.category,
        location: p.location,
        duration: p.duration,
        surface: p.surface,
        image: resolveUrl(p.image),
        thumbnail_image: resolveUrl(p.thumbnail_image),
        images: (p.images ?? []).map((img: any) => ({
          before: resolveUrl(img.before_image ?? img.before ?? ''),
          after: resolveUrl(img.after_image ?? img.after ?? ''),
          label: img.label,
        })),
      }));
      setProjects(mapped);
      // Derive categories from data
      const cats = Array.from(new Set(mapped.map(p => p.category).filter(Boolean)));
      setCategories(cats);
    } catch {
      setError('Impossible de charger les projets. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  // Thumbnail selection: thumbnail_image > first after image > first before image > main image
  const getThumbnail = (project: Project): string => {
    if (project.thumbnail_image) return project.thumbnail_image;
    if (project.images.length > 0) return project.images[0].after || project.images[0].before;
    return project.image || '';
  };

  const filteredProjects = selectedCategory === 'tous'
    ? projects
    : projects.filter(p => p.category === selectedCategory);

  useEffect(() => {
    if (heroRef.current) {
      gsap.fromTo(heroRef.current.querySelectorAll('.animate-in'), { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: 'power3.out' });
    }
  }, []);

  useEffect(() => {
    if (projectsRef.current && !loading) {
      projectsRef.current.querySelectorAll('.project-card').forEach(card => {
        gsap.fromTo(card, { opacity: 0, y: 60, scale: 0.97 }, { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'play none none none' } });
      });
    }
  }, [filteredProjects, loading]);

  if (loading) return <LoadingSpinner fullScreen text="Chargement des projets..." />;

  if (error) {
    return (
      <div className="min-h-screen bg-[#FAFAF9] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4" style={{ color: '#2A2522' }}>Oups! Une erreur est survenue</h1>
          <p className="text-lg mb-8" style={{ color: '#5A5A5A' }}>{error}</p>
          <button onClick={loadProjects} className="px-6 py-3 font-medium transition-all" style={{ background: '#2A2522', color: '#fff', clipPath: 'polygon(8px 0, calc(100% - 8px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px), 0 8px)' }}>Réessayer</button>
        </div>
      </div>
    );
  }

  const glassStyle: React.CSSProperties = {
    background: 'rgba(255, 255, 255, 0.4)',
    backdropFilter: 'blur(40px) saturate(180%)',
    WebkitBackdropFilter: 'blur(40px) saturate(180%)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
  };

  const clip12 = 'polygon(12px 0, calc(100% - 12px) 0, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px), 0 12px)';
  const clip8 = 'polygon(8px 0, calc(100% - 8px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px), 0 8px)';

  return (
    <div className="min-h-screen bg-[#FAFAF9]">
      {/* ── Hero ── */}
      <section ref={heroRef} className="relative min-h-[50vh] flex items-center justify-center px-4 pt-32 pb-20">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex px-6 py-3 mb-6 animate-in" style={{ ...glassStyle, clipPath: clip8 }}>
            <span className="text-sm font-medium" style={{ color: '#2A2522' }}>RÉALISATIONS</span>
          </div>
          <PremiumTextReveal>
            <h1 className="text-3xl sm:text-5xl lg:text-7xl xl:text-8xl font-bold mb-6 leading-[1.0]" style={{ color: '#2A2522' }}>
              NOS TRANSFORMATIONS<br />À LA LOUPE
            </h1>
          </PremiumTextReveal>
          <p className="text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed animate-in" style={{ color: '#5A5A5A' }}>
            Découvrez nos projets de rénovation réalisés avec passion et expertise.
          </p>
        </div>
      </section>

      {/* ── Filters ── */}
      <section className="py-6 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="p-6 mb-6" style={{ ...glassStyle, clipPath: clip12 }}>
            <h3 className="text-sm font-medium mb-4 uppercase tracking-wider" style={{ color: '#2A2522' }}>Filtrer par catégorie</h3>
            <div className="flex flex-wrap gap-2">
              {/* "Tous" pill */}
              <button
                onClick={() => setSelectedCategory('tous')}
                className="px-5 py-2 text-sm font-medium transition-all duration-300"
                style={{
                  background: selectedCategory === 'tous' ? 'rgba(0,0,0,0.85)' : 'rgba(255,255,255,0.6)',
                  color: selectedCategory === 'tous' ? '#F6F2E8' : '#2A2522',
                  clipPath: clip8,
                  border: '1px solid rgba(255,255,255,0.4)',
                }}
              >
                Tous les projets
              </button>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className="px-5 py-2 text-sm font-medium transition-all duration-300 capitalize"
                  style={{
                    background: selectedCategory === cat ? 'rgba(0,0,0,0.85)' : 'rgba(255,255,255,0.6)',
                    color: selectedCategory === cat ? '#F6F2E8' : '#2A2522',
                    clipPath: clip8,
                    border: '1px solid rgba(255,255,255,0.4)',
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Grid ── */}
      <section ref={projectsRef} className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {filteredProjects.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl" style={{ color: '#5A5A5A' }}>Aucun projet trouvé dans cette catégorie.</p>
            </div>
          ) : (
            /* 3-column grid on large screens, 2 on medium, 1 on mobile */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map(project => {
                const thumbnail = getThumbnail(project);
                return (
                  <div key={project.id} className="project-card group">
                    <Link
                      to={project.slug ? `/realisations/${project.slug}` : '#'}
                      className="block h-full transition-all duration-500 hover:scale-[1.02] focus:outline-none"
                      style={{ ...glassStyle, clipPath: clip12, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
                    >
                      {/* ── Thumbnail ── */}
                      <div className="relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
                        {thumbnail ? (
                          <img
                            src={thumbnail}
                            alt={project.title}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
                          />
                        ) : (
                          <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                            <span className="text-gray-400 text-sm">Aucune image</span>
                          </div>
                        )}

                        {/* Category badge */}
                        <div className="absolute top-3 left-3 px-3 py-1"
                          style={{ background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(10px)', clipPath: 'polygon(4px 0, calc(100% - 4px) 0, 100% 4px, 100% calc(100% - 4px), calc(100% - 4px) 100%, 4px 100%, 0 calc(100% - 4px), 0 4px)' }}>
                          <span className="text-white text-xs font-medium capitalize">{project.category}</span>
                        </div>

                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <span className="text-white text-sm font-bold uppercase tracking-wider">Voir le projet →</span>
                        </div>
                      </div>

                      {/* ── Info ── */}
                      <div className="p-5 flex flex-col gap-3 flex-1">
                        {/* Title */}
                        <h3 className="text-lg sm:text-xl font-bold leading-snug" style={{ color: '#2A2522' }}>
                          {project.title}
                        </h3>

                        {/* Stats row */}
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm" style={{ color: '#5A5A5A' }}>
                          {project.location && (
                            <div className="flex items-center gap-1.5">
                              <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                              <span>{project.location}</span>
                            </div>
                          )}
                          {project.duration && (
                            <div className="flex items-center gap-1.5">
                              <span className="w-3.5 h-3.5 flex-shrink-0 text-center leading-none">⏱</span>
                              <span>{project.duration}</span>
                            </div>
                          )}
                          {project.surface && (
                            <div className="flex items-center gap-1.5">
                              <span className="w-3.5 h-3.5 flex-shrink-0 text-center leading-none">⬛</span>
                              <span>{project.surface} m²</span>
                            </div>
                          )}
                        </div>

                        {/* Spacer + CTA arrow */}
                        <div className="flex-1" />
                        <div className="flex items-center gap-2 text-sm font-semibold group-hover:gap-3 transition-all" style={{ color: '#2A2522' }}>
                          <span>Voir le projet</span>
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="p-12 text-center" style={{ ...glassStyle, clipPath: 'polygon(16px 0, calc(100% - 16px) 0, 100% 16px, 100% calc(100% - 16px), calc(100% - 16px) 100%, 16px 100%, 0 calc(100% - 16px), 0 16px)' }}>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6" style={{ color: '#2A2522' }}>Prêt à Transformer Votre Espace ?</h2>
            <p className="text-lg mb-8 leading-relaxed max-w-2xl mx-auto" style={{ color: '#5A5A5A' }}>
              Contactez-nous pour discuter de votre projet.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="inline-flex items-center justify-center gap-3 px-10 py-5 font-medium transition-all hover:scale-105"
                style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(40px)', color: '#F6F2E8', clipPath: clip12, border: '1px solid rgba(80,80,80,0.25)' }}>
                <span className="uppercase tracking-wider text-sm font-bold">Contactez-Nous</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/services" className="inline-flex items-center justify-center gap-3 px-10 py-5 font-medium transition-all hover:scale-105"
                style={{ background: 'rgba(255,255,255,0.6)', backdropFilter: 'blur(40px)', color: '#2A2522', clipPath: clip12, border: '1px solid rgba(255,255,255,0.5)' }}>
                <span className="uppercase tracking-wider text-sm font-bold">Voir Nos Services</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}