import { useEffect, useRef } from 'react';
import { gsap } from '../lib/gsap-init';

interface PageTransitionProps {
  children: React.ReactNode;
  pathname: string;
}

export function PageTransition({ children, pathname }: PageTransitionProps) {
  const transitionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<SVGSVGElement>(null);
  const prevPathname = useRef(pathname);

  useEffect(() => {
    // Only animate on route change, not on initial load
    if (prevPathname.current === pathname) return;

    const isInitialLoad = prevPathname.current === pathname;
    prevPathname.current = pathname;

    if (isInitialLoad) return;

    // Cinematic page transition with curved dent mask
    const tl = gsap.timeline({
      defaults: { ease: 'power3.inOut' }
    });

    // Mask wipe animation
    if (transitionRef.current && contentRef.current && maskRef.current) {
      // Set initial state
      gsap.set(transitionRef.current, {
        clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)'
      });

      // Animate the curved wipe
      tl.to(transitionRef.current, {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        duration: 0.8,
        ease: 'power2.inOut'
      });

      // Fade in content slightly after mask starts
      tl.fromTo(
        contentRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        '-=0.4'
      );
    }
  }, [pathname]);

  return (
    <div className="relative">
      {/* Curved dent transition mask overlay */}
      <div
        ref={transitionRef}
        className="fixed inset-0 bg-[#FAFAF9] z-50 pointer-events-none"
        style={{
          clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)',
          willChange: 'clip-path'
        }}
      >
        <svg
          ref={maskRef}
          className="absolute inset-0 w-full h-full opacity-5"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          {/* Organic curved shape for visual interest during transition */}
          <path
            d="M0,0 L100,0 Q90,50 100,100 L0,100 Q10,50 0,0 Z"
            fill="#2A2A2A"
          />
        </svg>
      </div>

      {/* Page content */}
      <div ref={contentRef}>
        {children}
      </div>
    </div>
  );
}
