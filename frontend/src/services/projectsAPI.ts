import api from './api';

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
}

export interface ProjectImageCreate {
  before_image: string;
  after_image: string;
  label?: string;
  order_index: number;
}

// Get all projects (with optional category filter)
export const getAllProjects = async (category?: string): Promise<Project[]> => {
  const params = category ? { category } : {};
  const response = await api.get<Project[]>('/projects/', { params });
  return response.data;
};

// Get single project by ID
export const getProjectById = async (id: number): Promise<Project> => {
  const response = await api.get<Project>(`/projects/${id}`);
  return response.data;
};

// Get project by slug
export const getProjectBySlug = async (slug: string): Promise<Project> => {
  const response = await api.get<Project>(`/projects/slug/${slug}`);
  return response.data;
};

// Create project (admin only)
export const createProject = async (data: ProjectCreate): Promise<Project> => {
  const response = await api.post<Project>('/projects/', data);
  return response.data;
};

// Update project (admin only)
export const updateProject = async (id: number, data: Partial<ProjectCreate>): Promise<Project> => {
  const response = await api.put<Project>(`/projects/${id}`, data);
  return response.data;
};

// Delete project (admin only)
export const deleteProject = async (id: number): Promise<void> => {
  await api.delete(`/projects/${id}`);
};

// Add image pair to project (admin only)
export const addProjectImage = async (projectId: number, data: ProjectImageCreate): Promise<ProjectImage> => {
  const response = await api.post<ProjectImage>(`/projects/${projectId}/images/`, data);
  return response.data;
};

// Update image pair (admin only)
export const updateProjectImage = async (imageId: number, data: ProjectImageCreate): Promise<ProjectImage> => {
  const response = await api.put<ProjectImage>(`/projects/images/${imageId}`, data);
  return response.data;
};

// Delete image pair (admin only)
export const deleteProjectImage = async (imageId: number): Promise<void> => {
  await api.delete(`/projects/images/${imageId}`);
};