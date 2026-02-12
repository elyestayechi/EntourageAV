import { Link } from 'react-router';
import { useRef, useEffect } from 'react';
import { gsap, ScrollTrigger } from '../shared/lib/gsap-init';
import { ArrowRight, Check, CheckCircle2, Clock, Phone } from 'lucide-react';
import { FilmGrainTexture } from '../shared/ui/FilmGrainTexture';
import { PremiumTextReveal } from '../shared/ui/PremiumTextReveal';

const processSteps = [
  {
    number: 1,
    icon: ArrowRight,
    title: 'Premier contact',
    subtitle: 'Échangeons sur votre projet',
    description: 'Prenez contact avec nous par téléphone, email ou via notre formulaire. Nous discutons de vos besoins, de vos envies et de votre budget pour comprendre votre vision.',
    details: [
      'Écoute attentive de vos besoins',
      'Premiers conseils personnalisés',
      'Estimation préliminaire gratuite',
      'Réponse sous 24h ouvrées',
    ],
    image: 'https://images.unsplash.com/photo-1423666639041-f56000c27a9a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaG9uZSUyMGNhbGwlMjBidXNpbmVzc3xlbnwxfHx8fDE3Njg5OTk1MDN8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    number: 2,
    icon: ArrowRight,
    title: 'Visite technique',
    subtitle: 'Nous venons chez vous',
    description: 'Rendez-vous sur place pour un état des lieux détaillé. Nous prenons les mesures, analysons les contraintes techniques et discutons de vos idées en situation réelle.',
    details: [
      'Prise de mesures précises',
      'Analyse technique complète',
      'Identification des contraintes',
      'Conseils d\'optimisation',
    ],
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob21lJTIwaW5zcGVjdGlvbnxlbnwxfHx8fDE3Njg5OTk1MDR8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    number: 3,
    icon: ArrowRight,
    title: 'Devis détaillé',
    subtitle: 'Transparence totale',
    description: 'Nous vous remettons un devis complet et détaillé, sans surprise. Chaque poste de dépense est clairement identifié avec le planning prévisionnel des travaux.',
    details: [
      'Devis détaillé poste par poste',
      'Planning prévisionnel précis',
      'Choix des matériaux et finitions',
      'Garanties et assurances incluses',
    ],
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2N1bWVudCUyMHBsYW5uaW5nfGVufDF8fHx8MTc2ODk5OTUwNHww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    number: 4,
    icon: ArrowRight,
    title: 'Réalisation des travaux',
    subtitle: 'L\'excellence en action',
    description: 'Nos équipes interviennent avec professionnalisme et respect de votre quotidien. Chantier propre, suivi régulier et communication transparente tout au long du projet.',
    details: [
      'Chantier propre et organisé',
      'Respect des délais convenus',
      'Suivi hebdomadaire par SMS/email',
      'Artisans qualifiés et assurés',
    ],
    image: 'https://images.unsplash.com/photo-1768321903885-d0a6798485d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnRlcmlvciUyMHJlbm92YXRpb24lMjBjb25zdHJ1Y3Rpb258ZW58MXx8fHwxNzY4OTk1MjA4fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    number: 5,
    icon: ArrowRight,
    title: 'Livraison et suivi',
    subtitle: 'Votre satisfaction, notre priorité',
    description: 'Réception des travaux ensemble, vérification de chaque détail et remise de tous les documents. Nous restons disponibles après la livraison pour tout besoin.',
    details: [
      'Visite de réception détaillée',
      'Remise de toutes les garanties',
      'Guide d\'entretien personnalisé',
      'Service après-vente réactif',
    ],
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvdXRkb29yJTIwdGVycmFjZXxlbnwxfHx8fDE3Njg5OTk1MDJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
];

export function ProcessPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

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

    // Steps animation with parallax
    if (stepsRef.current) {
      const steps = stepsRef.current.querySelectorAll('.process-step');
      
      steps.forEach((step, index) => {
        // Number animation
        const number = step.querySelector('.step-number');
        if (number) {
          gsap.fromTo(
            number,
            { scale: 0, rotation: -180 },
            {
              scale: 1,
              rotation: 0,
              duration: 1,
              ease: 'back.out(1.7)',
              scrollTrigger: {
                trigger: step,
                start: 'top 80%',
              },
            }
          );
        }

        // Content animation
        const content = step.querySelector('.step-content');
        if (content) {
          gsap.fromTo(
            content,
            { opacity: 0, x: index % 2 === 0 ? -50 : 50 },
            {
              opacity: 1,
              x: 0,
              duration: 1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: step,
                start: 'top 75%',
              },
            }
          );
        }

        // Image animation with parallax
        const image = step.querySelector('.step-image');
        if (image) {
          gsap.fromTo(
            image,
            { opacity: 0, scale: 0.8 },
            {
              opacity: 1,
              scale: 1,
              duration: 1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: step,
                start: 'top 75%',
              },
            }
          );
        }

        // Subtle parallax for entire step
        gsap.to(step, {
          y: -40,
          ease: 'none',
          scrollTrigger: {
            trigger: step,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 2,
          },
        });
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#FAFAF9]">
      {/* Hero Section - Updated to match Contact page */}
      <section ref={heroRef} className="relative min-h-[50vh] flex items-center justify-center px-4 pt-32 pb-20">
        <FilmGrainTexture id="processHeroGrain" opacity={0.04} withVignette={true} vignetteIntensity={0.15} />
        
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
            <span className="text-sm font-medium" style={{ color: '#2A2522' }}>PROCESSUS</span>
          </div>
          
          <PremiumTextReveal>
            <h1 className="text-5xl sm:text-6xl lg:text-8xl font-bold mb-6 leading-[0.9]" style={{ color: '#2A2522' }}>
              NOTRE MÉTHODE<br />D'EXCELLENCE
            </h1>
          </PremiumTextReveal>
          
          <p className="text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed" style={{ color: '#5A5A5A' }}>
            De votre premier appel à la livraison finale, découvrez comment nous transformons vos projets en réalité avec méthode et transparence.
          </p>
          
          <div className="animate-in flex items-center justify-center gap-3 mt-6">
            <Check className="w-5 h-5" style={{ color: '#2A2522' }} />
            <span className="text-sm font-medium" style={{ color: '#5A5A5A' }}>Délais respectés à 98% sur nos projets 2024</span>
          </div>
        </div>
      </section>

      {/* Process Steps - Updated styling with side-by-side layout and timeline */}
      <section ref={stepsRef} className="relative py-20 px-4 bg-[#FAFAF9]">
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
              Notre Processus en 5 Étapes
            </h2>
            <p className="text-lg max-w-3xl mx-auto leading-relaxed" style={{ color: '#5A5A5A' }}>
              Un accompagnement complet et transparent à chaque étape de votre projet
            </p>
          </div>

          {/* Timeline connector - desktop only */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#2A2522]/20 to-transparent -translate-x-1/2" />

          <div className="space-y-32 relative">
            {processSteps.map((step, index) => (
              <div
                key={step.number}
                className="process-step relative"
              >
                {/* Connector line for mobile */}
                {index < processSteps.length - 1 && (
                  <div className="lg:hidden absolute left-8 top-full w-px h-8 bg-gradient-to-b from-[#2A2522]/20 to-transparent" />
                )}

                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}>
                  {/* Content - Left side for even, Right side for odd */}
                  <div className={`step-content ${index % 2 === 1 ? 'lg:order-2 lg:ml-auto' : 'lg:mr-auto'} relative`}>
                    <div className="flex items-center gap-4 mb-6">
                      <div 
                        className="step-number w-16 h-16 flex items-center justify-center text-2xl font-bold relative z-10"
                        style={{
                          background: 'rgba(255, 255, 255, 0.6)',
                          backdropFilter: 'blur(20px) saturate(180%)',
                          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                          border: '1px solid rgba(255, 255, 255, 0.5)',
                          clipPath: 'polygon(8px 0, calc(100% - 8px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px), 0 8px)',
                          color: '#2A2522',
                        }}
                      >
                        {step.number}
                      </div>
                      {/* Dot connector for desktop */}
                      <div className="hidden lg:block absolute left-1/2 top-8 w-4 h-4 rounded-full bg-[#2A2522] -translate-x-1/2 z-20" />
                    </div>

                    <div 
                      className="p-8"
                      style={{
                        background: 'rgba(255, 255, 255, 0.4)',
                        backdropFilter: 'blur(40px) saturate(180%)',
                        WebkitBackdropFilter: 'blur(40px) saturate(180%)',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        clipPath: 'polygon(12px 0, calc(100% - 12px) 0, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px), 0 12px)',
                      }}
                    >
                      <h3 className="text-2xl sm:text-3xl font-bold mb-2" style={{ color: '#2A2522' }}>
                        {step.title}
                      </h3>
                      <p className="text-lg mb-4" style={{ color: '#5A5A5A' }}>
                        {step.subtitle}
                      </p>
                      <p className="leading-relaxed mb-6" style={{ color: '#5A5A5A' }}>
                        {step.description}
                      </p>

                      <div className="space-y-3">
                        {step.details.map((detail, idx) => (
                          <div key={idx} className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#2A2522' }} />
                            <span className="text-sm" style={{ color: '#5A5A5A' }}>{detail}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Image - Right side for even, Left side for odd */}
                  <div className={`step-image ${index % 2 === 1 ? 'lg:order-1 lg:mr-auto' : 'lg:ml-auto'}`}>
                    <div 
                      className="relative h-64 sm:h-80 overflow-hidden"
                      style={{
                        background: 'rgba(255, 255, 255, 0.4)',
                        backdropFilter: 'blur(40px) saturate(180%)',
                        WebkitBackdropFilter: 'blur(40px) saturate(180%)',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        clipPath: 'polygon(12px 0, calc(100% - 12px) 0, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px), 0 12px)',
                      }}
                    >
                      <img
                        src={step.image}
                        alt={step.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us - Updated styling */}
      <section className="py-20 px-4 bg-[#FAFAF9]">
        <div className="max-w-7xl mx-auto">
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
              Pourquoi choisir Entourage AV ?
            </h2>
            <p className="text-lg max-w-3xl mx-auto leading-relaxed" style={{ color: '#5A5A5A' }}>
              Notre expertise et notre engagement font la différence à chaque étape de votre projet.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: CheckCircle2,
                title: 'Garantie qualité',
                description: 'Toutes nos réalisations sont couvertes par une garantie décennale et biennale.'
              },
              {
                icon: Clock,
                title: 'Respect des délais',
                description: '98% de nos projets sont livrés dans les délais annoncés ou avant.'
              },
              {
                icon: Phone,
                title: 'Suivi personnalisé',
                description: 'Un interlocuteur dédié vous accompagne du début à la fin de votre projet.'
              }
            ].map((item, index) => (
              <div 
                key={index}
                className="p-8 text-center"
                style={{
                  background: 'rgba(255, 255, 255, 0.4)',
                  backdropFilter: 'blur(40px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(40px) saturate(180%)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  clipPath: 'polygon(12px 0, calc(100% - 12px) 0, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px), 0 12px)',
                }}
              >
                <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                  <item.icon className="w-10 h-10" style={{ color: '#2A2522' }} />
                </div>
                <h3 className="text-xl font-bold mb-3" style={{ color: '#2A2522' }}>{item.title}</h3>
                <p className="leading-relaxed" style={{ color: '#5A5A5A' }}>{item.description}</p>
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