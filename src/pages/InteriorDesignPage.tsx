import { Link } from 'react-router';
import { useRef, useEffect } from 'react';
import { gsap } from '../shared/lib/gsap-init';
import { ArrowRight, Palette, Sparkles, Eye, Lightbulb, LucideIcon } from 'lucide-react';
import { FilmGrainTexture } from '../shared/ui/FilmGrainTexture';
import { PremiumTextReveal } from '../shared/ui/PremiumTextReveal';

interface DesignService {
  number: string;
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
  image: string;
}

interface DesignGalleryItem {
  title: string;
  category: string;
  image: string;
}

const designServices: DesignService[] = [
  {
    number: '01',
    icon: Palette,
    title: 'Conception sur mesure',
    description: 'Nous créons des espaces qui reflètent votre personnalité et répondent à vos besoins quotidiens.',
    features: [
      'Plans 3D personnalisés',
      'Choix de matériaux premium',
      'Palette de couleurs harmonieuse',
      'Optimisation de l\'espace',
    ],
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnRlcmlvciUyMGRlc2lnbiUyMGx1eHVyeXxlbnwxfHx8fDE3Njg5OTUyMDh8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    number: '02',
    icon: Sparkles,
    title: 'Ambiances uniques',
    description: 'Chaque projet est une opportunité de créer une atmosphère qui vous ressemble.',
    features: [
      'Éclairage d\'ambiance étudié',
      'Mobilier design sur mesure',
      'Décoration raffinée',
      'Accessoires soigneusement sélectionnés',
    ],
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBsaXZpbmclMjByb29tJTIwZGVzaWdufGVufDF8fHx8MTc2ODk5NTIwOHww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    number: '03',
    icon: Eye,
    title: 'Esthétique & fonctionnalité',
    description: 'L\'alliance parfaite entre beauté visuelle et praticité au quotidien.',
    features: [
      'Rangements intelligents',
      'Circulation optimisée',
      'Matériaux durables',
      'Solutions innovantes',
    ],
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBraXRjaGVuJTIwZGVzaWdufGVufDF8fHx8MTc2ODk5NTIwOHww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    number: '04',
    icon: Lightbulb,
    title: 'Conseil expert',
    description: 'Notre équipe vous guide dans tous vos choix pour un résultat harmonieux.',
    features: [
      'Tendances actuelles',
      'Rapport qualité-prix optimal',
      'Suivi personnalisé',
      'Book d\'inspiration',
    ],
    image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWRyb29tJTIwaW50ZXJpb3IlMjBkZXNpZ258ZW58MXx8fHwxNzY4OTk1MjA4fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
];

const designGallery: DesignGalleryItem[] = [
  {
    title: 'Salon contemporain',
    category: 'Espace de vie',
    image: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBsaXZpbmclMjByb29tfGVufDF8fHx8MTc2ODk5NTIwOHww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    title: 'Cuisine ouverte design',
    category: 'Cuisine',
    image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBraXRjaGVufGVufDF8fHx8MTc2ODk5OTUwMXww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    title: 'Suite parentale cosy',
    category: 'Chambre',
    image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXN0ZXIlMjBiZWRyb29tfGVufDF8fHx8MTc2ODk5NTIwOHww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    title: 'Salle de bain spa',
    category: 'Salle de bain',
    image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBiYXRocm9vbXxlbnwxfHx8fDE3Njg5OTUyMDh8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    title: 'Bureau moderne',
    category: 'Espace de travail',
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2V8ZW58MXx8fHwxNzY4OTk5NTAzfDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    title: 'Espace extérieur',
    category: 'Extérieur',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvdXRkb29yJTIwdGVycmFjZXxlbnwxfHx8fDE3Njg5OTk1MDJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
];

export function InteriorDesignPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

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

    // Services animation
    if (servicesRef.current) {
      const cards = servicesRef.current.querySelectorAll('.design-service-card');
      
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

    // Gallery animation
    if (galleryRef.current) {
      const items = galleryRef.current.querySelectorAll('.gallery-item');
      
      items.forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0, scale: 0.9 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#FAFAF9]">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[50vh] flex items-center justify-center px-4 pt-32 pb-20">
        <FilmGrainTexture id="designHeroGrain" opacity={0.04} withVignette={true} vignetteIntensity={0.15} />
        
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
            <span className="text-sm font-medium" style={{ color: '#2A2522' }}>DESIGN INTÉRIEUR</span>
          </div>
          
          <PremiumTextReveal>
            <h1 className="text-5xl sm:text-6xl lg:text-8xl font-bold mb-6 leading-[0.9]" style={{ color: '#2A2522' }}>
              CRÉONS VOTRE<br />ESPACE IDÉAL
            </h1>
          </PremiumTextReveal>
          
          <p className="text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed" style={{ color: '#5A5A5A' }}>
            Du concept à la réalisation, nous transformons vos espaces en lieux de vie uniques, alliant esthétique contemporaine et confort absolu.
          </p>
        </div>
      </section>

      {/* Design Services Section */}
      <section ref={servicesRef} className="py-20 px-4 bg-[#FAFAF9]">
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
              Notre Approche Design
            </h2>
            <p className="text-lg max-w-3xl mx-auto leading-relaxed" style={{ color: '#5A5A5A' }}>
              Une méthodologie éprouvée pour des intérieurs qui vous ressemblent
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {designServices.map((service) => (
              <div key={service.number} className="design-service-card group">
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
                  {/* Header */}
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div 
                        className="w-12 h-12 flex items-center justify-center"
                        style={{
                          background: 'rgba(255, 255, 255, 0.6)',
                          clipPath: 'polygon(8px 0, calc(100% - 8px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px), 0 8px)',
                          color: '#2A2522',
                        }}
                      >
                        <service.icon className="w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-bold" style={{ color: '#2A2522' }}>
                        {service.title}
                      </h3>
                    </div>
                    
                    <p className="text-sm leading-relaxed mb-4" style={{ color: '#5A5A5A' }}>
                      {service.description}
                    </p>
                  </div>

                  {/* Image */}
                  <div className="px-6 pb-6">
                    <div 
                      className="relative h-48 overflow-hidden"
                      style={{
                        clipPath: 'polygon(12px 0, calc(100% - 12px) 0, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px), 0 12px)',
                      }}
                    >
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Features */}
                  <div className="p-6 pt-0">
                    <div className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <div 
                            className="w-1.5 h-1.5 flex-shrink-0"
                            style={{
                              background: '#2A2522',
                              clipPath: 'polygon(3px 0, calc(100% - 3px) 0, 100% 3px, 100% calc(100% - 3px), calc(100% - 3px) 100%, 3px 100%, 0 calc(100% - 3px), 0 3px)',
                            }}
                          />
                          <span className="text-xs" style={{ color: '#5A5A5A' }}>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section ref={galleryRef} className="py-20 px-4 bg-[#FAFAF9]">
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
              Galerie Design
            </h2>
            <p className="text-lg max-w-3xl mx-auto leading-relaxed" style={{ color: '#5A5A5A' }}>
              Découvrez nos créations récentes et laissez-vous inspirer
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {designGallery.map((item, index) => (
              <div key={index} className="gallery-item group">
                <div
                  className="overflow-hidden transition-all duration-500 hover:scale-[1.02]"
                  style={{
                    background: 'rgba(255, 255, 255, 0.4)',
                    backdropFilter: 'blur(40px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(40px) saturate(180%)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    clipPath: 'polygon(12px 0, calc(100% - 12px) 0, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px), 0 12px)',
                  }}
                >
                  <div 
                    className="relative h-64 overflow-hidden"
                    style={{
                      clipPath: 'polygon(12px 0, calc(100% - 12px) 0, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px), 0 12px)',
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-bold mb-1" style={{ color: '#2A2522' }}>
                      {item.title}
                    </h3>
                    <p className="text-sm" style={{ color: '#5A5A5A' }}>
                      {item.category}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
              Concrétisons Votre Vision
            </h2>
            <p className="text-lg mb-8 leading-relaxed max-w-2xl mx-auto" style={{ color: '#5A5A5A' }}>
              Parlons de votre projet de design intérieur et créons ensemble l'espace de vos rêves.
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
                <span className="uppercase tracking-wider text-sm font-bold">Demander un Devis</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/realisations"
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
                <span className="uppercase tracking-wider text-sm font-bold">Voir Nos Réalisations</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}