import api, { authApi } from './api';

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  content?: string;
  image?: string;
  author?: string;
  read_time?: string;
  created_at: string;
  updated_at: string;
}

export interface BlogCreate {
  slug: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  content?: string;
  image?: string;
  author?: string;
  read_time?: string;
}

// ── Public endpoints ───────────────────────────────────────────────────────────

export const getAllBlogPosts = async (params?: {
  category?: string;
  search?: string;
  skip?: number;
  limit?: number;
}): Promise<BlogPost[]> => {
  const response = await api.get<BlogPost[]>('/blog/', { params });
  return Array.isArray(response.data) ? response.data : [];
};

export const getBlogPostById = async (id: number): Promise<BlogPost> => {
  const response = await api.get<BlogPost>(`/blog/${id}`);
  return response.data;
};

export const getBlogPostBySlug = async (slug: string): Promise<BlogPost> => {
  const response = await api.get<BlogPost>(`/blog/slug/${slug}`);
  return response.data;
};

export const getRelatedPosts = async (
  category: string,
  currentPostId: number,
  limit: number = 2
): Promise<BlogPost[]> => {
  const response = await api.get<BlogPost[]>('/blog/', {
    params: { category, limit, exclude_id: currentPostId },
  });
  return Array.isArray(response.data) ? response.data : [];
};

// ── Admin endpoints (require session cookie) ───────────────────────────────────

export const createBlogPost = async (data: BlogCreate): Promise<BlogPost> => {
  const response = await authApi.post<BlogPost>('/blog/', data);
  return response.data;
};

export const updateBlogPost = async (id: number, data: Partial<BlogCreate>): Promise<BlogPost> => {
  const response = await authApi.put<BlogPost>(`/blog/${id}`, data);
  return response.data;
};

export const deleteBlogPost = async (id: number): Promise<void> => {
  await authApi.delete(`/blog/${id}`);
};