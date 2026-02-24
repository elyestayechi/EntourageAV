import api, { authApi } from './api';

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

// ── Public endpoints ───────────────────────────────────────────────────────────

export const getActiveSocialMedia = async (): Promise<SocialMediaLink[]> => {
  const response = await api.get<SocialMediaLink[]>('/social-media/active');
  return Array.isArray(response.data) ? response.data : [];
};

export const getSocialMediaById = async (id: number): Promise<SocialMediaLink> => {
  const response = await api.get<SocialMediaLink>(`/social-media/${id}`);
  return response.data;
};

// ── Admin endpoints (require session cookie) ───────────────────────────────────

export const getAllSocialMedia = async (): Promise<SocialMediaLink[]> => {
  const response = await authApi.get<SocialMediaLink[]>('/social-media');
  return Array.isArray(response.data) ? response.data : [];
};

export const createSocialMedia = async (data: SocialMediaCreate): Promise<SocialMediaLink> => {
  const response = await authApi.post<SocialMediaLink>('/social-media/', data);
  return response.data;
};

export const updateSocialMedia = async (id: number, data: Partial<SocialMediaCreate>): Promise<SocialMediaLink> => {
  const response = await authApi.put<SocialMediaLink>(`/social-media/${id}`, data);
  return response.data;
};

export const deleteSocialMedia = async (id: number): Promise<void> => {
  await authApi.delete(`/social-media/${id}`);
};

export const toggleSocialMediaActive = async (id: number): Promise<SocialMediaLink> => {
  const response = await authApi.patch<SocialMediaLink>(`/social-media/${id}/toggle`);
  return response.data;
};

export const reorderSocialMedia = async (id: number, newOrder: number): Promise<SocialMediaLink> => {
  const response = await authApi.patch<SocialMediaLink>(`/social-media/${id}/reorder?new_order=${newOrder}`);
  return response.data;
};