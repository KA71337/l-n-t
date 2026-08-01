import { Clock, MapPin, MessageCircle, Navigation, Phone } from "lucide-react";

import { Reveal } from "@/components/effects/reveal";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import { sectionIds } from "@/lib/navigation";
import { directionsHref, siteConfig, telHref, whatsappHref } from "@/lib/site";
import type { Dictionary } from "@/i18n/dictionaries/az";

interface ContactProps {
  dictionary: Dictionary;
}

export function Contact({ dictionary }: ContactProps) {
  const { contact } = dictionary;

  const cards = [
    {
      key: "hours",
      icon: Clock,
      label: contact.hoursLabel,
      value: siteConfig.hours.display,
      hint: contact.everyday,
      href: null,
      external: false,
    },
    {
      key: "phone",
      icon: Phone,
      label: contact.phoneLabel,
      value: siteConfig.phone.display,
      hint: contact.callCta,
      href: telHref,
      external: false,
    },
    {
      key: "address",
      icon: MapPin,
      label: contact.addressLabel,
      value: siteConfig.address.plusCode,
      hint: "Baku, Azerbaijan",
      href: directionsHref,
      external: true,
    },
  ] as const;

  return (
    <section id={sectionIds.contact} className="relative scroll-mt-24 py-24 lg:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-10 h-[24rem] w-[48rem] max-w-[92vw] -translate-x-1/2 rounded-full bg-blood-800/20 blur-[130px]"
      />

      <div className="container relative">
        <SectionHeading eyebrow={contact.eyebrow} title={contact.title} subtitle={contact.subtitle} />

        <ul className="mt-16 grid gap-5 md:grid-cols-3">
          {cards.map((card, index) => {
            const Icon = card.icon;
            const body = (
              <>
                <span className="inline-flex size-12 items-center justify-center rounded-2xl border border-blood-500/25 bg-blood-500/10 text-blood-300 transition-all duration-500 group-hover:border-blood-500/60 group-hover:text-blood-200">
                  <Icon className="size-5" strokeWidth={1.7} aria-hidden />
                </span>
                <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.24em] text-ash-500">
                  {card.label}
                </p>
                <p
                  className="mt-2 font-display text-xl font-semibold text-white sm:text-2xl"
                  dir="ltr"
                >
                  {card.value}
                </p>
                <p className="mt-1 text-sm text-ash-400">{card.hint}</p>
              </>
            );

            const cardClass =
              "glass group relative flex h-full flex-col overflow-hidden rounded-lg p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-blood-500/40 hover:shadow-glow";

            return (
              <li key={card.key}>
                <Reveal delay={index * 0.07} className="h-full">
                  {card.href ? (
                    <a
                      href={card.href}
                      className={cardClass}
                      {...(card.external
                        ? { target: "_blank", rel: "noreferrer noopener" }
                        : {})}
                    >
                      {body}
                    </a>
                  ) : (
                    <div className={cardClass}>{body}</div>
                  )}
                </Reveal>
              </li>
            );
          })}
        </ul>

        <Reveal delay={0.12}>
          <div className="glass-strong mt-8 flex flex-col items-center gap-6 rounded-lg px-7 py-9 text-center sm:px-10">
            <p className="max-w-xl text-sm leading-relaxed text-ash-300">{contact.note}</p>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <Button asChild variant="whatsapp" size="lg">
                <a
                  href={whatsappHref(contact.whatsappMessage)}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <MessageCircle aria-hidden />
                  {contact.whatsappCta}
                </a>
              </Button>
              <Button asChild size="lg">
                <a href={telHref}>
                  <Phone aria-hidden />
                  <span className="tracking-normal normal-case" dir="ltr">
                    {siteConfig.phone.display}
                  </span>
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href={directionsHref} target="_blank" rel="noreferrer noopener">
                  <Navigation aria-hidden />
                  {contact.directions}
                </a>
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
