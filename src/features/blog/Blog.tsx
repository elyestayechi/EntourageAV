import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router';
import { gsap, ScrollTrigger } from '../../shared/lib/gsap-init';
import { ArrowRight } from 'lucide-react';
import { BlogPostDetail } from './BlogPostDetail';
import { FilmGrainTexture } from '../../shared/ui/FilmGrainTexture';

const blogPosts = [
  {
    title: 'L\'Avenir de la Rénovation Énergétique',
    category: 'Innovation',
    date: '15 Janvier 2026',
    excerpt:
      'Découvrez comment les nouvelles technologies transforment la rénovation énergétique des bâtiments pour un avenir plus durable.',
    image: 'https://images.unsplash.com/photo-1718810456574-a0336bdff3f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidWlsZGluZyUyMHJlbm92YXRpb24lMjBlbmVyZ3l8ZW58MXx8fHwxNzY4OTk1MjExfDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    title: 'Matériaux Durables en Rénovation',
    category: 'Durabilité',
    date: '12 Janvier 2026',
    excerpt:
      'Une exploration des matériaux écologiques qui allient luxe et respect de l\'environnement dans les projets de rénovation.',
    image: 'https://images.unsplash.com/photo-1695191388218-f6259600223f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aWxlJTIwZmxvb3JpbmclMjBjZXJhbWljfGVufDF8fHx8MTc2ODk5NTIxMHww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    title: 'Tendances Design 2026',
    category: 'Design',
    date: '8 Janvier 2026',
    excerpt:
      'Les nouvelles tendances qui redéfinissent l\'esthétique intérieure moderne avec élégance et fonctionnalité.',
    image: 'https://images.unsplash.com/photo-1768321903885-d0a6798485d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnRlcmlvciUyMHJlbm92YXRpb24lMjBjb25zdHJ1Y3Rpb258ZW58MXx8fHwxNzY4OTk1MjA4fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
];

export function Blog() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const [selectedPost, setSelectedPost] = useState<typeof blogPosts[0] | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        const image = card.querySelector('[data-blog-image]');
        const content = card.querySelector('[data-blog-content]');

        // Card entrance
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 100,
            rotateX: 10,
          },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 1.2,
            delay: index * 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );

        // Image parallax
        if (image) {
          gsap.to(image, {
            y: -60,
            scale: 1.1,
            scrollTrigger: {
              trigger: card,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.5,
            },
          });
        }

        // Content parallax
        if (content) {
          gsap.to(content, {
            y: -30,
            scrollTrigger: {
              trigger: card,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 2,
            },
          });
        }

        // Hover effect
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            scale: 1.03,
            y: -10,
            duration: 0.5,
            ease: 'power2.out',
          });
          if (image) {
            gsap.to(image, {
              scale: 1.15,
              duration: 0.5,
              ease: 'power2.out',
            });
          }
        });

        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            scale: 1,
            y: 0,
            duration: 0.5,
            ease: 'power2.out',
          });
          if (image) {
            gsap.to(image, {
              scale: 1.1,
              duration: 0.5,
              ease: 'power2.out',
            });
          }
        });
      });

      // Animate the trapezoid dent morphing
      // Inner edge (25rem) stays fixed, outer edges (35rem) move
      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'bottom bottom',
          end: 'bottom top',
          scrub: 2.5,
          invalidateOnRefresh: false,
          onUpdate: (self) => {
            const progress = self.progress;
            
            // Calculate the morph progression - subtle luxury dent
            // 0 = outer edges high (initial state - -2% depth)
            // 0.5 = straight (middle - 0% depth)
            // 1 = outer edges low (final state - 2% depth)
            
            let dentDepth;
            if (progress < 0.5) {
              // From high to straight (0 to 0.5)
              const subProgress = progress / 0.5;
              dentDepth = -2 + (subProgress * 2); // -2% to 0%
            } else {
              // From straight to low (0.5 to 1)
              const subProgress = (progress - 0.5) / 0.5;
              dentDepth = subProgress * 2; // 0 to 2%
            }
            
            if (sectionRef.current) {
              // Premium small dent dimensions - wider, leaving ~20% from edges
              const innerVertical = '1.2rem';
              const outerVertical = '1.8rem';
              const innerHorizontal = '25%'; // 50% - 25% = 25% from left edge, 50% + 25% = 75% from left edge
              const outerHorizontal = '30%'; // 50% - 30% = 20% from left edge, 50% + 30% = 80% from left edge
              
              sectionRef.current.style.clipPath = `polygon(
                0 0,
                100% 0,
                100% calc(100% - ${outerVertical} - ${dentDepth}%),
                calc(50% + ${outerHorizontal}) calc(100% - ${outerVertical} - ${dentDepth}%),
                calc(50% + ${innerHorizontal}) calc(100% - ${innerVertical}),
                calc(50% - ${innerHorizontal}) calc(100% - ${innerVertical}),
                calc(50% - ${outerHorizontal}) calc(100% - ${outerVertical} - ${dentDepth}%),
                0 calc(100% - ${outerVertical} - ${dentDepth}%)
              )`;
            }
          },
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="blog"
      className="bg-[#FAFAF9] py-16 pb-24 relative overflow-visible"
      data-section="blog"
    >
      {/* Consistent film grain texture */}
      <FilmGrainTexture id="blogGrain" opacity={0.04} withVignette={true} vignetteIntensity={0.12} />

      <div className="container mx-auto px-8 relative z-10 max-w-[1400px]">
        {/* Simple inline header */}
        <div className="mb-16">
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-4" style={{ color: '#2A2522' }}>
            DERNIÈRES
          </h2>
          <h3 className="text-4xl sm:text-5xl lg:text-6xl font-bold" style={{ color: '#5A5A5A' }}>
            INSPIRATIONS
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 lg:gap-20">
          {blogPosts.map((post, index) => (
            <Link
              key={index}
              to={`/blog/${post.slug || encodeURIComponent(post.title.toLowerCase().replace(/\s+/g, '-'))}`}
              ref={(el) => {
                if (el) cardsRef.current[index] = el as HTMLDivElement;
              }}
              className="group block"
              style={{ 
                perspective: '1000px',
                background: 'rgba(255, 255, 255, 0.25)',
                backdropFilter: 'blur(30px) saturate(180%)',
                WebkitBackdropFilter: 'blur(30px) saturate(180%)',
                boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.25), inset 0 2px 4px 0 rgba(255, 255, 255, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.2)',
                border: '2px solid rgba(255, 255, 255, 0.4)',
                padding: '1.5rem',
                borderRadius: '1rem'
              }}
            >
              {/* Image */}
              <div className="frame-chamfered aspect-[4/3] overflow-hidden mb-6 relative" style={{ willChange: 'transform' }}>
                <img
                  data-blog-image
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover will-change-transform"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Category badge with glass effect */}
                <div 
                  className="btn-chamfered absolute top-4 left-4 text-white px-4 py-2 text-xs font-bold uppercase tracking-wider"
                  style={{
                    background: 'rgba(42, 42, 42, 0.7)',
                    backdropFilter: 'blur(20px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                    boxShadow: '0 4px 16px 0 rgba(0, 0, 0, 0.5), inset 0 1px 2px 0 rgba(255, 255, 255, 0.15)',
                    border: '1px solid rgba(255, 255, 255, 0.25)'
                  }}
                >
                  {post.category}
                </div>
              </div>

              {/* Content */}
              <div data-blog-content>
                <div className="text-xs text-black/40 uppercase tracking-wider mb-3">
                  {post.date}
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold text-black mb-4 leading-tight group-hover:text-[#4A4A4A] transition-colors duration-300">
                  {post.title}
                </h3>
                <p className="text-black/60 leading-relaxed text-sm lg:text-base mb-6">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#4A4A4A] font-medium group-hover:gap-4 transition-all duration-300">
                  Lire l'article
                  <span className="inline-block transition-transform group-hover:translate-x-2">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Link
            to="/blog"
            className="group inline-flex items-center gap-3 text-white px-10 py-5 text-sm font-medium uppercase tracking-wider hover:scale-105 transition-all duration-300"
            style={{
              background: 'rgba(42, 42, 42, 0.75)',
              backdropFilter: 'blur(30px) saturate(180%)',
              WebkitBackdropFilter: 'blur(30px) saturate(180%)',
              boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.5), inset 0 2px 4px 0 rgba(255, 255, 255, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.1)',
              border: '2px solid rgba(255, 255, 255, 0.25)',
              clipPath: 'polygon(0.5rem 0, calc(100% - 0.5rem) 0, 100% 0.5rem, 100% calc(100% - 0.5rem), calc(100% - 0.5rem) 100%, 0.5rem 100%, 0 calc(100% - 0.5rem), 0 0.5rem)',
            }}
          >
            <span>Voir tous les articles</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      {/* Blog Post Detail */}
      {selectedPost && (
        <BlogPostDetail
          post={selectedPost}
          onClose={() => setSelectedPost(null)}
        />
      )}
    </section>
  );
}