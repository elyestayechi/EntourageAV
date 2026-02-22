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

// Patterns that must NEVER get a trailing slash
const NO_SLASH_SUFFIXES = [
  '/auth/login',
  '/auth/logout',
  '/auth/check',
  '/read',
  '/unread',
  '/toggle',
  '/reorder',
  '/active',
  '/images',    // ← project image pairs endpoint
];

api.interceptors.request.use(
  (config) => {
    const url = config.url || '';

    // Strip query string before checking
    const [path] = url.split('?');

    const shouldSkip =
      // Explicit suffix match
      NO_SLASH_SUFFIXES.some((suffix) => path.endsWith(suffix)) ||
      // Route ends with a numeric ID — e.g. /services/1, /projects/42
      /\/\d+$/.test(path) ||
      // Route contains a slug segment — e.g. /blog/slug/my-post, /projects/slug/my-project
      /\/slug\//.test(path);

    if (!shouldSkip && !url.endsWith('/') && !url.includes('?')) {
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