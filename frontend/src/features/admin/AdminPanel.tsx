import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import {
  ArrowLeft, Plus, Edit2, Trash2, Save, TrendingUp, Users, FileText,
  MessageSquare, LogOut, Upload, X, Star, Eye, EyeOff, Globe, ImagePlus,
} from 'lucide-react';

import { getAllServices, createService, updateService, deleteService } from '../../services/serviceAPI';
import {
  getAllProjects, createProject, updateProject, deleteProject,
  addProjectImage, updateProjectImage, deleteProjectImage,
} from '../../services/projectsAPI';
import { getAllBlogPosts, createBlogPost, updateBlogPost, deleteBlogPost } from '../../services/blogAPI';
import {
  getAllContacts, deleteContact, markContactAsRead,
  ContactSubmission as APIContactSubmission,
} from '../../services/contactAPI';
import {
  getAllTestimonials, createTestimonial, updateTestimonial, deleteTestimonial,
  toggleTestimonialActive, Testimonial,
} from '../../services/testimonialsAPI';
import { uploadFile } from '../../services/uploadAPI';

// ─── Static fallback testimonials ─────────────────────────────────────────────
const STATIC_TESTIMONIALS = [
  { id: -1, name: 'Marie & Jean Dubois', location: 'Paris 16ème', text: "Entourage AV a transformé notre appartement en chef-d'œuvre moderne. Leur attention aux détails et leur professionnalisme ont dépassé toutes nos attentes.", rating: 5, project: 'Rénovation Complète', order_index: 0, is_active: true, isStatic: true },
  { id: -2, name: 'Sophie Laurent', location: 'Lyon', text: "Une équipe exceptionnelle qui a donné vie à notre vision avec précision et créativité. Chaque aspect reflète leur engagement envers l'excellence.", rating: 5, project: 'Rénovation Premium', order_index: 1, is_active: true, isStatic: true },
  { id: -3, name: 'Pierre Martin', location: 'Marseille', text: "Du concept à la réalisation, Entourage AV a livré au-delà de nos rêves. Leur approche moderne a rendu tout le processus transparent et sans stress.", rating: 5, project: 'Transformation Intérieure', order_index: 2, is_active: true, isStatic: true },
];

// ─── i18n ──────────────────────────────────────────────────────────────────────
type Lang = 'en' | 'fr';
const T = {
  en: {
    adminPanel: 'Admin Panel', backToSite: 'Back to site', logout: 'Logout',
    dashboard: 'Dashboard', services: 'Services', projects: 'Projects', blog: 'Blog',
    testimonials: 'Testimonials', contacts: 'Contacts', messages: 'Messages', unread: 'unread',
    refresh: 'Refresh', addNew: 'Add New', editItem: 'Edit Item', addNewItem: 'Add New Item',
    saveChanges: 'Save Changes', saving: 'Saving...', cancel: 'Cancel', delete: 'Delete',
    confirmDelete: 'Are you sure you want to delete this item?', loading: 'Loading...',
    failedToLoad: 'Failed to load data. Please check your connection.',
    manageContent: 'Manage Content', manageDesc: 'Update services, projects, blog posts and testimonials',
    contactMessages: 'Contact Messages', contactDesc: 'View and respond to customer inquiries',
    viewMessages: 'View Messages', title: 'Title', category: 'Category', slug: 'Slug (URL)',
    description: 'Description', excerpt: 'Excerpt', longDescription: 'Long Description',
    projectNumber: 'Project Number', location: 'Location', duration: 'Duration',
    surface: 'Surface', layout: 'Layout', imageLeft: 'Image Left', imageRight: 'Image Right',
    author: 'Author', readTime: 'Read Time', content: 'Content (use ## for headings)',
    image: 'Cover Image', uploadImage: 'Upload Image', uploading: 'Uploading...',
    orPasteUrl: 'Or paste image URL', name: 'Name', customerName: 'Customer name',
    testimonialText: 'Testimonial Text', customerReview: 'Customer review...',
    rating: 'Rating (1-5)', orderIndex: 'Order Index', project: 'Project (optional)',
    active: 'Active (visible on site)', inactive: 'Inactive (hidden from site)',
    staticBadge: 'Static', staticNote: 'This is a hardcoded static testimonial. Add API testimonials above to replace them.',
    markAsRead: 'Mark as read', noItems: (type: string) => `No ${type} yet. Click "Add New" to get started.`,
    noContacts: 'No contact messages yet.', email: 'Email', phone: 'Phone',
    updated: (item: string) => `${item} updated successfully`,
    created: (item: string) => `${item} created successfully`,
    deleted: (item: string) => `${item} deleted`,
    activated: 'Testimonial activated', deactivated: 'Testimonial deactivated', markedAsRead: 'Marked as read',
    trend: { services: '+12%', projects: '+8%', blog: '+24%', messages: 'New', testimonials: 'active' },
    projectRenovation: (n: number) => `${n} active`,
    beforeAfterPairs: 'Before / After Image Pairs',
    addPair: 'Add Image Pair',
    beforeImage: 'BEFORE Image',
    afterImage: 'AFTER Image',
    pairLabel: 'Pair Label (optional)',
    removePair: 'Remove pair',
    noPairsYet: 'No image pairs yet. Add at least one before/after pair.',
  },
  fr: {
    adminPanel: 'Panneau Admin', backToSite: 'Retour au site', logout: 'Déconnexion',
    dashboard: 'Tableau de bord', services: 'Services', projects: 'Projets', blog: 'Blog',
    testimonials: 'Témoignages', contacts: 'Contacts', messages: 'Messages', unread: 'non lus',
    refresh: 'Actualiser', addNew: 'Ajouter', editItem: 'Modifier', addNewItem: 'Nouvel élément',
    saveChanges: 'Enregistrer', saving: 'Enregistrement...', cancel: 'Annuler', delete: 'Supprimer',
    confirmDelete: 'Êtes-vous sûr de vouloir supprimer cet élément ?', loading: 'Chargement...',
    failedToLoad: 'Échec du chargement. Vérifiez votre connexion.',
    manageContent: 'Gérer le contenu', manageDesc: 'Mettre à jour services, projets, articles et témoignages',
    contactMessages: 'Messages de contact', contactDesc: 'Voir et répondre aux demandes des clients',
    viewMessages: 'Voir les messages', title: 'Titre', category: 'Catégorie', slug: 'Slug (URL)',
    description: 'Description', excerpt: 'Extrait', longDescription: 'Description détaillée',
    projectNumber: 'Numéro de projet', location: 'Localisation', duration: 'Durée',
    surface: 'Surface', layout: 'Disposition', imageLeft: 'Image à gauche', imageRight: 'Image à droite',
    author: 'Auteur', readTime: 'Temps de lecture', content: 'Contenu (utilisez ## pour les titres)',
    image: 'Image de couverture', uploadImage: 'Télécharger une image', uploading: 'Téléchargement...',
    orPasteUrl: 'Ou collez une URL', name: 'Nom', customerName: 'Nom du client',
    testimonialText: 'Texte du témoignage', customerReview: 'Avis du client...',
    rating: 'Note (1-5)', orderIndex: "Ordre d'affichage", project: 'Projet (optionnel)',
    active: 'Actif (visible sur le site)', inactive: 'Inactif (masqué du site)',
    staticBadge: 'Statique', staticNote: "Ce témoignage est codé en dur. Ajoutez des témoignages via l'API pour les remplacer.",
    markAsRead: 'Marquer comme lu', noItems: (type: string) => `Aucun(e) ${type} pour l'instant. Cliquez sur "Ajouter".`,
    noContacts: "Aucun message de contact pour l'instant.", email: 'Email', phone: 'Téléphone',
    updated: (item: string) => `${item} mis à jour`,
    created: (item: string) => `${item} créé`,
    deleted: (item: string) => `${item} supprimé`,
    activated: 'Témoignage activé', deactivated: 'Témoignage désactivé', markedAsRead: 'Marqué comme lu',
    trend: { services: '+12%', projects: '+8%', blog: '+24%', messages: 'Nouveau', testimonials: 'actifs' },
    projectRenovation: (n: number) => `${n} actifs`,
    beforeAfterPairs: 'Paires d\'images Avant / Après',
    addPair: 'Ajouter une paire',
    beforeImage: 'Image AVANT',
    afterImage: 'Image APRÈS',
    pairLabel: 'Libellé (optionnel)',
    removePair: 'Supprimer la paire',
    noPairsYet: 'Aucune paire d\'images. Ajoutez au moins une paire avant/après.',
  },
};

