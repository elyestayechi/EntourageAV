import { useEffect, useRef } from 'react';
import { gsap } from '../lib/gsap-init';

interface AnimatedGridLinesProps {
  className?: string;
  lineColor?: string;
  glowColor?: string;
}

export function AnimatedGridLines({ 
  className = '', 
  lineColor = 'rgba(143, 169, 199, 0.15)',
  glowColor = 'rgba(74, 99, 130, 0.4)'
}: AnimatedGridLinesProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const lines = containerRef.current.querySelectorAll('.animated-line');

    lines.forEach((line, index) => {
      // Animate glow traveling along lines
      gsap.to(line, {
        '--glow-position': '100%',
        duration: 4 + (index % 3) * 2,
        ease: 'none',
        repeat: -1,
        delay: (index % 4) * 0.5,
      });
    });
  }, []);

  return (
    <div 
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      style={{ zIndex: 0 }}
    >
      {/* Vertical lines */}
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={`v-${i}`}
          className="animated-line absolute top-0 h-full"
          style={{
            left: `${(i / 7) * 100}%`,
            width: '1px',
            '--glow-position': '0%',
            background: `linear-gradient(
              180deg,
              ${lineColor} 0%,
              ${lineColor} calc(var(--glow-position) - 15%),
              ${glowColor} calc(var(--glow-position) - 5%),
              rgba(212, 225, 240, 0.8) var(--glow-position),
              ${glowColor} calc(var(--glow-position) + 5%),
              ${lineColor} calc(var(--glow-position) + 15%),
              ${lineColor} 100%
            )`,
            boxShadow: `0 0 20px ${glowColor}`,
          } as React.CSSProperties}
        />
      ))}

      {/* Horizontal lines */}
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={`h-${i}`}
          className="animated-line absolute left-0 w-full"
          style={{
            top: `${(i / 5) * 100}%`,
            height: '1px',
            '--glow-position': `${(i * 20) % 100}%`,
            background: `linear-gradient(
              90deg,
              ${lineColor} 0%,
              ${lineColor} calc(var(--glow-position) - 15%),
              ${glowColor} calc(var(--glow-position) - 5%),
              rgba(212, 225, 240, 0.8) var(--glow-position),
              ${glowColor} calc(var(--glow-position) + 5%),
              ${lineColor} calc(var(--glow-position) + 15%),
              ${lineColor} 100%
            )`,
            boxShadow: `0 0 20px ${glowColor}`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}
