import { useEffect, useState } from 'react';
import { FilmGrainTexture } from '../../shared/ui/FilmGrainTexture';
import { getActiveSocialMedia, SocialMediaLink } from '../../services/socialMedia';
import logo from '../../assets/logo.png';

// Fallback static social links shown when API is unavailable
const STATIC_SOCIAL: SocialMediaLink[] = [
  { id: -1, platform: 'Instagram', url: 'https://instagram.com', order_index: 0, is_active: true, created_at: '', updated_at: '' },
  { id: -2, platform: 'Facebook', url: 'https://facebook.com', order_index: 1, is_active: true, created_at: '', updated_at: '' },
];

function SocialIcon({ platform }: { platform: string }) {
  const p = platform.toLowerCase();

  if (p === 'instagram') return (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  );

  if (p === 'facebook') return (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );

  if (p === 'twitter' || p === 'x') return (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.74l7.73-8.835L1.254 2.25H8.08l4.258 5.631 5.906-5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );

  if (p === 'linkedin') return (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );

  if (p === 'youtube') return (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  );

  if (p === 'tiktok') return (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
    </svg>
  );

  // Generic globe icon for unknown platforms
  return (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
    </svg>
  );
}

export function Footer() {
  const [socialLinks, setSocialLinks] = useState<SocialMediaLink[]>([]);

  useEffect(() => {
    getActiveSocialMedia()
      .then((data) => setSocialLinks(data?.length > 0 ? data : STATIC_SOCIAL))
      .catch(() => setSocialLinks(STATIC_SOCIAL));
  }, []);

  return (
    <footer className="bg-[#FAFAF9] pt-16 pb-10 md:pt-20 md:pb-12 relative overflow-hidden">
      <FilmGrainTexture />

      <div className="container mx-auto px-8 relative z-10 max-w-[1400px]">

        {/* Top row: Logo left, Nav columns right */}
        <div className="flex flex-col md:flex-row md:justify-between gap-12 md:gap-8">

          {/* Logo */}
          <div className="flex-shrink-0">
            <img
              src={logo}
              alt="Entourage AV Renovation"
              className="w-36 md:w-44 h-auto"
              style={{ filter: 'invert(1) brightness(0)' }}
            />
          </div>

          {/* Nav columns */}
          <div className="grid grid-cols-3 gap-12 md:gap-16">

            <div>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-black/35 mb-5">Projets</h3>
              <ul className="flex flex-col gap-3">
                <li><a href="/realisations" className="text-sm text-black/50 hover:text-black transition-colors duration-300">Réalisations</a></li>
                <li><a href="/processus" className="text-sm text-black/50 hover:text-black transition-colors duration-300">Processus</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-black/35 mb-5">Showroom</h3>
              <ul className="flex flex-col gap-3">
                <li><a href="/design-interieur" className="text-sm text-black/50 hover:text-black transition-colors duration-300">Design Intérieur</a></li>
                <li><a href="/catalogue-portes" className="text-sm text-black/50 hover:text-black transition-colors duration-300">Catalogue Portes</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-black/35 mb-5">Entreprise</h3>
              <ul className="flex flex-col gap-3">
                <li><a href="/services" className="text-sm text-black/50 hover:text-black transition-colors duration-300">Services</a></li>
                <li><a href="/a-propos" className="text-sm text-black/50 hover:text-black transition-colors duration-300">À Propos</a></li>
                <li><a href="/blog" className="text-sm text-black/50 hover:text-black transition-colors duration-300">Blog</a></li>
                <li><a href="/contact" className="text-sm text-black/50 hover:text-black transition-colors duration-300">Contact</a></li>
              </ul>
            </div>

          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-black/10 mt-14 mb-7" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-black/30 tracking-wider">
            © 2026 Entourage AV. Tous droits réservés.
          </p>

          <div className="flex items-center gap-5">
            {/* Dynamic social links from API */}
            {socialLinks.map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-black/30 hover:text-black/70 transition-colors duration-300"
                title={link.platform}
              >
                <SocialIcon platform={link.platform} />
              </a>
            ))}

            <span className="w-px h-3 bg-black/15" />
            <p className="text-xs text-black/30 tracking-wider">Made by Tee*</p>
          </div>
        </div>

      </div>
    </footer>
  );
}