/**
 * Grid Annotations Component
 * Swiss Design style grid markers and annotations
 */

interface GridAnnotationsProps {
  /** Section identifier (e.g., "001 / HERO", "002 / SERVICES") */
  sectionId: string;
  /** Optional label for the grid system */
  gridLabel?: string;
  /** Show measurement markers */
  showMeasurements?: boolean;
}

export function GridAnnotations({ 
  sectionId, 
  gridLabel = "[12 COL GRID]",
  showMeasurements = true 
}: GridAnnotationsProps) {
  return (
    <>
      {/* Top Left - Grid System Label */}
      <div 
        className="absolute top-4 left-4 text-[10px] font-mono uppercase tracking-[0.2em] opacity-30 pointer-events-none z-50"
        style={{ color: 'var(--color-navy-blue)' }}
      >
        {gridLabel}
      </div>

      {/* Top Right - Section ID */}
      <div 
        className="absolute top-4 right-4 text-[10px] font-mono uppercase tracking-[0.2em] opacity-30 pointer-events-none z-50"
        style={{ color: 'var(--color-navy-blue)' }}
      >
        {sectionId}
      </div>

      {/* Bottom Left - Copyright */}
      <div 
        className="absolute bottom-4 left-4 text-[10px] font-mono uppercase tracking-[0.2em] opacity-30 pointer-events-none z-50"
        style={{ color: 'var(--color-navy-blue)' }}
      >
        ENTOURAGE AV © 2025
      </div>

      {/* Bottom Right - Scroll Indicator */}
      <div 
        className="absolute bottom-4 right-4 text-[10px] font-mono uppercase tracking-[0.2em] opacity-30 pointer-events-none z-50 flex items-center gap-2"
        style={{ color: 'var(--color-navy-blue)' }}
      >
        <span>SCROLL</span>
        <span className="inline-block animate-bounce">↓</span>
      </div>

      {/* Measurement Markers */}
      {showMeasurements && (
        <>
          {/* Top measurement line */}
          <div className="absolute top-12 left-1/2 transform -translate-x-1/2 flex items-center gap-2 opacity-20 pointer-events-none">
            <div className="w-12 h-px" style={{ background: 'var(--color-navy-blue)' }} />
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--color-navy-blue)' }} />
            <div className="w-12 h-px" style={{ background: 'var(--color-navy-blue)' }} />
          </div>

          {/* Left vertical measurement */}
          <div className="absolute left-12 top-1/2 transform -translate-y-1/2 flex flex-col items-center gap-2 opacity-20 pointer-events-none">
            <div className="h-12 w-px" style={{ background: 'var(--color-navy-blue)' }} />
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--color-navy-blue)' }} />
            <div className="h-12 w-px" style={{ background: 'var(--color-navy-blue)' }} />
          </div>
        </>
      )}

      {/* Corner Brackets */}
      <div 
        className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 opacity-15 pointer-events-none"
        style={{ borderColor: 'var(--color-navy-blue)' }}
      />
      <div 
        className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 opacity-15 pointer-events-none"
        style={{ borderColor: 'var(--color-navy-blue)' }}
      />
    </>
  );
}
