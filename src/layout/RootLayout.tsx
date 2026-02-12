import { useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router';
import { LanguageProvider } from '../shared/contexts/LanguageContext';
import { Navigation } from '../features/navigation/Navigation';
import { Footer } from '../features/navigation/Footer';
import Lenis from 'lenis';

export function RootLayout() {
  const location = useLocation();
  const prevPathname = useRef(location.pathname);

  useEffect(() => {
    // Initialize Lenis smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    // Skip on initial load
    if (prevPathname.current === location.pathname) return;

    prevPathname.current = location.pathname;

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

  const isAdminPage = location.pathname === '/admin';

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-[#FAFAF9] relative">
        {!isAdminPage && <Navigation />}

        <div className="page-content">
          <Outlet />
        </div>
        
        {!isAdminPage && <Footer />}
      </div>
    </LanguageProvider>
  );
}

