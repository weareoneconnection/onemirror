export type WorldType =
  | "fragmented-collapse"
  | "guarded-tribalism"
  | "cold-efficiency-state"
  | "extractive-economy"
  | "hyper-competitive-order"
  | "cooperative-civilization"
  | "compassion-network"
  | "resilient-open-world";

export type MirrorScores = {
  trust: number;
  cooperation: number;
  empathy: number;
  stability: number;
  conflict: number;
  openness: number;
  extraction: number;
  longTermism: number;
};

export type MirrorResult = {
  id: string;
  inputText: string;
  normalizedInput: string;
  worldType: WorldType;
  summary: string;
  shockLine: string;
  consequences: string[];
  scores: MirrorScores;
  source?: string | null;
  createdAt: string;
};
