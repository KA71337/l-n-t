import { ExternalLink } from "lucide-react";

import { Reveal } from "@/components/effects/reveal";
import { MapEmbed } from "@/components/map/map-embed";
import { SectionHeading } from "@/components/section-heading";
import { sectionIds } from "@/lib/navigation";
import { directionsHref, siteConfig } from "@/lib/site";
import type { Dictionary } from "@/i18n/dictionaries/az";

interface MapSectionProps {
  dictionary: Dictionary;
}

export function MapSection({ dictionary }: MapSectionProps) {
  const { map, contact } = dictionary;

  return (
    <section
      id={sectionIds.map}
      className="relative scroll-mt-24 overflow-hidden bg-black/40 pb-24 pt-24 lg:pb-28 lg:pt-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/[0.06]"
      />

      <div className="container relative">
        <SectionHeading eyebrow={map.eyebrow} title={map.title} subtitle={map.subtitle} />
      </div>

      <Reveal delay={0.08} className="container relative mt-14">
        <div className="lqe-map relative overflow-hidden rounded-lg border border-white/[0.08] shadow-[0_40px_120px_-50px_rgba(220,20,60,0.55)]">
          <div className="h-[420px] w-full sm:h-[520px] lg:h-[600px]">
            <MapEmbed
              loadingLabel={map.loading}
              markerAlt={map.markerAlt}
              hoursLabel={contact.hoursLabel}
              regionLabel={map.regionLabel}
            />
          </div>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-lg ring-1 ring-inset ring-blood-500/15"
          />
        </div>

        <div className="mt-5 flex flex-col items-center justify-between gap-3 text-xs text-ash-400 sm:flex-row">
          <p dir="ltr" className="tracking-[0.14em]">
            {siteConfig.address.line}
          </p>
          <a
            href={directionsHref}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-2 text-blood-300 transition-colors hover:text-blood-200"
          >
            {map.openInOsm}
            <ExternalLink className="size-3.5" aria-hidden />
          </a>
        </div>
      </Reveal>
    </section>
  );
}
