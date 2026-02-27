import { useEffect, useRef } from 'react';
import { gsap } from '../lib/gsap-init';

interface SlotMachineCounterProps {
  number: string;
  isActive: boolean;
}

export function SlotMachineCounter({ number, isActive }: SlotMachineCounterProps) {
  const tensRef = useRef<HTMLDivElement>(null);
  const onesRef = useRef<HTMLDivElement>(null);
  const previousNumberRef = useRef<string>(number);

  useEffect(() => {
    if (!tensRef.current || !onesRef.current || !isActive) return;

    const tensDigit = parseInt(number[0]);
    const onesDigit = parseInt(number[1]);

    gsap.to(tensRef.current, {
      rotateX: -tensDigit * 36,
      duration: 0.8,
      ease: 'power3.out',
    });

    gsap.to(onesRef.current, {
      rotateX: -onesDigit * 36,
      duration: 0.8,
      ease: 'power3.out',
    });

    previousNumberRef.current = number;
  }, [number, isActive]);

  const allDigits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

  // Only tighten the gap on mobile, leave desktop/tablet untouched
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const cylinderWidth = isMobile ? '1.6em' : '2.5em';

  const renderCylinder = (ref: React.RefObject<HTMLDivElement>, initialDigit: string) => (
    <div
      className="relative overflow-hidden"
      style={{ width: cylinderWidth, height: '3.5em', perspective: '800px' }}
    >
      <div
        ref={ref}
        className="absolute"
        style={{
          transformStyle: 'preserve-3d',
          width: '100%',
          height: '100%',
          transform: `rotateX(${-parseInt(initialDigit) * 36}deg)`,
        }}
      >
        {allDigits.map((digit, index) => (
          <div
            key={digit}
            className="absolute text-4xl md:text-5xl lg:text-6xl font-bold"
            style={{
              color: 'var(--color-navy-sky)',
              fontVariantNumeric: 'tabular-nums',
              transform: `rotateX(${index * 36}deg) translateZ(100px)`,
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
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex items-center" style={{ perspective: '800px' }}>
      {renderCylinder(tensRef, number[0])}
      {renderCylinder(onesRef, number[1])}
    </div>
  );
}