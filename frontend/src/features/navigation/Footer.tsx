import { FilmGrainTexture } from '../../shared/ui/FilmGrainTexture';
import logo from '../../assets/logo.png';
import React from 'react'

export function Footer() {
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

          {/* Nav columns — flush right */}
          <div className="grid grid-cols-3 gap-12 md:gap-16">

            {/* Projets */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-black/35 mb-5">
                Projets
              </h3>
              <ul className="flex flex-col gap-3">
                <li>
                  <a href="/realisations" className="text-sm text-black/50 hover:text-black transition-colors duration-300">
                    Réalisations
                  </a>
                </li>
                <li>
                  <a href="/processus" className="text-sm text-black/50 hover:text-black transition-colors duration-300">
                    Processus
                  </a>
                </li>
              </ul>
            </div>

            {/* Showroom */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-black/35 mb-5">
                Showroom
              </h3>
              <ul className="flex flex-col gap-3">
                <li>
                  <a href="/design-interieur" className="text-sm text-black/50 hover:text-black transition-colors duration-300">
                    Design Intérieur
                  </a>
                </li>
                <li>
                  <a href="/catalogue-portes" className="text-sm text-black/50 hover:text-black transition-colors duration-300">
                    Catalogue Portes
                  </a>
                </li>
              </ul>
            </div>

            {/* Entreprise */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-black/35 mb-5">
                Entreprise
              </h3>
              <ul className="flex flex-col gap-3">
                <li>
                  <a href="/services" className="text-sm text-black/50 hover:text-black transition-colors duration-300">
                    Services
                  </a>
                </li>
                <li>
                  <a href="/a-propos" className="text-sm text-black/50 hover:text-black transition-colors duration-300">
                    À Propos
                  </a>
                </li>
                <li>
                  <a href="/blog" className="text-sm text-black/50 hover:text-black transition-colors duration-300">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="/contact" className="text-sm text-black/50 hover:text-black transition-colors duration-300">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-black/10 mt-14 mb-7"></div>

        {/* Bottom bar: copyright left · socials + credit right */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-black/30 tracking-wider">
            © 2026 Entourage AV. Tous droits réservés.
          </p>

          <div className="flex items-center gap-5">
            {/* Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black/30 hover:text-black/70 transition-colors duration-300"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>

            {/* Facebook */}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black/30 hover:text-black/70 transition-colors duration-300"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>

            {/* Separator */}
            <span className="w-px h-3 bg-black/15"></span>

            <p className="text-xs text-black/30 tracking-wider">
              Made by Tee*
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
}