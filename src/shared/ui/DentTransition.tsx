import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../lib/gsap-init';

interface DentTransitionProps {
  fromColor: string; // The color of the section above (e.g., '#F6F2E8' for beige)
  toColor: string;   // The color of the section below (e.g., '#000000' for black)
}

export function DentTransition({ fromColor, toColor }: DentTransitionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Animate the trapezoid dent morphing - inner edges stay fixed, outer edges move
      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            
            // Calculate the morph progression:
            // Inner edges (25rem) stay FIXED at 2%
            // Outer edges (35rem) MOVE:
            // 0 = outer edges high (-4% = dent pointing DOWN into black)
            // 0.5 = straight (0% = same as inner, no dent)
            // 1 = outer edges low (+2% = dent pointing UP into beige)
            
            let dentDepth;
            if (progress < 0.5) {
              // From high to straight (0 to 0.5)
              const subProgress = progress / 0.5;
              dentDepth = -4 + (subProgress * 4); // -4% to 0%
            } else {
              // From straight to low (0.5 to 1)
              const subProgress = (progress - 0.5) / 0.5;
              dentDepth = subProgress * 2; // 0% to 2%
            }
            
            if (sectionRef.current) {
              // Single layer with morphing dent at the top
              // Inner edges FIXED at 2%, outer edges MOVE
              sectionRef.current.style.clipPath = `polygon(
                0 calc(2% + ${dentDepth}%),
                calc(50% - 35rem) calc(2% + ${dentDepth}%),
                calc(50% - 25rem) 2%,
                calc(50% + 25rem) 2%,
                calc(50% + 35rem) calc(2% + ${dentDepth}%),
                100% calc(2% + ${dentDepth}%),
                100% 100%,
                0 100%
              )`;
            }
          },
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative h-[40vh] pointer-events-none -mt-12"
      style={{
        backgroundColor: toColor,
        clipPath: `polygon(
          0 -2%,
          calc(50% - 35rem) -2%,
          calc(50% - 25rem) 2%,
          calc(50% + 25rem) 2%,
          calc(50% + 35rem) -2%,
          100% -2%,
          100% 100%,
          0 100%
        )`
      }}
    />
  );
}