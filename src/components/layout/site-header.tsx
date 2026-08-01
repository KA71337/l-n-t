"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";

import { BrandMark } from "@/components/brand-mark";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navKeys, sectionHref } from "@/lib/navigation";
import { siteConfig, telHref } from "@/lib/site";
import { cn } from "@/lib/utils";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/az";

interface SiteHeaderProps {
  locale: Locale;
  dictionary: Dictionary;
}

export function SiteHeader({ locale, dictionary }: SiteHeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = navKeys.map((key) => ({
    key,
    href: sectionHref(locale, key),
    label: dictionary.nav[key],
  }));

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-white/[0.07] bg-black/70 backdrop-blur-xl supports-[backdrop-filter]:bg-black/55"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div
        className={cn(
          "container flex items-center justify-between transition-all duration-500",
          scrolled ? "h-[72px]" : "h-[88px]",
        )}
      >
        <BrandMark locale={locale} label={dictionary.a11y.brandHome} />

        <nav aria-label={dictionary.a11y.primaryNav} className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {links.map((link) => (
              <li key={link.key}>
                <Link
                  href={link.href}
                  className="group relative inline-flex items-center rounded-full px-4 py-2 text-[13px] font-medium uppercase tracking-[0.14em] text-ash-200 transition-colors duration-300 hover:text-white"
                >
                  {link.label}
                  <span
                    aria-hidden
                    className="absolute inset-x-4 -bottom-0.5 h-px scale-x-0 bg-blood-gradient transition-transform duration-300 group-hover:scale-x-100"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <Button asChild variant="outline" size="sm" className="hidden xl:inline-flex">
            <a href={telHref}>
              <Phone aria-hidden />
              <span className="tracking-normal normal-case">{siteConfig.phone.display}</span>
            </a>
          </Button>

          <LanguageSwitcher
            locale={locale}
            label={dictionary.a11y.languageSwitcher}
            title={dictionary.footer.languageTitle}
          />

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              aria-label={dictionary.a11y.openMenu}
              className="inline-flex size-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-ash-100 backdrop-blur transition-colors duration-300 hover:border-blood-500/60 hover:bg-blood-500/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background lg:hidden"
            >
              <Menu className="size-5" aria-hidden />
            </SheetTrigger>
            <SheetContent>
              <div className="flex items-center justify-between">
                <SheetTitle asChild>
                  <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-blood-300">
                    {dictionary.nav.menu}
                  </span>
                </SheetTitle>
                <SheetClose
                  aria-label={dictionary.a11y.closeMenu}
                  className="inline-flex size-10 items-center justify-center rounded-full border border-white/10 text-ash-200 transition-colors hover:border-blood-500/60 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <X className="size-5" aria-hidden />
                </SheetClose>
              </div>

              <SheetDescription className="sr-only">{dictionary.meta.description}</SheetDescription>

              <nav aria-label={dictionary.a11y.primaryNav}>
                <ul className="flex flex-col gap-1">
                  {links.map((link, index) => (
                    <li key={link.key}>
                      <SheetClose asChild>
                        <Link
                          href={link.href}
                          className="flex items-baseline gap-4 rounded-2xl px-4 py-3.5 font-display text-2xl font-semibold text-ash-100 transition-colors duration-300 hover:bg-blood-500/10 hover:text-white"
                        >
                          <span className="text-[11px] font-sans font-semibold tracking-[0.2em] text-blood-400">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          {link.label}
                        </Link>
                      </SheetClose>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="mt-auto flex flex-col gap-3">
                <Button asChild size="lg">
                  <a href={telHref}>
                    <Phone aria-hidden />
                    <span className="tracking-normal normal-case">{siteConfig.phone.display}</span>
                  </a>
                </Button>
                <p className="text-center text-xs uppercase tracking-[0.2em] text-ash-400">
                  {dictionary.footer.hoursShort}
                </p>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
