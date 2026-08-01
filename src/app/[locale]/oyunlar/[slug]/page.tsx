import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check, Clock, MessageCircle, Phone, ShieldAlert, Users } from "lucide-react";

import { Reveal } from "@/components/effects/reveal";
import { FogLayer } from "@/components/effects/fog-layer";
import { FearMeter } from "@/components/fear-meter";
import { GameCard } from "@/components/game/game-card";
import { GameGallery } from "@/components/game/game-gallery";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatPrice, gameCover, games, getGame } from "@/lib/games";
import { sectionIds } from "@/lib/navigation";
import { siteConfig, telHref, whatsappHref } from "@/lib/site";
import { isLocale, locales, localeMeta } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

interface GamePageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export function generateStaticParams() {
  return locales.flatMap((locale) => games.map((game) => ({ locale, slug: game.slug })));
}

export async function generateMetadata({ params }: GamePageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const game = getGame(slug);
  if (!isLocale(locale) || !game) return {};

  const dictionary = await getDictionary(locale);
  const content = dictionary.games.items[game.slug];
  const canonical = `${siteConfig.url}/${locale}/oyunlar/${game.slug}`;

  return {
    title: `${content.name} — ${content.tagline}`,
    description: content.short,
    alternates: {
      canonical,
      languages: Object.fromEntries(
        locales.map((item) => [
          localeMeta[item].htmlLang,
          `${siteConfig.url}/${item}/oyunlar/${game.slug}`,
        ]),
      ),
    },
    openGraph: {
      type: "article",
      title: `${content.name} — ${siteConfig.name}`,
      description: content.short,
      url: canonical,
      locale: localeMeta[locale].htmlLang,
      images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: content.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${content.name} — ${siteConfig.name}`,
      description: content.short,
      images: [siteConfig.ogImage],
    },
  };
}

export default async function GamePage({ params }: GamePageProps) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();

  const game = getGame(slug);
  if (!game) notFound();

  const dictionary = await getDictionary(locale);
  const content = dictionary.games.items[game.slug];
  const labels = dictionary.games.labels;
  const page = dictionary.gamePage;
  const cover = gameCover(game);
  const others = games.filter((item) => item.slug !== game.slug);

  const facts = [
    { label: labels.duration, value: `${game.durationMinutes} ${labels.minutes}` },
    { label: labels.players, value: `${game.players.min}-${game.players.max}` },
    { label: labels.age, value: game.ageRating },
    { label: labels.price, value: formatPrice(game.price, game.currency) },
  ];

  return (
    <>
      <section className="vignette grain relative isolate flex min-h-[78svh] items-end overflow-hidden pb-16 pt-36 sm:pb-20">
        <Image
          src={cover.src}
          alt={`${content.name} — ${content.tagline}`}
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          placeholder="blur"
          blurDataURL={cover.blurDataURL}
          className="-z-10 scale-105 object-cover object-center opacity-65"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(3,3,4,0.9)_0%,rgba(3,3,4,0.45)_35%,rgba(3,3,4,0.96)_100%)]"
        />
        <FogLayer intensity="heavy" className="-z-10" />

        <div className="container relative">
          <Link
            href={`/${locale}#${sectionIds.games}`}
            className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-ash-400 transition-colors hover:text-blood-200"
          >
            <ArrowLeft className="size-4" aria-hidden />
            {page.backToGames}
          </Link>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Badge variant="solid">{game.ageRating}</Badge>
            <Badge variant="outline">{content.tagline}</Badge>
          </div>

          <h1 className="mt-5 flex flex-wrap items-center gap-4 font-display text-[clamp(2.5rem,9vw,6rem)] font-black leading-[0.95] text-white">
            <span aria-hidden className="text-[0.6em]">
              {game.emoji}
            </span>
            <span className="text-blood-glow">{content.name}</span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-ash-200 sm:text-lg">
            {content.short}
          </p>

          <dl className="mt-10 grid w-full max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.05] sm:grid-cols-4">
            {facts.map((fact) => (
              <div key={fact.label} className="bg-black/60 px-5 py-4 backdrop-blur">
                <dt className="text-[10px] font-semibold uppercase tracking-[0.2em] text-ash-500">
                  {fact.label}
                </dt>
                <dd className="mt-1.5 font-display text-lg font-bold text-white">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="relative py-20 lg:py-28">
        <div className="container grid gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="flex flex-col gap-16 lg:col-span-7 xl:col-span-8">
            <Reveal>
              <h2 className="font-display text-2xl font-semibold text-white sm:text-3xl">
                {page.storyTitle}
              </h2>
              <div className="mt-7 flex flex-col gap-5">
                {content.story.map((paragraph, index) => (
                  <p
                    key={index}
                    className="relative border-l border-white/[0.08] pl-6 text-base leading-[1.85] text-ash-300"
                  >
                    <span aria-hidden className="absolute left-0 top-2 h-6 w-px bg-blood-gradient" />
                    {paragraph}
                  </p>
                ))}
              </div>
            </Reveal>

            <Reveal>
              <h2 className="font-display text-2xl font-semibold text-white sm:text-3xl">
                {page.featuresTitle}
              </h2>
              <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                {content.features.map((feature) => (
                  <li
                    key={feature}
                    className="glass flex items-start gap-3 rounded-2xl px-5 py-4 text-sm leading-relaxed text-ash-200 transition-colors duration-500 hover:border-blood-500/35"
                  >
                    <Check className="mt-0.5 size-4 shrink-0 text-blood-400" aria-hidden />
                    {feature}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal>
              <h2 className="font-display text-2xl font-semibold text-white sm:text-3xl">
                {page.galleryTitle}
              </h2>
              <div className="mt-7">
                <GameGallery
                  items={game.gallery}
                  altBase={content.name}
                  sceneLabel={labels.sceneAlt}
                  closeLabel={dictionary.a11y.galleryClose}
                  previousLabel={dictionary.a11y.galleryPrevious}
                  nextLabel={dictionary.a11y.galleryNext}
                />
              </div>
            </Reveal>
          </div>

          <aside className="lg:col-span-5 xl:col-span-4">
            <div className="lg:sticky lg:top-28">
              <Reveal direction="left">
                <div className="glass-strong overflow-hidden rounded-lg">
                  <div className="border-b border-white/[0.07] px-7 py-6">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-blood-300">
                      {page.detailsTitle}
                    </p>
                    <p className="mt-3 font-display text-4xl font-black text-white">
                      {formatPrice(game.price, game.currency)}
                    </p>
                    <p className="mt-1 text-xs uppercase tracking-[0.18em] text-ash-500">
                      {labels.perPerson}
                    </p>
                  </div>

                  <dl className="divide-y divide-white/[0.07]">
                    <div className="flex items-center justify-between gap-4 px-7 py-4">
                      <dt className="flex items-center gap-2.5 text-sm text-ash-400">
                        <Clock className="size-4 text-blood-400" aria-hidden />
                        {labels.duration}
                      </dt>
                      <dd className="text-sm font-semibold text-white">
                        {game.durationMinutes} {labels.minutes}
                      </dd>
                    </div>
                    <div className="flex items-center justify-between gap-4 px-7 py-4">
                      <dt className="flex items-center gap-2.5 text-sm text-ash-400">
                        <Users className="size-4 text-blood-400" aria-hidden />
                        {labels.players}
                      </dt>
                      <dd className="text-sm font-semibold text-white">
                        {game.players.min}-{game.players.max}
                      </dd>
                    </div>
                    <div className="flex items-center justify-between gap-4 px-7 py-4">
                      <dt className="flex items-center gap-2.5 text-sm text-ash-400">
                        <ShieldAlert className="size-4 text-blood-400" aria-hidden />
                        {labels.age}
                      </dt>
                      <dd className="text-sm font-semibold text-white">{game.ageRating}</dd>
                    </div>
                    <div className="flex items-center justify-between gap-4 px-7 py-4">
                      <dt className="text-sm text-ash-400">{labels.fear}</dt>
                      <dd>
                        <FearMeter level={game.fearLevel} label={labels.fear} />
                      </dd>
                    </div>
                  </dl>

                  <div className="flex flex-col gap-3 px-7 pb-7 pt-6">
                    <p className="text-sm font-semibold text-white">{page.questionsTitle}</p>
                    <p className="text-sm leading-relaxed text-ash-400">{page.questionsText}</p>
                    <Button asChild variant="whatsapp" size="lg" className="mt-2 w-full">
                      <a
                        href={whatsappHref(page.whatsappMessage.replace("{game}", content.name))}
                        target="_blank"
                        rel="noreferrer noopener"
                      >
                        <MessageCircle aria-hidden />
                        {page.whatsapp}
                      </a>
                    </Button>
                    <Button asChild variant="outline" size="lg" className="w-full">
                      <a href={telHref}>
                        <Phone aria-hidden />
                        <span className="tracking-normal normal-case" dir="ltr">
                          {siteConfig.phone.display}
                        </span>
                      </a>
                    </Button>
                    <p className="mt-1 text-center text-[11px] uppercase tracking-[0.18em] text-ash-500">
                      {dictionary.footer.hoursShort}
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </aside>
        </div>
      </section>

      <section className="relative overflow-hidden bg-black/40 py-20 lg:py-24">
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/[0.06]" />
        <div className="container relative">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-display text-2xl font-semibold text-white sm:text-3xl">
              {page.otherGames}
            </h2>
            <Link
              href={`/${locale}#${sectionIds.games}`}
              className="text-[11px] font-semibold uppercase tracking-[0.22em] text-blood-300 transition-colors hover:text-blood-200"
            >
              {page.backToGames}
            </Link>
          </div>

          <ul className="mt-10 grid gap-6 md:grid-cols-2">
            {others.map((item, index) => (
              <li key={item.slug} className="h-full">
                <Reveal delay={index * 0.08} className="h-full">
                  <GameCard game={item} locale={locale} dictionary={dictionary} />
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
