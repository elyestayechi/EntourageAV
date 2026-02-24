import api, { authApi } from './api';

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

// ── Public endpoints ───────────────────────────────────────────────────────────

export const getAllServices = async (): Promise<Service[]> => {
  const response = await api.get<Service[]>('/services/');
  return Array.isArray(response.data) ? response.data : [];
};

export const getServiceById = async (id: number): Promise<Service> => {
  const response = await api.get<Service>(`/services/${id}`);
  return response.data;
};

export const getServiceBySlug = async (slug: string): Promise<Service> => {
  const response = await api.get<Service>(`/services/slug/${slug}`);
  return response.data;
};

// ── Admin endpoints (require session cookie) ───────────────────────────────────

export const createService = async (data: ServiceCreate): Promise<Service> => {
  const response = await authApi.post<Service>('/services/', data);
  return response.data;
};

export const updateService = async (id: number, data: Partial<ServiceCreate>): Promise<Service> => {
  const response = await authApi.put<Service>(`/services/${id}`, data);
  return response.data;
};

export const deleteService = async (id: number): Promise<void> => {
  await authApi.delete(`/services/${id}`);
};