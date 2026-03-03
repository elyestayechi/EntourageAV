import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import { gsap } from '../../shared/lib/gsap-init';
import { ArrowRight } from 'lucide-react';
import { getFeaturedProjects, getAllProjects } from '../../services/projectsAPI';

const FALLBACK_PROJECTS = [
  {
    id: -1,
    title: 'Rénovation Complète',
    description: "Transformation d'un appartement parisien en espace moderne et lumineux.",
    category: 'Résidentiel',
    location: 'Paris',
    slug: '',
    images: [{ after_image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?crop=entropy&cs=tinysrgb&fit=max&fm=webp&q=80&w=1400' }],
  },
  {
    id: -2,
    title: 'Cuisine Moderne',
    description: 'Design contemporain avec finitions haut de gamme et îlot central.',
    category: 'Cuisine',
    location: 'Lyon',
    slug: '',
    images: [{ after_image: 'https://images.unsplash.com/photo-1556909212-d5b604d0c90d?crop=entropy&cs=tinysrgb&fit=max&fm=webp&q=80&w=1400' }],
  },
  {
    id: -3,
    title: 'Salle de Bain Luxe',
    description: 'Espace détente avec matériaux premium et éclairage sophistiqué.',
    category: 'Salle de Bain',
    location: 'Marseille',
    slug: '',
    images: [{ after_image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?crop=entropy&cs=tinysrgb&fit=max&fm=webp&q=80&w=1400' }],
  },
  {
    id: -4,
    title: 'Bureau Contemporain',
    description: 'Aménagement de bureaux professionnels alliant sobriété et confort.',
    category: 'Commercial',
    location: 'Bordeaux',
    slug: '',
    images: [{ after_image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?crop=entropy&cs=tinysrgb&fit=max&fm=webp&q=80&w=1400' }],
  },
];

// Desktop 12-col asymmetric layout — row1: 7+5, row2: 5+7
// aspect: large slots get portrait (3/4), small slots get landscape (4/3)
const LAYOUT = [
  { colSpan: 'lg:col-span-7', aspect: 'aspect-[3/4]' },
  { colSpan: 'lg:col-span-5', aspect: 'aspect-[4/3]' },
  { colSpan: 'lg:col-span-5', aspect: 'aspect-[4/3]' },
  { colSpan: 'lg:col-span-7', aspect: 'aspect-[3/4]' },
];

function getImage(project: any): string {
  const pair = project.images?.[0];
  return (
    pair?.after_image  ||
    pair?.after        ||
    pair?.before_image ||
    pair?.before       ||
    project.image      ||
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1400&q=80'
  );
}

export function RecentProjects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemRefs   = useRef<(HTMLDivElement | null)[]>([]);
  const [projects, setProjects] = useState<any[]>(FALLBACK_PROJECTS);

  // Data fetching
  useEffect(() => {
    getFeaturedProjects(4)
      .then((data) => {
        if (data?.length > 0) { setProjects(data.slice(0, 4)); return null; }
        return getAllProjects();
      })
      .then((all) => { if (Array.isArray(all) && all.length > 0) setProjects(all.slice(0, 4)); })
      .catch(() => {
        getAllProjects()
          .then((d) => { if (Array.isArray(d) && d.length > 0) setProjects(d.slice(0, 4)); })
          .catch(() => {});
      });
  }, []);

  // Scroll-triggered staggered reveal
  useEffect(() => {
    if (!projects.length) return;
    const ctx = gsap.context(() => {
      itemRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { y: 60, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 1.1,
            delay: (i % 2) * 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [projects]);

  return (
    <section
      ref={sectionRef}
      id="projects"
      data-section="projects"
      className="relative bg-[#FAFAF9] py-16 sm:py-20 md:py-24 overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">

        {/* Header — hairline style matching StickyServices */}
        <div className="flex items-end justify-between mb-10 md:mb-14 pb-5
                        border-b border-[rgba(42,37,34,0.12)]">
          <div>
            <p className="text-[10px] sm:text-xs font-medium uppercase tracking-[0.25em] mb-2"
               style={{ color: '#5A5A5A' }}>
              Nos Réalisations
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-none tracking-tight"
                style={{ color: '#2A2522' }}>
              Projets récents
            </h2>
          </div>
          <span className="hidden sm:block text-xs font-mono tracking-wider pb-1"
                style={{ color: 'rgba(90,90,90,0.4)' }}>
            {String(projects.length).padStart(2, '0')} projets
          </span>
        </div>

        {/* Grid
            Mobile  : 1 column, full width
            Tablet  : 2 equal columns
            Desktop : 12-col asymmetric — LAYOUT defines each slot
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 sm:gap-4 md:gap-5">
          {projects.slice(0, 4).map((project, i) => {
            const layout  = LAYOUT[i];
            const image   = getImage(project);
            const hasSlug = !!project.slug;

            return (
              <div
                key={project.id ?? i}
                ref={(el) => { itemRefs.current[i] = el; }}
                className={`${layout.colSpan} group`}
              >
                {hasSlug ? (
                  <Link to={`/realisations/${project.slug}`} className="block">
                    <ProjectImage project={project} image={image} layout={layout} index={i} />
                  </Link>
                ) : (
                  <ProjectImage project={project} image={image} layout={layout} index={i} />
                )}
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-10 sm:mt-12 flex justify-start">
          <Link
            to="/realisations"
            className="inline-flex items-center gap-3 px-7 sm:px-8 py-3.5 sm:py-4
                       font-medium uppercase tracking-wider text-sm
                       transition-all duration-300 hover:scale-105"
            style={{
              background: 'rgba(0,0,0,0.85)',
              backdropFilter: 'blur(40px) saturate(180%)',
              WebkitBackdropFilter: 'blur(40px) saturate(180%)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06)',
              border: '1px solid rgba(80,80,80,0.25)',
              clipPath: 'polygon(12px 0, calc(100% - 12px) 0, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px), 0 12px)',
              color: 'var(--color-base-cream)',
            }}
          >
            <span>Voir toutes nos réalisations</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

// ── Extracted image block so it can live inside or outside a Link ──────────
interface ProjectImageProps {
  project: any;
  image: string;
  layout: { aspect: string };
  index: number;
}

function ProjectImage({ project, image, layout, index }: ProjectImageProps) {
  return (
    <div className={`relative overflow-hidden ${layout.aspect} w-full`}>

      {/* Photo */}
      <img
        src={image}
        alt={project.title}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover
                   transition-transform duration-700 ease-out
                   group-hover:scale-[1.04]"
      />

      {/* Warm tint */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(212,175,119,0.10) 0%, transparent 70%)',
          mixBlendMode: 'soft-light',
        }}
      />

      {/* Bottom scrim for text */}
      <div
        className="absolute inset-x-0 bottom-0 h-2/5 pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(20,16,14,0.70) 0%, transparent 100%)' }}
      />

      {/* Index — top left */}
      <div className="absolute top-4 left-4 z-10">
        <span className="text-[10px] font-mono tracking-widest"
              style={{ color: 'rgba(246,242,232,0.50)' }}>
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      {/* Category pill — top right */}
      {project.category && (
        <div className="absolute top-4 right-4 z-10">
          <span
            className="text-[10px] font-medium uppercase tracking-[0.18em] px-3 py-1"
            style={{
              background: 'rgba(255,255,255,0.10)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,0.15)',
              color: 'rgba(246,242,232,0.80)',
              clipPath: 'polygon(6px 0, calc(100% - 6px) 0, 100% 6px, 100% calc(100% - 6px), calc(100% - 6px) 100%, 6px 100%, 0 calc(100% - 6px), 0 6px)',
            }}
          >
            {project.category}
          </span>
        </div>
      )}

      {/* Hover: frosted glass description — fades up from below the title */}
      <div
        className="absolute inset-x-4 z-10 pointer-events-none
                   transition-all duration-500 ease-out
                   opacity-0 group-hover:opacity-100
                   translate-y-3 group-hover:translate-y-0"
        style={{
          bottom: 'calc(2.5rem + 36px)', // sits just above the title block
          background: 'rgba(255,255,255,0.09)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.13)',
          clipPath: 'polygon(8px 0, calc(100% - 8px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px), 0 8px)',
          padding: '12px 14px',
        }}
      >
        <p className="text-xs sm:text-sm leading-relaxed"
           style={{ color: 'rgba(246,242,232,0.82)' }}>
          {project.description}
        </p>
      </div>

      {/* Title + location — always visible at bottom */}
      <div className="absolute inset-x-0 bottom-0 z-10 px-4 pb-4">
        <h3
          className="text-base sm:text-lg md:text-xl font-bold leading-tight mb-1"
          style={{ color: '#F6F2E8' }}
        >
          {project.title}
        </h3>
        {project.location && (
          <p className="text-[10px] uppercase tracking-[0.18em]"
             style={{ color: 'rgba(246,242,232,0.50)' }}>
            {project.location}
          </p>
        )}
      </div>

    </div>
  );
}