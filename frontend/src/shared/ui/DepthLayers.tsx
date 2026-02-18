import { useEffect, useRef } from 'react';
import { gsap } from '../lib/gsap-init';

/**
 * Depth Layers Component
 * Creates 3D depth illusion with parallax layers
 */

interface DepthLayersProps {
  /** Enable mouse parallax */
  enableParallax?: boolean;
  /** Intensity of parallax effect (0-1) */
  intensity?: number;
}

export function DepthLayers({ enableParallax = true, intensity = 1 }: DepthLayersProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const layer1Ref = useRef<HTMLDivElement>(null);
  const layer2Ref = useRef<HTMLDivElement>(null);
  const layer3Ref = useRef<HTMLDivElement>(null);
  const layer4Ref = useRef<HTMLDivElement>(null);
  const layer5Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !enableParallax) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const percentX = ((clientX - centerX) / centerX) * intensity;
      const percentY = ((clientY - centerY) / centerY) * intensity;

      // Layer 1 - Furthest (slowest movement)
      gsap.to(layer1Ref.current, {
        x: percentX * 50,
        y: percentY * 50,
        rotationY: percentX * 3,
        rotationX: -percentY * 3,
        duration: 1.2,
        ease: 'power2.out',
      });

      // Layer 2
      gsap.to(layer2Ref.current, {
        x: percentX * 35,
        y: percentY * 35,
        rotationY: percentX * 2,
        rotationX: -percentY * 2,
        duration: 1,
        ease: 'power2.out',
      });

      // Layer 3
      gsap.to(layer3Ref.current, {
        x: percentX * 25,
        y: percentY * 25,
        rotationY: percentX * 1.5,
        rotationX: -percentY * 1.5,
        duration: 0.9,
        ease: 'power2.out',
      });

      // Layer 4
      gsap.to(layer4Ref.current, {
        x: percentX * 15,
        y: percentY * 15,
        rotationY: percentX * 1,
        rotationX: -percentY * 1,
        duration: 0.8,
        ease: 'power2.out',
      });

      // Layer 5 - Closest (fastest movement)
      gsap.to(layer5Ref.current, {
        x: percentX * 10,
        y: percentY * 10,
        rotationY: percentX * 0.5,
        rotationX: -percentY * 0.5,
        duration: 0.7,
        ease: 'power2.out',
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [enableParallax, intensity]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{
        perspective: '1200px',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Layer 1 - Furthest back */}
      <div
        ref={layer1Ref}
        className="absolute inset-0 opacity-10"
        style={{
          transformStyle: 'preserve-3d',
          background: 'radial-gradient(ellipse at 20% 30%, var(--color-navy-sky) 0%, transparent 60%)',
          transform: 'translateZ(-400px) scale(1.4)',
        }}
      />

      {/* Layer 2 */}
      <div
        ref={layer2Ref}
        className="absolute inset-0 opacity-12"
        style={{
          transformStyle: 'preserve-3d',
          background: 'radial-gradient(ellipse at 80% 70%, var(--color-navy-blue) 0%, transparent 55%)',
          transform: 'translateZ(-300px) scale(1.3)',
        }}
      />

      {/* Layer 3 */}
      <div
        ref={layer3Ref}
        className="absolute inset-0 opacity-8"
        style={{
          transformStyle: 'preserve-3d',
          background: 'radial-gradient(ellipse at 50% 50%, var(--color-navy-ocean) 0%, transparent 50%)',
          transform: 'translateZ(-200px) scale(1.2)',
        }}
      />

      {/* Layer 4 */}
      <div
        ref={layer4Ref}
        className="absolute inset-0 opacity-6"
        style={{
          transformStyle: 'preserve-3d',
          background: 'radial-gradient(ellipse at 40% 60%, var(--color-navy-steel) 0%, transparent 45%)',
          transform: 'translateZ(-100px) scale(1.1)',
        }}
      />

      {/* Layer 5 - Closest */}
      <div
        ref={layer5Ref}
        className="absolute inset-0 opacity-5"
        style={{
          transformStyle: 'preserve-3d',
          background: 'radial-gradient(ellipse at 60% 40%, var(--color-navy-midnight) 0%, transparent 40%)',
          transform: 'translateZ(-50px) scale(1.05)',
        }}
      />

      {/* Subtle vignette for depth */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(42,42,42,0.15) 100%)',
        }}
      />
    </div>
  );
}
