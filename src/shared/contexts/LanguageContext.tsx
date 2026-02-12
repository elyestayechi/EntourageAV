import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'fr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navigation
    'nav.services': 'Services',
    'nav.blog': 'Blog',
    'nav.contact': 'Contact',
    'nav.admin': 'Admin',
    
    // Hero
    'hero.title1': 'Transform',
    'hero.title2': 'your living',
    'hero.title3': 'experience',
    'hero.button': 'Start Your Journey',
    'hero.description': 'Entourage AV is a premium renovation company working at the intersection of technology and design to transform residential spaces.',
    'hero.vision': 'Vision',
    
    // Services
    'services.label': 'SERVICE',
    
    // Editorial
    'editorial.label': 'ECONOMICS',
    'editorial.title': 'Entourage is where economics, ecology, and efficiency meet.',
    'editorial.description': 'We believe exceptional design should enhance value without compromise. Our approach balances premium quality with intelligent resource allocation.',
    
    // Blueprint
    'blueprint.label': 'HOW WE WORK',
    'blueprint.title': 'Modern Construction Intelligence',
    'blueprint.description': 'Our digitally-driven process ensures precision, transparency, and exceptional results at every stage',
    
    // Testimonials
    'testimonials.label': 'CLIENT STORIES',
    'testimonials.title': 'What Our Clients Say',
    'testimonials.description': 'Real experiences from homeowners who transformed their spaces with Entourage AV',
    
    // Blog
    'blog.label': 'INSIGHTS',
    'blog.title': 'Latest Thinking',
    'blog.description': 'Perspectives on design, technology, and the evolving landscape of premium renovation',
    'blog.readMore': 'Read More',
    
    // Contact
    'contact.label': 'GET IN TOUCH',
    'contact.title': "Let's Create Something Extraordinary",
    'contact.description': "Ready to transform your space? Reach out and let's discuss your vision.",
    'contact.form.name': 'Your Name',
    'contact.form.email': 'Email Address',
    'contact.form.phone': 'Phone Number',
    'contact.form.message': 'Tell us about your project...',
    'contact.form.submit': 'Send Message',
    'contact.form.success': "Thank you for your message! We'll get back to you soon.",
    
    // Footer
    'footer.tagline': 'Transform your living experience',
    'footer.copyright': '© 2026 Entourage AV. All rights reserved.',
  },
  fr: {
    // Navigation
    'nav.services': 'Services',
    'nav.blog': 'Blog',
    'nav.contact': 'Contact',
    'nav.admin': 'Admin',
    
    // Hero
    'hero.title1': 'Transformez',
    'hero.title2': 'votre expérience',
    'hero.title3': 'de vie',
    'hero.button': 'Commencez Votre Voyage',
    'hero.description': "Entourage AV est une entreprise de rénovation haut de gamme qui travaille à l'intersection de la technologie et du design pour transformer les espaces résidentiels.",
    'hero.vision': 'Vision',
    
    // Services
    'services.label': 'SERVICE',
    
    // Editorial
    'editorial.label': 'ÉCONOMIE',
    'editorial.title': "Entourage, c'est là où l'économie, l'écologie et l'efficacité se rencontrent.",
    'editorial.description': "Nous croyons qu'un design exceptionnel devrait augmenter la valeur sans compromis. Notre approche équilibre qualité premium et allocation intelligente des ressources.",
    
    // Blueprint
    'blueprint.label': 'NOTRE MÉTHODE',
    'blueprint.title': 'Intelligence de Construction Moderne',
    'blueprint.description': 'Notre processus piloté par le numérique garantit précision, transparence et résultats exceptionnels à chaque étape',
    
    // Testimonials
    'testimonials.label': 'TÉMOIGNAGES CLIENTS',
    'testimonials.title': 'Ce Que Disent Nos Clients',
    'testimonials.description': "Expériences réelles de propriétaires qui ont transformé leurs espaces avec Entourage AV",
    
    // Blog
    'blog.label': 'PERSPECTIVES',
    'blog.title': 'Dernières Réflexions',
    'blog.description': 'Perspectives sur le design, la technologie et le paysage évolutif de la rénovation premium',
    'blog.readMore': 'Lire Plus',
    
    // Contact
    'contact.label': 'CONTACTEZ-NOUS',
    'contact.title': "Créons Quelque Chose d'Extraordinaire",
    'contact.description': 'Prêt à transformer votre espace? Contactez-nous et discutons de votre vision.',
    'contact.form.name': 'Votre Nom',
    'contact.form.email': 'Adresse Email',
    'contact.form.phone': 'Numéro de Téléphone',
    'contact.form.message': 'Parlez-nous de votre projet...',
    'contact.form.submit': 'Envoyer le Message',
    'contact.form.success': 'Merci pour votre message! Nous vous répondrons bientôt.',
    
    // Footer
    'footer.tagline': 'Transformez votre expérience de vie',
    'footer.copyright': '© 2026 Entourage AV. Tous droits réservés.',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('fr');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}