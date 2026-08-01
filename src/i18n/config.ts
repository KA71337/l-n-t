export const locales = ["az", "ru", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "az";

export interface LocaleMeta {
  /** Value used for the html lang attribute and hreflang alternates. */
  htmlLang: string;
  /** Endonym shown in the language switcher. */
  label: string;
  /** Two letter code shown on compact viewports. */
  code: string;
  flag: string;
}

export const localeMeta: Record<Locale, LocaleMeta> = {
  az: { htmlLang: "az", label: "Azərbaycanca", code: "AZ", flag: "🇦🇿" },
  ru: { htmlLang: "ru", label: "Русский", code: "RU", flag: "🇷🇺" },
  en: { htmlLang: "en", label: "English", code: "EN", flag: "🇺🇸" },
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Builds a locale prefixed path, e.g. localePath("ru", "/oyunlar/morq"). */
export function localePath(locale: Locale, path = "/"): string {
  const normalised = path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  return `/${locale}${normalised}`;
}
