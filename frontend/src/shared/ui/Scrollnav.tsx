import { useState, useEffect } from 'react';

interface ScrollNavItem {
  id: string;
  chapter: number;
  label: string;
}

const navItems: ScrollNavItem[] = [
  { id: 'services', chapter: 1, label: 'Services' },
  { id: 'projets', chapter: 2, label: 'Projets' },
  { id: 'temoignages', chapter: 3, label: 'Témoignages' },
  { id: 'savoir-faire', chapter: 4, label: 'Savoir-Faire' },
  { id: 'methode', chapter: 5, label: 'Notre Méthode' },
  { id: 'contact', chapter: 6, label: 'Contact' },
];

interface ScrollNavProps {
  stopAfter?: string;
}

export function ScrollNav({ stopAfter }: ScrollNavProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [shouldHide, setShouldHide] = useState(false);
  const [useWhiteText, setUseWhiteText] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + window.innerHeight * 0.4;

      const servicesEl = document.getElementById('services');
      if (servicesEl) {
        const servicesTop = servicesEl.getBoundingClientRect().top + window.scrollY;
        setIsVisible(window.scrollY >= servicesTop - window.innerHeight / 2);
      }

      if (stopAfter) {
        const stopSection = document.getElementById(stopAfter);
        if (stopSection) {
          const stopSectionBottom = stopSection.offsetTop + stopSection.offsetHeight;
          const currentScrollPosition = window.scrollY + window.innerHeight;
          
          if (currentScrollPosition > stopSectionBottom) {
            setShouldHide(true);
          } else {
            setShouldHide(false);
          }
        }
      }

      const savoirFaireEl = document.getElementById('savoir-faire');
      const contactEl = document.getElementById('contact');
      
      let inWhiteTextSection = false;
      
      if (savoirFaireEl) {
        const savoirFaireTop = savoirFaireEl.getBoundingClientRect().top + window.scrollY;
        const savoirFaireBottom = savoirFaireTop + savoirFaireEl.offsetHeight;
        inWhiteTextSection = scrollY >= savoirFaireTop && scrollY <= savoirFaireBottom;
      }
      
      if (!inWhiteTextSection && contactEl) {
        const contactTop = contactEl.getBoundingClientRect().top + window.scrollY;
        const contactBottom = contactTop + contactEl.offsetHeight;
        inWhiteTextSection = scrollY >= contactTop && scrollY <= contactBottom;
      }
      
      setUseWhiteText(inWhiteTextSection);

      for (let i = navItems.length - 1; i >= 0; i--) {
        const el = document.getElementById(navItems[i].id);
        if (el && el.getBoundingClientRect().top + window.scrollY <= scrollY) {
          setActiveIndex(i);
          return;
        }
      }
      setActiveIndex(0);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [stopAfter]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
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
      className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col items-end gap-4 transition-opacity duration-500"
      style={{ opacity: isVisible ? 1 : 0 }}
      onMouseLeave={() => setHoveredIndex(null)}
    >
      {navItems.map((item, index) => {
        const isActive = index === activeIndex;
        const isPast = index < activeIndex;
        const scale = getScale(index);
        const isHovered = hoveredIndex === index;

        return (
          <button
            key={item.id}
            onClick={() => scrollTo(item.id)}
            onMouseEnter={() => setHoveredIndex(index)}
            className="flex items-center gap-3 cursor-pointer transition-all duration-200 ease-out group relative"
            style={{
              transform: `scale(${scale})`,
              transformOrigin: 'right center',
            }}
          >
            {/* Vertical Label - shows on hover */}
            <div
              className="absolute right-full mr-2 transition-all duration-300"
              style={{
                opacity: isHovered ? 1 : 0,
                transform: isHovered ? 'translateX(0)' : 'translateX(10px)',
              }}
            >
              <span
                className="text-sm font-medium uppercase tracking-wider whitespace-nowrap inline-block"
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

            {/* Chapter Number */}
            <span
              className="text-xl font-bold transition-all duration-200"
              style={{
                color: textColor,
                opacity: isActive ? 1 : isPast ? 0.8 : 0.6,
                textShadow: isActive ? 
                  (useWhiteText ? '0 2px 8px rgba(0, 0, 0, 0.8)' : '0 2px 8px rgba(0, 0, 0, 0.3)') : 
                  'none',
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