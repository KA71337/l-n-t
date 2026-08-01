import { games, formatPrice } from "@/lib/games";
import { siteConfig } from "@/lib/site";
import { localeMeta, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/az";

interface StructuredDataProps {
  locale: Locale;
  dictionary: Dictionary;
}

/**
 * Schema.org LocalBusiness graph, including the three rooms as Products so the
 * pricing surfaces in rich results.
 */
export function StructuredData({ locale, dictionary }: StructuredDataProps) {
  const url = `${siteConfig.url}/${locale}`;

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["LocalBusiness", "EntertainmentBusiness"],
        "@id": `${siteConfig.url}/#business`,
        name: siteConfig.name,
        url,
        image: `${siteConfig.url}${siteConfig.ogImage}`,
        logo: `${siteConfig.url}${siteConfig.logo}`,
        description: dictionary.meta.description,
        telephone: siteConfig.phone.e164,
        priceRange: siteConfig.priceRange,
        currenciesAccepted: "AZN",
        inLanguage: localeMeta[locale].htmlLang,
        address: {
          "@type": "PostalAddress",
          streetAddress: siteConfig.address.plusCode,
          addressLocality: siteConfig.address.city,
          addressCountry: siteConfig.address.country,
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: siteConfig.geo.latitude,
          longitude: siteConfig.geo.longitude,
        },
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          opens: siteConfig.hours.opens,
          closes: siteConfig.hours.closes,
        },
      },
      ...games.map((game) => ({
        "@type": "Product",
        "@id": `${siteConfig.url}/${locale}/oyunlar/${game.slug}#product`,
        name: dictionary.games.items[game.slug].name,
        description: dictionary.games.items[game.slug].short,
        url: `${siteConfig.url}/${locale}/oyunlar/${game.slug}`,
        brand: { "@type": "Brand", name: siteConfig.name },
        offers: {
          "@type": "Offer",
          price: game.price.toFixed(2),
          priceCurrency: game.currency,
          availability: "https://schema.org/InStock",
          url: `${siteConfig.url}/${locale}/oyunlar/${game.slug}`,
          description: formatPrice(game.price, game.currency),
        },
      })),
    ],
  };

  return (
    <script
      type="application/ld+json"
      // Serialized on the server from trusted, static content only.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, "\\u003c") }}
    />
  );
}
