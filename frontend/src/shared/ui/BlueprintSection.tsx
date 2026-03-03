import { useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router';
import { ArrowRight, Plus, Minus } from 'lucide-react';

const STEPS = [
  {
    number: '01',
    title: 'Consultation & Design',
    description:
      "Nous débutons par une rencontre approfondie pour comprendre votre vision, vos besoins et votre budget. Nos designers élaborent des plans détaillés pour visualiser le résultat final avant le début des travaux.",
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?crop=entropy&cs=tinysrgb&fit=max&fm=webp&q=80&w=1600',
  },
  {
    number: '02',
    title: 'Planification & Approvisionnement',
    description:
      "Une fois le design validé, nous établissons un calendrier précis et sélectionnons les matériaux avec soin. Nos partenaires garantissent qualité et livraison au bon moment.",
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?crop=entropy&cs=tinysrgb&fit=max&fm=webp&q=80&w=1600',
  },
  {
    number: '03',
    title: 'Construction & Artisanat',
    description:
      "Nos artisans qualifiés exécutent les travaux avec précision — électricité, plomberie, menuiseries, carrelage. Chaque détail est soigné selon les standards les plus exigeants.",
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?crop=entropy&cs=tinysrgb&fit=max&fm=webp&q=80&w=1600',
  },
  {
    number: '04',
    title: 'Livraison & Remise des Clés',
    description:
      "Une inspection rigoureuse précède chaque livraison. Nous ne considérons le travail terminé que lorsque vous êtes entièrement satisfait du résultat.",
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?crop=entropy&cs=tinysrgb&fit=max&fm=webp&q=80&w=1600',
  },
];

function useTouchDevice() {
  const [isTouch, setIsTouch] = useState(false);
  useEffect(() => {
    const handler = () => setIsTouch(true);
    window.addEventListener('touchstart', handler, { once: true, passive: true });
    return () => window.removeEventListener('touchstart', handler);
  }, []);
  return isTouch;
}

export function BlueprintSection() {
  const isTouch = useTouchDevice();
  const [active, setActive] = useState<number | null>(null);

  const handleClick = useCallback((i: number) => {
    if (!isTouch) return;
    setActive(prev => (prev === i ? null : i));
  }, [isTouch]);

  const handleMouseEnter = useCallback((i: number) => {
    if (isTouch) return;
    setActive(i);
  }, [isTouch]);

  const handleMouseLeave = useCallback(() => {
    if (isTouch) return;
    setActive(null);
  }, [isTouch]);

  return (
    <section
      id="methode"
      data-section="methode"
      className="relative bg-[#FAFAF9] py-16 sm:py-20 md:py-24 overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">

        {/* Header */}
        <div className="flex items-end justify-between mb-8 md:mb-10 pb-5
                        border-b border-[rgba(42,37,34,0.12)]">
          <div>
            <p className="text-[10px] sm:text-xs font-medium uppercase tracking-[0.25em] mb-2"
               style={{ color: '#5A5A5A' }}>
              Notre Méthode
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-none tracking-tight"
                style={{ color: '#2A2522' }}>
              De la vision à la réalité
            </h2>
          </div>
        </div>

        {/* Rows */}
        <div>
          {STEPS.map((step, i) => {
            const isActive = active === i;
            return (
              <div key={step.number}>
                {i > 0 && (
                  <div className="w-full h-px" style={{ background: 'rgba(42,37,34,0.10)' }} />
                )}

                <div
                  onClick={() => handleClick(i)}
                  onMouseEnter={() => handleMouseEnter(i)}
                  onMouseLeave={handleMouseLeave}
                  className="group relative overflow-hidden cursor-pointer
                             transition-[min-height] duration-500 ease-in-out"
                  style={{ minHeight: isActive ? 'clamp(220px, 35vw, 320px)' : '68px' }}
                >
                  {/* Full-bleed image */}
                  <div
                    className="absolute inset-0 transition-opacity duration-500"
                    style={{ opacity: isActive ? 1 : 0 }}
                    aria-hidden="true"
                  >
                    <img
                      src={step.image}
                      alt=""
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background: 'linear-gradient(to right, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.40) 55%, rgba(0,0,0,0.08) 100%)',
                      }}
                    />
                  </div>

                  {/* Top row */}
                  <div className="relative z-10 flex items-center justify-between
                                  py-5 sm:py-[22px] gap-3 sm:gap-6">

                    {/* Number + title — indented on tablet/desktop */}
                    <div className="flex items-center gap-4 sm:gap-6 md:gap-8 min-w-0 flex-1
                                    md:pl-6 lg:pl-10">
                      <span
                        className="text-xs font-mono flex-shrink-0 w-6 transition-colors duration-300"
                        style={{ color: isActive ? 'rgba(255,255,255,0.45)' : 'rgba(90,90,90,0.45)' }}
                      >
                        {step.number}
                      </span>
                      <h3
                        className="text-base sm:text-xl md:text-2xl lg:text-3xl
                                   font-bold leading-tight transition-colors duration-300"
                        style={{ color: isActive ? '#F6F2E8' : '#2A2522' }}
                      >
                        {step.title}
                      </h3>
                    </div>

                    {/* Desktop only: description slides in */}
                    <p
                      className="hidden lg:block text-sm leading-relaxed
                                 flex-shrink-0 max-w-[320px] text-right
                                 transition-all duration-500"
                      style={{
                        color: isActive ? '#F6F2E8' : 'rgba(90,90,90,0.0)',
                        transform: isActive ? 'translateX(0)' : 'translateX(16px)',
                        pointerEvents: 'none',
                      }}
                    >
                      {step.description}
                    </p>

                    {/* Mobile + tablet (< lg): plus/minus */}
                    <div className="lg:hidden flex-shrink-0">
                      {isActive
                        ? <Minus className="w-4 h-4" style={{ color: 'rgba(246,242,232,0.7)' }} />
                        : <Plus className="w-4 h-4" style={{ color: 'rgba(90,90,90,0.5)' }} />
                      }
                    </div>

                    {/* Desktop only: arrow */}
                    <ArrowRight
                      className="hidden lg:block w-5 h-5 flex-shrink-0 transition-all duration-300"
                      style={{
                        color: isActive ? '#F6F2E8' : 'transparent',
                        transform: isActive ? 'translateX(0)' : 'translateX(-8px)',
                      }}
                    />
                  </div>

                  {/* Mobile + tablet: description expands below, same indent as title */}
                  <div
                    className="lg:hidden relative z-10 overflow-hidden
                               transition-all duration-500 ease-in-out"
                    style={{
                      maxHeight: isActive ? '120px' : '0px',
                      opacity: isActive ? 1 : 0,
                      paddingBottom: isActive ? '20px' : '0px',
                    }}
                  >
                    {/* md:pl-6 lg:pl-10 matches the number+title indent exactly */}
                    <p className="text-sm leading-relaxed pr-8 md:pl-6 lg:pl-10"
                       style={{ color: '#F6F2E8' }}>
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}

          <div className="w-full h-px" style={{ background: 'rgba(42,37,34,0.10)' }} />
        </div>

        {/* CTA — centered */}
        <div className="mt-10 sm:mt-12 flex justify-center">
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 px-7 sm:px-8 py-3.5 sm:py-4
                       font-medium uppercase tracking-wider text-sm
                       transition-all duration-300 hover:scale-105"
            style={{
              background: 'rgba(0,0,0,0.85)',
              backdropFilter: 'blur(40px) saturate(180%)',
              WebkitBackdropFilter: 'blur(40px) saturate(180%)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06)',
              border: '1px solid rgba(80,80,80,0.25)',
              clipPath: 'polygon(12px 0, calc(100% - 12px) 0, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px), 0 12px)',
              color: 'var(--color-base-cream)',
            }}
          >
            <span>Démarrer mon projet</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}