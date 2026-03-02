import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import {
  ArrowLeft, Plus, Edit2, Trash2, Save, TrendingUp, Users, FileText,
  MessageSquare, LogOut, Upload, X, Star, Eye, EyeOff, Globe, ImagePlus,
  Share2, Tag, Check,
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
import {
  getAllSocialMedia, createSocialMedia, updateSocialMedia, deleteSocialMedia,
  toggleSocialMediaActive, SocialMediaLink,
} from '../../services/socialMedia';
import { uploadFile } from '../../services/uploadAPI';

// ─── Category API helpers (inline, no separate file needed) ──────────────────
import api, { authApi } from '../../services/api';

interface APICategory { id: number; name: string; slug: string; type: string; }

async function fetchCategories(type: 'project' | 'blog'): Promise<APICategory[]> {
  const endpoint = type === 'project' ? '/projects/categories' : '/blog/categories';
  try { const r = await api.get<APICategory[]>(endpoint); return Array.isArray(r.data) ? r.data : []; }
  catch { return []; }
}
async function addCategory(type: 'project' | 'blog', name: string): Promise<APICategory | null> {
  const endpoint = type === 'project' ? '/projects/categories' : '/blog/categories';
  try { const r = await authApi.post<APICategory>(endpoint, { name }); return r.data; }
  catch { return null; }
}
async function removeCategory(type: 'project' | 'blog', id: number): Promise<void> {
  const endpoint = type === 'project' ? `/projects/categories/${id}` : `/blog/categories/${id}`;
  await authApi.delete(endpoint);
}

// ─── Static testimonials ──────────────────────────────────────────────────────
const STATIC_TESTIMONIALS = [
  { id: -1, name: 'Marie & Jean Dubois', location: 'Paris 16ème', text: "Entourage AV a transformé notre appartement en chef-d'œuvre moderne.", rating: 5, project: 'Rénovation Complète', order_index: 0, is_active: true, isStatic: true, show_on_site: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: -2, name: 'Sophie Laurent', location: 'Lyon', text: "Une équipe exceptionnelle qui a donné vie à notre vision avec précision.", rating: 5, project: 'Rénovation Premium', order_index: 1, is_active: true, isStatic: true, show_on_site: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: -3, name: 'Pierre Martin', location: 'Marseille', text: "Du concept à la réalisation, Entourage AV a livré au-delà de nos rêves.", rating: 5, project: 'Transformation Intérieure', order_index: 2, is_active: true, isStatic: true, show_on_site: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
];

type Lang = 'en' | 'fr';
type ViewType = 'dashboard' | 'services' | 'projects' | 'blog' | 'contacts' | 'testimonials' | 'social-media';

interface ImagePair {
  tempId: string; id?: number; before_image: string; after_image: string; label: string; order_index: number;
}

function parseAPIError(err: any): string {
  const detail = err?.response?.data?.detail;
  if (Array.isArray(detail)) return detail.map((e: any) => `${e.loc?.join('.')} — ${e.msg}`).join(', ');
  if (typeof detail === 'string') return detail;
  return 'An error occurred. Please try again.';
}

// ─── Image Upload ─────────────────────────────────────────────────────────────
function ImageUpload({ value, onChange, subfolder, label = 'Image' }: {
  value: string; onChange: (url: string) => void;
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
      {label && <label className="block text-sm font-medium text-white/60 mb-2 uppercase tracking-wider">{label}</label>}
      {value && (
        <div className="relative mb-3 inline-block">
          <img src={value} alt="Preview" className="h-28 w-auto object-cover rounded-xl border border-white/10" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
          <button type="button" onClick={() => onChange('')} className="absolute -top-2 -right-2 p-1 bg-red-500 rounded-full hover:bg-red-600 transition-colors">
            <X className="w-3 h-3 text-white" />
          </button>
        </div>
      )}
      <div className="flex gap-3">
        <button type="button" onClick={() => inputRef.current?.click()} disabled={uploading}
          className="flex items-center gap-2 px-4 py-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl text-white text-sm transition-all disabled:opacity-50 whitespace-nowrap">
          <Upload className="w-4 h-4" />
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
        <input type="text" placeholder="Or paste URL" value={value} onChange={(e) => onChange(e.target.value)}
          className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all text-sm" />
      </div>
      <input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp" onChange={handleFileChange} className="hidden" />
      {uploadError && <p className="text-red-400 text-xs mt-2">{uploadError}</p>}
    </div>
  );
}

// ─── Category Manager Widget ──────────────────────────────────────────────────
function CategoryManager({ type, selected, onSelect }: {
  type: 'project' | 'blog';
  selected: string;
  onSelect: (name: string) => void;
}) {
  const [categories, setCategories] = useState<APICategory[]>([]);
  const [newCatName, setNewCatName] = useState('');
  const [adding, setAdding] = useState(false);
  const [showAdd, setShowAdd] = useState(false);

  useEffect(() => { load(); }, [type]);

  const load = async () => { setCategories(await fetchCategories(type)); };

  const handleAdd = async () => {
    if (!newCatName.trim()) return;
    setAdding(true);
    const created = await addCategory(type, newCatName.trim());
    if (created) { setCategories(prev => [...prev, created]); onSelect(created.name); }
    setNewCatName('');
    setAdding(false);
    setShowAdd(false);
  };

  const handleDelete = async (cat: APICategory) => {
    if (!confirm(`Supprimer la catégorie "${cat.name}" ?`)) return;
    await removeCategory(type, cat.id);
    setCategories(prev => prev.filter(c => c.id !== cat.id));
    if (selected === cat.name) onSelect('');
  };

  const inputClass = "w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all text-sm";

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-white/60 uppercase tracking-wider">Catégorie</label>

      {/* Existing categories as selectable pills */}
      <div className="flex flex-wrap gap-2">
        {categories.map(cat => (
          <div key={cat.id} className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => onSelect(cat.name)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                selected === cat.name
                  ? 'bg-[#F6F2E8] text-black'
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              {selected === cat.name && <Check className="w-3 h-3 inline mr-1" />}
              {cat.name}
            </button>
            <button
              type="button"
              onClick={() => handleDelete(cat)}
              className="p-1 bg-red-500/20 hover:bg-red-500/40 rounded-lg text-red-400 transition-colors"
              title="Supprimer"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={() => setShowAdd(!showAdd)}
          className="px-3 py-1.5 bg-white/5 border border-dashed border-white/20 rounded-lg text-white/40 hover:text-white/70 hover:border-white/40 text-sm transition-all"
        >
          <Plus className="w-3 h-3 inline mr-1" />
          Nouvelle
        </button>
      </div>

      {/* Or type manually (fallback) */}
      <input
        type="text"
        placeholder="Ou tapez directement..."
        value={selected}
        onChange={(e) => onSelect(e.target.value)}
        className={inputClass}
      />

      {/* Add new category inline */}
      {showAdd && (
        <div className="flex gap-2 items-center p-3 bg-white/5 border border-white/10 rounded-xl">
          <Tag className="w-4 h-4 text-white/40 flex-shrink-0" />
          <input
            type="text"
            placeholder="Nom de la catégorie..."
            value={newCatName}
            onChange={(e) => setNewCatName(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAdd(); }}}
            className="flex-1 bg-transparent text-white placeholder:text-white/30 focus:outline-none text-sm"
            autoFocus
          />
          <button type="button" onClick={handleAdd} disabled={adding || !newCatName.trim()}
            className="px-3 py-1 bg-[#F6F2E8] text-black rounded-lg text-xs font-bold disabled:opacity-50">
            {adding ? '...' : 'Ajouter'}
          </button>
          <button type="button" onClick={() => { setShowAdd(false); setNewCatName(''); }}
            className="p-1 text-white/40 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Main AdminPanel ──────────────────────────────────────────────────────────
export function AdminPanel({ onLogout }: { onLogout?: () => void }) {
  const navigate = useNavigate();
  const [lang, setLang] = useState<Lang>('fr');

  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [services, setServices] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [contacts, setContacts] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [staticTestimonials, setStaticTestimonials] = useState(STATIC_TESTIMONIALS);
  const [socialMedia, setSocialMedia] = useState<SocialMediaLink[]>([]);

  // editingId: null = no form, negative = new item, positive = existing item id
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<any>({});

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [svc, proj, blog, cont, test, social] = await Promise.all([
        getAllServices().catch(() => []),
        getAllProjects().catch(() => []),
        getAllBlogPosts().catch(() => []),
        getAllContacts().catch(() => [] as APIContactSubmission[]),
        getAllTestimonials().catch(() => [] as Testimonial[]),
        getAllSocialMedia().catch(() => [] as SocialMediaLink[]),
      ]);
      setServices(svc);
      setProjects(proj);
      setBlogPosts(blog);
      setContacts(cont);
      setTestimonials(test.length > 0 ? test : staticTestimonials);
      setSocialMedia(social);
    } catch {
      setError('Échec du chargement. Vérifiez votre connexion.');
    } finally {
      setLoading(false);
    }
  };

  const showSuccess = (msg: string) => { setSuccess(msg); setTimeout(() => setSuccess(null), 3000); };

  // ── BLANK form factories — CRITICAL: no carryover from previous form ──────
  const blankService = () => ({ title: '', description: '', image: '', number: '', slug: '', long_description: '', timeline: '' });
  const blankProject = () => ({
    title: '', description: '', category: '', image: '', thumbnail_image: '',
    slug: '', number: '', location: '', duration: '', surface: '',
    imagePairs: [] as ImagePair[], deletedImagePairIds: [] as number[], is_featured: false,
  });
  const blankBlog = () => ({
    title: '', category: '', date: new Date().toISOString().split('T')[0],
    excerpt: '', image: '', slug: '', content: '', author: 'Entourage AV', read_time: '5 min',
  });
  const blankTestimonial = () => ({ name: '', location: '', text: '', rating: 5, project: '', order_index: 0, is_active: true, is_featured: false });
  const blankSocialMedia = () => ({ platform: '', url: '', order_index: socialMedia.length, is_active: true });

  // ── Image pair helpers ────────────────────────────────────────────────────
  const addImagePair = () => {
    const pairs: ImagePair[] = formData.imagePairs ?? [];
    setFormData({ ...formData, imagePairs: [...pairs, { tempId: `new-${Date.now()}`, before_image: '', after_image: '', label: '', order_index: pairs.length }] });
  };
  const removeImagePair = (idx: number) => {
    const pairs = [...(formData.imagePairs ?? [])];
    const [removed] = pairs.splice(idx, 1);
    const deletedIds = [...(formData.deletedImagePairIds ?? [])];
    if (removed.id) deletedIds.push(removed.id);
    setFormData({ ...formData, imagePairs: pairs, deletedImagePairIds: deletedIds });
  };
  const updateImagePair = (idx: number, field: string, value: string) => {
    const pairs = [...(formData.imagePairs ?? [])];
    pairs[idx] = { ...pairs[idx], [field]: value };
    setFormData({ ...formData, imagePairs: pairs });
  };

  // ── Add (always blank) ────────────────────────────────────────────────────
  const handleAdd = () => {
    const tempId = -Date.now();
    setEditingId(tempId);
    if (currentView === 'services') setFormData(blankService());
    else if (currentView === 'projects') setFormData(blankProject());
    else if (currentView === 'blog') setFormData(blankBlog());
    else if (currentView === 'testimonials') setFormData(blankTestimonial());
    else if (currentView === 'social-media') setFormData(blankSocialMedia());
  };

  // ── Edit ──────────────────────────────────────────────────────────────────
  const handleEdit = (item: any) => {
    if (item.isStatic) return;
    setEditingId(item.id);
    if (currentView === 'projects') {
      const imagePairs: ImagePair[] = (item.images ?? []).map((img: any, idx: number) => ({
        tempId: `existing-${img.id ?? idx}`,
        id: img.id,
        before_image: img.before_image ?? img.before ?? '',
        after_image: img.after_image ?? img.after ?? '',
        label: img.label ?? '',
        order_index: img.order_index ?? idx,
      }));
      setFormData({ ...item, thumbnail_image: item.thumbnail_image ?? '', imagePairs, deletedImagePairIds: [] });
    } else {
      // Spread a clean copy — don't carry imagePairs or other project-specific fields
      setFormData({ ...item });
    }
  };

  // ── Cancel — always wipes form completely ─────────────────────────────────
  const handleCancel = () => { setEditingId(null); setFormData({}); setError(null); };

  // ── Save ──────────────────────────────────────────────────────────────────
  const handleSave = async () => {
    setLoading(true);
    setError(null);
    try {
      const STRIP = ['id', 'created_at', 'updated_at', 'isStatic', 'imagePairs', 'deletedImagePairIds', 'images'];
      const clean = (extra: string[] = []) => {
        const d = { ...formData };
        [...STRIP, ...extra].forEach(k => delete d[k]);
        return d;
      };

      if (currentView === 'services') {
        const payload = clean();
        if (editingId && editingId > 0) {
          const updated = await updateService(editingId, payload);
          setServices(services.map(s => s.id === editingId ? updated : s));
          showSuccess('Service mis à jour');
        } else {
          const created = await createService(payload);
          setServices([...services, created]);
          showSuccess('Service créé');
        }

      } else if (currentView === 'projects') {
        const payload = clean(['align']);
        let projectId: number;
        if (editingId && editingId > 0) {
          const updated = await updateProject(editingId, payload);
          setProjects(projects.map(p => p.id === editingId ? updated : p));
          projectId = editingId;
          showSuccess('Projet mis à jour');
        } else {
          const created = await createProject(payload);
          setProjects([...projects, created]);
          projectId = created.id;
          showSuccess('Projet créé');
        }
        for (const id of (formData.deletedImagePairIds ?? [])) {
          await deleteProjectImage(id).catch(console.error);
        }
        for (const pair of (formData.imagePairs ?? [])) {
          if (!pair.before_image && !pair.after_image) continue;
          const pairPayload = { before_image: pair.before_image, after_image: pair.after_image, label: pair.label || '', order_index: pair.order_index };
          if (pair.id) { await updateProjectImage(pair.id, pairPayload).catch(console.error); }
          else { await addProjectImage(projectId, pairPayload).catch(console.error); }
        }
        const refreshed = await getAllProjects().catch(() => projects);
        setProjects(refreshed);

      } else if (currentView === 'blog') {
        const payload = clean();
        if (!payload.date) payload.date = new Date().toISOString().split('T')[0];
        if (editingId && editingId > 0) {
          const updated = await updateBlogPost(editingId, payload);
          setBlogPosts(blogPosts.map(b => b.id === editingId ? updated : b));
          showSuccess('Article mis à jour');
        } else {
          const created = await createBlogPost(payload);
          setBlogPosts([...blogPosts, created]);
          showSuccess('Article créé');
        }

      } else if (currentView === 'testimonials') {
        if (editingId && editingId > 0) {
          const updated = await updateTestimonial(editingId, formData);
          setTestimonials(testimonials.map(t => t.id === editingId ? updated : t));
          showSuccess('Témoignage mis à jour');
        } else {
          const created = await createTestimonial(formData);
          setTestimonials(prev => [...prev.filter(t => !('isStatic' in t)), created]);
          showSuccess('Témoignage créé');
        }

      } else if (currentView === 'social-media') {
        const payload = clean();
        if (editingId && editingId > 0) {
          const updated = await updateSocialMedia(editingId, payload);
          setSocialMedia(socialMedia.map(s => s.id === editingId ? updated : s));
          showSuccess('Réseau social mis à jour');
        } else {
          const created = await createSocialMedia(payload);
          setSocialMedia([...socialMedia, created]);
          showSuccess('Réseau social créé');
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
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet élément ?')) return;
    setLoading(true);
    try {
      if (type === 'services') { await deleteService(id); setServices(services.filter(s => s.id !== id)); }
      else if (type === 'projects') { await deleteProject(id); setProjects(projects.filter(p => p.id !== id)); }
      else if (type === 'blog') { await deleteBlogPost(id); setBlogPosts(blogPosts.filter(b => b.id !== id)); }
      else if (type === 'contacts') { await deleteContact(id); setContacts(contacts.filter(c => c.id !== id)); }
      else if (type === 'testimonials') {
        await deleteTestimonial(id);
        const remaining = testimonials.filter(t => t.id !== id);
        setTestimonials(remaining.length === 0 ? staticTestimonials : remaining);
      }
      else if (type === 'social-media') { await deleteSocialMedia(id); setSocialMedia(socialMedia.filter(s => s.id !== id)); }
      showSuccess('Supprimé');
    } catch (err: any) { setError(parseAPIError(err)); }
    finally { setLoading(false); }
  };

  const handleMarkAsRead = async (id: number) => {
    try {
      const updated = await markContactAsRead(id);
      setContacts(contacts.map(c => c.id === id ? updated : c));
    } catch (err: any) { setError(parseAPIError(err)); }
  };

  const handleToggleTestimonial = async (id: number) => {
    if (id < 0) return;
    try {
      const updated = await toggleTestimonialActive(id);
      setTestimonials(testimonials.map(t => t.id === id ? updated : t));
    } catch (err: any) { setError(parseAPIError(err)); }
  };

  const handleToggleSocialMedia = async (id: number) => {
    try {
      const updated = await toggleSocialMediaActive(id);
      setSocialMedia(socialMedia.map(s => s.id === id ? updated : s));
    } catch (err: any) { setError(parseAPIError(err)); }
  };

  const toggleStaticTestimonial = (id: number) => {
    setStaticTestimonials(prev => prev.map(t => t.id === id ? { ...t, show_on_site: !t.show_on_site } : t));
    setTestimonials(prev => prev.map(t => t.id === id && 'isStatic' in t ? { ...t, show_on_site: !(t as any).show_on_site } : t));
  };

  // ─── Shared style constants ───────────────────────────────────────────────
  const inputClass = "w-full px-4 md:px-6 py-3 md:py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all backdrop-blur-sm";
  const labelClass = "block text-sm font-medium text-white/60 mb-2 uppercase tracking-wider";

  // ─── Form render ──────────────────────────────────────────────────────────
  const renderForm = () => {
    if (editingId === null) return null;

    const subfolder = currentView === 'services' ? 'services'
      : currentView === 'projects' ? 'projects'
      : currentView === 'blog' ? 'blog'
      : 'testimonials';

    const imagePairs: ImagePair[] = formData.imagePairs ?? [];
    const isNew = editingId < 0;
    const formTitle = isNew ? 'Nouvel élément' : 'Modifier';

    return (
      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8 mb-6 md:mb-8">
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 md:mb-8 tracking-tight">{formTitle}</h3>
        <div className="space-y-4 md:space-y-5">

          {/* ── Social Media ── */}
          {currentView === 'social-media' && (
            <>
              <div>
                <label className={labelClass}>Plateforme</label>
                <input type="text" placeholder="Instagram, Facebook, Twitter..." value={formData.platform || ''} onChange={e => setFormData({ ...formData, platform: e.target.value })} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>URL</label>
                <input type="url" placeholder="https://instagram.com/yourpage" value={formData.url || ''} onChange={e => setFormData({ ...formData, url: e.target.value })} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Ordre</label>
                <input type="number" min={0} value={formData.order_index ?? 0} onChange={e => setFormData({ ...formData, order_index: Number(e.target.value) })} className={inputClass} />
              </div>
              <button type="button" onClick={() => setFormData({ ...formData, is_active: !formData.is_active })}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${formData.is_active ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-white/10 text-white/50 border border-white/10'}`}>
                {formData.is_active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                {formData.is_active ? 'Actif' : 'Inactif'}
              </button>
            </>
          )}

          {/* ── Testimonials ── */}
          {currentView === 'testimonials' && (
            <>
              <div><label className={labelClass}>Nom</label><input type="text" placeholder="Nom du client" value={formData.name || ''} onChange={e => setFormData({ ...formData, name: e.target.value })} className={inputClass} /></div>
              <div><label className={labelClass}>Localisation</label><input type="text" placeholder="Paris, France" value={formData.location || ''} onChange={e => setFormData({ ...formData, location: e.target.value })} className={inputClass} /></div>
              <div><label className={labelClass}>Témoignage</label><textarea placeholder="Avis du client..." value={formData.text || ''} onChange={e => setFormData({ ...formData, text: e.target.value })} rows={4} className={`${inputClass} resize-none`} /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className={labelClass}>Note (1-5)</label><input type="number" min={1} max={5} value={formData.rating ?? 5} onChange={e => setFormData({ ...formData, rating: Number(e.target.value) })} className={inputClass} /></div>
                <div><label className={labelClass}>Ordre</label><input type="number" min={0} value={formData.order_index ?? 0} onChange={e => setFormData({ ...formData, order_index: Number(e.target.value) })} className={inputClass} /></div>
              </div>
              <div><label className={labelClass}>Projet (optionnel)</label><input type="text" placeholder="Rénovation complète - Paris 15ème" value={formData.project || ''} onChange={e => setFormData({ ...formData, project: e.target.value })} className={inputClass} /></div>
              <button type="button" onClick={() => setFormData({ ...formData, is_active: !formData.is_active })}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${formData.is_active ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-white/10 text-white/50 border border-white/10'}`}>
                {formData.is_active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                {formData.is_active ? 'Actif' : 'Inactif'}
              </button>
            </>
          )}

          {/* ── Service / Project / Blog ── */}
          {currentView !== 'testimonials' && currentView !== 'social-media' && (
            <>
              <div><label className={labelClass}>Titre</label><input type="text" placeholder="Titre" value={formData.title || ''} onChange={e => setFormData({ ...formData, title: e.target.value })} className={inputClass} /></div>

              {currentView === 'projects' && (
                <div><label className={labelClass}>Numéro de projet</label><input type="text" placeholder="01" value={formData.number || ''} onChange={e => setFormData({ ...formData, number: e.target.value })} className={inputClass} /></div>
              )}

              <div><label className={labelClass}>Slug (URL)</label><input type="text" placeholder="enter-url-slug-here" value={formData.slug || ''} onChange={e => setFormData({ ...formData, slug: e.target.value })} className={inputClass} /></div>

              {/* Category manager for projects and blog */}
              {currentView === 'projects' && (
                <CategoryManager type="project" selected={formData.category || ''} onSelect={val => setFormData({ ...formData, category: val })} />
              )}
              {currentView === 'blog' && (
                <CategoryManager type="blog" selected={formData.category || ''} onSelect={val => setFormData({ ...formData, category: val })} />
              )}

              {/* Description / Excerpt — textarea for multi-paragraph */}
              <div>
                <label className={labelClass}>{currentView === 'blog' ? 'Extrait' : 'Description'}</label>
                <textarea
                  placeholder={currentView === 'blog' ? "Court résumé de l'article..." : "Description du projet (plusieurs paragraphes supportés)..."}
                  value={currentView === 'blog' ? (formData.excerpt || '') : (formData.description || '')}
                  onChange={e => setFormData({ ...formData, [currentView === 'blog' ? 'excerpt' : 'description']: e.target.value })}
                  rows={6}
                  className={`${inputClass} resize-y`}
                />
                <p className="text-white/30 text-xs mt-1">Appuyez sur Entrée deux fois pour créer un nouveau paragraphe</p>
              </div>

              {currentView === 'services' && (
                <div><label className={labelClass}>Description détaillée</label><textarea placeholder="Description détaillée..." value={formData.long_description || ''} onChange={e => setFormData({ ...formData, long_description: e.target.value })} rows={4} className={`${inputClass} resize-none`} /></div>
              )}

              {/* Image fields */}
              {currentView !== 'projects' && (
                <ImageUpload value={formData.image || ''} onChange={url => setFormData({ ...formData, image: url })} subfolder={subfolder as any} label="Image de couverture" />
              )}

              {currentView === 'projects' && (
                <>
                  <div><label className={labelClass}>Localisation</label><input type="text" placeholder="Paris 15ème" value={formData.location || ''} onChange={e => setFormData({ ...formData, location: e.target.value })} className={inputClass} /></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div><label className={labelClass}>Durée</label><input type="text" placeholder="4 semaines" value={formData.duration || ''} onChange={e => setFormData({ ...formData, duration: e.target.value })} className={inputClass} /></div>
                    <div><label className={labelClass}>Surface (m²)</label><input type="text" placeholder="85" value={formData.surface || ''} onChange={e => setFormData({ ...formData, surface: e.target.value })} className={inputClass} /></div>
                  </div>

                  {/* Thumbnail + Hero image selectors */}
                  <div className="border border-white/15 rounded-2xl p-5 bg-white/3 space-y-5">
                    <h4 className="text-white font-bold text-sm uppercase tracking-wider flex items-center gap-2">
                      <Star className="w-4 h-4 text-yellow-400" />
                      Images principales
                    </h4>
                    <ImageUpload
                      value={formData.thumbnail_image || ''}
                      onChange={url => setFormData({ ...formData, thumbnail_image: url })}
                      subfolder="projects"
                      label="Miniature galerie (thumbnail)"
                    />
                    <p className="text-white/30 text-xs -mt-2">Affiché sur la page galerie. Si vide, la première image Après sera utilisée.</p>

                    <ImageUpload
                      value={formData.image || ''}
                      onChange={url => setFormData({ ...formData, image: url })}
                      subfolder="projects"
                      label="Image héro (page détail)"
                    />
                    <p className="text-white/30 text-xs -mt-2">Grande image en haut de la page projet. Peut être la même que la miniature.</p>
                  </div>

                  {/* Featured toggle */}
                  <div className="border-t border-white/10 pt-4">
                    <button type="button" onClick={() => setFormData({ ...formData, is_featured: !formData.is_featured })}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${formData.is_featured ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' : 'bg-white/10 text-white/50 border border-white/10'}`}>
                      <Star className={`w-4 h-4 ${formData.is_featured ? 'fill-current' : ''}`} />
                      {formData.is_featured ? 'À la une' : 'Pas à la une'}
                    </button>
                    <p className="text-white/30 text-xs mt-1">Les projets à la une apparaissent sur la page d'accueil (jusqu'à 3)</p>
                  </div>

                  {/* Before/After image pairs */}
                  <div className="border border-white/15 rounded-2xl p-5 bg-white/3">
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex items-center gap-3">
                        <ImagePlus className="w-5 h-5 text-[#F6F2E8]" />
                        <h4 className="text-white font-bold text-base uppercase tracking-wider">Paires Avant / Après</h4>
                        <span className="px-2 py-0.5 text-xs bg-white/10 text-white/60 rounded-full">{imagePairs.length}</span>
                      </div>
                      <button type="button" onClick={addImagePair} className="flex items-center gap-2 px-4 py-2 bg-[#F6F2E8]/10 hover:bg-[#F6F2E8]/20 border border-[#F6F2E8]/20 rounded-xl text-[#F6F2E8] text-sm font-medium transition-all">
                        <Plus className="w-4 h-4" /> Ajouter une paire
                      </button>
                    </div>
                    {imagePairs.length === 0 ? (
                      <p className="text-white/30 text-sm text-center py-6 italic">Aucune paire. Ajoutez au moins une paire avant/après.</p>
                    ) : (
                      <div className="space-y-5">
                        {imagePairs.map((pair, idx) => (
                          <div key={pair.tempId} className="border border-white/10 rounded-xl p-4 bg-white/5">
                            <div className="flex items-center justify-between mb-4">
                              <span className="text-white/50 text-xs font-bold uppercase tracking-widest">Paire {idx + 1}</span>
                              <button type="button" onClick={() => removeImagePair(idx)} className="p-1.5 bg-red-500/20 hover:bg-red-500/40 rounded-lg transition-colors">
                                <Trash2 className="w-3.5 h-3.5 text-red-400" />
                              </button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                              <div className="border border-orange-500/20 rounded-xl p-3 bg-orange-500/5">
                                <div className="flex items-center gap-2 mb-3"><span className="w-2 h-2 rounded-full bg-orange-400" /><span className="text-orange-300 text-xs font-bold uppercase tracking-widest">AVANT</span></div>
                                <ImageUpload value={pair.before_image} onChange={url => updateImagePair(idx, 'before_image', url)} subfolder="projects" label="" />
                              </div>
                              <div className="border border-green-500/20 rounded-xl p-3 bg-green-500/5">
                                <div className="flex items-center gap-2 mb-3"><span className="w-2 h-2 rounded-full bg-green-400" /><span className="text-green-300 text-xs font-bold uppercase tracking-widest">APRÈS</span></div>
                                <ImageUpload value={pair.after_image} onChange={url => updateImagePair(idx, 'after_image', url)} subfolder="projects" label="" />
                              </div>
                            </div>
                            <input type="text" placeholder="Libellé optionnel (ex: Salle de bain)" value={pair.label} onChange={e => updateImagePair(idx, 'label', e.target.value)} className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 text-sm" />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </>
              )}

              {currentView === 'blog' && (
                <>
                  <div><label className={labelClass}>Auteur</label><input type="text" placeholder="Auteur" value={formData.author || ''} onChange={e => setFormData({ ...formData, author: e.target.value })} className={inputClass} /></div>
                  <div><label className={labelClass}>Temps de lecture</label><input type="text" placeholder="5 min" value={formData.read_time || ''} onChange={e => setFormData({ ...formData, read_time: e.target.value })} className={inputClass} /></div>
                  <div>
                    <label className={labelClass}>
                      Contenu
                      <span className="normal-case text-white/30 ml-2 text-xs">(# H1, ## H2, ### H3 — deux retours pour nouveau paragraphe)</span>
                    </label>
                    <textarea placeholder="# Titre principal&#10;&#10;Votre texte ici...&#10;&#10;## Sous-titre&#10;&#10;Suite du contenu..." value={formData.content || ''} onChange={e => setFormData({ ...formData, content: e.target.value })} rows={14} className={`${inputClass} resize-y font-mono text-sm`} />
                  </div>
                </>
              )}
            </>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button onClick={handleSave} disabled={loading} className="flex items-center justify-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-[#F6F2E8] text-black rounded-full hover:bg-white transition-all font-bold uppercase tracking-wider hover:scale-105 disabled:opacity-50">
              <Save className="w-4 h-4" />{loading ? 'Enregistrement...' : 'Enregistrer'}
            </button>
            <button onClick={handleCancel} className="px-6 md:px-8 py-3 md:py-4 bg-white/10 text-white rounded-full hover:bg-white/20 transition-all font-medium uppercase tracking-wider">
              Annuler
            </button>
          </div>
        </div>
      </div>
    );
  };

  // ─── Dashboard ────────────────────────────────────────────────────────────
  const renderDashboard = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-6 gap-4 md:gap-6">
        {[
          { icon: TrendingUp, count: services.length, label: 'Services', trend: '+12%' },
          { icon: FileText, count: projects.length, label: 'Projets', trend: '+8%' },
          { icon: Users, count: blogPosts.length, label: 'Blog', trend: '+24%' },
          { icon: MessageSquare, count: contacts.length, label: 'Messages', trend: 'Nouveau' },
          { icon: Star, count: testimonials.filter(x => !('isStatic' in x)).length, label: 'Témoignages', trend: 'actifs' },
          { icon: Share2, count: socialMedia.filter(x => x.is_active).length, label: 'Réseaux', trend: `${socialMedia.length} total` },
        ].map(({ icon: Icon, count, label, trend }, i) => (
          <div key={i} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8 relative overflow-hidden hover:bg-white/10 transition-all duration-500">
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
        <div className="bg-gradient-to-br from-[#3a3a3a] to-[#2a2a2a] border border-white/10 rounded-2xl p-6 md:p-10 text-white hover:border-white/20 transition-all">
          <h3 className="text-2xl md:text-4xl font-bold mb-3 tracking-tight">Gérer le contenu</h3>
          <p className="text-white/60 mb-6 text-sm md:text-base">Mettre à jour services, projets, articles et témoignages</p>
          <div className="flex flex-wrap gap-2">
            {(['services', 'projects', 'blog', 'testimonials', 'social-media'] as ViewType[]).map(view => (
              <button key={view} onClick={() => setCurrentView(view)} className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-xs font-medium uppercase tracking-wider capitalize">
                {view === 'social-media' ? 'Réseaux' : view}
              </button>
            ))}
          </div>
        </div>
        <div className="bg-gradient-to-br from-[#3a3a3a] to-[#2a2a2a] border border-white/10 rounded-2xl p-6 md:p-10 text-white hover:border-white/20 transition-all">
          <h3 className="text-2xl md:text-4xl font-bold mb-3 tracking-tight">Messages de contact</h3>
          <p className="text-white/60 mb-6 text-sm md:text-base">Voir et répondre aux demandes des clients</p>
          <button onClick={() => setCurrentView('contacts')} className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-xs font-medium uppercase tracking-wider">
            Voir les messages ({contacts.filter(c => !c.is_read).length} non lus)
          </button>
        </div>
      </div>
    </div>
  );

  // ─── Content list ─────────────────────────────────────────────────────────
  const renderContentList = () => {
    const items = currentView === 'services' ? services : currentView === 'projects' ? projects : blogPosts;
    const viewLabel = currentView === 'services' ? 'Services' : currentView === 'projects' ? 'Projets' : 'Blog';
    return (
      <div className="space-y-6 md:space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h2 className="text-4xl md:text-6xl font-bold text-white capitalize tracking-tight">{viewLabel}</h2>
          <button onClick={handleAdd} className="flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-[#F6F2E8] text-black rounded-full hover:bg-white font-bold uppercase tracking-wider hover:scale-105 text-sm">
            <Plus className="w-4 h-4" /> Ajouter
          </button>
        </div>
        {renderForm()}
        <div className="grid grid-cols-1 gap-4 md:gap-6">
          {items.map((item: any) => (
            <div key={item.id} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8 hover:bg-white/10 transition-all duration-500">
              <div className="flex flex-col md:flex-row items-start gap-4 md:gap-8 w-full">
                {(item.thumbnail_image || item.image) && (
                  <img src={item.thumbnail_image || item.image} alt={item.title} className="w-full md:w-48 h-48 object-cover rounded-xl flex-shrink-0" onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight">{item.title}</h3>
                    {item.is_featured && <span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded-full text-xs font-medium flex items-center gap-1"><Star className="w-3 h-3 fill-current" /> À la une</span>}
                  </div>
                  {item.category && <span className="inline-block px-3 py-1 bg-[#F6F2E8]/20 text-[#F6F2E8] rounded-full text-xs font-bold uppercase tracking-wider mb-2">{item.category}</span>}
                  <p className="text-white/60 text-sm line-clamp-2">{item.description || item.excerpt}</p>
                  {item.slug && <p className="text-white/40 text-xs mt-1">/{item.slug}</p>}
                  {currentView === 'projects' && <p className="text-white/30 text-xs mt-1">{(item.images ?? []).length} paire(s) avant/après</p>}
                </div>
                <div className="flex md:flex-col gap-3 flex-shrink-0">
                  <button onClick={() => handleEdit(item)} className="p-3 md:p-4 bg-white/10 hover:bg-white/20 rounded-xl transition-all hover:scale-105"><Edit2 className="w-4 h-4 text-white mx-auto" /></button>
                  <button onClick={() => handleDelete(item.id, currentView)} className="p-3 md:p-4 bg-red-500/20 hover:bg-red-500/30 rounded-xl transition-all hover:scale-105"><Trash2 className="w-4 h-4 text-red-400 mx-auto" /></button>
                </div>
              </div>
            </div>
          ))}
          {items.length === 0 && <div className="text-center py-16 text-white/40">Aucun élément. Cliquez sur "Ajouter" pour commencer.</div>}
        </div>
      </div>
    );
  };

  // ─── Testimonials ─────────────────────────────────────────────────────────
  const renderTestimonials = () => {
    const apiTestimonials = testimonials.filter(x => !('isStatic' in x));
    return (
      <div className="space-y-6 md:space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight">Témoignages</h2>
          <button onClick={handleAdd} className="flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-[#F6F2E8] text-black rounded-full hover:bg-white font-bold uppercase tracking-wider hover:scale-105 text-sm">
            <Plus className="w-4 h-4" /> Ajouter
          </button>
        </div>
        {renderForm()}
        {apiTestimonials.length > 0 && (
          <div className="grid grid-cols-1 gap-4 md:gap-6">
            {apiTestimonials.map((item: any) => (
              <div key={item.id} className={`bg-white/5 border ${item.is_active ? 'border-white/10' : 'border-white/5 opacity-60'} rounded-2xl p-6 md:p-8`}>
                <div className="flex flex-col md:flex-row items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <h3 className="text-xl font-bold text-white">{item.name}</h3>
                      <span className={`px-2 py-1 text-xs rounded-full ${item.is_active ? 'bg-green-500/20 text-green-400' : 'bg-white/10 text-white/40'}`}>{item.is_active ? 'Actif' : 'Inactif'}</span>
                    </div>
                    <p className="text-white/50 text-sm mb-2">{item.location}</p>
                    <div className="flex gap-1 mb-2">{[...Array(5)].map((_, i) => <Star key={i} className={`w-4 h-4 ${i < item.rating ? 'text-yellow-400 fill-yellow-400' : 'text-white/20'}`} />)}</div>
                    <p className="text-white/70 text-sm italic">"{item.text}"</p>
                  </div>
                  <div className="flex md:flex-col gap-3">
                    <button onClick={() => handleToggleTestimonial(item.id)} className={`p-3 rounded-xl transition-all ${item.is_active ? 'bg-green-500/20 hover:bg-green-500/30' : 'bg-white/10 hover:bg-white/20'}`}>
                      {item.is_active ? <Eye className="w-4 h-4 text-green-400" /> : <EyeOff className="w-4 h-4 text-white/50" />}
                    </button>
                    <button onClick={() => handleEdit(item)} className="p-3 bg-white/10 hover:bg-white/20 rounded-xl"><Edit2 className="w-4 h-4 text-white" /></button>
                    <button onClick={() => handleDelete(item.id, 'testimonials')} className="p-3 bg-red-500/20 hover:bg-red-500/30 rounded-xl"><Trash2 className="w-4 h-4 text-red-400" /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        <div>
          <h3 className="text-white/40 text-sm uppercase tracking-wider mb-4">— Statiques (lecture seule) —</h3>
          <div className="grid grid-cols-1 gap-4">
            {staticTestimonials.map(item => (
              <div key={item.id} className="bg-white/3 border border-white/5 rounded-2xl p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <h3 className="text-white/80 font-bold">{item.name}</h3>
                      <span className="px-2 py-1 text-xs bg-blue-500/20 text-blue-400 rounded-full">Statique</span>
                      <span className={`px-2 py-1 text-xs rounded-full ${item.show_on_site ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}`}>{item.show_on_site ? 'Visible' : 'Masqué'}</span>
                    </div>
                    <p className="text-white/50 text-sm italic">"{item.text}"</p>
                  </div>
                  <button onClick={() => toggleStaticTestimonial(item.id)} className={`p-2 rounded-lg transition-colors ${item.show_on_site ? 'bg-green-500/20 text-green-400' : 'bg-white/10 text-white/40'}`}>
                    {item.show_on_site ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // ─── Social Media ─────────────────────────────────────────────────────────
  const renderSocialMedia = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight">Réseaux Sociaux</h2>
        <button onClick={handleAdd} className="flex items-center gap-2 px-6 py-3 bg-[#F6F2E8] text-black rounded-full hover:bg-white font-bold uppercase tracking-wider text-sm"><Plus className="w-4 h-4" /> Ajouter</button>
      </div>
      {renderForm()}
      <div className="grid grid-cols-1 gap-4">
        {socialMedia.map(item => (
          <div key={item.id} className={`bg-white/5 border ${item.is_active ? 'border-white/10' : 'border-white/5 opacity-60'} rounded-2xl p-6`}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-xl font-bold text-white">{item.platform}</h3>
                  <span className={`px-2 py-1 text-xs rounded-full ${item.is_active ? 'bg-green-500/20 text-green-400' : 'bg-white/10 text-white/40'}`}>{item.is_active ? 'Actif' : 'Inactif'}</span>
                </div>
                <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-white/50 text-sm hover:text-white/80 break-all">{item.url}</a>
              </div>
              <div className="flex md:flex-col gap-3">
                <button onClick={() => handleToggleSocialMedia(item.id)} className={`p-3 rounded-xl ${item.is_active ? 'bg-green-500/20' : 'bg-white/10'}`}>{item.is_active ? <Eye className="w-4 h-4 text-green-400" /> : <EyeOff className="w-4 h-4 text-white/50" />}</button>
                <button onClick={() => handleEdit(item)} className="p-3 bg-white/10 hover:bg-white/20 rounded-xl"><Edit2 className="w-4 h-4 text-white" /></button>
                <button onClick={() => handleDelete(item.id, 'social-media')} className="p-3 bg-red-500/20 hover:bg-red-500/30 rounded-xl"><Trash2 className="w-4 h-4 text-red-400" /></button>
              </div>
            </div>
          </div>
        ))}
        {socialMedia.length === 0 && <div className="text-center py-16 text-white/40">Aucun réseau social configuré.</div>}
      </div>
    </div>
  );

  // ─── Contacts ─────────────────────────────────────────────────────────────
  const renderContacts = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight">Messages</h2>
        <button onClick={loadData} className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white text-sm uppercase tracking-wider">Actualiser</button>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {contacts.map((contact: any) => (
          <div key={contact.id} className={`bg-white/5 border ${!contact.is_read ? 'border-yellow-500/50' : 'border-white/10'} rounded-2xl p-6 md:p-8`}>
            <div className="flex flex-col md:flex-row items-start justify-between mb-4 gap-2">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-xl font-bold text-white">{contact.name}</h3>
                  {!contact.is_read && <span className="px-2 py-1 bg-yellow-500/20 text-yellow-500 text-xs rounded-full">Non lu</span>}
                </div>
                <p className="text-white/60 text-sm">{contact.email} • {contact.phone}</p>
              </div>
              <div className="flex items-center gap-2">
                {!contact.is_read && <button onClick={() => handleMarkAsRead(contact.id)} className="px-3 py-1 bg-yellow-500/20 text-yellow-500 text-xs rounded-full">Marquer lu</button>}
                <span className="text-xs text-white/40">{new Date(contact.created_at).toLocaleDateString('fr-FR')}</span>
              </div>
            </div>
            <p className="text-white/70 text-sm mb-4">{contact.message}</p>
            <div className="flex justify-end"><button onClick={() => handleDelete(contact.id, 'contacts')} className="p-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg"><Trash2 className="w-4 h-4 text-red-400" /></button></div>
          </div>
        ))}
        {contacts.length === 0 && <div className="text-center py-12 text-white/40">Aucun message de contact.</div>}
      </div>
    </div>
  );

  // ─── Root ─────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#3a3a3a] via-[#4a4a4a] to-[#5a5a5a]">
      {/* Noise bg */}
      <div className="fixed inset-0 opacity-[0.04] pointer-events-none z-0">
        <svg width="100%" height="100%"><filter id="gn"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" /></filter><rect width="100%" height="100%" filter="url(#gn)" /></svg>
      </div>

      {loading && <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"><div className="bg-white/10 p-8 rounded-2xl text-white text-xl">Chargement...</div></div>}
      {error && <div className="fixed top-20 left-1/2 -translate-x-1/2 bg-red-500/90 text-white px-6 py-3 rounded-lg z-50 text-sm max-w-lg text-center">{error}</div>}
      {success && <div className="fixed top-20 left-1/2 -translate-x-1/2 bg-green-500/90 text-white px-6 py-3 rounded-lg z-50 text-sm">{success}</div>}

      {/* Top nav */}
      <div className="fixed top-0 left-0 right-0 bg-[#1e1914]/20 backdrop-blur-xl border-b border-white/10 px-4 py-3 z-30 flex items-center justify-between">
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Panneau Admin</h2>
        <div className="flex items-center gap-1">
          <button onClick={() => setLang(lang === 'en' ? 'fr' : 'en')} className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold uppercase text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
            <Globe className="w-4 h-4" />{lang === 'en' ? 'FR' : 'EN'}
          </button>
          <button onClick={() => navigate('/')} className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors"><ArrowLeft className="w-5 h-5" /></button>
          {onLogout && <button onClick={onLogout} className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-white/60 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"><LogOut className="w-4 h-4" /><span className="hidden sm:inline">Déconnexion</span></button>}
        </div>
      </div>

      <div className="pt-20 px-4 sm:px-6 lg:px-8 pb-8 relative z-10 max-w-7xl mx-auto">
        {/* Nav tabs */}
        <div className="mb-8 overflow-x-auto -mx-4 px-4">
          <nav className="flex gap-2 min-w-max">
            {(['dashboard', 'services', 'projects', 'blog', 'testimonials', 'contacts', 'social-media'] as ViewType[]).map(view => (
              <button key={view} onClick={() => setCurrentView(view)}
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-bold uppercase tracking-wider text-xs sm:text-sm transition-all whitespace-nowrap ${currentView === view ? 'bg-[#F6F2E8] text-black' : 'text-white/70 hover:bg-white/10 hover:text-white'}`}>
                {view === 'dashboard' ? 'Tableau de bord'
                  : view === 'services' ? 'Services'
                  : view === 'projects' ? 'Projets'
                  : view === 'blog' ? 'Blog'
                  : view === 'testimonials' ? 'Témoignages'
                  : view === 'contacts' ? 'Contacts'
                  : 'Réseaux'}
                {view === 'contacts' && contacts.filter(c => !c.is_read).length > 0 && (
                  <span className="ml-2 px-2 py-0.5 bg-yellow-500/20 text-yellow-500 rounded-full text-xs">{contacts.filter(c => !c.is_read).length}</span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {currentView === 'dashboard' && renderDashboard()}
        {(currentView === 'services' || currentView === 'projects' || currentView === 'blog') && renderContentList()}
        {currentView === 'testimonials' && renderTestimonials()}
        {currentView === 'contacts' && renderContacts()}
        {currentView === 'social-media' && renderSocialMedia()}
      </div>
    </div>
  );
}