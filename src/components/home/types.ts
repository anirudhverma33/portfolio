export interface Img {
  src: string;
  srcSet?: string;
  width: number;
  height: number;
  alt: string;
}

export interface Links {
  about: string;
  research: string;
  papers: string;
  contact: string;
}

export interface ProjectData {
  slug: string;
  href: string;
  category: string;
  title: string;
  summary: string;
  status: string;
  images: Img[];
}

export interface ExperienceItem {
  period: string;
  role: string;
  place: string;
  detail: string;
  with: string;
}
