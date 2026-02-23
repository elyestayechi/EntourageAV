import { authApi as api } from './api';

export interface UploadResponse {
  message: string;
  file_path: string;
  url: string;
  full_url?: string;
}

const BACKEND_URL = import.meta.env.VITE_API_URL?.replace('/api/v1', '') || 'http://localhost:8000';

export const uploadFile = async (
  file: File,
  subfolder: 'services' | 'projects' | 'blog' | 'testimonials' | ''
): Promise<UploadResponse> => {
  const formData = new FormData();
  formData.append('file', file);

  // No trailing slash, subfolder as query param — no slash before ?
  const response = await api.post<UploadResponse>(
    `/upload?subfolder=${subfolder}`,
    formData,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
    }
  );

  const data = response.data;
  const relativePath = data.url.startsWith('/') ? data.url : `/${data.url}`;
  data.full_url = `${BACKEND_URL}${relativePath}`;
  data.url = data.full_url;

  return data;
};

export const deleteUploadedFile = async (filePath: string): Promise<void> => {
  await api.delete(`/upload/${filePath}`);
};

export const resolveImageUrl = (src: string | undefined | null): string => {
  if (!src) return '';
  if (src.startsWith('http://') || src.startsWith('https://')) return src;
  return `${BACKEND_URL}${src.startsWith('/') ? src : `/${src}`}`;
};