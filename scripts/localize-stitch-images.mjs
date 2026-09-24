// One-time asset migration. Preserve the imported illustrations under each paper's folder.
import { readFile, writeFile, mkdir, access } from "node:fs/promises";
import { resolve, dirname } from "node:path";

const root = resolve(import.meta.dirname, "..");
const manifest = JSON.parse(
  await readFile(
    resolve(root, "design/stitch-export/asset-manifest.json"),
    "utf8",
  ),
);
const dataFile = resolve(root, "src/data/publications.json");
const papers = JSON.parse(await readFile(dataFile, "utf8"));
const cache = new Map();

// Optional recovery when the browser can reach Google but the Node connection cannot.
// Supply one saved response body per unique URL, in manifest order.
if (process.argv[2] === "--from-browser") {
  const urls = [...new Set(manifest.map((asset) => asset.originalUrl))];
  const files = process.argv.slice(3);
  if (files.length !== urls.length)
    throw new Error(`Expected ${urls.length} saved browser response files.`);
  for (let i = 0; i < urls.length; i++) {
    const bytes = await readFile(resolve(root, files[i]));
    const extension =
      bytes[0] === 0xff && bytes[1] === 0xd8
        ? "jpg"
        : bytes.subarray(1, 4).toString() === "PNG"
          ? "png"
          : bytes.subarray(8, 12).toString() === "WEBP"
            ? "webp"
            : null;
    if (!extension) throw new Error(`Not a supported image: ${files[i]}`);
    cache.set(urls[i], { bytes, extension });
  }
}

for (const asset of manifest) {
  const paper = papers.find((entry) => entry.id === asset.id);
  // Never overwrite an image selected by the user after the migration.
  if (paper?.image?.src !== asset.originalUrl) continue;
  if (!cache.has(asset.originalUrl)) {
    const response = await fetch(asset.originalUrl, {
      signal: AbortSignal.timeout(30000),
    });
    if (!response.ok)
      throw new Error(`Image fetch failed: ${response.status} (${asset.id})`);
    const type = response.headers.get("content-type") ?? "";
    const extension = type.includes("png")
      ? "png"
      : type.includes("webp")
        ? "webp"
        : type.includes("jpeg")
          ? "jpg"
          : null;
    if (!extension) throw new Error(`Unexpected image content type: ${type}`);
    cache.set(asset.originalUrl, {
      bytes: Buffer.from(await response.arrayBuffer()),
      extension,
    });
  }
  const { bytes, extension } = cache.get(asset.originalUrl);
  const relative = `public/images/research/${asset.id}/stitch-preview.${extension}`;
  const destination = resolve(root, relative);
  try {
    await access(destination);
    throw new Error(`Refusing to overwrite ${relative}`);
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }
  await mkdir(dirname(destination), { recursive: true });
  await writeFile(destination, bytes);
  paper.image.src = relative.slice("public".length);
  asset.localPath = relative;
  console.log(`${asset.id}: ${relative} (${bytes.length} bytes)`);
}
await writeFile(dataFile, JSON.stringify(papers, null, 2) + "\n");
await writeFile(
  resolve(root, "design/stitch-export/asset-manifest.json"),
  JSON.stringify(manifest, null, 2) + "\n",
);
