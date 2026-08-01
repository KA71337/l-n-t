# LƏNƏT QORXU EVİ

Informational website for the LƏNƏT QORXU EVİ horror house in Baku.
Three rooms, three languages, zero booking flow.

## Stack

- Next.js 15 (App Router) + React 19
- TypeScript in strict mode
- Tailwind CSS 3 + tailwindcss-animate
- shadcn/ui primitives (Radix) — Button, Card, Badge, Dropdown Menu, Sheet
- Framer Motion for scroll and entrance animation
- Lucide React icons
- React Leaflet 5 + OpenStreetMap raster tiles

## Getting started

```bash
npm install
cp .env.example .env.local   # set NEXT_PUBLIC_SITE_URL to the real domain
npm run dev
```

Open http://localhost:3000 — the middleware redirects `/` to the best matching
locale (`/az`, `/ru` or `/en`, defaulting to Azerbaijani).

## Scripts

| Script | What it does |
| --- | --- |
| `npm run dev` | Local dev server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint (next/core-web-vitals + next/typescript) |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run format` | Prettier with the Tailwind class sorter |
| `npm run media` | Regenerate `src/lib/media.ts` from `public/images/games` |
| `npm run check` | lint + typecheck + build |

## Structure

```
src/
  app/
    [locale]/
      layout.tsx              root layout: fonts, metadata, header, footer, JSON-LD
      page.tsx                home page composition
      not-found.tsx           localized 404
      oyunlar/[slug]/page.tsx game detail page
    robots.ts sitemap.ts manifest.ts globals.css
  components/
    effects/    fog, embers, scroll reveal
    game/       game card, gallery with lightbox
    layout/     header, footer, language switcher
    map/        Leaflet map + client-only wrapper
    sections/   hero, about, why us, age ratings, games, contact, map
    ui/         shadcn primitives
  i18n/         locale config, dictionaries (az / ru / en)
  lib/          site config, games data, media registry, navigation, utils
  middleware.ts locale detection and redirect
```

## Content model

Business facts live in `src/lib/site.ts`, room facts in `src/lib/games.ts`, and
every user facing string in `src/i18n/dictionaries/*.ts`. Azerbaijani is the
source of truth: `Dictionary` is derived from `az.ts`, and `ru.ts` / `en.ts` are
checked against it with `satisfies`, so a missing translation is a type error.

## Map coordinates

The marker uses `40.37852, 49.85976`, decoded from the Open Location Code
`9VH5+CW2` (Baku) — full code `8HGF9VH5+CW2`. If the plus code changes, update
`siteConfig.geo` in `src/lib/site.ts`: the map, the directions link and the
Schema.org `GeoCoordinates` all read from it.

OpenStreetMap tiles are used with the required attribution. For production
traffic, consider a tile provider with an SLA rather than
`tile.openstreetmap.org`, whose usage policy discourages heavy commercial use.

## Images

All room artwork lives in `public/images/games` and is served through
`next/image` with AVIF/WebP output, responsive `sizes` and inlined blur
placeholders. Replace a file, run `npm run media`, done.

Brand assets in `public/`: `logo.png` (navbar, footer), `marker.png` (map pin),
`icon.png`, `apple-icon.png`, `favicon.ico`, `og-image.jpg`.

## Deployment notes

- Set `NEXT_PUBLIC_SITE_URL` before building: canonical URLs, hreflang
  alternates, Open Graph images and the sitemap all derive from it.
- Every page is statically generated (`generateStaticParams` covers all
  locale × room combinations), so the site can run on any Node host or Vercel.
- Security headers are set in `next.config.ts`.

## Deliberately not included

No booking, reservations, accounts, payments or cart. Contact happens through
WhatsApp and the phone number, by design.
