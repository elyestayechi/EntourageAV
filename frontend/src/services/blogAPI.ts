import { authApi as api } from './api';

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

// Get all blog posts (with optional filters)
export const getAllBlogPosts = async (params?: {
  category?: string;
  search?: string;
  skip?: number;
  limit?: number;
}): Promise<BlogPost[]> => {
  const response = await api.get<BlogPost[]>('/blog/', { params });
  return response.data;
};

// Get single blog post by ID
export const getBlogPostById = async (id: number): Promise<BlogPost> => {
  const response = await api.get<BlogPost>(`/blog/${id}`);
  return response.data;
};

// Get blog post by slug
export const getBlogPostBySlug = async (slug: string): Promise<BlogPost> => {
  const response = await api.get<BlogPost>(`/blog/slug/${slug}`);
  return response.data;
};

// Create blog post (admin only)
export const createBlogPost = async (data: BlogCreate): Promise<BlogPost> => {
  const response = await api.post<BlogPost>('/blog/', data);
  return response.data;
};

// Update blog post (admin only)
export const updateBlogPost = async (id: number, data: Partial<BlogCreate>): Promise<BlogPost> => {
  const response = await api.put<BlogPost>(`/blog/${id}`, data);
  return response.data;
};

// Delete blog post (admin only)
export const deleteBlogPost = async (id: number): Promise<void> => {
  await api.delete(`/blog/${id}`);
};

export const getRelatedPosts = async (
  category: string,
  currentPostId: number,
  limit: number = 2
): Promise<BlogPost[]> => {
  const response = await api.get<BlogPost[]>('/blog/', {
    params: { category, limit, exclude_id: currentPostId },
  });
  return response.data;
};