"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";

import { media, type MediaKey } from "@/lib/media";
import { cn } from "@/lib/utils";

interface GameGalleryProps {
  items: MediaKey[];
  /** Base alt text, suffixed with the scene number for each image. */
  altBase: string;
  sceneLabel: string;
  closeLabel: string;
  previousLabel: string;
  nextLabel: string;
}

export function GameGallery({
  items,
  altBase,
  sceneLabel,
  closeLabel,
  previousLabel,
  nextLabel,
}: GameGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const altFor = useCallback(
    (index: number) => `${altBase} — ${sceneLabel} ${index + 1}`,
    [altBase, sceneLabel],
  );

  const step = useCallback(
    (direction: 1 | -1) => {
      setActiveIndex((current) => {
        if (current === null) return current;
        return (current + direction + items.length) % items.length;
      });
    },
    [items.length],
  );

  useEffect(() => {
    if (activeIndex === null) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeIndex, step]);

  const active = activeIndex === null ? null : media[items[activeIndex]];

  return (
    <>
      <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
        {items.map((key, index) => {
          const asset = media[key];
          const featured = index === 0;

          return (
            <li
              key={`${key}-${index}`}
              className={cn(featured && "col-span-2 lg:col-span-2 lg:row-span-2")}
            >
              <button
                type="button"
                onClick={() => setActiveIndex(index)}
                className="group relative block size-full overflow-hidden rounded-2xl border border-white/[0.07] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <span
                  className={cn(
                    "relative block w-full",
                    featured ? "aspect-[16/10]" : "aspect-[4/3]",
                  )}
                >
                  <Image
                    src={asset.src}
                    alt={altFor(index)}
                    fill
                    loading="lazy"
                    sizes={featured ? "(min-width: 1024px) 60vw, 92vw" : "(min-width: 1024px) 30vw, 46vw"}
                    placeholder="blur"
                    blurDataURL={asset.blurDataURL}
                    className="object-cover transition-transform duration-[1.1s] ease-out group-hover:scale-110"
                  />
                </span>
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-black/25 transition-colors duration-500 group-hover:bg-black/10"
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute bottom-3 right-3 inline-flex size-9 items-center justify-center rounded-full border border-white/15 bg-black/60 text-white opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100"
                >
                  <ZoomIn className="size-4" />
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <Dialog.Root
        open={activeIndex !== null}
        onOpenChange={(open) => {
          if (!open) setActiveIndex(null);
        }}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-[70] bg-black/92 backdrop-blur-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
          <Dialog.Content className="fixed inset-0 z-[80] flex items-center justify-center p-4 focus:outline-none data-[state=open]:animate-in data-[state=open]:zoom-in-95">
            <Dialog.Title className="sr-only">{altBase}</Dialog.Title>
            <Dialog.Description className="sr-only">
              {activeIndex === null ? altBase : altFor(activeIndex)}
            </Dialog.Description>

            {active ? (
              <figure className="relative max-h-[86vh] w-full max-w-5xl overflow-hidden rounded-2xl border border-white/10 shadow-glow-lg">
                <Image
                  src={active.src}
                  alt={activeIndex === null ? altBase : altFor(activeIndex)}
                  width={active.width}
                  height={active.height}
                  sizes="(min-width: 1280px) 70vw, 96vw"
                  placeholder="blur"
                  blurDataURL={active.blurDataURL}
                  className="h-auto max-h-[86vh] w-full object-contain"
                />
              </figure>
            ) : null}

            <button
              type="button"
              aria-label={previousLabel}
              onClick={() => step(-1)}
              className="absolute left-4 top-1/2 inline-flex size-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/12 bg-black/60 text-white backdrop-blur transition-colors hover:border-blood-500/60 hover:bg-blood-500/20 sm:left-8"
            >
              <ChevronLeft className="size-5" aria-hidden />
            </button>
            <button
              type="button"
              aria-label={nextLabel}
              onClick={() => step(1)}
              className="absolute right-4 top-1/2 inline-flex size-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/12 bg-black/60 text-white backdrop-blur transition-colors hover:border-blood-500/60 hover:bg-blood-500/20 sm:right-8"
            >
              <ChevronRight className="size-5" aria-hidden />
            </button>

            <Dialog.Close
              aria-label={closeLabel}
              className="absolute right-4 top-4 inline-flex size-11 items-center justify-center rounded-full border border-white/12 bg-black/60 text-white backdrop-blur transition-colors hover:border-blood-500/60 hover:bg-blood-500/20 sm:right-8 sm:top-8"
            >
              <X className="size-5" aria-hidden />
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
