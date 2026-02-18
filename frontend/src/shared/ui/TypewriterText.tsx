import { useEffect, useState } from 'react';

interface TypewriterTextProps {
  text: string;
  speed?: number;
  className?: string;
  delay?: number;
  startTyping?: boolean;
}

export function TypewriterText({ text, speed = 30, className = '', delay = 0, startTyping = true }: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setDisplayedText('');
    setCurrentIndex(0);
  }, [text]);

  useEffect(() => {
    if (!startTyping) return;
    
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, currentIndex === 0 ? delay : speed);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed, delay, startTyping]);

  return (
    <span className={className}>
      {displayedText}
      {currentIndex < text.length && startTyping && <span className="animate-pulse">|</span>}
    </span>
  );
}