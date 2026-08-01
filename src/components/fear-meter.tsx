import { Skull } from "lucide-react";

import { cn } from "@/lib/utils";

interface FearMeterProps {
  /** 1-5 */
  level: number;
  label: string;
  className?: string;
}

const TOTAL = 5;

export function FearMeter({ level, label, className }: FearMeterProps) {
  const safeLevel = Math.min(Math.max(Math.round(level), 0), TOTAL);

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <span className="sr-only">{`${label}: ${safeLevel}/${TOTAL}`}</span>
      <span aria-hidden className="flex items-center gap-1">
        {Array.from({ length: TOTAL }, (_, index) => (
          <Skull
            key={index}
            className={cn(
              "size-4 transition-colors",
              index < safeLevel ? "text-blood-400" : "text-ash-600",
            )}
            strokeWidth={1.75}
          />
        ))}
      </span>
    </div>
  );
}
