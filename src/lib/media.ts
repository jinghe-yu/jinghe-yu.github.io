import { existsSync } from "node:fs";
import { resolve, sep } from "node:path";

// Validate local media at build time; never ship a silently broken image path.
export function mediaUrl(src: string): string {
  if (/^https?:\/\//.test(src)) return src;
  if (!src.startsWith("/") || src.startsWith("//")) {
    throw new Error(
      `Use a public URL such as /images/portrait/jinghe-yu.webp: ${src}`,
    );
  }
  const publicRoot = resolve("public");
  const file = resolve(publicRoot, src.slice(1));
  if (!file.startsWith(publicRoot + sep) || !existsSync(file)) {
    throw new Error(
      `Missing public asset: public${src}. Add the file or update its configuration.`,
    );
  }
  // Encode each path segment for filenames that contain spaces or non-ASCII characters.
  const encodedSrc = src
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");
  return `${import.meta.env.BASE_URL.replace(/\/$/, "")}${encodedSrc}`;
}
