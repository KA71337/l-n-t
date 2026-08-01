import type { AgeRating } from "@/lib/games";
import type { IconName } from "@/components/icons";

export const featureKeys = [
  "actors",
  "duration",
  "atmosphere",
  "safety",
  "team",
  "memories",
  "decor",
] as const;

export type FeatureKey = (typeof featureKeys)[number];

export const featureIcons: Record<FeatureKey, IconName> = {
  actors: "drama",
  duration: "timer",
  atmosphere: "ghost",
  safety: "shield",
  team: "users",
  memories: "sparkles",
  decor: "hammer",
};

export const ageKeys = ["age12", "age14", "age16", "age18"] as const;

export type AgeKey = (typeof ageKeys)[number];

export interface AgeTier {
  key: AgeKey;
  rating: AgeRating;
  icon: IconName;
  /** 1-4, drives the intensity meter width. */
  intensity: number;
}

export const ageTiers: readonly AgeTier[] = [
  { key: "age12", rating: "12+", icon: "ghost", intensity: 1 },
  { key: "age14", rating: "14+", icon: "skull", intensity: 2 },
  { key: "age16", rating: "16+", icon: "flame", intensity: 3 },
  { key: "age18", rating: "18+", icon: "biohazard", intensity: 4 },
];
