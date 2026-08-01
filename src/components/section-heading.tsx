import { cn } from "@/lib/utils";
import { Reveal } from "@/components/effects/reveal";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      <span className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.34em] text-blood-300">
        <span className="hairline h-px w-8" aria-hidden />
        {eyebrow}
        {align === "center" ? <span className="hairline h-px w-8" aria-hidden /> : null}
      </span>
      <h2 className="max-w-3xl text-balance text-3xl font-semibold leading-[1.1] text-white sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="max-w-2xl text-base leading-relaxed text-ash-300 sm:text-lg">{subtitle}</p>
      ) : null}
    </Reveal>
  );
}
