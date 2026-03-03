import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../lib/gsap-init';
import videoSrc from '../../assets/vid.webm';
import videoSrcMp4 from '../../assets/vid.mp4';

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

    const isIOS     = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isAndroid = /Android/.test(navigator.userAgent);
    const isMobile  = isIOS || isAndroid;

    if (isIOS || isAndroid) {
      document.addEventListener('touchstart', () => {
        video.play().then(() => video.pause()).catch(() => {});
      }, { once: true });
    }

    video.load();
    video.pause();
    video.currentTime = 0;

    let ctx: ReturnType<typeof gsap.context> | null = null;

    const setup = () => {
      ctx?.revert();

      ctx = gsap.context(() => {
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
          video.style.opacity = '1';

          if (isAndroid) {
            ScrollTrigger.create({
              trigger: section,
              start: 'top top',
              end: 'bottom bottom',
              scrub: false,
              refreshPriority: 2,
              onUpdate: (self) => {
                const target = self.progress * (video.duration || 0);
                const diff   = target - video.currentTime;
                if (Math.abs(diff) > 0.05) {
                  video.playbackRate = Math.min(Math.max(diff * 10, -4), 4);
                  video.play().catch(() => {});
                } else {
                  video.pause();
                }
              },
            });
          } else {
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
          }
        };

        if (video.readyState >= 2) {
          startScrub();
        } else {
          video.addEventListener('loadeddata', startScrub, { once: true });
          video.addEventListener('loadedmetadata', () => {
            if (video.readyState >= 2) startScrub();
          }, { once: true });
          setTimeout(() => {
            if (video.style.opacity !== '1') startScrub();
          }, isMobile ? 400 : 150);
        }
      }, sectionRef);
    };

    let raf1: number, raf2: number;
    let bodyObserver: ResizeObserver | null = null;
    let observerTimer: ReturnType<typeof setTimeout>;

    const initAfterPaint = () => {
      raf1 = requestAnimationFrame(() => {
        raf2 = requestAnimationFrame(() => {
          // Flush any pending style / layout calculations
          void document.body.offsetHeight;

          // Hard refresh — recalculates ALL existing ScrollTrigger offsets.
          // This must happen before we create our own pin so we read the
          // correct top offset of our section.
          ScrollTrigger.refresh(true);
          setup();

          // ── Key fix ──────────────────────────────────────────────────────
          // RecentProjects loads project data asynchronously. When its cards
          // appear, the section grows in height, pushing everything below it
          // (including our pin) down by the same amount. ScrollTrigger has
          // already calculated our pin offset — so it's now wrong.
          //
          // Solution: observe document.body height. Any time it changes
          // (async content above us loaded), re-refresh all ScrollTriggers so
          // our pin offset gets recalculated against the new page height.
          let lastBodyHeight = document.body.scrollHeight;

          bodyObserver = new ResizeObserver(() => {
            const h = document.body.scrollHeight;
            if (h !== lastBodyHeight) {
              lastBodyHeight = h;
              ScrollTrigger.refresh(true);
            }
          });

          bodyObserver.observe(document.body);

          // Stop observing after 10 s — all async data should be loaded by then
          observerTimer = setTimeout(() => {
            bodyObserver?.disconnect();
            bodyObserver = null;
          }, 10_000);
        });
      });
    };

    if (document.readyState === 'complete') {
      initAfterPaint();
    } else {
      window.addEventListener('load', initAfterPaint, { once: true });
    }

    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => ScrollTrigger.refresh(true), 250);
    };
    window.addEventListener('resize', onResize);

    return () => {
      initializedRef.current = false;
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      clearTimeout(observerTimer);
      bodyObserver?.disconnect();
      window.removeEventListener('resize', onResize);
      ctx?.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#FAFAF9]"
      style={{ height: '400vh', isolation: 'isolate', overflow: 'clip' }}
    >
      {/* Noise overlay */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none mix-blend-overlay"
        style={{ zIndex: 1 }}
      >
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
          className="md:hidden absolute inset-x-0 top-0 z-20 px-4 pt-32 pb-6 text-center bg-gradient-to-b from-[#FAFAF9] via-[#FAFAF9] to-transparent"
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

        {/* Video */}
        <video
          ref={videoRef}
          className="absolute left-0 right-0 top-1/2 -translate-y-1/2 w-full"
          style={{ zIndex: 0, opacity: 0 }}
          muted
          playsInline
          preload="auto"
        >
          <source src={videoSrc} type="video/webm" />
          <source src={videoSrcMp4} type="video/mp4" />
        </video>

        {/* Desktop gradient overlay */}
        <div
          className="hidden md:block absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none"
          style={{ zIndex: 10 }}
        />
        
        {/* Light overlay for tablets (md breakpoint) */}
        <div
          className="md:hidden absolute inset-0 bg-gradient-to-t from-[#FAFAF9] via-transparent to-[#FAFAF9]/30 pointer-events-none"
          style={{ zIndex: 10 }}
        />
      </div>
    </section>
  );
}