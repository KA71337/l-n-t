import { media, type MediaKey } from "@/lib/media";

export const gameSlugs = ["intihar", "morq", "qanli-balta"] as const;

export type GameSlug = (typeof gameSlugs)[number];

export type AgeRating = "12+" | "14+" | "16+" | "18+";

export interface Game {
  slug: GameSlug;
  emoji: string;
  price: number;
  currency: "AZN";
  durationMinutes: number;
  players: { min: number; max: number };
  ageRating: AgeRating;
  /** 1-5 scale rendered as skull pips in the UI. */
  fearLevel: number;
  cover: MediaKey;
  gallery: MediaKey[];
  /** Number of localized feature bullets rendered on the detail page. */
  featureCount: number;
}

export const games: readonly Game[] = [
  {
    slug: "intihar",
    emoji: "⚰️",
    price: 11.99,
    currency: "AZN",
    durationMinutes: 60,
    players: { min: 2, max: 8 },
    ageRating: "18+",
    fearLevel: 5,
    cover: "noose-room",
    gallery: ["noose-room", "farewell-desk", "notes-corridor", "lantern-rope", "corridor-red"],
    featureCount: 5,
  },
  {
    slug: "morq",
    emoji: "💀",
    price: 11.99,
    currency: "AZN",
    durationMinutes: 60,
    players: { min: 2, max: 8 },
    ageRating: "16+",
    fearLevel: 4,
    cover: "morgue-drawer",
    gallery: ["morgue-drawer", "morgue-corridor", "morgue-wall", "figure-doorway", "corridor-red"],
    featureCount: 5,
  },
  {
    slug: "qanli-balta",
    emoji: "🪓",
    price: 11.99,
    currency: "AZN",
    durationMinutes: 60,
    players: { min: 2, max: 8 },
    ageRating: "18+",
    fearLevel: 5,
    cover: "axe-stump",
    gallery: ["axe-stump", "hooks-chains", "lantern-rope", "figure-doorway", "notes-corridor"],
    featureCount: 5,
  },
];

export function getGame(slug: string): Game | undefined {
  return games.find((game) => game.slug === slug);
}

export function gameHref(locale: string, slug: GameSlug): string {
  return `/${locale}/oyunlar/${slug}`;
}

export function gameCover(game: Game) {
  return media[game.cover];
}

export function formatPrice(price: number, currency: string): string {
  return `${price.toFixed(2)} ${currency}`;
}
