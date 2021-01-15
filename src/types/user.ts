interface UserLinks {
  followers: string;
  following: string;
  html: string;
  likes: string;
  photos: string;
  portfolio: string;
  self: string;
}

interface UserProfileImage {
  large: string;
  medium: string;
  small: string;
}

export default interface User {
  accepted_tos: boolean;
  bio: string;
  first_name: string;
  id: string;
  instagram_username?: string;
  last_name: string;
  links: UserLinks;
  location: string;
  name: string;
  portfolio_url: string;
  profile_image: UserProfileImage;
  total_collections: Number;
  total_likes: Number;
  total_photos: Number;
  twitter_username?: string;
  updated_at: string;
  username: string;
}