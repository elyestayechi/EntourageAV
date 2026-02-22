import { Hero } from '../features/hero/Hero';
import { StickyServices } from '../features/services/StickyServices';
import { RecentProjects } from '../features/projects/RecentProjects';
import { ScrollVideo } from '../shared/ui/ScrollVideo';
import { BlueprintSection } from '../shared/ui/BlueprintSection';
import { Testimonials } from '../features/testimonials/Testimonials';
import { StorytellingTransition } from '../shared/ui/StorytellingTransition';
import { ScrollNav } from '../shared/ui/Scrollnav';
import { ArrowRight } from 'lucide-react';
import footerImage from '../assets/footer.png';

export function HomePage() {
  return (
    <div className="bg-[#FAFAF9]">
      {/* Chapter 1: Introduction - The Vision */}
      <div id="hero">
        <Hero />
      </div>
      
      {/* Scroll Navigation - Configured to stop AFTER contact section */}
      <ScrollNav 
        stopAfter="contact"
      />
      
      {/* Transition to Chapter 1 */}
      <StorytellingTransition
        themeColor="premium"
        chapter={1}
        title="Nos Services"
        subtitle="Découvrez notre gamme complète de services de rénovation, chacun conçu pour transformer votre vision en réalité."
      />
      
      {/* Chapter 2: Services - The Transformation */}
      <div id="services">
        <StickyServices />
      </div>
      
      {/* Increased height significantly and added top padding to push everything down */}
      <div className="h-64 md:h-80 lg:h-96 flex flex-col items-center px-6">
        {/* Added padding top to push both text and button down */}
        <div className="pt-24 md:pt-32 lg:pt-40 flex flex-col items-center gap-8 w-full">
          <p className="text-center text-[#5A5A5A] text-lg md:text-xl max-w-2xl">
            Chaque projet est une opportunité de créer quelque chose d'exceptionnel. 
            Découvrez comment nous pouvons transformer votre espace.
          </p>
          
          <a 
            href="/services" 
            className="inline-flex items-center gap-3 px-8 py-4 font-medium uppercase tracking-wider text-sm transition-all duration-300 hover:scale-105"
            style={{
              background: 'rgba(0, 0, 0, 0.85)',
              backdropFilter: 'blur(40px) saturate(180%)',
              WebkitBackdropFilter: 'blur(40px) saturate(180%)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(80, 80, 80, 0.25)',
              clipPath: 'polygon(12px 0, calc(100% - 12px) 0, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px), 0 12px)',
              color: 'var(--color-base-cream)',
              textShadow: '0 2px 10px rgba(0, 0, 0, 0.4)',
            }}
          >
            <span>Voir tous nos services</span>
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>
      
      {/* Transition to Chapter 2 */}
      <StorytellingTransition
        themeColor="premium"
        chapter={2}
        title="Nos Projets"
        subtitle="Découvrez nos réalisations récentes où chaque projet reflète notre engagement envers l'excellence et l'innovation."
      />
      
      {/* Chapter 3: Projects */}
      <div id="projets">
        <RecentProjects />
      </div>

      {/* Transition to Chapter 6 */}
      <StorytellingTransition
        themeColor="premium"
        chapter={3}
        title="Témoignages & Actualités"
        subtitle="Les voix de nos clients satisfaits et nos dernières réalisations."
      />
      
      {/* Chapter 7: Trust & Excellence */}
      <div id="temoignages">
        <Testimonials />
      </div>
      
      {/* Transition to Chapter 3 */}
      <StorytellingTransition
        themeColor="premium"
        chapter={4}
        title="Savoir-Faire"
        subtitle="Une expertise artisanale au service de vos projets les plus ambitieux."
      />
      
      {/* Chapter 4: Craftsmanship */}
      <div id="savoir-faire">
        <ScrollVideo />
      </div>
      
      {/* Transition to Chapter 5 */}
      <StorytellingTransition
        themeColor="premium"
        chapter={5}
        title="Notre Méthode"
        subtitle="Un processus structuré et transparent, de la consultation à la livraison finale."
       
      />
      
      {/* Chapter 6: Process & Innovation */}
      <div id="methode" className="bg-[#1A1A1A]">
        <BlueprintSection />
      </div>
      
      {/* Transition to Chapter 7 */}
      <StorytellingTransition
        themeColor="premium"
        chapter={6}
        title="Contactez-Nous"
        subtitle="Prêt à transformer votre espace ? Discutons de votre projet."
      />
      
      {/* CTA Section with footer background image - BIGGER */}
      <section id="contact" className="py-32 md:py-40 lg:py-48 px-4 relative overflow-hidden min-h-[80vh] flex items-center">
        {/* Background Image */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${footerImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/50" />
        
        <div className="max-w-5xl mx-auto text-center relative z-10 w-full">
          <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-12 text-white leading-tight">
            Prêt à Transformer Votre Espace ?
          </h2>
          <p className="text-xl sm:text-2xl md:text-3xl mb-16 leading-relaxed max-w-3xl mx-auto text-white/90">
            Découvrez comment notre expertise et notre passion peuvent donner vie à vos projets les plus ambitieux.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center justify-center gap-4 px-12 py-6 text-xl font-medium transition-all duration-300 hover:scale-105"
            style={{
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(40px) saturate(180%)',
              WebkitBackdropFilter: 'blur(40px) saturate(180%)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
              border: '1px solid rgba(255, 255, 255, 0.4)',
              clipPath: 'polygon(12px 0, calc(100% - 12px) 0, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px), 0 12px)',
              color: '#2D2520',
            }}
          >
            Contactez-Nous
            <ArrowRight className="w-6 h-6" />
          </a>
        </div>
      </section>
    </div>
  );
}