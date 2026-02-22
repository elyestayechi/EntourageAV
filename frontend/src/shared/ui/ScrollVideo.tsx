import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../lib/gsap-init';
import videoSrc from '../../assets/vid.webm';

export function ScrollVideo() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    const video = videoRef.current;
    const section = sectionRef.current;
    const container = containerRef.current;

    if (!video || !section || !container) return;

    video.pause();
    video.currentTime = 0;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: 'bottom bottom',
        pin: container,
        pinSpacing: false,
        refreshPriority: 1,
      });

      const startScrub = () => {
        gsap.to(video, {
          currentTime: video.duration,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 2,
            refreshPriority: 1,
          },
        });

        requestAnimationFrame(() => ScrollTrigger.refresh());
      };

      if (video.readyState >= 1) {
        startScrub();
      } else {
        video.addEventListener('loadedmetadata', startScrub, { once: true });
      }
    }, sectionRef);

    return () => {
      initializedRef.current = false;
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#2A2A2A] overflow-hidden"
      style={{ height: '400vh' }}
    >
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay z-10">
        <svg width="100%" height="100%">
          <filter id="scrollVideoNoise">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#scrollVideoNoise)" />
        </svg>
      </div>

      <div ref={containerRef} className="h-screen w-full overflow-hidden">
        <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center px-4">
          <div className="text-center w-full max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-3 sm:mb-4 md:mb-6 tracking-tight uppercase">
              Notre Processus
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/70 uppercase tracking-widest px-4">
              De la vision à la réalité
            </p>
          </div>
        </div>

        <video
          ref={videoRef}
          className="w-full h-full object-contain md:object-cover"
          muted
          playsInline
          preload="auto"
          src={videoSrc}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#2A2A2A] via-transparent to-[#2A2A2A]/50 pointer-events-none z-10" />
      </div>
    </section>
  );
}