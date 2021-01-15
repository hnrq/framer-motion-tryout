import User from './user';

interface ImageLinks {
  download: string;
  download_location: string;
  html: string;
  self: string;
}

interface ImageURLs {
  full: string;
  raw: string;
  regular: string;
  small: string;
  thumb: string;
}

export default interface Image {
  alt_description: string;
  blur_hash: string;
  categories: Array<string>;
  color: string;
  created_at: string;
  current_user_collections: Array<string>;
  description: string;
  height: Number;
  width: Number;
  id: string;
  liked_by_user: boolean;
  likes: Number;
  links: ImageLinks;
  promoted_at: string;
  sponsorship: string;
  updated_at: string;
  urls: ImageURLs;
  user: User;
};
