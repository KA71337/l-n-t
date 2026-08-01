import Link from "next/link";
import { Clock, MapPin, Phone } from "lucide-react";

import { BrandMark } from "@/components/brand-mark";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { games, gameHref } from "@/lib/games";
import { navKeys, sectionHref } from "@/lib/navigation";
import { directionsHref, siteConfig, telHref } from "@/lib/site";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/az";

interface SiteFooterProps {
  locale: Locale;
  dictionary: Dictionary;
}

export function SiteFooter({ locale, dictionary }: SiteFooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-white/[0.07] bg-black/60">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-blood-gradient opacity-60"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[42rem] -translate-x-1/2 rounded-full bg-blood-700/20 blur-[120px]"
      />

      <div className="container relative py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <BrandMark locale={locale} label={dictionary.a11y.brandHome} size="md" />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-ash-300">
              {dictionary.footer.tagline}
            </p>
          </div>

          <nav aria-label={dictionary.a11y.footerNav} className="lg:col-span-3">
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.28em] text-blood-300">
              {dictionary.footer.quickLinks}
            </h2>
            <ul className="mt-5 flex flex-col gap-3 text-sm">
              {navKeys.map((key) => (
                <li key={key}>
                  <Link
                    href={sectionHref(locale, key)}
                    className="text-ash-300 transition-colors duration-300 hover:text-white"
                  >
                    {dictionary.nav[key]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-2">
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.28em] text-blood-300">
              {dictionary.games.eyebrow}
            </h2>
            <ul className="mt-5 flex flex-col gap-3 text-sm">
              {games.map((game) => (
                <li key={game.slug}>
                  <Link
                    href={gameHref(locale, game.slug)}
                    className="text-ash-300 transition-colors duration-300 hover:text-white"
                  >
                    {dictionary.games.items[game.slug].name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.28em] text-blood-300">
              {dictionary.footer.contactTitle}
            </h2>
            <ul className="mt-5 flex flex-col gap-4 text-sm">
              <li>
                <a
                  href={telHref}
                  className="group inline-flex items-start gap-3 text-ash-200 transition-colors duration-300 hover:text-white"
                >
                  <Phone className="mt-0.5 size-4 shrink-0 text-blood-400" aria-hidden />
                  <span dir="ltr">{siteConfig.phone.display}</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-ash-300">
                <Clock className="mt-0.5 size-4 shrink-0 text-blood-400" aria-hidden />
                <span>{dictionary.footer.hoursShort}</span>
              </li>
              <li>
                <a
                  href={directionsHref}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-start gap-3 text-ash-300 transition-colors duration-300 hover:text-white"
                >
                  <MapPin className="mt-0.5 size-4 shrink-0 text-blood-400" aria-hidden />
                  <span>{siteConfig.address.line}</span>
                </a>
              </li>
            </ul>

            <div className="mt-7">
              <LanguageSwitcher
                locale={locale}
                label={dictionary.a11y.languageSwitcher}
                title={dictionary.footer.languageTitle}
                align="start"
              />
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/[0.07] pt-8 text-xs text-ash-400 sm:flex-row">
          <p>
            © {year} {siteConfig.name}. {dictionary.footer.rights}
          </p>
          <p className="tracking-[0.2em]" dir="ltr">
            {siteConfig.address.plusCode} · BAKU
          </p>
        </div>
      </div>
    </footer>
  );
}
