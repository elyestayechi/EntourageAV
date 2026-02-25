import { Hero } from '../features/hero/Hero';
import { StickyServices } from '../features/services/StickyServices';
import { RecentProjects } from '../features/projects/RecentProjects';
import { ScrollVideo } from '../shared/ui/ScrollVideo';
import { BlueprintSection } from '../shared/ui/BlueprintSection';
import { Testimonials } from '../features/testimonials/Testimonials';
import { StorytellingTransition } from '../shared/ui/StorytellingTransition';
import { ScrollNav } from '../shared/ui/Scrollnav';
import { ArrowRight } from 'lucide-react';
import footerImage from '../assets/footer.webp';

export function HomePage() {
  return (
    /*
      overflow-x-hidden on the root prevents any section from creating
      horizontal scroll. isolation: isolate gives each stacked section
      its own paint layer so GSAP pinning doesn't bleed z-indexes.
    */
    <div className="bg-[#FAFAF9] overflow-x-hidden" style={{ isolation: 'isolate' }}>

      {/* Hero */}
      <div id="hero">
        <Hero />
      </div>

      {/* Scroll dots nav — desktop only, hides on mobile to avoid clutter */}
      <div className="hidden sm:block">
        <ScrollNav stopAfter="contact" />
      </div>

      {/* ── Chapter 1: Services ── */}
      <StorytellingTransition
        themeColor="premium"
        chapter={1}
        title="Nos Services"
        subtitle="Découvrez notre gamme complète de services de rénovation, chacun conçu pour transformer votre vision en réalité."
      />

      <div id="services">
        <StickyServices />
      </div>

      {/* Services CTA spacer */}
      <div className="flex flex-col items-center px-4 sm:px-6 py-16 sm:py-24 md:py-32">
        <div className="flex flex-col items-center gap-5 sm:gap-8 w-full max-w-4xl mx-auto text-center">
          <p className="text-[#5A5A5A] text-sm sm:text-base md:text-xl leading-relaxed max-w-xs sm:max-w-none px-2">
            Chaque projet est une opportunité de créer quelque chose d'exceptionnel.
            Découvrez comment nous pouvons transformer votre espace.
          </p>
          <a
            href="/services"
            className="inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 text-xs sm:text-sm font-medium uppercase tracking-wider transition-all duration-300 hover:scale-105 active:scale-95"
            style={{
              background: 'rgba(0, 0, 0, 0.85)',
              backdropFilter: 'blur(40px) saturate(180%)',
              WebkitBackdropFilter: 'blur(40px) saturate(180%)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(80, 80, 80, 0.25)',
              clipPath: 'polygon(12px 0, calc(100% - 12px) 0, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px), 0 12px)',
              color: 'var(--color-base-cream)',
            }}
          >
            <span>Voir tous nos services</span>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </a>
        </div>
      </div>

      {/* ── Chapter 2: Projects ── */}
      <StorytellingTransition
        themeColor="premium"
        chapter={2}
        title="Nos Projets"
        subtitle="Découvrez nos réalisations récentes où chaque projet reflète notre engagement envers l'excellence."
      />

      <div id="projets">
        <RecentProjects />
      </div>

      {/* ── Chapter 3: Testimonials ── */}
      <StorytellingTransition
        themeColor="premium"
        chapter={3}
        title="Témoignages & Actualités"
        subtitle="Les voix de nos clients satisfaits et nos dernières réalisations."
      />

      <div id="temoignages">
        <Testimonials />
      </div>

      {/* ── Chapter 4: Video / Savoir-Faire ── */}
      <StorytellingTransition
        themeColor="premium"
        chapter={4}
        title="Savoir-Faire"
        subtitle="Une expertise artisanale au service de vos projets les plus ambitieux."
      />

      <div id="savoir-faire">
        <ScrollVideo />
      </div>

      {/* ── Chapter 5: Blueprint / Méthode ── */}
      <StorytellingTransition
        themeColor="premium"
        chapter={5}
        title="Notre Méthode"
        subtitle="Un processus structuré et transparent, de la consultation à la livraison finale."
      />

      <div id="methode">
        <BlueprintSection />
      </div>

      {/* ── Chapter 6: Contact CTA ── */}
      <StorytellingTransition
        themeColor="premium"
        chapter={6}
        title="Contactez-Nous"
        subtitle="Prêt à transformer votre espace ? Discutons de votre projet."
      />

      {/* Contact hero section */}
      <section
        id="contact"
        className="relative overflow-hidden flex items-center"
        style={{ minHeight: 'clamp(400px, 60vh, 80vh)' }}
      >
        {/* Background */}
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