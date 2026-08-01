import { Reveal } from "@/components/effects/reveal";
import { SectionHeading } from "@/components/section-heading";
import { getIcon } from "@/components/icons";
import { featureIcons, featureKeys } from "@/lib/features";
import { sectionIds } from "@/lib/navigation";
import type { Dictionary } from "@/i18n/dictionaries/az";

interface WhyUsProps {
  dictionary: Dictionary;
}

export function WhyUs({ dictionary }: WhyUsProps) {
  const { why } = dictionary;

  return (
    <section
      id={sectionIds.why}
      className="relative scroll-mt-24 overflow-hidden bg-black/40 py-24 lg:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/[0.06]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[26rem] w-[52rem] max-w-[92vw] -translate-x-1/2 rounded-full bg-blood-800/25 blur-[130px]"
      />

      <div className="container relative">
        <SectionHeading eyebrow={why.eyebrow} title={why.title} subtitle={why.subtitle} />

        <ul className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featureKeys.map((key, index) => {
            const item = why.items[key];
            const Icon = getIcon(featureIcons[key]);
            const wide = index === featureKeys.length - 1;

            return (
              <li key={key} className={wide ? "sm:col-span-2 lg:col-span-1" : undefined}>
                <Reveal delay={index * 0.05} className="h-full">
                  <article className="glass group relative h-full overflow-hidden rounded-lg p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-blood-500/40 hover:shadow-glow">
                    <div
                      aria-hidden
                      className="pointer-events-none absolute -right-16 -top-16 size-40 rounded-full bg-blood-600/0 blur-3xl transition-all duration-700 group-hover:bg-blood-600/35"
                    />
                    <span className="relative inline-flex size-14 items-center justify-center rounded-2xl border border-blood-500/25 bg-blood-500/10 text-blood-300 transition-all duration-500 group-hover:scale-105 group-hover:border-blood-500/60 group-hover:text-blood-200">
                      <Icon className="size-6" strokeWidth={1.6} aria-hidden />
                    </span>
                    <h3 className="relative mt-6 font-display text-xl font-semibold text-white">
                      {item.title}
                    </h3>
                    <p className="relative mt-3 text-sm leading-relaxed text-ash-300">
                      {item.description}
                    </p>
                    <span
                      aria-hidden
                      className="absolute inset-x-7 bottom-0 h-px origin-left scale-x-0 bg-blood-gradient transition-transform duration-500 group-hover:scale-x-100"
                    />
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
