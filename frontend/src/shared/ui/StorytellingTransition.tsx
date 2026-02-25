import { useEffect, useRef } from 'react';
import { gsap } from '../lib/gsap-init';

interface StorytellingTransitionProps {
  themeColor: 'warm' | 'premium' | 'modern' | 'luxury';
  chapter: number;
  title: string;
  subtitle?: string;
  darkVariant?: boolean;
}

export function StorytellingTransition({ 
  themeColor, 
  chapter, 
  title,
  subtitle,
  darkVariant 
}: StorytellingTransitionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const numberRef    = useRef<HTMLDivElement>(null);
  const textRef      = useRef<HTMLDivElement>(null);

  const colorMap = {
    warm:    'var(--color-navy-sky)',
    premium: 'var(--color-navy-blue)',
    modern:  'var(--color-navy-ocean)',
    luxury:  'var(--color-navy-midnight)',
  };

  const accentColor = colorMap[themeColor];

  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        numberRef.current,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1, scale: 1, duration: 1, ease: 'back.out(1.5)',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      );
      if (textRef.current) {
        gsap.fromTo(
          textRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 0.2,
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 70%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative py-12 md:py-20 overflow-hidden"
      style={{
        background: darkVariant
          ? '#1A1A1A'
          : `linear-gradient(180deg, transparent 0%, ${accentColor}08 50%, transparent 100%)`,
      }}
    >
      <div className="container mx-auto px-4 sm:px-8 relative z-10">
        <div className="flex items-center gap-4 sm:gap-8 md:gap-16">
          {/* Large chapter number */}
          <div
            ref={numberRef}
            className="text-[80px] sm:text-[120px] md:text-[180px] lg:text-[240px] font-bold leading-none flex-shrink-0"
            style={{
              color: darkVariant ? '#ffffff' : accentColor,
              opacity: 0.1,
            }}
          >
            {String(chapter).padStart(2, '0')}
          </div>

          {/* Title + subtitle */}
          <div ref={textRef} className="flex-1 min-w-0">
            <h3
              className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold leading-tight"
              style={{ color: darkVariant ? '#ffffff' : accentColor }}
            >
              {title}
            </h3>
            {subtitle && (
              <p
                className="mt-2 sm:mt-3 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl"
                style={{ color: darkVariant ? 'rgba(255,255,255,0.65)' : '#5A5A5A' }}
              >
                {subtitle}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}