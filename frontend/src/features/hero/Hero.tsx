import { useEffect, useRef } from 'react';
import { gsap } from '../../shared/lib/gsap-init';
import { FilmGrainTexture } from '../../shared/ui/FilmGrainTexture';
import logo from '../../assets/log.png';
import heroImage from '../../assets/hero.png';

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;

    const scrollCtx = gsap.context(() => {
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

      {/* 
        Hero Background Image — real <img> element (not CSS background-image)
        - fetchpriority="high" + loading="eager": load it first, no lazy-load
        - Preload link should be added in index.html:
            <link rel="preload" as="image" href="/src/assets/hero.png">
        - For production: convert to hero.webp, add srcset for responsive sizes
      */}
      <img
        ref={imageRef}
        src={heroImage}
        alt="Rénovation résidentielle et commerciale haut de gamme — Entourage AV"
        // @ts-ignore - fetchpriority is a valid HTML attribute
        fetchpriority="high"
        loading="eager"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition: 'center' }}
      />

      {/* Dark overlay for contrast */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Main Content Container */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-6 sm:px-12 text-center">
        
        {/* Logo */}
        <div className="mb-8 sm:mb-12">
          <img
            src={logo}
            alt="Logo Entourage AV"
            className="w-56 sm:w-72 md:w-80 lg:w-[28rem] h-auto mx-auto"
            style={{ 
              filter: 'drop-shadow(0 4px 30px rgba(0, 0, 0, 0.6)) drop-shadow(0 0 40px rgba(255, 255, 255, 0.3))',
            }}
          />
        </div>

        {/* Title */}
        <div className="max-w-xs sm:max-w-xl md:max-w-3xl lg:max-w-4xl px-4">
          <h1
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 sm:mb-8"
            style={{ 
              color: '#FFFFFF',
              lineHeight: '1.15',
            }}
          >
            TRANSFORMEZ VOTRE ESPACE
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-light" style={{ color: '#FFFFFF' }}>
            Découvrez l'excellence en rénovation résidentielle et commerciale.{' '}
            <span className="font-light" style={{ color: '#FFFFFF' }}>
              Où l'élégance rencontre la fonctionnalité.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}