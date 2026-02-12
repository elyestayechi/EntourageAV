import { Link } from 'react-router';
import { useRef, useEffect } from 'react';
import { gsap, ScrollTrigger } from '../shared/lib/gsap-init';
import { ArrowRight, Check } from 'lucide-react';
import { FilmGrainTexture } from '../shared/ui/FilmGrainTexture';
import { PremiumTextReveal } from '../shared/ui/PremiumTextReveal';

const services = [
  {
    number: '01',
    slug: 'renovations-interieures',
    title: 'Rénovations intérieures',
    description: 'Transformez vos espaces de vie avec nos services complets de rénovation intérieure, alliant expertise technique et vision esthétique.',
    longDescription: 'Nos équipes expertes réalisent des rénovations complètes de vos espaces intérieurs. De la simple réfection de peinture à la transformation totale de votre habitation, nous vous accompagnons à chaque étape. Notre approche personnalisée garantit un résultat à la hauteur de vos attentes, dans les délais convenus.',
    image: 'https://images.unsplash.com/photo-1768321903885-d0a6798485d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnRlcmlvciUyMHJlbm92YXRpb24lMjBjb25zdHJ1Y3Rpb258ZW58MXx8fHwxNzY4OTk1MjA4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    timeline: '2-6 semaines',
    benefits: [
      'Conception personnalisée selon vos besoins',
      'Matériaux de qualité supérieure',
      'Respect strict des délais',
      'Garantie décennale incluse',
    ],
  },
  {
    number: '02',
    slug: 'fenetres-menuiseries',
    title: 'Fenêtres et menuiseries',
    description: 'Installation professionnelle de fenêtres en aluminium et PVC, combinant performance énergétique et design contemporain.',
    longDescription: 'Spécialistes des menuiseries extérieures, nous installons des fenêtres haute performance qui amélioreront l\'isolation thermique et acoustique de votre habitation. Nos produits allient esthétique moderne et efficacité énergétique, pour des économies durables.',
    image: 'https://images.unsplash.com/photo-1609342066876-dce9c0782fb7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aW5kb3clMjBpbnN0YWxsYXRpb24lMjBhbHVtaW51bXxlbnwxfHx8fDE3Njg5OTUyMDh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    timeline: '1-2 semaines',
    benefits: [
      'Double ou triple vitrage haute performance',
      'Certification Cekal',
      'Pose en applique ou en tunnel',
      'Conseils personnalisés sur les aides financières',
    ],
  },
  {
    number: '03',
    slug: 'electricite',
    title: 'Électricité intérieure et extérieure',
    description: 'Solutions électriques complètes pour tous vos besoins, avec des installations conformes aux normes les plus strictes.',
    longDescription: 'Notre équipe d\'électriciens qualifiés réalise tous types de travaux électriques, de la simple prise de courant à la mise aux normes complète de votre installation. Nous intervenons aussi bien en neuf qu\'en rénovation, toujours dans le respect des normes NF C 15-100.',
    image: 'https://images.unsplash.com/photo-1751486289947-4f5f5961b3aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpY2FsJTIwd29yayUyMGluc3RhbGxhdGlvbnxlbnwxfHx8fDE3Njg5ODQyMDZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    timeline: '1-4 semaines',
    benefits: [
      'Conformité NF C 15-100 garantie',
      'Électriciens certifiés',
      'Domotique et solutions connectées',
      'Diagnostic électrique inclus',
    ],
  },
  {
    number: '04',
    slug: 'plomberie-sanitaires',
    title: 'Travaux sanitaires et plomberie',
    description: 'Expertise en plomberie résidentielle et commerciale, garantissant fiabilité et qualité pour tous vos projets.',
    longDescription: 'De la création de salles de bains complètes à la réparation de fuites, nos plombiers experts interviennent rapidement et efficacement. Nous proposons également des solutions d\'économie d\'eau et de chauffage performant.',
    image: 'https://images.unsplash.com/photo-1761353855019-05f2f3ed9c43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbHVtYmluZyUyMGJhdGhyb29tJTIwcmVub3ZhdGlvbnxlbnwxfHx8fDE3Njg5OTUyMDl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    timeline: '1-3 semaines',
    benefits: [
      'Plombiers agréés',
      'Équipements sanitaires haut de gamme',
      'Solutions d\'économie d\'eau',
      'Intervention rapide en cas d\'urgence',
    ],
  },
  {
    number: '05',
    slug: 'ventilation-vmc',
    title: 'Ventilation mécanique contrôlée',
    description: 'Systèmes VMC performants pour garantir une qualité d\'air optimale et une efficacité énergétique maximale.',
    longDescription: 'L\'installation d\'une VMC est essentielle pour assurer une qualité d\'air saine dans votre habitation. Nous installons des systèmes VMC simple ou double flux, adaptés à vos besoins et conformes aux réglementations en vigueur.',
    image: 'https://images.unsplash.com/photo-1503518646760-43090c4b8d55?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZW50aWxhdGlvbiUyMHN5c3RlbSUyMGh2YWN8ZW58MXx8fHwxNzY4OTk1MjA5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    timeline: '3-5 jours',
    benefits: [
      'VMC simple ou double flux',
      'Réduction de l\'humidité',
      'Amélioration de la qualité de l\'air',
      'Économies d\'énergie',
    ],
  },
  {
    number: '06',
    slug: 'carrelage',
    title: 'Carrelage professionnel',
    description: 'Pose de carrelage de haute qualité avec une attention méticuleuse aux détails et aux finitions.',
    longDescription: 'Nos carreleurs experts réalisent tous types de poses : sol, mur, terrasse, piscine. Nous travaillons avec les meilleurs matériaux et techniques pour garantir une finition impeccable et durable.',
    image: 'https://images.unsplash.com/photo-1695191388218-f6259600223f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aWxlJTIwZmxvb3JpbmclMjBjZXJhbWljfGVufDF8fHx8MTc2ODk5NTIxMHww&ixlib=rb-4.1.0&q=80&w=1080',
    timeline: '1-3 semaines',
    benefits: [
      'Large choix de matériaux',
      'Pose traditionnelle ou contemporaine',
      'Joints parfaits',
      'Étanchéité garantie',
    ],
  },
  {
    number: '07',
    slug: 'placo-platre',
    title: 'Placo et plâtre',
    description: 'Installation experte de plaques de plâtre pour créer des espaces parfaitement finis et acoustiquement optimisés.',
    longDescription: 'Cloisons, doublages, faux plafonds : nos plaquistes réalisent tous vos travaux de plâtrerie avec précision. Nous utilisons des matériaux adaptés (phoniques, hydrofuges, ignifuges) selon vos besoins spécifiques.',
    image: 'https://images.unsplash.com/photo-1768321901833-3694165677e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcnl3YWxsJTIwcGxhc3RlcmluZyUyMGNvbnN0cnVjdGlvbnxlbnwxfHx8fDE3Njg5OTUyMTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    timeline: '1-2 semaines',
    benefits: [
      'Plaques standards ou spécifiques',
      'Isolation phonique et thermique',
      'Finitions soignées',
      'Création de volumes sur mesure',
    ],
  },
  {
    number: '08',
    slug: 'finitions',
    title: 'Finitions complètes',
    description: 'Services de finition haut de gamme pour sublimer chaque détail de votre projet de rénovation.',
    longDescription: 'Les finitions sont la touche finale qui fait toute la différence. Peinture, papier peint, parquet, moulures : nous apportons un soin particulier à chaque détail pour un rendu parfait.',
    image: 'https://images.unsplash.com/photo-1601391548091-de4ff62ee29c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBmaW5pc2hpbmclMjBjYXJwZW50cnl8ZW58MXx8fHwxNzY4OTk1MjExfDA&ixlib=rb-4.1.0&q=80&w=1080',
    timeline: '1-2 semaines',
    benefits: [
      'Peintures écologiques disponibles',
      'Conseils déco personnalisés',
      'Finitions irréprochables',
      'Protection des lieux pendant les travaux',
    ],
  },
];

