import { useEffect, useRef } from 'react';
import { gsap } from '../lib/gsap-init';

interface TextRevealProps {
  children: string;
  className?: string;
  delay?: number;
}

export function TextReveal({ children, className = '', delay = 0 }: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !textRef.current) return;

    const chars = children.split('');
    textRef.current.innerHTML = chars
      .map((char) => {
        if (char === ' ') return '<span class="inline-block">&nbsp;</span>';
        return `<span class="inline-block translate-y-full opacity-0">${char}</span>`;
      })
      .join('');

    const charElements = textRef.current.querySelectorAll('span');

    gsap.to(charElements, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.02,
      delay,
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });
  }, [children, delay]);

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`}>
      <div ref={textRef} className="inline-block" />
    </div>
  );
}