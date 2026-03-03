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
    description: 'Portes intérieures, coupe-feu certifiées, fenêtres aluminium et PVC haute qualité.',
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
    description: 'Ventilation mécanique contrôlée et pose de carrelage gresie — sols et murs, finitions impeccables.',
    image: 'https://images.unsplash.com/photo-1556909212-d5b604d0c90d?crop=entropy&cs=tinysrgb&fit=max&fm=webp&q=80&w=1200',
  },
  {
    number: '06',
    title: 'Rénovation Énergétique',
    description: 'Modernisation énergétique de bâtiments publics et privés pour performance et durabilité optimale.',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?crop=entropy&cs=tinysrgb&fit=max&fm=webp&q=80&w=1200',
  },
];

const cardStyle: React.CSSProperties = {
  background: 'rgba(255, 255, 255, 0.4)',
  backdropFilter: 'blur(40px) saturate(180%)',
  WebkitBackdropFilter: 'blur(40px) saturate(180%)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.5)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
};

const clipPath = (r: number) =>
  `polygon(${r}px 0, calc(100% - ${r}px) 0, 100% ${r}px, 100% calc(100% - ${r}px), calc(100% - ${r}px) 100%, ${r}px 100%, 0 calc(100% - ${r}px), 0 ${r}px)`;

export function StickyServices() {
  return (
    <section
      id="services"
      data-section="services"
      className="relative bg-[#FAFAF9] py-16 sm:py-20 md:py-24 lg:py-28 px-4 sm:px-6 md:px-8 lg:px-12 overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto">

        {/* ── Header
              Mobile:  stacked, full width
              Tablet:  stacked, still full width (subtitle under title)
              Desktop: side by side — title left, subtitle right
        ── */}
        <div className="mb-10 sm:mb-12 md:mb-14 lg:mb-16
                        flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 lg:gap-12">
          <div>
            <p
              className="text-xs font-medium uppercase tracking-[0.2em] mb-3"
              style={{ color: '#5A5A5A' }}
            >
              Nos Services
            </p>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight"
              style={{ color: '#2A2522' }}
            >
              Ce que nous faisons
            </h2>
          </div>
          <p
            className="text-sm sm:text-base leading-relaxed
                       lg:max-w-xs lg:text-right lg:pb-1"
            style={{ color: '#5A5A5A' }}
          >
            Une expertise complète, de la conception à la livraison — chaque service pensé pour durer.
          </p>
        </div>

        {/* ── Grid
              Mobile (< 640):  1 column
              Tablet (640–1023): 2 columns — image uses 3/2 aspect ratio
                                 so cards aren't too short at this width
              Desktop (≥ 1024): 3 columns — back to 16/9 images
        ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-5 lg:gap-6">
          {SERVICES.map((service) => (
            <div
              key={service.number}
              className="group overflow-hidden"
              style={{ ...cardStyle, clipPath: clipPath(20) }}
            >
              {/* Image
                  Mobile + desktop: 16/9
                  Tablet (sm–md):   3/2 — taller so content isn't letter-boxed */}
              <div
                className="relative overflow-hidden"
                style={{ clipPath: clipPath(12) }}
              >
                <div className="aspect-video sm:aspect-[3/2] lg:aspect-video">
                  <img
                    src={service.image}
                    alt={service.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                </div>

                {/* Warm overlay */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'radial-gradient(ellipse 60% 40% at 50% -10%, rgba(212,175,119,0.12) 0%, transparent 70%)',
                    mixBlendMode: 'soft-light',
                  }}
                />

                {/* Number badge */}
                <div
                  className="absolute top-3 left-3 w-8 h-8 flex items-center justify-center"
                  style={{
                    background: 'rgba(255,255,255,0.15)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255,255,255,0.25)',
                    clipPath: clipPath(5),
                  }}
                >
                  <span
                    className="text-xs font-bold"
                    style={{ color: '#F6F2E8', letterSpacing: '0.05em' }}
                  >
                    {service.number}
                  </span>
                </div>
              </div>

              {/* Text — slightly more padding on tablet so it breathes */}
              <div className="p-5 sm:p-5 md:p-6">
                <h3
                  className="text-base sm:text-lg font-bold mb-2 leading-snug"
                  style={{ color: '#2A2522' }}
                >
                  {service.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: '#5A5A5A' }}
                >
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 sm:mt-12 md:mt-14 text-center">
          <Link
            to="/services"
            className="inline-flex items-center gap-3 px-7 sm:px-8 py-3.5 sm:py-4 font-medium uppercase tracking-wider text-sm transition-all duration-300 hover:scale-105"
            style={{
              background: 'rgba(0, 0, 0, 0.85)',
              backdropFilter: 'blur(40px) saturate(180%)',
              WebkitBackdropFilter: 'blur(40px) saturate(180%)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(80, 80, 80, 0.25)',
              clipPath: clipPath(12),
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