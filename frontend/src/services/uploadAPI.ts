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

  // Check if the URL is already absolute (S3 case) or relative (local case)
  if (data.url.startsWith('http://') || data.url.startsWith('https://')) {
    // S3 case - URL is already complete
    data.full_url = data.url;
    data.url = data.url;
  } else {
    // Local development case - prepend backend URL
    const relativePath = data.url.startsWith('/') ? data.url : `/${data.url}`;
    data.full_url = `${BACKEND_URL}${relativePath}`;
    data.url = data.full_url;
  }

  return data;
};

export const deleteUploadedFile = async (filePath: string): Promise<void> => {
  await authApi.delete(`/upload/${filePath}`);
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