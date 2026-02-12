import { useRef, useEffect } from 'react';
import { gsap } from '../lib/gsap-init';

interface SectionHeaderProps {
  number: string;
  title: string;
  description: string;
  align?: 'left' | 'center';
}

export function SectionHeader({ number, title, description, align = 'left' }: SectionHeaderProps) {
  const numberRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: numberRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      // Smoother, faster animations
      tl.fromTo(
        numberRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }
      );

      tl.fromTo(
        titleRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out' },
        '-=0.3'
      );

      tl.fromTo(
        descriptionRef.current,
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' },
        '-=0.4'
      );
    });

    return () => ctx.revert();
  }, []);

  const alignClass = align === 'center' ? 'text-center items-center' : 'text-left items-start';

  return (
    <div className={`flex flex-col ${alignClass} mb-8 md:mb-12`}>
      {/* Compact Number */}
      <div
        ref={numberRef}
        className="inline-flex px-4 py-2 mb-4"
        style={{
          background: 'rgba(255, 255, 255, 0.4)',
          backdropFilter: 'blur(40px) saturate(180%)',
          WebkitBackdropFilter: 'blur(40px) saturate(180%)',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          clipPath: 'polygon(12px 0, calc(100% - 12px) 0, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px), 0 12px)',
        }}
      >
        <span
          className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter"
          style={{
            background: 'linear-gradient(135deg, var(--color-gold) 0%, var(--color-amber-deep) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: 'drop-shadow(0 1px 8px rgba(212, 175, 119, 0.3))',
          }}
        >
          {number}
        </span>
      </div>

      {/* Title - Smaller */}
      <h2
        ref={titleRef}
        className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-3 md:mb-4"
        style={{
          color: '#2A2522',
        }}
      >
        {title}
      </h2>

      {/* Description - More compact */}
      <div 
        className="inline-flex px-6 py-3 max-w-2xl"
        style={{
          background: 'rgba(255, 255, 255, 0.3)',
          backdropFilter: 'blur(40px) saturate(180%)',
          WebkitBackdropFilter: 'blur(40px) saturate(180%)',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
          border: '1px solid rgba(255, 255, 255, 0.25)',
          clipPath: 'polygon(8px 0, calc(100% - 8px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px), 0 8px)',
        }}
      >
        <p
          ref={descriptionRef}
          className="text-base sm:text-lg leading-relaxed text-[#5A5A5A]"
        >
          {description}
        </p>
      </div>
    </div>
  );
}
