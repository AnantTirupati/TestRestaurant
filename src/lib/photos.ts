export type Photo = {
  src: string;
  alt: string;
  /** width / height — used to reserve space and choose crops. */
  ratio: number;
};

/**
 * Build a photo reference from an Unsplash photo id.
 * Resizing is handled by Unsplash's CDN via the custom loader in
 * `src/lib/image-loader.ts`, so every <Image> gets correctly sized srcsets.
 */
export function photo(id: string, alt: string, ratio: number): Photo {
  return { src: `https://images.unsplash.com/photo-${id}`, alt, ratio };
}
