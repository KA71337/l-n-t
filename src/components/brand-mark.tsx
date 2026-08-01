import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site";
import type { Locale } from "@/i18n/config";
import { localePath } from "@/i18n/config";

interface BrandMarkProps {
  locale: Locale;
  label: string;
  className?: string;
  size?: "sm" | "md";
  showWordmark?: boolean;
}

export function BrandMark({
  locale,
  label,
  className,
  size = "sm",
  showWordmark = true,
}: BrandMarkProps) {
  const dimension = size === "sm" ? 44 : 60;

  return (
    <Link
      href={localePath(locale)}
      aria-label={label}
      className={cn("group inline-flex items-center gap-3", className)}
    >
      <span className="relative inline-flex shrink-0 items-center justify-center">
        <span
          aria-hidden
          className="absolute inset-0 rounded-full bg-blood-500/30 blur-lg transition-opacity duration-500 group-hover:opacity-100 md:opacity-70"
        />
        <Image
          src={siteConfig.logo}
          alt=""
          width={dimension}
          height={dimension}
          priority
          className="relative rounded-full ring-1 ring-blood-500/40 transition-transform duration-500 group-hover:scale-105"
          style={{ width: dimension, height: dimension }}
        />
      </span>
      {showWordmark ? (
        <span className="flex flex-col leading-none">
          <span className="font-display text-lg font-bold tracking-[0.18em] text-white sm:text-xl">
            LƏNƏT
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-[0.42em] text-blood-300">
            Qorxu Evi
          </span>
        </span>
      ) : null}
    </Link>
  );
}
