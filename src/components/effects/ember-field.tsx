"use client";

import { useMemo, type CSSProperties } from "react";

import { cn } from "@/lib/utils";

interface EmberFieldProps {
  count?: number;
  className?: string;
}

interface Ember {
  left: number;
  size: number;
  delay: number;
  duration: number;
  drift: number;
  opacity: number;
}

/**
 * Deterministic pseudo random generator. Using a fixed seed keeps the server
 * rendered markup identical to the first client render, so no hydration drift.
 */
function createRandom(seed: number): () => number {
  let state = seed;
  return () => {
    state = (state * 1664525 + 1013904223) % 4294967296;
    return state / 4294967296;
  };
}

function buildEmbers(count: number): Ember[] {
  const random = createRandom(20240229);
  return Array.from({ length: count }, () => ({
    left: Number((random() * 100).toFixed(3)),
    size: Number((1.5 + random() * 3).toFixed(2)),
    delay: Number((random() * 18).toFixed(2)),
    duration: Number((16 + random() * 18).toFixed(2)),
    drift: Number((random() * 80 - 40).toFixed(2)),
    opacity: Number((0.25 + random() * 0.55).toFixed(2)),
  }));
}

/** Floating ember particles rising through the hero. */
export function EmberField({ count = 34, className }: EmberFieldProps) {
  const embers = useMemo(() => buildEmbers(count), [count]);

  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      {embers.map((ember, index) => (
        <span
          key={index}
          className="absolute bottom-[-8%] rounded-full bg-blood-400 will-change-transform"
          style={{
            left: `${ember.left}%`,
            width: `${ember.size}px`,
            height: `${ember.size}px`,
            opacity: ember.opacity,
            boxShadow: `0 0 ${ember.size * 4}px ${ember.size}px rgba(220,20,60,0.45)`,
            animation: `lqe-ember ${ember.duration}s linear ${ember.delay}s infinite`,
            ...({ "--lqe-drift": `${ember.drift}px` } as CSSProperties),
          }}
        />
      ))}
    </div>
  );
}
