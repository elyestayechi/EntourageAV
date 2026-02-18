import { useRef, useEffect } from 'react';
import { gsap, ScrollTrigger } from '../lib/gsap-init';

interface EnhancedDentTransitionProps {
  fromColor: string;
  toColor: string;
  gradientFrom?: string;
  gradientTo?: string;
  depth?: number;
}

export function EnhancedDentTransition({ 
  fromColor, 
  toColor, 
  gradientFrom = 'rgba(255,255,255,0.1)',
  gradientTo = 'rgba(0,0,0,0.1)',
  depth = 8
}: EnhancedDentTransitionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const dentRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !dentRef.current) return;

    const ctx = gsap.context(() => {
      // Parallax effect on dent - moves slower than content
      gsap.to(dentRef.current, {
        y: -depth * 2,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      });

      // Shadow depth animation
      gsap.to(shadowRef.current, {
        opacity: 0.6,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'center center',
          scrub: 2,
        },
      });

      // Gradient light sweep animation
      gsap.fromTo(
        dentRef.current,
        {
          backgroundPosition: '-200% 0',
        },
        {
          backgroundPosition: '200% 0',
          duration: 3,
          ease: 'power1.inOut',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top center',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    return () => ctx.revert();
  }, [depth]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full overflow-visible pointer-events-none"
      style={{ 
        height: `${depth}rem`,
        marginTop: `-${depth}rem`,
        zIndex: 10,
      }}
    >
      {/* Main sculpted dent shape */}
      <div
        ref={dentRef}
        className="absolute inset-0 w-full"
        style={{
          background: `linear-gradient(135deg, ${gradientFrom} 0%, ${gradientTo} 100%)`,
          backgroundSize: '400% 100%',
          clipPath: `polygon(
            0 0,
            0 100%,
            20% 100%,
            30% 40%,
            50% 20%,
            70% 40%,
            80% 100%,
            100% 100%,
            100% 0
          )`,
          filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.15))',
        }}
      >
        {/* Inner shadow for depth */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(180deg, rgba(0,0,0,0.08) 0%, transparent 50%, rgba(255,255,255,0.05) 100%)`,
            clipPath: 'inherit',
          }}
        />
      </div>

      {/* Soft ambient shadow below */}
      <div
        ref={shadowRef}
        className="absolute inset-0 w-full opacity-0"
        style={{
          top: `${depth * 0.5}rem`,
          background: `radial-gradient(ellipse 60% 50% at 50% 0%, rgba(0,0,0,0.12), transparent)`,
          filter: 'blur(16px)',
        }}
      />

      {/* Background layer transition */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          background: `linear-gradient(to bottom, ${fromColor} 0%, ${fromColor} 40%, ${toColor} 60%, ${toColor} 100%)`,
          zIndex: -1,
        }}
      />
    </div>
  );
}