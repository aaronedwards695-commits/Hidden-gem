export type Category = 'wild_swim' | 'waterfall' | 'wild_camp' | 'viewpoint' | 'gorge';
export type Difficulty = 'easy' | 'moderate' | 'hard';
export type AccessLevel = 'free' | 'pro';

export type Gem = {
  id: string;
  name: string;
  slug: string;
  category: Category;
  region: 'England' | 'Wales' | 'Scotland' | 'Northern Ireland';
  area: string;
  accessLevel: AccessLevel;
  coords: {
    spotLat: number;
    spotLng: number;
    parkingLat: number;
    parkingLng: number;
  };
  summary: string;
  whatToExpect: string;
  parking: string;
  safety: string[];
  tips: string[];
  costs: string;
  tags: string[];
  difficulty: Difficulty;
  bestSeason: string;
  photos: string[];
  osGridRef?: string;
};

export type GemFilters = {
  query?: string;
  categories?: Category[];
  regions?: Gem['region'][];
  difficulties?: Difficulty[];
};
