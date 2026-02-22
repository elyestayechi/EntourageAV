import { useRef, useEffect, useState } from 'react';
import { gsap, ScrollTrigger } from '../../shared/lib/gsap-init';
import { FlipCounter } from '../../shared/ui/FlipCounter';
import { FilmGrainTexture } from '../../shared/ui/FilmGrainTexture';
import { SlotMachineCounter } from '../../shared/ui/SlotMachineCounter';

const servicePairs = [
  {
    id: 1,
    services: [
      { number: '01', title: 'Rénovations Intérieures', description: "Transformations complètes d'espaces résidentiels et commerciaux avec finitions de qualité." },
      { number: '02', title: "Design d'Intérieur", description: "Conception et aménagement d'espaces personnalisés alliant esthétique et fonctionnalité." },
    ],
    imageUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=2400',
  },
  {
    id: 2,
    services: [
      { number: '03', title: 'Portes Intérieures & Coupe-Feu', description: 'Large catalogue de portes sur mesure, portes intérieures et portes coupe-feu certifiées.' },
      { number: '04', title: 'Fenêtres & Menuiseries', description: 'Installation de fenêtres et menuiseries en aluminium et PVC de haute qualité.' },
    ],
    imageUrl: 'https://images.unsplash.com/photo-1502005097973-6a7082348e28?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=2400',
  },
  {
    id: 3,
    services: [
      { number: '05', title: 'Électricité Intérieure & Extérieure', description: 'Installation électrique complète pour tous types de bâtiments résidentiels et commerciaux.' },
      { number: '06', title: 'Travaux Sanitaires & Plomberie', description: 'Systèmes de plomberie et installations sanitaires performants et durables.' },
    ],
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=2400',
  },
  {
    id: 4,
    services: [
      { number: '07', title: 'VMC & Ventilation', description: 'Systèmes de ventilation mécanique contrôlée pour un air sain et une efficacité énergétique.' },
      { number: '08', title: 'Carrelage & Gresie', description: 'Pose de carrelage et revêtements en gresie pour sols et murs, finitions impeccables.' },
    ],
    imageUrl: 'https://images.unsplash.com/photo-1556909212-d5b604d0c90d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=2400',
  },
  {
    id: 5,
    services: [
      { number: '09', title: 'Placo & Plâtre', description: 'Installation de plaques de plâtre et travaux de placo pour cloisons et finitions murales.' },
      { number: '10', title: 'Finitions Complètes', description: 'Peintures, revêtements et touches décoratives finales pour un résultat parfait.' },
    ],
    imageUrl: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=2400',
  },
  {
    id: 6,
    services: [{ number: '11', title: 'Rénovation Énergétique', description: 'Modernisation énergétique de bâtiments publics et privés pour performance optimale.' }],
    imageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=2400',
  },
];

