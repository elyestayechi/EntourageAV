import { useRef, useEffect, ReactNode } from 'react';
import { gsap } from '../lib/gsap-init';

interface AnimatedTitleProps {
  children: ReactNode;
  variant?: 'split-words' | 'split-chars' | 'slide-up' | 'fade-in' | 'scale-in' | 'reveal';
  className?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
  once?: boolean;
}

export function AnimatedTitle({
  children,
  variant = 'split-words',
  className = '',
  delay = 0,
  stagger = 0.05,
  duration = 0.8,
  once = true,
}: AnimatedTitleProps) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const text = element.textContent || '';
    
    const ctx = gsap.context(() => {
      switch (variant) {
        case 'split-words':
          animateSplitWords(element, text, { delay, stagger, duration, once });
          break;
        case 'split-chars':
          animateSplitChars(element, text, { delay, stagger, duration, once });
          break;
        case 'slide-up':
          animateSlideUp(element, { delay, duration, once });
          break;
        case 'fade-in':
          animateFadeIn(element, { delay, duration, once });
          break;
        case 'scale-in':
          animateScaleIn(element, { delay, duration, once });
          break;
        case 'reveal':
          animateReveal(element, { delay, duration, once });
          break;
      }
    }, ref);

    return () => ctx.revert();
  }, [variant, delay, stagger, duration, once]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

// Animation variants

function animateSplitWords(
  element: HTMLElement,
  text: string,
  options: { delay: number; stagger: number; duration: number; once: boolean }
) {
  const words = text.split(' ');
  element.innerHTML = words
    .map(
      (word, i) =>
        `<span class="word-wrapper" style="display: inline-block; overflow: hidden;">
          <span class="word" style="display: inline-block;">${word}${i < words.length - 1 ? '&nbsp;' : ''}</span>
        </span>`
    )
    .join('');

  const wordElements = element.querySelectorAll('.word');

  gsap.set(wordElements, { y: '100%', opacity: 0 });

  gsap.to(wordElements, {
    y: '0%',
    opacity: 1,
    duration: options.duration,
    delay: options.delay,
    stagger: options.stagger,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: element,
      start: 'top 85%',
      toggleActions: options.once ? 'play none none none' : 'play none none reverse',
    },
  });
}

function animateSplitChars(
  element: HTMLElement,
  text: string,
  options: { delay: number; stagger: number; duration: number; once: boolean }
) {
  const chars = text.split('');
  element.innerHTML = chars
    .map(
      (char) =>
        `<span class="char-wrapper" style="display: inline-block; overflow: hidden;">
          <span class="char" style="display: inline-block;">${char === ' ' ? '&nbsp;' : char}</span>
        </span>`
    )
    .join('');

  const charElements = element.querySelectorAll('.char');

  gsap.set(charElements, { y: '120%', rotation: 15 });

  gsap.to(charElements, {
    y: '0%',
    rotation: 0,
    duration: options.duration,
    delay: options.delay,
    stagger: options.stagger,
    ease: 'back.out(1.7)',
    scrollTrigger: {
      trigger: element,
      start: 'top 85%',
      toggleActions: options.once ? 'play none none none' : 'play none none reverse',
    },
  });
}

function animateSlideUp(
  element: HTMLElement,
  options: { delay: number; duration: number; once: boolean }
) {
  gsap.fromTo(
    element,
    {
      y: 100,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      duration: options.duration,
      delay: options.delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        toggleActions: options.once ? 'play none none none' : 'play none none reverse',
      },
    }
  );
}

function animateFadeIn(
  element: HTMLElement,
  options: { delay: number; duration: number; once: boolean }
) {
  gsap.fromTo(
    element,
    {
      opacity: 0,
    },
    {
      opacity: 1,
      duration: options.duration,
      delay: options.delay,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        toggleActions: options.once ? 'play none none none' : 'play none none reverse',
      },
    }
  );
}

function animateScaleIn(
  element: HTMLElement,
  options: { delay: number; duration: number; once: boolean }
) {
  gsap.fromTo(
    element,
    {
      scale: 0.8,
      opacity: 0,
    },
    {
      scale: 1,
      opacity: 1,
      duration: options.duration,
      delay: options.delay,
      ease: 'back.out(1.7)',
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        toggleActions: options.once ? 'play none none none' : 'play none none reverse',
      },
    }
  );
}

function animateReveal(
  element: HTMLElement,
  options: { delay: number; duration: number; once: boolean }
) {
  // Create reveal overlay
  const overlay = document.createElement('div');
  overlay.style.cssText = `
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--color-navy-sky, #2A2522);
    z-index: 1;
  `;
  
  element.style.position = 'relative';
  element.style.overflow = 'hidden';
  element.appendChild(overlay);

  gsap.set(element.childNodes[0], { opacity: 0 });

  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: element,
      start: 'top 85%',
      toggleActions: options.once ? 'play none none none' : 'play none none reverse',
    },
  });

  timeline
    .to(element.childNodes[0], {
      opacity: 1,
      duration: 0.01,
      delay: options.delay,
    })
    .to(overlay, {
      scaleX: 0,
      transformOrigin: 'right',
      duration: options.duration,
      ease: 'power3.inOut',
    });
}

// Preset title styles
export function HeroTitle({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <AnimatedTitle variant="split-words" stagger={0.08} duration={1} className={className}>
      {children}
    </AnimatedTitle>
  );
}

export function SectionTitle({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <AnimatedTitle variant="slide-up" duration={0.8} className={className}>
      {children}
    </AnimatedTitle>
  );
}

export function FancyTitle({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <AnimatedTitle variant="split-chars" stagger={0.03} duration={1.2} className={className}>
      {children}
    </AnimatedTitle>
  );
}

export function RevealTitle({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <AnimatedTitle variant="reveal" duration={1.2} className={className}>
      {children}
    </AnimatedTitle>
  );
}