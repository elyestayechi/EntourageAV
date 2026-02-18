import { useState, useEffect } from 'react';
import { X, Plus, Edit2, Trash2, Save } from 'lucide-react';

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

type TabType = 'services' | 'projects' | 'blog';

export function AdminDashboard({ onClose }: { onClose: () => void }) {
  const [activeTab, setActiveTab] = useState<TabType>('services');
  const [services, setServices] = useState<Service[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<any>({});

  // Load data from localStorage on mount
  useEffect(() => {
    const savedServices = localStorage.getItem('admin_services');
    const savedProjects = localStorage.getItem('admin_projects');
    const savedBlogs = localStorage.getItem('admin_blogs');

    if (savedServices) setServices(JSON.parse(savedServices));
    if (savedProjects) setProjects(JSON.parse(savedProjects));
    if (savedBlogs) setBlogPosts(JSON.parse(savedBlogs));
  }, []);

  // Save to localStorage
  const saveData = (type: TabType, data: any[]) => {
    localStorage.setItem(`admin_${type}`, JSON.stringify(data));
  };

  const handleAdd = () => {
    const newId = Date.now().toString();
    setEditingId(newId);
    
    if (activeTab === 'services') {
      setFormData({ id: newId, title: '', description: '', image: '' });
    } else if (activeTab === 'projects') {
      setFormData({ id: newId, title: '', description: '', category: '', image: '', align: 'left' });
    } else {
      setFormData({ id: newId, title: '', category: '', date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }), excerpt: '', image: '' });
    }
  };

  const handleEdit = (item: any) => {
    setEditingId(item.id);
    setFormData(item);
  };

  const handleSave = () => {
    if (activeTab === 'services') {
      const updated = editingId && services.find(s => s.id === editingId)
        ? services.map(s => s.id === editingId ? formData : s)
        : [...services, formData];
      setServices(updated);
      saveData('services', updated);
    } else if (activeTab === 'projects') {
      const updated = editingId && projects.find(p => p.id === editingId)
        ? projects.map(p => p.id === editingId ? formData : p)
        : [...projects, formData];
      setProjects(updated);
      saveData('projects', updated);
    } else {
      const updated = editingId && blogPosts.find(b => b.id === editingId)
        ? blogPosts.map(b => b.id === editingId ? formData : b)
        : [...blogPosts, formData];
      setBlogPosts(updated);
      saveData('blog', updated);
    }
    
    setEditingId(null);
    setFormData({});
  };

  const handleDelete = (id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    
    if (activeTab === 'services') {
      const updated = services.filter(s => s.id !== id);
      setServices(updated);
      saveData('services', updated);
    } else if (activeTab === 'projects') {
      const updated = projects.filter(p => p.id !== id);
      setProjects(updated);
      saveData('projects', updated);
    } else {
      const updated = blogPosts.filter(b => b.id !== id);
      setBlogPosts(updated);
      saveData('blog', updated);
    }
  };

  const renderList = () => {
    const items = activeTab === 'services' ? services : activeTab === 'projects' ? projects : blogPosts;
    
    return (
      <div className="space-y-4">
        {items.map((item: any) => (
          <div key={item.id} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-white text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-white/60 text-sm mb-2">{item.description || item.excerpt}</p>
              {item.category && <span className="text-white/40 text-xs uppercase">{item.category}</span>}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(item)}
                className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
              >
                <Edit2 className="w-4 h-4 text-white" />
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="p-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4 text-red-400" />
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderForm = () => {
    if (!editingId) return null;

    return (
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 mb-6">
        <h3 className="text-white text-xl font-bold mb-4">
          {formData.title ? 'Edit' : 'Add'} {activeTab.slice(0, -1)}
        </h3>
        
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            value={formData.title || ''}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-white/40"
          />
          
          {activeTab !== 'services' && (
            <input
              type="text"
              placeholder="Category"
              value={formData.category || ''}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-white/40"
            />
          )}
          
          <textarea
            placeholder={activeTab === 'blog' ? 'Excerpt' : 'Description'}
            value={formData.description || formData.excerpt || ''}
            onChange={(e) => setFormData({ ...formData, [activeTab === 'blog' ? 'excerpt' : 'description']: e.target.value })}
            rows={4}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-white/40 resize-none"
          />
          
          <input
            type="text"
            placeholder="Image URL"
            value={formData.image || ''}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-white/40"
          />
          
          {activeTab === 'projects' && (
            <select
              value={formData.align || 'left'}
              onChange={(e) => setFormData({ ...formData, align: e.target.value })}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-white/40"
            >
              <option value="left">Image Left</option>
              <option value="right">Image Right</option>
            </select>
          )}
          
          <div className="flex gap-3">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-lg hover:bg-white/90 transition-colors font-medium"
            >
              <Save className="w-4 h-4" />
              Save
            </button>
            <button
              onClick={() => {
                setEditingId(null);
                setFormData({});
              }}
              className="px-6 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-[#1e1914]/80 backdrop-blur-md z-50 overflow-y-auto">
      <div className="min-h-screen p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-5xl font-bold text-white">Admin Dashboard</h1>
            <button
              onClick={onClose}
              className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 mb-8">
            <button
              onClick={() => setActiveTab('services')}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                activeTab === 'services'
                  ? 'bg-white text-black'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              Services
            </button>
            <button
              onClick={() => setActiveTab('projects')}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                activeTab === 'projects'
                  ? 'bg-white text-black'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              Projects
            </button>
            <button
              onClick={() => setActiveTab('blog')}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                activeTab === 'blog'
                  ? 'bg-white text-black'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              Blog
            </button>
          </div>

          {/* Add Button */}
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-lg hover:bg-white/90 transition-colors font-medium mb-6"
          >
            <Plus className="w-4 h-4" />
            Add New {activeTab.slice(0, -1)}
          </button>

          {/* Form */}
          {renderForm()}

          {/* List */}
          {renderList()}
        </div>
      </div>
    </div>
  );
}
