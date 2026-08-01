import { Reveal } from "@/components/effects/reveal";
import { FogLayer } from "@/components/effects/fog-layer";
import { GameCard } from "@/components/game/game-card";
import { SectionHeading } from "@/components/section-heading";
import { games } from "@/lib/games";
import { sectionIds } from "@/lib/navigation";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/az";

interface GamesShowcaseProps {
  locale: Locale;
  dictionary: Dictionary;
}

export function GamesShowcase({ locale, dictionary }: GamesShowcaseProps) {
  return (
    <section
      id={sectionIds.games}
      className="relative scroll-mt-24 overflow-hidden bg-black/40 py-24 lg:py-32"
    >
      <FogLayer className="opacity-50" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/[0.06]"
      />

      <div className="container relative">
        <SectionHeading
          eyebrow={dictionary.games.eyebrow}
          title={dictionary.games.title}
          subtitle={dictionary.games.subtitle}
        />

        <ul className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {games.map((game, index) => (
            <li key={game.slug} className="h-full">
              <Reveal delay={index * 0.08} className="h-full">
                <GameCard
                  game={game}
                  locale={locale}
                  dictionary={dictionary}
                  priority={index === 0}
                />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
