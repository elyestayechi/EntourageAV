import { authApi } from './api';

export interface UploadResponse {
  message: string;
  file_path: string;
  url: string;
  full_url?: string;
}

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

// ── Admin endpoint (require session cookie) ────────────────────────────────────

export const uploadFile = async (
  file: File,
  subfolder: 'services' | 'projects' | 'blog' | 'testimonials' | ''
): Promise<UploadResponse> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await authApi.post<UploadResponse>(
    '/upload/',
    formData,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
      params: { subfolder },
    }
  );

  const data = response.data;

  // The backend now returns a fully absolute proxied URL like:
  // https://entourageav-production.up.railway.app/api/v1/upload/media/services/xxx.jpg
  // We just use it as-is — no need to prepend anything.
  data.full_url = data.url;

  return data;
};

export const deleteUploadedFile = async (filePath: string): Promise<void> => {
  await authApi.delete(`/upload/${filePath}`);
};

/**
 * Resolve any image src to a displayable URL.
 * - Already absolute (https://...) → return as-is
 * - Relative (/static/... or /api/...) → prepend BACKEND_URL
 * - Anything else → return as-is
 */
export const resolveImageUrl = (src: string | undefined | null): string => {
  if (!src) return '';
  if (src.startsWith('http://') || src.startsWith('https://')) return src;
  // Relative path — prepend backend
  return `${BACKEND_URL}${src.startsWith('/') ? src : `/${src}`}`;
};