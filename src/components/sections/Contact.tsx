import { brand, contact, hours } from "@/content/site";
import { SectionMarker } from "@/components/ui/SectionMarker";
import { SplitLines } from "@/components/ui/SplitLines";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.mapsQuery)}`;

/**
 * Stylised map placeholder. To embed the real map, replace this block with:
 * <iframe src="https://www.google.com/maps/embed?pb=..." loading="lazy" ... />
 */
function MapPlaceholder() {
  return (
    <div className="grain relative h-full min-h-[360px] overflow-hidden bg-ink text-ivory">
      <svg aria-hidden className="absolute inset-0 h-full w-full opacity-[0.22]" preserveAspectRatio="xMidYMid slice" viewBox="0 0 800 600">
        <g fill="none" stroke="#d8d0c4" strokeWidth="1">
          <path d="M-20 140 C 180 120, 260 220, 420 200 S 700 120, 840 160" />
          <path d="M-20 420 C 140 380, 300 460, 460 430 S 720 360, 840 400" strokeWidth="2.2" />
          <path d="M160 -20 C 180 160, 120 320, 200 620" />
          <path d="M520 -20 C 500 180, 580 360, 540 620" strokeWidth="2.2" />
          <path d="M-20 290 L 840 300" strokeDasharray="2 6" />
          <path d="M330 -20 L 360 620" strokeDasharray="2 6" />
          <path d="M640 -20 C 660 200, 720 280, 820 300" />
        </g>
        <path d="M0 520 C 200 500, 380 560, 800 520 L 800 600 L 0 600 Z" fill="#b49a68" opacity="0.18" />
      </svg>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <span className="absolute -inset-5 rounded-full border border-gold/30" />
        <span className="relative block h-3 w-3 rounded-full bg-gold" />
      </div>
      <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-4 p-6 md:p-8">
        <p className="text-xs text-ivory/45">Map placeholder — replace with a Google Maps embed</p>
        <a href={mapsHref} target="_blank" rel="noopener noreferrer" className="eyebrow link-line text-ivory">
          Open in Google Maps ↗
        </a>
      </div>
    </div>
  );
}

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="relative bg-ivory py-28 md:py-40">
      <div className="container-edge">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <SectionMarker label="Visit" className="mb-12" />
            <SplitLines
              id="contact-title"
              className="font-serif text-headline font-light tracking-[-0.015em]"
              lines={["Find us"]}
            />
            <Reveal delay={0.1}>
              <address className="mt-12 font-serif text-[1.9rem] leading-[1.25] not-italic text-ink md:text-[2.3rem]">
                {contact.addressLines.map((l) => (
                  <span key={l} className="block">
                    {l}
                  </span>
                ))}
              </address>
            </Reveal>
          </div>

          <Reveal y={36} className="h-[420px] md:h-[520px] lg:col-span-7 lg:h-auto">
            <MapPlaceholder />
          </Reveal>
        </div>

        <RevealGroup className="mt-20 grid gap-14 border-t border-ink/15 pt-14 sm:grid-cols-2 md:mt-28 lg:grid-cols-12 lg:gap-8">
          <RevealItem className="lg:col-span-4">
            <h3 className="eyebrow mb-6 text-gold">Opening Hours</h3>
            <dl className="space-y-2.5 text-sm">
              {hours.map((h) => (
                <div key={h.label} className="flex justify-between gap-6">
                  <dt className="text-ink/60">{h.label}</dt>
                  <dd className={`tabular-nums ${h.slots.length ? "text-ink" : "text-ink/40 italic"}`}>{h.time}</dd>
                </div>
              ))}
            </dl>
          </RevealItem>

          <RevealItem className="lg:col-span-3 lg:col-start-6">
            <h3 className="eyebrow mb-6 text-gold">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href={contact.phoneHref} className="link-line text-ink">
                  {contact.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${contact.email}`} className="link-line break-all text-ink">
                  {contact.email}
                </a>
              </li>
            </ul>
          </RevealItem>

          <RevealItem className="lg:col-span-2 lg:col-start-9">
            <h3 className="eyebrow mb-6 text-gold">Follow</h3>
            <ul className="space-y-3 text-sm">
              {contact.social.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="link-line text-ink">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </RevealItem>

          <RevealItem className="lg:col-span-2 lg:col-start-11">
            <h3 className="eyebrow mb-6 text-gold">Private Events</h3>
            <p className="text-sm leading-relaxed text-ink/60">
              For private dining and events at {brand.name}, write to{" "}
              <a href={`mailto:${contact.email}?subject=Private%20dining%20enquiry`} className="link-line text-ink">
                our team
              </a>
              .
            </p>
          </RevealItem>
        </RevealGroup>
      </div>
    </section>
  );
}
