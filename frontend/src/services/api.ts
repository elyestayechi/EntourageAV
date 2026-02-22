import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api/v1';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
  timeout: 10000,
});

// Routes that must NOT get a trailing slash appended
const NO_TRAILING_SLASH = [
  '/auth/login',
  '/auth/logout',
  '/auth/check',
  '/read',
  '/unread',
  '/toggle',
  '/reorder',
  '/active',
];

api.interceptors.request.use(
  (config) => {
    const url = config.url || '';
    const shouldSkip = NO_TRAILING_SLASH.some(pattern => url.endsWith(pattern));

    if (!shouldSkip && !url.includes('?') && !url.endsWith('/')) {
      config.url = url + '/';
    }

    console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => {
    console.log(`[API Response] ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    if (error.code === 'ERR_NETWORK') {
      console.error('[API Error] Network error - backend might be down or CORS issue');
    } else {
      console.error('[API Error]', error.response?.status, error.response?.data);
    }
    return Promise.reject(error);
  }
);

export default api;