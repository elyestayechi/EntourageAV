import { useEffect, useRef } from 'react';
import { gsap } from '../lib/gsap-init';

interface SlotMachineCounterProps {
  number: string; // e.g., "01", "02", "03"
  isActive: boolean;
}

export function SlotMachineCounter({ number, isActive }: SlotMachineCounterProps) {
  const cylinderRef = useRef<HTMLDivElement>(null);
  const previousNumberRef = useRef<string>(number);

  useEffect(() => {
    if (!cylinderRef.current || !isActive) return;

    
    const onesDigit = parseInt(number[1]); // Second digit (1, 2, 3, etc.)
    

    // Calculate rotation based on the ones digit
    // Each number is 36 degrees apart (360/10 = 36 degrees)
    const targetRotation = -onesDigit * 36;

    // Animate the cylinder rotation
    gsap.to(cylinderRef.current, {
      rotateX: targetRotation,
      duration: 0.8,
      ease: 'power3.out',
    });

    previousNumberRef.current = number;
  }, [number, isActive]);

  const tensDigit = number[0];
  const onesDigit = number[1];

  // Generate all digits for the cylinder (0-9)
  const allDigits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

  return (
    <div className="flex items-center gap-1" style={{ perspective: '800px' }}>
      {/* Tens digit - static */}
      <div
        className="text-4xl md:text-5xl lg:text-6xl font-bold"
        style={{ 
          color: 'var(--color-navy-sky)',
          fontVariantNumeric: 'tabular-nums'
        }}
      >
        {tensDigit}
      </div>

      {/* Ones digit - rotating cylinder */}
      <div 
        className="relative overflow-hidden"
        style={{ 
          width: '3em',
          height: '3.5em',
          perspective: '800px'
        }}
      >
        <div
          ref={cylinderRef}
          className="absolute"
          style={{
            transformStyle: 'preserve-3d',
            width: '100%',
            height: '100%',
            transform: `rotateX(${-parseInt(onesDigit) * 36}deg)`,
          }}
        >
          {allDigits.map((digit, index) => {
            const rotationY = index * 36; // 36 degrees per digit
            const translateZ = 100; // Radius of the cylinder - increased for better visibility

            return (
              <div
                key={digit}
                className="absolute text-4xl md:text-5xl lg:text-6xl font-bold"
                style={{
                  color: 'var(--color-navy-sky)',
                  fontVariantNumeric: 'tabular-nums',
                  transform: `rotateX(${rotationY}deg) translateZ(${translateZ}px)`,
                  transformStyle: 'preserve-3d',
                  backfaceVisibility: 'hidden',
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {digit}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}