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
      /* Mobile: match site light bg. md+: original dark bg */
      className="relative bg-[#FAFAF9] md:bg-[#2A2A2A] overflow-hidden"
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

      {/* GSAP owns the pin */}
      <div ref={containerRef} className="relative h-screen w-full overflow-hidden">

        {/* ── Mobile only: text sits above the video frame, dark colours ── */}
        <div
          className="md:hidden absolute inset-x-0 top-30 z-20 px-4 pt-10 pb-4 text-center"
          style={{ background: '#FAFAF9' }}
        >
          <h2
            className="text-3xl sm:text-4xl font-bold mb-2 tracking-tight uppercase leading-none"
            style={{ color: 'var(--color-navy-sky)' }}
          >
            Notre Processus
          </h2>
          <p
            className="text-xs sm:text-sm uppercase tracking-widest"
            style={{ color: 'var(--color-base-slate)' }}
          >
            De la vision à la réalité
          </p>
        </div>

        {/* ── Desktop only: white text centred over the video (original) ── */}
        <div className="hidden md:flex absolute inset-0 z-20 pointer-events-none items-center justify-center">
          <div className="text-center px-6 md:px-8 w-full max-w-5xl mx-auto">
            <h2 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-4 md:mb-6 tracking-tight uppercase leading-none">
              Notre Processus
            </h2>
            <p className="text-base lg:text-xl text-white/70 uppercase tracking-widest">
              De la vision à la réalité
            </p>
          </div>
        </div>

        {/* Video — full width, vertically centred, natural aspect ratio */}
        <video
          ref={videoRef}
          className="absolute left-0 right-0 top-1/2 -translate-y-1/2 w-full"
          style={{ aspectRatio: 'auto' }}
          muted
          playsInline
          preload="auto"
          src={videoSrc}
        />

        {/* Desktop gradient overlay (original) */}
        <div className="hidden md:block absolute inset-0 bg-gradient-to-t from-[#2A2A2A] via-transparent to-[#2A2A2A]/50 pointer-events-none z-10" />
      </div>
    </section>
  );
}