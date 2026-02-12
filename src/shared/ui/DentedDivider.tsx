import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../lib/gsap-init';

interface DentedDividerProps {
  direction: 'down' | 'up';
  topColor?: string;
  bottomColor?: string;
}

export function DentedDivider({ direction, topColor = '#4a4a4a', bottomColor = '#F6F2E8' }: DentedDividerProps) {
  const pathRef = useRef<SVGPathElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!pathRef.current || !containerRef.current) return;

    const startDent = direction === 'down' ? 80 : -80;
    const endDent = direction === 'down' ? -80 : 80;

    gsap.fromTo(
      pathRef.current,
      {
        attr: {
          d: `M 0 50 Q 50 ${50 + startDent} 100 50`,
        },
      },
      {
        attr: {
          d: `M 0 50 Q 50 ${50 + endDent} 100 50`,
        },
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top center',
          end: 'bottom center',
          scrub: 1,
        },
      }
    );
  }, [direction]);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-32 relative overflow-hidden"
      style={{
        background: `linear-gradient(to bottom, ${topColor} 0%, ${topColor} 40%, ${bottomColor} 60%, ${bottomColor} 100%)`
      }}
    >
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="w-full h-full"
      >
        <path
          ref={pathRef}
          d="M 0 50 Q 50 50 100 50"
          stroke="rgba(255, 255, 255, 0.15)"
          strokeWidth="1"
          fill="none"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}