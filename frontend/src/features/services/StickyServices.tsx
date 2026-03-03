import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';

const SERVICES = [
  {
    number: '01',
    title: 'Rénovations Intérieures',
    description: "Transformations complètes d'espaces résidentiels et commerciaux avec finitions de qualité supérieure.",
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?crop=entropy&cs=tinysrgb&fit=max&fm=webp&q=80&w=1200',
  },
  {
    number: '02',
    title: "Design d'Intérieur",
    description: "Conception et aménagement d'espaces personnalisés alliant esthétique et fonctionnalité.",
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?crop=entropy&cs=tinysrgb&fit=max&fm=webp&q=80&w=1200',
  },
  {
    number: '03',
    title: 'Portes & Menuiseries',
    description: 'Large catalogue de portes intérieures, coupe-feu certifiées, fenêtres aluminium et PVC haute qualité.',
    image: 'https://images.unsplash.com/photo-1502005097973-6a7082348e28?crop=entropy&cs=tinysrgb&fit=max&fm=webp&q=80&w=1200',
  },
  {
    number: '04',
    title: 'Électricité & Plomberie',
    description: 'Installation électrique complète et systèmes sanitaires performants pour tous types de bâtiments.',
    image: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?crop=entropy&cs=tinysrgb&fit=max&fm=webp&q=80&w=1200',
  },
  {
    number: '05',
    title: 'VMC & Carrelage',
    description: 'Ventilation mécanique contrôlée et pose de carrelage gresie pour sols et murs, finitions impeccables.',
    image: 'https://images.unsplash.com/photo-1556909212-d5b604d0c90d?crop=entropy&cs=tinysrgb&fit=max&fm=webp&q=80&w=1200',
  },
  {
    number: '06',
    title: 'Rénovation Énergétique',
    description: 'Modernisation énergétique de bâtiments publics et privés pour performance et durabilité optimale.',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?crop=entropy&cs=tinysrgb&fit=max&fm=webp&q=80&w=1200',
  },
];

const glass: React.CSSProperties = {
  background: 'rgba(255, 255, 255, 0.45)',
  backdropFilter: 'blur(24px) saturate(160%)',
  WebkitBackdropFilter: 'blur(24px) saturate(160%)',
  border: '1px solid rgba(255, 255, 255, 0.35)',
  boxShadow: '0 4px 24px rgba(0,0,0,0.07), inset 0 1px 0 rgba(255,255,255,0.6)',
};

const clip = (r: number) =>
  `polygon(${r}px 0, calc(100% - ${r}px) 0, 100% ${r}px, 100% calc(100% - ${r}px), calc(100% - ${r}px) 100%, ${r}px 100%, 0 calc(100% - ${r}px), 0 ${r}px)`;

export function StickyServices() {
  return (
    <section
      id="services"
      data-section="services"
      className="relative bg-[#FAFAF9] py-20 sm:py-28 px-4 sm:px-6 lg:px-10 overflow-hidden"
    >
      {/* Subtle warm grid texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `linear-gradient(rgba(42,37,34,1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(42,37,34,1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header */}
        <div className="mb-12 sm:mb-16 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <div>
            <div
              className="inline-flex items-center gap-2 px-4 py-2 mb-4 text-xs font-bold uppercase tracking-widest"
              style={{ ...glass, clipPath: clip(6), color: '#2A2522' }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-current opacity-60" />
              Nos Services
            </div>
            <h2
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.0] tracking-tight"
              style={{ color: '#2A2522' }}
            >
              Ce que nous<br />
              <span style={{ color: '#8B7355' }}>faisons</span>
            </h2>
          </div>
          <p
            className="text-base sm:text-lg leading-relaxed max-w-sm"
            style={{ color: '#5A5A5A' }}
          >
            Une expertise complète, de la conception à la livraison — chaque service pensé pour durer.
          </p>
        </div>

        {/* Services grid — 1 col mobile, 2 tablet, 3 desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {SERVICES.map((service) => (
            <div
              key={service.number}
              className="group relative overflow-hidden"
              style={{ ...glass, clipPath: clip(16) }}
            >
              {/* Image */}
              <div className="relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
                <img
                  src={service.image}
                  alt={service.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
                {/* Number badge */}
                <div
                  className="absolute top-3 left-3 w-9 h-9 flex items-center justify-center text-xs font-bold"
                  style={{
                    background: 'rgba(0,0,0,0.70)',
                    backdropFilter: 'blur(10px)',
                    clipPath: clip(5),
                    color: '#F6F2E8',
                    letterSpacing: '0.05em',
                  }}
                >
                  {service.number}
                </div>
              </div>

              {/* Text */}
              <div className="p-5">
                <h3
                  className="text-lg sm:text-xl font-bold mb-2 leading-snug"
                  style={{ color: '#2A2522' }}
                >
                  {service.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: '#5A5A5A' }}>
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA row */}
        <div className="mt-12 sm:mt-14 flex flex-col sm:flex-row items-center justify-center gap-4">
          <p className="text-base text-center sm:text-left" style={{ color: '#5A5A5A' }}>
            Chaque projet est une opportunité de créer quelque chose d'exceptionnel.
          </p>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-bold uppercase tracking-wider transition-all duration-300 hover:scale-105 active:scale-95 whitespace-nowrap"
            style={{
              background: 'rgba(0,0,0,0.85)',
              backdropFilter: 'blur(40px)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
              border: '1px solid rgba(80,80,80,0.25)',
              clipPath: clip(10),
              color: '#F6F2E8',
            }}
          >
            <span>Voir tous les services</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}