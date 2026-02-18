import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Plus, Edit2, Trash2, Save, X, TrendingUp, Users, FileText, MessageSquare, Menu } from 'lucide-react';

interface Service {
  id: string;
  title: string;
  description: string;
  image: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  align: 'left' | 'right';
}

interface BlogPost {
  id: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  image: string;
}

interface ContactSubmission {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  date: string;
}

type ViewType = 'dashboard' | 'services' | 'projects' | 'blog' | 'contacts';

export function AdminPanel() {
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [services, setServices] = useState<Service[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<any>({});
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const savedServices = localStorage.getItem('admin_services');
    const savedProjects = localStorage.getItem('admin_projects');
    const savedBlogs = localStorage.getItem('admin_blogs');
    const savedContacts = localStorage.getItem('contact_submissions');

    if (savedServices) setServices(JSON.parse(savedServices));
    if (savedProjects) setProjects(JSON.parse(savedProjects));
    if (savedBlogs) setBlogPosts(JSON.parse(savedBlogs));
    if (savedContacts) setContacts(JSON.parse(savedContacts));
  };

  const saveData = (type: string, data: any[]) => {
    localStorage.setItem(`admin_${type}`, JSON.stringify(data));
    loadData();
  };

  const handleAdd = () => {
    const newId = Date.now().toString();
    setEditingId(newId);
    
    if (currentView === 'services') {
      setFormData({ id: newId, title: '', description: '', image: '' });
    } else if (currentView === 'projects') {
      setFormData({ id: newId, title: '', description: '', category: '', image: '', align: 'left' });
    } else if (currentView === 'blog') {
      setFormData({ id: newId, title: '', category: '', date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }), excerpt: '', image: '' });
    }
  };

  const handleEdit = (item: any) => {
    setEditingId(item.id);
    setFormData(item);
  };

  const handleSave = () => {
    if (currentView === 'services') {
      const updated = editingId && services.find(s => s.id === editingId)
        ? services.map(s => s.id === editingId ? formData : s)
        : [...services, formData];
      setServices(updated);
      saveData('services', updated);
    } else if (currentView === 'projects') {
      const updated = editingId && projects.find(p => p.id === editingId)
        ? projects.map(p => p.id === editingId ? formData : p)
        : [...projects, formData];
      setProjects(updated);
      saveData('projects', updated);
    } else if (currentView === 'blog') {
      const updated = editingId && blogPosts.find(b => b.id === editingId)
        ? blogPosts.map(b => b.id === editingId ? formData : b)
        : [...blogPosts, formData];
      setBlogPosts(updated);
      saveData('blog', updated);
    }
    
    setEditingId(null);
    setFormData({});
  };

  const handleDelete = (id: string, type: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    
    if (type === 'services') {
      const updated = services.filter(s => s.id !== id);
      setServices(updated);
      saveData('services', updated);
    } else if (type === 'projects') {
      const updated = projects.filter(p => p.id !== id);
      setProjects(updated);
      saveData('projects', updated);
    } else if (type === 'blog') {
      const updated = blogPosts.filter(b => b.id !== id);
      setBlogPosts(updated);
      saveData('blog', updated);
    }
  };

  const renderDashboard = () => (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8 relative overflow-hidden group hover:bg-white/10 transition-all duration-500">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay">
            <svg width="100%" height="100%">
              <filter id="statNoise1">
                <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
              </filter>
              <rect width="100%" height="100%" filter="url(#statNoise1)" />
            </svg>
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-[#F6F2E8]/10 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 md:w-7 md:h-7 text-[#F6F2E8]" />
              </div>
              <span className="text-[#5f4b3a] text-xs md:text-sm font-bold uppercase tracking-wider">+12%</span>
            </div>
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-2">{services.length}</h3>
            <p className="text-white/60 uppercase tracking-widest text-xs">Active Services</p>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8 relative overflow-hidden group hover:bg-white/10 transition-all duration-500">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay">
            <svg width="100%" height="100%">
              <filter id="statNoise2">
                <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
              </filter>
              <rect width="100%" height="100%" filter="url(#statNoise2)" />
            </svg>
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-[#F6F2E8]/10 rounded-xl flex items-center justify-center">
                <FileText className="w-6 h-6 md:w-7 md:h-7 text-[#F6F2E8]" />
              </div>
              <span className="text-[#5f4b3a] text-xs md:text-sm font-bold uppercase tracking-wider">+8%</span>
            </div>
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-2">{projects.length}</h3>
            <p className="text-white/60 uppercase tracking-widest text-xs">Projects</p>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8 relative overflow-hidden group hover:bg-white/10 transition-all duration-500">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay">
            <svg width="100%" height="100%">
              <filter id="statNoise3">
                <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
              </filter>
              <rect width="100%" height="100%" filter="url(#statNoise3)" />
            </svg>
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-[#F6F2E8]/10 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 md:w-7 md:h-7 text-[#F6F2E8]" />
              </div>
              <span className="text-[#5f4b3a] text-xs md:text-sm font-bold uppercase tracking-wider">+24%</span>
            </div>
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-2">{blogPosts.length}</h3>
            <p className="text-white/60 uppercase tracking-widest text-xs">Blog Posts</p>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8 relative overflow-hidden group hover:bg-white/10 transition-all duration-500">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay">
            <svg width="100%" height="100%">
              <filter id="statNoise4">
                <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
              </filter>
              <rect width="100%" height="100%" filter="url(#statNoise4)" />
            </svg>
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-[#F6F2E8]/10 rounded-xl flex items-center justify-center">
                <MessageSquare className="w-6 h-6 md:w-7 md:h-7 text-[#F6F2E8]" />
              </div>
              <span className="text-[#5f4b3a] text-xs md:text-sm font-bold uppercase tracking-wider">New</span>
            </div>
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-2">{contacts.length}</h3>
            <p className="text-white/60 uppercase tracking-widest text-xs">Contact Messages</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        <div className="bg-gradient-to-br from-[#3a3a3a] to-[#2a2a2a] border border-white/10 rounded-2xl p-6 md:p-10 text-white relative overflow-hidden group hover:border-white/20 transition-all duration-500">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay">
            <svg width="100%" height="100%">
              <filter id="actionNoise1">
                <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
              </filter>
              <rect width="100%" height="100%" filter="url(#actionNoise1)" />
            </svg>
          </div>
          
          <div className="relative z-10">
            <h3 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4 tracking-tight">Manage Content</h3>
            <p className="text-white/60 mb-6 md:mb-8 text-sm md:text-lg">Update services, projects, and blog posts</p>
            <div className="flex flex-wrap gap-2 md:gap-3">
              <button
                onClick={() => setCurrentView('services')}
                className="px-4 md:px-6 py-2 md:py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-full transition-all duration-300 text-xs md:text-sm font-medium uppercase tracking-wider hover:scale-105"
              >
                Services
              </button>
              <button
                onClick={() => setCurrentView('projects')}
                className="px-4 md:px-6 py-2 md:py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-full transition-all duration-300 text-xs md:text-sm font-medium uppercase tracking-wider hover:scale-105"
              >
                Projects
              </button>
              <button
                onClick={() => setCurrentView('blog')}
                className="px-4 md:px-6 py-2 md:py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-full transition-all duration-300 text-xs md:text-sm font-medium uppercase tracking-wider hover:scale-105"
              >
                Blog
              </button>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#3a3a3a] to-[#2a2a2a] border border-white/10 rounded-2xl p-6 md:p-10 text-white relative overflow-hidden group hover:border-white/20 transition-all duration-500">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay">
            <svg width="100%" height="100%">
              <filter id="actionNoise2">
                <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
              </filter>
              <rect width="100%" height="100%" filter="url(#actionNoise2)" />
            </svg>
          </div>
          
          <div className="relative z-10">
            <h3 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4 tracking-tight">Contact Messages</h3>
            <p className="text-white/60 mb-6 md:mb-8 text-sm md:text-lg">View and respond to customer inquiries</p>
            <button
              onClick={() => setCurrentView('contacts')}
              className="px-4 md:px-6 py-2 md:py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-full transition-all duration-300 text-xs md:text-sm font-medium uppercase tracking-wider hover:scale-105"
            >
              View Messages
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderForm = () => {
    if (!editingId) return null;

    return (
      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8 mb-6 md:mb-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay">
          <svg width="100%" height="100%">
            <filter id="formNoise">
              <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
            </filter>
            <rect width="100%" height="100%" filter="url(#formNoise)" />
          </svg>
        </div>
        
        <div className="relative z-10">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 md:mb-8 tracking-tight">
            {formData.title ? 'Edit Item' : 'Add New Item'}
          </h3>
          
          <div className="space-y-4 md:space-y-5">
            <div>
              <label className="block text-sm font-medium text-white/60 mb-2 uppercase tracking-wider">Title</label>
              <input
                type="text"
                placeholder="Enter title"
                value={formData.title || ''}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 md:px-6 py-3 md:py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all backdrop-blur-sm"
              />
            </div>
            
            {currentView !== 'services' && (
              <div>
                <label className="block text-sm font-medium text-white/60 mb-2 uppercase tracking-wider">Category</label>
                <input
                  type="text"
                  placeholder="Enter category"
                  value={formData.category || ''}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 md:px-6 py-3 md:py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all backdrop-blur-sm"
                />
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-white/60 mb-2 uppercase tracking-wider">
                {currentView === 'blog' ? 'Excerpt' : 'Description'}
              </label>
              <textarea
                placeholder={`Enter ${currentView === 'blog' ? 'excerpt' : 'description'}`}
                value={formData.description || formData.excerpt || ''}
                onChange={(e) => setFormData({ ...formData, [currentView === 'blog' ? 'excerpt' : 'description']: e.target.value })}
                rows={4}
                className="w-full px-4 md:px-6 py-3 md:py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all backdrop-blur-sm resize-none"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-white/60 mb-2 uppercase tracking-wider">Image URL</label>
              <input
                type="text"
                placeholder="https://example.com/image.jpg"
                value={formData.image || ''}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="w-full px-4 md:px-6 py-3 md:py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all backdrop-blur-sm"
              />
            </div>
            
            {currentView === 'projects' && (
              <div>
                <label className="block text-sm font-medium text-white/60 mb-2 uppercase tracking-wider">Layout</label>
                <select
                  value={formData.align || 'left'}
                  onChange={(e) => setFormData({ ...formData, align: e.target.value })}
                  className="w-full px-4 md:px-6 py-3 md:py-4 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all backdrop-blur-sm"
                >
                  <option value="left">Image Left</option>
                  <option value="right">Image Right</option>
                </select>
              </div>
            )}
            
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-4">
              <button
                onClick={handleSave}
                className="flex items-center justify-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-[#F6F2E8] text-black rounded-full hover:bg-white transition-all duration-300 font-bold uppercase tracking-wider hover:scale-105"
              >
                <Save className="w-4 h-4" />
                Save Changes
              </button>
              <button
                onClick={() => {
                  setEditingId(null);
                  setFormData({});
                }}
                className="px-6 md:px-8 py-3 md:py-4 bg-white/10 text-white rounded-full hover:bg-white/20 transition-all duration-300 font-medium uppercase tracking-wider"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderContentList = () => {
    const items = currentView === 'services' ? services : currentView === 'projects' ? projects : blogPosts;
    const type = currentView;
    
    return (
      <div className="space-y-6 md:space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h2 className="text-4xl md:text-6xl font-bold text-white capitalize tracking-tight">{currentView}</h2>
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 md:gap-3 px-6 md:px-8 py-3 md:py-4 bg-[#F6F2E8] text-black rounded-full hover:bg-white transition-all duration-300 font-bold uppercase tracking-wider hover:scale-105 text-sm md:text-base"
          >
            <Plus className="w-4 h-4 md:w-5 md:h-5" />
            Add New
          </button>
        </div>

        {renderForm()}

        <div className="grid grid-cols-1 gap-4 md:gap-6">
          {items.map((item: any) => (
            <div key={item.id} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-start gap-4 md:gap-8 hover:bg-white/10 transition-all duration-500 group relative overflow-hidden">
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay">
                <svg width="100%" height="100%">
                  <filter id={`itemNoise${item.id}`}>
                    <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
                  </filter>
                  <rect width="100%" height="100%" filter={`url(#itemNoise${item.id})`} />
                </svg>
              </div>
              
              <div className="relative z-10 flex flex-col md:flex-row items-start gap-4 md:gap-8 w-full">
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full md:w-48 h-48 object-cover rounded-xl flex-shrink-0"
                  />
                )}
                <div className="flex-1">
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 md:mb-3 tracking-tight">{item.title}</h3>
                  {item.category && (
                    <span className="inline-block px-3 md:px-4 py-1 md:py-1.5 bg-[#F6F2E8]/20 text-[#F6F2E8] rounded-full text-xs font-bold uppercase tracking-wider mb-2 md:mb-3">
                      {item.category}
                    </span>
                  )}
                  <p className="text-white/60 leading-relaxed text-sm md:text-base">{item.description || item.excerpt}</p>
                </div>
                <div className="flex md:flex-col gap-3 w-full md:w-auto flex-shrink-0">
                  <button
                    onClick={() => handleEdit(item)}
                    className="flex-1 md:flex-none p-3 md:p-4 bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-300 hover:scale-105"
                  >
                    <Edit2 className="w-4 h-4 md:w-5 md:h-5 text-white mx-auto" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id, type)}
                    className="flex-1 md:flex-none p-3 md:p-4 bg-red-500/20 hover:bg-red-500/30 rounded-xl transition-all duration-300 hover:scale-105"
                  >
                    <Trash2 className="w-4 h-4 md:w-5 md:h-5 text-red-400 mx-auto" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderContacts = () => (
    <div className="space-y-6 md:space-y-8">
      <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight">Contact Messages</h2>
      
      <div className="grid grid-cols-1 gap-4 md:gap-6">
        {contacts.map((contact) => (
          <div key={contact.id} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8 hover:bg-white/10 transition-all duration-500 relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay">
              <svg width="100%" height="100%">
                <filter id={`contactNoise${contact.id}`}>
                  <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
                </filter>
                <rect width="100%" height="100%" filter={`url(#contactNoise${contact.id})`} />
              </svg>
            </div>
            
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row items-start justify-between mb-4 md:mb-6 gap-2">
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2 tracking-tight">{contact.name}</h3>
                  <p className="text-white/60 text-sm md:text-base">{contact.email} • {contact.phone}</p>
                </div>
                <span className="text-xs text-white/40 uppercase tracking-wider">{new Date(contact.date).toLocaleDateString()}</span>
              </div>
              <p className="text-white/70 leading-relaxed text-sm md:text-lg">{contact.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#3a3a3a] via-[#4a4a4a] to-[#5a5a5a]">
      
      {/* Global grain texture */}
      <div className="fixed inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay z-0">
        <svg width="100%" height="100%">
          <filter id="globalNoise">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#globalNoise)" />
        </svg>
      </div>

      {/* Mobile Header */}
      <div className="fixed top-0 left-0 right-0 bg-[#1e1914]/20 backdrop-blur-xl border-b border-white/10 p-4 z-30 flex items-center justify-between">
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Admin Panel</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate('/')}
            className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-20 px-4 sm:px-6 lg:px-8 pb-8 relative z-10 max-w-7xl mx-auto">
        {/* Navigation Tabs - Mobile Scrollable */}
        <div className="mb-8 overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
          <nav className="flex gap-2 sm:gap-3 min-w-max sm:min-w-0">
            <button
              onClick={() => setCurrentView('dashboard')}
              className={`px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-bold uppercase tracking-wider text-xs sm:text-sm transition-all duration-300 whitespace-nowrap ${
                currentView === 'dashboard'
                  ? 'bg-[#F6F2E8] text-black'
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setCurrentView('services')}
              className={`px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-bold uppercase tracking-wider text-xs sm:text-sm transition-all duration-300 whitespace-nowrap ${
                currentView === 'services'
                  ? 'bg-[#F6F2E8] text-black'
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              Services
            </button>
            <button
              onClick={() => setCurrentView('projects')}
              className={`px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-bold uppercase tracking-wider text-xs sm:text-sm transition-all duration-300 whitespace-nowrap ${
                currentView === 'projects'
                  ? 'bg-[#F6F2E8] text-black'
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              Projects
            </button>
            <button
              onClick={() => setCurrentView('blog')}
              className={`px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-bold uppercase tracking-wider text-xs sm:text-sm transition-all duration-300 whitespace-nowrap ${
                currentView === 'blog'
                  ? 'bg-[#F6F2E8] text-black'
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              Blog
            </button>
            <button
              onClick={() => setCurrentView('contacts')}
              className={`px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-bold uppercase tracking-wider text-xs sm:text-sm transition-all duration-300 whitespace-nowrap ${
                currentView === 'contacts'
                  ? 'bg-[#F6F2E8] text-black'
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              Contacts
            </button>
          </nav>
        </div>

        {/* Content */}
        {currentView === 'dashboard' && renderDashboard()}
        {(currentView === 'services' || currentView === 'projects' || currentView === 'blog') && renderContentList()}
        {currentView === 'contacts' && renderContacts()}
      </div>
    </div>
  );
}