import entries from "./publications.json";
import type { Publication } from "./types";

export const publicationFilters = [
  { id: "all", label: "All" },
  { id: "affective", label: "Affective Computing" },
  { id: "hci", label: "Human-Computer Interaction" },
  { id: "healthcare", label: "AI for Healthcare" },
];

const ids = new Set<string>();
for (const publication of entries) {
  if (!/^[a-z0-9-]+$/.test(publication.id) || ids.has(publication.id)) {
    throw new Error(
      `Publication id must be unique and lowercase: ${publication.id}`,
    );
  }
  ids.add(publication.id);
  if (!["published", "submitted"].includes(publication.group)) {
    throw new Error(`Invalid publication group: ${publication.id}`);
  }
  if (
    !publication.categories.length ||
    publication.categories.some(
      (category) =>
        !publicationFilters.slice(1).some((filter) => filter.id === category),
    )
  ) {
    throw new Error(`Invalid publication categories: ${publication.id}`);
  }
  if (!publication.title || !publication.authors.length) {
    throw new Error(`Missing title or authors: ${publication.id}`);
  }
}

export const publications = entries as Publication[];
