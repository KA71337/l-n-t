import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, Users } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FearMeter } from "@/components/fear-meter";
import { formatPrice, gameCover, gameHref, type Game } from "@/lib/games";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/az";

interface GameCardProps {
  game: Game;
  locale: Locale;
  dictionary: Dictionary;
  priority?: boolean;
}

export function GameCard({ game, locale, dictionary, priority = false }: GameCardProps) {
  const content = dictionary.games.items[game.slug];
  const labels = dictionary.games.labels;
  const cover = gameCover(game);
  const href = gameHref(locale, game.slug);

  return (
    <article className="glass group relative flex h-full flex-col overflow-hidden rounded-lg transition-all duration-500 hover:-translate-y-2 hover:border-blood-500/45 hover:shadow-glow-lg">
      <div className="relative aspect-[16/11] w-full overflow-hidden">
        <Image
          src={cover.src}
          alt={`${content.name} — ${content.tagline}`}
          fill
          priority={priority}
          loading={priority ? "eager" : "lazy"}
          sizes="(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 92vw"
          placeholder="blur"
          blurDataURL={cover.blurDataURL}
          className="object-cover transition-transform duration-[1.1s] ease-out group-hover:scale-110"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,3,4,0.1)_0%,rgba(3,3,4,0.55)_55%,rgba(6,6,8,0.96)_100%)]"
        />
        <div
          aria-hidden
          className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
          style={{
            background: "radial-gradient(65% 55% at 50% 65%, rgba(220,20,60,0.3), transparent 72%)",
          }}
        />

        <div className="absolute left-5 top-5 flex items-center gap-2">
          <Badge variant="solid">{game.ageRating}</Badge>
        </div>

        <div className="absolute right-5 top-5 rounded-full border border-white/12 bg-black/60 px-3 py-1.5 text-right backdrop-blur">
          <p className="font-display text-sm font-bold leading-none text-white">
            {formatPrice(game.price, game.currency)}
          </p>
          <p className="mt-1 text-[9px] uppercase tracking-[0.16em] text-ash-400">
            {labels.perPerson}
          </p>
        </div>

        <div className="absolute inset-x-6 bottom-5">
          <h3 className="flex items-center gap-2.5 font-display text-2xl font-bold tracking-wide text-white sm:text-3xl">
            <span aria-hidden>{game.emoji}</span>
            {content.name}
          </h3>
          <p className="mt-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-blood-300">
            {content.tagline}
          </p>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <dl className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-ash-300">
          <div className="flex items-center gap-2">
            <Users className="size-4 text-blood-400" aria-hidden />
            <dt className="sr-only">{labels.players}</dt>
            <dd>
              {game.players.min}-{game.players.max} {labels.players.toLowerCase()}
            </dd>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="size-4 text-blood-400" aria-hidden />
            <dt className="sr-only">{labels.duration}</dt>
            <dd>
              {game.durationMinutes} {labels.minutes}
            </dd>
          </div>
          <div className="flex items-center gap-2">
            <dt className="sr-only">{labels.fear}</dt>
            <dd>
              <FearMeter level={game.fearLevel} label={labels.fear} />
            </dd>
          </div>
        </dl>

        <p className="mt-5 flex-1 text-sm leading-relaxed text-ash-300">{content.short}</p>

        <Button asChild variant="outline" className="mt-7 w-full group-hover:border-blood-500">
          <Link href={href}>
            {labels.details}
            <ArrowRight
              className="transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden
            />
          </Link>
        </Button>
      </div>
    </article>
  );
}
