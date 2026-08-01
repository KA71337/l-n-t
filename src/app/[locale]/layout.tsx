import type { ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { notFound } from "next/navigation";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { StructuredData } from "@/components/structured-data";
import { siteConfig } from "@/lib/site";
import { isLocale, locales, localeMeta, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

import "../globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext", "cyrillic"],
  variable: "--font-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin", "latin-ext", "cyrillic"],
  variable: "--font-display",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#050506",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

interface LocaleLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

function alternateLanguages(path = ""): Record<string, string> {
  return Object.fromEntries(
    locales.map((locale) => [localeMeta[locale].htmlLang, `${siteConfig.url}/${locale}${path}`]),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const dictionary = await getDictionary(locale);
  const canonical = `${siteConfig.url}/${locale}`;

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: dictionary.meta.title,
      template: `%s — ${siteConfig.name}`,
    },
    description: dictionary.meta.description,
    keywords: dictionary.meta.keywords,
    applicationName: siteConfig.name,
    generator: "Next.js",
    referrer: "strict-origin-when-cross-origin",
    formatDetection: { telephone: true, address: true, email: false },
    alternates: {
      canonical,
      languages: { ...alternateLanguages(), "x-default": `${siteConfig.url}/az` },
    },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      title: dictionary.meta.title,
      description: dictionary.meta.description,
      url: canonical,
      locale: localeMeta[locale].htmlLang,
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: dictionary.meta.ogAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: dictionary.meta.title,
      description: dictionary.meta.description,
      images: [siteConfig.ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
    icons: {
      icon: [{ url: "/icon.png", type: "image/png", sizes: "512x512" }],
      shortcut: ["/favicon.ico"],
      apple: [{ url: "/apple-icon.png", sizes: "180x180" }],
    },
  };
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const typedLocale: Locale = locale;
  const dictionary = await getDictionary(typedLocale);

  return (
    <html lang={localeMeta[typedLocale].htmlLang} className="dark" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} font-sans`}>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-[100] focus:rounded-full focus:bg-blood-600 focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
        >
          {dictionary.a11y.skipToContent}
        </a>

        <SiteHeader locale={typedLocale} dictionary={dictionary} />

        <main id="main" className="relative">
          {children}
        </main>

        <SiteFooter locale={typedLocale} dictionary={dictionary} />

        <StructuredData locale={typedLocale} dictionary={dictionary} />
      </body>
    </html>
  );
}
