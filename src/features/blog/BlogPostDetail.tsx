import { useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import { gsap } from '../../shared/lib/gsap-init';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { blogPosts } from '../../pages/BlogPage';
import { FilmGrainTexture } from '../../shared/ui/FilmGrainTexture';

export function BlogPostDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const contentRef = useRef<HTMLDivElement>(null);

  const post = blogPosts.find(p => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current.querySelectorAll('.animate-in'),
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out',
        }
      );
    }
  }, [slug]);

  if (!post) {
    return (
      <div className="min-h-screen bg-[#FAFAF9] flex items-center justify-center px-4 pt-32">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#2A2A2A] mb-6">Article non trouvé</h1>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#2A2A2A] text-white hover:scale-105 transition-all duration-300 font-medium uppercase tracking-wider text-sm"
            style={{
              border: '1px solid rgba(255, 255, 255, 0.2)',
              clipPath: 'polygon(0.5rem 0, calc(100% - 0.5rem) 0, 100% 0.5rem, 100% calc(100% - 0.5rem), calc(100% - 0.5rem) 100%, 0.5rem 100%, 0 calc(100% - 0.5rem), 0 0.5rem)',
            }}
          >
            <ArrowLeft className="w-4 h-4" />
            Retour au blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAF9]">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-end overflow-hidden">
        <FilmGrainTexture />
        <img
          src={post.image}
          alt={post.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2A2A2A]/90 via-[#2A2A2A]/50 to-transparent" />
        
        <div className="relative z-10 w-full px-4 pb-16 pt-32">
          <div className="max-w-4xl mx-auto">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm font-medium">Retour au blog</span>
            </Link>

            <div className="inline-block px-4 py-2 bg-white/20 text-white text-xs font-medium mb-6" style={{
              clipPath: 'polygon(0.3rem 0, calc(100% - 0.3rem) 0, 100% 0.3rem, 100% calc(100% - 0.3rem), calc(100% - 0.3rem) 100%, 0.3rem 100%, 0 calc(100% - 0.3rem), 0 0.3rem)',
            }}>
              {post.category}
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-white/80 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{post.date}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{post.readTime} de lecture</span>
              </div>
              <span>•</span>
              <span>Par {post.author}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section ref={contentRef} className="relative py-20 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Excerpt */}
          <div className="animate-in text-xl sm:text-2xl text-[#4A4A4A] leading-relaxed mb-12 pb-12 border-b border-gray-200">
            {post.excerpt}
          </div>

          {/* Article Content */}
          <div className="animate-in prose prose-lg max-w-none">
            {post.content?.split('\n\n').map((paragraph, index) => {
              if (paragraph.startsWith('## ')) {
                return (
                  <h2 key={index} className="text-3xl font-bold text-[#2A2A2A] mt-12 mb-6">
                    {paragraph.replace('## ', '')}
                  </h2>
                );
              }
              return (
                <p key={index} className="text-[#4A4A4A] leading-relaxed mb-6 text-lg">
                  {paragraph}
                </p>
              );
            })}
          </div>

          {/* Author */}
          <div className="animate-in mt-16 pt-12 border-t border-gray-200">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-full bg-[#2A2A2A]/10 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-[#2A2A2A]"></div>
              </div>
              <div>
                <div className="font-bold text-[#2A2A2A] mb-1">{post.author}</div>
                <div className="text-sm text-[#6A6A6A]">Expert en rénovation chez Entourage AV</div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="animate-in mt-12 p-8 sm:p-12 bg-[#2A2A2A] rounded-2xl relative overflow-hidden" style={{
            clipPath: 'polygon(1rem 0, calc(100% - 1rem) 0, 100% 1rem, 100% calc(100% - 1rem), calc(100% - 1rem) 100%, 1rem 100%, 0 calc(100% - 1rem), 0 1rem)',
          }}>
            <FilmGrainTexture />
            <div className="relative z-10">
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                Prêt à transformer votre espace ?
              </h3>
              <p className="text-white/80 mb-8 text-lg">
                Contactez-nous pour discuter de votre projet de rénovation.
              </p>
              <Link
                to="/contact"
                className="inline-block px-8 py-4 bg-white text-[#2A2A2A] hover:bg-gray-100 font-medium transition-colors"
                style={{
                  clipPath: 'polygon(0.5rem 0, calc(100% - 0.5rem) 0, 100% 0.5rem, 100% calc(100% - 0.5rem), calc(100% - 0.5rem) 100%, 0.5rem 100%, 0 calc(100% - 0.5rem), 0 0.5rem)',
                }}
              >
                Demander un devis gratuit
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      <section className="relative py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#2A2A2A] mb-12 text-center">
            Articles similaires
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts
              .filter(p => p.slug !== slug && p.category === post.category)
              .slice(0, 3)
              .map((relatedPost) => (
                <Link
                  key={relatedPost.slug}
                  to={`/blog/${relatedPost.slug}`}
                  className="group block"
                >
                  <article className="bg-[#FAFAF9] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500" style={{
                    clipPath: 'polygon(1rem 0, calc(100% - 1rem) 0, 100% 1rem, 100% calc(100% - 1rem), calc(100% - 1rem) 100%, 1rem 100%, 0 calc(100% - 1rem), 0 1rem)',
                  }}>
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={relatedPost.image}
                        alt={relatedPost.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-6">
                      <div className="text-xs text-[#6A6A6A] mb-2">{relatedPost.category}</div>
                      <h3 className="text-lg font-bold text-[#2A2A2A] mb-2 group-hover:text-[#4A4A4A] transition-colors">
                        {relatedPost.title}
                      </h3>
                      <p className="text-sm text-[#4A4A4A] line-clamp-2">
                        {relatedPost.excerpt}
                      </p>
                    </div>
                  </article>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}