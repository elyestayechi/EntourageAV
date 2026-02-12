import { useEffect, useRef } from 'react';
import { gsap } from '../lib/gsap-init';

/**
 * Swiss Design Graphic Elements
 * Geometric shapes, lines, and typography that follow Swiss/International style principles
 */

export function SwissGraphicElements() {
  const containerRef = useRef<HTMLDivElement>(null);
  const triangleRef = useRef<HTMLDivElement>(null);
  const circleLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Rotating triangle
      gsap.to(triangleRef.current, {
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: 'none',
      });

      // Pulsing circle line
      gsap.to(circleLineRef.current, {
        scale: 1.1,
        opacity: 0.05,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Top Left Triangle */}
      <div
        ref={triangleRef}
        className="absolute top-40 left-40 w-24 h-24 opacity-10"
        style={{
          clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
          background: 'var(--color-navy-blue)',
        }}
      />

      {/* Top Right Circle Outline */}
      <div
        ref={circleLineRef}
        className="absolute top-32 right-32 w-48 h-48 rounded-full border-2 opacity-8"
        style={{ borderColor: 'var(--color-navy-ocean)' }}
      />

      {/* Center Diagonal Line */}
      <div
        className="absolute top-1/2 left-1/2 w-1 h-96 origin-center opacity-5"
        style={{
          background: 'var(--color-navy-steel)',
          transform: 'translate(-50%, -50%) rotate(45deg)',
        }}
      />

      {/* Bottom Right Grid Pattern */}
      <div
        className="absolute bottom-20 right-20 w-32 h-32 opacity-8"
        style={{
          backgroundImage: `
            linear-gradient(var(--color-navy-blue) 2px, transparent 2px),
            linear-gradient(90deg, var(--color-navy-blue) 2px, transparent 2px)
          `,
          backgroundSize: '16px 16px',
        }}
      />

      {/* Vertical Bars - Left Side */}
      <div className="absolute left-12 top-1/4 flex gap-2">
        <div className="w-1 h-20 opacity-10" style={{ background: 'var(--color-navy-blue)' }} />
        <div className="w-1 h-32 opacity-10" style={{ background: 'var(--color-navy-ocean)' }} />
        <div className="w-1 h-16 opacity-10" style={{ background: 'var(--color-navy-steel)' }} />
      </div>

      {/* Horizontal Bars - Right Side */}
      <div className="absolute right-12 bottom-1/3 flex flex-col gap-2">
        <div className="h-1 w-24 opacity-10" style={{ background: 'var(--color-navy-blue)' }} />
        <div className="h-1 w-16 opacity-10" style={{ background: 'var(--color-navy-ocean)' }} />
        <div className="h-1 w-32 opacity-10" style={{ background: 'var(--color-navy-steel)' }} />
      </div>

      {/* Corner Brackets - Top Left */}
      <div className="absolute top-8 left-8 w-12 h-12 border-l-2 border-t-2 opacity-15" style={{ borderColor: 'var(--color-navy-blue)' }} />
      
      {/* Corner Brackets - Bottom Right */}
      <div className="absolute bottom-8 right-8 w-12 h-12 border-r-2 border-b-2 opacity-15" style={{ borderColor: 'var(--color-navy-blue)' }} />

      {/* Measurement Lines - Swiss Style */}
      <div className="absolute top-20 left-1/2 transform -translate-x-1/2 flex items-center gap-2 opacity-15">
        <div className="w-16 h-px" style={{ background: 'var(--color-navy-blue)' }} />
        <div className="w-2 h-2 rounded-full" style={{ background: 'var(--color-navy-blue)' }} />
        <div className="w-16 h-px" style={{ background: 'var(--color-navy-blue)' }} />
      </div>
    </div>
  );
}
