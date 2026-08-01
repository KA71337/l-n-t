"use client";

import dynamic from "next/dynamic";

import type { LeafletMapProps } from "@/components/map/leaflet-map";

interface MapEmbedProps extends LeafletMapProps {
  loadingLabel: string;
}

/**
 * Leaflet reads `window` on import, so the map must be client only. This thin
 * client wrapper exists purely to allow `ssr: false`, which is not permitted
 * inside a Server Component. Defined at module scope so the lazy component
 * identity stays stable across renders.
 */
const LeafletMap = dynamic(() => import("@/components/map/leaflet-map"), { ssr: false });

export function MapEmbed({ loadingLabel, ...props }: MapEmbedProps) {
  return (
    <div className="relative size-full">
      {/* Skeleton sits behind the map and is covered once Leaflet mounts. */}
      <div className="absolute inset-0 flex items-center justify-center bg-ash-950">
        <p className="flex items-center gap-3 text-xs uppercase tracking-[0.24em] text-ash-500">
          <span className="size-2 animate-ping rounded-full bg-blood-500" aria-hidden />
          {loadingLabel}
        </p>
      </div>
      <div className="relative size-full">
        <LeafletMap {...props} />
      </div>
    </div>
  );
}