export function ServicesPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hero animation
    if (heroRef.current) {
      gsap.fromTo(
        heroRef.current.querySelectorAll('.animate-in'),
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
        }
      );
    }

    // Service cards animation
    if (servicesRef.current) {
      const cards = servicesRef.current.querySelectorAll('.service-card');
      
      cards.forEach((card, index) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 80, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#FAFAF9]">
      {/* Hero Section - Updated to match Contact page */}
      <section ref={heroRef} className="relative min-h-[50vh] flex items-center justify-center px-4 pt-32 pb-20">
        <FilmGrainTexture id="servicesHeroGrain" opacity={0.04} withVignette={true} vignetteIntensity={0.15} />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          {/* Number badge */}
          <div 
            className="inline-flex px-6 py-3 mb-6"
            style={{
              background: 'rgba(255, 255, 255, 0.4)',
              backdropFilter: 'blur(40px) saturate(180%)',
              WebkitBackdropFilter: 'blur(40px) saturate(180%)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              clipPath: 'polygon(8px 0, calc(100% - 8px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px), 0 8px)',
            }}
          >
            <span className="text-sm font-medium" style={{ color: '#2A2522' }}>SERVICES</span>
          </div>
          
          <PremiumTextReveal>
            <h1 className="text-5xl sm:text-6xl lg:text-8xl font-bold mb-6 leading-[0.9]" style={{ color: '#2A2522' }}>
              NOTRE GAMME<br />D'EXPERTISES
            </h1>
          </PremiumTextReveal>
          
          <p className="text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed" style={{ color: '#5A5A5A' }}>
            Entourage AV vous accompagne dans tous vos projets de rénovation avec une expertise reconnue et un engagement qualité sans compromis.
          </p>
        </div>
      </section>

      {/* Services Grid - Updated styling */}
      <section ref={servicesRef} className="py-20 px-4 bg-[#FAFAF9]">
        <div className="max-w-7xl mx-auto">
          {/* Intro Text */}
          <div 
            className="p-8 mb-16 text-center"
            style={{
              background: 'rgba(255, 255, 255, 0.4)',
              backdropFilter: 'blur(40px) saturate(180%)',
              WebkitBackdropFilter: 'blur(40px) saturate(180%)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              clipPath: 'polygon(12px 0, calc(100% - 12px) 0, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px), 0 12px)',
            }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6" style={{ color: '#2A2522' }}>
              8 Expertises pour Vos Projets
            </h2>
            <p className="text-lg max-w-3xl mx-auto leading-relaxed" style={{ color: '#5A5A5A' }}>
              Découvrez nos compétences complémentaires pour réaliser tous vos travaux de rénovation
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {services.map((service) => (
              <div
                key={service.slug}
                className="service-card group"
              >
                {/* Glass card with consistent styling */}
                <div
                  className="h-full overflow-hidden transition-all duration-500 hover:scale-[1.02] flex flex-col"
                  style={{
                    background: 'rgba(255, 255, 255, 0.4)',
                    backdropFilter: 'blur(40px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(40px) saturate(180%)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    clipPath: 'polygon(12px 0, calc(100% - 12px) 0, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px), 0 12px)',
                  }}
                >
                  {/* Header with Number and Title */}
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div 
                        className="w-12 h-12 flex items-center justify-center text-xl font-bold"
                        style={{
                          background: 'rgba(255, 255, 255, 0.6)',
                          clipPath: 'polygon(8px 0, calc(100% - 8px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px), 0 8px)',
                          color: '#2A2522',
                        }}
                      >
                        {service.number}
                      </div>
                      <h3 className="text-xl font-bold" style={{ color: '#2A2522' }}>
                        {service.title}
                      </h3>
                    </div>
                    
                    <p className="text-sm leading-relaxed mb-4" style={{ color: '#5A5A5A' }}>
                      {service.description}
                    </p>
                  </div>

                  {/* Image */}
                  <div className="px-6 pb-6">
                    <div 
                      className="relative h-48 overflow-hidden"
                      style={{
                        clipPath: 'polygon(12px 0, calc(100% - 12px) 0, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px), 0 12px)',
                      }}
                    >
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 pt-0 flex-1 flex flex-col">
                    <div className="mb-6">
                      <h4 className="text-sm font-medium mb-2" style={{ color: '#2A2522' }}>Description</h4>
                      <p className="text-sm leading-relaxed" style={{ color: '#5A5A5A' }}>
                        {service.longDescription}
                      </p>
                    </div>

                    {/* Timeline */}
                    <div className="mb-6">
                      <div className="flex items-center gap-2 mb-3">
                        <Check className="w-4 h-4" style={{ color: '#2A2522' }} />
                        <span className="text-sm font-medium" style={{ color: '#2A2522' }}>Délai moyen : {service.timeline}</span>
                      </div>
                    </div>

                    {/* Benefits */}
                    <div className="mb-6">
                      <h4 className="text-sm font-medium mb-3" style={{ color: '#2A2522' }}>Avantages</h4>
                      <div className="space-y-2">
                        {service.benefits.map((benefit, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <Check className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#2A2522' }} />
                            <span className="text-xs" style={{ color: '#5A5A5A' }}>{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="mt-auto pt-4 border-t border-white/20">
                      <Link
                        to="/contact"
                        className="inline-flex items-center justify-center gap-2 w-full px-4 py-3 text-sm font-medium transition-all duration-300 hover:scale-105"
                        style={{
                          background: 'rgba(0, 0, 0, 0.85)',
                          backdropFilter: 'blur(40px) saturate(180%)',
                          WebkitBackdropFilter: 'blur(40px) saturate(180%)',
                          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.06)',
                          border: '1px solid rgba(80, 80, 80, 0.25)',
                          clipPath: 'polygon(8px 0, calc(100% - 8px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px), 0 8px)',
                          color: 'var(--color-base-cream)',
                        }}
                      >
                        <span>Demander un devis</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Updated to match Contact page */}
      <section className="py-20 px-4 bg-[#FAFAF9]">
        <div className="max-w-7xl mx-auto">
          <div 
            className="p-12 text-center"
            style={{
              background: 'rgba(255, 255, 255, 0.4)',
              backdropFilter: 'blur(40px) saturate(180%)',
              WebkitBackdropFilter: 'blur(40px) saturate(180%)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              clipPath: 'polygon(16px 0, calc(100% - 16px) 0, 100% 16px, 100% calc(100% - 16px), calc(100% - 16px) 100%, 16px 100%, 0 calc(100% - 16px), 0 16px)',
            }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6" style={{ color: '#2A2522' }}>
              Prêt à Transformer Votre Espace ?
            </h2>
            <p className="text-lg mb-8 leading-relaxed max-w-2xl mx-auto" style={{ color: '#5A5A5A' }}>
              Découvrez comment notre expertise et notre passion peuvent donner vie à vos projets les plus ambitieux.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-3 px-10 py-5 font-medium transition-all duration-300 hover:scale-105"
                style={{
                  background: 'rgba(0, 0, 0, 0.85)',
                  backdropFilter: 'blur(40px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(40px) saturate(180%)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(80, 80, 80, 0.25)',
                  clipPath: 'polygon(12px 0, calc(100% - 12px) 0, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px), 0 12px)',
                  color: 'var(--color-base-cream)',
                }}
              >
                <span className="uppercase tracking-wider text-sm font-bold">Contactez-Nous</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/realisations"
                className="inline-flex items-center justify-center gap-3 px-10 py-5 font-medium transition-all duration-300 hover:scale-105"
                style={{
                  background: 'rgba(255, 255, 255, 0.6)',
                  backdropFilter: 'blur(40px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(40px) saturate(180%)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                  border: '1px solid rgba(255, 255, 255, 0.5)',
                  clipPath: 'polygon(12px 0, calc(100% - 12px) 0, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px), 0 12px)',
                  color: '#2A2522',
                }}
              >
                <span className="uppercase tracking-wider text-sm font-bold">Voir Nos Réalisations</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}