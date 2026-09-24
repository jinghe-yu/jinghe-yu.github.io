// One-time, mechanical extraction of the supplied Stitch export.
// Do not rerun against maintained source. Existing output files are never overwritten.
import { readFile, writeFile, mkdir, access } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const input = resolve(root, "design/stitch-export/code.html");
const html = (await readFile(input, "utf8")).replace(/\r\n/g, "\n");
const outputs = new Map();
const put = (path, content) => outputs.set(path, content.trim() + "\n");
const decode = (s) =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ");
const text = (s) =>
  decode(
    s
      .replace(/<[^>]*>/g, "")
      .replace(/\s+/g, " ")
      .trim(),
  );
const take = (regex, source = html) => {
  const result = source.match(regex);
  if (!result) throw new Error(`Source structure changed: ${regex}`);
  return result[1];
};
const section = (id) =>
  take(new RegExp(`(<section\\b[^>]*id="${id}"[^>]*>[\\s\\S]*?<\\/section>)`));
const withSite = (markup) => {
  const body = markup
    .replaceAll(
      'href="mailto:yujinghe2026@gmail.com"',
      "href={`mailto:${site.email}`}",
    )
    .replaceAll('href="tel:+8613798160068"', "href={`tel:${site.phoneHref}`}")
    .replaceAll("yujinghe2026@gmail.com", "{site.email}")
    .replaceAll("+86 13798160068", "{site.phone}")
    .replaceAll("Jinghe Yu (余静荷)", "{site.name} ({site.nameLocal})")
    .replaceAll("Guangzhou, China", "{site.location}")
    .replaceAll("Jinghe Yu <span", "{site.name} <span")
    .replaceAll("(余静荷)", "({site.nameLocal})");
  return body;
};

const theme = take(/tailwind\.config = ([\s\S]*?);\s*<\/script>/);
put(
  "tailwind.config.mjs",
  `// Theme extracted from Stitch. Keep v3 for the original class semantics.\nexport default {\n  content: ['./src/**/*.{astro,html,js,ts,json}'],\n  ...${theme}\n};`,
);
const css = take(/<style>([\s\S]*?)<\/style>/);
put(
  "src/styles/global.css",
  `@tailwind base;\n@tailwind components;\n@tailwind utilities;\n\n${css}\n\n[hidden] { display: none !important; }\nsection[id] { scroll-margin-top: 7rem; }\n:focus-visible { outline: 2px solid #72575e; outline-offset: 4px; }\n.pub-filter-btn[aria-pressed="true"] { background: #141414; color: white; font-weight: 700; }\n@media (prefers-reduced-motion: reduce) {\n  html { scroll-behavior: auto !important; }\n  *, *::before, *::after { animation: none !important; transition: none !important; }\n}`,
);

