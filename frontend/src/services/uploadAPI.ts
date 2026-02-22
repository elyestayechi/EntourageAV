import api from './api';

export interface UploadResponse {
  message: string;
  file_path: string;
  url: string;
}

export const uploadFile = async (
  file: File,
  subfolder: 'services' | 'projects' | 'blog' | 'testimonials' | ''
): Promise<UploadResponse> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await api.post<UploadResponse>(
    `/upload/?subfolder=${subfolder}`,
    formData,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
    }
  );
  return response.data;
};

export const deleteUploadedFile = async (filePath: string): Promise<void> => {
  await api.delete(`/upload/${filePath}`);
};