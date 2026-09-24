export interface Photo {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
  objectPosition?: string;
}

export interface Publication {
  id: string;
  group: "published" | "submitted";
  categories: string[];
  title: string;
  authors: string[];
  venue: string;
  status: string;
  role: string;
  award: string;
  summary: string;
  links: { href: string; label: string }[];
  note: string;
  bibtex: string;
  image: { src: string; alt: string; objectPosition?: string } | null;
  imageLabel: string;
  imageCaption: string;
}
