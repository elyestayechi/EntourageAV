import { useRef, useEffect, useState } from 'react';
import { gsap } from '../../shared/lib/gsap-init';
import { FilmGrainTexture } from '../../shared/ui/FilmGrainTexture';
import { Mail, Phone, MapPin } from 'lucide-react';
import React from 'react';

export function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const formElements = formRef.current?.querySelectorAll('[data-form-element]');
      if (formElements) {
        gsap.fromTo(
          formElements,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: formRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const submissions = JSON.parse(localStorage.getItem('contact_submissions') || '[]');
    submissions.push({ ...formData, id: Date.now(), date: new Date().toISOString() });
    localStorage.setItem('contact_submissions', JSON.stringify(submissions));
    setSubmitted(true);
    setFormData({ name: '', email: '', phone: '', message: '' });
    setTimeout(() => setSubmitted(false), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="bg-[#2A2A2A] py-16 pb-20 relative overflow-hidden -mt-12"
      data-section="contact"
      style={{
        clipPath: `polygon(
          0 1.8rem,
          calc(50% - 30%) 1.8rem,
          calc(50% - 25%) 1.2rem,
          calc(50% + 25%) 1.2rem,
          calc(50% + 30%) 1.8rem,
          100% 1.8rem,
          100% 100%,
          0 100%
        )`,
        willChange: 'clip-path',
      }}
    >
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 120% 100% at 50% 0%, rgba(255,255,255,0.12) 0%, transparent 60%)', mixBlendMode: 'soft-light' }}
      />

      <FilmGrainTexture />

      <div 
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(180deg, rgba(255,252,248,0.08) 0%, transparent 50%)', mixBlendMode: 'overlay' }} 
      />

      <div className="container mx-auto px-8 sm:px-4 relative z-10 max-w-[1400px]">
        {/* Header */}
        <div className="mb-12 sm:mb-16 text-center">
          <div className="uppercase text-white/40 text-xs mb-4 lg:mb-6 tracking-[0.3em] font-medium flex items-center justify-center gap-3">
            <div className="w-8 h-px bg-[#4A4A4A]"></div>
            Prenons Contact
          </div>
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[0.9] mb-2">
            RÉALISONS VOTRE
          </h2>
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[0.9]">
            <span className="text-[#8A8A8A]">PROJET ENSEMBLE</span>
          </h2>
        </div>

        {/* Centered Form Container */}
        <div className="max-w-3xl mx-auto">
          <div ref={formRef}>
            <p data-form-element className="text-white/60 leading-relaxed mb-8 lg:mb-12 text-base lg:text-lg text-center">
              Transformons ensemble votre vision en réalité. Contactez-nous pour discuter de votre projet de rénovation.
            </p>

            {/* Contact Info */}
            <div data-form-element className="flex flex-wrap justify-center gap-8 mb-12">
              <div className="flex items-center gap-3 text-white/70">
                <Mail className="w-5 h-5" />
                <span>contact@entourageav.com</span>
              </div>
              <div className="flex items-center gap-3 text-white/70">
                <Phone className="w-5 h-5" />
                <span>+33 1 23 45 67 89</span>
              </div>
              <div className="flex items-center gap-3 text-white/70">
                <MapPin className="w-5 h-5" />
                <span>Paris, France</span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div data-form-element>
                <input
                  type="text"
                  name="name"
                  placeholder="Nom complet"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  style={{ background: 'rgba(255, 255, 255, 0.03)', backdropFilter: 'blur(60px) saturate(200%)', WebkitBackdropFilter: 'blur(60px) saturate(200%)', boxShadow: '0 4px 16px 0 rgba(31, 38, 135, 0.15), inset 0 1px 2px 0 rgba(255, 255, 255, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.08)', border: '1px solid rgba(255, 255, 255, 0.08)' }}
                  className="w-full px-6 py-4 rounded-2xl text-white placeholder:text-white/40 focus:outline-none focus:border-white/30 focus:ring-2 focus:ring-white/20 transition-all"
                />
              </div>

              <div data-form-element className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  style={{ background: 'rgba(255, 255, 255, 0.03)', backdropFilter: 'blur(60px) saturate(200%)', WebkitBackdropFilter: 'blur(60px) saturate(200%)', boxShadow: '0 4px 16px 0 rgba(31, 38, 135, 0.15), inset 0 1px 2px 0 rgba(255, 255, 255, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.08)', border: '1px solid rgba(255, 255, 255, 0.08)' }}
                  className="px-6 py-4 rounded-2xl text-white placeholder:text-white/40 focus:outline-none focus:border-white/30 focus:ring-2 focus:ring-white/20 transition-all"
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Téléphone"
                  value={formData.phone}
                  onChange={handleChange}
                  style={{ background: 'rgba(255, 255, 255, 0.03)', backdropFilter: 'blur(60px) saturate(200%)', WebkitBackdropFilter: 'blur(60px) saturate(200%)', boxShadow: '0 4px 16px 0 rgba(31, 38, 135, 0.15), inset 0 1px 2px 0 rgba(255, 255, 255, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.08)', border: '1px solid rgba(255, 255, 255, 0.08)' }}
                  className="px-6 py-4 rounded-2xl text-white placeholder:text-white/40 focus:outline-none focus:border-white/30 focus:ring-2 focus:ring-white/20 transition-all"
                />
              </div>

              <div data-form-element>
                <textarea
                  name="message"
                  placeholder="Décrivez votre projet..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  style={{ background: 'rgba(255, 255, 255, 0.03)', backdropFilter: 'blur(60px) saturate(200%)', WebkitBackdropFilter: 'blur(60px) saturate(200%)', boxShadow: '0 4px 16px 0 rgba(31, 38, 135, 0.15), inset 0 1px 2px 0 rgba(255, 255, 255, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.08)', border: '1px solid rgba(255, 255, 255, 0.08)' }}
                  className="w-full px-6 py-4 rounded-2xl text-white placeholder:text-white/40 focus:outline-none focus:border-white/30 focus:ring-2 focus:ring-white/20 transition-all resize-none"
                />
              </div>

              <div className="flex justify-center">
                <button
                  data-form-element
                  type="submit"
                  className="btn-chamfered group relative flex items-center gap-3 px-10 py-5 text-white transition-all duration-500 hover:scale-105 overflow-hidden"
                  style={{ background: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(60px) saturate(200%)', WebkitBackdropFilter: 'blur(60px) saturate(200%)', boxShadow: '0 8px 32px 0 rgba(255, 255, 255, 0.15), inset 0 1px 3px 0 rgba(255, 255, 255, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.12)', border: '1px solid rgba(255, 255, 255, 0.15)', willChange: 'transform, box-shadow' }}
                >
                  <span className="relative z-10 font-bold uppercase tracking-wider text-sm">Envoyer le message</span>
                  <span className="relative z-10 inline-block transition-transform group-hover:translate-x-2">→</span>
                  <div className="absolute inset-0 bg-white/10 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                </button>
              </div>

              {submitted && (
                <div className="p-6 rounded-2xl font-medium text-center text-white" style={{ background: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(60px) saturate(200%)', WebkitBackdropFilter: 'blur(60px) saturate(200%)', border: '1px solid rgba(255, 255, 255, 0.15)' }}>
                  Merci ! Nous avons bien reçu votre message et vous recontacterons rapidement.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}