function ServiceItem({
  service,
  index,
  isActive,
}: {
  service: { number: string; title: string; description: string };
  index: number;
  isActive: boolean;
}) {
  const titleRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!titleRef.current || !descriptionRef.current || !isActive) return;

    gsap.set(titleRef.current, { y: 30, opacity: 0 });
    gsap.set(descriptionRef.current, { y: 20, opacity: 0 });

    gsap.to(titleRef.current, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' });
    gsap.to(descriptionRef.current, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.1 });
  }, [isActive, index]);

  return (
    <div className="mb-8 sm:mb-10 last:mb-0">
      <div className="flex items-start gap-3 mb-3">
        <div className="leading-[1.15] flex-1">
          <div
            ref={titleRef}
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-2 sm:mb-3"
            style={{ color: 'var(--color-navy-sky)' }}
          >
            {service.title}
          </div>
        </div>
      </div>
      <div className="overflow-hidden">
        <div ref={descriptionRef} className="transition-all duration-700">
          <p className="text-sm sm:text-base md:text-lg max-w-2xl" style={{ color: 'var(--color-base-slate)' }}>
            {service.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export function StickyServices() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const servicesContainerRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const clipPathRef = useRef<HTMLDivElement>(null);
  const initializedRef = useRef(false);
  const [currentPairIndex, setCurrentPairIndex] = useState(0);

  const DENT_WIDTH = 3;
  const DENT_SMALL_SIDE_HEIGHT = 6;
  const DENT_LARGE_SIDE_HEIGHT = 8;

  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    if (!sectionRef.current || !stickyRef.current || !clipPathRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom bottom',
        pin: stickyRef.current,
        pinSpacing: false,
        anticipatePin: 1,
        refreshPriority: 0,
      });

      gsap.set(clipPathRef.current, { '--dent-position': '20%' });
      gsap.to(clipPathRef.current, {
        '--dent-position': '75%',
        ease: 'power1.inOut',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.5,
          refreshPriority: 0,
        },
      });

      servicePairs.forEach((_, index) => {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: () => `top+=${index * window.innerHeight} top`,
          end: () => `top+=${(index + 1) * window.innerHeight} top`,
          onEnter: () => setCurrentPairIndex(index),
          onEnterBack: () => setCurrentPairIndex(index),
          refreshPriority: 0,
        });
      });
    }, sectionRef);

    return () => {
      initializedRef.current = false;
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className="bg-[#FAFAF9] relative"
      data-section="services"
      style={{ height: `${servicePairs.length * 100 + 60}vh` }}
    >
      <FilmGrainTexture />

      <div ref={stickyRef} className="h-screen flex items-center" style={{ background: '#FAFAF9' }}>
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 relative max-w-[1800px] w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 md:gap-12 lg:gap-16 items-center">

            {/* Left side - Text Content */}
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="mb-6 sm:mb-8 lg:mb-10">
                <SlotMachineCounter
                  number={`0${currentPairIndex + 1}`}
                  isActive={true}
                />
              </div>

              <div className="relative">
                <div className="overflow-hidden relative" style={{ minHeight: '300px', maxHeight: '60vh' }}>
                  <div ref={servicesContainerRef} className="relative">
                    {servicePairs.map((pair, index) => (
                      <div
                        key={index}
                        className={`transition-all duration-500 ${
                          index === currentPairIndex ? 'block' : 'hidden'
                        }`}
                      >
                        <div className="flex items-center gap-3 mb-4 sm:mb-6 md:mb-8">
                          <div className="flex" style={{ perspective: '800px' }}>
                            <FlipCounter value={pair.id} />
                          </div>
                          <div className="w-8 sm:w-12 md:w-16 h-px" style={{ background: 'var(--color-navy-sky)' }} />
                        </div>

                        <div className="space-y-4 sm:space-y-5 md:space-y-6">
                          {pair.services.map((service, serviceIndex) => (
                            <ServiceItem
                              key={serviceIndex}
                              service={service}
                              index={index * 2 + serviceIndex}
                              isActive={index === currentPairIndex}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Image (Hidden on mobile, shows on lg screens) */}
            <div ref={imageContainerRef} className="lg:col-span-7 order-1 lg:order-2 hidden lg:block">
              <div
                className="relative w-full mx-auto"
                style={{ aspectRatio: '4/5' }}
              >
                <div
                  ref={clipPathRef}
                  className="glass-warm-glow-intense relative w-full h-full overflow-hidden"
                  style={{
                    '--dent-position': '15%',
                    clipPath: `polygon(
                      0 0.5rem,
                      0.5rem 0,
                      100% 0,
                      100% calc(100% - 0.5rem),
                      calc(100% - 0.5rem) 100%,
                      0 100%,
                      0% calc(var(--dent-position) + ${DENT_LARGE_SIDE_HEIGHT}rem),
                      ${DENT_WIDTH}% calc(var(--dent-position) + ${DENT_SMALL_SIDE_HEIGHT}rem),
                      ${DENT_WIDTH}% calc(var(--dent-position) - ${DENT_SMALL_SIDE_HEIGHT}rem),
                      0% calc(var(--dent-position) - ${DENT_LARGE_SIDE_HEIGHT}rem)
                    )`,
                  } as React.CSSProperties}
                >
                  {servicePairs.map((pair, index) => (
                    <img
                      key={index}
                      src={pair.imageUrl}
                      alt={pair.services[0].title}
                      className="absolute inset-0 w-full h-full object-cover"
                      style={{
                        opacity: index === currentPairIndex ? 1 : 0,
                        transition: 'opacity 0.5s ease-in-out',
                      }}
                    />
                  ))}

                  <div
                    className="absolute inset-0 pointer-events-none z-10"
                    style={{
                      backgroundImage: `linear-gradient(0deg, transparent 49%, rgba(74,74,74,0.15) 50%, transparent 51%),
                                       linear-gradient(90deg, transparent 49%, rgba(74,74,74,0.15) 50%, transparent 51%)`,
                      backgroundSize: '40px 40px',
                      opacity: 0.3,
                      mixBlendMode: 'multiply',
                    }}
                  />
                  <FilmGrainTexture />
                </div>
              </div>
            </div>

            {/* Mobile Image - Shows on mobile only (simplified) */}
            <div className="lg:hidden order-3 mt-6">
              <div className="relative w-full" style={{ aspectRatio: '16/9' }}>
                <img
                  src={servicePairs[currentPairIndex].imageUrl}
                  alt={servicePairs[currentPairIndex].services[0].title}
                  className="w-full h-full object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black/10" />
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}