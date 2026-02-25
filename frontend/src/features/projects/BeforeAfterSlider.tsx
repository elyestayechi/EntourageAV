import { useState, useRef, useEffect, useCallback } from 'react';
import { gsap } from '../../shared/lib/gsap-init';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  className?: string;
}

export function BeforeAfterSlider({ beforeImage, afterImage, className = '' }: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const isDraggingRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sliderRef.current) {
      gsap.fromTo(
        sliderRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8, delay: 0.5 }
      );
    }
  }, []);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, percentage)));
  }, []);

  // ── Mouse handlers ──
  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    handleMove(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDraggingRef.current) handleMove(e.clientX);
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  // ── Touch handlers — prevent page scroll while dragging horizontally ──
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const isHorizontalDrag = useRef<boolean | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touchStartX.current = t.clientX;
    touchStartY.current = t.clientY;
    isHorizontalDrag.current = null;
    isDraggingRef.current = true;
  };

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDraggingRef.current) return;
    const t = e.touches[0];

    // Determine drag direction on first move
    if (isHorizontalDrag.current === null) {
      const dx = Math.abs(t.clientX - touchStartX.current);
      const dy = Math.abs(t.clientY - touchStartY.current);
      isHorizontalDrag.current = dx > dy;
    }

    if (isHorizontalDrag.current) {
      // Horizontal drag → move slider, lock scroll
      e.preventDefault();
      handleMove(t.clientX);
    }
    // Vertical drag → let the page scroll naturally (don't call preventDefault)
  }, [handleMove]);

  const handleTouchEnd = () => {
    isDraggingRef.current = false;
    isHorizontalDrag.current = null;
  };

  // Attach touchmove as non-React listener so we can call preventDefault
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener('touchmove', handleTouchMove, { passive: false });
    return () => el.removeEventListener('touchmove', handleTouchMove);
  }, [handleTouchMove]);

  useEffect(() => {
    const handleGlobalMouseUp = () => { isDraggingRef.current = false; };
    window.addEventListener('mouseup', handleGlobalMouseUp);
    return () => window.removeEventListener('mouseup', handleGlobalMouseUp);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden cursor-ew-resize select-none frame-chamfered ${className}`}
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* After Image (background) */}
      <div className="w-full h-full">
        <img
          src={afterImage}
          alt="Après rénovation"
          className="w-full h-full object-cover"
          draggable={false}
        />
        <div 
          className="absolute top-4 sm:top-6 left-4 sm:left-6 px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-bold uppercase tracking-wider text-white"
          style={{
            background: 'rgba(42, 42, 42, 0.85)',
            boxShadow: '0 4px 16px 0 rgba(0, 0, 0, 0.5)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            clipPath: 'polygon(0.5rem 0, calc(100% - 0.5rem) 0, 100% 0.5rem, 100% calc(100% - 0.5rem), calc(100% - 0.5rem) 100%, 0.5rem 100%, 0 calc(100% - 0.5rem), 0 0.5rem)',
          }}
        >
          Après
        </div>
      </div>

      {/* Before Image (clipped overlay) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <img
          src={beforeImage}
          alt="Avant rénovation"
          className="w-full h-full object-cover"
          draggable={false}
        />
        <div 
          className="absolute top-4 sm:top-6 right-4 sm:right-6 px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-bold uppercase tracking-wider text-white"
          style={{
            background: 'rgba(74, 74, 74, 0.85)',
            boxShadow: '0 4px 16px 0 rgba(0, 0, 0, 0.5)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            clipPath: 'polygon(0.5rem 0, calc(100% - 0.5rem) 0, 100% 0.5rem, 100% calc(100% - 0.5rem), calc(100% - 0.5rem) 100%, 0.5rem 100%, 0 calc(100% - 0.5rem), 0 0.5rem)',
          }}
        >
          Avant
        </div>
      </div>

      {/* Slider Line and Handle */}
      <div
        ref={sliderRef}
        className="absolute top-0 bottom-0 w-1 bg-white/90 shadow-lg cursor-ew-resize"
        style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
      >
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-[#2A2A2A] bg-white shadow-lg"
          style={{ border: '2px solid rgba(74, 74, 74, 0.3)' }}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 sm:w-4 sm:h-4 absolute left-2" style={{ transform: 'rotate(180deg)' }}>
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
          </svg>
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 sm:w-4 sm:h-4 absolute right-2">
            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
          </svg>
        </div>
      </div>
    </div>
  );
}