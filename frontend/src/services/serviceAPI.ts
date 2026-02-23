import { authApi as api } from './api';

export interface Service {
  id: number;
  slug: string;
  number?: string;
  title: string;
  description: string;
  long_description?: string;
  image?: string;
  timeline?: string;
  benefits?: string[];
  created_at: string;
  updated_at: string;
}

export interface ServiceCreate {
  slug: string;
  number?: string;
  title: string;
  description: string;
  long_description?: string;
  image?: string;
  timeline?: string;
  benefits?: string[];
}

// Get all services (public)
export const getAllServices = async (): Promise<Service[]> => {
  const response = await api.get<Service[]>('/services/');
  return response.data;
};

// Get single service by ID
export const getServiceById = async (id: number): Promise<Service> => {
  const response = await api.get<Service>(`/services/${id}`);
  return response.data;
};

// Get service by slug
export const getServiceBySlug = async (slug: string): Promise<Service> => {
  const response = await api.get<Service>(`/services/slug/${slug}`);
  return response.data;
};

// Create service (admin only)
export const createService = async (data: ServiceCreate): Promise<Service> => {
  const response = await api.post<Service>('/services/', data);
  return response.data;
};

// Update service (admin only)
export const updateService = async (id: number, data: Partial<ServiceCreate>): Promise<Service> => {
  const response = await api.put<Service>(`/services/${id}`, data);
  return response.data;
};

// Delete service (admin only)
export const deleteService = async (id: number): Promise<void> => {
  await api.delete(`/services/${id}`);
};