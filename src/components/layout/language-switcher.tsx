"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Check, Globe } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { isLocale, locales, localeMeta, type Locale } from "@/i18n/config";

interface LanguageSwitcherProps {
  locale: Locale;
  label: string;
  title: string;
  className?: string;
  align?: "start" | "end";
}

/** Replaces the leading locale segment while preserving the rest of the path. */
function withLocale(pathname: string, next: Locale): string {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0 || !isLocale(segments[0])) {
    return `/${next}`;
  }
  segments[0] = next;
  return `/${segments.join("/")}`;
}

export function LanguageSwitcher({
  locale,
  label,
  title,
  className,
  align = "end",
}: LanguageSwitcherProps) {
  const pathname = usePathname();
  const current = localeMeta[locale];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label={label}
        className={cn(
          "group inline-flex h-11 items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 text-xs font-semibold uppercase tracking-[0.18em] text-ash-200 backdrop-blur transition-all duration-300",
          "hover:border-blood-500/60 hover:bg-blood-500/10 hover:text-white",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "data-[state=open]:border-blood-500/60 data-[state=open]:text-white",
          className,
        )}
      >
        <Globe className="size-4 text-blood-300" aria-hidden />
        <span aria-hidden>{current.flag}</span>
        <span>{current.code}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={align}>
        <DropdownMenuLabel>{title}</DropdownMenuLabel>
        {locales.map((item) => {
          const meta = localeMeta[item];
          const active = item === locale;
          return (
            <DropdownMenuItem key={item} asChild>
              <Link href={withLocale(pathname, item)} hrefLang={meta.htmlLang} lang={meta.htmlLang}>
                <span aria-hidden className="text-base leading-none">
                  {meta.flag}
                </span>
                <span className={cn("flex-1", active && "text-white")}>{meta.label}</span>
                {active ? <Check className="size-4 text-blood-400" aria-hidden /> : null}
              </Link>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
