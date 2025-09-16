
export interface GuessResult {
    guess: number[];
    hits: number;
    fouls: number;
    strikes: number;
}

export type GameMode = 'daily' | 'practice';
export type GameResult = 'homerun' | 'strikeout' | null;

export type AchievementStatus = 'locked' | 'claimable' | 'claimed';

export interface Achievement {
    id: string;
    icon: string;
    titleKey: string;
    descriptionKey: string;
    status: AchievementStatus;
    reward: number;
}

export interface RankEntry {
    rank: number;
    player: string;
    record: string;
    reward: string;
}

export interface IDKitResult {
    merkle_root: string;
    nullifier_hash: string;
    proof: string;
    // Fix: Made credential_type optional to align with the type provided by IDKitWidget's onSuccess callback.
    credential_type?: string;
}

export type Theme = 'light' | 'dark' | 'dusk' | 'sakura';

export type Language = 
  | 'en' | 'es' | 'pt' | 'fr' | 'ru' | 'ar' 
  | 'hi' | 'ur' | 'bn' | 'id' | 'am' | 'ja' 
  | 'zh' | 'tl' | 'vi' | 'ko' | 'de';

export interface LanguageOption {
  code: Language;
  nativeName: string;
  flag: string;
}

export interface Translation {
  [key: string]: string | string[] | Translation;
}

export interface Translations {
  en: Translation;
  es: Translation;
  pt: Translation;
  fr: Translation;
  ru: Translation;
  ar: Translation;
  hi: Translation;
  ur: Translation;
  bn: Translation;
  id: Translation;
  am: Translation;
  ja: Translation;
  zh: Translation;
  tl: Translation;
  vi: Translation;
  ko: Translation;
  de: Translation;
}