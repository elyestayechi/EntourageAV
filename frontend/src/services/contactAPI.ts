import api, { authApi } from './api';

export interface ContactSubmission {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  services: string[];
  location: string;
  project_type?: string;
  surface?: string;
  is_read: boolean;
  created_at: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  services?: string[];
  location?: string;
  project_type?: string;
  surface?: string;
}

// ── Public endpoint ────────────────────────────────────────────────────────────

export const submitContactForm = async (data: ContactFormData): Promise<ContactSubmission> => {
  const payload: Record<string, any> = {
    name: data.name,
    email: data.email,
    phone: data.phone || '',
    message: data.message,
    services: data.services ?? [],
    location: data.location ?? '',
  };
  if (data.project_type) payload.project_type = data.project_type;
  if (data.surface) payload.surface = data.surface;

  const response = await api.post<ContactSubmission>('/contacts/', payload);
  return response.data;
};

// ── Admin endpoints (require session cookie) ───────────────────────────────────

export const getAllContacts = async (): Promise<ContactSubmission[]> => {
  const response = await authApi.get<ContactSubmission[]>('/contacts/');
  return Array.isArray(response.data) ? response.data : [];
};

export const getContactById = async (id: number): Promise<ContactSubmission> => {
  const response = await authApi.get<ContactSubmission>(`/contacts/${id}`);
  return response.data;
};

export const markContactAsRead = async (id: number): Promise<ContactSubmission> => {
  const response = await authApi.patch<ContactSubmission>(`/contacts/${id}/read`);
  return response.data;
};

export const deleteContact = async (id: number): Promise<void> => {
  await authApi.delete(`/contacts/${id}`);
};