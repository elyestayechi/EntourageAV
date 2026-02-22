import { useEffect, useRef, useState } from 'react';
import { gsap } from '../lib/gsap-init';

interface FlipCounterProps {
  value: number;
  className?: string;
}

export function FlipCounter({ value, className = '' }: FlipCounterProps) {
  const [currentValue, setCurrentValue] = useState(0);
  const numbersRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!numbersRef.current || currentValue === value) return;

    // Slot machine spinning animation
   
    const endValue = value;
   
    

    // Create timeline
    const tl = gsap.timeline({
      onComplete: () => {
        setCurrentValue(value);
      },
    });

    // Animate sliding up effect
    tl.to(numbersRef.current, {
      y: -(endValue * 100), // Each number is 100% height
      duration: 1.5,
      ease: 'power3.out',
    });

  }, [value, currentValue]);

  // Generate numbers array for slot machine effect (0-9 repeating, then final number)
  const generateNumbers = () => {
    const numbers = [];
    // Start from current value
    for (let i = 0; i <= 20; i++) {
      numbers.push(i % 12); // Cycle through 0-11
    }
    return numbers;
  };

  const numbers = generateNumbers();

  return (
    <div 
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={{ 
        perspective: '1000px',
      }}
    >
      {/* Container with gradient overlays for depth */}
      <div className="relative w-full h-full bg-gradient-to-b from-[#2a2a2a] via-[#1a1a1a] to-[#2a2a2a] rounded-xl shadow-2xl border border-white/5">
        {/* Top fade overlay */}
        <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-[#1a1a1a] to-transparent z-10 pointer-events-none rounded-t-xl"></div>
        
        {/* Bottom fade overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#1a1a1a] to-transparent z-10 pointer-events-none rounded-b-xl"></div>

        {/* Center highlight line */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
          <div className="w-full h-[2px] bg-[#5f4b3a]/30"></div>
        </div>

        {/* Scrolling numbers */}
        <div className="relative w-full h-full overflow-hidden">
          <div
            ref={numbersRef}
            className="absolute inset-0 flex flex-col items-center justify-start"
            style={{
              transform: `translateY(-${currentValue * 100}%)`,
            }}
          >
            {numbers.map((num, index) => (
              <div
                key={index}
                className="relative w-full h-full flex items-center justify-center flex-shrink-0"
                style={{
                  height: '100%',
                }}
              >
                <span 
                  className="font-bold text-white leading-none"
                  style={{ 
                    fontSize: 'inherit',
                    textShadow: '0 0 20px rgba(201, 169, 97, 0.5)',
                  }}
                >
                  {String(num).padStart(2, '0')}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Inner shadow for depth */}
        <div className="absolute inset-0 rounded-xl shadow-inner pointer-events-none" style={{
          boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.6), inset 0 -2px 8px rgba(0,0,0,0.6)'
        }}></div>
      </div>
    </div>
  );
}