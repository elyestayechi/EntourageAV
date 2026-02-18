import { useEffect, useRef, RefObject } from 'react';
import { gsap } from './gsap-init';

/**
 * Fade in animation on scroll
 */
export function useFadeIn(trigger?: RefObject<HTMLElement>, options?: {
  delay?: number;
  duration?: number;
  y?: number;
  stagger?: number;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        element,
        {
          opacity: 0,
          y: options?.y ?? 60,
        },
        {
          opacity: 1,
          y: 0,
          duration: options?.duration ?? 1,
          delay: options?.delay ?? 0,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: trigger?.current || element,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, [trigger, options?.delay, options?.duration, options?.y]);

  return ref;
}

/**
 * Stagger animation for children elements
 */
export function useStaggerIn(selector: string = '.stagger-item', options?: {
  delay?: number;
  duration?: number;
  stagger?: number;
  y?: number;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const items = element.querySelectorAll(selector);
    if (items.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        items,
        {
          opacity: 0,
          y: options?.y ?? 40,
        },
        {
          opacity: 1,
          y: 0,
          duration: options?.duration ?? 0.8,
          delay: options?.delay ?? 0,
          stagger: options?.stagger ?? 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, [selector, options?.delay, options?.duration, options?.stagger, options?.y]);

  return ref;
}

/**
 * Parallax effect - element moves slower/faster than scroll
 */
export function useParallax(speed: number = 0.5) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const ctx = gsap.context(() => {
      gsap.to(element, {
        yPercent: 100 * speed,
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
  }, [speed]);

  return ref;
}

/**
 * Scale on scroll animation
 */
export function useScaleIn(options?: {
  scale?: number;
  duration?: number;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        element,
        {
          scale: options?.scale ?? 0.8,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          duration: options?.duration ?? 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, [options?.scale, options?.duration]);

  return ref;
}

/**
 * Slide in from direction
 */
export function useSlideIn(direction: 'left' | 'right' | 'up' | 'down' = 'up', options?: {
  distance?: number;
  duration?: number;
  delay?: number;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const distance = options?.distance ?? 100;
    const fromVars: gsap.TweenVars = { opacity: 0 };
    
    switch (direction) {
      case 'left':
        fromVars.x = -distance;
        break;
      case 'right':
        fromVars.x = distance;
        break;
      case 'up':
        fromVars.y = distance;
        break;
      case 'down':
        fromVars.y = -distance;
        break;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        element,
        fromVars,
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: options?.duration ?? 1,
          delay: options?.delay ?? 0,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, [direction, options?.distance, options?.duration, options?.delay]);

  return ref;
}

/**
 * Rotate in animation
 */
export function useRotateIn(options?: {
  rotation?: number;
  duration?: number;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        element,
        {
          rotation: options?.rotation ?? 180,
          opacity: 0,
          scale: 0.5,
        },
        {
          rotation: 0,
          opacity: 1,
          scale: 1,
          duration: options?.duration ?? 1.2,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: element,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, [options?.rotation, options?.duration]);

  return ref;
}

/**
 * Counter animation (numbers counting up)
 */
export function useCountUp(target: number, options?: {
  duration?: number;
  decimals?: number;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const obj = { value: 0 };
    const ctx = gsap.context(() => {
      gsap.to(obj, {
        value: target,
        duration: options?.duration ?? 2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        onUpdate: () => {
          if (element) {
            element.textContent = obj.value.toFixed(options?.decimals ?? 0);
          }
        },
      });
    }, ref);

    return () => ctx.revert();
  }, [target, options?.duration, options?.decimals]);

  return ref;
}

/**
 * Split text animation (reveals text word by word or character by character)
 */
export function useSplitText(type: 'words' | 'chars' = 'words', options?: {
  stagger?: number;
  duration?: number;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const text = element.textContent || '';
    const items = type === 'words' ? text.split(' ') : text.split('');
    
    element.innerHTML = items
      .map((item, i) => `<span class="split-item" style="display: inline-block; opacity: 0;">${item}${type === 'words' && i < items.length - 1 ? '&nbsp;' : ''}</span>`)
      .join('');

    const splitItems = element.querySelectorAll('.split-item');

    const ctx = gsap.context(() => {
      gsap.to(splitItems, {
        opacity: 1,
        y: 0,
        duration: options?.duration ?? 0.8,
        stagger: options?.stagger ?? 0.03,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });

      gsap.set(splitItems, { y: 20 });
    }, ref);

    return () => ctx.revert();
  }, [type, options?.stagger, options?.duration]);

  return ref;
}

/**
 * Magnetic effect - element follows cursor
 */
export function useMagnetic(strength: number = 0.3) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;

      gsap.to(element, {
        x: deltaX,
        y: deltaY,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.3)',
      });
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength]);

  return ref;
}

/**
 * Hover lift effect
 */
export function useHoverLift(options?: {
  y?: number;
  scale?: number;
  duration?: number;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseEnter = () => {
      gsap.to(element, {
        y: options?.y ?? -10,
        scale: options?.scale ?? 1.02,
        duration: options?.duration ?? 0.3,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(element, {
        y: 0,
        scale: 1,
        duration: options?.duration ?? 0.3,
        ease: 'power2.out',
      });
    };

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [options?.y, options?.scale, options?.duration]);

  return ref;
}