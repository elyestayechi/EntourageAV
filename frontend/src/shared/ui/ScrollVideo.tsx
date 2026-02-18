import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../lib/gsap-init';
import videoSrc from '../../assets/vid.webm';

export function ScrollVideo() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    const container = containerRef.current;

    if (!video || !section || !container) return;

    const handleLoadedMetadata = () => {
      video.currentTime = 0;
      video.pause(); // Make sure video is paused

      // Use GSAP to animate the currentTime property
      gsap.to(video, {
        currentTime: video.duration,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom bottom',
          pin: container,
          scrub: true,
        },
      });
    };

    if (video.readyState >= 1) {
      handleLoadedMetadata();
    } else {
      video.addEventListener('loadedmetadata', handleLoadedMetadata);
    }

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#2A2A2A]"
      style={{ height: '400vh' }}
    >
      {/* Film grain texture */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay z-10">
        <svg width="100%" height="100%">
          <filter id="scrollVideoNoise">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#scrollVideoNoise)" />
        </svg>
      </div>

      <div ref={containerRef} className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Title overlay */}
        <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center">
          <div className="text-center px-6">
            <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-4 sm:mb-6 tracking-tight uppercase">
              Notre Processus
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-white/70 uppercase tracking-widest">
              De la vision à la réalité
            </p>
          </div>
        </div>

        {/* Video element */}
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          muted
          playsInline
          preload="auto"
          src={videoSrc}
        />

        {/* Gradient overlays for cinematic effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#2A2A2A] via-transparent to-[#2A2A2A]/50 pointer-events-none z-10" />
      </div>
    </section>
  );
}