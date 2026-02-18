import { useEffect, useRef } from 'react';
import { gsap } from '../../shared/lib/gsap-init';
import { FilmGrainTexture } from '../../shared/ui/FilmGrainTexture';
// Import images from assets folder
import logo from '../../assets/log.png';
import heroImage from '../../assets/hero.png';

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;

    // Only scroll-triggered parallax
    const scrollCtx = gsap.context(() => {
      // Parallax on scroll
      gsap.to(imageRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
        },
        y: 200,
        scale: 1.1,
        ease: 'none',
      });
    }, heroRef);

    return () => {
      scrollCtx.revert();
    };
  }, []);

  return (
    <div
      ref={heroRef}
      className="relative overflow-hidden flex items-center justify-center"
      style={{
        height: '120vh',
        background: 'linear-gradient(180deg, transparent 0%, var(--color-gold)08 50%, transparent 100%)',
      }}
    >
      {/* Film grain texture */}
      <FilmGrainTexture />

      {/* Hero Background Image - full bleed */}
      <div
        ref={imageRef}
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Main Content Container - Centered */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-6 sm:px-12 text-center">
        
        {/* Logo - centered at top */}
        <div className="mb-12 sm:mb-16">
          <img
            src={logo}
            alt="Entourage AV"
            className="w-72 sm:w-96 lg:w-[28rem] h-auto mx-auto"
            style={{ 
              filter: 'drop-shadow(0 4px 30px rgba(0, 0, 0, 0.6)) drop-shadow(0 0 40px rgba(255, 255, 255, 0.3))',
            }}
          />
        </div>

        {/* Title - centered with increased height */}
        <div className="max-w-4xl">
          <h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight"
            style={{ 
              color: '#FFFFFF',
              lineHeight: '1.2',
            }}
          >
            TRANSFORMEZ VOTRE ESPACE
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl font-light" style={{ color: '#FFFFFF' }}>
            Découvrez l'excellence en rénovation résidentielle et commerciale.
            <br />
            <span className="font-light" style={{ color: '#FFFFFF' }}>
              Où l'élégance rencontre la fonctionnalité.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}