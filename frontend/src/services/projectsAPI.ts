import api, { authApi } from './api';

export interface ProjectImage {
  id: number;
  project_id: number;
  before_image: string;
  after_image: string;
  label?: string;
  order_index: number;
  created_at: string;
}

export interface Project {
  id: number;
  slug: string;
  number: string;
  title: string;
  category: string;
  location: string;
  description: string;
  duration?: string;
  surface?: string;
  image?: string;
  is_featured?: boolean;
  images: ProjectImage[];
  created_at: string;
  updated_at: string;
}

export interface ProjectCreate {
  slug: string;
  number: string;
  title: string;
  category: string;
  location: string;
  description: string;
  duration?: string;
  surface?: string;
  image?: string;
  is_featured?: boolean;
}

export interface ProjectImageCreate {
  before_image: string;
  after_image: string;
  label?: string;
  order_index: number;
}

// ── Public endpoints ───────────────────────────────────────────────────────────

export const getAllProjects = async (category?: string): Promise<Project[]> => {
  const params = category ? { category } : {};
  const response = await api.get<Project[]>('/projects/', { params });
  return Array.isArray(response.data) ? response.data : [];
};

export const getFeaturedProjects = async (limit: number = 3): Promise<Project[]> => {
  const response = await api.get<Project[]>(`/projects/featured?limit=${limit}`);
  return Array.isArray(response.data) ? response.data : [];
};

export const getProjectById = async (id: number): Promise<Project> => {
  const response = await api.get<Project>(`/projects/${id}`);
  return response.data;
};

export const getProjectBySlug = async (slug: string): Promise<Project> => {
  const response = await api.get<Project>(`/projects/slug/${slug}`);
  return response.data;
};

// ── Admin endpoints (require session cookie) ───────────────────────────────────

export const createProject = async (data: ProjectCreate): Promise<Project> => {
  const response = await authApi.post<Project>('/projects/', data);
  return response.data;
};

export const updateProject = async (id: number, data: Partial<ProjectCreate>): Promise<Project> => {
  const response = await authApi.put<Project>(`/projects/${id}`, data);
  return response.data;
};

export const deleteProject = async (id: number): Promise<void> => {
  await authApi.delete(`/projects/${id}`);
};

export const addProjectImage = async (projectId: number, data: ProjectImageCreate): Promise<ProjectImage> => {
  const response = await authApi.post<ProjectImage>(`/projects/${projectId}/images`, data);
  return response.data;
};

export const updateProjectImage = async (imageId: number, data: ProjectImageCreate): Promise<ProjectImage> => {
  const response = await authApi.put<ProjectImage>(`/projects/images/${imageId}`, data);
  return response.data;
};

export const deleteProjectImage = async (imageId: number): Promise<void> => {
  await authApi.delete(`/projects/images/${imageId}`);
};