export interface Media {
  copyright: string;
  date: string;
  explanation: string;
  media_type: string;
  service_version: string;
  title: string;
  url: string;
}

export type MediaResponse = Media | Media[];