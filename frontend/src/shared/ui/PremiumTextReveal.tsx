import { useEffect, useRef } from 'react';
import { gsap } from '../lib/gsap-init';

interface PremiumTextRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function PremiumTextReveal({ 
  children, 
  className = '', 
  delay = 0 
}: PremiumTextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current,
        { 
          opacity: 0,
          y: 40,
          scale: 0.98,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
            end: 'top 50%',
            toggleActions: 'play none none none',
          },
          delay,
        }
      );
    });

    return () => ctx.revert();
  }, [delay]);

  return (
    <div ref={containerRef} className={`${className}`} style={{ willChange: 'transform, opacity' }}>
      {children}
    </div>
  );
}