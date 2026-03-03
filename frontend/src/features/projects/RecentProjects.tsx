import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import { gsap } from '../../shared/lib/gsap-init';
import { ArrowRight } from 'lucide-react';
import { getFeaturedProjects, getAllProjects } from '../../services/projectsAPI';

const LAYOUT = [
  { colSpan: 'lg:col-span-7', aspect: 'aspect-[16/10]' },
  { colSpan: 'lg:col-span-5', aspect: 'aspect-[4/3]'   },
  { colSpan: 'lg:col-span-5', aspect: 'aspect-[4/3]'   },
  { colSpan: 'lg:col-span-7', aspect: 'aspect-[16/10]' },
];

function getImage(project: any): string {
  const pair = project.images?.[0];
  return project.thumbnail_image || project.image || pair?.after_image || pair?.after || pair?.before_image || pair?.before || '';
}

export function RecentProjects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemRefs   = useRef<(HTMLDivElement | null)[]>([]);
  const [projects, setProjects] = useState<any[] | null>(null);

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

  useEffect(() => {
    if (!projects?.length) return;
    const ctx = gsap.context(() => {
      itemRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(el, { y: 50, opacity: 0 }, {
          y: 0, opacity: 1, duration: 1.0,
          delay: (i % 2) * 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [projects]);

  if (!projects) return null;

  return (
    <section ref={sectionRef} id="projects" data-section="projects"
      className="relative bg-[#FAFAF9] py-16 sm:py-20 md:py-24 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">

        <div className="flex items-end justify-between mb-10 md:mb-14 pb-5 border-b border-[rgba(42,37,34,0.12)]">
          <div>
            <p className="text-[10px] sm:text-xs font-medium uppercase tracking-[0.25em] mb-2"
               style={{ color: '#5A5A5A' }}>
              Nos Realisations
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-none tracking-tight"
                style={{ color: '#2A2522' }}>
              Projets recents
            </h2>
          </div>
          <span className="hidden sm:block text-xs font-mono tracking-wider pb-1"
                style={{ color: 'rgba(90,90,90,0.4)' }}>
            {String(projects.length).padStart(2, '0')} projets
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 sm:gap-4 md:gap-5">
          {projects.map((project, i) => {
            const layout  = LAYOUT[i] ?? LAYOUT[0];
            const image   = getImage(project);
            const hasSlug = !!project.slug;
            return (
              <div key={project.id ?? i} ref={(el) => { itemRefs.current[i] = el; }}
                   className={layout.colSpan + " group"}>
                {hasSlug ? (
                  <Link to={"/realisations/" + project.slug} className="block">
                    <ProjectImage project={project} image={image} layout={layout} index={i} />
                  </Link>
                ) : (
                  <ProjectImage project={project} image={image} layout={layout} index={i} />
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-10 sm:mt-12 flex justify-center">
          <Link to="/realisations"
            className="inline-flex items-center gap-3 px-7 sm:px-8 py-3.5 sm:py-4 font-medium uppercase tracking-wider text-sm transition-all duration-300 hover:scale-105"
            style={{
              background: 'rgba(0,0,0,0.85)',
              backdropFilter: 'blur(40px) saturate(180%)',
              WebkitBackdropFilter: 'blur(40px) saturate(180%)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06)',
              border: '1px solid rgba(80,80,80,0.25)',
              clipPath: 'polygon(12px 0, calc(100% - 12px) 0, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px), 0 12px)',
              color: 'var(--color-base-cream)',
            }}>
            <span>Voir toutes nos realisations</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

interface ProjectImageProps { project: any; image: string; layout: { aspect: string }; index: number; }

function ProjectImage({ project, image, layout, index }: ProjectImageProps) {
  return (
    <div className={"relative overflow-hidden " + layout.aspect + " w-full"}>
      {image && (
        <img src={image} alt={project.title} loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]" />
      )}

      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(212,175,119,0.10) 0%, transparent 70%)', mixBlendMode: 'soft-light' }} />

      <div className="absolute inset-x-0 bottom-0 h-2/5 pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(20,16,14,0.70) 0%, transparent 100%)' }} />

      <div className="absolute top-4 left-4 z-10">
        <span className="text-[10px] font-mono tracking-widest" style={{ color: 'rgba(246,242,232,0.50)' }}>
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      {project.category && (
        <div className="absolute top-4 right-4 z-10">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] px-3 py-1"
            style={{
              background: 'rgba(255,255,255,0.10)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(246,242,232,0.80)',
              clipPath: 'polygon(6px 0, calc(100% - 6px) 0, 100% 6px, 100% calc(100% - 6px), calc(100% - 6px) 100%, 6px 100%, 0 calc(100% - 6px), 0 6px)',
            }}>
            {project.category}
          </span>
        </div>
      )}

      <div className="absolute inset-x-4 z-10 pointer-events-none transition-all duration-500 ease-out opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0"
        style={{
          bottom: 'calc(2.5rem + 32px)',
          background: 'rgba(255,255,255,0.09)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.13)',
          clipPath: 'polygon(8px 0, calc(100% - 8px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px), 0 8px)',
          padding: '12px 14px',
        }}>
        <p className="text-xs sm:text-sm leading-relaxed" style={{ color: 'rgba(246,242,232,0.82)' }}>
          {project.description}
        </p>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-10 px-4 pb-4">
        <h3 className="text-base sm:text-lg font-bold leading-tight mb-1" style={{ color: '#F6F2E8' }}>
          {project.title}
        </h3>
        {project.location && (
          <p className="text-[10px] uppercase tracking-[0.18em]" style={{ color: 'rgba(246,242,232,0.50)' }}>
            {project.location}
          </p>
        )}
      </div>
    </div>
  );
}