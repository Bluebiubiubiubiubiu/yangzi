// 数据类型定义

export type WorkStatus = 'aired' | 'upcoming' | 'filming' | 'pre-production';
export type WorkType = 'tv' | 'movie' | 'variety' | 'music' | 'short';

export interface Work {
  id: string;
  title: string;
  titleEn?: string;
  type: WorkType;
  status: WorkStatus;
  role?: string;
  poster: string;
  year: number;
  filmingDate?: string;
  releaseDate?: string;
  platform?: string;
  description?: string;
  trailer?: string;
  // 实绩数据
  viewCount?: string;
  rating?: number;
  ratingSource?: string;
  peakHeat?: number;
  tvRating?: string;
  dailyChampionCount?: number;
  awards?: string[];
  achievements?: string[];
}

export interface Achievement {
  workId: string;
  workTitle: string;
  metrics: {
    viewCount?: string;
    rating?: number;
    peakHeat?: number;
    tvRating?: string;
    awards?: string[];
  };
  charts?: {
    date: string;
    value: number;
    label: string;
  }[];
}

export interface Schedule {
  id: string;
  date: string;
  city: string;
  type: 'variety' | 'brand' | 'filming' | 'event' | 'other';
  title: string;
  description?: string;
  images?: string[];
}

export interface Brand {
  id: string;
  name: string;
  nameEn?: string;
  logo: string;
  image: string;
  title: string;
  category: 'luxury' | 'beauty' | 'food' | 'fashion' | 'auto' | 'lifestyle';
  status: 'active' | 'past';
  startDate?: string;
  endDate?: string;
  description?: string;
  level?: string;
}

export interface Magazine {
  id: string;
  name: string;
  nameEn?: string;
  coverImage: string;
  issue: string;
  date: string;
  sales?: string;
}

export interface Award {
  id: string;
  name: string;
  ceremony: string;
  category: string;
  year: number;
  work?: string;
  image?: string;
  type: 'film' | 'music' | 'commercial' | 'official';
  status?: 'winner' | 'nomination';
}

export interface GalleryItem {
  id: string;
  image: string;
  thumbnail: string;
  category: 'event' | 'official' | 'drama' | 'magazine' | 'daily';
  date: string;
  title?: string;
  tags?: string[];
}

export interface Stats {
  totalFans: string;
  totalWorks: number;
  totalBrands: number;
  totalAwards: number;
}

