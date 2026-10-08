export interface CostumeStat {
  label: string;
  value: number;
  max: number;
  color: string;
}

export interface ColorVariant {
  id: string;
  name: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  patternColor: string;
  description: string;
}

export type CostumeId =
  | 'ao-ma-doan'
  | 'ao-trang-vat'
  | 'ao-tac-nam'
  | 'ao-ngu-than-nam'
  | 'ao-tu-than'
  | 'ao-lap-linh'
  | 'ao-nhat-binh'
  | 'ao-tac'
  | 'ao-giao-linh'
  | 'ao-ngu-than';

export interface Costume {
  id: CostumeId;
  name: string;
  chineseName?: string;
  gender: 'male' | 'female' | 'unisex';
  era: string;
  dynastyTag: string;
  rarity: 'Sử Thi (Epic)' | 'Vương Giả (Royal)' | 'Cổ Phong (Ancient)' | 'Chuẩn Mực (Standard)';
  tags: string[]; // e.g. ['Triều phục', 'Uy nghiêm'], ['Dân gian', 'Lao động'], ['Đoan trang']
  baseScore: number;
  specificNote?: string;
  characteristics: string[];
  fullDescription: string;
  historyLore: string;
  colors: string[];
  colorVariants: ColorVariant[];
  stats: CostumeStat[];
  anatomy: {
    collar: string;
    sleeves: string;
    panels: string;
    accessories: string;
  };
  quote: string;
}

export type AccessoryId =
  | 'man'
  | 'non-ba-tam'
  | 'kieng-bac'
  | 'quat-lua-tron'
  | 'hai-mui-vut'
  | 'khan-xep'
  | 'the-bai-nga'
  | 'guoc-moc'
  | 'non-la-co-hut'
  | 'quai-thao-kep'
  | 'tram-cai-da';

export interface Accessory {
  id: AccessoryId;
  name: string;
  gender: 'male' | 'female' | 'unisex';
  slot: 'head' | 'neck' | 'hand' | 'feet' | 'waist';
  tags: string[];
  scoreBonus: number;
  compatibleCostumeIds: string[];
  incompatibleCostumeIds: string[];
  description: string;
  icon: string;
}

export type SceneId = 'cung-dinh' | 'dam-sen' | 'hoi-an';

export interface Scene {
  id: SceneId;
  name: string;
  shortName: string;
  subtitle: string;
  icon: string;
  timeOfDay: string;
  wardrobeObjectName: string;
  wardrobeClosedIcon: string;
  wardrobeOpenIcon: string;
  description: string;
}

export interface ScoreEvaluation {
  score: number;
  status: 'perfect' | 'good' | 'warning' | 'danger';
  title: string;
  feedback: string;
  sceneCommentary: string;
  ruleBreak: boolean;
  breakDetails?: string;
  bonuses: string[];
  penalties: string[];
}
