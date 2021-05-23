import type { Document } from "@prismicio/client/types/documents";

export enum ProjectType {
  web = "web",
  design = "design",
  music = "music",
  video = "video",
}

export interface IProject {
  uid: string;
  title: string;
  date: Date;
  logo?: string;
  thumb: string;
  type: ProjectType;
  link?: string;
  description: string;
  stats: { title: string; body: string }[];
  images?: { url: string; alt?: string }[];
  marginIndex: number;
  audio?: { title: string; url: string }[];
}

export const prismicToProject = (doc: Document): IProject => ({
  uid: doc.uid,
  title: doc.data.title,
  date: new Date(doc.data.date),
  logo: doc.data.logo?.url,
  thumb: doc.data.thumb.url,
  type: ProjectType[doc.data.type],
  link: doc.data.link?.url,
  description: doc.data.description,
  stats: doc.data.stats.map((e: any) => ({ title: e.stat_title, body: e.stat_text })),
  images: doc.data.images?.map((e: any) => ({ url: e.image.url, alt: e.image.alt })) ?? [],
  marginIndex: doc.data.image_margin,
  audio: doc.data.music?.map((e: any) => ({ title: e.audio.name.slice(5, -4), url: e.audio.url })),
});

export const projectTypeToString = (type: ProjectType): string => {
  switch (type) {
    case ProjectType.web:
      return "Web Development";
    case ProjectType.design:
      return "UI/UX Design";
    case ProjectType.music:
      return "Music Production";
    case ProjectType.video:
      return "Motion Graphics";
    default:
      throw new Error();
  }
};
