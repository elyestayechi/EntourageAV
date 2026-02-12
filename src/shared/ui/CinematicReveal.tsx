import { useEffect, useRef, ReactNode } from 'react';
import { gsap, ScrollTrigger } from '../lib/gsap-init';

interface CinematicRevealProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale';
}

/**
 * CinematicReveal - Smooth, premium scroll-triggered animations
 * Creates depth through layered timing and easing
 */
export function CinematicReveal({ 
  children, 
  delay = 0,
  duration = 1.2,
  className = '',
  direction = 'up'
}: CinematicRevealProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const element = elementRef.current;

    // Define initial states based on direction
    const fromStates: Record<string, any> = {
      up: { y: 60, opacity: 0 },
      down: { y: -60, opacity: 0 },
      left: { x: -60, opacity: 0 },
      right: { x: 60, opacity: 0 },
      scale: { scale: 0.9, opacity: 0 }
    };

    const toStates: Record<string, any> = {
      up: { y: 0, opacity: 1 },
      down: { y: 0, opacity: 1 },
      left: { x: 0, opacity: 1 },
      right: { x: 0, opacity: 1 },
      scale: { scale: 1, opacity: 1 }
    };

    // Set initial state
    gsap.set(element, fromStates[direction]);

    // Create scroll-triggered animation
    ScrollTrigger.create({
      trigger: element,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(element, {
          ...toStates[direction],
          duration,
          delay,
          ease: 'power3.out',
          clearProps: 'all'
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === element) {
          trigger.kill();
        }
      });
    };
  }, [delay, duration, direction]);

  return (
    <div 
      ref={elementRef}
      className={`will-change-transform ${className}`}
      style={{
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden'
      }}
    >
      {children}
    </div>
  );
}
