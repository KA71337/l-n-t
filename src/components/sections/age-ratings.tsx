import { Info } from "lucide-react";

import { Reveal } from "@/components/effects/reveal";
import { SectionHeading } from "@/components/section-heading";
import { getIcon } from "@/components/icons";
import { ageTiers } from "@/lib/features";
import { sectionIds } from "@/lib/navigation";
import type { Dictionary } from "@/i18n/dictionaries/az";

interface AgeRatingsProps {
  dictionary: Dictionary;
}

const MAX_INTENSITY = 4;

export function AgeRatings({ dictionary }: AgeRatingsProps) {
  const { ages } = dictionary;

  return (
    <section id={sectionIds.ages} className="relative scroll-mt-24 py-24 lg:py-32">
      <div className="container">
        <SectionHeading eyebrow={ages.eyebrow} title={ages.title} subtitle={ages.subtitle} />

        <ul className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {ageTiers.map((tier, index) => {
            const item = ages.items[tier.key];
            const Icon = getIcon(tier.icon);
            const percent = (tier.intensity / MAX_INTENSITY) * 100;

            return (
              <li key={tier.key}>
                <Reveal delay={index * 0.07} className="h-full">
                  <article className="glass group relative flex h-full flex-col overflow-hidden rounded-lg p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-blood-500/40 hover:shadow-glow">
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-x-0 -top-24 h-40 bg-blood-600/0 blur-3xl transition-all duration-700 group-hover:bg-blood-600/25"
                    />
                    <div className="relative flex items-start justify-between gap-3">
                      <span className="font-display text-4xl font-black text-white">
                        {item.title}
                      </span>
                      <Icon
                        className="size-8 text-blood-400 transition-transform duration-500 group-hover:scale-110"
                        strokeWidth={1.5}
                        aria-hidden
                      />
                    </div>

                    <p className="relative mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-blood-300">
                      {item.level}
                    </p>

                    <p className="relative mt-3 flex-1 text-sm leading-relaxed text-ash-300">
                      {item.description}
                    </p>

                    <div className="relative mt-7">
                      <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-ash-500">
                        <span>{ages.intensityLabel}</span>
                        <span aria-hidden>
                          {tier.intensity}/{MAX_INTENSITY}
                        </span>
                      </div>
                      <div
                        role="meter"
                        aria-label={`${ages.intensityLabel} — ${item.title}`}
                        aria-valuemin={0}
                        aria-valuemax={MAX_INTENSITY}
                        aria-valuenow={tier.intensity}
                        className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/[0.07]"
                      >
                        <span
                          className="block h-full rounded-full bg-blood-gradient"
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </div>
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ul>

        <Reveal delay={0.1}>
          <p className="mx-auto mt-10 flex max-w-3xl items-start gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.02] px-6 py-5 text-sm leading-relaxed text-ash-400">
            <Info className="mt-0.5 size-4 shrink-0 text-blood-400" aria-hidden />
            {ages.note}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
