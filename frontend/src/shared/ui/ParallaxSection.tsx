import { useRef, useEffect } from 'react';
import { gsap } from '../lib/gsap-init';
import { PremiumTextReveal } from './PremiumTextReveal';


interface ParallaxItem {
  title: string;
  category: string;
  description: string;
  image: string;
  align: 'left' | 'right';
  shapeVariant: 'diagonal-bottom-left' | 'diagonal-top-right' | 'diagonal-bottom-right' | 'diagonal-top-left';
}

const items: ParallaxItem[] = [
  {
    title: 'Finitions',
    category: 'LUXE',
    description:
      'Des détails parfaits qui font toute la différence. Nos artisans spécialisés apportent une attention méticuleuse à chaque finition, créant des espaces d\'une élégance intemporelle.',
    image: 'https://images.unsplash.com/photo-1601391548091-de4ff62ee29c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBmaW5pc2hpbmclMjBjYXJwZW50cnl8ZW58MXx8fHwxNzY4OTk1MjExfDA&ixlib=rb-4.1.0&q=80&w=1080',
    align: 'right',
    shapeVariant: 'diagonal-bottom-left',
  },
  {
    title: 'Menuiseries',
    category: 'MODERNE',
    description:
      'Fenêtres et portes conçues pour allier performance énergétique et design contemporain. Aluminium, PVC, chaque matériau est sélectionné pour sa qualité supérieure.',
    image: 'https://images.unsplash.com/photo-1609342066876-dce9c0782fb7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aW5kb3clMjBpbnN0YWxsYXRpb24lMjBhbHVtaW51bXxlbnwxfHx8fDE3Njg5OTUyMDh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    align: 'left',
    shapeVariant: 'diagonal-top-right',
  },
  {
    title: 'Systèmes',
    category: 'TECHNIQUE',
    description:
      'Électricité, plomberie, VMC - des installations techniques de pointe pour un confort optimal. Notre expertise garantit fiabilité et efficacité énergétique.',
    image: 'https://images.unsplash.com/photo-1751486289947-4f5f5961b3aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpY2FsJTIwd29yayUyMGluc3RhbGxhdGlvbnxlbnwxfHx8fDE3Njg5ODQyMDZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    align: 'right',
    shapeVariant: 'diagonal-bottom-right',
  },
];

