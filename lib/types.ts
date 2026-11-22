export interface Track {
  id: string;
  title: string;
  artist: string;
  genre: string;
  duration: string;
  art: string;
  audioUrl: string;
  description: string;
  plays: number;
}

export interface Product {
  id: string;
  title: string;
  category: string;
  price: number;
  img: string;
  badge?: string;
  desc: string;
  inStock: boolean;
}

export interface NewsPost {
  id: string;
  title: string;
  tag: string;
  date: string;
  content: string;
}

export interface CartItem {
  id: string;
  title: string;
  price: number;
  img: string;
  qty: number;
}

export interface Activity {
  id: string;
  type: 'visit' | 'play' | 'shop' | 'inquiry' | 'admin';
  guest: string;
  detail: string;
  timestamp: string;
}

export interface Metrics {
  totalVisitors: number;
  pageViews: number;
  trackPlays: number;
  productViews: number;
  cartInquiries: number;
  messagesReceived: number;
  trackPlayCounts?: Record<string, number>;
  productViewCounts?: Record<string, number>;
}

export interface GuestMessage {
  id: string;
  name: string;
  email: string;
  type: string;
  message: string;
  date: string;
}

export interface SiteSettings {
  artistName: string;
  tagline: string;
  bio: string;
  currency: string;
  bookingEmail: string;
  instagram: string;
  spotify: string;
}
