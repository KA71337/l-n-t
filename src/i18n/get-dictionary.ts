import "server-only";

import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/az";

/**
 * Dictionaries are loaded lazily so only the requested locale ends up in the
 * server bundle for a given request.
 */
const loaders: Record<Locale, () => Promise<Dictionary>> = {
  az: () => import("@/i18n/dictionaries/az").then((m) => m.az),
  ru: () => import("@/i18n/dictionaries/ru").then((m) => m.ru),
  en: () => import("@/i18n/dictionaries/en").then((m) => m.en),
};

export function getDictionary(locale: Locale): Promise<Dictionary> {
  return loaders[locale]();
}

export type { Dictionary };
