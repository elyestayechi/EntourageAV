import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  intensity?: 'low' | 'medium' | 'high';
}

// Simplified version - no backdrop blur for export compatibility
export function GlassCard({ children, className = '' }: GlassCardProps) {
  return (
    <div className={`bg-white/10 rounded-lg border border-white/10 ${className}`}>
      {children}
    </div>
  );
}
