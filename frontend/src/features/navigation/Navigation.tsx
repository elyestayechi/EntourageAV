import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { Menu, X, ChevronRight } from 'lucide-react';

interface NavigationItem {
  path: string;
  label: string;
}

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [projetsExpanded, setProjetsExpanded] = useState<boolean>(false);
  const [showroomExpanded, setShowroomExpanded] = useState<boolean>(false);
  const [projetsHoveredItem, setProjetsHoveredItem] = useState<number>(0);
  const [showroomHoveredItem, setShowroomHoveredItem] = useState<number>(0);
  const location = useLocation();
  
  // Close dropdowns when route changes
  useEffect(() => {
    setProjetsExpanded(false);
    setShowroomExpanded(false);
  }, [location.pathname]);

  const closeMobileMenu = (): void => {
    setMobileMenuOpen(false);
  };

  const toggleProjets = (): void => {
    setProjetsExpanded(!projetsExpanded);
    if (!projetsExpanded) setShowroomExpanded(false);
  };

  const toggleShowroom = (): void => {
    setShowroomExpanded(!showroomExpanded);
    if (!showroomExpanded) setProjetsExpanded(false);
  };

  const isActive = (path: string): boolean => location.pathname === path;
  const isProjetsActive = isActive('/realisations') || isActive('/processus');
  const isShowroomActive = isActive('/design-interieur') || isActive('/catalogue-portes');

  const projetsItems: NavigationItem[] = [
    { path: '/realisations', label: 'Réalisations' },
    { path: '/processus', label: 'Processus' },
  ];

  const showroomItems: NavigationItem[] = [
    { path: '/design-interieur', label: 'Design Intérieur' },
    { path: '/catalogue-portes', label: 'Catalogue Portes' },
  ];

  const mobileMenuItems: NavigationItem[] = [
    { path: '/realisations', label: 'Réalisations' },
    { path: '/processus', label: 'Processus' },
    { path: '/services', label: 'Services' },
    { path: '/design-interieur', label: 'Design Intérieur' },
    { path: '/catalogue-portes', label: 'Catalogue Portes' },
    { path: '/a-propos', label: 'À Propos' },
    { path: '/blog', label: 'Blog' },
    { path: '/contact', label: 'Contact' },
  ];

  const handleDropdownLinkClick = (): void => {
    setProjetsExpanded(false);
    setShowroomExpanded(false);
  };

  return (
    <>
      <nav
        className="fixed top-6 sm:top-8 left-1/2 -translate-x-1/2 z-50 rounded-2xl transition-all duration-500 max-w-[95vw] sm:max-w-none overflow-hidden"
        style={{
          background: 'rgba(100, 100, 100, 0.25)',
          backdropFilter: 'blur(60px) saturate(200%)',
          WebkitBackdropFilter: 'blur(60px) saturate(200%)',
          boxShadow: '0 12px 48px rgba(0, 0, 0, 0.15), 0 4px 16px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
          border: '1px solid rgba(150, 150, 150, 0.3)',
        }}
      >
        {/* Main navigation row */}
        <div className="flex items-center justify-between gap-8 lg:gap-16 px-6 sm:px-8 md:px-10 py-4 sm:py-5 md:py-6">
          <Link
            to="/"
            className="flex items-center font-bold text-base md:text-lg tracking-tight transition-colors duration-500 whitespace-nowrap"
            style={{
              color: 'rgba(255, 255, 255, 0.95)',
              textShadow: '0 1px 3px rgba(255, 255, 255, 0.8), 0 2px 8px rgba(0, 0, 0, 0.1)',
            }}
          >
            ENTOURAGE AV
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {/* Projets Dropdown */}
            <div className="relative" id="projets-button">
              <button
                onClick={toggleProjets}
                className="text-xs uppercase tracking-wider font-medium transition-all duration-300 flex items-center gap-1.5 whitespace-nowrap"
                style={{
                  color: isProjetsActive ? 'rgba(42, 37, 34, 1)' : 'rgba(255, 255, 255, 0.95)',
                  textShadow: isProjetsActive
                    ? '0 2px 8px rgba(0, 0, 0, 0.2)' 
                    : '0 1px 3px rgba(255, 255, 255, 0.8), 0 2px 8px rgba(0, 0, 0, 0.1)',
                }}
              >
                Projets
                <svg 
                  className="w-3 h-3 transition-transform duration-300" 
                  style={{ transform: projetsExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>

            <Link
              to="/services"
              className="text-xs uppercase tracking-wider font-medium transition-all duration-300 whitespace-nowrap"
              style={{
                color: isActive('/services') ? 'rgba(42, 37, 34, 1)' : 'rgba(255, 255, 255, 0.95)',
                textShadow: isActive('/services') 
                  ? '0 2px 8px rgba(0, 0, 0, 0.2)' 
                  : '0 1px 3px rgba(255, 255, 255, 0.8), 0 2px 8px rgba(0, 0, 0, 0.1)',
              }}
            >
              Services
            </Link>

            {/* Showroom Dropdown */}
            <div className="relative" id="showroom-button">
              <button
                onClick={toggleShowroom}
                className="text-xs uppercase tracking-wider font-medium transition-all duration-300 flex items-center gap-1.5 whitespace-nowrap"
                style={{
                  color: isShowroomActive ? 'rgba(42, 37, 34, 1)' : 'rgba(255, 255, 255, 0.95)',
                  textShadow: isShowroomActive
                    ? '0 2px 8px rgba(0, 0, 0, 0.2)' 
                    : '0 1px 3px rgba(255, 255, 255, 0.8), 0 2px 8px rgba(0, 0, 0, 0.1)',
                }}
              >
                Showroom
                <svg 
                  className="w-3 h-3 transition-transform duration-300" 
                  style={{ transform: showroomExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>

            <Link
              to="/a-propos"
              className="text-xs uppercase tracking-wider font-medium transition-all duration-300 whitespace-nowrap"
              style={{
                color: isActive('/a-propos') ? 'rgba(42, 37, 34, 1)' : 'rgba(255, 255, 255, 0.95)',
                textShadow: isActive('/a-propos') 
                  ? '0 2px 8px rgba(0, 0, 0, 0.2)' 
                  : '0 1px 3px rgba(255, 255, 255, 0.8), 0 2px 8px rgba(0, 0, 0, 0.1)',
              }}
            >
              À&nbsp;Propos
            </Link>

            <Link
              to="/blog"
              className="text-xs uppercase tracking-wider font-medium transition-all duration-300 whitespace-nowrap"
              style={{
                color: isActive('/blog') ? 'rgba(42, 37, 34, 1)' : 'rgba(255, 255, 255, 0.95)',
                textShadow: isActive('/blog') 
                  ? '0 2px 8px rgba(0, 0, 0, 0.2)' 
                  : '0 1px 3px rgba(255, 255, 255, 0.8), 0 2px 8px rgba(0, 0, 0, 0.1)',
              }}
            >
              Blog
            </Link>

            <Link
              to="/contact"
              className="text-xs uppercase tracking-wider font-medium transition-all duration-300 whitespace-nowrap"
              style={{
                color: isActive('/contact') ? 'rgba(42, 37, 34, 1)' : 'rgba(255, 255, 255, 0.95)',
                textShadow: isActive('/contact') 
                  ? '0 2px 8px rgba(0, 0, 0, 0.2)' 
                  : '0 1px 3px rgba(255, 255, 255, 0.8), 0 2px 8px rgba(0, 0, 0, 0.1)',
              }}
            >
              Contact
            </Link>

            
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden transition-colors duration-500"
            style={{
              color: 'rgba(255, 255, 255, 0.95)',
              filter: 'drop-shadow(0 1px 3px rgba(255, 255, 255, 0.8)) drop-shadow(0 2px 8px rgba(0, 0, 0, 0.1))',
            }}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mega Menu Dropdown - Projets */}
        <div 
          className="overflow-hidden transition-all duration-500"
          style={{
            maxHeight: projetsExpanded ? '400px' : '0px',
            opacity: projetsExpanded ? 1 : 0,
          }}
        >
          <div 
            className="border-t px-6 sm:px-8 md:px-10"
            style={{
              borderColor: 'rgba(150, 150, 150, 0.3)',
            }}
          >
            <div className="grid grid-cols-12 gap-6 py-6">
              {/* Left side - Menu items */}
              <div className="col-span-5 flex flex-col gap-2">
                {projetsItems.map((item, index) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={handleDropdownLinkClick}
                    onMouseEnter={() => setProjetsHoveredItem(index)}
                    className="group flex items-center justify-between py-3 px-4 rounded-lg transition-all duration-300"
                    style={{
                      backgroundColor: projetsHoveredItem === index ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                      color: isActive(item.path) ? 'rgba(42, 37, 34, 1)' : 'rgba(255, 255, 255, 0.95)',
                      textShadow: isActive(item.path) 
                        ? '0 2px 8px rgba(0, 0, 0, 0.2)' 
                        : '0 1px 3px rgba(255, 255, 255, 0.8), 0 2px 8px rgba(0, 0, 0, 0.1)',
                    }}
                  >
                    <span className="text-sm font-medium uppercase tracking-wider">
                      {item.label}
                    </span>
                    <ChevronRight className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                  </Link>
                ))}
              </div>

              {/* Right side - Content preview */}
              <div className="col-span-7 pl-6 border-l" style={{ borderColor: 'rgba(150, 150, 150, 0.3)' }}>
                <h3 
                  className="text-xl font-bold mb-3"
                  style={{
                    color: 'rgba(255, 255, 255, 0.95)',
                    textShadow: '0 1px 3px rgba(255, 255, 255, 0.8), 0 2px 8px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  {projetsItems[projetsHoveredItem].label}
                </h3>
                <p 
                  className="text-sm leading-relaxed mb-4"
                  style={{
                    color: 'rgba(255, 255, 255, 0.8)',
                    textShadow: '0 1px 3px rgba(0, 0, 0, 0.3)',
                  }}
                >
                  {projetsHoveredItem === 0 
                    ? 'Découvrez nos projets de rénovation complétés avec excellence et professionnalisme.'
                    : 'Notre processus de travail détaillé pour garantir votre satisfaction à chaque étape.'}
                </p>
                <Link
                  to={projetsItems[projetsHoveredItem].path}
                  onClick={handleDropdownLinkClick}
                  className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-wider transition-all duration-300"
                  style={{
                    color: 'rgba(255, 255, 255, 0.95)',
                    textShadow: '0 1px 3px rgba(255, 255, 255, 0.8)',
                  }}
                >
                  En savoir plus
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Mega Menu Dropdown - Showroom */}
        <div 
          className="overflow-hidden transition-all duration-500"
          style={{
            maxHeight: showroomExpanded ? '400px' : '0px',
            opacity: showroomExpanded ? 1 : 0,
          }}
        >
          <div 
            className="border-t px-6 sm:px-8 md:px-10"
            style={{
              borderColor: 'rgba(150, 150, 150, 0.3)',
            }}
          >
            <div className="grid grid-cols-12 gap-6 py-6">
              {/* Left side - Menu items */}
              <div className="col-span-5 flex flex-col gap-2">
                {showroomItems.map((item, index) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={handleDropdownLinkClick}
                    onMouseEnter={() => setShowroomHoveredItem(index)}
                    className="group flex items-center justify-between py-3 px-4 rounded-lg transition-all duration-300"
                    style={{
                      backgroundColor: showroomHoveredItem === index ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                      color: isActive(item.path) ? 'rgba(42, 37, 34, 1)' : 'rgba(255, 255, 255, 0.95)',
                      textShadow: isActive(item.path) 
                        ? '0 2px 8px rgba(0, 0, 0, 0.2)' 
                        : '0 1px 3px rgba(255, 255, 255, 0.8), 0 2px 8px rgba(0, 0, 0, 0.1)',
                    }}
                  >
                    <span className="text-sm font-medium uppercase tracking-wider">
                      {item.label}
                    </span>
                    <ChevronRight className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                  </Link>
                ))}
              </div>

              {/* Right side - Content preview */}
              <div className="col-span-7 pl-6 border-l" style={{ borderColor: 'rgba(150, 150, 150, 0.3)' }}>
                <h3 
                  className="text-xl font-bold mb-3"
                  style={{
                    color: 'rgba(255, 255, 255, 0.95)',
                    textShadow: '0 1px 3px rgba(255, 255, 255, 0.8), 0 2px 8px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  {showroomItems[showroomHoveredItem].label}
                </h3>
                <p 
                  className="text-sm leading-relaxed mb-4"
                  style={{
                    color: 'rgba(255, 255, 255, 0.8)',
                    textShadow: '0 1px 3px rgba(0, 0, 0, 0.3)',
                  }}
                >
                  {showroomHoveredItem === 0 
                    ? 'Explorez notre collection de designs intérieurs créés sur mesure pour votre espace.'
                    : 'Parcourez notre large catalogue de portes intérieures et coupe-feu de haute qualité.'}
                </p>
                <Link
                  to={showroomItems[showroomHoveredItem].path}
                  onClick={handleDropdownLinkClick}
                  className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-wider transition-all duration-300"
                  style={{
                    color: 'rgba(255, 255, 255, 0.95)',
                    textShadow: '0 1px 3px rgba(255, 255, 255, 0.8)',
                  }}
                >
                  En savoir plus
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>

      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div 
            className="absolute inset-0"
            onClick={closeMobileMenu}
            style={{
              background: 'rgba(42, 37, 34, 0.95)',
              backdropFilter: 'blur(30px)',
            }}
          />
          <div className="relative h-full flex items-center justify-center p-8">
            <div className="flex flex-col gap-8 text-center">
              {mobileMenuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={closeMobileMenu}
                  className="text-2xl font-bold uppercase tracking-wider transition-colors duration-300 whitespace-nowrap"
                  style={{
                    color: isActive(item.path) ? 'var(--color-gold)' : 'rgba(250, 248, 245, 0.8)',
                    textShadow: isActive(item.path) 
                      ? '0 0 20px rgba(212, 175, 119, 0.6)' 
                      : '0 2px 10px rgba(0, 0, 0, 0.5)',
                  }}
                >
                  {item.label}
                </Link>
              ))}

             
            </div>
          </div>
        </div>
      )}
    </>
  );
}