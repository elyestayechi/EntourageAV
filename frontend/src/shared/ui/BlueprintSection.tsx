import { useRef, useEffect, useState } from 'react';
import { gsap, ScrollTrigger } from '../lib/gsap-init';
import { FilmGrainTexture } from './FilmGrainTexture';
import { FlipCounter } from './FlipCounter';

const processSteps = [
  {
    number: '01',
    title: 'Premier Contact',
    subtitle: 'Consultation initiale',
    description: 'Nous écoutons vos besoins et vos idées pour comprendre votre vision et établir les premières bases du projet.',
    details: 'Visite sur site • Analyse des besoins • Budget préliminaire',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop',
  },
  {
    number: '02',
    title: 'Conception',
    subtitle: 'Plans et modélisation',
    description: "Élaboration de plans détaillés avec modélisation 3D, choix des matériaux et calendrier précis d'exécution.",
    details: 'Plans techniques • Devis détaillé • Planning prévisionnel',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2831&auto=format&fit=crop',
  },
  {
    number: '03',
    title: 'Préparation',
    subtitle: 'Organisation du chantier',
    description: 'Coordination des équipes, commande des matériaux et mise en place de toutes les mesures de sécurité nécessaires.',
    details: 'Approvisionnement • Permis • Coordination',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2076&auto=format&fit=crop',
  },
  {
    number: '04',
    title: 'Réalisation',
    subtitle: 'Exécution des travaux',
    description: 'Exécution méticuleuse de chaque phase du projet avec suivi quotidien et contrôle qualité à chaque étape.',
    details: 'Gros œuvre • Second œuvre • Contrôles qualité',
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop',
  },
  {
    number: '05',
    title: 'Finitions',
    subtitle: 'Perfectionnement',
    description: 'Perfectionnement de chaque détail, nettoyage complet et derniers ajustements pour un résultat impeccable.',
    details: 'Finitions soignées • Nettoyage • Ajustements finaux',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=2070&auto=format&fit=crop',
  },
  {
    number: '06',
    title: 'Livraison',
    subtitle: 'Remise et garanties',
    description: 'Remise des clés, formation aux équipements installés et activation des garanties décennales et biennales.',
    details: 'Réception des travaux • Garanties • Service après-vente',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop',
  },
];

function StepItem({
  step,
  index,
  isActive,
}: {
  step: typeof processSteps[number];
  index: number;
  isActive: boolean;
}) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      !titleRef.current || !subtitleRef.current || !descriptionRef.current ||
      !detailsRef.current || !numberRef.current || !isActive
    ) return;

    gsap.set([numberRef.current, titleRef.current, subtitleRef.current], { x: -50, opacity: 0 });
    gsap.set([descriptionRef.current, detailsRef.current], { x: -30, opacity: 0 });

    gsap.to([numberRef.current, titleRef.current, subtitleRef.current], {
      x: 0, opacity: 1, duration: 0.7, ease: 'power3.out', stagger: 0.05,
    });
    gsap.to([descriptionRef.current, detailsRef.current], {
      x: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.1, stagger: 0.05,
    });
  }, [isActive, index]);

  return (
    <>
      <div>
        <div className="mb-4 md:mb-6">
          <div ref={numberRef}>
            <div className="text-6xl sm:text-7xl md:text-8xl font-bold opacity-10" style={{ color: 'var(--color-navy-sky)' }}>
              {step.number}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 mb-4">
          <div className="flex" style={{ perspective: '800px' }}>
            <FlipCounter value={parseInt(step.number)} />
          </div>
          <div className="w-12 sm:w-16 h-px" style={{ background: 'var(--color-navy-sky)', opacity: 0.5 }} />
        </div>

        <h3 ref={titleRef} className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2" style={{ color: 'var(--color-navy-sky)' }}>
          {step.title}
        </h3>
        <h4 ref={subtitleRef} className="text-lg sm:text-xl md:text-2xl font-light" style={{ color: 'var(--color-base-slate)' }}>
          {step.subtitle}
        </h4>
      </div>

      <div>
        <p ref={descriptionRef} className="text-sm sm:text-base md:text-lg mb-6 leading-relaxed" style={{ color: 'var(--color-base-slate)' }}>
          {step.description}
        </p>
        <div ref={detailsRef} className="pt-4 md:pt-6 border-t" style={{ borderColor: 'rgba(42, 37, 34, 0.1)' }}>
          <div className="text-xs uppercase tracking-wider mb-3" style={{ color: 'var(--color-navy-sky)', opacity: 0.6 }}>
            Inclus
          </div>
          <p className="text-sm" style={{ color: 'var(--color-base-slate)', opacity: 0.8 }}>
            {step.details}
          </p>
        </div>
      </div>
    </>
  );
}

