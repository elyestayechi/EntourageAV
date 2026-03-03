import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';

const STEPS = [
  {
    number: '01',
    title: 'Consultation & Design',
    description:
      "Nous débutons par une rencontre approfondie pour comprendre votre vision, vos besoins et votre budget. Nos designers élaborent ensuite des plans détaillés pour visualiser le résultat final avant le début des travaux.",
    accent: '#D4AF76',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?crop=entropy&cs=tinysrgb&fit=max&fm=webp&q=80&w=900',
  },
  {
    number: '02',
    title: 'Planification & Approvisionnement',
    description:
      "Une fois le design validé, nous établissons un calendrier précis et sélectionnons les matériaux avec soin. Nos partenaires fournisseurs garantissent des matériaux de qualité supérieure, livrés au bon moment.",
    accent: '#8B7355',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?crop=entropy&cs=tinysrgb&fit=max&fm=webp&q=80&w=900',
  },
  {
    number: '03',
    title: 'Construction & Artisanat',
    description:
      "Nos équipes d'artisans qualifiés exécutent les travaux avec précision. Électricité, plomberie, menuiseries, carrelage, finitions — tout est réalisé selon les standards les plus exigeants.",
    accent: '#5A7A6B',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?crop=entropy&cs=tinysrgb&fit=max&fm=webp&q=80&w=900',
  },
  {
    number: '04',
    title: 'Livraison & Remise des Clés',
    description:
      "Avant la livraison, nous effectuons une inspection rigoureuse de chaque espace. Vous visitez votre projet avec notre équipe — nous ne considérons le travail terminé que lorsque vous êtes entièrement satisfait.",
    accent: '#2A2522',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?crop=entropy&cs=tinysrgb&fit=max&fm=webp&q=80&w=900',
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

export function BlueprintSection() {
  return (
    <section
      id="methode"
      data-section="methode"
      className="relative bg-[#F4F1EC] py-20 sm:py-28 px-4 sm:px-6 lg:px-10 overflow-hidden"
    >
      {/* Subtle dot texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(42,37,34,1) 1px, transparent 1px)`,
          backgroundSize: '28px 28px',
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Header */}
        <div className="mb-14 sm:mb-20 text-center">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 mb-4 text-xs font-bold uppercase tracking-widest"
            style={{ ...glass, clipPath: clip(6), color: '#2A2522' }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-current opacity-60" />
            Notre Méthode
          </div>
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.0] tracking-tight"
            style={{ color: '#2A2522' }}
          >
            De la vision<br />
            <span style={{ color: '#8B7355' }}>à la réalité</span>
          </h2>
          <p
            className="mt-5 text-base sm:text-lg leading-relaxed max-w-xl mx-auto"
            style={{ color: '#5A5A5A' }}
          >
            Un processus structuré et transparent — de la consultation à la livraison finale.
          </p>
        </div>

        {/* Steps — alternating image/text on desktop, stacked on mobile */}
        <div className="space-y-5">
          {STEPS.map((step, i) => {
            const isEven = i % 2 === 1;
            return (
              <div
                key={step.number}
                className={`flex flex-col ${isEven ? 'lg:flex-row-reverse' : 'lg:flex-row'} overflow-hidden`}
                style={{ ...glass, clipPath: clip(20) }}
              >
                {/* Image */}
                <div
                  className="relative flex-shrink-0 lg:w-2/5"
                  style={{ minHeight: '220px' }}
                >
                  <img
                    src={step.image}
                    alt={step.title}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  {/* Ghosted step number */}
                  <div
                    className="absolute inset-0 flex items-end p-6"
                    style={{
                      background: 'linear-gradient(to top, rgba(0,0,0,0.50) 0%, transparent 60%)',
                    }}
                  >
                    <span
                      className="text-7xl sm:text-8xl font-bold leading-none select-none"
                      style={{ color: 'rgba(255,255,255,0.13)', letterSpacing: '-0.04em' }}
                    >
                      {step.number}
                    </span>
                  </div>
                  {/* Accent stripe on the joining edge */}
                  <div
                    className={`absolute top-0 bottom-0 w-1 ${isEven ? 'right-0' : 'left-0'} hidden lg:block`}
                    style={{ background: step.accent }}
                  />
                  {/* Mobile accent stripe (top) */}
                  <div
                    className="absolute top-0 left-0 right-0 h-1 lg:hidden"
                    style={{ background: step.accent }}
                  />
                </div>

                {/* Content */}
                <div className="flex-1 p-7 sm:p-10 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-8 h-8 flex items-center justify-center text-xs font-bold flex-shrink-0"
                      style={{ background: step.accent, clipPath: clip(5), color: '#fff' }}
                    >
                      {step.number}
                    </div>
                    <div
                      className="h-px flex-1 max-w-[60px]"
                      style={{ background: step.accent, opacity: 0.4 }}
                    />
                    <span
                      className="text-xs font-bold uppercase tracking-widest"
                      style={{ color: step.accent }}
                    >
                      Étape {i + 1}
                    </span>
                  </div>

                  <h3
                    className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 leading-snug"
                    style={{ color: '#2A2522' }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="text-sm sm:text-base leading-relaxed"
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
        <div className="mt-14 sm:mt-16 text-center">
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 px-8 py-4 text-sm font-bold uppercase tracking-wider transition-all duration-300 hover:scale-105 active:scale-95"
            style={{
              background: 'rgba(0,0,0,0.85)',
              backdropFilter: 'blur(40px)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
              border: '1px solid rgba(80,80,80,0.25)',
              clipPath: clip(12),
              color: '#F6F2E8',
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