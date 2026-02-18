import { Link } from 'react-router';
import { useState, useRef, useEffect } from 'react';
import { gsap } from '../shared/lib/gsap-init';
import { ArrowRight, Calendar, Search, Tag } from 'lucide-react';
import { FilmGrainTexture } from '../shared/ui/FilmGrainTexture';
import { PremiumTextReveal } from '../shared/ui/PremiumTextReveal';

export interface BlogPost {
  slug: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  content?: string;
  image: string;
  author: string;
  readTime: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'avenir-renovation-energetique',
    title: 'L\'Avenir de la Rénovation Énergétique',
    category: 'Innovation',
    date: '15 Janvier 2026',
    excerpt: 'Découvrez comment les nouvelles technologies transforment la rénovation énergétique des bâtiments pour un avenir plus durable.',
    content: `La rénovation énergétique connaît une véritable révolution technologique. Les nouvelles solutions permettent aujourd'hui de réduire drastiquement la consommation énergétique des bâtiments tout en améliorant le confort de vie.

## Les technologies émergentes

Les pompes à chaleur de dernière génération, les systèmes de ventilation intelligents et l'isolation biosourcée offrent des performances exceptionnelles. Ces innovations permettent de diviser par deux, voire par trois, les factures énergétiques.

## Les aides financières

L'État propose de nombreuses aides pour financer vos travaux de rénovation énergétique : MaPrimeRénov', éco-PTZ, CEE. Notre équipe vous accompagne dans toutes les démarches administratives.

## Retour sur investissement

Avec les économies d'énergie réalisées, un projet de rénovation énergétique est généralement rentabilisé en 5 à 10 ans, tout en valorisant votre patrimoine immobilier.`,
    image: 'https://images.unsplash.com/photo-1718810456574-a0336bdff3f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidWlsZGluZyUyMHJlbm92YXRpb24lMjBlbmVyZ3l8ZW58MXx8fHwxNzY4OTk1MjExfDA&ixlib=rb-4.1.0&q=80&w=1080',
    author: 'Sophie Martin',
    readTime: '5 min',
  },
  {
    slug: 'materiaux-durables-renovation',
    title: 'Matériaux Durables en Rénovation',
    category: 'Durabilité',
    date: '12 Janvier 2026',
    excerpt: 'Une exploration des matériaux écologiques qui allient luxe et respect de l\'environnement dans les projets de rénovation.',
    content: `Le choix des matériaux est crucial dans tout projet de rénovation. Aujourd'hui, il est possible d'allier esthétique haut de gamme et respect de l'environnement.

## Le bois local

Privilégier le bois issu de forêts gérées durablement apporte chaleur et authenticité à vos espaces. Parquets, menuiseries, structures : le bois s'adapte à tous les usages.

## Les isolants biosourcés

Chanvre, ouate de cellulose, laine de bois : ces isolants naturels offrent d'excellentes performances thermiques et acoustiques, tout en régulant l'humidité.

## Les peintures écologiques

Sans COV, à base de composants naturels, les peintures écologiques garantissent un air intérieur sain et des finitions irréprochables.

## L'avenir est durable

Choisir des matériaux durables, c'est investir dans la qualité, la santé et la préservation de notre environnement.`,
    image: 'https://images.unsplash.com/photo-1695191388218-f6259600223f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aWxlJTIwZmxvb3JpbmclMjBjZXJhbWljfGVufDF8fHx8MTc2ODk5NTIxMHww&ixlib=rb-4.1.0&q=80&w=1080',
    author: 'Marc Dubois',
    readTime: '4 min',
  },
  {
    slug: 'tendances-design-2026',
    title: 'Tendances Design 2026',
    category: 'Design',
    date: '8 Janvier 2026',
    excerpt: 'Les nouvelles tendances qui redéfinissent l\'esthétique intérieure moderne avec élégance et fonctionnalité.',
    content: `2026 marque un tournant dans le design intérieur avec des tendances qui privilégient l'authenticité, la fonctionnalité et le bien-être.

## Le retour des matériaux bruts

Béton ciré, pierre naturelle, acier : les matériaux bruts s'invitent dans nos intérieurs pour créer des ambiances industrielles chic et intemporelles.

## Les courbes et formes organiques

Exit les angles droits : place aux courbes douces, aux arches et aux formes organiques qui apportent fluidité et douceur aux espaces.

## La couleur terracotta

Teinte phare de 2026, le terracotta apporte chaleur et caractère aux intérieurs, en total look ou par touches subtiles.

## Les espaces multifonctionnels

Avec l'évolution de nos modes de vie, les espaces se veulent modulables : un salon qui devient bureau, une cuisine qui fait salle à manger...

## L'éclairage scénographique

L'éclairage devient un élément de décoration à part entière, créant des ambiances et valorisant l'architecture intérieure.`,
    image: 'https://images.unsplash.com/photo-1768321903885-d0a6798485d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnRlcmlvciUyMHJlbm92YXRpb24lMjBjb25zdHJ1Y3Rpb258ZW58MXx8fHwxNzY4OTk1MjA4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    author: 'Claire Rousseau',
    readTime: '6 min',
  },
  {
    slug: 'optimiser-petits-espaces',
    title: 'Comment Optimiser les Petits Espaces',
    category: 'Conseils',
    date: '5 Janvier 2026',
    excerpt: 'Des astuces pratiques et esthétiques pour transformer votre petit appartement en un espace fonctionnel et agréable.',
    content: `Vivre dans un petit espace ne signifie pas renoncer au confort et au style. Avec les bonnes solutions, chaque mètre carré compte.

## Le mobilier sur mesure

Privilégier du mobilier conçu sur mesure permet d'exploiter chaque recoin et d'optimiser le rangement sans perdre en esthétique.

## Les couleurs claires

Blanc, beige, gris clair : les teintes claires agrandissent visuellement l'espace en réfléchissant la lumière naturelle.

## Les miroirs stratégiques

Placés face à une fenêtre ou dans un couloir étroit, les miroirs créent une impression de profondeur et de volume.

## Le mobilier multifonction

Canapé-lit, table escamotable, îlot de cuisine mobile : choisir du mobilier polyvalent permet de gagner en flexibilité.

## La verticalité

Exploiter la hauteur sous plafond avec des étagères murales, des bibliothèques verticales ou des rangements suspendus.`,
    image: 'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbGQlMjBraXRjaGVufGVufDF8fHx8MTc2ODk5OTUwMXww&ixlib=rb-4.1.0&q=80&w=1080',
    author: 'Thomas Lefèvre',
    readTime: '5 min',
  },
  {
    slug: 'salle-bain-moderne',
    title: 'Créer une Salle de Bain Moderne',
    category: 'Inspiration',
    date: '2 Janvier 2026',
    excerpt: 'Guide complet pour concevoir une salle de bain alliant design contemporain, fonctionnalité et bien-être.',
    content: `La salle de bain est devenue un véritable espace de bien-être. Voici comment créer un sanctuaire moderne et fonctionnel.

## La douche à l'italienne

Solution élégante et accessible, la douche à l'italienne s'adapte à tous les styles et toutes les surfaces.

## Le carrelage grand format

Moins de joints, effet minéral : le carrelage grand format apporte une touche contemporaine et facilite l'entretien.

## L'éclairage LED

Miroirs rétroéclairés, spots encastrés, bandes LED : l'éclairage LED crée une ambiance spa et met en valeur les matériaux.

## Les robinetteries noires

Alternative chic au chromé, la robinetterie noire ou noir mat apporte du caractère et s'inscrit dans la tendance industrielle.

## Les rangements intégrés

Niches murales, meubles suspendus, rangements dans les cloisons : optimiser le rangement sans encombrer l'espace.`,
    image: 'https://images.unsplash.com/photo-1761353855019-05f2f3ed9c43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbHVtYmluZyUyMGJhdGhyb29tJTIwcmVub3ZhdGlvbnxlbnwxfHx8fDE3Njg5OTUyMDl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    author: 'Émilie Durand',
    readTime: '7 min',
  },
  {
    slug: 'electricite-maison-connectee',
    title: 'Électricité et Maison Connectée',
    category: 'Technologie',
    date: '28 Décembre 2025',
    excerpt: 'Comment intégrer la domotique et les solutions connectées lors de la rénovation de votre installation électrique.',
    content: `La maison connectée n'est plus un luxe mais une réalité accessible. Profitez de vos travaux de rénovation électrique pour intégrer ces technologies.

## Le tableau électrique connecté

Contrôlez votre consommation en temps réel, détectez les anomalies et pilotez vos circuits depuis votre smartphone.

## L'éclairage intelligent

Variateurs connectés, ampoules RGB, scénarios lumineux : créez des ambiances sur mesure et réalisez des économies d'énergie.

## Les prises connectées

Programmez vos appareils, suivez leur consommation et coupez l'alimentation à distance pour plus de sécurité.

## Le chauffage connecté

Thermostats intelligents, radiateurs connectés : optimisez votre confort thermique tout en réduisant votre facture énergétique.

## L'interphone vidéo

Sécurité et confort : voyez et communiquez avec vos visiteurs depuis n'importe où.`,
    image: 'https://images.unsplash.com/photo-1675622623767-6a47f22a7332?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBlbGVjdHJpY2FsJTIwcGFuZWx8ZW58MXx8fHwxNzY4OTkzOTExfDA&ixlib=rb-4.1.0&q=80&w=1080',
    author: 'Nicolas Bernard',
    readTime: '6 min',
  },
];

