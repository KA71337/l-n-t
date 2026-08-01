import type { MetadataRoute } from "next";

import { games } from "@/lib/games";
import { siteConfig } from "@/lib/site";
import { locales, localeMeta } from "@/i18n/config";

function languageAlternates(path: string): Record<string, string> {
  return Object.fromEntries(
    locales.map((locale) => [
      localeMeta[locale].htmlLang,
      `${siteConfig.url}/${locale}${path}`,
    ]),
  );
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const home = locales.map((locale) => ({
    url: `${siteConfig.url}/${locale}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 1,
    alternates: { languages: languageAlternates("") },
  }));

  const gamePages = locales.flatMap((locale) =>
    games.map((game) => ({
      url: `${siteConfig.url}/${locale}/oyunlar/${game.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      alternates: { languages: languageAlternates(`/oyunlar/${game.slug}`) },
    })),
  );

  return [...home, ...gamePages];
}
