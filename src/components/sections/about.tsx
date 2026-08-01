import Image from "next/image";

import { Reveal } from "@/components/effects/reveal";
import { FogLayer } from "@/components/effects/fog-layer";
import { SectionHeading } from "@/components/section-heading";
import { media } from "@/lib/media";
import { sectionIds } from "@/lib/navigation";
import type { Dictionary } from "@/i18n/dictionaries/az";

interface AboutProps {
  dictionary: Dictionary;
}

export function About({ dictionary }: AboutProps) {
  const { about } = dictionary;
  const image = media["morgue-corridor"];

  return (
    <section
      id={sectionIds.about}
      className="relative scroll-mt-24 overflow-hidden py-24 lg:py-32"
      aria-labelledby="about-title"
    >
      <FogLayer className="opacity-60" />

      <div className="container relative">
        <SectionHeading
          eyebrow={about.eyebrow}
          title={about.title}
          subtitle={about.lead}
          align="left"
          className="max-w-3xl"
        />

        <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal direction="right" className="lg:col-span-6">
            <div className="group relative overflow-hidden rounded-lg border border-white/[0.07]">
              <div className="relative aspect-[4/5] w-full sm:aspect-[16/11] lg:aspect-[4/5]">
                <Image
                  src={image.src}
                  alt={about.imageAlt}
                  fill
                  loading="lazy"
                  sizes="(min-width: 1024px) 46vw, 100vw"
                  placeholder="blur"
                  blurDataURL={image.blurDataURL}
                  className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.06]"
                />
              </div>
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(3,3,4,0.15),rgba(3,3,4,0.85))]"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(60% 50% at 50% 60%, rgba(220,20,60,0.28), transparent 70%)",
                }}
              />
              <div className="absolute inset-x-0 bottom-0 grid grid-cols-2 gap-px bg-white/[0.06]">
                {about.highlights.map((item) => (
                  <div key={item.title} className="bg-black/70 px-5 py-4 backdrop-blur">
                    <p className="font-display text-sm font-semibold text-white">{item.title}</p>
                    <p className="mt-1 text-xs leading-relaxed text-ash-400">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <div className="flex flex-col gap-6 lg:col-span-6">
            <h3 id="about-title" className="sr-only">
              {about.title}
            </h3>
            {about.paragraphs.map((paragraph, index) => (
              <Reveal key={index} delay={index * 0.06}>
                <p className="relative border-l border-white/[0.08] pl-6 text-base leading-[1.85] text-ash-300">
                  <span
                    aria-hidden
                    className="absolute left-0 top-2 h-6 w-px bg-blood-gradient"
                  />
                  {paragraph}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