export function ParallaxSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  

  // Define different organic shape clip-paths
  const shapeStyles: Record<string, string> = {
    'diagonal-bottom-left': `polygon(
      0 0,
      100% 0,
      100% 100%,
      25% 100%,
      0 75%
    )`,
    'diagonal-top-right': `polygon(
      0 0,
      75% 0,
      100% 25%,
      100% 100%,
      0 100%
    )`,
    'diagonal-bottom-right': `polygon(
      0 0,
      100% 0,
      100% 75%,
      75% 100%,
      0 100%
    )`,
    'diagonal-top-left': `polygon(
      25% 0,
      100% 0,
      100% 100%,
      0 100%,
      0 25%
    )`
  };

  useEffect(() => {
    const currentRef = sectionRef.current;
    if (!currentRef) return;

    const ctx = gsap.context(() => {
      // Animate the trapezoid dent morphing at the top (inverted, same as Contact)
      // Inner edge (25rem) stays fixed, outer edges (35rem) move
      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'top top',
          scrub: 2.5,
          onUpdate: (self) => {
            const progress = self.progress;
            
            // Calculate the morph progression - subtle luxury dent (inverted)
            // 0 = outer edges low (initial state - dent pointing UP into beige, +2% depth)
            // 0.5 = straight (middle - 0% depth)
            // 1 = outer edges high (final state - dent goes away, -2% depth)
            
            let dentDepth;
            if (progress < 0.5) {
              // From low to straight (0 to 0.5)
              const subProgress = progress / 0.5;
              dentDepth = 2 - (subProgress * 2); // 2% to 0%
            } else {
              // From straight to high (0.5 to 1)
              const subProgress = (progress - 0.5) / 0.5;
              dentDepth = -(subProgress * 2); // 0% to -2%
            }
            
            if (sectionRef.current) {
              // Premium small dent dimensions - wider, leaving ~20% from edges
              const innerVertical = '1.2rem';
              const outerVertical = '1.8rem';
              const innerHorizontal = '25%'; // 50% - 25% = 25% from left edge, 50% + 25% = 75% from left edge
              const outerHorizontal = '30%'; // 50% - 30% = 20% from left edge, 50% + 30% = 80% from left edge
              
              sectionRef.current.style.clipPath = `polygon(
                0 calc(${outerVertical} + ${dentDepth}%),
                calc(50% - ${outerHorizontal}) calc(${outerVertical} + ${dentDepth}%),
                calc(50% - ${innerHorizontal}) ${innerVertical},
                calc(50% + ${innerHorizontal}) ${innerVertical},
                calc(50% + ${outerHorizontal}) calc(${outerVertical} + ${dentDepth}%),
                100% calc(${outerVertical} + ${dentDepth}%),
                100% 100%,
                0 100%
              )`;
            }
          },
        },
      });

      const parallaxTexts = currentRef.querySelectorAll('[data-parallax-text]');
      const parallaxCategories = currentRef.querySelectorAll('[data-parallax-category]');
      const parallaxImages = currentRef.querySelectorAll('[data-parallax-image]');
      const parallaxClips = currentRef.querySelectorAll('[data-parallax-clip]');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: currentRef,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      parallaxTexts.forEach((text, index) => {
        tl.from(text, { y: 100, duration: 0.5 }, index * 0.1);
      });

      parallaxCategories.forEach((category, index) => {
        tl.from(category, { y: 100, duration: 0.5 }, index * 0.1);
      });

      parallaxImages.forEach((image, index) => {
        tl.from(image, { y: 100, duration: 0.5 }, index * 0.1);
      });

      parallaxClips.forEach((clip, index) => {
        tl.from(clip, { y: 100, duration: 0.5 }, index * 0.1);
      });
    }, currentRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="parallax"
      className="bg-[#2A2A2A] py-16 sm:py-20 md:py-32 relative overflow-hidden"
      data-section="parallax"
    >
      {/* Consistent film grain texture */}
      

      <div className="container mx-auto px-8 sm:px-6 md:px-12 lg:px-16 max-w-[1600px] relative z-10">
        {items.map((item, index) => (
          <div
            key={index}
            className={`grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center ${
              index === items.length - 1 ? 'mb-0' : 'mb-80'
            }`}
          >
            {/* Text - alternates left/right */}
            {item.align === 'left' && (
              <div data-parallax-text={index} className="lg:col-span-5 lg:col-start-1">
                <div
                  data-parallax-category={index}
                  className="uppercase text-xs tracking-[0.3em] mb-8 font-medium flex items-center gap-3"
                  style={{ color: 'var(--color-gold)' }}
                >
                  <div className="w-8 h-px" style={{ background: 'var(--color-gold)' }}></div>
                  {item.category}
                </div>
                <div className="mb-8">
                  <PremiumTextReveal>
                    <h2 className="text-5xl lg:text-7xl leading-[0.85] font-bold" style={{ color: 'var(--color-base-cream)' }}>
                      {item.title}
                    </h2>
                  </PremiumTextReveal>
                </div>
                <p className="text-white/60 max-w-md leading-relaxed text-base lg:text-lg">
                  {item.description}
                </p>

                {/* Decorative element */}
                <div className="flex items-center gap-4 mt-6">
                  <div 
                    className="w-12 h-12 flex items-center justify-center"
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      backdropFilter: 'blur(40px) saturate(180%)',
                      WebkitBackdropFilter: 'blur(40px) saturate(180%)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      clipPath: 'polygon(8px 0, calc(100% - 8px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px), 0 8px)',
                    }}
                  >
                    <div 
                      className="w-6 h-6"
                      style={{
                        background: 'var(--color-gold)',
                        clipPath: 'polygon(4px 0, calc(100% - 4px) 0, 100% 4px, 100% calc(100% - 4px), calc(100% - 4px) 100%, 4px 100%, 0 calc(100% - 4px), 0 4px)',
                        opacity: 0.3,
                      }}
                    ></div>
                  </div>
                  <div className="text-white/60 text-sm">Design Moderne</div>
                </div>
              </div>
            )}

            {/* Image with organic clip shape */}
            <div className={`lg:col-span-6 ${item.align === 'left' ? 'lg:col-start-7' : 'lg:col-start-1'}`}>
              <div
                data-parallax-clip={index}
                className="aspect-[4/5] relative overflow-hidden"
                style={{ 
                  clipPath: shapeStyles[item.shapeVariant],
                  willChange: 'transform'
                }}
              >
                <img
                  data-parallax-image={index}
                  src={item.image}
                  alt={item.title}
                  className="w-full h-[130%] object-cover will-change-transform"
                  style={{ transform: 'translateY(0)' }}
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
              </div>
            </div>

            {/* Text - when image is on left */}
            {item.align === 'right' && (
              <div data-parallax-text={index} className="lg:col-span-5 lg:col-start-8">
                <div 
                  className="uppercase text-xs mb-4 tracking-[0.3em] flex items-center gap-3"
                  style={{ color: 'var(--color-gold)' }}
                >
                  <div className="w-8 h-px" style={{ background: 'var(--color-gold)' }}></div>
                  Projet 02
                </div>
                
                <div>
                  <PremiumTextReveal>
                    <h2 className="text-5xl lg:text-7xl leading-[0.85] font-bold" style={{ color: 'var(--color-base-cream)' }}>
                      {item.title}
                    </h2>
                  </PremiumTextReveal>
                </div>
                <p className="text-white/60 max-w-md leading-relaxed text-base lg:text-lg">
                  {item.description}
                </p>

                {/* Decorative element */}
                <div className="mt-16 flex items-center gap-4">
                  <div 
                    className="w-12 h-12 flex items-center justify-center"
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      backdropFilter: 'blur(40px) saturate(180%)',
                      WebkitBackdropFilter: 'blur(40px) saturate(180%)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      clipPath: 'polygon(8px 0, calc(100% - 8px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px), 0 8px)',
                    }}
                  >
                    <div 
                      className="w-6 h-6"
                      style={{
                        background: 'var(--color-gold)',
                        clipPath: 'polygon(4px 0, calc(100% - 4px) 0, 100% 4px, 100% calc(100% - 4px), calc(100% - 4px) 100%, 4px 100%, 0 calc(100% - 4px), 0 4px)',
                        opacity: 0.3,
                      }}
                    ></div>
                  </div>
                  <div className="text-xs uppercase tracking-wider text-white/40">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}