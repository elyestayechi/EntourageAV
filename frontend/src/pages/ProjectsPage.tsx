import { Link } from 'react-router';
import { useState, useRef, useEffect } from 'react';
import { gsap } from '../shared/lib/gsap-init';
import { Calendar, MapPin, X, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { PremiumTextReveal } from '../shared/ui/PremiumTextReveal';
import { getAllProjects } from '../services/projectsAPI';
import { LoadingSpinner } from '../shared/ui/LoadingSpinner';
import { getImageUrl } from '../shared/utils/images';

type ProjectCategory = 'tous' | 'rénovation' | 'salle-de-bain' | 'cuisine' | 'électricité' | 'extérieur';

interface ProjectImage {
  before: string;
  after: string;
  label?: string;
}

interface Project {
  id: number;
  slug: string;
  number: string;
  title: string;
  category: ProjectCategory;
  location: string;
  description: string;
  images: ProjectImage[];
  duration: string;
  surface: string;
}

const categories: { value: ProjectCategory; label: string }[] = [
  { value: 'tous', label: 'Tous les projets' },
  { value: 'rénovation', label: 'Rénovation complète' },
  { value: 'salle-de-bain', label: 'Salle de bain' },
  { value: 'cuisine', label: 'Cuisine' },
  { value: 'électricité', label: 'Électricité' },
  { value: 'extérieur', label: 'Extérieur' },
];

// Image Lightbox Modal Component
function ImageLightbox({ 
  images, 
  currentIndex, 
  onClose, 
  onNavigate 
}: { 
  images: ProjectImage[], 
  currentIndex: number, 
  onClose: () => void,
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
      style={{
        background: 'rgba(0, 0, 0, 0.95)',
        backdropFilter: 'blur(20px)',
      }}
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 p-4 transition-all duration-300 hover:opacity-70 z-50"
      >
        <X className="w-6 h-6 text-white drop-shadow-lg" />
      </button>

      {images.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNavigate('prev');
            }}
            className="absolute left-6 p-4 transition-all duration-300 hover:opacity-70 z-50"
          >
            <ChevronLeft className="w-8 h-8 text-white drop-shadow-lg" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNavigate('next');
            }}
            className="absolute right-6 p-4 transition-all duration-300 hover:opacity-70 z-50"
          >
            <ChevronRight className="w-8 h-8 text-white drop-shadow-lg" />
          </button>
        </>
      )}

      <div 
        className="relative max-w-6xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative aspect-video overflow-hidden"
          style={{
            clipPath: 'polygon(16px 0, calc(100% - 16px) 0, 100% 16px, 100% calc(100% - 16px), calc(100% - 16px) 100%, 16px 100%, 0 calc(100% - 16px), 0 16px)',
          }}
        >
          <img
            src={viewMode === 'before' ? getImageUrl(currentImage.before) : getImageUrl(currentImage.after)}
            alt={viewMode === 'before' ? 'Avant' : 'Après'}
            className="w-full h-full object-cover transition-opacity duration-500"
          />

          <div className="absolute top-6 left-1/2 -translate-x-1/2 flex items-center gap-6">
            <button
              onClick={() => setViewMode('before')}
              className={`px-2 py-1 text-sm font-bold tracking-wider transition-all duration-300 ${
                viewMode === 'before' ? 'opacity-100 scale-110' : 'opacity-50 hover:opacity-75'
              }`}
            >
              <span className="text-white drop-shadow-lg">AVANT</span>
            </button>
            <span className="text-white/30">|</span>
            <button
              onClick={() => setViewMode('after')}
              className={`px-2 py-1 text-sm font-bold tracking-wider transition-all duration-300 ${
                viewMode === 'after' ? 'opacity-100 scale-110' : 'opacity-50 hover:opacity-75'
              }`}
            >
              <span className="text-white drop-shadow-lg">APRÈS</span>
            </button>
          </div>

          <div className="absolute bottom-6 left-6">
            <span className="text-white text-sm font-medium drop-shadow-lg">
              {viewMode === 'before' ? 'Avant Rénovation' : 'Après Rénovation'}
            </span>
          </div>

          <div className="absolute bottom-6 right-6 text-right">
            {currentImage.label && (
              <p className="text-white text-sm font-medium drop-shadow-lg mb-1">{currentImage.label}</p>
            )}
            {images.length > 1 && (
              <p className="text-white/60 text-xs drop-shadow-lg">
                {currentIndex + 1} / {images.length}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('tous');
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  
  const heroRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      setLoading(true);
      const data = await getAllProjects();
      setProjects(data);
    } catch (err) {
      setError('Failed to load projects. Please try again later.');
      console.error('Error loading projects:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredProjects = selectedCategory === 'tous'
    ? projects
    : projects.filter(p => p.category === selectedCategory);

  const openLightbox = (project: Project, imageIndex: number) => {
    setSelectedProject(project);
    setSelectedImageIndex(imageIndex);
    setLightboxOpen(true);
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (!selectedProject) return;
    const maxIndex = selectedProject.images.length - 1;
    setSelectedImageIndex(prev => {
      if (direction === 'prev') {
        return prev > 0 ? prev - 1 : maxIndex;
      } else {
        return prev < maxIndex ? prev + 1 : 0;
      }
    });
  };

  useEffect(() => {
    // Hero animation
    if (heroRef.current) {
      gsap.fromTo(
        heroRef.current.querySelectorAll('.animate-in'),
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
        }
      );
    }
  }, []);

  useEffect(() => {
    // Projects animation
    if (projectsRef.current && !loading) {
      const cards = projectsRef.current.querySelectorAll('.project-card');
      
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 80, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }
  }, [filteredProjects, loading]);

  if (loading) {
    return <LoadingSpinner fullScreen text="Chargement des projets..." />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#FAFAF9] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4" style={{ color: '#2A2522' }}>
            Oups! Une erreur est survenue
          </h1>
          <p className="text-lg mb-8" style={{ color: '#5A5A5A' }}>{error}</p>
          <button
            onClick={loadProjects}
            className="px-6 py-3 bg-[#2A2522] text-white rounded-lg hover:bg-[#3A3532] transition-colors"
            style={{
              clipPath: 'polygon(8px 0, calc(100% - 8px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px), 0 8px)',
            }}
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAF9]">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[50vh] flex items-center justify-center px-4 pt-32 pb-20">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div 
            className="inline-flex px-6 py-3 mb-6"
            style={{
              background: 'rgba(255, 255, 255, 0.4)',
              backdropFilter: 'blur(40px) saturate(180%)',
              WebkitBackdropFilter: 'blur(40px) saturate(180%)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              clipPath: 'polygon(8px 0, calc(100% - 8px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px), 0 8px)',
            }}
          >
            <span className="text-sm font-medium" style={{ color: '#2A2522' }}>RÉALISATIONS</span>
          </div>
          
          <PremiumTextReveal>
            <h1 className="text-5xl sm:text-6xl lg:text-8xl font-bold mb-6 leading-[0.9]" style={{ color: '#2A2522' }}>
              NOS TRANSFORMATIONS<br />À LA LOUPE
            </h1>
          </PremiumTextReveal>
          
          <p className="text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed" style={{ color: '#5A5A5A' }}>
            Découvrez nos projets de rénovation réalisés avec passion et expertise. Chaque transformation raconte une histoire unique.
          </p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 px-4 bg-[#FAFAF9]">
        <div className="max-w-7xl mx-auto">
          <div 
            className="p-8 mb-8"
            style={{
              background: 'rgba(255, 255, 255, 0.4)',
              backdropFilter: 'blur(40px) saturate(180%)',
              WebkitBackdropFilter: 'blur(40px) saturate(180%)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              clipPath: 'polygon(12px 0, calc(100% - 12px) 0, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px), 0 12px)',
            }}
          >
            <h3 className="text-lg font-medium mb-6" style={{ color: '#2A2522' }}>Filtrer par catégorie</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
                    selectedCategory === cat.value ? 'scale-105' : ''
                  }`}
                  style={{
                    background: selectedCategory === cat.value 
                      ? 'rgba(0, 0, 0, 0.85)'
                      : 'rgba(255, 255, 255, 0.6)',
                    backdropFilter: 'blur(40px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(40px) saturate(180%)',
                    boxShadow: selectedCategory === cat.value
                      ? '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.06)'
                      : '0 4px 16px rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                    border: selectedCategory === cat.value
                      ? '1px solid rgba(80, 80, 80, 0.25)'
                      : '1px solid rgba(255, 255, 255, 0.5)',
                    clipPath: 'polygon(8px 0, calc(100% - 8px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px), 0 8px)',
                    color: selectedCategory === cat.value ? 'var(--color-base-cream)' : '#2A2522',
                  }}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section ref={projectsRef} className="py-20 px-4 bg-[#FAFAF9]">
        <div className="max-w-7xl mx-auto">
          <div 
            className="p-8 mb-16 text-center"
            style={{
              background: 'rgba(255, 255, 255, 0.4)',
              backdropFilter: 'blur(40px) saturate(180%)',
              WebkitBackdropFilter: 'blur(40px) saturate(180%)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              clipPath: 'polygon(12px 0, calc(100% - 12px) 0, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px), 0 12px)',
            }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6" style={{ color: '#2A2522' }}>
              Nos Dernières Réalisations
            </h2>
            <p className="text-lg max-w-3xl mx-auto leading-relaxed" style={{ color: '#5A5A5A' }}>
              Découvrez les transformations spectaculaires réalisées par notre équipe d'experts
            </p>
          </div>

          {filteredProjects.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl" style={{ color: '#5A5A5A' }}>
                Aucun projet trouvé dans cette catégorie.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className="project-card group"
                >
                  <div
                    className="h-full overflow-hidden transition-all duration-500 hover:scale-[1.02] flex flex-col"
                    style={{
                      background: 'rgba(255, 255, 255, 0.4)',
                      backdropFilter: 'blur(40px) saturate(180%)',
                      WebkitBackdropFilter: 'blur(40px) saturate(180%)',
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      clipPath: 'polygon(12px 0, calc(100% - 12px) 0, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px), 0 12px)',
                    }}
                  >
                    {/* Project Number */}
                    <div 
                      className="px-6 pt-6 pb-4"
                      style={{
                        background: 'rgba(255, 255, 255, 0.4)',
                        backdropFilter: 'blur(40px) saturate(180%)',
                        WebkitBackdropFilter: 'blur(40px) saturate(180%)',
                      }}
                    >
                      <div
                        className="inline-flex px-4 py-2"
                        style={{
                          background: 'rgba(0, 0, 0, 0.85)',
                          backdropFilter: 'blur(40px) saturate(180%)',
                          WebkitBackdropFilter: 'blur(40px) saturate(180%)',
                          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.06)',
                          border: '1px solid rgba(80, 80, 80, 0.25)',
                          clipPath: 'polygon(8px 0, calc(100% - 8px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px), 0 8px)',
                        }}
                      >
                        <span className="text-lg font-bold tracking-wider" style={{ color: 'var(--color-base-cream)' }}>
                          {project.number}
                        </span>
                      </div>
                    </div>

                    {/* Image Gallery Grid */}
                    {project.images && project.images.length > 0 && (
                      <div className="px-6 pb-6">
                        <div className={`grid gap-3 ${project.images.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
                          {project.images.map((image, idx) => (
                            <button
                              key={idx}
                              onClick={() => openLightbox(project, idx)}
                              className="relative group/img overflow-hidden transition-all duration-300 hover:scale-[1.02]"
                              style={{
                                clipPath: 'polygon(8px 0, calc(100% - 8px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px), 0 8px)',
                                aspectRatio: project.images.length === 1 ? '16/9' : '4/3',
                              }}
                            >
                              <img
                                src={getImageUrl(image.before)}
                                alt={`${project.title} - Avant ${idx + 1}`}
                                className="w-full h-full object-cover"
                              />
                              {/* Overlay */}
                              <div 
                                className="absolute inset-0 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                                style={{
                                  background: 'rgba(0, 0, 0, 0.6)',
                                  backdropFilter: 'blur(4px)',
                                }}
                              >
                                <div className="text-white text-center">
                                  <p className="text-sm font-medium mb-1">Cliquez pour voir</p>
                                  <p className="text-xs opacity-75">Avant / Après</p>
                                </div>
                              </div>
                              {/* Image label */}
                              {image.label && (
                                <div 
                                  className="absolute bottom-2 left-2 px-3 py-1"
                                  style={{
                                    background: 'rgba(0, 0, 0, 0.7)',
                                    backdropFilter: 'blur(10px)',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    clipPath: 'polygon(4px 0, calc(100% - 4px) 0, 100% 4px, 100% calc(100% - 4px), calc(100% - 4px) 100%, 4px 100%, 0 calc(100% - 4px), 0 4px)',
                                  }}
                                >
                                  <span className="text-white text-xs font-medium">{image.label}</span>
                                </div>
                              )}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Content */}
                    <div className="p-6 pt-0 flex-1 flex flex-col">
                      <div className="mb-4">
                        <h3 className="text-xl sm:text-2xl font-bold mb-2" style={{ color: '#2A2522' }}>
                          {project.title}
                        </h3>
                        <div className="flex items-center gap-2 text-sm" style={{ color: '#5A5A5A' }}>
                          <MapPin className="w-4 h-4" />
                          <span>{project.location}</span>
                        </div>
                      </div>

                      <p className="mb-6 leading-relaxed flex-1" style={{ color: '#5A5A5A' }}>
                        {project.description}
                      </p>

                      <div className="flex items-center gap-6 text-sm pt-4 border-t border-white/20 mb-4">
                        {project.duration && (
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" style={{ color: '#2A2522' }} />
                            <span className="font-medium" style={{ color: '#2A2522' }}>{project.duration}</span>
                          </div>
                        )}
                        {project.surface && (
                          <div>
                            <span className="font-medium" style={{ color: '#2A2522' }}>Surface: {project.surface}</span>
                          </div>
                        )}
                      </div>

                      {/* View Details Button */}
                      <Link
                        to={`/realisations/${project.slug}`}
                        className="inline-flex items-center justify-center gap-2 w-full px-4 py-3 text-sm font-medium transition-all duration-300 hover:scale-105"
                        style={{
                          background: 'rgba(0, 0, 0, 0.85)',
                          backdropFilter: 'blur(40px) saturate(180%)',
                          WebkitBackdropFilter: 'blur(40px) saturate(180%)',
                          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.06)',
                          border: '1px solid rgba(80, 80, 80, 0.25)',
                          clipPath: 'polygon(8px 0, calc(100% - 8px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px), 0 8px)',
                          color: 'var(--color-base-cream)',
                        }}
                      >
                        <span>Voir les détails</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-[#FAFAF9]">
        <div className="max-w-7xl mx-auto">
          <div 
            className="p-12 text-center"
            style={{
              background: 'rgba(255, 255, 255, 0.4)',
              backdropFilter: 'blur(40px) saturate(180%)',
              WebkitBackdropFilter: 'blur(40px) saturate(180%)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              clipPath: 'polygon(16px 0, calc(100% - 16px) 0, 100% 16px, 100% calc(100% - 16px), calc(100% - 16px) 100%, 16px 100%, 0 calc(100% - 16px), 0 16px)',
            }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6" style={{ color: '#2A2522' }}>
              Prêt à Transformer Votre Espace ?
            </h2>
            <p className="text-lg mb-8 leading-relaxed max-w-2xl mx-auto" style={{ color: '#5A5A5A' }}>
              Découvrez comment notre expertise et notre passion peuvent donner vie à vos projets les plus ambitieux.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-3 px-10 py-5 font-medium transition-all duration-300 hover:scale-105"
                style={{
                  background: 'rgba(0, 0, 0, 0.85)',
                  backdropFilter: 'blur(40px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(40px) saturate(180%)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(80, 80, 80, 0.25)',
                  clipPath: 'polygon(12px 0, calc(100% - 12px) 0, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px), 0 12px)',
                  color: 'var(--color-base-cream)',
                }}
              >
                <span className="uppercase tracking-wider text-sm font-bold">Contactez-Nous</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center justify-center gap-3 px-10 py-5 font-medium transition-all duration-300 hover:scale-105"
                style={{
                  background: 'rgba(255, 255, 255, 0.6)',
                  backdropFilter: 'blur(40px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(40px) saturate(180%)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                  border: '1px solid rgba(255, 255, 255, 0.5)',
                  clipPath: 'polygon(12px 0, calc(100% - 12px) 0, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px), 0 12px)',
                  color: '#2A2522',
                }}
              >
                <span className="uppercase tracking-wider text-sm font-bold">Voir Nos Services</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxOpen && selectedProject && (
        <ImageLightbox
          images={selectedProject.images}
          currentIndex={selectedImageIndex}
          onClose={() => setLightboxOpen(false)}
          onNavigate={navigateImage}
        />
      )}
    </div>
  );
}