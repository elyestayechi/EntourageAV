import { useState, useRef, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, Home, ChevronDown, Check } from 'lucide-react';
import { FilmGrainTexture } from '../shared/ui/FilmGrainTexture';
import { PremiumTextReveal } from '../shared/ui/PremiumTextReveal';

// Service options matching your services page
const serviceOptions = [
  { id: 'renovations-interieures', label: 'Rénovations intérieures' },
  { id: 'fenetres-menuiseries', label: 'Fenêtres et menuiseries' },
  { id: 'electricite', label: 'Électricité intérieure et extérieure' },
  { id: 'plomberie-sanitaires', label: 'Travaux sanitaires et plomberie' },
  { id: 'ventilation-vmc', label: 'Ventilation mécanique contrôlée (VMC)' },
  { id: 'carrelage', label: 'Carrelage professionnel' },
  { id: 'placo-platre', label: 'Placo et plâtre' },
  { id: 'finitions', label: 'Finitions complètes' },
  { id: 'autre', label: 'Autre projet' },
];

// Project types for better qualification
const projectTypes = [
  { id: 'appartement', label: 'Appartement' },
  { id: 'maison', label: 'Maison' },
  { id: 'bureau', label: 'Bureau / Commercial' },
  { id: 'autre-batiment', label: 'Autre type de bâtiment' },
];

