import { Link } from 'react-router';
import { useRef, useEffect } from 'react';
import { gsap } from '../shared/lib/gsap-init';
import { ArrowRight, Download, Check, Package, Palette, Shield, LucideIcon, ExternalLink } from 'lucide-react';
import { FilmGrainTexture } from '../shared/ui/FilmGrainTexture';
import { PremiumTextReveal } from '../shared/ui/PremiumTextReveal';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface DoorCollection {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  image: string;
  features: string[];
  astoriUrl: string;
  style: string[];
}

interface Material {
  name: string;
  description: string;
  icon: LucideIcon;
}

// Real Astori door collections from their official catalogue
const astoriCollections: DoorCollection[] = [
  {
    id: 'arte',
    name: 'Arte',
    nameEn: 'Arte Collection',
    description: 'Design moderne épuré avec finitions élégantes. Collection Arte propose des lignes contemporaines pour espaces raffinés.',
    image: 'src/assets/art.jpg',
    features: ['Design moderne', 'Finitions peinture et placage', 'Modèles A1-A13', '9 variations disponibles'],
    astoriUrl: 'https://astori.ua/interior-doors/arte',
    style: ['Moderne']
  },
  {
    id: 'bone',
    name: 'Bone',
    nameEn: 'Bone Collection',
    description: 'Élégance minimaliste et lignes pures. La collection Bone incarne le raffinement contemporain avec des détails subtils.',
    image: 'src/assets/bone.jpg',
    features: ['Style minimaliste', 'Surfaces lisses', 'Design épuré', 'Finitions premium'],
    astoriUrl: 'https://astori.ua/interior-doors/bone',
    style: ['Moderne', 'Minimaliste']
  },
  {
    id: 'drive',
    name: 'Drive',
    nameEn: 'Drive Collection',
    description: 'Dynamisme et caractère affirmé. Collection Drive pour intérieurs modernes qui osent la personnalité.',
    image: 'src/assets/drive.jpg',
    features: ['Design audacieux', 'Lignes dynamiques', 'Personnalité forte', 'Finitions variées'],
    astoriUrl: 'https://astori.ua/interior-doors/drive',
    style: ['Moderne', 'Contemporain']
  },
  {
    id: 'casa',
    name: 'Casa',
    nameEn: 'Casa Collection',
    description: 'Chaleur et convivialité pour votre maison. Casa allie tradition et modernité dans un design accueillant.',
    image: 'src/assets/home.jpg',
    features: ['Style chaleureux', 'Design polyvalent', 'Finitions bois', 'Confort visuel'],
    astoriUrl: 'https://astori.ua/interior-doors/casa',
    style: ['Classique', 'Moderne']
  },
  {
    id: 'evo',
    name: 'Evo',
    nameEn: 'Evo Collection',
    description: 'Évolution du design contemporain. Collection Evo représente l\'innovation et la modernité dans chaque détail.',
    image: 'src/assets/evo.jpg',
    features: ['Innovation design', 'Technologie avancée', 'Esthétique moderne', 'Performance optimale'],
    astoriUrl: 'https://astori.ua/interior-doors/evo',
    style: ['Moderne', 'Innovant']
  },
  {
    id: 'fly',
    name: 'Fly',
    nameEn: 'Fly Collection',
    description: 'Légèreté et fluidité du design. Fly offre des portes qui semblent flotter dans votre espace.',
    image: 'src/assets/fly.jpg',
    features: ['Design aérien', 'Lignes fluides', 'Esthétique légère', 'Modernité absolue'],
    astoriUrl: 'https://astori.ua/interior-doors/fly',
    style: ['Moderne', 'Épuré']
  },
  {
    id: 'g-line',
    name: 'G-line',
    nameEn: 'G-line Collection',
    description: 'Géométrie pure et lignes graphiques. G-line explore les formes géométriques dans un design sophistiqué.',
    image: 'src/assets/gline.jpg',
    features: ['Géométrie pure', 'Design graphique', 'Lignes structurées', 'Modernité affirmée'],
    astoriUrl: 'https://astori.ua/interior-doors/g-line',
    style: ['Moderne', 'Géométrique']
  },
  {
    id: 'hide',
    name: 'Hide',
    nameEn: 'Hide Collection',
    description: 'Discrétion et intégration parfaite. Hide propose des portes qui se fondent harmonieusement dans votre architecture.',
    image: 'src/assets/hide.jpg',
    features: ['Design discret', 'Intégration architecturale', 'Finitions invisibles', 'Esthétique épurée'],
    astoriUrl: 'https://astori.ua/interior-doors/hide',
    style: ['Minimaliste', 'Invisible']
  },
  {
    id: 'isy',
    name: 'Isy',
    nameEn: 'Isy Collection',
    description: 'Simplicité et facilité d\'usage. Collection Isy combine fonctionnalité et design accessible.',
    image: 'src/assets/isy.jpg',
    features: ['Design simple', 'Utilisation facile', 'Esthétique accessible', 'Polyvalence'],
    astoriUrl: 'https://astori.ua/interior-doors/isy',
    style: ['Moderne', 'Fonctionnel']
  },
  {
    id: 'loft',
    name: 'Loft',
    nameEn: 'Loft Collection',
    description: 'Style industriel chic. Loft apporte le caractère urbain et l\'authenticité des espaces industriels réinventés.',
    image: 'src/assets/loft.jpg',
    features: ['Style industriel', 'Design urbain', 'Caractère affirmé', 'Matériaux bruts'],
    astoriUrl: 'https://astori.ua/interior-doors/loft',
    style: ['Loft', 'Industriel']
  },
  {
    id: 'invisible-line',
    name: 'Invisible Line',
    nameEn: 'Invisible Line Collection',
    description: 'L\'art de l\'invisibilité architecturale. Des portes qui disparaissent dans les murs pour un design épuré absolu.',
    image: 'src/assets/line.jpg',
    features: ['Portes invisibles', 'Intégration totale', 'Design ultra-épuré', 'Esthétique invisible'],
    astoriUrl: 'https://astori.ua/interior-doors/invisible-line',
    style: ['Minimaliste', 'Invisible']
  },
  {
    id: 'porta',
    name: 'Porta',
    nameEn: 'Porta Collection',
    description: 'Classicisme revisité avec modernité. Porta offre l\'élégance intemporelle dans un design contemporain.',
    image: 'src/assets/porta.jpg',
    features: ['Style classique moderne', 'Élégance intemporelle', 'Qualité artisanale', 'Finitions nobles'],
    astoriUrl: 'https://astori.ua/interior-doors/porta',
    style: ['Néoclassique', 'Moderne']
  },
  {
    id: 'krio',
    name: 'Krio',
    nameEn: 'Krio Collection',
    description: 'Fraîcheur et pureté du design. Krio propose des lignes nettes et des couleurs claires pour espaces lumineux.',
    image: 'src/assets/krio.jpg',
    features: ['Design pur', 'Couleurs claires', 'Lignes nettes', 'Luminosité maximale'],
    astoriUrl: 'https://astori.ua/interior-doors/krio',
    style: ['Moderne', 'Lumineux']
  },
  {
    id: 'joy',
    name: 'Joy',
    nameEn: 'Joy Collection',
    description: 'La joie du design coloré. Joy apporte de la personnalité et de la couleur dans vos intérieurs.',
    image: 'src/assets/joy.jpg',
    features: ['Design joyeux', 'Options colorées', 'Personnalité affirmée', 'Ambiance positive'],
    astoriUrl: 'https://astori.ua/interior-doors/joy',
    style: ['Moderne', 'Coloré']
  }
];

