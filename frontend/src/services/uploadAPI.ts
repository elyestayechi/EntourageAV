import { authApi as api } from './api';

export interface UploadResponse {
  message: string;
  file_path: string;
  url: string;
  full_url?: string; // Computed full backend URL
}

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

export const uploadFile = async (
  file: File,
  subfolder: 'services' | 'projects' | 'blog' | 'testimonials' | ''
): Promise<UploadResponse> => {
  const formData = new FormData();
  formData.append('file', file);

  // Pass subfolder as query param (not in body) — consistent with the backend route
  const response = await api.post<UploadResponse>(
    `/upload/?subfolder=${subfolder}`,
    formData,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
    }
  );

  const data = response.data;

  // Build the full absolute URL so images load correctly regardless of
  // which subfolder (services, blog, projects, testimonials) is used.
  const relativePath = data.url.startsWith('/') ? data.url : `/${data.url}`;
  data.full_url = `${BACKEND_URL}${relativePath}`;

  // Override url with the full URL so callers don't need to worry about it
  data.url = data.full_url;

  return data;
};

export const deleteUploadedFile = async (filePath: string): Promise<void> => {
  await api.delete(`/upload/${filePath}`);
};

/**
 * Helper: resolve any image src to a displayable URL.
 * - If already absolute (https://...), return as-is
 * - If relative (/static/...), prepend backend URL
 */
export const resolveImageUrl = (src: string | undefined | null): string => {
  if (!src) return '';
  if (src.startsWith('http://') || src.startsWith('https://')) return src;
  return `${BACKEND_URL}${src.startsWith('/') ? src : `/${src}`}`;
};