const categories = ['Tous', 'Innovation', 'Durabilité', 'Design', 'Conseils', 'Inspiration', 'Technologie'];

export function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [searchTerm, setSearchTerm] = useState('');
  const heroRef = useRef<HTMLDivElement>(null);
  const postsRef = useRef<HTMLDivElement>(null);

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'Tous' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
  }, []);

  useEffect(() => {
    // Posts animation
    if (postsRef.current) {
      const cards = postsRef.current.querySelectorAll('.blog-card');
      
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 80 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              end: 'top 50%',
              scrub: 1,
            },
          }
        );
      });
    }
  }, [filteredPosts]);

  return (
    <div className="min-h-screen bg-[#FAFAF9]">
      {/* Hero Section - Updated to match Contact page */}
      <section ref={heroRef} className="relative min-h-[50vh] flex items-center justify-center px-4 pt-32 pb-20">
        <FilmGrainTexture />
        
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
            <span className="text-sm font-medium" style={{ color: '#2A2522' }}>BLOG</span>
          </div>
          
          <PremiumTextReveal>
            <h1 className="text-5xl sm:text-6xl lg:text-8xl font-bold mb-6 leading-[0.9]" style={{ color: '#2A2522' }}>
              CONSEILS &<br />INSPIRATIONS
            </h1>
          </PremiumTextReveal>
          
          <p className="text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed" style={{ color: '#5A5A5A' }}>
            Retrouvez nos conseils d'experts, nos inspirations et les dernières tendances en matière de rénovation et de construction.
          </p>
        </div>
      </section>

      {/* Search and Filters - Updated styling */}
      <section className="py-8 px-4 bg-[#FAFAF9]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <div 
              className="max-w-2xl mx-auto p-8"
              style={{
                background: 'rgba(255, 255, 255, 0.4)',
                backdropFilter: 'blur(40px) saturate(180%)',
                WebkitBackdropFilter: 'blur(40px) saturate(180%)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                clipPath: 'polygon(12px 0, calc(100% - 12px) 0, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px), 0 12px)',
              }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Search className="w-5 h-5" style={{ color: '#2A2522' }} />
                <span className="text-sm font-medium" style={{ color: '#2A2522' }}>Rechercher</span>
              </div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Rechercher un article..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-6 pr-6 py-4 focus:outline-none transition-all"
                  style={{
                    background: 'rgba(255, 255, 255, 0.6)',
                    backdropFilter: 'blur(20px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                    border: '1px solid rgba(255, 255, 255, 0.5)',
                    clipPath: 'polygon(8px 0, calc(100% - 8px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px), 0 8px)',
                    color: '#2A2522',
                  }}
                />
              </div>
            </div>
          </div>

          {/* Categories - Updated styling */}
          <div 
            className="p-8 mb-8"
            style={{
              background: 'rgba(255, 255, 255, 0.4)',
              backdropFilter: 'blur(40px) saturate(180%)',
              WebkitBackdropFilter: 'blur(40px) saturate(180%)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              clipPath: 'polygon(12px 0, calc(100% - 12px) 0, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px), 0 12px)',
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <Tag className="w-5 h-5" style={{ color: '#2A2522' }} />
              <h3 className="text-lg font-medium" style={{ color: '#2A2522' }}>Catégories</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
                    selectedCategory === cat
                      ? 'bg-[#2A2522] text-white'
                      : 'text-[#5A5A5A] hover:text-[#2A2522]'
                  }`}
                  style={{
                    background: selectedCategory === cat ? '#2A2522' : 'rgba(255, 255, 255, 0.6)',
                    backdropFilter: 'blur(20px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                    border: '1px solid rgba(255, 255, 255, 0.5)',
                    clipPath: 'polygon(8px 0, calc(100% - 8px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px), 0 8px)',
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid - Updated styling */}
      <section ref={postsRef} className="py-20 px-4 bg-[#FAFAF9]">
        <div className="max-w-7xl mx-auto">
          {/* Intro Text */}
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
              Explorez Nos Derniers Articles
            </h2>
            <p className="text-lg max-w-3xl mx-auto leading-relaxed" style={{ color: '#5A5A5A' }}>
              Des conseils pratiques, des tendances design, des innovations technologiques et des guides complets pour réussir vos projets de rénovation.
            </p>
          </div>

          {filteredPosts.length === 0 ? (
            <div 
              className="p-12 text-center"
              style={{
                background: 'rgba(255, 255, 255, 0.4)',
                backdropFilter: 'blur(40px) saturate(180%)',
                WebkitBackdropFilter: 'blur(40px) saturate(180%)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                clipPath: 'polygon(12px 0, calc(100% - 12px) 0, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px), 0 12px)',
              }}
            >
              <p className="text-xl" style={{ color: '#5A5A5A' }}>Aucun article trouvé.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post) => (
                <Link
                  key={post.slug}
                  to={`/blog/${post.slug}`}
                  className="block group blog-card"
                >
                  <div 
                    className="h-full overflow-hidden transition-all duration-500 hover:scale-105 flex flex-col"
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
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div 
                        className="absolute top-4 left-4 px-4 py-2"
                        style={{
                          background: 'rgba(255, 255, 255, 0.9)',
                          clipPath: 'polygon(8px 0, calc(100% - 8px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px), 0 8px)',
                        }}
                      >
                        <span className="text-xs font-medium" style={{ color: '#2A2522' }}>
                          {post.category}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex items-center gap-4 text-xs mb-4" style={{ color: '#5A5A5A' }}>
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-4 h-4" />
                          <span>{post.date}</span>
                        </div>
                        <span>•</span>
                        <span>{post.readTime} de lecture</span>
                      </div>

                      <h3 className="text-xl font-bold mb-3" style={{ color: '#2A2522' }}>
                        {post.title}
                      </h3>

                      <p className="text-sm leading-relaxed mb-6 flex-1" style={{ color: '#5A5A5A' }}>
                        {post.excerpt}
                      </p>

                      <div className="flex items-center gap-2 text-sm font-medium group-hover:gap-3 transition-all" style={{ color: '#2A2522' }}>
                        <span>Lire la suite</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA - Updated to match Contact page */}
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
              Restez Informé
            </h2>
            <p className="text-lg mb-8 leading-relaxed max-w-2xl mx-auto" style={{ color: '#5A5A5A' }}>
              Recevez nos derniers conseils, inspirations et actualités directement dans votre boîte mail.
            </p>
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
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}