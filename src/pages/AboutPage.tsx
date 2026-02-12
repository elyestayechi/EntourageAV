import { Link } from 'react-router';
import { useRef, useEffect } from 'react';
import { gsap, ScrollTrigger } from '../shared/lib/gsap-init';
import { PremiumTextReveal } from '../shared/ui/PremiumTextReveal';
import { FilmGrainTexture } from '../shared/ui/FilmGrainTexture';
import { ArrowRight } from 'lucide-react';

export function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        heroRef.current!.querySelectorAll('.animate-in'),
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
        }
      );
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!sectionsRef.current) return;

    const cards = sectionsRef.current.querySelectorAll('.about-card');
    
    cards.forEach((card) => {
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

      gsap.to(card, {
        y: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: card,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 2,
        },
      });
    });

    const sectionImages = sectionsRef.current.querySelectorAll('.about-card img');
    sectionImages.forEach((img) => {
      gsap.to(img, {
        yPercent: 15,
        ease: 'none',
        scrollTrigger: {
          trigger: img,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      });
    });
  }, []);

  return (
    <div className="bg-[#FAFAF9] min-h-screen">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[50vh] flex items-center justify-center px-4 pt-32 pb-20">
        <FilmGrainTexture id="aboutHeroGrain" opacity={0.04} withVignette={true} vignetteIntensity={0.15} />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          {/* Badge */}
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
            <span className="text-sm font-medium" style={{ color: '#2A2522' }}>À PROPOS</span>
          </div>
          
          <PremiumTextReveal>
            <h1 className="text-5xl sm:text-6xl lg:text-8xl font-bold mb-6 leading-[0.9]" style={{ color: '#2A2522' }}>
              UNE HISTOIRE<br />D'EXCELLENCE
            </h1>
          </PremiumTextReveal>
          
          <p className="text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed" style={{ color: '#5A5A5A' }}>
            15 ans de passion et d'expertise dans la rénovation intérieure, transformant maisons, appartements et hôtels en espaces exceptionnels.
          </p>
        </div>
      </section>

      {/* Notre Histoire - Modern house interior */}
      <section ref={sectionsRef} className="py-20 px-4 bg-[#FAFAF9]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Content */}
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-8" style={{ color: '#2A2522' }}>
                Notre Histoire
              </h2>
              
              <div className="space-y-6 mb-12">
                <div 
                  className="p-6"
                  style={{
                    background: 'rgba(255, 255, 255, 0.4)',
                    backdropFilter: 'blur(40px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(40px) saturate(180%)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    clipPath: 'polygon(12px 0, calc(100% - 12px) 0, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px), 0 12px)',
                  }}
                >
                  <h3 className="font-bold mb-3" style={{ color: '#2A2522' }}>Une Passion Devenue Excellence</h3>
                  <p style={{ color: '#5A5A5A' }}>
                    Fondée en 2008, Entourage AV est née de la vision de deux passionnés qui partageaient un rêve : révolutionner la rénovation intérieure en France. De la maison individuelle à l'hôtel de luxe.
                  </p>
                </div>
                
                <div 
                  className="p-6"
                  style={{
                    background: 'rgba(255, 255, 255, 0.4)',
                    backdropFilter: 'blur(40px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(40px) saturate(180%)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    clipPath: 'polygon(12px 0, calc(100% - 12px) 0, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px), 0 12px)',
                  }}
                >
                  <h3 className="font-bold mb-3" style={{ color: '#2A2522' }}>Croissance et Évolution</h3>
                  <p style={{ color: '#5A5A5A' }}>
                    D'une équipe de 5 artisans dévoués à plus de 50 professionnels qualifiés, notre croissance n'a jamais compromis nos valeurs : excellence, innovation et respect absolu dans chaque projet résidentiel et hôtelier.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Image - Beautiful modern living room renovation */}
            <div 
              className="about-card p-8"
              style={{
                background: 'rgba(255, 255, 255, 0.4)',
                backdropFilter: 'blur(40px) saturate(180%)',
                WebkitBackdropFilter: 'blur(40px) saturate(180%)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                clipPath: 'polygon(16px 0, calc(100% - 16px) 0, 100% 16px, 100% calc(100% - 16px), calc(100% - 16px) 100%, 16px 100%, 0 calc(100% - 16px), 0 16px)',
              }}
            >
              <div 
                className="relative h-[400px] overflow-hidden"
                style={{
                  clipPath: 'polygon(12px 0, calc(100% - 12px) 0, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px), 0 12px)',
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80"
                  alt="Rénovation Intérieure Moderne - Salon"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-[#FAFAF9]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-8" style={{ color: '#2A2522' }}>
            Nos Chiffres Clés
          </h2>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { value: '500+', label: 'Projets Réalisés' },
              { value: '98%', label: 'Clients Satisfaits' },
              { value: '15+', label: 'Années d\'Expérience' },
              { value: '50+', label: 'Professionnels' },
            ].map((stat, index) => (
              <div 
                key={index}
                className="text-center p-6"
                style={{
                  background: 'rgba(255, 255, 255, 0.4)',
                  backdropFilter: 'blur(40px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(40px) saturate(180%)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  clipPath: 'polygon(8px 0, calc(100% - 8px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px), 0 8px)',
                }}
              >
                <div className="text-4xl font-bold mb-2" style={{ color: '#2A2522' }}>{stat.value}</div>
                <div className="text-sm" style={{ color: '#5A5A5A' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Notre Savoir-Faire - Apartment renovation */}
      <section className="py-20 px-4 bg-[#FAFAF9]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Image - Modern apartment interior */}
            <div 
              className="about-card p-8"
              style={{
                background: 'rgba(255, 255, 255, 0.4)',
                backdropFilter: 'blur(40px) saturate(180%)',
                WebkitBackdropFilter: 'blur(40px) saturate(180%)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                clipPath: 'polygon(16px 0, calc(100% - 16px) 0, 100% 16px, 100% calc(100% - 16px), calc(100% - 16px) 100%, 16px 100%, 0 calc(100% - 16px), 0 16px)',
              }}
            >
              <div 
                className="relative h-[400px] overflow-hidden"
                style={{
                  clipPath: 'polygon(12px 0, calc(100% - 12px) 0, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px), 0 12px)',
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1200&q=80"
                  alt="Rénovation Appartement Moderne"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Right Content */}
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-8" style={{ color: '#2A2522' }}>
                Notre Savoir-Faire
              </h2>
              
              <div className="space-y-6 mb-12">
                <div 
                  className="p-6"
                  style={{
                    background: 'rgba(255, 255, 255, 0.4)',
                    backdropFilter: 'blur(40px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(40px) saturate(180%)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    clipPath: 'polygon(12px 0, calc(100% - 12px) 0, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px), 0 12px)',
                  }}
                >
                  <h3 className="font-bold mb-3" style={{ color: '#2A2522' }}>Expertise Complète</h3>
                  <p style={{ color: '#5A5A5A' }}>
                    Notre expertise couvre l'ensemble de la rénovation intérieure. Maisons individuelles, appartements parisiens, et hôtels haut de gamme - nous maîtrisons tous les corps de métier.
                  </p>
                </div>
                
                <div 
                  className="p-6"
                  style={{
                    background: 'rgba(255, 255, 255, 0.4)',
                    backdropFilter: 'blur(40px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(40px) saturate(180%)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    clipPath: 'polygon(12px 0, calc(100% - 12px) 0, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px), 0 12px)',
                  }}
                >
                  <h3 className="font-bold mb-3" style={{ color: '#2A2522' }}>Innovation et Tradition</h3>
                  <p style={{ color: '#5A5A5A' }}>
                    Nous combinons techniques traditionnelles et innovations modernes pour garantir des résultats exceptionnels qui résistent à l'épreuve du temps, quel que soit le type de projet.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hotel/Commercial Section */}
      <section className="py-20 px-4 bg-[#FAFAF9]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Content */}
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-8" style={{ color: '#2A2522' }}>
                Projets Hôteliers
              </h2>
              
              <div className="space-y-6 mb-12">
                <div 
                  className="p-6"
                  style={{
                    background: 'rgba(255, 255, 255, 0.4)',
                    backdropFilter: 'blur(40px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(40px) saturate(180%)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    clipPath: 'polygon(12px 0, calc(100% - 12px) 0, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px), 0 12px)',
                  }}
                >
                  <h3 className="font-bold mb-3" style={{ color: '#2A2522' }}>Hôtels de Prestige</h3>
                  <p style={{ color: '#5A5A5A' }}>
                    Nous accompagnons les hôtels dans leurs projets de rénovation complète. Chambres, suites, espaces communs - chaque détail est pensé pour l'expérience client.
                  </p>
                </div>
                
                <div 
                  className="p-6"
                  style={{
                    background: 'rgba(255, 255, 255, 0.4)',
                    backdropFilter: 'blur(40px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(40px) saturate(180%)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    clipPath: 'polygon(12px 0, calc(100% - 12px) 0, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px), 0 12px)',
                  }}
                >
                  <h3 className="font-bold mb-3" style={{ color: '#2A2522' }}>Délais Maîtrisés</h3>
                  <p style={{ color: '#5A5A5A' }}>
                    Comprenant les enjeux commerciaux, nous respectons scrupuleusement les délais. Rénovations par phases, travaux de nuit - nous nous adaptons à vos contraintes.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Image - Luxury hotel interior */}
            <div 
              className="about-card p-8"
              style={{
                background: 'rgba(255, 255, 255, 0.4)',
                backdropFilter: 'blur(40px) saturate(180%)',
                WebkitBackdropFilter: 'blur(40px) saturate(180%)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                clipPath: 'polygon(16px 0, calc(100% - 16px) 0, 100% 16px, 100% calc(100% - 16px), calc(100% - 16px) 100%, 16px 100%, 0 calc(100% - 16px), 0 16px)',
              }}
            >
              <div 
                className="relative h-[400px] overflow-hidden"
                style={{
                  clipPath: 'polygon(12px 0, calc(100% - 12px) 0, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px), 0 12px)',
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&q=80"
                  alt="Rénovation Hôtel de Luxe"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 bg-[#FAFAF9]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-12" style={{ color: '#2A2522' }}>
            Nos Valeurs
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                title: 'Excellence',
                description: 'Aucun compromis sur la qualité. Chaque matériau, chaque finition, chaque détail est sélectionné et exécuté avec le plus grand soin - du studio au palace.'
              },
              {
                title: 'Innovation',
                description: 'À la pointe des dernières technologies et techniques de rénovation intérieure pour des solutions toujours plus performantes et durables.'
              },
              {
                title: 'Transparence',
                description: 'Communication claire et honnête à chaque étape. Nos clients savent toujours où en est leur projet, qu\'il s\'agisse d\'une maison ou d\'un hôtel.'
              }
            ].map((value, index) => (
              <div 
                key={index}
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
                <h3 className="text-2xl font-bold mb-4" style={{ color: '#2A2522' }}>{value.title}</h3>
                <p className="leading-relaxed" style={{ color: '#5A5A5A' }}>
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Engagement Écologique */}
      <section className="py-20 px-4 bg-[#FAFAF9]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-8" style={{ color: '#2A2522' }}>
            Notre Engagement Écologique
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {[
              { value: '100%', label: 'Matériaux Certifiés' },
              { value: '-40%', label: 'Consommation Énergétique' },
              { value: '90%', label: 'Déchets Recyclés' },
            ].map((stat, index) => (
              <div 
                key={index}
                className="p-6 text-center"
                style={{
                  background: 'rgba(255, 255, 255, 0.4)',
                  backdropFilter: 'blur(40px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(40px) saturate(180%)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  clipPath: 'polygon(8px 0, calc(100% - 8px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px), 0 8px)',
                }}
              >
                <div className="text-3xl font-bold mb-2" style={{ color: '#2A2522' }}>{stat.value}</div>
                <div className="text-sm" style={{ color: '#5A5A5A' }}>{stat.label}</div>
              </div>
            ))}
          </div>
          
          <p className="text-lg leading-relaxed" style={{ color: '#5A5A5A' }}>
            La rénovation de qualité va de pair avec le respect de l'environnement. Matériaux écologiques, économie d'énergie et construction durable pour tous nos projets résidentiels et hôteliers.
          </p>
        </div>
      </section>

      {/* CTA */}
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
              Maison, appartement ou hôtel - découvrez comment notre expertise peut donner vie à vos projets de rénovation.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
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
                to="/processus"
                className="inline-flex items-center justify-center gap-3 px-10 py-5 font-medium transition-all duration-300 hover:scale-105"
                style={{
                  background: 'rgba(255, 255, 255, 0.6)',
                  backdropFilter: 'blur(40px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(40px) saturate(180%)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.4)',
                  border: '1px solid rgba(0, 0, 0, 0.1)',
                  clipPath: 'polygon(12px 0, calc(100% - 12px) 0, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px), 0 12px)',
                  color: '#2A2522',
                }}
              >
                <span className="uppercase tracking-wider text-sm font-bold">Notre Processus</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}