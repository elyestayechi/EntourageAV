import { useEffect, useRef } from 'react';
import { gsap } from '../lib/gsap-init';

interface StorytellingTransitionProps {
  /** The chapter theme color */
  themeColor: 'warm' | 'premium' | 'modern' | 'luxury';
  /** Chapter number */
  chapter: number;
  /** Chapter title */
  title: string;
  /** Optional subtitle */
  subtitle?: string;
  /** Dark variant for seamless flow with dark sections */
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
  const numberRef = useRef<HTMLDivElement>(null);

  const colorMap = {
    warm: 'var(--color-navy-sky)',
    premium: 'var(--color-navy-blue)',
    modern: 'var(--color-navy-ocean)',
    luxury: 'var(--color-navy-midnight)'
  };

  const accentColor = colorMap[themeColor];

  useEffect(() => {
    if (!containerRef.current || !numberRef.current) return;

    const ctx = gsap.context(() => {
      // Number fade in and scale
      gsap.fromTo(
        numberRef.current,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'back.out(1.5)',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative py-16 md:py-24 overflow-hidden"
      style={{
        background: darkVariant 
          ? '#1A1A1A' 
          : `linear-gradient(180deg, transparent 0%, ${accentColor}08 50%, transparent 100%)`,
      }}
    >
      {/* Chapter number - large and dramatic */}
      <div className="container mx-auto px-8 relative z-10">
        <div className="flex items-center gap-8 md:gap-16">
          {/* Huge chapter number */}
          <div
            ref={numberRef}
            className="text-[120px] md:text-[200px] lg:text-[280px] font-bold leading-none opacity-10"
            style={{ color: darkVariant ? '#ffffff' : accentColor }}
          >
            {String(chapter).padStart(2, '0')}
          </div>

          {/* Title */}
          <div className="flex-1">
            <h3
              className="text-2xl md:text-4xl lg:text-5xl font-bold"
              style={{ color: darkVariant ? '#ffffff' : accentColor }}
            >
              {title}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}