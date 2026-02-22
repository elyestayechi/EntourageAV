import api from './api';

export interface Testimonial {
  id: number;
  name: string;
  location: string;
  text: string;
  rating: number;
  project?: string;
  order_index: number;
  is_active: boolean;
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
}

// Get all testimonials (admin only)
export const getAllTestimonials = async (): Promise<Testimonial[]> => {
  const response = await api.get<Testimonial[]>('/testimonials');
  return response.data;
};

// Get active testimonials only (public)
export const getActiveTestimonials = async (): Promise<Testimonial[]> => {
  const response = await api.get<Testimonial[]>('/testimonials/active');
  return response.data;
};

// Get single testimonial
export const getTestimonialById = async (id: number): Promise<Testimonial> => {
  const response = await api.get<Testimonial>(`/testimonials/${id}`);
  return response.data;
};

// Create testimonial (admin only)
export const createTestimonial = async (data: TestimonialCreate): Promise<Testimonial> => {
  const response = await api.post<Testimonial>('/testimonials/', data);
  return response.data;
};

// Update testimonial (admin only)
export const updateTestimonial = async (id: number, data: Partial<TestimonialCreate>): Promise<Testimonial> => {
  const response = await api.put<Testimonial>(`/testimonials/${id}`, data);
  return response.data;
};

// Delete testimonial (admin only)
export const deleteTestimonial = async (id: number): Promise<void> => {
  await api.delete(`/testimonials/${id}`);
};

// Toggle active status (admin only)
export const toggleTestimonialActive = async (id: number): Promise<Testimonial> => {
  const response = await api.patch<Testimonial>(`/testimonials/${id}/toggle`);
  return response.data;
};

// Reorder testimonials (admin only)
export const reorderTestimonial = async (id: number, newOrder: number): Promise<Testimonial> => {
  const response = await api.patch<Testimonial>(`/testimonials/${id}/reorder?new_order=${newOrder}`);
  return response.data;
};