import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api/v1';

// Public API — no credentials, used for all public endpoints
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false,
  timeout: 10000,
});

// Auth API — sends session cookies, used only for admin endpoints
export const authApi = axios.create({
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
  '/images',
];

function addTrailingSlash(config: any) {
  const url = config.url || '';
  const [path] = url.split('?');

  const shouldSkip =
    NO_SLASH_SUFFIXES.some((suffix) => path.endsWith(suffix)) ||
    /\/\d+$/.test(path) ||
    /\/slug\//.test(path);

  if (!shouldSkip && !url.endsWith('/') && !url.includes('?')) {
    config.url = url + '/';
  }

  console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`);
  return config;
}

function handleError(error: any) {
  if (error.code === 'ERR_NETWORK') {
    console.error('[API Error] Network error - backend might be down or CORS issue');
  } else {
    console.error('[API Error]', error.response?.status, error.response?.data);
  }
  return Promise.reject(error);
}

// Apply interceptors to both instances
[api, authApi].forEach((instance) => {
  instance.interceptors.request.use(addTrailingSlash, (error) => Promise.reject(error));
  instance.interceptors.response.use(
    (response) => {
      console.log(`[API Response] ${response.status} ${response.config.url}`);
      return response;
    },
    handleError
  );
});

export default api;