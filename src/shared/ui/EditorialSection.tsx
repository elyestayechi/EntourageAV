import { useRef } from 'react';
import { FilmGrainTexture } from './FilmGrainTexture';

interface EditorialItem {
  id: number;
  number: string;
  category: string;
  title: string;
  description: string;
  image: string;
}

const editorialItems: EditorialItem[] = [
  {
    id: 1,
    number: '01',
    category: 'SAVOIR-FAIRE',
    title: 'Finitions & Détails',
    description: 'Du placo-plâtre aux finitions les plus délicates, chaque détail compte. Notre maîtrise du carrelage, nos installations de portes intérieures et coupe-feu, ainsi que nos finitions complètes transforment vos espaces en véritables œuvres d\'excellence.',
    image: 'https://images.unsplash.com/photo-1601391548091-de4ff62ee29c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBmaW5pc2hpbmclMjBjYXJwZW50cnl8ZW58MXx8fHwxNzY4OTk1MjExfDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 2,
    number: '02',
    category: 'PERFORMANCE',
    title: 'Menuiseries & Énergie',
    description: 'Spécialistes des fenêtres et menuiseries aluminium et PVC, nous conjuguons isolation thermique et esthétique moderne. Nos solutions énergétiques incluent la rénovation complète de bâtiments publics pour un avenir durable.',
    image: 'https://images.unsplash.com/photo-1609342066876-dce9c0782fb7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aW5kb3clMjBpbnN0YWxsYXRpb24lMjBhbHVtaW51bXxlbnwxfHx8fDE3Njg5OTUyMDh8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 3,
    number: '03',
    category: 'EXPERTISE',
    title: 'Installations Techniques',
    description: 'Électricité complète intérieure et extérieure, plomberie et travaux sanitaires, systèmes VMC - notre expertise technique garantit des installations conformes, sécurisées et optimisées pour votre confort quotidien.',
    image: 'https://images.unsplash.com/photo-1751486289947-4f5f5961b3aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpY2FsJTIwd29yayUyMGluc3RhbGxhdGlvbnxlbnwxfHx8fDE3Njg5ODQyMDZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
];

export function EditorialSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={sectionRef}
      className="bg-[#1A1A1A] relative py-16 md:py-24"
      data-section="editorial"
    >
      {/* Consistent film grain texture */}
      <FilmGrainTexture id="editorialGrain" opacity={0.04} withVignette={true} vignetteIntensity={0.12} />

      {/* Editorial Container */}
      <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 relative max-w-[1800px]">
        <div className="space-y-24 md:space-y-32">
          {editorialItems.map((item, index) => {
            const isEven = index % 2 === 0;
            
            return (
              <div
                key={index}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-24 items-center"
              >
                {/* Content Info */}
                <div className={`lg:col-span-5 relative ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                  {/* Number */}
                  <div className="mb-6 md:mb-8">
                    <div 
                      className="text-6xl md:text-7xl lg:text-8xl font-bold opacity-20"
                      style={{ color: 'var(--color-base-cream)' }}
                    >
                      {item.number}
                    </div>
                  </div>

                  {/* Category */}
                  <div 
                    className="uppercase text-xs tracking-[0.3em] mb-4 font-medium flex items-center gap-3"
                    style={{ color: 'var(--color-base-cream)', opacity: 0.6 }}
                  >
                    <div className="w-8 h-px" style={{ background: 'var(--color-base-cream)', opacity: 0.6 }}></div>
                    {item.category}
                  </div>

                  {/* Title */}
                  <div className="mb-4">
                    <h3 
                      className="text-2xl md:text-4xl lg:text-5xl font-bold"
                      style={{ color: 'var(--color-base-cream)' }}
                    >
                      {item.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-base md:text-lg max-w-2xl text-white/70">
                    {item.description}
                  </p>
                </div>

                {/* Image */}
                <div className={`lg:col-span-7 relative block mt-8 lg:mt-0 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div 
                    className="relative w-full max-w-md lg:max-w-none mx-auto rounded-2xl overflow-hidden" 
                    style={{ 
                      aspectRatio: '4/5',
                      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />

                    {/* Subtle gradient overlay */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, transparent 50%, rgba(0,0,0,0.2) 100%)',
                      }}
                    />

                    {/* Film grain for realism */}
                    <FilmGrainTexture className="absolute inset-0 opacity-[0.025] pointer-events-none mix-blend-multiply" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}