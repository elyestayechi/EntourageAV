import { useEffect, useRef } from 'react';
import { gsap } from '../lib/gsap-init';

/**
 * Bauhaus Shapes Component
 * Animated geometric shapes inspired by Bauhaus design principles
 */

interface BauhausShapesProps {
  /** Enable mouse parallax effect */
  enableParallax?: boolean;
}

export function BauhausShapes({ enableParallax = true }: BauhausShapesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shape1Ref = useRef<HTMLDivElement>(null);
  const shape2Ref = useRef<HTMLDivElement>(null);
  const shape3Ref = useRef<HTMLDivElement>(null);
  const shape4Ref = useRef<HTMLDivElement>(null);
  const shape5Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Continuous rotation animations
      gsap.to(shape1Ref.current, {
        rotation: 360,
        duration: 30,
        repeat: -1,
        ease: 'none',
      });

      gsap.to(shape3Ref.current, {
        rotation: -360,
        duration: 40,
        repeat: -1,
        ease: 'none',
      });

      // Floating animations
      gsap.to(shape2Ref.current, {
        y: -20,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      gsap.to(shape4Ref.current, {
        x: 15,
        y: -15,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      gsap.to(shape5Ref.current, {
        scale: 1.1,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }, containerRef);

    // Mouse parallax effect
    if (enableParallax) {
      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const deltaX = (clientX - centerX) / centerX;
        const deltaY = (clientY - centerY) / centerY;

        gsap.to(shape1Ref.current, {
          x: deltaX * 30,
          y: deltaY * 30,
          duration: 1,
          ease: 'power2.out',
        });

        gsap.to(shape2Ref.current, {
          x: deltaX * -20,
          y: deltaY * -20,
          duration: 1,
          ease: 'power2.out',
        });

        gsap.to(shape3Ref.current, {
          x: deltaX * 25,
          y: deltaY * -25,
          duration: 1,
          ease: 'power2.out',
        });

        gsap.to(shape4Ref.current, {
          x: deltaX * -15,
          y: deltaY * 15,
          duration: 1,
          ease: 'power2.out',
        });

        gsap.to(shape5Ref.current, {
          x: deltaX * 20,
          y: deltaY * 20,
          duration: 1,
          ease: 'power2.out',
        });
      };

      window.addEventListener('mousemove', handleMouseMove);

      return () => {
        ctx.revert();
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }

    return () => ctx.revert();
  }, [enableParallax]);

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none overflow-hidden opacity-80">
      {/* Shape 1: Large Circle - Top Right */}
      <div
        ref={shape1Ref}
        className="absolute top-20 right-20 w-72 h-72 rounded-full border-8 opacity-10"
        style={{ borderColor: 'var(--color-navy-ocean)' }}
      />

      {/* Shape 2: Triangle - Top Left */}
      <div
        ref={shape2Ref}
        className="absolute top-40 left-40 w-48 h-48 opacity-8"
        style={{
          clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
          background: 'var(--color-navy-blue)',
        }}
      />

      {/* Shape 3: Square - Bottom Right */}
      <div
        ref={shape3Ref}
        className="absolute bottom-40 right-32 w-40 h-40 opacity-10"
        style={{ background: 'var(--color-navy-steel)' }}
      />

      {/* Shape 4: Small Circle - Bottom Left */}
      <div
        ref={shape4Ref}
        className="absolute bottom-32 left-32 w-28 h-28 rounded-full opacity-12"
        style={{ background: 'var(--color-navy-blue)' }}
      />

      {/* Shape 5: Rectangle - Center */}
      <div
        ref={shape5Ref}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-32 opacity-6"
        style={{ background: 'var(--color-navy-ocean)' }}
      />

      {/* Additional small accents */}
      <div
        className="absolute top-1/4 right-1/4 w-16 h-16 opacity-8"
        style={{
          clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
          background: 'var(--color-navy-slate)',
        }}
      />

      <div
        className="absolute bottom-1/4 left-1/4 w-12 h-12 rounded-full opacity-10 border-4"
        style={{ borderColor: 'var(--color-navy-blue)' }}
      />
    </div>
  );
}
