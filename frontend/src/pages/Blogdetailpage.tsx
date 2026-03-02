import { useParams, Link, useNavigate } from 'react-router';
import { useEffect, useRef, useState } from 'react';
import { gsap } from '../shared/lib/gsap-init';
import { ArrowLeft, Calendar, Clock, User, Tag, Share2, ArrowRight } from 'lucide-react';
import { PremiumTextReveal } from '../shared/ui/PremiumTextReveal';
import { getBlogPostBySlug, getRelatedPosts } from '../services/blogAPI';
import type { BlogPost } from '../services/blogAPI';
import { LoadingSpinner } from '../shared/ui/LoadingSpinner';
import { getImageUrl } from '../shared/utils/images';

// ─── Markdown renderer ────────────────────────────────────────────────────────
// Handles: # H1, ## H2, ### H3, #### H4, **bold**, *italic*, - lists, blank-line paragraphs

function renderMarkdown(content: string): React.ReactNode[] {
  const elements: React.ReactNode[] = [];
  // Split on blank lines to get blocks
  const blocks = content.split(/\n{2,}/);

  blocks.forEach((block, blockIdx) => {
    const trimmed = block.trim();
    if (!trimmed) return;

    // #### H4
    if (trimmed.startsWith('#### ')) {
      elements.push(
        <h4 key={blockIdx} className="text-lg sm:text-xl font-bold mt-8 mb-3" style={{ color: '#2A2522' }}>
          {trimmed.replace(/^####\s+/, '')}
        </h4>
      );
      return;
    }
    // ### H3
    if (trimmed.startsWith('### ')) {
      elements.push(
        <h3 key={blockIdx} className="text-xl sm:text-2xl font-bold mt-10 mb-4" style={{ color: '#2A2522' }}>
          {trimmed.replace(/^###\s+/, '')}
        </h3>
      );
      return;
    }
    // ## H2
    if (trimmed.startsWith('## ')) {
      elements.push(
        <h2 key={blockIdx} className="text-2xl sm:text-3xl font-bold mt-12 mb-5" style={{ color: '#2A2522' }}>
          {trimmed.replace(/^##\s+/, '')}
        </h2>
      );
      return;
    }
    // # H1
    if (trimmed.startsWith('# ')) {
      elements.push(
        <h1 key={blockIdx} className="text-3xl sm:text-4xl font-bold mt-12 mb-6" style={{ color: '#2A2522' }}>
          {trimmed.replace(/^#\s+/, '')}
        </h1>
      );
      return;
    }

    // Unordered list block (lines starting with - or *)
    const lines = trimmed.split('\n');
    const isListBlock = lines.every(l => l.trim().match(/^[-*]\s+/));
    if (isListBlock) {
      elements.push(
        <ul key={blockIdx} className="list-disc list-inside space-y-2 mb-6 ml-4" style={{ color: '#5A5A5A' }}>
          {lines.map((l, i) => (
            <li key={i} className="text-base sm:text-lg leading-relaxed">
              {renderInline(l.replace(/^[-*]\s+/, ''))}
            </li>
          ))}
        </ul>
      );
      return;
    }

    // Ordered list block (lines starting with 1. 2. etc.)
    const isOrderedList = lines.every(l => l.trim().match(/^\d+\.\s+/));
    if (isOrderedList) {
      elements.push(
        <ol key={blockIdx} className="list-decimal list-inside space-y-2 mb-6 ml-4" style={{ color: '#5A5A5A' }}>
          {lines.map((l, i) => (
            <li key={i} className="text-base sm:text-lg leading-relaxed">
              {renderInline(l.replace(/^\d+\.\s+/, ''))}
            </li>
          ))}
        </ol>
      );
      return;
    }

    // Default: paragraph (rejoin any single-newline lines inside the block)
    const paragraphText = trimmed.replace(/\n/g, ' ');
    elements.push(
      <p key={blockIdx} className="text-base sm:text-lg leading-relaxed mb-6" style={{ color: '#5A5A5A' }}>
        {renderInline(paragraphText)}
      </p>
    );
  });

  return elements;
}

// Inline: **bold**, *italic*, `code`
function renderInline(text: string): React.ReactNode {
  // Split on bold/italic/code markers, keeping delimiters
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} style={{ color: '#2A2522' }}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('*') && part.endsWith('*')) {
      return <em key={i}>{part.slice(1, -1)}</em>;
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return <code key={i} className="px-1.5 py-0.5 bg-black/5 rounded text-sm font-mono">{part.slice(1, -1)}</code>;
    }
    return part;
  });
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => { if (slug) loadPost(); }, [slug]);

  const loadPost = async () => {
    try {
      setLoading(true);
      const data = await getBlogPostBySlug(slug!);
      setPost(data);
      if (data.category && data.id) {
        const related = await getRelatedPosts(data.category, data.id, 2);
        setRelatedPosts(related);
      }
    } catch { setError('Article non trouvé'); }
    finally { setLoading(false); }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (heroRef.current && post) {
      gsap.fromTo(heroRef.current.querySelectorAll('.animate-in'), { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: 'power3.out' });
    }
    if (contentRef.current && post) {
      contentRef.current.querySelectorAll('.fade-in').forEach(el => {
        gsap.fromTo(el, { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' } });
      });
    }
  }, [post]);

  const formatDate = (p: BlogPost) => {
    if (p.date) return p.date;
    return new Date(p.created_at).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  if (loading) return <LoadingSpinner fullScreen text="Chargement de l'article..." />;

  if (error || !post) {
    return (
      <div className="min-h-screen bg-[#FAFAF9] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4" style={{ color: '#2A2522' }}>Article non trouvé</h1>
          <Link to="/blog" className="inline-flex items-center gap-2 px-6 py-3 font-medium" style={{ background: 'rgba(0,0,0,0.85)', color: '#F6F2E8', clipPath: 'polygon(8px 0, calc(100% - 8px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px), 0 8px)' }}>
            <ArrowLeft className="w-5 h-5" /> Retour au blog
          </Link>
        </div>
      </div>
    );
  }

  const glassStyle: React.CSSProperties = {
    background: 'rgba(255,255,255,0.4)',
    backdropFilter: 'blur(40px) saturate(180%)',
    WebkitBackdropFilter: 'blur(40px) saturate(180%)',
    boxShadow: '0 8px 32px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.2)',
    border: '1px solid rgba(255,255,255,0.3)',
  };
  const clip12 = 'polygon(12px 0, calc(100% - 12px) 0, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px), 0 12px)';
  const clip8 = 'polygon(8px 0, calc(100% - 8px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px), 0 8px)';

  return (
    <div className="min-h-screen bg-[#FAFAF9]">
      {/* Hero */}
      <section ref={heroRef} className="relative min-h-[60vh] flex items-center justify-center px-4 pt-32 pb-20">
        <div className="max-w-4xl mx-auto w-full relative z-10">
          <button onClick={() => navigate('/blog')} className="inline-flex items-center gap-2 px-6 py-3 mb-8 font-medium transition-all hover:scale-105 animate-in"
            style={{ ...glassStyle, clipPath: clip8, color: '#2A2522' }}>
            <ArrowLeft className="w-5 h-5" /> Retour au blog
          </button>
          <div className="inline-flex px-6 py-3 mb-6 animate-in" style={{ ...glassStyle, clipPath: clip8 }}>
            <span className="text-sm font-medium" style={{ color: '#2A2522' }}>{post.category}</span>
          </div>
          <PremiumTextReveal>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 leading-[0.95]" style={{ color: '#2A2522' }}>{post.title}</h1>
          </PremiumTextReveal>
          <div className="flex flex-wrap gap-4 mb-6 animate-in">
            {post.author && <div className="flex items-center gap-2" style={{ color: '#5A5A5A' }}><User className="w-5 h-5" /><span className="font-medium">{post.author}</span></div>}
            <div className="flex items-center gap-2" style={{ color: '#5A5A5A' }}><Calendar className="w-5 h-5" /><span className="font-medium">{formatDate(post)}</span></div>
            {post.read_time && <div className="flex items-center gap-2" style={{ color: '#5A5A5A' }}><Clock className="w-5 h-5" /><span className="font-medium">{post.read_time} de lecture</span></div>}
          </div>
          <p className="text-lg sm:text-xl max-w-3xl leading-relaxed animate-in" style={{ color: '#5A5A5A' }}>{post.excerpt}</p>
        </div>
      </section>

      {/* Featured Image */}
      {post.image && (
        <section className="py-12 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="overflow-hidden" style={{ clipPath: 'polygon(16px 0, calc(100% - 16px) 0, 100% 16px, 100% calc(100% - 16px), calc(100% - 16px) 100%, 16px 100%, 0 calc(100% - 16px), 0 16px)' }}>
              <img src={getImageUrl(post.image)} alt={post.title} className="w-full h-[300px] sm:h-[450px] object-cover" />
            </div>
          </div>
        </section>
      )}

      {/* Content */}
      <section ref={contentRef} className="py-10 px-4">
        <div className="max-w-4xl mx-auto space-y-10">

          {/* Article body */}
          <div className="fade-in p-8 sm:p-12" style={{ ...glassStyle, clipPath: clip12 }}>
            <div className="prose-custom">
              {post.content
                ? renderMarkdown(post.content)
                : <p className="text-lg leading-relaxed" style={{ color: '#5A5A5A' }}>{post.excerpt}</p>
              }
            </div>

            {/* Footer meta */}
            <div className="mt-12 pt-8 border-t border-white/20 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2" style={{ color: '#5A5A5A' }}>
                <Tag className="w-5 h-5" />
                <span className="font-medium">{post.category}</span>
              </div>
              <button
                onClick={() => { if (navigator.share) { navigator.share({ title: post.title, text: post.excerpt, url: window.location.href }); } else { navigator.clipboard.writeText(window.location.href); } }}
                className="flex items-center gap-2 px-4 py-2 font-medium transition-all hover:scale-105"
                style={{ ...glassStyle, clipPath: clip8, color: '#2A2522' }}>
                <Share2 className="w-4 h-4" /><span className="text-sm">Partager</span>
              </button>
            </div>
          </div>

          {/* Related posts */}
          {relatedPosts.length > 0 && (
            <div className="fade-in">
              <h2 className="text-3xl font-bold mb-8" style={{ color: '#2A2522' }}>Articles Similaires</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedPosts.map(rel => (
                  <Link key={rel.slug} to={`/blog/${rel.slug}`} className="block group">
                    <div className="overflow-hidden transition-all duration-500 hover:scale-105 flex flex-col h-full" style={{ ...glassStyle, clipPath: clip12 }}>
                      {rel.image && (
                        <div className="relative h-48 overflow-hidden">
                          <img src={getImageUrl(rel.image)} alt={rel.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        </div>
                      )}
                      <div className="p-6 flex-1 flex flex-col">
                        <div className="flex items-center gap-2 text-xs mb-3" style={{ color: '#5A5A5A' }}><Calendar className="w-4 h-4" /><span>{formatDate(rel)}</span></div>
                        <h3 className="text-xl font-bold mb-2 flex-1" style={{ color: '#2A2522' }}>{rel.title}</h3>
                        <p className="text-sm leading-relaxed mb-4" style={{ color: '#5A5A5A' }}>{rel.excerpt}</p>
                        <div className="flex items-center gap-2 text-sm font-medium group-hover:gap-3 transition-all" style={{ color: '#2A2522' }}>
                          <span>Lire la suite</span><ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="fade-in p-12 text-center" style={{ ...glassStyle, clipPath: 'polygon(16px 0, calc(100% - 16px) 0, 100% 16px, 100% calc(100% - 16px), calc(100% - 16px) 100%, 16px 100%, 0 calc(100% - 16px), 0 16px)' }}>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6" style={{ color: '#2A2522' }}>Un Projet en Tête ?</h2>
            <p className="text-lg mb-8 leading-relaxed max-w-2xl mx-auto" style={{ color: '#5A5A5A' }}>Contactez-nous pour concrétiser vos idées.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="inline-flex items-center justify-center gap-3 px-10 py-5 font-medium transition-all hover:scale-105"
                style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(40px)', color: '#F6F2E8', clipPath: clip12, border: '1px solid rgba(80,80,80,0.25)', textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: '0.875rem', fontWeight: 700 }}>
                Contactez-Nous
              </Link>
              <Link to="/blog" className="inline-flex items-center justify-center gap-3 px-10 py-5 font-medium transition-all hover:scale-105"
                style={{ background: 'rgba(255,255,255,0.6)', backdropFilter: 'blur(40px)', color: '#2A2522', clipPath: clip12, border: '1px solid rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: '0.875rem', fontWeight: 700 }}>
                Voir Tous Les Articles
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}