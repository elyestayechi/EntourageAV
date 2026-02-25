import { useState, useEffect } from 'react';

interface ScrollNavItem {
  id: string;
  chapter: number;
  label: string;
}

const navItems: ScrollNavItem[] = [
  { id: 'services',    chapter: 1, label: 'Services' },
  { id: 'projets',     chapter: 2, label: 'Projets' },
  { id: 'temoignages', chapter: 3, label: 'Témoignages' },
  { id: 'savoir-faire',chapter: 4, label: 'Savoir-Faire' },
  { id: 'methode',     chapter: 5, label: 'Notre Méthode' },
  { id: 'contact',     chapter: 6, label: 'Contact' },
];

interface ScrollNavProps {
  stopAfter?: string;
}

export function ScrollNav({ stopAfter }: ScrollNavProps) {
  const [activeIndex, setActiveIndex]   = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isVisible, setIsVisible]       = useState(false);
  const [shouldHide, setShouldHide]     = useState(false);
  const [useWhiteText, setUseWhiteText] = useState(false);
  // Track which index just became active so we can animate the pulse once
  const [pulsingIndex, setPulsingIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + window.innerHeight * 0.4;

      // Show nav when user reaches services section
      const servicesEl = document.getElementById('services');
      if (servicesEl) {
        const servicesTop = servicesEl.getBoundingClientRect().top + window.scrollY;
        setIsVisible(window.scrollY >= servicesTop - window.innerHeight / 2);
      }

      // Hide after stopAfter section
      if (stopAfter) {
        const stopSection = document.getElementById(stopAfter);
        if (stopSection) {
          const stopSectionBottom = stopSection.offsetTop + stopSection.offsetHeight;
          setShouldHide(window.scrollY + window.innerHeight > stopSectionBottom);
        }
      }

      // White text when over dark sections
      const savoirFaireEl = document.getElementById('savoir-faire');
      const contactEl     = document.getElementById('contact');
      let inWhiteTextSection = false;
      if (savoirFaireEl) {
        const top    = savoirFaireEl.getBoundingClientRect().top + window.scrollY;
        const bottom = top + savoirFaireEl.offsetHeight;
        inWhiteTextSection = scrollY >= top && scrollY <= bottom;
      }
      if (!inWhiteTextSection && contactEl) {
        const top    = contactEl.getBoundingClientRect().top + window.scrollY;
        const bottom = top + contactEl.offsetHeight;
        inWhiteTextSection = scrollY >= top && scrollY <= bottom;
      }
      setUseWhiteText(inWhiteTextSection);

      // Determine active section
      let newActive = 0;
      for (let i = navItems.length - 1; i >= 0; i--) {
        const el = document.getElementById(navItems[i].id);
        if (el && el.getBoundingClientRect().top + window.scrollY <= scrollY) {
          newActive = i;
          break;
        }
      }

      setActiveIndex((prev) => {
        if (prev !== newActive) {
          // Pulse the newly active dash once
          setPulsingIndex(newActive);
          setTimeout(() => setPulsingIndex(null), 600);
        }
        return newActive;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [stopAfter]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    // Close label immediately
    setHoveredIndex(null);
  };

  const getScale = (index: number) => {
    if (hoveredIndex === null) return 1;
    const distance = Math.abs(index - hoveredIndex);
    if (distance === 0) return 1.3;
    if (distance === 1) return 1.1;
    return 1;
  };

  const textColor = useWhiteText ? '#FFFFFF' : '#2D2520';

  if (!isVisible || shouldHide) return null;

  return (
    <div
      className="fixed right-6 sm:right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col items-end gap-3 sm:gap-4 transition-opacity duration-500"
      style={{ opacity: isVisible ? 1 : 0 }}
      onMouseLeave={() => setHoveredIndex(null)}
    >
      {navItems.map((item, index) => {
        const isActive  = index === activeIndex;
        const isPast    = index < activeIndex;
        const isPulsing = index === pulsingIndex;
        const isHovered = hoveredIndex === index;
        const scale     = getScale(index);

        return (
          <button
            key={item.id}
            onClick={() => scrollTo(item.id)}
            onMouseEnter={() => setHoveredIndex(index)}
            aria-label={`Aller à ${item.label}`}
            className="flex items-center gap-3 cursor-pointer group relative"
            style={{
              transform: `scale(${isPulsing ? 1.5 : scale})`,
              transformOrigin: 'right center',
              transition: isPulsing
                ? 'transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1)'
                : 'transform 0.2s ease-out',
            }}
          >
            {/* Label — only visible on hover, disappears when not hovered */}
            <div
              className="absolute right-full mr-2 pointer-events-none"
              style={{
                opacity: isHovered ? 1 : 0,
                transform: isHovered ? 'translateX(0)' : 'translateX(10px)',
                transition: 'opacity 0.25s ease, transform 0.25s ease',
              }}
            >
              <span
                className="text-xs sm:text-sm font-medium uppercase tracking-wider whitespace-nowrap inline-block"
                style={{
                  writingMode: 'vertical-rl',
                  textOrientation: 'mixed',
                  transform: 'rotate(180deg)',
                  color: textColor,
                  textShadow: useWhiteText ? '0 2px 4px rgba(0, 0, 0, 0.5)' : 'none',
                }}
              >
                {item.label}
              </span>
            </div>

            {/* Dash marker */}
            <span
              className="font-bold transition-all duration-200"
              style={{
                fontSize: isActive ? '1.5rem' : '1.25rem',
                color: textColor,
                opacity: isActive ? 1 : isPast ? 0.7 : 0.45,
                textShadow: isActive
                  ? (useWhiteText ? '0 2px 8px rgba(0, 0, 0, 0.8)' : '0 2px 8px rgba(0, 0, 0, 0.3)')
                  : 'none',
                // Extra glow on pulse
                filter: isPulsing
                  ? `drop-shadow(0 0 6px ${useWhiteText ? '#fff' : '#2D2520'})`
                  : 'none',
              }}
            >
              _
            </span>
          </button>
        );
      })}
    </div>
  );
}