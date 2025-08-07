export interface BuildData {
  id: string;
  name: string;
  class: string;
  playstyle: string;
  rating: number;
  difficulty?: string;
  author?: string;
  source_url?: string;
  source_site?: string;
  tags: string[];
  skills: {
    primary: string[];
    secondary: string[];
    ultimate: string;
  };
  gear: {
    weapon: string;
    armor: string[];
    accessories: string[];
  };
  stats: {
    damage: number;
    defense: number;
    speed: number;
    utility: number;
  };
  season?: string;
  patch_version?: string;
  is_meta?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface UserBuild {
  id: string;
  user_id: string;
  build_id: string;
  custom_name?: string;
  notes?: string;
  is_favorite: boolean;
  created_at: string;
  updated_at: string;
  build?: BuildData;
}