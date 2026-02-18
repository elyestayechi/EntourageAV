import { useRef, useEffect } from 'react';
import { gsap } from '../../shared/lib/gsap-init';
import { Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Marie & Jean Dubois',
    location: 'Paris 16ème',
    text: 'Entourage AV a transformé notre appartement en chef-d\'œuvre moderne. Leur attention aux détails et leur professionnalisme ont dépassé toutes nos attentes.',
    rating: 5,
    project: 'Rénovation Complète',
  },
  {
    id: 2,
    name: 'Sophie Laurent',
    location: 'Lyon',
    text: 'Une équipe exceptionnelle qui a donné vie à notre vision avec précision et créativité. Chaque aspect reflète leur engagement envers l\'excellence.',
    rating: 5,
    project: 'Rénovation Premium',
  },
  {
    id: 3,
    name: 'Pierre Martin',
    location: 'Marseille',
    text: 'Du concept à la réalisation, Entourage AV a livré au-delà de nos rêves. Leur approche moderne a rendu tout le processus transparent et sans stress.',
    rating: 5,
    project: 'Transformation Intérieure',
  },
];

export function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Staggered card animations
      testimonials.forEach((_, index) => {
        const card = document.querySelector(`[data-testimonial="${index}"]`);
        
        if (!card) return;

        // Card entrance
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 100,
            scale: 0.95,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.2,
            delay: index * 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );

        // Continuous parallax
        gsap.to(card, {
          y: -40,
          scrollTrigger: {
            trigger: card,
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
      id="testimonials"
      className="relative overflow-hidden py-20 md:py-32 bg-[#FAFAF9]"
      data-section="testimonials"
    >
      {/* Film grain texture */}
      

      <div className="container mx-auto px-6 sm:px-8 lg:px-12 relative z-10 max-w-[1400px]">
        {/* Header matching SectionHeader style */}
        <div className="flex flex-col items-center text-center mb-16">
          <h2 
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-3 md:mb-4"
            style={{ color: '#2A2522' }}
          >
            Ce Que Disent Nos Clients
          </h2>
          
          {/* Description with glass style */}
          <div 
            className="inline-flex px-6 py-3 max-w-2xl"
            style={{
              background: 'rgba(255, 255, 255, 0.3)',
              backdropFilter: 'blur(40px) saturate(180%)',
              WebkitBackdropFilter: 'blur(40px) saturate(180%)',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              clipPath: 'polygon(8px 0, calc(100% - 8px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px), 0 8px)',
            }}
          >
            <p className="text-base sm:text-lg leading-relaxed text-[#5A5A5A]">
              La satisfaction de nos clients est notre plus grande fierté. Découvrez leurs témoignages sur nos réalisations.
            </p>
          </div>
        </div>

        <div
          ref={cardsContainerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 mt-16"
          style={{ perspective: '2000px' }}
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              data-testimonial={index}
              className="group cursor-pointer"
              style={{ 
                transformStyle: 'preserve-3d',
              }}
            >
              <div
                className="p-8 rounded-3xl h-full flex flex-col hover:scale-105 transition-transform duration-500"
                style={{
                  background: '#FFFFFF',
                  boxShadow: '0 8px 32px rgba(42, 42, 42, 0.15), 0 4px 16px rgba(42, 42, 42, 0.1)',
                  border: '1px solid rgba(90, 90, 90, 0.1)',
                }}
              >
                {/* Quote mark with grey accent */}
                <div className="mb-6">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-10 h-10"
                    style={{
                      fill: '#2A2A2A',
                      filter: 'drop-shadow(0 2px 10px rgba(42, 42, 42, 0.4))',
                    }}
                  >
                    <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
                  </svg>
                </div>

                {/* Rating stars */}
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-current"
                      style={{
                        color: '#2A2A2A',
                        filter: 'drop-shadow(0 0 8px rgba(42, 42, 42, 0.3))',
                      }}
                    />
                  ))}
                </div>

                {/* Testimonial text */}
                <div className="mb-8 flex-1">
                  <p
                    className="leading-relaxed italic text-base lg:text-lg"
                    style={{
                      color: '#5A5A5A',
                      textShadow: '0 1px 10px rgba(42, 42, 42, 0.2)',
                    }}
                  >
                    "{testimonial.text}"
                  </p>
                </div>

                {/* Author info */}
                <div>
                  <div
                    className="w-12 h-px mb-4"
                    style={{
                      background: 'linear-gradient(90deg, #2A2A2A 0%, transparent 100%)',
                    }}
                  />
                  <div
                    className="font-bold text-lg mb-1"
                    style={{
                      color: '#2A2522',
                      textShadow: '0 2px 15px rgba(42, 42, 42, 0.3)',
                    }}
                  >
                    {testimonial.name}
                  </div>
                  <div
                    className="text-sm mb-2"
                    style={{
                      color: '#5A5A5A',
                      textShadow: '0 1px 8px rgba(42, 42, 42, 0.2)',
                    }}
                  >
                    {testimonial.location}
                  </div>
                  <div
                    className="text-xs uppercase tracking-wider"
                    style={{
                      color: '#2A2A2A',
                      textShadow: '0 1px 8px rgba(42, 42, 42, 0.2)',
                    }}
                  >
                    {testimonial.project}
                  </div>
                </div>

                {/* Hover grey glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl"
                  style={{
                    background: 'radial-gradient(circle at 50% 50%, rgba(42, 42, 42, 0.1) 0%, transparent 70%)',
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <button
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
            <span>Commencer votre projet</span>
            <span>→</span>
          </button>
        </div>
      </div>
    </section>
  );
}