// Multi-select dropdown component for services
function MultiSelectServices({ selectedServices, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleService = (serviceId) => {
    if (selectedServices.includes(serviceId)) {
      onChange(selectedServices.filter(id => id !== serviceId));
    } else {
      onChange([...selectedServices, serviceId]);
    }
  };

  const getDisplayText = () => {
    if (selectedServices.length === 0) return 'Type de service(s) souhaité(s) *';
    if (selectedServices.length === 1) {
      return serviceOptions.find(s => s.id === selectedServices[0])?.label || '';
    }
    return `${selectedServices.length} services sélectionnés`;
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 focus:outline-none transition-all text-left flex items-center justify-between group"
        style={{
          background: 'rgba(255, 255, 255, 0.6)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          boxShadow: isOpen 
            ? '0 8px 24px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
            : '0 4px 16px rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
          border: isOpen 
            ? '1px solid rgba(42, 37, 34, 0.2)'
            : '1px solid rgba(255, 255, 255, 0.5)',
          clipPath: 'polygon(8px 0, calc(100% - 8px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px), 0 8px)',
          color: selectedServices.length > 0 ? '#2A2522' : '#5A5A5A',
        }}
      >
        <span>{getDisplayText()}</span>
        <ChevronDown 
          className="w-5 h-5 transition-transform duration-300"
          style={{ 
            color: '#5A5A5A',
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)'
          }}
        />
      </button>

      {isOpen && (
        <div 
          className="absolute z-50 w-full mt-2 max-h-80 overflow-y-auto"
          style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(40px) saturate(180%)',
            WebkitBackdropFilter: 'blur(40px) saturate(180%)',
            boxShadow: '0 12px 48px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
            border: '1px solid rgba(255, 255, 255, 0.6)',
            clipPath: 'polygon(12px 0, calc(100% - 12px) 0, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px), 0 12px)',
          }}
        >
          <div className="py-2">
            {serviceOptions.map((option) => {
              const isSelected = selectedServices.includes(option.id);
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => toggleService(option.id)}
                  className="w-full px-6 py-3 text-left flex items-center gap-3 transition-all duration-200"
                  style={{
                    background: isSelected 
                      ? 'rgba(42, 37, 34, 0.08)' 
                      : 'transparent',
                    color: '#2A2522',
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.background = 'rgba(42, 37, 34, 0.04)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.background = 'transparent';
                    }
                  }}
                >
                  <div 
                    className="flex items-center justify-center flex-shrink-0"
                    style={{
                      width: '20px',
                      height: '20px',
                      border: isSelected ? '2px solid #2A2522' : '2px solid rgba(90, 90, 90, 0.3)',
                      background: isSelected ? '#2A2522' : 'transparent',
                      clipPath: 'polygon(3px 0, calc(100% - 3px) 0, 100% 3px, 100% calc(100% - 3px), calc(100% - 3px) 100%, 3px 100%, 0 calc(100% - 3px), 0 3px)',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {isSelected && <Check className="w-3 h-3" style={{ color: '#FAFAF9' }} />}
                  </div>
                  <span className="text-sm font-medium">{option.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// Enhanced custom select component
function CustomSelect({ name, value, onChange, options, placeholder, icon: Icon }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find(opt => opt.id === value);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 focus:outline-none transition-all text-left flex items-center justify-between group"
        style={{
          background: 'rgba(255, 255, 255, 0.6)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          boxShadow: isOpen 
            ? '0 8px 24px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
            : '0 4px 16px rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
          border: isOpen 
            ? '1px solid rgba(42, 37, 34, 0.2)'
            : '1px solid rgba(255, 255, 255, 0.5)',
          clipPath: 'polygon(8px 0, calc(100% - 8px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px), 0 8px)',
          color: value ? '#2A2522' : '#5A5A5A',
        }}
      >
        <div className="flex items-center gap-2">
          {Icon && <Icon className="w-4 h-4" style={{ color: '#5A5A5A' }} />}
          <span>{selectedOption ? selectedOption.label : placeholder}</span>
        </div>
        <ChevronDown 
          className="w-5 h-5 transition-transform duration-300"
          style={{ 
            color: '#5A5A5A',
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)'
          }}
        />
      </button>

      {isOpen && (
        <div 
          className="absolute z-50 w-full mt-2 max-h-64 overflow-y-auto"
          style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(40px) saturate(180%)',
            WebkitBackdropFilter: 'blur(40px) saturate(180%)',
            boxShadow: '0 12px 48px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
            border: '1px solid rgba(255, 255, 255, 0.6)',
            clipPath: 'polygon(12px 0, calc(100% - 12px) 0, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px), 0 12px)',
          }}
        >
          <div className="py-2">
            {!placeholder.includes('*') && (
              <button
                type="button"
                onClick={() => {
                  onChange({ target: { name, value: '' } });
                  setIsOpen(false);
                }}
                className="w-full px-6 py-3 text-left transition-all duration-200"
                style={{
                  background: !value ? 'rgba(42, 37, 34, 0.08)' : 'transparent',
                  color: '#5A5A5A',
                }}
                onMouseEnter={(e) => {
                  if (value) {
                    e.currentTarget.style.background = 'rgba(42, 37, 34, 0.04)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (value) {
                    e.currentTarget.style.background = 'transparent';
                  }
                }}
              >
                <span className="text-sm">{placeholder}</span>
              </button>
            )}
            {options.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => {
                  onChange({ target: { name, value: option.id } });
                  setIsOpen(false);
                }}
                className="w-full px-6 py-3 text-left transition-all duration-200"
                style={{
                  background: value === option.id ? 'rgba(42, 37, 34, 0.08)' : 'transparent',
                  color: '#2A2522',
                }}
                onMouseEnter={(e) => {
                  if (value !== option.id) {
                    e.currentTarget.style.background = 'rgba(42, 37, 34, 0.04)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (value !== option.id) {
                    e.currentTarget.style.background = 'transparent';
                  }
                }}
              >
                <span className="text-sm font-medium">{option.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    services: [], // Changed to array for multiple services
    location: '',
    projectType: '',
    surface: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation for services
    if (formData.services.length === 0) {
      alert('Veuillez sélectionner au moins un service');
      return;
    }
    
    // Save to localStorage with more details
    const submission = {
      ...formData,
      id: Date.now(),
      date: new Date().toISOString(),
      servicesLabels: formData.services.map(sid => 
        serviceOptions.find(s => s.id === sid)?.label || sid
      ),
      projectTypeLabel: projectTypes.find(p => p.id === formData.projectType)?.label || formData.projectType,
    };
    
    const submissions = JSON.parse(localStorage.getItem('contact_submissions') || '[]');
    submissions.push(submission);
    localStorage.setItem('contact_submissions', JSON.stringify(submissions));
    
    console.log('Form submission:', submission);
    
    setSubmitted(true);
    setFormData({
      name: '',
      email: '',
      phone: '',
      services: [],
      location: '',
      projectType: '',
      surface: '',
      message: '',
    });
    
    setTimeout(() => setSubmitted(false), 5000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleServicesChange = (newServices) => {
    setFormData({ ...formData, services: newServices });
  };

  return (
    <div className="min-h-screen bg-[#FAFAF9]">
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center px-4 pt-32 pb-20">
        <FilmGrainTexture id="contactHeroGrain" opacity={0.04} withVignette={true} vignetteIntensity={0.15} />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          {/* Number badge */}
          <div 
            className="inline-flex px-6 py-3 mb-6"
            style={{
              background: 'rgba(255, 255, 255, 0.4)',
              backdropFilter: 'blur(40px) saturate(180%)',
              WebkitBackdropFilter: 'blur(40px) saturate(180%)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              clipPath: 'polygon(8px 0, calc(100% - 8px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px), 0 8px)',
            }}
          >
            <span className="text-sm font-medium" style={{ color: '#2A2522' }}>CONTACT</span>
          </div>
          
          <PremiumTextReveal>
            <h1 className="text-5xl sm:text-6xl lg:text-8xl font-bold mb-6 leading-[0.9]" style={{ color: '#2A2522' }}>
              RÉALISONS VOTRE<br />PROJET ENSEMBLE
            </h1>
          </PremiumTextReveal>
          
          <p className="text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed" style={{ color: '#5A5A5A' }}>
            Transformons ensemble votre vision en réalité. Contactez-nous pour discuter de votre projet de rénovation.
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 px-4 bg-[#FAFAF9]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Contact Info */}
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-8" style={{ color: '#2A2522' }}>
                Nos Coordonnées
              </h2>
              
              <div className="space-y-6 mb-12">
                <div 
                  className="p-6 flex items-start gap-4"
                  style={{
                    background: 'rgba(255, 255, 255, 0.4)',
                    backdropFilter: 'blur(40px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(40px) saturate(180%)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    clipPath: 'polygon(12px 0, calc(100% - 12px) 0, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px), 0 12px)',
                  }}
                >
                  <Mail className="w-6 h-6 flex-shrink-0 mt-1" style={{ color: '#2A2522' }} />
                  <div>
                    <h3 className="font-bold mb-1" style={{ color: '#2A2522' }}>Email</h3>
                    <p style={{ color: '#5A5A5A' }}>contact@entourageav.com</p>
                  </div>
                </div>
                
                <div 
                  className="p-6 flex items-start gap-4"
                  style={{
                    background: 'rgba(255, 255, 255, 0.4)',
                    backdropFilter: 'blur(40px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(40px) saturate(180%)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    clipPath: 'polygon(12px 0, calc(100% - 12px) 0, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px), 0 12px)',
                  }}
                >
                  <Phone className="w-6 h-6 flex-shrink-0 mt-1" style={{ color: '#2A2522' }} />
                  <div>
                    <h3 className="font-bold mb-1" style={{ color: '#2A2522' }}>Téléphone</h3>
                    <p style={{ color: '#5A5A5A' }}>+33 1 23 45 67 89</p>
                  </div>
                </div>
                
                <div 
                  className="p-6 flex items-start gap-4"
                  style={{
                    background: 'rgba(255, 255, 255, 0.4)',
                    backdropFilter: 'blur(40px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(40px) saturate(180%)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    clipPath: 'polygon(12px 0, calc(100% - 12px) 0, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px), 0 12px)',
                  }}
                >
                  <MapPin className="w-6 h-6 flex-shrink-0 mt-1" style={{ color: '#2A2522' }} />
                  <div>
                    <h3 className="font-bold mb-1" style={{ color: '#2A2522' }}>Zone d'intervention</h3>
                    <p style={{ color: '#5A5A5A' }}>Île-de-France et régions limitrophes</p>
                  </div>
                </div>
              </div>
              
              <div 
                className="p-8"
                style={{
                  background: 'rgba(255, 255, 255, 0.4)',
                  backdropFilter: 'blur(40px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(40px) saturate(180%)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  clipPath: 'polygon(16px 0, calc(100% - 16px) 0, 100% 16px, 100% calc(100% - 16px), calc(100% - 16px) 100%, 16px 100%, 0 calc(100% - 16px), 0 16px)',
                }}
              >
                <h3 className="text-xl font-bold mb-4" style={{ color: '#2A2522' }}>Pourquoi nous contacter ?</h3>
                <div className="space-y-3" style={{ color: '#5A5A5A' }}>
                  <p>• Estimation gratuite de votre projet</p>
                  <p>• Conseil personnalisé par nos experts</p>
                  <p>• Devis détaillé et transparent</p>
                  <p>• Accompagnement du début à la fin</p>
                </div>
              </div>
            </div>

            {/* Enhanced Contact Form */}
            <div 
              className="p-8"
              style={{
                background: 'rgba(255, 255, 255, 0.4)',
                backdropFilter: 'blur(40px) saturate(180%)',
                WebkitBackdropFilter: 'blur(40px) saturate(180%)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                clipPath: 'polygon(16px 0, calc(100% - 16px) 0, 100% 16px, 100% calc(100% - 16px), calc(100% - 16px) 100%, 16px 100%, 0 calc(100% - 16px), 0 16px)',
              }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold mb-8" style={{ color: '#2A2522' }}>
                Parlez-nous de votre projet
              </h2>
              
              {submitted && (
                <div className="mb-6 p-4" style={{
                  background: 'rgba(212, 237, 218, 0.8)',
                  border: '1px solid rgba(52, 199, 89, 0.3)',
                  color: '#155724',
                  clipPath: 'polygon(8px 0, calc(100% - 8px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px), 0 8px)',
                }}>
                  Merci ! Votre demande a bien été envoyée. Nous vous contacterons sous 24h.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      name="name"
                      placeholder="Nom complet *"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-6 py-4 focus:outline-none focus:ring-2 focus:ring-offset-0 transition-all"
                      style={{
                        background: 'rgba(255, 255, 255, 0.6)',
                        backdropFilter: 'blur(20px) saturate(180%)',
                        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                        border: '1px solid rgba(255, 255, 255, 0.5)',
                        clipPath: 'polygon(8px 0, calc(100% - 8px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px), 0 8px)',
                        color: '#2A2522',
                      }}
                      onFocus={(e) => {
                        e.target.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
                        e.target.style.border = '1px solid rgba(42, 37, 34, 0.2)';
                      }}
                      onBlur={(e) => {
                        e.target.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
                        e.target.style.border = '1px solid rgba(255, 255, 255, 0.5)';
                      }}
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Téléphone *"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-6 py-4 focus:outline-none transition-all"
                      style={{
                        background: 'rgba(255, 255, 255, 0.6)',
                        backdropFilter: 'blur(20px) saturate(180%)',
                        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                        border: '1px solid rgba(255, 255, 255, 0.5)',
                        clipPath: 'polygon(8px 0, calc(100% - 8px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px), 0 8px)',
                        color: '#2A2522',
                      }}
                      onFocus={(e) => {
                        e.target.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
                        e.target.style.border = '1px solid rgba(42, 37, 34, 0.2)';
                      }}
                      onBlur={(e) => {
                        e.target.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
                        e.target.style.border = '1px solid rgba(255, 255, 255, 0.5)';
                      }}
                    />
                  </div>
                </div>
                
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email *"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-6 py-4 focus:outline-none transition-all"
                    style={{
                      background: 'rgba(255, 255, 255, 0.6)',
                      backdropFilter: 'blur(20px) saturate(180%)',
                      WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                      border: '1px solid rgba(255, 255, 255, 0.5)',
                      clipPath: 'polygon(8px 0, calc(100% - 8px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px), 0 8px)',
                      color: '#2A2522',
                    }}
                    onFocus={(e) => {
                      e.target.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
                      e.target.style.border = '1px solid rgba(42, 37, 34, 0.2)';
                    }}
                    onBlur={(e) => {
                      e.target.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
                      e.target.style.border = '1px solid rgba(255, 255, 255, 0.5)';
                    }}
                  />
                </div>

                {/* Project Details Section */}
                <div className="pt-4 border-t border-white/20">
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2" style={{ color: '#2A2522' }}>
                    <Home className="w-5 h-5" />
                    <span>Détails du projet</span>
                  </h3>
                  
                  {/* Multi-Select Services */}
                  <div className="mb-4">
                    <MultiSelectServices 
                      selectedServices={formData.services}
                      onChange={handleServicesChange}
                    />
                    <p className="text-xs mt-2 px-2" style={{ color: '#5A5A5A' }}>
                      Vous pouvez sélectionner plusieurs services
                    </p>
                  </div>

                  {/* Location - Text Input */}
                  <div className="mb-4">
                    <input
                      type="text"
                      name="location"
                      placeholder="Localisation du projet (ville, département) *"
                      value={formData.location}
                      onChange={handleChange}
                      required
                      className="w-full px-6 py-4 focus:outline-none transition-all"
                      style={{
                        background: 'rgba(255, 255, 255, 0.6)',
                        backdropFilter: 'blur(20px) saturate(180%)',
                        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                        border: '1px solid rgba(255, 255, 255, 0.5)',
                        clipPath: 'polygon(8px 0, calc(100% - 8px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px), 0 8px)',
                        color: '#2A2522',
                      }}
                      onFocus={(e) => {
                        e.target.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
                        e.target.style.border = '1px solid rgba(42, 37, 34, 0.2)';
                      }}
                      onBlur={(e) => {
                        e.target.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
                        e.target.style.border = '1px solid rgba(255, 255, 255, 0.5)';
                      }}
                    />
                  </div>

                  {/* Project Type and Surface */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <CustomSelect
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleChange}
                        options={projectTypes}
                        placeholder="Type de bâtiment"
                        icon={Home}
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        name="surface"
                        placeholder="Surface (m²)"
                        value={formData.surface}
                        onChange={handleChange}
                        className="w-full px-6 py-4 focus:outline-none transition-all"
                        style={{
                          background: 'rgba(255, 255, 255, 0.6)',
                          backdropFilter: 'blur(20px) saturate(180%)',
                          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                          border: '1px solid rgba(255, 255, 255, 0.5)',
                          clipPath: 'polygon(8px 0, calc(100% - 8px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px), 0 8px)',
                          color: '#2A2522',
                        }}
                        onFocus={(e) => {
                          e.target.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
                          e.target.style.border = '1px solid rgba(42, 37, 34, 0.2)';
                        }}
                        onBlur={(e) => {
                          e.target.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
                          e.target.style.border = '1px solid rgba(255, 255, 255, 0.5)';
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <textarea
                    name="message"
                    placeholder="Décrivez votre projet en détail (nature des travaux, vos attentes, contraintes spécifiques, etc.) *"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-6 py-4 focus:outline-none transition-all resize-none"
                    style={{
                      background: 'rgba(255, 255, 255, 0.6)',
                      backdropFilter: 'blur(20px) saturate(180%)',
                      WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                      border: '1px solid rgba(255, 255, 255, 0.5)',
                      clipPath: 'polygon(8px 0, calc(100% - 8px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px), 0 8px)',
                      color: '#2A2522',
                    }}
                    onFocus={(e) => {
                      e.target.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
                      e.target.style.border = '1px solid rgba(42, 37, 34, 0.2)';
                    }}
                    onBlur={(e) => {
                      e.target.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
                      e.target.style.border = '1px solid rgba(255, 255, 255, 0.5)';
                    }}
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-3 px-10 py-5 font-medium transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
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
                  <span className="uppercase tracking-wider text-sm font-bold">Demander un devis personnalisé</span>
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}