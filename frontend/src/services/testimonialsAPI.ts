import api, { authApi } from './api';

export interface Testimonial {
  id: number;
  name: string;
  location: string;
  text: string;
  rating: number;
  project?: string;
  order_index: number;
  is_active: boolean;
  is_featured?: boolean;
  created_at: string;
  updated_at: string;
}

export interface TestimonialCreate {
  name: string;
  location: string;
  text: string;
  rating?: number;
  project?: string;
  order_index?: number;
  is_active?: boolean;
  is_featured?: boolean;
}

// ── Public endpoints ───────────────────────────────────────────────────────────

export const getActiveTestimonials = async (): Promise<Testimonial[]> => {
  const response = await api.get<Testimonial[]>('/testimonials/active');
  return Array.isArray(response.data) ? response.data : [];
};

export const getFeaturedTestimonials = async (limit: number = 3): Promise<Testimonial[]> => {
  const response = await api.get<Testimonial[]>(`/testimonials/featured?limit=${limit}`);
  return Array.isArray(response.data) ? response.data : [];
};

export const getTestimonialById = async (id: number): Promise<Testimonial> => {
  const response = await api.get<Testimonial>(`/testimonials/${id}`);
  return response.data;
};

// ── Admin endpoints (require session cookie) ───────────────────────────────────

export const getAllTestimonials = async (): Promise<Testimonial[]> => {
  const response = await authApi.get<Testimonial[]>('/testimonials');
  return Array.isArray(response.data) ? response.data : [];
};

export const createTestimonial = async (data: TestimonialCreate): Promise<Testimonial> => {
  const response = await authApi.post<Testimonial>('/testimonials/', data);
  return response.data;
};

export const updateTestimonial = async (id: number, data: Partial<TestimonialCreate>): Promise<Testimonial> => {
  const response = await authApi.put<Testimonial>(`/testimonials/${id}`, data);
  return response.data;
};

export const deleteTestimonial = async (id: number): Promise<void> => {
  await authApi.delete(`/testimonials/${id}`);
};

export const toggleTestimonialActive = async (id: number): Promise<Testimonial> => {
  const response = await authApi.patch<Testimonial>(`/testimonials/${id}/toggle`);
  return response.data;
};

export const reorderTestimonial = async (id: number, newOrder: number): Promise<Testimonial> => {
  const response = await authApi.patch<Testimonial>(`/testimonials/${id}/reorder?new_order=${newOrder}`);
  return response.data;
};