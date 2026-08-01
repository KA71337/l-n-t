/**
 * Single source of truth for business facts that appear across the site,
 * structured data, metadata and the map. Change it here, it changes everywhere.
 */
export const siteConfig = {
  name: "LƏNƏT QORXU EVİ",
  shortName: "LƏNƏT",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://lanetqorxuevi.az",
  ogImage: "/og-image.jpg",
  logo: "/logo.png",
  /** Raster served as-is to Leaflet (the div icon bypasses the image optimizer). */
  markerIcon: "/marker.png",
  phone: {
    display: "+994 55 216 14 91",
    e164: "+994552161491",
    digits: "994552161491",
  },
  hours: {
    opens: "13:00",
    closes: "23:00",
    display: "13:00 — 23:00",
  },
  address: {
    plusCode: "9VH5+CW2",
    city: "Baku",
    country: "AZ",
    line: "9VH5+CW2, Baku, Azerbaijan",
  },
  /**
   * Decoded from the Open Location Code 9VH5+CW2 (Baku) => full code 8HGF9VH5+CW2.
   * Kept as a constant so the map, structured data and directions link never drift.
   */
  geo: {
    latitude: 40.37852,
    longitude: 49.85976,
    zoom: 16,
  },
  priceRange: "11.99 AZN",
} as const;

export type SiteConfig = typeof siteConfig;

export const telHref = `tel:${siteConfig.phone.e164}`;

export function whatsappHref(message: string): string {
  return `https://wa.me/${siteConfig.phone.digits}?text=${encodeURIComponent(message)}`;
}

export const directionsHref = `https://www.openstreetmap.org/?mlat=${siteConfig.geo.latitude}&mlon=${siteConfig.geo.longitude}#map=17/${siteConfig.geo.latitude}/${siteConfig.geo.longitude}`;
