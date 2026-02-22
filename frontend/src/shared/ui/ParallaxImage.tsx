import { useEffect, useRef } from 'react';
import { gsap } from '../lib/gsap-init';

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  speed?: number;
  scale?: number;
  shapeVariant?: 'dent-left' | 'dent-right' | 'corner-cut' | 'organic-blob' | 'trapezoid' | 'diagonal-bottom-left' | 'diagonal-top-right' | 'diagonal-bottom-right' | 'diagonal-top-left';
}

export function ParallaxImage({ 
  src, 
  alt, 
  className = '', 
  speed = 0.5,
  scale = 1.2,
  shapeVariant = 'dent-left'
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  // Define different organic shape clip-paths matching the screenshot
  const shapeStyles: Record<string, string> = {
    'diagonal-bottom-left': `polygon(
      0 0,
      100% 0,
      100% 100%,
      25% 100%,
      0 75%
    )`,
    'diagonal-top-right': `polygon(
      0 0,
      75% 0,
      100% 25%,
      100% 100%,
      0 100%
    )`,
    'diagonal-bottom-right': `polygon(
      0 0,
      100% 0,
      100% 75%,
      75% 100%,
      0 100%
    )`,
    'diagonal-top-left': `polygon(
      25% 0,
      100% 0,
      100% 100%,
      0 100%,
      0 25%
    )`,
    'dent-left': `polygon(
      0 0.5rem,
      0.5rem 0,
      calc(100% - 0.5rem) 0,
      100% 0.5rem,
      100% calc(100% - 0.5rem),
      calc(100% - 0.5rem) 100%,
      0.5rem 100%,
      0 calc(100% - 0.5rem),
      0% 65%,
      4% 60%,
      4% 40%,
      0% 35%
    )`,
    'dent-right': `polygon(
      0.5rem 0,
      calc(100% - 0.5rem) 0,
      100% 0.5rem,
      100% 35%,
      96% 40%,
      96% 60%,
      100% 65%,
      100% calc(100% - 0.5rem),
      calc(100% - 0.5rem) 100%,
      0.5rem 100%,
      0 calc(100% - 0.5rem),
      0 0.5rem
    )`,
    'corner-cut': `polygon(
      0.5rem 0,
      calc(100% - 2rem) 0,
      100% 2rem,
      100% calc(100% - 0.5rem),
      calc(100% - 0.5rem) 100%,
      2rem 100%,
      0 calc(100% - 2rem),
      0 0.5rem
    )`,
    'organic-blob': `polygon(
      0.5rem 0,
      calc(100% - 0.5rem) 0,
      100% 0.5rem,
      100% 30%,
      95% 35%,
      98% 45%,
      100% 55%,
      100% calc(100% - 0.5rem),
      calc(100% - 0.5rem) 100%,
      20% 100%,
      0 calc(100% - 2rem),
      0 0.5rem
    )`,
    'trapezoid': `polygon(
      1rem 0,
      calc(100% - 0.5rem) 0,
      100% 0.5rem,
      100% calc(100% - 0.5rem),
      calc(100% - 1rem) 100%,
      0.5rem 100%,
      0 calc(100% - 0.5rem),
      0 0.5rem
    )`
  };

  useEffect(() => {
    if (!containerRef.current || !imageRef.current) return;

    const ctx = gsap.context(() => {
      // Scale animation
      gsap.fromTo(
        imageRef.current,
        { 
          scale: scale,
        },
        {
          scale: 1,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        }
      );

      // Parallax movement
      gsap.to(imageRef.current, {
        yPercent: -30 * speed,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
    });

    return () => ctx.revert();
  }, [speed, scale]);

  return (
    <div 
      ref={containerRef} 
      className={`relative overflow-hidden ${className}`}
      style={{
        clipPath: shapeStyles[shapeVariant]
      }}
    >
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        style={{ 
          transform: `scale(${scale})`,
          willChange: 'transform'
        }}
      />
    </div>
  );
}