import { useParams, Link, useNavigate } from 'react-router';
import { useEffect, useRef, useState } from 'react';
import { gsap } from '../shared/lib/gsap-init';
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Tag,
  Share2,
  ArrowRight,
} from 'lucide-react';
import { PremiumTextReveal } from '../shared/ui/PremiumTextReveal';
import { getBlogPostBySlug, getRelatedPosts } from '../services/blogAPI';
import type { BlogPost } from '../services/blogAPI';
import { LoadingSpinner } from '../shared/ui/LoadingSpinner';
import { getImageUrl } from '../shared/utils/images';

export function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (slug) {
      loadPost();
    }
  }, [slug]);

  const loadPost = async () => {
    try {
      setLoading(true);
      const data = await getBlogPostBySlug(slug!);
      setPost(data);
      // Fetch related posts in same category, excluding current
      if (data.category && data.id) {
        const related = await getRelatedPosts(data.category, data.id, 2);
        setRelatedPosts(related);
      }
    } catch (err) {
      setError('Article non trouvé');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    if (heroRef.current && post) {
      gsap.fromTo(
        heroRef.current.querySelectorAll('.animate-in'),
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: 'power3.out' }
      );
    }

    if (contentRef.current && post) {
      contentRef.current.querySelectorAll('.fade-in-section').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 60 },
          {
            opacity: 1, y: 0, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
          }
        );
      });
    }
  }, [post]);

  const formatDate = (post: BlogPost) => {
    if (post.date) return post.date;
    return new Date(post.created_at).toLocaleDateString('fr-FR', {
      year: 'numeric', month: 'long', day: 'numeric',
    });
  };

  const formatContent = (content: string) => {
    return content.split('\n\n').map((paragraph, index) => {
      if (paragraph.startsWith('## ')) {
        return (
          <h2 key={index} className="text-2xl sm:text-3xl font-bold mt-12 mb-6" style={{ color: '#2A2522' }}>
            {paragraph.replace('## ', '')}
          </h2>
        );
      }
      return (
        <p key={index} className="text-lg leading-relaxed mb-6" style={{ color: '#5A5A5A' }}>
          {paragraph}
        </p>
      );
    });
  };

  if (loading) return <LoadingSpinner fullScreen text="Chargement de l'article..." />;

  if (error || !post) {
    return (
      <div className="min-h-screen bg-[#FAFAF9] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4" style={{ color: '#2A2522' }}>Article non trouvé</h1>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 font-medium transition-all duration-300"
            style={{
              background: 'rgba(0, 0, 0, 0.85)',
              color: 'var(--color-base-cream)',
              clipPath: 'polygon(8px 0, calc(100% - 8px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px), 0 8px)',
            }}
          >
            <ArrowLeft className="w-5 h-5" />
            Retour au blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAF9]">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[60vh] flex items-center justify-center px-4 pt-32 pb-20">
        <div className="max-w-4xl mx-auto w-full relative z-10">
          {/* Back Button */}
          <button
            onClick={() => navigate('/blog')}
            className="inline-flex items-center gap-2 px-6 py-3 mb-8 font-medium transition-all duration-300 hover:scale-105 animate-in"
            style={{
              background: 'rgba(255, 255, 255, 0.6)',
              backdropFilter: 'blur(40px) saturate(180%)',
              WebkitBackdropFilter: 'blur(40px) saturate(180%)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
              border: '1px solid rgba(255, 255, 255, 0.5)',
              clipPath: 'polygon(8px 0, calc(100% - 8px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px), 0 8px)',
              color: '#2A2522',
            }}
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Retour au blog</span>
          </button>

          <div
            className="inline-flex px-6 py-3 mb-6 animate-in"
            style={{
              background: 'rgba(255, 255, 255, 0.4)',
              backdropFilter: 'blur(40px) saturate(180%)',
              WebkitBackdropFilter: 'blur(40px) saturate(180%)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              clipPath: 'polygon(8px 0, calc(100% - 8px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px), 0 8px)',
            }}
          >
            <span className="text-sm font-medium" style={{ color: '#2A2522' }}>{post.category}</span>
          </div>

          <PremiumTextReveal>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 leading-[0.95]" style={{ color: '#2A2522' }}>
              {post.title}
            </h1>
          </PremiumTextReveal>

          <div className="flex flex-wrap gap-4 mb-6 animate-in">
            {post.author && (
              <div className="flex items-center gap-2" style={{ color: '#5A5A5A' }}>
                <User className="w-5 h-5" />
                <span className="font-medium">{post.author}</span>
              </div>
            )}
            <div className="flex items-center gap-2" style={{ color: '#5A5A5A' }}>
              <Calendar className="w-5 h-5" />
              <span className="font-medium">{formatDate(post)}</span>
            </div>
            {post.read_time && (
              <div className="flex items-center gap-2" style={{ color: '#5A5A5A' }}>
                <Clock className="w-5 h-5" />
                <span className="font-medium">{post.read_time} de lecture</span>
              </div>
            )}
          </div>

          <p className="text-lg sm:text-xl max-w-3xl leading-relaxed animate-in" style={{ color: '#5A5A5A' }}>
            {post.excerpt}
          </p>
        </div>
      </section>

      {/* Featured Image */}
      {post.image && (
        <section className="py-12 px-4 bg-[#FAFAF9]">
          <div className="max-w-5xl mx-auto">
            <div
              className="overflow-hidden"
              style={{
                clipPath: 'polygon(16px 0, calc(100% - 16px) 0, 100% 16px, 100% calc(100% - 16px), calc(100% - 16px) 100%, 16px 100%, 0 calc(100% - 16px), 0 16px)',
              }}
            >
              <img
                src={getImageUrl(post.image)}
                alt={post.title}
                className="w-full h-[400px] sm:h-[500px] object-cover"
              />
            </div>
          </div>
        </section>
      )}

      {/* Main Content */}
      <section ref={contentRef} className="py-20 px-4 bg-[#FAFAF9]">
        <div className="max-w-4xl mx-auto space-y-16">

          {/* Article Content */}
          <div
            className="fade-in-section p-8 sm:p-12"
            style={{
              background: 'rgba(255, 255, 255, 0.4)',
              backdropFilter: 'blur(40px) saturate(180%)',
              WebkitBackdropFilter: 'blur(40px) saturate(180%)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              clipPath: 'polygon(12px 0, calc(100% - 12px) 0, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px), 0 12px)',
            }}
          >
            <div className="prose prose-lg max-w-none">
              {post.content ? formatContent(post.content) : (
                <p className="text-lg leading-relaxed" style={{ color: '#5A5A5A' }}>{post.excerpt}</p>
              )}
            </div>

            {/* Footer Meta */}
            <div className="mt-12 pt-8 border-t border-white/20 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2" style={{ color: '#5A5A5A' }}>
                <Tag className="w-5 h-5" />
                <span className="font-medium">{post.category}</span>
              </div>
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({ title: post.title, text: post.excerpt, url: window.location.href });
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                  }
                }}
                className="flex items-center gap-2 px-4 py-2 font-medium transition-all duration-300 hover:scale-105"
                style={{
                  background: 'rgba(255, 255, 255, 0.6)',
                  color: '#2A2522',
                  clipPath: 'polygon(6px 0, calc(100% - 6px) 0, 100% 6px, 100% calc(100% - 6px), calc(100% - 6px) 100%, 6px 100%, 0 calc(100% - 6px), 0 6px)',
                }}
              >
                <Share2 className="w-4 h-4" />
                <span className="text-sm">Partager</span>
              </button>
            </div>
          </div>

          {/* Related Articles */}
          {relatedPosts.length > 0 && (
            <div className="fade-in-section">
              <h2 className="text-3xl font-bold mb-8" style={{ color: '#2A2522' }}>Articles Similaires</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Link key={relatedPost.slug} to={`/blog/${relatedPost.slug}`} className="block group">
                    <div
                      className="overflow-hidden transition-all duration-500 hover:scale-105 flex flex-col h-full"
                      style={{
                        background: 'rgba(255, 255, 255, 0.4)',
                        backdropFilter: 'blur(40px) saturate(180%)',
                        WebkitBackdropFilter: 'blur(40px) saturate(180%)',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        clipPath: 'polygon(12px 0, calc(100% - 12px) 0, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px), 0 12px)',
                      }}
                    >
                      {relatedPost.image && (
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={getImageUrl(relatedPost.image)}
                            alt={relatedPost.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                        </div>
                      )}
                      <div className="p-6 flex-1 flex flex-col">
                        <div className="flex items-center gap-2 text-xs mb-3" style={{ color: '#5A5A5A' }}>
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(relatedPost)}</span>
                        </div>
                        <h3 className="text-xl font-bold mb-2 flex-1" style={{ color: '#2A2522' }}>{relatedPost.title}</h3>
                        <p className="text-sm leading-relaxed mb-4" style={{ color: '#5A5A5A' }}>{relatedPost.excerpt}</p>
                        <div className="flex items-center gap-2 text-sm font-medium group-hover:gap-3 transition-all" style={{ color: '#2A2522' }}>
                          <span>Lire la suite</span>
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div
            className="fade-in-section p-12 text-center"
            style={{
              background: 'rgba(255, 255, 255, 0.4)',
              backdropFilter: 'blur(40px) saturate(180%)',
              WebkitBackdropFilter: 'blur(40px) saturate(180%)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              clipPath: 'polygon(16px 0, calc(100% - 16px) 0, 100% 16px, 100% calc(100% - 16px), calc(100% - 16px) 100%, 16px 100%, 0 calc(100% - 16px), 0 16px)',
            }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6" style={{ color: '#2A2522' }}>Un Projet en Tête ?</h2>
            <p className="text-lg mb-8 leading-relaxed max-w-2xl mx-auto" style={{ color: '#5A5A5A' }}>
              Contactez-nous pour discuter de votre projet et découvrir comment nous pouvons vous aider à le concrétiser.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
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
                <span className="uppercase tracking-wider text-sm font-bold">Contactez-Nous</span>
              </Link>
              <Link
                to="/blog"
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
                <span className="uppercase tracking-wider text-sm font-bold">Voir Tous Les Articles</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}