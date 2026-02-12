import { useEffect, useRef, ReactNode } from 'react';
import { gsap, ScrollTrigger } from '../lib/gsap-init';

interface LayeredParallaxProps {
  children: ReactNode;
  speed?: number;
  depth?: 'background' | 'midground' | 'foreground';
  className?: string;
  fadeIn?: boolean;
  scale?: boolean;
}

/**
 * LayeredParallax component for creating cinematic depth effects
 * - background: moves slowest (0.3x speed)
 * - midground: moves at normal speed (0.6x speed) 
 * - foreground: moves fastest (1x speed)
 */
export function LayeredParallax({ 
  children, 
  speed, 
  depth = 'midground',
  className = '',
  fadeIn = true,
  scale = false
}: LayeredParallaxProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  // Define depth-based speeds for cinematic camera effect
  const depthSpeeds = {
    background: 0.3,  // Slowest - creates distance
    midground: 0.6,   // Medium - main content layer
    foreground: 1.0   // Fastest - closest to camera
  };

  const parallaxSpeed = speed ?? depthSpeeds[depth];

  useEffect(() => {
    if (!elementRef.current) return;

    const element = elementRef.current;

    // Cinematic parallax with subtle motion
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5, // Smooth, slow scrubbing for premium feel
        invalidateOnRefresh: true
      }
    });

    // Parallax movement - subtle y translation
    tl.fromTo(
      element,
      {
        y: 100 * parallaxSpeed,
        ...(fadeIn && { opacity: 0.4 }),
        ...(scale && { scale: 0.95 })
      },
      {
        y: -100 * parallaxSpeed,
        ...(fadeIn && { opacity: 1 }),
        ...(scale && { scale: 1 }),
        ease: 'none'
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === element) {
          trigger.kill();
        }
      });
    };
  }, [parallaxSpeed, fadeIn, scale]);

  return (
    <div 
      ref={elementRef} 
      className={`will-change-transform ${className}`}
      style={{ 
        transform: 'translateZ(0)', // Hardware acceleration
        backfaceVisibility: 'hidden'
      }}
    >
      {children}
    </div>
  );
}
