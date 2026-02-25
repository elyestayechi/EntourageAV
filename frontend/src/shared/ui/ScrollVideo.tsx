import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../lib/gsap-init';
import videoSrc from '../../assets/vid.webm';
import videoSrcMp4 from '../../assets/vid.mp4';

export function ScrollVideo() {
  const sectionRef   = useRef<HTMLDivElement>(null);
  const videoRef     = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    const video     = videoRef.current;
    const section   = sectionRef.current;
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
        anticipatePin: 1,
        refreshPriority: 2,
      });

      const startScrub = () => {
        gsap.to(video, {
          currentTime: video.duration || 0,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1.5,
            refreshPriority: 2,
          },
        });

        setTimeout(() => ScrollTrigger.refresh(true), 300);
      };

      if (video.readyState >= 1) {
        startScrub();
      } else {
        video.addEventListener('loadedmetadata', startScrub, { once: true });
      }

      let resizeTimer: ReturnType<typeof setTimeout>;
      const onResize = () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => ScrollTrigger.refresh(true), 250);
      };
      window.addEventListener('resize', onResize);
      return () => window.removeEventListener('resize', onResize);
    }, sectionRef);

    return () => {
      initializedRef.current = false;
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#FAFAF9] md:bg-[#2A2A2A]"
      style={{ height: '400vh', isolation: 'isolate', overflow: 'clip' }}
    >
      {/* Noise overlay */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay" style={{ zIndex: 1 }}>
        <svg width="100%" height="100%">
          <filter id="svn">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#svn)" />
        </svg>
      </div>

      {/* Pinned viewport container */}
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden"
        style={{ height: '100vh', willChange: 'transform' }}
      >
        {/* Mobile label */}
        <div
          className="md:hidden absolute inset-x-0 top-0 z-20 px-4 pt-24 pb-6 text-center"
          style={{ background: '#FAFAF9' }}
        >
          <h2
            className="text-3xl sm:text-4xl font-bold mb-2 tracking-tight uppercase leading-none"
            style={{ color: 'var(--color-navy-sky)' }}
          >
            Notre Processus
          </h2>
          <p className="text-xs sm:text-sm uppercase tracking-widest" style={{ color: 'var(--color-base-slate)' }}>
            De la vision à la réalité
          </p>
        </div>

        {/* Desktop centred label */}
        <div className="hidden md:flex absolute inset-0 z-20 pointer-events-none items-center justify-center">
          <div className="text-center px-8 w-full max-w-5xl mx-auto">
            <h2 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-4 tracking-tight uppercase leading-none">
              Notre Processus
            </h2>
            <p className="text-base lg:text-xl text-white/70 uppercase tracking-widest">
              De la vision à la réalité
            </p>
          </div>
        </div>

        {/* Video — source tags let iOS Safari pick mp4, others get webm */}
        <video
          ref={videoRef}
          className="absolute left-0 right-0 top-1/2 -translate-y-1/2 w-full"
          style={{ zIndex: 0 }}
          muted
          playsInline
          preload="auto"
        >
          <source src={videoSrc} type="video/webm" />
          <source src={videoSrcMp4} type="video/mp4" />
        </video>

        {/* Desktop gradient */}
        <div
          className="hidden md:block absolute inset-0 bg-gradient-to-t from-[#2A2A2A] via-transparent to-[#2A2A2A]/50 pointer-events-none"
          style={{ zIndex: 10 }}
        />
      </div>
    </section>
  );
}