import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../lib/gsap-init';

interface CurtainRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function CurtainReveal({ children, className = '', delay = 0 }: CurtainRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !curtainRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        curtainRef.current,
        { 
          scaleY: 1,
        },
        {
          scaleY: 0,
          duration: 1.4,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            end: 'top 20%',
            scrub: 1,
          },
          delay,
        }
      );
    });

    return () => ctx.revert();
  }, [delay]);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <div className="relative overflow-hidden">
        {children}
        <div
          ref={curtainRef}
          className="absolute inset-0 bg-white origin-top z-10"
          style={{ transformOrigin: 'top' }}
        />
      </div>
    </div>
  );
}

interface CurtainRevealTitleProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  bgColor?: string;
}

export function CurtainRevealTitle({ 
  children, 
  className = '', 
  delay = 0,
  bgColor = '#ffffff'
}: CurtainRevealTitleProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !curtainRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        curtainRef.current,
        { 
          scaleY: 1,
        },
        {
          scaleY: 0,
          duration: 1.2,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
            end: 'top 25%',
            scrub: 0.5,
          },
          delay,
        }
      );
    });

    return () => ctx.revert();
  }, [delay]);

  return (
    <div ref={containerRef} className={`inline-block ${className}`}>
      <div className="relative overflow-hidden inline-block">
        {children}
        <div
          ref={curtainRef}
          className="absolute inset-0 origin-top z-10"
          style={{ 
            transformOrigin: 'top',
            backgroundColor: bgColor
          }}
        />
      </div>
    </div>
  );
}