"use client";

import { useMemo } from "react";
import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer, ZoomControl } from "react-leaflet";

import { siteConfig } from "@/lib/site";

import "leaflet/dist/leaflet.css";

export interface LeafletMapProps {
  markerAlt: string;
  hoursLabel: string;
  regionLabel: string;
}

const POSITION: L.LatLngExpression = [siteConfig.geo.latitude, siteConfig.geo.longitude];

/**
 * Branded marker built with a divIcon so the company logo can be layered with a
 * pulsing halo. The icon is anchored at its centre (36 = half of 72) so the pin
 * sits exactly on the coordinate instead of floating above it.
 */
function createBrandIcon(alt: string): L.DivIcon {
  return L.divIcon({
    className: "lqe-marker",
    html: `<span class="lqe-marker__halo"></span><img class="lqe-marker__img" src="${siteConfig.markerIcon}" alt="${alt}" width="48" height="48" />`,
    iconSize: [72, 72],
    iconAnchor: [36, 36],
    popupAnchor: [0, -30],
  });
}

export default function LeafletMap({ markerAlt, hoursLabel, regionLabel }: LeafletMapProps) {
  const icon = useMemo(() => createBrandIcon(markerAlt), [markerAlt]);

  return (
    <div role="region" aria-label={regionLabel} className="size-full">
      <MapContainer
        center={POSITION}
        zoom={siteConfig.geo.zoom}
        minZoom={4}
        maxZoom={19}
        scrollWheelZoom={false}
        zoomControl={false}
        attributionControl
        className="size-full"
      >
        <TileLayer
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          maxZoom={19}
        />
        <ZoomControl position="bottomright" />
        <Marker position={POSITION} icon={icon} title={siteConfig.name}>
          <Popup>
            <div className="min-w-[13rem] space-y-2">
              <p className="font-display text-base font-bold tracking-wide text-white">
                {siteConfig.name}
              </p>
              <p className="text-xs text-zinc-400">
                <span className="uppercase tracking-[0.16em]">{hoursLabel}</span>
                <br />
                {siteConfig.hours.display}
              </p>
              <a
                href={`tel:${siteConfig.phone.e164}`}
                className="inline-block text-sm font-semibold text-[#f83b52] hover:underline"
                dir="ltr"
              >
                {siteConfig.phone.display}
              </a>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