export function BlueprintSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stickyContainerRef = useRef<HTMLDivElement>(null);
  const clipPathRef = useRef<HTMLDivElement>(null);
  const initializedRef = useRef(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const DENT_HEIGHT = 3;
  const DENT_SMALL_SIDE_WIDTH = 6;
  const DENT_LARGE_SIDE_WIDTH = 8;

  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    if (!sectionRef.current || !stickyContainerRef.current) return;

    const ctx = gsap.context(() => {
      // Dent animation — only if image panel is mounted (md+)
      if (clipPathRef.current) {
        gsap.set(clipPathRef.current, { '--dent-position': '20%' });
        gsap.to(clipPathRef.current, {
          '--dent-position': '75%',
          ease: 'power1.inOut',
          scrollTrigger: {
            trigger: stickyContainerRef.current,
            start: 'top top',
            // +1 so the dent finishes animating over all steps including the buffer
            end: `+=${processSteps.length * 100}%`,
            scrub: 1.5,
            refreshPriority: -1,
          },
        });
      }

      // Per-step triggers — now covers all 6 steps with a full vh each
      processSteps.forEach((_, index) => {
        ScrollTrigger.create({
          trigger: stickyContainerRef.current,
          start: () => `top+=${index * window.innerHeight} top`,
          end: () => `top+=${(index + 1) * window.innerHeight} top`,
          onEnter: () => setCurrentStepIndex(index),
          onEnterBack: () => setCurrentStepIndex(index),
          refreshPriority: -1,
        });
      });

      // Pin — extended by one extra vh so step 06 has a full dwell before unpinning
      ScrollTrigger.create({
        trigger: stickyContainerRef.current,
        start: 'top top',
        end: `+=${processSteps.length * 100}%`,
        pin: true,
        pinSpacing: true,
        refreshPriority: -1,
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
      className="bg-[#FAFAF9] relative py-16 md:py-24 pb-32"
      data-section="blueprint"
    >
      <FilmGrainTexture />

      <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 relative max-w-[1800px] mb-16 md:mb-24">
        <div
          className="uppercase text-xs mb-4 lg:mb-6 tracking-[0.3em] font-medium flex items-center gap-3"
          style={{ color: 'var(--color-navy-sky)', opacity: 0.6 }}
        >
          <div className="w-8 h-px" style={{ background: 'var(--color-navy-sky)', opacity: 0.6 }} />
          PROCESSUS
        </div>
      </div>

      <div ref={stickyContainerRef} className="h-screen relative">

        {/* ── Mobile-only chapter header — same structure as StickyServices ── */}
        <div
          className="md:hidden absolute top-0 inset-x-0 z-10 overflow-hidden pb-6"
          style={{ background: `linear-gradient(180deg, transparent 0%, var(--color-navy-blue)08 50%, transparent 100%)` }}
        >
          <div className="container mx-auto px-4 sm:px-8 relative z-10">
            <div className="flex items-center gap-4">
              {/* Large chapter number — solid black */}
              <div
                className="text-[80px] sm:text-[120px] font-bold leading-none flex-shrink-0"
                style={{ color: '#000000', opacity: 1 }}
              >
                05
              </div>
              {/* Title + subtitle */}
              <div className="flex-1 min-w-0">
                <h3
                  className="text-xl sm:text-2xl font-bold leading-tight"
                  style={{ color: 'var(--color-navy-blue)' }}
                >
                  Notre Méthode
                </h3>
                <p className="mt-2 text-sm leading-relaxed max-w-xl" style={{ color: '#5A5A5A' }}>
                  Un processus structuré et transparent, de la consultation à la livraison finale.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 relative max-w-[1800px] h-full">
          <div className="h-full flex items-center justify-center">
            <div className="w-full max-w-6xl">

              {/* ── Dented image panel — hidden on mobile, shown on md+ ── */}
              <div className="hidden md:block mb-12">
                <div
                  ref={clipPathRef}
                  className="relative w-full overflow-hidden shadow-2xl rounded-lg"
                  style={{
                    aspectRatio: '21/9',
                    '--dent-position': '20%',
                    background: 'rgba(250, 250, 249, 0.5)',
                    clipPath: `polygon(
                      0.5rem 0,
                      calc(100% - 0.5rem) 0,
                      100% 0.5rem,
                      100% calc(100% - 0.5rem),
                      calc(100% - 0.5rem) 100%,
                      calc(var(--dent-position) + ${DENT_LARGE_SIDE_WIDTH}rem) 100%,
                      calc(var(--dent-position) + ${DENT_SMALL_SIDE_WIDTH}rem) calc(100% - ${DENT_HEIGHT}%),
                      calc(var(--dent-position) - ${DENT_SMALL_SIDE_WIDTH}rem) calc(100% - ${DENT_HEIGHT}%),
                      calc(var(--dent-position) - ${DENT_LARGE_SIDE_WIDTH}rem) 100%,
                      0.5rem 100%,
                      0 calc(100% - 0.5rem),
                      0 0.5rem
                    )`,
                  } as React.CSSProperties}
                >
                  <img
                    src={processSteps[currentStepIndex].image}
                    alt={processSteps[currentStepIndex].title}
                    className="w-full h-full object-cover"
                    style={{ transition: 'opacity 0.6s ease-in-out' }}
                    key={currentStepIndex}
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20" />
                  <FilmGrainTexture />
                </div>
              </div>

              {/* ── Step text content — always visible ── */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 max-w-5xl mx-auto">
                <StepItem
                  step={processSteps[currentStepIndex]}
                  index={currentStepIndex}
                  isActive={true}
                />
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}