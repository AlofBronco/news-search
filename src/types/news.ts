export type FetchNewsResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Article[];
};

export type Article = {
  id: number;
  title: string;
  authors: Author[];
  url: string;
  image_url: string;
  news_site: string;
  summary: string;
  published_at: string; // ISO date string
  updated_at: string; // ISO date string
  featured: boolean;
  launches: Launch[];
  events: Event[];
};

export type Author = {
  name: string;
  socials: Socials;
};

export type Socials = {
  x: string | null;
  youtube: string | null;
  instagram: string | null;
  linkedin: string | null;
  mastodon: string | null;
  bluesky: string | null;
};

export type Launch = {
  launch_id: string; // UUID
  provider: string;
};

export type Event = {
  event_id: number;
  provider: string;
};