const materials: Material[] = [
  {
    name: 'HPL & Placage',
    description: 'Finitions haute pression et placages bois naturels pour une durabilité exceptionnelle',
    icon: Package,
  },
  {
    name: 'Verre & Pierre',
    description: 'Insertions en verre design et finitions pierre pour des effets visuels uniques',
    icon: Palette,
  },
  {
    name: 'Peinture Premium',
    description: 'Systèmes de peinture professionnels avec finitions mates, satinées ou brillantes',
    icon: Shield,
  },
];

export function DoorsCataloguePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);

  const generatePDF = async (): Promise<void> => {
    try {
      // Create a temporary container for PDF content - visible but behind
      const pdfContainer = document.createElement('div');
      pdfContainer.style.cssText = `
        position: absolute;
        left: 0;
        top: 0;
        width: 210mm;
        padding: 25mm;
        background-color: #FAFAF9;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        color: #2A2522;
        z-index: -1;
      `;
      
      // Build PDF content with better spacing
      pdfContainer.innerHTML = `
        <div style="text-align: center; margin-bottom: 40px; padding-bottom: 25px; border-bottom: 2px solid rgba(0,0,0,0.1);">
          <h1 style="font-size: 32px; font-weight: bold; margin-bottom: 18px; color: #2A2522; letter-spacing: 1px;">
            CATALOGUE PORTES ASTORI
          </h1>
          <p style="font-size: 15px; color: #5A5A5A; margin-bottom: 10px; font-weight: 500;">
            Distributeur exclusif Entourage AV - Collections Premium
          </p>
          <p style="font-size: 13px; color: #5A5A5A;">www.entourage-av.com</p>
        </div>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 40px;">
          ${astoriCollections.map(collection => `
            <div style="border: 1px solid rgba(0,0,0,0.15); border-radius: 8px; padding: 18px; background: white; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
              <div style="width: 100%; height: 140px; background: #f5f5f5; border-radius: 6px; margin-bottom: 15px; display: flex; align-items: center; justify-content: center; overflow: hidden;">
                <img 
                  src="${collection.image}" 
                  alt="${collection.name}"
                  style="width: 100%; height: 100%; object-fit: cover;"
                />
              </div>
              <h3 style="font-size: 16px; font-weight: bold; margin-bottom: 10px; color: #2A2522;">
                ${collection.name}
              </h3>
              <p style="font-size: 11px; color: #5A5A5A; margin-bottom: 12px; line-height: 1.5;">
                ${collection.description}
              </p>
              <div style="margin-bottom: 12px;">
                ${collection.features.map(feature => `
                  <div style="display: flex; align-items: center; margin-bottom: 5px;">
                    <div style="width: 5px; height: 5px; background: #2A2522; border-radius: 50%; margin-right: 8px; flex-shrink: 0;"></div>
                    <span style="font-size: 10px; color: #5A5A5A;">${feature}</span>
                  </div>
                `).join('')}
              </div>
              <p style="font-size: 9px; color: #999; font-style: italic; margin-top: 10px; padding-top: 10px; border-top: 1px solid rgba(0,0,0,0.05);">
                ${collection.astoriUrl}
              </p>
            </div>
          `).join('')}
        </div>
        
        <div style="padding: 25px; background: rgba(0,0,0,0.03); border-radius: 8px; margin-bottom: 30px; border: 1px solid rgba(0,0,0,0.08);">
          <h2 style="font-size: 20px; font-weight: bold; margin-bottom: 20px; text-align: center; color: #2A2522; letter-spacing: 0.5px;">
            MATÉRIAUX ET FINITIONS ASTORI
          </h2>
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px;">
            ${materials.map(material => `
              <div style="text-align: center; padding: 12px;">
                <h3 style="font-size: 13px; font-weight: bold; margin-bottom: 8px; color: #2A2522;">
                  ${material.name}
                </h3>
                <p style="font-size: 11px; color: #5A5A5A; line-height: 1.5;">
                  ${material.description}
                </p>
              </div>
            `).join('')}
          </div>
        </div>
        
        <div style="text-align: center; font-size: 11px; color: #5A5A5A; margin-top: 30px; padding-top: 25px; border-top: 2px solid rgba(0,0,0,0.1);">
          <p style="font-weight: bold; margin-bottom: 12px; font-size: 13px; color: #2A2522;">
            Entourage AV - Distributeur Exclusif Astori en France
          </p>
          <p style="margin-bottom: 8px;">
            Catalogue officiel Astori - ${astoriCollections.length} collections disponibles
          </p>
          <p style="margin-bottom: 8px;">
            Pour plus d'informations ou pour un devis personnalisé :
          </p>
          <p style="margin-bottom: 15px; font-weight: 500;">
            contact@entourage-av.com | +33 1 23 45 67 89
          </p>
          <p style="font-size: 10px; margin-bottom: 5px; color: #999;">
            Catalogue généré le ${new Date().toLocaleDateString('fr-FR')}
          </p>
          <p style="font-size: 10px; color: #999;">
            Source: https://astori.ua/interior-doors
          </p>
        </div>
      `;
      
      document.body.appendChild(pdfContainer);
      
      // Wait for images to load
      const images = pdfContainer.querySelectorAll('img');
      await Promise.all(
        Array.from(images).map(img => {
          return new Promise((resolve) => {
            if (img.complete) {
              resolve(true);
            } else {
              img.onload = () => resolve(true);
              img.onerror = () => resolve(true); // Continue even if image fails
              // Timeout after 5 seconds
              setTimeout(() => resolve(true), 5000);
            }
          });
        })
      );
      
      // Small delay to ensure rendering
      await new Promise(resolve => setTimeout(resolve, 100));

      // Convert to canvas with better options
      const canvas = await html2canvas(pdfContainer, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false,
        backgroundColor: '#FAFAF9',
      });

      // Create PDF
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true
      });

      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      let heightLeft = imgHeight;
      let position = 0;

      // Add first page
      pdf.addImage(
        canvas.toDataURL('image/jpeg', 0.95), 
        'JPEG', 
        0, 
        position, 
        imgWidth, 
        imgHeight,
        undefined,
        'FAST'
      );
      heightLeft -= pageHeight;

      // Add additional pages if needed
      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(
          canvas.toDataURL('image/jpeg', 0.95), 
          'JPEG', 
          0, 
          position, 
          imgWidth, 
          imgHeight,
          undefined,
          'FAST'
        );
        heightLeft -= pageHeight;
      }

      // Save the PDF
      pdf.save('Catalogue-Portes-Astori-EntourageAV.pdf');
      
      // Clean up
      document.body.removeChild(pdfContainer);

    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Erreur lors de la génération du PDF. Veuillez réessayer ou contacter le support.');
    }
  };

  const handleDownloadCatalogue = (): void => {
    generatePDF();
  };

  const handleVisitAstori = (url: string): void => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  useEffect(() => {
    // Hero animation
    if (heroRef.current) {
      gsap.fromTo(
        heroRef.current.querySelectorAll('.animate-in'),
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
        }
      );
    }

    // Categories animation
    if (categoriesRef.current) {
      const cards = categoriesRef.current.querySelectorAll('.category-card');
      
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 80, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#FAFAF9]">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[50vh] flex items-center justify-center px-4 pt-32 pb-20">
        <FilmGrainTexture id="doorsHeroGrain" opacity={0.04} withVignette={true} vignetteIntensity={0.15} />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
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
            <span className="text-sm font-medium" style={{ color: '#2A2522' }}>DISTRIBUTEUR EXCLUSIF ASTORI</span>
          </div>
          
          <PremiumTextReveal>
            <h1 className="text-5xl sm:text-6xl lg:text-8xl font-bold mb-6 leading-[0.9]" style={{ color: '#2A2522' }}>
              COLLECTIONS<br />ASTORI DISPONIBLES
            </h1>
          </PremiumTextReveal>
          
          <p className="text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed mb-6" style={{ color: '#5A5A5A' }}>
            Portes intérieures italiennes premium. Du minimalisme au style industriel, découvrez toute la gamme Astori exclusivement chez Entourage AV.
          </p>

          <p className="text-sm text-[#5A5A5A] mb-8 italic">
            Partenariat officiel avec Astori UA - Fabricant ukrainien de portes italiennes d'exception
          </p>

          {/* Download Catalogue Button */}
          <button
            onClick={handleDownloadCatalogue}
            className="inline-flex items-center justify-center gap-3 px-10 py-5 font-medium transition-all duration-300 hover:scale-105"
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
            <Download className="w-5 h-5" />
            <span className="uppercase tracking-wider text-sm font-bold">
              Télécharger Catalogue Complet
            </span>
          </button>
        </div>
      </section>

      {/* Collections Grid Section */}
      <section ref={categoriesRef} className="py-20 px-4 bg-[#FAFAF9]">
        <div className="max-w-7xl mx-auto">
          <div 
            className="p-8 mb-16 text-center"
            style={{
              background: 'rgba(255, 255, 255, 0.4)',
              backdropFilter: 'blur(40px) saturate(180%)',
              WebkitBackdropFilter: 'blur(40px) saturate(180%)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              clipPath: 'polygon(12px 0, calc(100% - 12px) 0, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px), 0 12px)',
            }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6" style={{ color: '#2A2522' }}>
              Collections Astori - Catalogue Complet
            </h2>
            <p className="text-lg max-w-3xl mx-auto leading-relaxed" style={{ color: '#5A5A5A' }}>
              Collections uniques pour répondre à tous les styles d'intérieur. Du minimalisme scandinave au design industriel loft, en passant par l'élégance néoclassique.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {astoriCollections.map((collection) => (
              <div key={collection.id} className="category-card group">
                <div
                  className="h-full overflow-hidden transition-all duration-500 hover:scale-[1.02] flex flex-col"
                  style={{
                    background: 'rgba(255, 255, 255, 0.4)',
                    backdropFilter: 'blur(40px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(40px) saturate(180%)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    clipPath: 'polygon(12px 0, calc(100% - 12px) 0, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px), 0 12px)',
                  }}
                >
                  {/* Image */}
                  <div className="p-6 pb-4">
                    <div 
                      className="relative h-64 overflow-hidden"
                      style={{
                        clipPath: 'polygon(12px 0, calc(100% - 12px) 0, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px), 0 12px)',
                      }}
                    >
                      <img
                        src={collection.image}
                        alt={collection.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 pt-0 flex-1 flex flex-col">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-2xl font-bold" style={{ color: '#2A2522' }}>
                          {collection.name}
                        </h3>
                        <div className="flex gap-2 mt-2">
                          {collection.style.map((style, idx) => (
                            <span 
                              key={idx}
                              className="text-xs px-2 py-1 rounded"
                              style={{ 
                                backgroundColor: 'rgba(0,0,0,0.05)',
                                color: '#5A5A5A'
                              }}
                            >
                              {style}
                            </span>
                          ))}
                        </div>
                      </div>
                      <button
                        onClick={() => handleVisitAstori(collection.astoriUrl)}
                        className="flex items-center gap-1 text-xs uppercase tracking-wider font-medium opacity-70 hover:opacity-100 transition-opacity"
                        style={{ color: '#2A2522' }}
                      >
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    </div>
                    <p className="text-sm leading-relaxed mb-6" style={{ color: '#5A5A5A' }}>
                      {collection.description}
                    </p>

                    {/* Features */}
                    <div className="space-y-2 mb-6">
                      {collection.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <Check className="w-4 h-4 flex-shrink-0" style={{ color: '#2A2522' }} />
                          <span className="text-xs" style={{ color: '#5A5A5A' }}>{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTA Buttons */}
                    <div className="mt-auto pt-4 border-t border-white/20 flex flex-col gap-3">
                      <Link
                        to="/contact"
                        className="inline-flex items-center justify-center gap-2 w-full px-4 py-3 text-sm font-medium transition-all duration-300 hover:scale-105"
                        style={{
                          background: 'rgba(0, 0, 0, 0.85)',
                          backdropFilter: 'blur(40px) saturate(180%)',
                          WebkitBackdropFilter: 'blur(40px) saturate(180%)',
                          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.06)',
                          border: '1px solid rgba(80, 80, 80, 0.25)',
                          clipPath: 'polygon(8px 0, calc(100% - 8px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px), 0 8px)',
                          color: 'var(--color-base-cream)',
                        }}
                      >
                        <span>Demander un devis</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                      
                      <button
                        onClick={() => handleVisitAstori(collection.astoriUrl)}
                        className="inline-flex items-center justify-center gap-2 w-full px-4 py-3 text-sm font-medium transition-all duration-300 hover:scale-105"
                        style={{
                          background: 'rgba(255, 255, 255, 0.6)',
                          backdropFilter: 'blur(40px) saturate(180%)',
                          WebkitBackdropFilter: 'blur(40px) saturate(180%)',
                          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                          border: '1px solid rgba(255, 255, 255, 0.3)',
                          clipPath: 'polygon(8px 0, calc(100% - 8px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px), 0 8px)',
                          color: '#2A2522',
                        }}
                      >
                        <span>Voir modèles Astori</span>
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Materials Section */}
      <section className="py-20 px-4 bg-[#FAFAF9]">
        <div className="max-w-7xl mx-auto">
          <div 
            className="p-8 mb-16 text-center"
            style={{
              background: 'rgba(255, 255, 255, 0.4)',
              backdropFilter: 'blur(40px) saturate(180%)',
              WebkitBackdropFilter: 'blur(40px) saturate(180%)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              clipPath: 'polygon(12px 0, calc(100% - 12px) 0, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px), 0 12px)',
            }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6" style={{ color: '#2A2522' }}>
              Excellence Astori - Matériaux & Finitions
            </h2>
            <p className="text-lg max-w-3xl mx-auto leading-relaxed" style={{ color: '#5A5A5A' }}>
              Portes fabriquées en Ukraine selon les standards de qualité italiens
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {materials.map((material, index) => (
              <div 
                key={index}
                className="p-8 text-center"
                style={{
                  background: 'rgba(255, 255, 255, 0.4)',
                  backdropFilter: 'blur(40px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(40px) saturate(180%)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  clipPath: 'polygon(12px 0, calc(100% - 12px) 0, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px), 0 12px)',
                }}
              >
                <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                  <material.icon className="w-10 h-10" style={{ color: '#2A2522' }} />
                </div>
                <h3 className="text-xl font-bold mb-3" style={{ color: '#2A2522' }}>{material.name}</h3>
                <p className="leading-relaxed" style={{ color: '#5A5A5A' }}>{material.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-[#FAFAF9]">
        <div className="max-w-7xl mx-auto">
          <div 
            className="p-12 text-center"
            style={{
              background: 'rgba(255, 255, 255, 0.4)',
              backdropFilter: 'blur(40px) saturate(180%)',
              WebkitBackdropFilter: 'blur(40px) saturate(180%)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              clipPath: 'polygon(16px 0, calc(100% - 16px) 0, 100% 16px, 100% calc(100% - 16px), calc(100% - 16px) 100%, 16px 100%, 0 calc(100% - 16px), 0 16px)',
            }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6" style={{ color: '#2A2522' }}>
              Distributeur Officiel Astori en France
            </h2>
            <p className="text-lg mb-6 leading-relaxed max-w-2xl mx-auto" style={{ color: '#5A5A5A' }}>
              Entourage AV est fier de proposer l'intégralité du catalogue Astori. Des centaines de modèles pour votre projet de rénovation.
            </p>
            <p className="text-sm mb-8 italic" style={{ color: '#5A5A5A' }}>
              Partenariat officiel avec Astori UA (astori.ua) - Qualité italienne, fabrication ukrainienne
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleDownloadCatalogue}
                className="inline-flex items-center justify-center gap-3 px-10 py-5 font-medium transition-all duration-300 hover:scale-105"
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
                <Download className="w-5 h-5" />
                <span className="uppercase tracking-wider text-sm font-bold">
                  PDF - Collections
                </span>
              </button>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-3 px-10 py-5 font-medium transition-all duration-300 hover:scale-105"
                style={{
                  background: 'rgba(255, 255, 255, 0.6)',
                  backdropFilter: 'blur(40px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(40px) saturate(180%)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                  border: '1px solid rgba(255, 255, 255, 0.5)',
                  clipPath: 'polygon(12px 0, calc(100% - 12px) 0, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px), 0 12px)',
                  color: '#2A2522',
                }}
              >
                <span className="uppercase tracking-wider text-sm font-bold">Demander un Devis</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <button
                onClick={() => handleVisitAstori('https://astori.ua/interior-doors')}
                className="inline-flex items-center justify-center gap-3 px-10 py-5 font-medium transition-all duration-300 hover:scale-105"
                style={{
                  background: 'rgba(42, 37, 34, 0.1)',
                  backdropFilter: 'blur(40px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(40px) saturate(180%)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                  border: '1px solid rgba(42, 37, 34, 0.2)',
                  clipPath: 'polygon(12px 0, calc(100% - 12px) 0, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px), 0 12px)',
                  color: '#2A2522',
                }}
              >
                <span className="uppercase tracking-wider text-sm font-bold">Catalogue Astori</span>
                <ExternalLink className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}