// ─── Types ─────────────────────────────────────────────────────────────────────
interface Service {
  id: number; title: string; description: string; image?: string;
  number?: string; slug?: string; long_description?: string; timeline?: string; benefits?: string[];
}

interface ImagePair {
  tempId: string;      // local only, for React key
  id?: number;         // backend id (if already saved)
  before_image: string;
  after_image: string;
  label: string;
  order_index: number;
}

interface Project {
  id: number; title: string; description: string; category: string;
  image?: string; align?: 'left' | 'right'; slug?: string; number?: string;
  location?: string; duration?: string; surface?: string;
  images?: any[];
}

interface BlogPost {
  id: number; title: string; category: string; date: string; excerpt: string;
  image?: string; slug: string; content?: string; author?: string; read_time?: string;
  created_at?: string; updated_at?: string;
}

interface ContactSubmission {
  id: number; name: string; email: string; phone: string; message: string;
  created_at: string; is_read: boolean; services?: string[]; location?: string;
  project_type?: string; surface?: string;
}

type ViewType = 'dashboard' | 'services' | 'projects' | 'blog' | 'contacts' | 'testimonials';

function parseAPIError(err: any): string {
  const detail = err?.response?.data?.detail;
  if (Array.isArray(detail)) return detail.map((e: any) => `${e.loc?.join('.')} — ${e.msg}`).join(', ');
  if (typeof detail === 'string') return detail;
  return 'An error occurred. Please try again.';
}

// ─── Image Upload Component ────────────────────────────────────────────────────
function ImageUpload({
  value, onChange, subfolder, label = 'Image',
}: {
  value: string;
  onChange: (url: string) => void;
  subfolder: 'services' | 'projects' | 'blog' | 'testimonials' | '';
  label?: string;
}) {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setUploadError(null);
    try {
      const result = await uploadFile(file, subfolder);
      const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';
      const imageUrl = result.url.startsWith('http') ? result.url : `${backendUrl}${result.url}`;
      onChange(imageUrl);
    } catch (err: any) {
      setUploadError(parseAPIError(err));
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-white/60 mb-2 uppercase tracking-wider">{label}</label>
      {value && (
        <div className="relative mb-3 inline-block">
          <img src={value} alt="Preview" className="h-28 w-auto object-cover rounded-xl border border-white/10" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
          <button type="button" onClick={() => onChange('')} className="absolute -top-2 -right-2 p-1 bg-red-500 rounded-full hover:bg-red-600 transition-colors">
            <X className="w-3 h-3 text-white" />
          </button>
        </div>
      )}
      <div className="flex gap-3">
        <button type="button" onClick={() => inputRef.current?.click()} disabled={uploading} className="flex items-center gap-2 px-4 py-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl text-white text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap">
          <Upload className="w-4 h-4" />
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
        <input type="text" placeholder="Or paste URL" value={value} onChange={(e) => onChange(e.target.value)} className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all text-sm" />
      </div>
      <input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp" onChange={handleFileChange} className="hidden" />
      {uploadError && <p className="text-red-400 text-xs mt-2">{uploadError}</p>}
    </div>
  );
}

