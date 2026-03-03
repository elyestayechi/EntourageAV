import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';

const STEPS = [
  {
    number: '01',
    title: 'Consultation & Design',
    description:
      "Nous débutons par une rencontre approfondie pour comprendre votre vision, vos besoins et votre budget. Nos designers élaborent ensuite des plans détaillés pour visualiser le résultat final avant le début des travaux.",
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?crop=entropy&cs=tinysrgb&fit=max&fm=webp&q=80&w=900',
  },
  {
    number: '02',
    title: 'Planification & Approvisionnement',
    description:
      "Une fois le design validé, nous établissons un calendrier précis et sélectionnons les matériaux avec soin. Nos partenaires garantissent des matériaux de qualité, livrés au bon moment pour respecter votre planning.",
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?crop=entropy&cs=tinysrgb&fit=max&fm=webp&q=80&w=900',
  },
  {
    number: '03',
    title: 'Construction & Artisanat',
    description:
      "Nos équipes d'artisans qualifiés exécutent les travaux avec précision. Électricité, plomberie, menuiseries, carrelage — tout est réalisé selon les standards les plus exigeants.",
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?crop=entropy&cs=tinysrgb&fit=max&fm=webp&q=80&w=900',
  },
  {
    number: '04',
    title: 'Livraison & Remise des Clés',
    description:
      "Avant la livraison, nous effectuons une inspection rigoureuse de chaque espace. Nous ne considérons le travail terminé que lorsque vous êtes entièrement satisfait du résultat.",
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?crop=entropy&cs=tinysrgb&fit=max&fm=webp&q=80&w=900',
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

export function BlueprintSection() {
  return (
    <section
      id="methode"
      data-section="methode"
      className="relative bg-[#FAFAF9] py-16 sm:py-20 md:py-24 lg:py-28 px-4 sm:px-6 md:px-8 lg:px-12 overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto">

        {/* Header */}
        <div className="mb-10 sm:mb-12 md:mb-14 lg:mb-16">
          <p
            className="text-xs font-medium uppercase tracking-[0.2em] mb-3"
            style={{ color: '#5A5A5A' }}
          >
            Notre Méthode
          </p>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight"
            style={{ color: '#2A2522' }}
          >
            De la vision à la réalité
          </h2>
        </div>

        {/* ── Steps
              Mobile  (< 768):   fully stacked — image on top (fixed height),
                                 text below. Simple and readable.
              Tablet  (768–1023): side by side at md: — image 40% width,
                                  text 60%. Alternating direction every other step.
              Desktop (≥ 1024):  same side-by-side but wider image (38%) and
                                 more generous text padding.
        ── */}
        <div className="space-y-4 sm:space-y-4 md:space-y-5">
          {STEPS.map((step, i) => {
            const isEven = i % 2 === 1;
            return (
              <div
                key={step.number}
                className={`
                  flex flex-col overflow-hidden
                  md:flex-row ${isEven ? 'md:flex-row-reverse' : ''}
                `}
                style={{ ...cardStyle, clipPath: clipPath(24) }}
              >

                {/* ── Image panel ──
                    Mobile:  fixed height 200px, full width, image fills it
                    Tablet:  40% width, height stretches to match content
                    Desktop: 38% width
                ── */}
                <div
                  className="relative flex-shrink-0 w-full md:w-[40%] lg:w-[38%]"
                  style={{ minHeight: '200px' }}
                >
                  <img
                    src={step.image}
                    alt={step.title}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Warm overlay */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: 'radial-gradient(ellipse 60% 40% at 50% -10%, rgba(212,175,119,0.10) 0%, transparent 70%)',
                      mixBlendMode: 'soft-light',
                    }}
                  />
                  {/* Vignette */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: 'radial-gradient(ellipse 75% 75% at 50% 50%, transparent 40%, rgba(42,37,34,0.15) 100%)',
                      mixBlendMode: 'multiply',
                    }}
                  />

                  {/* Ghost step number — bottom-right of image */}
                  <div className="absolute bottom-3 right-4 md:bottom-4 md:right-5">
                    <span
                      className="text-5xl sm:text-6xl md:text-7xl font-bold leading-none select-none"
                      style={{ color: 'rgba(255,255,255,0.10)', letterSpacing: '-0.04em' }}
                    >
                      {step.number}
                    </span>
                  </div>

                  {/* Mobile: top accent bar */}
                  <div
                    className="absolute top-0 left-0 right-0 h-0.5 md:hidden"
                    style={{ background: 'rgba(212,175,119,0.5)' }}
                  />
                  {/* Tablet+: joining-edge accent line */}
                  <div
                    className={`
                      hidden md:block absolute top-0 bottom-0 w-px
                      ${isEven ? 'left-0' : 'right-0'}
                    `}
                    style={{ background: 'rgba(212,175,119,0.35)' }}
                  />
                </div>

                {/* ── Content panel ──
                    Padding scales: tighter on mobile, generous on tablet+
                ── */}
                <div className="flex-1 p-6 sm:p-7 md:p-8 lg:p-12 flex flex-col justify-center">

                  {/* Step label */}
                  <div className="flex items-center gap-3 mb-4 md:mb-5">
                    <span
                      className="text-xs font-bold uppercase tracking-[0.2em]"
                      style={{ color: '#5A5A5A' }}
                    >
                      Étape {i + 1}
                    </span>
                    <div
                      className="h-px w-8"
                      style={{ background: 'rgba(90,90,90,0.2)' }}
                    />
                    <span
                      className="text-xs font-mono"
                      style={{ color: 'rgba(90,90,90,0.45)' }}
                    >
                      {step.number}
                    </span>
                  </div>

                  <h3
                    className="text-xl sm:text-2xl md:text-2xl lg:text-3xl font-bold mb-3 md:mb-4 leading-snug"
                    style={{ color: '#2A2522' }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="text-sm sm:text-sm md:text-base leading-relaxed"
                    style={{ color: '#5A5A5A' }}
                  >
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-10 sm:mt-12 md:mt-14 text-center">
          <Link
            to="/contact"
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
            <span>Démarrer mon projet</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}