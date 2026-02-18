import { useRef, useEffect, ReactNode, CSSProperties } from 'react';
import { gsap } from '../lib/gsap-init';

interface ParallaxProps {
  children: ReactNode;
  speed?: number;
  direction?: 'vertical' | 'horizontal';
  className?: string;
  style?: CSSProperties;
}

/**
 * Basic parallax effect - moves at different speed than scroll
 */
export function Parallax({ 
  children, 
  speed = 0.5, 
  direction = 'vertical',
  className = '',
  style = {}
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const ctx = gsap.context(() => {
      const property = direction === 'vertical' ? 'yPercent' : 'xPercent';
      
      gsap.to(element, {
        [property]: 100 * speed,
        ease: 'none',
        scrollTrigger: {
          trigger: element,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      });
    }, ref);

    return () => ctx.revert();
  }, [speed, direction]);

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}

/**
 * Parallax image with Ken Burns effect
 */
export function ParallaxImage({
  src,
  alt,
  speed = 0.3,
  scale = 1.2,
  className = '',
}: {
  src: string;
  alt: string;
  speed?: number;
  scale?: number;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!containerRef.current || !imageRef.current) return;

    const ctx = gsap.context(() => {
      // Parallax scroll effect
      gsap.to(imageRef.current, {
        yPercent: 100 * speed,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      });

      // Ken Burns zoom on scroll
      gsap.fromTo(
        imageRef.current,
        { scale: scale },
        {
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 2,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [speed, scale]);

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`}>
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        style={{ transformOrigin: 'center' }}
      />
    </div>
  );
}

/**
 * Multi-layer parallax effect
 */
export function ParallaxLayers({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const layers = element.querySelectorAll('[data-speed]');

    const ctx = gsap.context(() => {
      layers.forEach((layer) => {
        const speed = parseFloat((layer as HTMLElement).dataset.speed || '0');
        
        gsap.to(layer, {
          yPercent: 100 * speed,
          ease: 'none',
          scrollTrigger: {
            trigger: element,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
        });
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className={`relative ${className}`}>
      {children}
    </div>
  );
}

/**
 * Zoom parallax - zooms in/out on scroll
 */
export function ZoomParallax({
  children,
  from = 0.8,
  to = 1.2,
  className = '',
}: {
  children: ReactNode;
  from?: number;
  to?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        element,
        { scale: from },
        {
          scale: to,
          ease: 'none',
          scrollTrigger: {
            trigger: element,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 2,
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, [from, to]);

  return (
    <div ref={ref} className={className} style={{ transformOrigin: 'center' }}>
      {children}
    </div>
  );
}