// ─── Main AdminPanel ───────────────────────────────────────────────────────────
export function AdminPanel({ onLogout }: { onLogout?: () => void }) {
  const navigate = useNavigate();
  const [lang, setLang] = useState<Lang>('fr');
  const t = T[lang];

  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [services, setServices] = useState<Service[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [testimonials, setTestimonials] = useState<(Testimonial & { isStatic?: boolean })[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [servicesData, projectsData, blogsData, contactsData, testimonialsData] = await Promise.all([
        getAllServices().catch((err) => { console.error('services:', err); return []; }),
        getAllProjects().catch((err) => { console.error('projects:', err); return []; }),
        getAllBlogPosts().catch((err) => { console.error('blog:', err); return []; }),
        getAllContacts().catch((err) => { console.error('contacts:', err); return [] as APIContactSubmission[]; }),
        getAllTestimonials().catch((err) => { console.error('testimonials:', err); return [] as Testimonial[]; }),
      ]);
      setServices(servicesData);
      setProjects(projectsData);
      setBlogPosts(blogsData);
      setContacts(contactsData as ContactSubmission[]);
      setTestimonials(testimonialsData.length > 0 ? testimonialsData : (STATIC_TESTIMONIALS as any));
    } catch (err) {
      setError(t.failedToLoad);
    } finally {
      setLoading(false);
    }
  };

  const showSuccess = (msg: string) => {
    setSuccess(msg);
    setTimeout(() => setSuccess(null), 3000);
  };

  // ── Image pair helpers ──
  const addImagePair = () => {
    const pairs: ImagePair[] = formData.imagePairs ?? [];
    const newPair: ImagePair = {
      tempId: `new-${Date.now()}`,
      before_image: '',
      after_image: '',
      label: '',
      order_index: pairs.length,
    };
    setFormData({ ...formData, imagePairs: [...pairs, newPair] });
  };

  const removeImagePair = (idx: number) => {
    const pairs: ImagePair[] = [...(formData.imagePairs ?? [])];
    const [removed] = pairs.splice(idx, 1);
    const deletedIds: number[] = [...(formData.deletedImagePairIds ?? [])];
    if (removed.id) deletedIds.push(removed.id);
    setFormData({ ...formData, imagePairs: pairs, deletedImagePairIds: deletedIds });
  };

  const updateImagePair = (idx: number, field: keyof ImagePair, value: string) => {
    const pairs: ImagePair[] = [...(formData.imagePairs ?? [])];
    pairs[idx] = { ...pairs[idx], [field]: value };
    setFormData({ ...formData, imagePairs: pairs });
  };

  // ── Add / Edit ──
  const handleAdd = () => {
    const tempId = -Date.now();
    setEditingId(tempId);
    if (currentView === 'services') {
      setFormData({ id: tempId, title: '', description: '', image: '', number: '', slug: '', long_description: '', timeline: '', benefits: [] });
    } else if (currentView === 'projects') {
      setFormData({ id: tempId, title: '', description: '', category: '', image: '', align: 'left', slug: '', number: '', location: '', duration: '', surface: '', imagePairs: [], deletedImagePairIds: [] });
    } else if (currentView === 'blog') {
      const today = new Date().toISOString().split('T')[0];
      setFormData({ id: tempId, title: '', category: '', date: today, excerpt: '', image: '', slug: '', content: '', author: 'Entourage AV', read_time: '5 min' });
    } else if (currentView === 'testimonials') {
      setFormData({ id: tempId, name: '', location: '', text: '', rating: 5, project: '', order_index: 0, is_active: true });
    }
  };

  const handleEdit = (item: any) => {
    if (item.isStatic) return;
    setEditingId(item.id);
    if (currentView === 'projects') {
      // Map existing images → ImagePair shape
      const imagePairs: ImagePair[] = (item.images ?? []).map((img: any, idx: number) => ({
        tempId: `existing-${img.id ?? idx}`,
        id: img.id,
        before_image: img.before_image ?? img.before ?? '',
        after_image: img.after_image ?? img.after ?? '',
        label: img.label ?? '',
        order_index: img.order_index ?? idx,
      }));
      setFormData({ ...item, imagePairs, deletedImagePairIds: [] });
    } else {
      setFormData({ ...item });
    }
  };

  // ── Save ──
  const handleSave = async () => {
    setLoading(true);
    setError(null);
    try {
      const STRIP_ALWAYS = ['id', 'created_at', 'updated_at', 'isStatic', 'imagePairs', 'deletedImagePairIds', 'images'];

      const clean = (extra: string[] = []) => {
        const d = { ...formData };
        [...STRIP_ALWAYS, ...extra].forEach((k) => delete d[k]);
        return d;
      };

      if (currentView === 'services') {
        const payload = clean();
        if (editingId && editingId > 0) {
          const updated = await updateService(editingId, payload);
          setServices(services.map((s) => s.id === editingId ? updated : s));
          showSuccess(t.updated('Service'));
        } else {
          const created = await createService(payload);
          setServices([...services, created]);
          showSuccess(t.created('Service'));
        }

      } else if (currentView === 'projects') {
        const payload = clean(['align']);
        let projectId: number;

        if (editingId && editingId > 0) {
          const updated = await updateProject(editingId, payload);
          setProjects(projects.map((p) => p.id === editingId ? updated : p));
          projectId = editingId;
          showSuccess(t.updated('Projet'));
        } else {
          const created = await createProject(payload);
          setProjects([...projects, created]);
          projectId = created.id;
          showSuccess(t.created('Projet'));
        }

        // ── Sync image pairs ──
        // 1. Delete removed pairs
        for (const id of (formData.deletedImagePairIds ?? [])) {
          await deleteProjectImage(id).catch(console.error);
        }
        // 2. Create or update pairs
        for (const pair of (formData.imagePairs ?? [])) {
          if (!pair.before_image && !pair.after_image) continue; // skip empty
          const pairPayload = {
            before_image: pair.before_image,
            after_image: pair.after_image,
            label: pair.label || '',
            order_index: pair.order_index,
          };
          if (pair.id) {
            await updateProjectImage(pair.id, pairPayload).catch(console.error);
          } else {
            await addProjectImage(projectId, pairPayload).catch(console.error);
          }
        }
        // Reload projects to get fresh images list
        const refreshed = await getAllProjects().catch(() => projects);
        setProjects(refreshed);

      } else if (currentView === 'blog') {
        const payload = clean(['date']);
        if (editingId && editingId > 0) {
          const updated = await updateBlogPost(editingId, payload);
          setBlogPosts(blogPosts.map((b) => b.id === editingId ? updated : b));
          showSuccess(t.updated('Article'));
        } else {
          const createPayload = { ...payload, date: formData.date || new Date().toISOString().split('T')[0] };
          const created = await createBlogPost(createPayload);
          setBlogPosts([...blogPosts, created]);
          showSuccess(t.created('Article'));
        }

      } else if (currentView === 'testimonials') {
        if (editingId && editingId > 0) {
          const updated = await updateTestimonial(editingId, formData);
          setTestimonials(testimonials.map((t) => t.id === editingId ? updated : t));
          showSuccess(t.updated('Témoignage'));
        } else {
          const created = await createTestimonial(formData);
          setTestimonials((prev) => {
            const withoutStatic = prev.filter((t) => !t.isStatic);
            return [...withoutStatic, created];
          });
          showSuccess(t.created('Témoignage'));
        }
      }

      setEditingId(null);
      setFormData({});
    } catch (err: any) {
      setError(parseAPIError(err));
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number, type: string) => {
    if (!confirm(t.confirmDelete)) return;
    setLoading(true);
    setError(null);
    try {
      if (type === 'services') { await deleteService(id); setServices(services.filter((s) => s.id !== id)); showSuccess(t.deleted('Service')); }
      else if (type === 'projects') { await deleteProject(id); setProjects(projects.filter((p) => p.id !== id)); showSuccess(t.deleted('Projet')); }
      else if (type === 'blog') { await deleteBlogPost(id); setBlogPosts(blogPosts.filter((b) => b.id !== id)); showSuccess(t.deleted('Article')); }
      else if (type === 'contacts') { await deleteContact(id); setContacts(contacts.filter((c) => c.id !== id)); showSuccess(t.deleted('Message')); }
      else if (type === 'testimonials') {
        await deleteTestimonial(id);
        const remaining = testimonials.filter((t) => t.id !== id);
        setTestimonials(remaining.filter((t) => !t.isStatic).length === 0 ? (STATIC_TESTIMONIALS as any) : remaining);
        showSuccess(t.deleted('Témoignage'));
      }
    } catch (err: any) {
      setError(parseAPIError(err));
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (id: number) => {
    try {
      const updated = await markContactAsRead(id);
      setContacts(contacts.map((c) => c.id === id ? (updated as ContactSubmission) : c));
      showSuccess(t.markedAsRead);
    } catch (err: any) { setError(parseAPIError(err)); }
  };

  const handleToggleTestimonial = async (id: number) => {
    if (id < 0) return;
    try {
      const updated = await toggleTestimonialActive(id);
      setTestimonials(testimonials.map((item) => item.id === id ? updated : item));
      showSuccess(updated.is_active ? t.activated : t.deactivated);
    } catch (err: any) { setError(parseAPIError(err)); }
  };

  // ─── Dashboard ───────────────────────────────────────────────────────────────
  const renderDashboard = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4 md:gap-6">
        {[
          { icon: TrendingUp, count: services.length, label: t.services, trend: t.trend.services },
          { icon: FileText, count: projects.length, label: t.projects, trend: t.trend.projects },
          { icon: Users, count: blogPosts.length, label: t.blog, trend: t.trend.blog },
          { icon: MessageSquare, count: contacts.length, label: t.messages, trend: t.trend.messages },
          { icon: Star, count: testimonials.filter((x) => !x.isStatic).length, label: t.testimonials, trend: t.projectRenovation(testimonials.filter((x) => x.is_active && !x.isStatic).length) },
        ].map(({ icon: Icon, count, label, trend }, i) => (
          <div key={i} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8 relative overflow-hidden group hover:bg-white/10 transition-all duration-500">
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4 md:mb-6">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-[#F6F2E8]/10 rounded-xl flex items-center justify-center">
                  <Icon className="w-6 h-6 md:w-7 md:h-7 text-[#F6F2E8]" />
                </div>
                <span className="text-[#5f4b3a] text-xs md:text-sm font-bold uppercase tracking-wider">{trend}</span>
              </div>
              <h3 className="text-4xl md:text-5xl font-bold text-white mb-2">{count}</h3>
              <p className="text-white/60 uppercase tracking-widest text-xs">{label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        <div className="bg-gradient-to-br from-[#3a3a3a] to-[#2a2a2a] border border-white/10 rounded-2xl p-6 md:p-10 text-white relative overflow-hidden hover:border-white/20 transition-all duration-500">
          <div className="relative z-10">
            <h3 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4 tracking-tight">{t.manageContent}</h3>
            <p className="text-white/60 mb-6 md:mb-8 text-sm md:text-lg">{t.manageDesc}</p>
            <div className="flex flex-wrap gap-2 md:gap-3">
              {(['services', 'projects', 'blog', 'testimonials'] as ViewType[]).map((view) => (
                <button key={view} onClick={() => setCurrentView(view)} className="px-4 md:px-6 py-2 md:py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-full transition-all duration-300 text-xs md:text-sm font-medium uppercase tracking-wider hover:scale-105 capitalize">
                  {t[view as keyof typeof t] as string}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#3a3a3a] to-[#2a2a2a] border border-white/10 rounded-2xl p-6 md:p-10 text-white relative overflow-hidden hover:border-white/20 transition-all duration-500">
          <div className="relative z-10">
            <h3 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4 tracking-tight">{t.contactMessages}</h3>
            <p className="text-white/60 mb-6 md:mb-8 text-sm md:text-lg">{t.contactDesc}</p>
            <button onClick={() => setCurrentView('contacts')} className="px-4 md:px-6 py-2 md:py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-full transition-all duration-300 text-xs md:text-sm font-medium uppercase tracking-wider hover:scale-105">
              {t.viewMessages} ({contacts.filter((c) => !c.is_read).length} {t.unread})
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // ─── Form ──────────────────────────────────────────────────────────────────────
  const renderForm = () => {
    if (!editingId) return null;

    const subfolder = currentView === 'services' ? 'services' : currentView === 'projects' ? 'projects' : currentView === 'blog' ? 'blog' : 'testimonials';
    const inputClass = "w-full px-4 md:px-6 py-3 md:py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all backdrop-blur-sm";
    const labelClass = "block text-sm font-medium text-white/60 mb-2 uppercase tracking-wider";

    const imagePairs: ImagePair[] = formData.imagePairs ?? [];

    return (
      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8 mb-6 md:mb-8">
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 md:mb-8 tracking-tight">
          {formData.title || formData.name ? t.editItem : t.addNewItem}
        </h3>
        <div className="space-y-4 md:space-y-5">

          {/* ── Testimonial form ── */}
          {currentView === 'testimonials' && (
            <>
              <div>
                <label className={labelClass}>{t.name}</label>
                <input type="text" placeholder={t.customerName} value={formData.name || ''} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>{t.location}</label>
                <input type="text" placeholder="Paris, France" value={formData.location || ''} onChange={(e) => setFormData({ ...formData, location: e.target.value })} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>{t.testimonialText}</label>
                <textarea placeholder={t.customerReview} value={formData.text || ''} onChange={(e) => setFormData({ ...formData, text: e.target.value })} rows={4} className={`${inputClass} resize-none`} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>{t.rating}</label>
                  <input type="number" min={1} max={5} value={formData.rating ?? 5} onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>{t.orderIndex}</label>
                  <input type="number" min={0} value={formData.order_index ?? 0} onChange={(e) => setFormData({ ...formData, order_index: Number(e.target.value) })} className={inputClass} />
                </div>
              </div>
              <div>
                <label className={labelClass}>{t.project}</label>
                <input type="text" placeholder="Rénovation complète - Paris 15ème" value={formData.project || ''} onChange={(e) => setFormData({ ...formData, project: e.target.value })} className={inputClass} />
              </div>
              <div>
                <button type="button" onClick={() => setFormData({ ...formData, is_active: !formData.is_active })} className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${formData.is_active ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-white/10 text-white/50 border border-white/10'}`}>
                  {formData.is_active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  {formData.is_active ? t.active : t.inactive}
                </button>
              </div>
            </>
          )}

          {/* ── Service / Project / Blog forms ── */}
          {currentView !== 'testimonials' && (
            <>
              <div>
                <label className={labelClass}>{t.title}</label>
                <input type="text" placeholder={t.title} value={formData.title || ''} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className={inputClass} />
              </div>

              {currentView === 'projects' && (
                <div>
                  <label className={labelClass}>{t.projectNumber}</label>
                  <input type="text" placeholder="01" value={formData.number || ''} onChange={(e) => setFormData({ ...formData, number: e.target.value })} className={inputClass} />
                </div>
              )}

              {currentView !== 'services' && (
                <div>
                  <label className={labelClass}>{t.category}</label>
                  <input type="text" placeholder={t.category} value={formData.category || ''} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className={inputClass} />
                </div>
              )}

              <div>
                <label className={labelClass}>{t.slug}</label>
                <input type="text" placeholder="enter-url-slug-here" value={formData.slug || ''} onChange={(e) => setFormData({ ...formData, slug: e.target.value })} className={inputClass} />
              </div>

              <div>
                <label className={labelClass}>{currentView === 'blog' ? t.excerpt : t.description}</label>
                <textarea
                  placeholder={currentView === 'blog' ? t.excerpt : t.description}
                  value={formData.description || formData.excerpt || ''}
                  onChange={(e) => setFormData({ ...formData, [currentView === 'blog' ? 'excerpt' : 'description']: e.target.value })}
                  rows={4}
                  className={`${inputClass} resize-none`}
                />
              </div>

              {currentView === 'services' && (
                <div>
                  <label className={labelClass}>{t.longDescription}</label>
                  <textarea placeholder={t.longDescription} value={formData.long_description || ''} onChange={(e) => setFormData({ ...formData, long_description: e.target.value })} rows={3} className={`${inputClass} resize-none`} />
                </div>
              )}

              {/* Cover image — only for services and blog, NOT projects (projects use before/after pairs) */}
              {currentView !== 'projects' && (
                <ImageUpload
                  value={formData.image || ''}
                  onChange={(url) => setFormData({ ...formData, image: url })}
                  subfolder={subfolder as any}
                  label={t.image}
                />
              )}

              {/* ── Project-specific fields ── */}
              {currentView === 'projects' && (
                <>
                  <div>
                    <label className={labelClass}>{t.location}</label>
                    <input type="text" placeholder="Paris 15ème" value={formData.location || ''} onChange={(e) => setFormData({ ...formData, location: e.target.value })} className={inputClass} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>{t.duration}</label>
                      <input type="text" placeholder="4 semaines" value={formData.duration || ''} onChange={(e) => setFormData({ ...formData, duration: e.target.value })} className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>{t.surface}</label>
                      <input type="text" placeholder="85m²" value={formData.surface || ''} onChange={(e) => setFormData({ ...formData, surface: e.target.value })} className={inputClass} />
                    </div>
                  </div>

                  {/* ════════════════════════════════════════════════
                      BEFORE / AFTER IMAGE PAIRS SECTION
                  ════════════════════════════════════════════════ */}
                  <div className="border border-white/15 rounded-2xl p-5 bg-white/3">
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex items-center gap-3">
                        <ImagePlus className="w-5 h-5 text-[#F6F2E8]" />
                        <h4 className="text-white font-bold text-base uppercase tracking-wider">
                          {t.beforeAfterPairs}
                        </h4>
                        <span className="px-2 py-0.5 text-xs bg-white/10 text-white/60 rounded-full">
                          {imagePairs.length}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={addImagePair}
                        className="flex items-center gap-2 px-4 py-2 bg-[#F6F2E8]/10 hover:bg-[#F6F2E8]/20 border border-[#F6F2E8]/20 rounded-xl text-[#F6F2E8] text-sm font-medium transition-all"
                      >
                        <Plus className="w-4 h-4" />
                        {t.addPair}
                      </button>
                    </div>

                    {imagePairs.length === 0 ? (
                      <p className="text-white/30 text-sm text-center py-6 italic">
                        {t.noPairsYet}
                      </p>
                    ) : (
                      <div className="space-y-5">
                        {imagePairs.map((pair, idx) => (
                          <div
                            key={pair.tempId}
                            className="border border-white/10 rounded-xl p-4 bg-white/5 relative"
                          >
                            {/* Pair header */}
                            <div className="flex items-center justify-between mb-4">
                              <span className="text-white/50 text-xs font-bold uppercase tracking-widest">
                                Paire {idx + 1}
                              </span>
                              <button
                                type="button"
                                onClick={() => removeImagePair(idx)}
                                className="p-1.5 bg-red-500/20 hover:bg-red-500/40 rounded-lg transition-colors"
                                title={t.removePair}
                              >
                                <Trash2 className="w-3.5 h-3.5 text-red-400" />
                              </button>
                            </div>

                            {/* Before + After uploads side by side */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                              {/* BEFORE */}
                              <div className="border border-orange-500/20 rounded-xl p-3 bg-orange-500/5">
                                <div className="flex items-center gap-2 mb-3">
                                  <span className="w-2 h-2 rounded-full bg-orange-400" />
                                  <span className="text-orange-300 text-xs font-bold uppercase tracking-widest">
                                    {t.beforeImage}
                                  </span>
                                </div>
                                <ImageUpload
                                  value={pair.before_image}
                                  onChange={(url) => updateImagePair(idx, 'before_image', url)}
                                  subfolder="projects"
                                  label=""
                                />
                              </div>

                              {/* AFTER */}
                              <div className="border border-green-500/20 rounded-xl p-3 bg-green-500/5">
                                <div className="flex items-center gap-2 mb-3">
                                  <span className="w-2 h-2 rounded-full bg-green-400" />
                                  <span className="text-green-300 text-xs font-bold uppercase tracking-widest">
                                    {t.afterImage}
                                  </span>
                                </div>
                                <ImageUpload
                                  value={pair.after_image}
                                  onChange={(url) => updateImagePair(idx, 'after_image', url)}
                                  subfolder="projects"
                                  label=""
                                />
                              </div>
                            </div>

                            {/* Optional label */}
                            <div>
                              <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wider">
                                {t.pairLabel}
                              </label>
                              <input
                                type="text"
                                placeholder="ex: Salle de bain, Cuisine..."
                                value={pair.label}
                                onChange={(e) => updateImagePair(idx, 'label', e.target.value)}
                                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 text-sm"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </>
              )}

              {/* Blog-specific fields */}
              {currentView === 'blog' && (
                <>
                  <div>
                    <label className={labelClass}>{t.author}</label>
                    <input type="text" placeholder={t.author} value={formData.author || ''} onChange={(e) => setFormData({ ...formData, author: e.target.value })} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>{t.readTime}</label>
                    <input type="text" placeholder="5 min" value={formData.read_time || ''} onChange={(e) => setFormData({ ...formData, read_time: e.target.value })} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>{t.content} <span className="normal-case text-white/30">(use ## for headings)</span></label>
                    <textarea placeholder="Full article content..." value={formData.content || ''} onChange={(e) => setFormData({ ...formData, content: e.target.value })} rows={10} className={`${inputClass} resize-none font-mono text-sm`} />
                  </div>
                </>
              )}
            </>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-4">
            <button onClick={handleSave} disabled={loading} className="flex items-center justify-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-[#F6F2E8] text-black rounded-full hover:bg-white transition-all duration-300 font-bold uppercase tracking-wider hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed">
              <Save className="w-4 h-4" />
              {loading ? t.saving : t.saveChanges}
            </button>
            <button onClick={() => { setEditingId(null); setFormData({}); }} className="px-6 md:px-8 py-3 md:py-4 bg-white/10 text-white rounded-full hover:bg-white/20 transition-all duration-300 font-medium uppercase tracking-wider">
              {t.cancel}
            </button>
          </div>
        </div>
      </div>
    );
  };

  // ─── Content list ──────────────────────────────────────────────────────────────
  const renderContentList = () => {
    const items = currentView === 'services' ? services : currentView === 'projects' ? projects : blogPosts;
    const viewLabel = t[currentView as keyof typeof t] as string;

    return (
      <div className="space-y-6 md:space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h2 className="text-4xl md:text-6xl font-bold text-white capitalize tracking-tight">{viewLabel}</h2>
          <button onClick={handleAdd} className="flex items-center gap-2 md:gap-3 px-6 md:px-8 py-3 md:py-4 bg-[#F6F2E8] text-black rounded-full hover:bg-white transition-all duration-300 font-bold uppercase tracking-wider hover:scale-105 text-sm md:text-base">
            <Plus className="w-4 h-4 md:w-5 md:h-5" />
            {t.addNew}
          </button>
        </div>

        {renderForm()}

        <div className="grid grid-cols-1 gap-4 md:gap-6">
          {items.map((item: any) => (
            <div key={item.id} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8 hover:bg-white/10 transition-all duration-500">
              <div className="flex flex-col md:flex-row items-start gap-4 md:gap-8 w-full">
                {item.image && (
                  <img src={item.image} alt={item.title} className="w-full md:w-48 h-48 object-cover rounded-xl flex-shrink-0" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 md:mb-3 tracking-tight">{item.title}</h3>
                  {item.category && (
                    <span className="inline-block px-3 md:px-4 py-1 md:py-1.5 bg-[#F6F2E8]/20 text-[#F6F2E8] rounded-full text-xs font-bold uppercase tracking-wider mb-2 md:mb-3">
                      {item.category}
                    </span>
                  )}
                  <p className="text-white/60 leading-relaxed text-sm md:text-base line-clamp-3">{item.description || item.excerpt}</p>
                  {item.slug && <p className="text-white/40 text-xs mt-2">/{item.slug}</p>}
                  {/* Show image pair count for projects */}
                  {currentView === 'projects' && (
                    <p className="text-white/30 text-xs mt-1">
                      {(item.images ?? []).length} paire(s) avant/après
                    </p>
                  )}
                </div>
                <div className="flex md:flex-col gap-3 w-full md:w-auto flex-shrink-0">
                  <button onClick={() => handleEdit(item)} className="flex-1 md:flex-none p-3 md:p-4 bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-300 hover:scale-105">
                    <Edit2 className="w-4 h-4 md:w-5 md:h-5 text-white mx-auto" />
                  </button>
                  <button onClick={() => handleDelete(item.id, currentView)} className="flex-1 md:flex-none p-3 md:p-4 bg-red-500/20 hover:bg-red-500/30 rounded-xl transition-all duration-300 hover:scale-105">
                    <Trash2 className="w-4 h-4 md:w-5 md:h-5 text-red-400 mx-auto" />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {items.length === 0 && (
            <div className="text-center py-16 text-white/40">{t.noItems(viewLabel.toLowerCase())}</div>
          )}
        </div>
      </div>
    );
  };

  // ─── Testimonials ──────────────────────────────────────────────────────────────
  const renderTestimonials = () => {
    const apiTestimonials = testimonials.filter((x) => !x.isStatic);
    const staticTestimonials = testimonials.filter((x) => x.isStatic);
    const hasApiTestimonials = apiTestimonials.length > 0;

    return (
      <div className="space-y-6 md:space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight">{t.testimonials}</h2>
          <button onClick={handleAdd} className="flex items-center gap-2 md:gap-3 px-6 md:px-8 py-3 md:py-4 bg-[#F6F2E8] text-black rounded-full hover:bg-white transition-all duration-300 font-bold uppercase tracking-wider hover:scale-105 text-sm md:text-base">
            <Plus className="w-4 h-4 md:w-5 md:h-5" />
            {t.addNew}
          </button>
        </div>

        {renderForm()}

        {!hasApiTestimonials && (
          <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl text-yellow-300 text-sm">
            ℹ️ {t.staticNote}
          </div>
        )}

        {hasApiTestimonials && (
          <div className="grid grid-cols-1 gap-4 md:gap-6">
            {apiTestimonials.map((item) => (
              <div key={item.id} className={`bg-white/5 backdrop-blur-md border ${item.is_active ? 'border-white/10' : 'border-white/5 opacity-60'} rounded-2xl p-6 md:p-8 hover:bg-white/10 transition-all duration-500`}>
                <div className="flex flex-col md:flex-row items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">{item.name}</h3>
                      <span className={`px-2 py-1 text-xs rounded-full font-medium ${item.is_active ? 'bg-green-500/20 text-green-400' : 'bg-white/10 text-white/40'}`}>
                        {item.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    <p className="text-white/50 text-sm mb-2">{item.location}</p>
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(5)].map((_, i) => <Star key={i} className={`w-4 h-4 ${i < item.rating ? 'text-yellow-400 fill-yellow-400' : 'text-white/20'}`} />)}
                    </div>
                    <p className="text-white/70 leading-relaxed text-sm md:text-base line-clamp-3 italic">"{item.text}"</p>
                    {item.project && <p className="text-white/40 text-xs mt-2">Project: {item.project}</p>}
                  </div>
                  <div className="flex md:flex-col gap-3 flex-shrink-0">
                    <button onClick={() => handleToggleTestimonial(item.id)} className={`p-3 md:p-4 rounded-xl transition-all duration-300 hover:scale-105 ${item.is_active ? 'bg-green-500/20 hover:bg-green-500/30' : 'bg-white/10 hover:bg-white/20'}`} title={item.is_active ? 'Deactivate' : 'Activate'}>
                      {item.is_active ? <Eye className="w-4 h-4 text-green-400 mx-auto" /> : <EyeOff className="w-4 h-4 text-white/50 mx-auto" />}
                    </button>
                    <button onClick={() => handleEdit(item)} className="p-3 md:p-4 bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-300 hover:scale-105">
                      <Edit2 className="w-4 h-4 md:w-5 md:h-5 text-white mx-auto" />
                    </button>
                    <button onClick={() => handleDelete(item.id, 'testimonials')} className="p-3 md:p-4 bg-red-500/20 hover:bg-red-500/30 rounded-xl transition-all duration-300 hover:scale-105">
                      <Trash2 className="w-4 h-4 md:w-5 md:h-5 text-red-400 mx-auto" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {staticTestimonials.length > 0 && (
          <div>
            <h3 className="text-lg font-medium text-white/40 uppercase tracking-wider mb-4">— {t.staticBadge} —</h3>
            <div className="grid grid-cols-1 gap-4 md:gap-6">
              {staticTestimonials.map((item) => (
                <div key={item.id} className="bg-white/3 backdrop-blur-md border border-white/5 rounded-2xl p-6 md:p-8 opacity-60">
                  <div className="flex flex-col md:flex-row items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-white/80 tracking-tight">{item.name}</h3>
                        <span className="px-2 py-1 text-xs rounded-full font-medium bg-blue-500/20 text-blue-400">
                          {lang === 'fr' ? 'Statique' : 'Static'}
                        </span>
                      </div>
                      <p className="text-white/50 text-sm mb-2">{item.location}</p>
                      <div className="flex items-center gap-1 mb-3">
                        {[...Array(5)].map((_, i) => <Star key={i} className={`w-4 h-4 ${i < item.rating ? 'text-yellow-400/60 fill-yellow-400/60' : 'text-white/10'}`} />)}
                      </div>
                      <p className="text-white/50 leading-relaxed text-sm line-clamp-2 italic">"{item.text}"</p>
                    </div>
                    <div className="text-white/30 text-xs italic self-center">
                      {lang === 'fr' ? 'Lecture seule' : 'Read-only'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  // ─── Contacts ──────────────────────────────────────────────────────────────────
  const renderContacts = () => (
    <div className="space-y-6 md:space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight">{t.messages}</h2>
        <button onClick={loadData} className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors text-sm uppercase tracking-wider font-medium">
          {t.refresh}
        </button>
      </div>
      <div className="grid grid-cols-1 gap-4 md:gap-6">
        {contacts.map((contact) => (
          <div key={contact.id} className={`bg-white/5 backdrop-blur-md border ${!contact.is_read ? 'border-yellow-500/50' : 'border-white/10'} rounded-2xl p-6 md:p-8 hover:bg-white/10 transition-all duration-500`}>
            <div className="flex flex-col md:flex-row items-start justify-between mb-4 md:mb-6 gap-2">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">{contact.name}</h3>
                  {!contact.is_read && <span className="px-2 py-1 bg-yellow-500/20 text-yellow-500 text-xs rounded-full">{lang === 'fr' ? 'Non lu' : 'Unread'}</span>}
                </div>
                <p className="text-white/60 text-sm md:text-base">{contact.email} • {contact.phone}</p>
                {contact.services && <p className="text-white/40 text-xs mt-1">Services: {Array.isArray(contact.services) ? contact.services.join(', ') : contact.services}</p>}
                {contact.location && <p className="text-white/40 text-xs">Location: {contact.location}</p>}
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                {!contact.is_read && (
                  <button onClick={() => handleMarkAsRead(contact.id)} className="px-3 py-1 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-500 text-xs rounded-full transition-colors">
                    {t.markAsRead}
                  </button>
                )}
                <span className="text-xs text-white/40 uppercase tracking-wider">
                  {new Date(contact.created_at).toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US')}
                </span>
              </div>
            </div>
            <p className="text-white/70 leading-relaxed text-sm md:text-lg mb-4">{contact.message}</p>
            <div className="flex justify-end">
              <button onClick={() => handleDelete(contact.id, 'contacts')} className="p-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg transition-colors">
                <Trash2 className="w-4 h-4 text-red-400" />
              </button>
            </div>
          </div>
        ))}
        {contacts.length === 0 && <div className="text-center py-12 text-white/40">{t.noContacts}</div>}
      </div>
    </div>
  );

  // ─── Root render ───────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#3a3a3a] via-[#4a4a4a] to-[#5a5a5a]">
      <div className="fixed inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay z-0">
        <svg width="100%" height="100%">
          <filter id="globalNoise">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#globalNoise)" />
        </svg>
      </div>

      {loading && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white/10 p-8 rounded-2xl backdrop-blur-md border border-white/20">
            <div className="text-white text-xl font-light">{t.loading}</div>
          </div>
        </div>
      )}

      {error && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 bg-red-500/90 text-white px-6 py-3 rounded-lg backdrop-blur-sm z-50 border border-red-400/30 text-sm max-w-lg text-center">
          {error}
        </div>
      )}

      {success && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 bg-green-500/90 text-white px-6 py-3 rounded-lg backdrop-blur-sm z-50 border border-green-400/30 text-sm">
          {success}
        </div>
      )}

      {/* Top nav */}
      <div className="fixed top-0 left-0 right-0 bg-[#1e1914]/20 backdrop-blur-xl border-b border-white/10 px-4 py-3 z-30 flex items-center justify-between">
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">{t.adminPanel}</h2>
        <div className="flex items-center gap-1">
          <button onClick={() => setLang(lang === 'en' ? 'fr' : 'en')} className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold uppercase tracking-wider text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors" title="Toggle language">
            <Globe className="w-4 h-4" />
            {lang === 'en' ? 'FR' : 'EN'}
          </button>
          <button onClick={() => navigate('/')} className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors" title={t.backToSite}>
            <ArrowLeft className="w-5 h-5" />
          </button>
          {onLogout && (
            <button onClick={onLogout} className="flex items-center gap-2 px-3 py-2 text-xs font-bold uppercase tracking-wider text-white/60 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">{t.logout}</span>
            </button>
          )}
        </div>
      </div>

      <div className="pt-20 px-4 sm:px-6 lg:px-8 pb-8 relative z-10 max-w-7xl mx-auto">
        {/* Nav tabs */}
        <div className="mb-8 overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
          <nav className="flex gap-2 sm:gap-3 min-w-max sm:min-w-0">
            {(['dashboard', 'services', 'projects', 'blog', 'testimonials', 'contacts'] as ViewType[]).map((view) => (
              <button
                key={view}
                onClick={() => setCurrentView(view)}
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-bold uppercase tracking-wider text-xs sm:text-sm transition-all duration-300 whitespace-nowrap ${currentView === view ? 'bg-[#F6F2E8] text-black' : 'text-white/70 hover:bg-white/10 hover:text-white'}`}
              >
                {t[view as keyof typeof t] as string}
                {view === 'contacts' && contacts.filter((c) => !c.is_read).length > 0 && (
                  <span className="ml-2 px-2 py-0.5 bg-yellow-500/20 text-yellow-500 rounded-full text-xs">
                    {contacts.filter((c) => !c.is_read).length}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {currentView === 'dashboard' && renderDashboard()}
        {(currentView === 'services' || currentView === 'projects' || currentView === 'blog') && renderContentList()}
        {currentView === 'testimonials' && renderTestimonials()}
        {currentView === 'contacts' && renderContacts()}
      </div>
    </div>
  );
}