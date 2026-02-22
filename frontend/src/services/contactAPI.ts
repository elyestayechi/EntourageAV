import api from './api';

export interface ContactSubmission {
  id: number;
  name: string;
  email: string;
  phone: string;
  services: string[];
  location: string;
  project_type?: string;
  surface?: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export interface ContactCreate {
  name: string;
  email: string;
  phone: string;
  services: string[];
  location: string;
  project_type?: string;
  surface?: string;
  message: string;
}

// Submit contact form (public)
export const submitContactForm = async (data: ContactCreate): Promise<ContactSubmission> => {
  const response = await api.post<ContactSubmission>('/contacts/', data);
  return response.data;
};

// Get all contact submissions (admin only)
export const getAllContacts = async (unreadOnly?: boolean): Promise<ContactSubmission[]> => {
  const params = unreadOnly ? { unread_only: true } : {};
  const response = await api.get<ContactSubmission[]>('/contacts/', { params });
  return response.data;
};

// Get single contact submission (admin only)
export const getContactById = async (id: number): Promise<ContactSubmission> => {
  const response = await api.get<ContactSubmission>(`/contacts/${id}/`);
  return response.data;
};

// Mark as read (admin only) — no trailing slash, backend route has none
export const markContactAsRead = async (id: number): Promise<ContactSubmission> => {
  const response = await api.patch<ContactSubmission>(`/contacts/${id}/read`);
  return response.data;
};

// Mark as unread (admin only)
export const markContactAsUnread = async (id: number): Promise<ContactSubmission> => {
  const response = await api.patch<ContactSubmission>(`/contacts/${id}/unread`);
  return response.data;
};

// Delete contact submission (admin only)
export const deleteContact = async (id: number): Promise<void> => {
  await api.delete(`/contacts/${id}`);
};