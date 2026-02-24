const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

/**
 * Resolve any image path to a displayable URL.
 * - Already absolute (http/https) → return as-is
 * - Relative path (/static/... or /api/...) → prepend BACKEND_URL
 * - Empty/null → return placeholder
 */
export const getImageUrl = (path?: string | null): string => {
  if (!path) return '/placeholder.jpg';

  // Already a full URL — return as-is, never prepend anything
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }

  // Relative path — prepend backend URL
  return `${BACKEND_URL}${path.startsWith('/') ? path : `/${path}`}`;
};

/**
 * For imported assets (vite imports)
 * Use this when you have: import img from '../assets/image.jpg'
 */
export const getAssetUrl = (importedAsset: string): string => {
  return importedAsset;
};