import { Hero } from '../features/hero/Hero';
import { StickyServices } from '../features/services/StickyServices';
import { RecentProjects } from '../features/projects/RecentProjects';
import { ScrollVideo } from '../shared/ui/ScrollVideo';
import { BlueprintSection } from '../shared/ui/BlueprintSection';
import { Testimonials } from '../features/testimonials/Testimonials';
import { ArrowRight } from 'lucide-react';
import footerImage from '../assets/footer.webp';

export function HomePage() {
  return (
    <div className="bg-[#FAFAF9] overflow-x-hidden" style={{ isolation: 'isolate' }}>

      {/* ── 1. Hero ── */}
      <div id="hero">
        <Hero />
      </div>

      {/* ── 2. Services ── */}
      <div id="services">
        <StickyServices />
      </div>

      {/* ── 3. Projects Preview ── */}
      <div id="projets">
        <RecentProjects />
      </div>

      {/* ── 4. Process & Methods ──
          ScrollVideo (savoir-faire) followed immediately by BlueprintSection
          (4-step timeline). The ResizeObserver in ScrollVideo handles any
          height changes from RecentProjects loading, same as before. */}
      <div id="savoir-faire">
        <ScrollVideo />
      </div>

      <div id="methode">
        <BlueprintSection />
      </div>

      {/* ── 5. Testimonials ── */}
      <div id="temoignages">
        <Testimonials />
      </div>

      {/* ── 6. Final CTA ── */}
      <section
        id="contact"
        className="relative overflow-hidden flex items-center"
        style={{ minHeight: 'clamp(400px, 60vh, 80vh)' }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${footerImage})` }}
        />
        <div className="absolute inset-0 bg-black/55" />

        <div className="relative z-10 w-full px-4 sm:px-8 py-16 sm:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 md:mb-8 text-white leading-tight">
              Prêt à Transformer<br className="hidden sm:block" /> Votre Espace ?
            </h2>
            <p className="text-sm sm:text-base md:text-xl mb-8 sm:mb-10 md:mb-14 leading-relaxed max-w-xl mx-auto text-white/85 px-2">
              Découvrez comment notre expertise et notre passion peuvent donner vie à vos projets les plus ambitieux.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-2 sm:gap-4 px-6 sm:px-10 py-3 sm:py-5 text-sm sm:text-base md:text-lg font-medium transition-all duration-300 hover:scale-105 active:scale-95"
              style={{
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(40px) saturate(180%)',
                WebkitBackdropFilter: 'blur(40px) saturate(180%)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                border: '1px solid rgba(255, 255, 255, 0.4)',
                clipPath: 'polygon(12px 0, calc(100% - 12px) 0, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px), 0 12px)',
                color: '#2D2520',
              }}
            >
              <span>Contactez-Nous</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}