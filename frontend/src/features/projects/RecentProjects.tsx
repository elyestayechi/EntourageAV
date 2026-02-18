import { useEffect, useRef } from 'react';
import { Link } from 'react-router';
import { gsap } from '../../shared/lib/gsap-init';
import { ArrowRight } from 'lucide-react';
import { BeforeAfterSlider } from './BeforeAfterSlider';
// Placeholder images - replace with actual image paths
import beforeImage from '../../assets/before.png';
import afterImage from '../../assets/after.jpg';

export function RecentProjects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const project1Ref = useRef<HTMLDivElement>(null);
  const project2Ref = useRef<HTMLDivElement>(null);
  const project3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Stagger project cards
      const projects = [project1Ref.current, project2Ref.current, project3Ref.current];
      
      projects.forEach((project, index) => {
        gsap.fromTo(
          project,
          { y: 100, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.2,
            delay: index * 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: project,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );

        // Parallax effect
        gsap.to(project, {
          y: -40,
          scrollTrigger: {
            trigger: project,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative overflow-hidden py-20 md:py-32 bg-[#FAFAF9]"
      data-section="projects"
    >
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 relative z-10 max-w-[1400px]">
        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Large Project 1 */}
          <div ref={project1Ref} className="lg:col-span-6 lg:row-span-2">
            <div className="group relative h-full">
              {/* Glass container with chamfered corners */}
              <div 
                className="p-6 h-full flex flex-col"
                style={{
                  background: 'rgba(255, 255, 255, 0.4)',
                  backdropFilter: 'blur(40px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(40px) saturate(180%)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  clipPath: 'polygon(24px 0, calc(100% - 24px) 0, 100% 24px, 100% calc(100% - 24px), calc(100% - 24px) 100%, 24px 100%, 0 calc(100% - 24px), 0 24px)',
                }}
              >
                <div 
                  className="relative aspect-[4/5] lg:aspect-[3/4] overflow-hidden shadow-2xl mb-6"
                  style={{
                    clipPath: 'polygon(16px 0, calc(100% - 16px) 0, 100% 16px, 100% calc(100% - 16px), calc(100% - 16px) 100%, 16px 100%, 0 calc(100% - 16px), 0 16px)',
                  }}
                >
                  {/* Warm gradient overlay */}
                  <div 
                    className="absolute inset-0 pointer-events-none z-30"
                    style={{
                      background: 'radial-gradient(ellipse 60% 40% at 50% -10%, rgba(212, 175, 119, 0.15) 0%, transparent 70%)',
                      mixBlendMode: 'soft-light',
                    }}
                  />
                  {/* Vignette */}
                  <div 
                    className="absolute inset-0 pointer-events-none z-20"
                    style={{
                      background: 'radial-gradient(ellipse 75% 75% at 50% 50%, transparent 40%, rgba(42, 37, 34, 0.2) 100%)',
                      mixBlendMode: 'multiply',
                    }}
                  />
                  <BeforeAfterSlider
                    beforeImage="https://images.unsplash.com/photo-1484154218962-a197022b5858?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                    afterImage="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                    className="w-full h-full"
                  />
                </div>
                <div className="flex-1">
                  <h3
                    className="text-2xl md:text-3xl font-bold mb-3"
                    style={{
                      color: '#2A2522',
                    }}
                  >
                    Rénovation Complète
                  </h3>
                  <p
                    className="leading-relaxed mb-4 text-[#5A5A5A]"
                  >
                    Transformation d'un appartement parisien en espace moderne et lumineux.
                  </p>
                  <div
                    className="flex items-center gap-2 text-xs uppercase tracking-wider"
                    style={{
                      color: '#5A5A5A',
                    }}
                  >
                    <span>Paris</span>
                    <span>•</span>
                    <span>2024</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Project 2 */}
          <div ref={project2Ref} className="lg:col-span-6">
            <div className="group relative h-full">
              <div 
                className="p-6 h-full flex flex-col"
                style={{
                  background: 'rgba(255, 255, 255, 0.4)',
                  backdropFilter: 'blur(40px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(40px) saturate(180%)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  clipPath: 'polygon(24px 0, calc(100% - 24px) 0, 100% 24px, 100% calc(100% - 24px), calc(100% - 24px) 100%, 24px 100%, 0 calc(100% - 24px), 0 24px)',
                }}
              >
                <div 
                  className="relative aspect-[16/9] lg:aspect-[2/1] overflow-hidden shadow-2xl mb-6"
                  style={{
                    clipPath: 'polygon(16px 0, calc(100% - 16px) 0, 100% 16px, 100% calc(100% - 16px), calc(100% - 16px) 100%, 16px 100%, 0 calc(100% - 16px), 0 16px)',
                  }}
                >
                  <div 
                    className="absolute inset-0 pointer-events-none z-30"
                    style={{
                      background: 'radial-gradient(ellipse 60% 40% at 50% -10%, rgba(212, 175, 119, 0.15) 0%, transparent 70%)',
                      mixBlendMode: 'soft-light',
                    }}
                  />
                  <div 
                    className="absolute inset-0 pointer-events-none z-20"
                    style={{
                      background: 'radial-gradient(ellipse 75% 75% at 50% 50%, transparent 40%, rgba(42, 37, 34, 0.2) 100%)',
                      mixBlendMode: 'multiply',
                    }}
                  />
                  <BeforeAfterSlider
                    beforeImage={beforeImage}
                    afterImage={afterImage}
                    className="w-full h-full"
                  />
                </div>
                <div className="flex-1">
                  <h3
                    className="text-2xl md:text-3xl font-bold mb-3"
                    style={{
                      color: '#2A2522',
                    }}
                  >
                    Cuisine Moderne
                  </h3>
                  <p
                    className="leading-relaxed mb-4 text-[#5A5A5A]"
                  >
                    Design contemporain avec finitions haut de gamme.
                  </p>
                  <div
                    className="flex items-center gap-2 text-xs uppercase tracking-wider"
                    style={{
                      color: '#5A5A5A',
                    }}
                  >
                    <span>Lyon</span>
                    <span>•</span>
                    <span>2024</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Project 3 */}
          <div ref={project3Ref} className="lg:col-span-6">
            <div className="group relative h-full">
              <div 
                className="p-6 h-full flex flex-col"
                style={{
                  background: 'rgba(255, 255, 255, 0.4)',
                  backdropFilter: 'blur(40px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(40px) saturate(180%)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  clipPath: 'polygon(24px 0, calc(100% - 24px) 0, 100% 24px, 100% calc(100% - 24px), calc(100% - 24px) 100%, 24px 100%, 0 calc(100% - 24px), 0 24px)',
                }}
              >
                <div 
                  className="relative aspect-[16/9] lg:aspect-[2/1] overflow-hidden shadow-2xl mb-6"
                  style={{
                    clipPath: 'polygon(16px 0, calc(100% - 16px) 0, 100% 16px, 100% calc(100% - 16px), calc(100% - 16px) 100%, 16px 100%, 0 calc(100% - 16px), 0 16px)',
                  }}
                >
                  <div 
                    className="absolute inset-0 pointer-events-none z-30"
                    style={{
                      background: 'radial-gradient(ellipse 60% 40% at 50% -10%, rgba(212, 175, 119, 0.15) 0%, transparent 70%)',
                      mixBlendMode: 'soft-light',
                    }}
                  />
                  <div 
                    className="absolute inset-0 pointer-events-none z-20"
                    style={{
                      background: 'radial-gradient(ellipse 75% 75% at 50% 50%, transparent 40%, rgba(42, 37, 34, 0.2) 100%)',
                      mixBlendMode: 'multiply',
                    }}
                  />
                  <BeforeAfterSlider
                    beforeImage="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                    afterImage="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                    className="w-full h-full"
                  />
                </div>
                <div className="flex-1">
                  <h3
                    className="text-2xl md:text-3xl font-bold mb-3"
                    style={{
                      color: '#2A2522',
                    }}
                  >
                    Salle de Bain Luxe
                  </h3>
                  <p
                    className="leading-relaxed mb-4 text-[#5A5A5A]"
                  >
                    Espace détente avec matériaux premium et éclairage sophistiqué.
                  </p>
                  <div
                    className="flex items-center gap-2 text-xs uppercase tracking-wider"
                    style={{
                      color: '#5A5A5A',
                    }}
                  >
                    <span>Marseille</span>
                    <span>•</span>
                    <span>2023</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
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