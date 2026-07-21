export interface UtmParams {
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  utm_term: string | null;
  [key: string]: string | null;
}

export interface Scores {
  TypeA: number;
  TypeB: number;
  TypeC: number;
  TypeC1: number;
  TypeC_C1?: number;
  Financing?: number;
  General?: number;
}

export interface Answer {
  questionId: number;
  questionText: string;
  selectedOptionText: string;
  selectedOptionId: string;
  scores: Scores;
}

export interface LeadDetails {
  name: string;
  email: string;
  phone: string;
  utm: UtmParams;
  selectedUnit: string | null;
  answers: Answer[];
  recommendedLayout: string;
  ctaSource: string;
  timestamp: string;
}

export interface AnalyticsEvent {
  event: string;
  timestamp: string;
  data: Record<string, any>;
}

export interface Option {
  id: string;
  text: string;
  description?: string;
  scores: Scores;
}

export interface Question {
  id: number;
  text: string;
  insight?: string;
  description?: string;
  options: Option[];
}

export interface UnitLayout {
  id: string;
  name: string;
  size: string;
  bedrooms: number;
  bathrooms: number;
  isDualKey: boolean;
  features: string[];
  description: string;
  priceEstimate: string;
}
