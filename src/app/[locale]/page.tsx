import { notFound } from "next/navigation";

import { About } from "@/components/sections/about";
import { AgeRatings } from "@/components/sections/age-ratings";
import { Contact } from "@/components/sections/contact";
import { GamesShowcase } from "@/components/sections/games-showcase";
import { Hero } from "@/components/sections/hero";
import { MapSection } from "@/components/sections/map-section";
import { WhyUs } from "@/components/sections/why-us";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dictionary = await getDictionary(locale);

  return (
    <>
      <Hero locale={locale} dictionary={dictionary} />
      <About dictionary={dictionary} />
      <WhyUs dictionary={dictionary} />
      <AgeRatings dictionary={dictionary} />
      <GamesShowcase locale={locale} dictionary={dictionary} />
      <Contact dictionary={dictionary} />
      <MapSection dictionary={dictionary} />
    </>
  );
}
