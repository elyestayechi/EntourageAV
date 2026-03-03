import { useState, useCallback, useEffect } from 'react';
import { Plus, Minus } from 'lucide-react';

const SERVICES = [
  {
    number: '01',
    title: 'Rénovations Intérieures',
    description: "Transformations complètes d'espaces résidentiels et commerciaux avec finitions de qualité supérieure.",
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?crop=entropy&cs=tinysrgb&fit=max&fm=webp&q=80&w=1600',
  },
  {
    number: '02',
    title: "Design d'Intérieur",
    description: "Conception et aménagement d'espaces personnalisés alliant esthétique et fonctionnalité.",
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?crop=entropy&cs=tinysrgb&fit=max&fm=webp&q=80&w=1600',
  },
  {
    number: '03',
    title: 'Portes & Menuiseries',
    description: 'Portes intérieures, coupe-feu certifiées, fenêtres aluminium et PVC haute qualité.',
    image: 'https://images.unsplash.com/photo-1502005097973-6a7082348e28?crop=entropy&cs=tinysrgb&fit=max&fm=webp&q=80&w=1600',
  },
  {
    number: '04',
    title: 'Électricité & Plomberie',
    description: 'Installation électrique complète et systèmes sanitaires performants pour tous types de bâtiments.',
    image: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?crop=entropy&cs=tinysrgb&fit=max&fm=webp&q=80&w=1600',
  },
  {
    number: '05',
    title: 'VMC & Carrelage',
    description: 'Ventilation mécanique contrôlée et pose de carrelage gresie — finitions impeccables.',
    image: 'https://images.unsplash.com/photo-1556909212-d5b604d0c90d?crop=entropy&cs=tinysrgb&fit=max&fm=webp&q=80&w=1600',
  },
  {
    number: '06',
    title: 'Rénovation Énergétique',
    description: 'Modernisation énergétique de bâtiments publics et privés pour performance et durabilité optimale.',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?crop=entropy&cs=tinysrgb&fit=max&fm=webp&q=80&w=1600',
  },
];

// Detects touch capability on first touchstart event — works on every
// device including tablets with keyboards that report pointer:fine.
function useTouchDevice() {
  const [isTouch, setIsTouch] = useState(false);
  useEffect(() => {
    const handler = () => setIsTouch(true);
    window.addEventListener('touchstart', handler, { once: true, passive: true });
    return () => window.removeEventListener('touchstart', handler);
  }, []);
  return isTouch;
}

export function StickyServices() {
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
      id="services"
      data-section="services"
      className="relative bg-[#FAFAF9] py-16 sm:py-20 md:py-24 overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">

        {/* Header */}
        <div className="flex items-end justify-between mb-8 md:mb-10 pb-5
                        border-b border-[rgba(42,37,34,0.12)]">
          <div>
            <p className="text-[10px] sm:text-xs font-medium uppercase tracking-[0.25em] mb-2"
               style={{ color: '#5A5A5A' }}>
              Nos Services
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-none tracking-tight"
                style={{ color: '#2A2522' }}>
              Ce que nous faisons
            </h2>
          </div>
        </div>

        {/* Rows */}
        <div>
          {SERVICES.map((service, i) => {
            const isActive = active === i;
            return (
              <div key={service.number}>
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
                      src={service.image}
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
                        {service.number}
                      </span>
                      <h3
                        className="text-base sm:text-xl md:text-2xl lg:text-3xl
                                   font-bold leading-tight transition-colors duration-300"
                        style={{ color: isActive ? '#F6F2E8' : '#2A2522' }}
                      >
                        {service.title}
                      </h3>
                    </div>

                    {/* Desktop only: description slides in from right */}
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
                      {service.description}
                    </p>

                    {/* Mobile + tablet (< lg): plus/minus */}
                    <div className="lg:hidden flex-shrink-0">
                      {isActive
                        ? <Minus className="w-4 h-4" style={{ color: 'rgba(246,242,232,0.7)' }} />
                        : <Plus className="w-4 h-4" style={{ color: 'rgba(90,90,90,0.5)' }} />
                      }
                    </div>
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
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}

          <div className="w-full h-px" style={{ background: 'rgba(42,37,34,0.10)' }} />
        </div>

      </div>
    </section>
  );
}