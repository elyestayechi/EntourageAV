import { useState, useRef, useEffect } from 'react';
import { gsap } from '../../shared/lib/gsap-init';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  className?: string;
}

export function BeforeAfterSlider({ beforeImage, afterImage, className = '' }: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate slider on mount
    if (sliderRef.current) {
      gsap.fromTo(
        sliderRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8, delay: 0.5 }
      );
    }
  }, []);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    
    setSliderPosition(Math.max(0, Math.min(100, percentage)));
  };

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false);
    window.addEventListener('mouseup', handleGlobalMouseUp);
    return () => window.removeEventListener('mouseup', handleGlobalMouseUp);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden cursor-ew-resize select-none frame-chamfered ${className}`}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleMouseUp}
    >
      {/* After Image (background) */}
      <div className="w-full h-full">
        <img
          src={afterImage}
          alt="After renovation"
          className="w-full h-full object-cover"
          draggable={false}
        />
        {/* After Label - Glassmorphism */}
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
          alt="Before renovation"
          className="w-full h-full object-cover"
          draggable={false}
        />
        {/* Before Label - Simplified */}
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
        style={{ left: `${sliderPosition}%` }}
        onMouseDown={handleMouseDown}
        onTouchStart={() => setIsDragging(true)}
      >
        {/* Handle Circle - Simplified */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-[#2A2A2A] bg-white shadow-lg"
          style={{
            border: '2px solid rgba(74, 74, 74, 0.3)',
          }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-3 h-3 sm:w-4 sm:h-4 absolute left-2"
            style={{ transform: 'rotate(180deg)' }}
          >
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
          </svg>
          
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-3 h-3 sm:w-4 sm:h-4 absolute right-2"
          >
            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
          </svg>
        </div>
      </div>
    </div>
  );
}