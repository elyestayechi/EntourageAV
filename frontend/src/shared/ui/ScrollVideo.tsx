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

      {/* GSAP owns the pin */}
      <div ref={containerRef} className="relative h-screen w-full overflow-hidden">

        {/* Text overlay — centered, fully responsive */}
        <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center">
          <div className="text-center px-4 sm:px-6 md:px-8 w-full max-w-5xl mx-auto">
            <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-3 sm:mb-4 md:mb-6 tracking-tight uppercase leading-none">
              Notre Processus
            </h2>
            <p className="text-xs sm:text-sm md:text-base lg:text-xl text-white/70 uppercase tracking-widest">
              De la vision à la réalité
            </p>
          </div>
        </div>

        {/*
          Video fills the pinned container exactly.
          `object-cover` + `w-full h-full` ensures no letterboxing or black bars
          regardless of the video's native aspect ratio or the device's viewport.
          `object-position: center` keeps the most important area centred.
        */}
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover object-center"
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