import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import { gsap } from '../../shared/lib/gsap-init';
import { ArrowRight } from 'lucide-react';
import { getAllProjects } from '../../services/projectsAPI';
import { BeforeAfterSlider } from './BeforeAfterSlider';

// Fallback projects shown when API returns nothing
const FALLBACK_PROJECTS = [
  {
    id: -1,
    title: 'Rénovation Complète',
    description: "Transformation d'un appartement parisien en espace moderne et lumineux.",
    category: 'Résidentiel',
    location: 'Paris',
    slug: '',
    images: [
      {
        before_image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
        after_image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      },
    ],
  },
  {
    id: -2,
    title: 'Cuisine Moderne',
    description: 'Design contemporain avec finitions haut de gamme.',
    category: 'Cuisine',
    location: 'Lyon',
    slug: '',
    images: [
      {
        before_image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
        after_image: 'https://images.unsplash.com/photo-1556909212-d5b604d0c90d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      },
    ],
  },
  {
    id: -3,
    title: 'Salle de Bain Luxe',
    description: 'Espace détente avec matériaux premium et éclairage sophistiqué.',
    category: 'Salle de Bain',
    location: 'Marseille',
    slug: '',
    images: [
      {
        before_image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
        after_image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      },
    ],
  },
];

const cardStyle = {
  background: 'rgba(255, 255, 255, 0.4)',
  backdropFilter: 'blur(40px) saturate(180%)',
  WebkitBackdropFilter: 'blur(40px) saturate(180%)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  clipPath: 'polygon(24px 0, calc(100% - 24px) 0, 100% 24px, 100% calc(100% - 24px), calc(100% - 24px) 100%, 24px 100%, 0 calc(100% - 24px), 0 24px)',
};

const imageClip = {
  clipPath: 'polygon(16px 0, calc(100% - 16px) 0, 100% 16px, 100% calc(100% - 16px), calc(100% - 16px) 100%, 16px 100%, 0 calc(100% - 16px), 0 16px)',
};

const overlayWarm = {
  background: 'radial-gradient(ellipse 60% 40% at 50% -10%, rgba(212, 175, 119, 0.15) 0%, transparent 70%)',
  mixBlendMode: 'soft-light' as const,
};

const overlayVignette = {
  background: 'radial-gradient(ellipse 75% 75% at 50% 50%, transparent 40%, rgba(42, 37, 34, 0.2) 100%)',
  mixBlendMode: 'multiply' as const,
};

export function RecentProjects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    getAllProjects()
      .then((data) => {
        if (data && data.length > 0) {
          // Take the 3 most recent projects (API returns them ordered)
          setProjects(data.slice(0, 3));
        } else {
          setProjects(FALLBACK_PROJECTS as any);
        }
      })
      .catch(() => setProjects(FALLBACK_PROJECTS as any));
  }, []);

  useEffect(() => {
    if (projects.length === 0) return;

    const ctx = gsap.context(() => {
      cardRefs.forEach((ref, index) => {
        if (!ref.current) return;

        gsap.fromTo(
          ref.current,
          { y: 100, opacity: 0, scale: 0.95 },
          {
            y: 0, opacity: 1, scale: 1, duration: 1.2,
            delay: index * 0.15, ease: 'power3.out',
            scrollTrigger: {
              trigger: ref.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );

        gsap.to(ref.current, {
          y: -40,
          scrollTrigger: {
            trigger: ref.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [projects]);

  // Get first before/after pair from a project, with fallback
  const getImages = (project: any) => {
    const pair = project.images?.[0];
    return {
      before: pair?.before_image || pair?.before || 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1080&q=80',
      after: pair?.after_image || pair?.after || project.image || 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1080&q=80',
    };
  };

  const display = projects.length > 0 ? projects : FALLBACK_PROJECTS;

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative overflow-hidden py-20 md:py-32 bg-[#FAFAF9]"
      data-section="projects"
    >
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 relative z-10 max-w-[1400px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8">

          {/* Large card — first project */}
          <div ref={cardRefs[0]} className="lg:col-span-6 lg:row-span-2">
            <div className="group relative h-full">
              <div className="p-6 h-full flex flex-col" style={cardStyle}>
                <div className="relative aspect-[4/5] lg:aspect-[3/4] overflow-hidden shadow-2xl mb-6" style={imageClip}>
                  <div className="absolute inset-0 pointer-events-none z-30" style={overlayWarm} />
                  <div className="absolute inset-0 pointer-events-none z-20" style={overlayVignette} />
                  <BeforeAfterSlider
                    beforeImage={getImages(display[0]).before}
                    afterImage={getImages(display[0]).after}
                    className="w-full h-full"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl md:text-3xl font-bold mb-3" style={{ color: '#2A2522' }}>
                    {display[0]?.title}
                  </h3>
                  <p className="leading-relaxed mb-4 text-[#5A5A5A]">{display[0]?.description}</p>
                  <div className="flex items-center gap-2 text-xs uppercase tracking-wider" style={{ color: '#5A5A5A' }}>
                    {display[0]?.location && <><span>{display[0].location}</span><span>•</span></>}
                    {display[0]?.category && <span>{display[0].category}</span>}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Medium card — second project */}
          {display[1] && (
            <div ref={cardRefs[1]} className="lg:col-span-6">
              <div className="group relative h-full">
                <div className="p-6 h-full flex flex-col" style={cardStyle}>
                  <div className="relative aspect-[16/9] lg:aspect-[2/1] overflow-hidden shadow-2xl mb-6" style={imageClip}>
                    <div className="absolute inset-0 pointer-events-none z-30" style={overlayWarm} />
                    <div className="absolute inset-0 pointer-events-none z-20" style={overlayVignette} />
                    <BeforeAfterSlider
                      beforeImage={getImages(display[1]).before}
                      afterImage={getImages(display[1]).after}
                      className="w-full h-full"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl md:text-3xl font-bold mb-3" style={{ color: '#2A2522' }}>
                      {display[1].title}
                    </h3>
                    <p className="leading-relaxed mb-4 text-[#5A5A5A]">{display[1].description}</p>
                    <div className="flex items-center gap-2 text-xs uppercase tracking-wider" style={{ color: '#5A5A5A' }}>
                      {display[1].location && <><span>{display[1].location}</span><span>•</span></>}
                      {display[1].category && <span>{display[1].category}</span>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Small card — third project */}
          {display[2] && (
            <div ref={cardRefs[2]} className="lg:col-span-6">
              <div className="group relative h-full">
                <div className="p-6 h-full flex flex-col" style={cardStyle}>
                  <div className="relative aspect-[16/9] lg:aspect-[2/1] overflow-hidden shadow-2xl mb-6" style={imageClip}>
                    <div className="absolute inset-0 pointer-events-none z-30" style={overlayWarm} />
                    <div className="absolute inset-0 pointer-events-none z-20" style={overlayVignette} />
                    <BeforeAfterSlider
                      beforeImage={getImages(display[2]).before}
                      afterImage={getImages(display[2]).after}
                      className="w-full h-full"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl md:text-3xl font-bold mb-3" style={{ color: '#2A2522' }}>
                      {display[2].title}
                    </h3>
                    <p className="leading-relaxed mb-4 text-[#5A5A5A]">{display[2].description}</p>
                    <div className="flex items-center gap-2 text-xs uppercase tracking-wider" style={{ color: '#5A5A5A' }}>
                      {display[2].location && <><span>{display[2].location}</span><span>•</span></>}
                      {display[2].category && <span>{display[2].category}</span>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="text-center mt-16">
          <Link
            to="/realisations"
            className="inline-flex items-center gap-3 px-8 py-4 font-medium uppercase tracking-wider text-sm transition-all duration-300 hover:scale-105"
            style={{
              background: 'rgba(0, 0, 0, 0.85)',
              backdropFilter: 'blur(40px) saturate(180%)',
              WebkitBackdropFilter: 'blur(40px) saturate(180%)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(80, 80, 80, 0.25)',
              clipPath: 'polygon(12px 0, calc(100% - 12px) 0, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px), 0 12px)',
              color: 'var(--color-base-cream)',
              textShadow: '0 2px 10px rgba(0, 0, 0, 0.4)',
            }}
          >
            <span>Voir toutes nos réalisations</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}