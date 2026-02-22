/**
 * Utility function to handle image paths consistently
 * Supports:
 * - External URLs (http://, https://)
 * - Absolute paths (/images/...)
 * - Relative paths (will be treated as /images/...)
 * - Undefined/null (returns placeholder)
 */
export const getImageUrl = (path?: string | null): string => {
    if (!path) return '/placeholder.jpg';
    
    // If it's already a full URL or absolute path, return as is
    if (path.startsWith('http') || path.startsWith('https') || path.startsWith('/')) {
      return path;
    }
    
    // Otherwise, assume it's in the public/images folder
    return `/images/${path}`;
  };
  
  /**
   * For imported assets (vite imports)
   * Use this when you have: import img from '../assets/image.jpg'
   */
  export const getAssetUrl = (importedAsset: string): string => {
    return importedAsset;
  };