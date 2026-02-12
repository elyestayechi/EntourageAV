import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../lib/gsap-init';

interface AnimatedTitleProps {
  children: string;
  className?: string;
  delay?: number;
}

export function AnimatedTitle({ children, className = '', delay = 0 }: AnimatedTitleProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!titleRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          delay,
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    return () => ctx.revert();
  }, [children, delay]);

  return (
    <h2
      ref={titleRef}
      className={className}
      style={{ letterSpacing: '-0.04em' }}
    >
      {children}
    </h2>
  );
}