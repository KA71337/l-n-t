"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronDown, MessageCircle } from "lucide-react";

import { EmberField } from "@/components/effects/ember-field";
import { FogLayer } from "@/components/effects/fog-layer";
import { Button } from "@/components/ui/button";
import { media } from "@/lib/media";
import { sectionIds } from "@/lib/navigation";
import { whatsappHref } from "@/lib/site";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/az";

interface HeroProps {
  locale: Locale;
  dictionary: Dictionary;
}

export function Hero({ locale, dictionary }: HeroProps) {
  const shouldReduceMotion = useReducedMotion();
  const backdrop = media["corridor-red"];
  const { hero } = dictionary;

  const rise = (delay: number) => ({
    initial: shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 26 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] as const },
  });

  return (
    <section
      id="top"
      className="vignette grain relative isolate flex min-h-[100svh] items-center overflow-hidden pt-28"
    >
      <Image
        src={backdrop.src}
        alt=""
        fill
        priority
        fetchPriority="high"
        sizes="100vw"
        placeholder="blur"
        blurDataURL={backdrop.blurDataURL}
        className="-z-10 scale-105 object-cover object-center opacity-60"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(3,3,4,0.92)_0%,rgba(3,3,4,0.55)_38%,rgba(3,3,4,0.94)_100%)]"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 top-1/4 -z-10 mx-auto h-[34rem] w-[60rem] max-w-[95vw] animate-pulse-glow rounded-full bg-blood-700/25 blur-[140px]"
      />
      <FogLayer intensity="heavy" className="-z-10" />
      <EmberField className="-z-10" />

      <div className="container relative flex flex-col items-center pb-28 text-center">
        <motion.span
          {...rise(0.05)}
          className="inline-flex items-center gap-2.5 rounded-full border border-blood-500/35 bg-black/40 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.26em] text-blood-200 backdrop-blur"
        >
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-blood-400 opacity-70" />
            <span className="relative inline-flex size-2 rounded-full bg-blood-400" />
          </span>
          {hero.badge}
        </motion.span>

        <motion.h1
          {...rise(0.14)}
          className="mt-8 flex flex-col items-center font-display font-black leading-[0.86] text-white"
        >
          <span className="text-blood-glow text-[clamp(3.25rem,13vw,10.5rem)] tracking-[0.02em] text-blood-500 animate-flicker">
            {hero.title}
          </span>
          <span className="mt-2 text-[clamp(1.1rem,3.6vw,2.75rem)] font-semibold tracking-[0.42em] text-ash-100 sm:mt-4">
            {hero.titleAccent}
          </span>
        </motion.h1>

        <motion.p
          {...rise(0.24)}
          className="mt-8 max-w-2xl text-balance font-display text-lg italic text-blood-100/90 sm:text-xl"
        >
          {hero.subtitle}
        </motion.p>

        <motion.p {...rise(0.32)} className="mt-5 max-w-2xl text-base leading-relaxed text-ash-300">
          {hero.description}
        </motion.p>

        <motion.div
          {...rise(0.42)}
          className="mt-11 flex w-full flex-col items-stretch justify-center gap-3 sm:w-auto sm:flex-row sm:items-center"
        >
          <Button asChild size="lg">
            <Link href={`/${locale}#${sectionIds.games}`}>
              {hero.cta}
              <ArrowRight aria-hidden />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a
              href={whatsappHref(dictionary.contact.whatsappMessage)}
              target="_blank"
              rel="noreferrer noopener"
            >
              <MessageCircle aria-hidden />
              {hero.ctaSecondary}
            </a>
          </Button>
        </motion.div>

        <motion.dl
          {...rise(0.52)}
          className="mt-16 grid w-full max-w-2xl grid-cols-3 gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.04]"
        >
          {hero.stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center gap-1 bg-black/50 px-3 py-5 backdrop-blur"
            >
              <dt className="sr-only">{stat.label}</dt>
              <dd className="font-display text-3xl font-bold text-white sm:text-4xl">
                {stat.value}
              </dd>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ash-400 sm:text-[11px]">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.dl>
      </div>

      <Link
        href={`/${locale}#${sectionIds.about}`}
        className="absolute inset-x-0 bottom-7 mx-auto flex w-fit flex-col items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-ash-400 transition-colors duration-300 hover:text-blood-200"
      >
        {hero.scroll}
        <span className="flex h-9 w-[22px] items-start justify-center rounded-full border border-white/15 p-1.5">
          <ChevronDown className="size-3 animate-scroll-hint text-blood-300" aria-hidden />
        </span>
      </Link>
    </section>
  );
}