let header = take(/(<header\b[\s\S]*?<\/header>)/);
header = header.replace(
  /<a href="#"[\s\S]*?<\/a>/,
  '<a href="#about" class="font-headline text-xl font-bold tracking-tight" aria-label="Jinghe Yu — About">{site.name}</a>',
);
header = header.replace(
  "Publications (11)",
  "Publications ({publications.length})",
);
put(
  "src/components/SiteHeader.astro",
  `---\nimport { site } from '../data/site';\nimport { publications } from '../data/publications';\n---\n${withSite(header)}`,
);
put(
  "src/components/SiteFooter.astro",
  `---\nimport { site } from '../data/site';\n---\n${withSite(take(/(<footer\b[\s\S]*?<\/footer>)/))}`,
);
let hero = withSite(section("about")).replace(
  "Publications (11 Papers)",
  "Publications ({publications.length} Papers)",
);
hero = hero.replace(
  "<!-- Right: Research Interests",
  "<!-- Right: Research Interests",
);
hero = hero.replace(
  /(<div class="lg:col-span-4 p-6[^>]+>)/,
  "$1\n<Portrait />",
);
put(
  "src/components/sections/Hero.astro",
  `---\nimport { site } from '../../data/site';\nimport { publications } from '../../data/publications';\nimport Portrait from '../media/Portrait.astro';\n---\n${hero}`,
);
put("src/components/sections/Expertise.astro", section("expertise"));
put(
  "src/components/sections/Profile.astro",
  `---\nimport { site } from '../../data/site';\n---\n${withSite(section("profile"))}`,
);

const ids = [
  "icimh2025",
  "emomirror26",
  "emotype26",
  "touchsound26",
  "aicabench26",
  "scidata26",
  "liqo",
  "posts-and-threads",
  "mental-health",
  "sentiment-boundaries",
  "ac-bench",
];
const articles = [...html.matchAll(/<article\b[\s\S]*?<\/article>/g)].map(
  (m) => m[0],
);
if (articles.length !== 11) throw new Error("Expected 11 publications.");
const bibtex = Object.fromEntries(
  [...html.matchAll(/(\w+): `(@[\s\S]*?)`/g)].map((m) => [m[1], m[2]]),
);
const assets = [];
const publications = articles.map((article, i) => {
  const id = ids[i];
  const title = text(take(/<h4[^>]*>([\s\S]*?)<\/h4>/, article));
  const paragraphs = [...article.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/g)];
  const authors = text(paragraphs[0][1])
    .replace(/^Authors:\s*/, "")
    .split(", ");
  const summary = text(paragraphs[1][1]);
  const badgeBlock = take(
    /<div class="flex flex-wrap items-center gap-2 mb-2.5">([\s\S]*?)<\/div>/,
    article,
  );
  const badges = [
    ...badgeBlock.matchAll(/<span\b[^>]*>([\s\S]*?)<\/span>/g),
  ].map((m) => text(m[1]));
  const links = [
    ...article.matchAll(/<a\b[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g),
  ].map((m) => ({ href: decode(m[1]), label: text(m[2]) }));
  const venue = badges.shift();
  const status =
    badges.find((b) => /Published|Accepted|Review|Submitted/.test(b)) ?? "";
  const role = badges.find((b) => /Author/.test(b)) ?? "";
  const award = badges.find((b) => /Award/.test(b)) ?? "";
  const note = article.match(
    /<span class="font-mono text-xs text-on-surface-variant italic">([\s\S]*?)<\/span>/,
  )?.[1];
  const imageTag = article.match(/<img\b[^>]*>/)?.[0];
  let image = null;
  let imageLabel = "";
  let imageCaption = "";
  if (imageTag) {
    const src = take(/src="([^"]+)"/, imageTag);
    const alt = take(/data-alt="([^"]+)"/, imageTag);
    image = { src, alt, objectPosition: "center" };
    const overlay = take(
      /<div class="absolute bottom-3 left-3 right-3[^>]*>([\s\S]*?)<\/div>/,
      article,
    );
    imageLabel = text(take(/<span[^>]*>([\s\S]*?)<\/span>/, overlay));
    imageCaption = text(take(/<p[^>]*>([\s\S]*?)<\/p>/, overlay));
    assets.push({
      id,
      originalUrl: src,
      localPath: `public/images/research/${id}/stitch-preview.jpg`,
    });
  } else {
    const marker = '<div class="lg:col-span-4 flex flex-col gap-2">';
    const visual = article
      .slice(article.indexOf(marker))
      .replace(/\s*<\/div>\s*<\/article>$/, "")
      .trim();
    put(`src/components/research-visuals/${id}.astro`, visual);
  }
  return {
    id,
    group: i < 6 ? "published" : "submitted",
    categories: [take(/data-category="([^"]+)"/, article)],
    title,
    authors,
    venue,
    status,
    role,
    award,
    summary,
    links,
    note: note ? text(note) : "",
    bibtex: bibtex[id] ?? "",
    image,
    imageLabel,
    imageCaption,
  };
});
put("src/data/publications.json", JSON.stringify(publications, null, 2));
put(
  "design/stitch-export/asset-manifest.json",
  JSON.stringify(assets, null, 2),
);

// Preflight every destination before writing any extracted files.
for (const relative of outputs.keys()) {
  try {
    await access(resolve(root, relative));
  } catch {
    continue;
  }
  throw new Error(`Refusing to overwrite ${relative}`);
}
for (const [relative, content] of outputs) {
  const destination = resolve(root, relative);
  await mkdir(dirname(destination), { recursive: true });
  await writeFile(destination, content, "utf8");
}
console.log(
  `Extracted ${outputs.size} files, ${publications.length} papers, ${Object.keys(bibtex).length} citations.`,
);
