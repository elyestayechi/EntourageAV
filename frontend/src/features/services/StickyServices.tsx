import { useState } from 'react';
import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';

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
    description: 'Ventilation mécanique contrôlée et pose de carrelage gresie — sols et murs, finitions impeccables.',
    image: 'https://images.unsplash.com/photo-1556909212-d5b604d0c90d?crop=entropy&cs=tinysrgb&fit=max&fm=webp&q=80&w=1600',
  },
  {
    number: '06',
    title: 'Rénovation Énergétique',
    description: 'Modernisation énergétique de bâtiments publics et privés pour performance et durabilité optimale.',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?crop=entropy&cs=tinysrgb&fit=max&fm=webp&q=80&w=1600',
  },
];

export function StickyServices() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section
      id="services"
      data-section="services"
      className="relative bg-[#FAFAF9] py-16 sm:py-20 md:py-24 overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">

        {/* ── Section header — editorial label style ── */}
        <div className="flex items-end justify-between mb-8 md:mb-10 pb-5 border-b border-[rgba(42,37,34,0.12)]">
          <div>
            <p className="text-[10px] sm:text-xs font-medium uppercase tracking-[0.25em] mb-2" style={{ color: '#5A5A5A' }}>
              Nos Services
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-none tracking-tight" style={{ color: '#2A2522' }}>
              Ce que nous faisons
            </h2>
          </div>
          <span className="hidden sm:block text-xs font-mono tracking-wider pb-1" style={{ color: 'rgba(90,90,90,0.4)' }}>
            06 services
          </span>
        </div>

        {/* ── Service rows — hairline separated, Exo Ape editorial style ── */}
        <div>
          {SERVICES.map((service, i) => (
            <div key={service.number}>
              {/* Hairline divider between items */}
              {i > 0 && (
                <div className="w-full h-px" style={{ background: 'rgba(42,37,34,0.10)' }} />
              )}

              <div
                className="group relative flex items-center gap-0 cursor-default
                           py-0 overflow-hidden transition-all duration-500"
                style={{ minHeight: hovered === i ? '280px' : '72px' }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* ── Full-bleed image (expands on hover) ── */}
                <div
                  className="absolute inset-0 transition-opacity duration-500"
                  style={{ opacity: hovered === i ? 1 : 0 }}
                >
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  {/* Dark scrim so text stays readable */}
                  <div
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.30) 60%, rgba(0,0,0,0.10) 100%)' }}
                  />
                </div>

                {/* ── Row content ── */}
                <div className="relative z-10 w-full flex items-center justify-between
                                py-5 sm:py-6 px-0 sm:px-1 gap-4 sm:gap-8">

                  {/* Number + Title */}
                  <div className="flex items-center gap-4 sm:gap-6 md:gap-8 min-w-0">
                    <span
                      className="text-xs font-mono flex-shrink-0 transition-colors duration-300"
                      style={{ color: hovered === i ? 'rgba(255,255,255,0.5)' : 'rgba(90,90,90,0.45)' }}
                    >
                      {service.number}
                    </span>
                    <h3
                      className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold leading-none truncate
                                 transition-colors duration-300"
                      style={{ color: hovered === i ? '#F6F2E8' : '#2A2522' }}
                    >
                      {service.title}
                    </h3>
                  </div>

                  {/* Description — glass pill, slides in on hover */}
                  <p
                    className="hidden md:block text-sm leading-relaxed flex-shrink-0 max-w-xs
                               transition-all duration-500 text-right"
                    style={{
                      color: hovered === i ? 'rgba(246,242,232,0.80)' : 'rgba(90,90,90,0.0)',
                      transform: hovered === i ? 'translateX(0)' : 'translateX(12px)',
                    }}
                  >
                    {service.description}
                  </p>

                  {/* Arrow — only visible on hover */}
                  <ArrowRight
                    className="w-5 h-5 flex-shrink-0 transition-all duration-300"
                    style={{
                      color: hovered === i ? '#F6F2E8' : 'transparent',
                      transform: hovered === i ? 'translateX(0)' : 'translateX(-8px)',
                    }}
                  />
                </div>

                {/* ── Mobile: description shown below title when expanded ── */}
                <div
                  className="md:hidden absolute bottom-0 left-0 right-0 z-10 px-1 transition-all duration-500"
                  style={{
                    opacity: hovered === i ? 1 : 0,
                    paddingBottom: hovered === i ? '20px' : '0',
                  }}
                >
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(246,242,232,0.80)' }}>
                    {service.description}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* Final hairline */}
          <div className="w-full h-px" style={{ background: 'rgba(42,37,34,0.10)' }} />
        </div>

        {/* ── CTA ── */}
        <div className="mt-10 sm:mt-12 flex justify-start">
          <Link
            to="/services"
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
            <span>Voir tous nos services</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}