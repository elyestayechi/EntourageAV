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

  useEffect(() => {
    setProjetsExpanded(false);
    setShowroomExpanded(false);
    setMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  const closeMobileMenu = () => setMobileMenuOpen(false);
  const toggleProjets  = () => { setProjetsExpanded(p => !p); setShowroomExpanded(false); };
  const toggleShowroom = () => { setShowroomExpanded(p => !p); setProjetsExpanded(false); };

  const isActive        = (path: string) => location.pathname === path;
  const isProjetsActive  = isActive('/realisations') || isActive('/processus');
  const isShowroomActive = isActive('/design-interieur') || isActive('/catalogue-portes');

  const projetsItems: NavigationItem[]  = [
    { path: '/realisations', label: 'Réalisations' },
    { path: '/processus',    label: 'Processus' },
  ];
  const showroomItems: NavigationItem[] = [
    { path: '/design-interieur',  label: 'Design Intérieur' },
    { path: '/catalogue-portes',  label: 'Catalogue Portes' },
  ];
  const mobileMenuItems: NavigationItem[] = [
    { path: '/',                  label: 'Accueil' },
    { path: '/realisations',      label: 'Réalisations' },
    { path: '/processus',         label: 'Processus' },
    { path: '/services',          label: 'Services' },
    { path: '/design-interieur',  label: 'Design Intérieur' },
    { path: '/catalogue-portes',  label: 'Catalogue Portes' },
    { path: '/a-propos',          label: 'À Propos' },
    { path: '/blog',              label: 'Blog' },
    { path: '/contact',           label: 'Contact' },
  ];

  const handleDropdownLinkClick = () => {
    setProjetsExpanded(false);
    setShowroomExpanded(false);
  };

  return (
    <>
      {/* ─────────────────────────────────────────────────────────────
          Desktop / Tablet nav pill — hidden on mobile when menu open
      ───────────────────────────────────────────────────────────── */}
      <nav
        className="fixed top-6 sm:top-8 z-50 rounded-2xl transition-all duration-300 overflow-hidden"
        style={{
          left: '50%',
          width: 'max-content',
          maxWidth: 'calc(100vw - 32px)',
          background: 'rgba(100, 100, 100, 0.25)',
          backdropFilter: 'blur(60px) saturate(200%)',
          WebkitBackdropFilter: 'blur(60px) saturate(200%)',
          boxShadow: '0 12px 48px rgba(0,0,0,0.15), 0 4px 16px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.2)',
          border: '1px solid rgba(150,150,150,0.3)',
          opacity: mobileMenuOpen ? 0 : 1,
          pointerEvents: mobileMenuOpen ? 'none' : 'auto',
          transform: mobileMenuOpen
            ? 'translateX(-50%) translateY(-12px)'
            : 'translateX(-50%)',
        }}
      >
        {/* Main row */}
        <div className="flex items-center justify-between gap-8 lg:gap-16 px-6 sm:px-8 md:px-10 py-4 sm:py-5 md:py-6">
          <Link
            to="/"
            className="flex items-center font-bold text-base md:text-lg tracking-tight whitespace-nowrap"
            style={{ color: 'rgba(255,255,255,0.95)', textShadow: '0 1px 3px rgba(255,255,255,0.8)' }}
          >
            ENTOURAGE AV
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            <div className="relative">
              <button onClick={toggleProjets}
                className="text-xs uppercase tracking-wider font-medium transition-all duration-300 flex items-center gap-1.5 whitespace-nowrap"
                style={{ color: isProjetsActive ? 'rgba(42,37,34,1)' : 'rgba(255,255,255,0.95)' }}>
                Projets
                <svg className="w-3 h-3 transition-transform duration-300" style={{ transform: projetsExpanded ? 'rotate(180deg)' : 'rotate(0)' }}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>

            <Link to="/services" className="text-xs uppercase tracking-wider font-medium transition-all duration-300 whitespace-nowrap"
              style={{ color: isActive('/services') ? 'rgba(42,37,34,1)' : 'rgba(255,255,255,0.95)' }}>
              Services
            </Link>

            <div className="relative">
              <button onClick={toggleShowroom}
                className="text-xs uppercase tracking-wider font-medium transition-all duration-300 flex items-center gap-1.5 whitespace-nowrap"
                style={{ color: isShowroomActive ? 'rgba(42,37,34,1)' : 'rgba(255,255,255,0.95)' }}>
                Showroom
                <svg className="w-3 h-3 transition-transform duration-300" style={{ transform: showroomExpanded ? 'rotate(180deg)' : 'rotate(0)' }}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>

            <Link to="/a-propos" className="text-xs uppercase tracking-wider font-medium transition-all duration-300 whitespace-nowrap"
              style={{ color: isActive('/a-propos') ? 'rgba(42,37,34,1)' : 'rgba(255,255,255,0.95)' }}>
              À&nbsp;Propos
            </Link>

            <Link to="/blog" className="text-xs uppercase tracking-wider font-medium transition-all duration-300 whitespace-nowrap"
              style={{ color: isActive('/blog') ? 'rgba(42,37,34,1)' : 'rgba(255,255,255,0.95)' }}>
              Blog
            </Link>

            <Link to="/contact" className="text-xs uppercase tracking-wider font-medium transition-all duration-300 whitespace-nowrap"
              style={{ color: isActive('/contact') ? 'rgba(42,37,34,1)' : 'rgba(255,255,255,0.95)' }}>
              Contact
            </Link>
          </div>

          {/* Mobile hamburger — only visible when menu is closed */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden p-1 transition-colors duration-300"
            style={{ color: 'rgba(255,255,255,0.95)' }}
            aria-label="Ouvrir le menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Desktop Dropdown — Projets */}
        <div className="overflow-hidden transition-all duration-500"
          style={{ maxHeight: projetsExpanded ? '400px' : '0px', opacity: projetsExpanded ? 1 : 0 }}>
          <div className="border-t px-10" style={{ borderColor: 'rgba(150,150,150,0.3)' }}>
            <div className="grid grid-cols-12 gap-6 py-6">
              <div className="col-span-5 flex flex-col gap-2">
                {projetsItems.map((item, index) => (
                  <Link key={item.path} to={item.path} onClick={handleDropdownLinkClick}
                    onMouseEnter={() => setProjetsHoveredItem(index)}
                    className="group flex items-center justify-between py-3 px-4 rounded-lg transition-all duration-300"
                    style={{ backgroundColor: projetsHoveredItem === index ? 'rgba(255,255,255,0.1)' : 'transparent', color: 'rgba(255,255,255,0.95)' }}>
                    <span className="text-sm font-medium uppercase tracking-wider">{item.label}</span>
                    <ChevronRight className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                  </Link>
                ))}
              </div>
              <div className="col-span-7 pl-6 border-l" style={{ borderColor: 'rgba(150,150,150,0.3)' }}>
                <h3 className="text-xl font-bold mb-3" style={{ color: 'rgba(255,255,255,0.95)' }}>
                  {projetsItems[projetsHoveredItem].label}
                </h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: 'rgba(255,255,255,0.7)' }}>
                  {projetsHoveredItem === 0
                    ? 'Découvrez nos projets de rénovation complétés avec excellence.'
                    : 'Notre processus de travail détaillé pour garantir votre satisfaction.'}
                </p>
                <Link to={projetsItems[projetsHoveredItem].path} onClick={handleDropdownLinkClick}
                  className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-wider"
                  style={{ color: 'rgba(255,255,255,0.95)' }}>
                  En savoir plus <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Dropdown — Showroom */}
        <div className="overflow-hidden transition-all duration-500"
          style={{ maxHeight: showroomExpanded ? '400px' : '0px', opacity: showroomExpanded ? 1 : 0 }}>
          <div className="border-t px-10" style={{ borderColor: 'rgba(150,150,150,0.3)' }}>
            <div className="grid grid-cols-12 gap-6 py-6">
              <div className="col-span-5 flex flex-col gap-2">
                {showroomItems.map((item, index) => (
                  <Link key={item.path} to={item.path} onClick={handleDropdownLinkClick}
                    onMouseEnter={() => setShowroomHoveredItem(index)}
                    className="group flex items-center justify-between py-3 px-4 rounded-lg transition-all duration-300"
                    style={{ backgroundColor: showroomHoveredItem === index ? 'rgba(255,255,255,0.1)' : 'transparent', color: 'rgba(255,255,255,0.95)' }}>
                    <span className="text-sm font-medium uppercase tracking-wider">{item.label}</span>
                    <ChevronRight className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                  </Link>
                ))}
              </div>
              <div className="col-span-7 pl-6 border-l" style={{ borderColor: 'rgba(150,150,150,0.3)' }}>
                <h3 className="text-xl font-bold mb-3" style={{ color: 'rgba(255,255,255,0.95)' }}>
                  {showroomItems[showroomHoveredItem].label}
                </h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: 'rgba(255,255,255,0.7)' }}>
                  {showroomHoveredItem === 0
                    ? 'Explorez notre collection de designs intérieurs créés sur mesure.'
                    : 'Parcourez notre catalogue de portes intérieures de haute qualité.'}
                </p>
                <Link to={showroomItems[showroomHoveredItem].path} onClick={handleDropdownLinkClick}
                  className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-wider"
                  style={{ color: 'rgba(255,255,255,0.95)' }}>
                  En savoir plus <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* ─────────────────────────────────────────────────────────────
          Mobile full-screen overlay — completely separate from the pill
          so there's zero overlap / double-button issue
      ───────────────────────────────────────────────────────────── */}
      <div
        className="fixed inset-0 z-50 md:hidden flex flex-col"
        style={{
          background: 'rgba(18, 18, 18, 0.7)',
          backdropFilter: 'blur(48px) saturate(180%)',
          WebkitBackdropFilter: 'blur(48px) saturate(180%)',
          opacity: mobileMenuOpen ? 1 : 0,
          pointerEvents: mobileMenuOpen ? 'auto' : 'none',
          transition: 'opacity 0.35s ease',
        }}
      >
        {/* Header row */}
        <div className="flex items-center justify-between px-6 pt-12 pb-6">
          <Link
            to="/"
            onClick={closeMobileMenu}
            className="font-bold text-lg tracking-tight text-white"
          >
            ENTOURAGE AV
          </Link>
          <button
            onClick={closeMobileMenu}
            className="flex items-center justify-center w-10 h-10 rounded-xl transition-colors"
            style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.18)' }}
            aria-label="Fermer le menu"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', margin: '0 24px' }} />

        {/* Nav links */}
        <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-1">
          {mobileMenuItems.map((item, i) => {
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={closeMobileMenu}
                className="flex items-center justify-between py-4 px-4 rounded-2xl transition-all duration-200 group"
                style={{
                  background: active ? 'rgba(255,255,255,0.12)' : 'transparent',
                  border: active ? '1px solid rgba(255,255,255,0.2)' : '1px solid transparent',
                  animation: mobileMenuOpen ? `mobileNavIn 0.4s ease forwards ${i * 0.04 + 0.1}s` : 'none',
                  opacity: 0,
                }}
              >
                <span
                  className="text-lg font-semibold uppercase tracking-wider"
                  style={{ color: active ? '#fff' : 'rgba(255,255,255,0.72)' }}
                >
                  {item.label}
                </span>
                <ChevronRight
                  className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1"
                  style={{ color: active ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.3)' }}
                />
              </Link>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="px-6 pb-12 pt-4">
          <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', marginBottom: '20px' }} />
          <Link
            to="/contact"
            onClick={closeMobileMenu}
            className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl font-semibold uppercase tracking-wider text-sm transition-all duration-300 active:scale-95"
            style={{
              background: 'rgba(255,255,255,0.93)',
              color: '#2A2522',
              boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
            }}
          >
            Contactez-Nous
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes mobileNavIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}