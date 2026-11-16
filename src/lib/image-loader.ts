"use client";

type LoaderArgs = { src: string; width: number; quality?: number };

/**
 * Global next/image loader.
 * Unsplash images are resized on Unsplash's CDN (auto-format → AVIF/WebP),
 * which keeps the app deployable to any static or serverless host.
 * Local images fall through unchanged.
 */
export default function imageLoader({ src, width, quality }: LoaderArgs) {
  if (src.startsWith("https://images.unsplash.com/")) {
    const url = new URL(src);
    // AVIF/WebP where supported; compact JPEG (never the PNG original) otherwise
    url.searchParams.set("auto", "format");
    url.searchParams.set("fm", "jpg");
    url.searchParams.set("fit", "crop");
    url.searchParams.set("w", String(width));
    url.searchParams.set("q", String(quality ?? 72));
    return url.toString();
  }
  return `${src}${src.includes("?") ? "&" : "?"}w=${width}`;
}
