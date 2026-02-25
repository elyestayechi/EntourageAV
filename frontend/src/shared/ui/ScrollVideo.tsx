import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../lib/gsap-init';
import videoSrc from '../../assets/vid.webm';

export function ScrollVideo() {
  const sectionRef     = useRef<HTMLDivElement>(null);
  const videoRef       = useRef<HTMLVideoElement>(null);
  const containerRef   = useRef<HTMLDivElement>(null);
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
      className="relative bg-[#2A2A2A]"
      style={{ height: '400vh', isolation: 'isolate', overflow: 'clip' }}
    >
      {/* Pinned viewport container */}
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden"
        style={{ height: '100vh', willChange: 'transform' }}
      >
        {/* Video — fills full container on ALL screen sizes */}
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ zIndex: 0 }}
          muted
          playsInline
          preload="auto"
          src={videoSrc}
        />

        {/* Gradient overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: 1,
            background: 'linear-gradient(to top, rgba(42,42,42,0.7) 0%, rgba(42,42,42,0.2) 50%, rgba(42,42,42,0.5) 100%)',
          }}
        />

        {/* Noise overlay */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay" style={{ zIndex: 2 }}>
          <svg width="100%" height="100%">
            <filter id="svn">
              <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
            </filter>
            <rect width="100%" height="100%" filter="url(#svn)" />
          </svg>
        </div>

        {/* Centered label — same on mobile and desktop */}
        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
          <div className="text-center px-6 w-full max-w-5xl mx-auto">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-3 tracking-tight uppercase leading-none">
              Notre Processus
            </h2>
            <p className="text-sm sm:text-base lg:text-xl text-white/70 uppercase tracking-widest">
              De la vision à la réalité
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}