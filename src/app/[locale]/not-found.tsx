import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { FogLayer } from "@/components/effects/fog-layer";
import { Button } from "@/components/ui/button";
import { defaultLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

/**
 * Rendered for unknown routes under a locale. The segment param is not
 * available to not-found boundaries, so the default locale copy is used.
 */
export default async function LocaleNotFound() {
  const dictionary = await getDictionary(defaultLocale);

  return (
    <section className="vignette relative flex min-h-[80svh] items-center overflow-hidden py-32">
      <FogLayer intensity="heavy" />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 h-72 w-[36rem] max-w-[92vw] -translate-x-1/2 rounded-full bg-blood-800/30 blur-[120px]"
      />

      <div className="container relative flex flex-col items-center text-center">
        <p className="font-display text-[clamp(5rem,18vw,12rem)] font-black leading-none text-blood-600/30">
          404
        </p>
        <h1 className="-mt-6 font-display text-3xl font-semibold text-white sm:text-4xl">
          {dictionary.notFound.title}
        </h1>
        <p className="mt-4 max-w-md text-base leading-relaxed text-ash-300">
          {dictionary.notFound.text}
        </p>
        <Button asChild size="lg" className="mt-9">
          <Link href={`/${defaultLocale}`}>
            <ArrowLeft aria-hidden />
            {dictionary.notFound.cta}
          </Link>
        </Button>
      </div>
    </section>
  );
}
