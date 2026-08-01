import type { Locale } from "@/i18n/config";

/** Stable, language neutral anchor ids used by the header and the footer. */
export const sectionIds = {
  about: "about",
  why: "why",
  ages: "ages",
  games: "games",
  contact: "contact",
  map: "map",
} as const;

export type NavKey = "about" | "why" | "ages" | "games" | "contact";

export const navKeys: readonly NavKey[] = ["about", "why", "ages", "games", "contact"];

/**
 * Anchors are always absolute (locale prefixed) so the same component works
 * from the home page and from a game detail page.
 */
export function sectionHref(locale: Locale, key: NavKey): string {
  return `/${locale}#${sectionIds[key]}`;
}
