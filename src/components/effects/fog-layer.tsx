import { cn } from "@/lib/utils";

interface FogLayerProps {
  className?: string;
  /** Higher values produce a denser, more oppressive fog bank. */
  intensity?: "soft" | "heavy";
}

/**
 * Pure CSS drifting fog. Rendered on the server, GPU composited via transform
 * only, and disabled automatically under prefers-reduced-motion.
 */
export function FogLayer({ className, intensity = "soft" }: FogLayerProps) {
  const opacity = intensity === "heavy" ? "opacity-70" : "opacity-45";

  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <div
        className={cn(
          "absolute -inset-x-1/3 bottom-[-10%] h-[70%] animate-fog-slow blur-3xl will-change-transform",
          opacity,
        )}
        style={{
          background:
            "radial-gradient(48% 60% at 22% 62%, rgba(160,160,175,0.22), transparent 70%), radial-gradient(42% 52% at 68% 72%, rgba(120,120,140,0.18), transparent 70%)",
        }}
      />
      <div
        className={cn(
          "absolute -inset-x-1/4 bottom-[-18%] h-[55%] animate-fog-fast blur-2xl will-change-transform",
          intensity === "heavy" ? "opacity-50" : "opacity-30",
        )}
        style={{
          background:
            "radial-gradient(44% 58% at 46% 68%, rgba(220,20,60,0.16), transparent 72%), radial-gradient(40% 48% at 84% 60%, rgba(90,90,110,0.16), transparent 70%)",
        }}
      />
    </div>
  );
}
