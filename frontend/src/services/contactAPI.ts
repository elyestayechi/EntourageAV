import { authApi as api } from './api';

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

export const submitContactForm = async (data: ContactFormData): Promise<ContactSubmission> => {
  // Build a clean payload — never send undefined/null fields that the backend rejects
  const payload: Record<string, any> = {
    name: data.name,
    email: data.email,
    phone: data.phone || '',
    message: data.message,
    services: data.services ?? [],
    location: data.location ?? '',
  };

  // Only include optional fields if they have a value
  if (data.project_type) payload.project_type = data.project_type;
  if (data.surface) payload.surface = data.surface;

  const response = await api.post<ContactSubmission>('/contacts/', payload);
  return response.data;
};

export const getAllContacts = async (): Promise<ContactSubmission[]> => {
  const response = await api.get<ContactSubmission[]>('/contacts/');
  return response.data;
};

export const getContactById = async (id: number): Promise<ContactSubmission> => {
  const response = await api.get<ContactSubmission>(`/contacts/${id}`);
  return response.data;
};

export const markContactAsRead = async (id: number): Promise<ContactSubmission> => {
  const response = await api.put<ContactSubmission>(`/contacts/${id}/read`);
  return response.data;
};

export const deleteContact = async (id: number): Promise<void> => {
  await api.delete(`/contacts/${id}`);
};