export type User = {
  id: number;
  deviceId: string;
  username: string;
  createdAt: Date;
};

export type Artist = {
  id: number;
  handle: string;
  bio: string | null;
  avatar: string | null;
  socialLinks: { instagram?: string; twitter?: string; website?: string } | null;
  notionId: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type GraffitiPin = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  images: string[];
  styleTags: string[] | null;
  artistId: number | null;
  status: string;
  city: string | null;
  description: string | null;
  notionId: string | null;
  submittedByUserId: number | null;
  createdAt: Date;
  updatedAt: Date;
};

export type Like = {
  id: number;
  userId: number;
  pinId: number;
  createdAt: Date;
};

export type SavedPin = {
  id: number;
  userId: number;
  pinId: number;
  createdAt: Date;
};

export type PinWithArtist = {
  pin: GraffitiPin;
  artist: Artist | null;
  likeCount: number;
  isLiked?: boolean;
  isSaved?: boolean;
};

export type MapPin = {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
  thumbnail: string;
  styleTags?: string[];
};

export type FilterOptions = {
  style?: string;
  artist?: string;
  city?: string;
  status?: 'active' | 'buffed';
};
