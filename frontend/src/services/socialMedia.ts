import api from './api';

export interface SocialMediaLink {
  id: number;
  platform: string;
  url: string;
  icon?: string;
  order_index: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface SocialMediaCreate {
  platform: string;
  url: string;
  icon?: string;
  order_index?: number;
  is_active?: boolean;
}

// Get all social media links (admin only)
export const getAllSocialMedia = async (): Promise<SocialMediaLink[]> => {
  const response = await api.get<SocialMediaLink[]>('/social-media');
  return response.data;
};

// Get active social media links only (public)
export const getActiveSocialMedia = async (): Promise<SocialMediaLink[]> => {
  const response = await api.get<SocialMediaLink[]>('/social-media/active');
  return response.data;
};

// Get single social media link
export const getSocialMediaById = async (id: number): Promise<SocialMediaLink> => {
  const response = await api.get<SocialMediaLink>(`/social-media/${id}`);
  return response.data;
};

// Create social media link (admin only)
export const createSocialMedia = async (data: SocialMediaCreate): Promise<SocialMediaLink> => {
  const response = await api.post<SocialMediaLink>('/social-media/', data);
  return response.data;
};

// Update social media link (admin only)
export const updateSocialMedia = async (id: number, data: Partial<SocialMediaCreate>): Promise<SocialMediaLink> => {
  const response = await api.put<SocialMediaLink>(`/social-media/${id}`, data);
  return response.data;
};

// Delete social media link (admin only)
export const deleteSocialMedia = async (id: number): Promise<void> => {
  await api.delete(`/social-media/${id}`);
};

// Toggle active status (admin only)
export const toggleSocialMediaActive = async (id: number): Promise<SocialMediaLink> => {
  const response = await api.patch<SocialMediaLink>(`/social-media/${id}/toggle`);
  return response.data;
};

// Reorder social media links (admin only)
export const reorderSocialMedia = async (id: number, newOrder: number): Promise<SocialMediaLink> => {
  const response = await api.patch<SocialMediaLink>(`/social-media/${id}/reorder?new_order=${newOrder}`);
  return response.data;
};