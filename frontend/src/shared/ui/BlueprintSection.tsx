import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';

const STEPS = [
  {
    number: '01',
    title: 'Consultation & Design',
    description:
      "Nous débutons par une rencontre approfondie pour comprendre votre vision, vos besoins et votre budget. Nos designers élaborent des plans détaillés pour visualiser le résultat final avant le début des travaux.",
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?crop=entropy&cs=tinysrgb&fit=max&fm=webp&q=80&w=1400',
  },
  {
    number: '02',
    title: 'Planification & Approvisionnement',
    description:
      "Une fois le design validé, nous établissons un calendrier précis et sélectionnons les matériaux avec soin. Nos partenaires garantissent qualité et livraison au bon moment.",
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?crop=entropy&cs=tinysrgb&fit=max&fm=webp&q=80&w=1400',
  },
  {
    number: '03',
    title: 'Construction & Artisanat',
    description:
      "Nos artisans qualifiés exécutent les travaux avec précision — électricité, plomberie, menuiseries, carrelage. Chaque détail est soigné selon les standards les plus exigeants.",
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?crop=entropy&cs=tinysrgb&fit=max&fm=webp&q=80&w=1400',
  },
  {
    number: '04',
    title: 'Livraison & Remise des Clés',
    description:
      "Une inspection rigoureuse précède chaque livraison. Nous ne considérons le travail terminé que lorsque vous êtes entièrement satisfait du résultat.",
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?crop=entropy&cs=tinysrgb&fit=max&fm=webp&q=80&w=1400',
  },
];

// The frosted glass panel — matches the site's navigation panel aesthetic
const glassPanelStyle: React.CSSProperties = {
  background: 'rgba(255, 255, 255, 0.12)',
  backdropFilter: 'blur(32px) saturate(180%)',
  WebkitBackdropFilter: 'blur(32px) saturate(180%)',
  border: '1px solid rgba(255, 255, 255, 0.18)',
  boxShadow: '0 8px 40px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.25)',
};

const clipPath = (r: number) =>
  `polygon(${r}px 0, calc(100% - ${r}px) 0, 100% ${r}px, 100% calc(100% - ${r}px), calc(100% - ${r}px) 100%, ${r}px 100%, 0 calc(100% - ${r}px), 0 ${r}px)`;

export function BlueprintSection() {
  return (
    <section
      id="methode"
      data-section="methode"
      className="relative bg-[#FAFAF9] py-16 sm:py-20 md:py-24 overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">

        {/* ── Section header ── */}
        <div className="flex items-end justify-between mb-8 md:mb-10 pb-5 border-b border-[rgba(42,37,34,0.12)]">
          <div>
            <p className="text-[10px] sm:text-xs font-medium uppercase tracking-[0.25em] mb-2" style={{ color: '#5A5A5A' }}>
              Notre Méthode
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-none tracking-tight" style={{ color: '#2A2522' }}>
              De la vision à la réalité
            </h2>
          </div>
          <span className="hidden sm:block text-xs font-mono tracking-wider pb-1" style={{ color: 'rgba(90,90,90,0.4)' }}>
            04 étapes
          </span>
        </div>

        {/* ── Steps ── */}
        <div className="space-y-4 sm:space-y-5 md:space-y-6">
          {STEPS.map((step, i) => {
            const isEven = i % 2 === 1;
            return (
              <div
                key={step.number}
                className="relative overflow-hidden"
                style={{
                  // Aspect ratio: taller on mobile, cinematic on desktop
                  aspectRatio: undefined,
                  minHeight: '280px',
                  height: 'clamp(280px, 38vw, 480px)',
                  clipPath: clipPath(20),
                }}
              >
                {/* ── Full-bleed background image ── */}
                <img
                  src={step.image}
                  alt={step.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Warm overlay matching RecentProjects */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'radial-gradient(ellipse 60% 40% at 50% -10%, rgba(212,175,119,0.18) 0%, transparent 70%)',
                    mixBlendMode: 'soft-light',
                  }}
                />
                {/* Dark base so glass panel contrasts properly */}
                <div
                  className="absolute inset-0"
                  style={{ background: 'rgba(20,18,16,0.30)' }}
                />

                {/* ── Floating glass panel ──
                    Mobile:  bottom of the image, full width minus padding
                    Tablet+: left or right side (alternating), 45% max width, vertically centred
                ── */}
                <div
                  className={`
                    absolute z-10
                    bottom-4 left-4 right-4
                    md:bottom-auto md:top-1/2 md:-translate-y-1/2
                    md:w-[46%] md:max-w-[420px]
                    ${isEven
                      ? 'md:left-auto md:right-6 lg:right-10'
                      : 'md:left-6 lg:left-10 md:right-auto'}
                  `}
                  style={{ ...glassPanelStyle, clipPath: clipPath(16) }}
                >
                  <div className="p-5 sm:p-6 md:p-7 lg:p-8">
                    {/* Step label */}
                    <div className="flex items-center gap-3 mb-4">
                      <span
                        className="text-[10px] font-bold uppercase tracking-[0.25em]"
                        style={{ color: 'rgba(246,242,232,0.55)' }}
                      >
                        Étape {i + 1}
                      </span>
                      <div className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.15)' }} />
                      <span className="text-xs font-mono" style={{ color: 'rgba(246,242,232,0.35)' }}>
                        {step.number}
                      </span>
                    </div>

                    {/* Title */}
                    <h3
                      className="text-lg sm:text-xl md:text-xl lg:text-2xl font-bold mb-3 leading-snug"
                      style={{ color: '#F6F2E8' }}
                    >
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: 'rgba(246,242,232,0.70)' }}
                    >
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Large ghost number — top corner opposite the panel */}
                <div
                  className={`
                    absolute top-4 z-0 select-none
                    ${isEven ? 'left-6 md:left-8' : 'right-6 md:right-8'}
                  `}
                >
                  <span
                    className="text-[80px] sm:text-[100px] md:text-[120px] lg:text-[140px] font-bold leading-none"
                    style={{ color: 'rgba(255,255,255,0.06)', letterSpacing: '-0.05em' }}
                  >
                    {step.number}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── CTA ── */}
        <div className="mt-10 sm:mt-12 flex justify-start">
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
              clipPath: clipPath(12),
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