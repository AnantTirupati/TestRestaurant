import { brand, contact, hoursSummary, navLinks } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";
import { Wordmark } from "@/components/ui/Wordmark";

export function Footer() {
  return (
    <footer className="grain relative bg-ink pt-24 text-ivory md:pt-32">
      <div className="container-edge">
        {/* Colophon: the house lockup, set like the masthead of a menu card */}
        <Reveal className="flex flex-col items-center border-b border-ivory/12 pb-16 text-center md:pb-24">
          <Wordmark size="lg" align="center" />
          <p className="mt-8 flex items-center gap-4 text-[0.7rem] tracking-[0.3em] text-ivory/45 uppercase">
            <span aria-hidden className="h-px w-8 bg-gold/50" />
            Est. {brand.established}
            <span aria-hidden className="h-px w-8 bg-gold/50" />
          </p>
          <p className="prose-serif mt-8 max-w-md text-ivory/60 italic">{brand.description}</p>
        </Reveal>

        <div className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <nav aria-label="Footer">
            <h2 className="eyebrow mb-6 text-gold-light/80">Explore</h2>
            <ul className="space-y-2.5 font-serif text-lg">
              {[...navLinks, { label: "Reservations", href: "#reserve" }].map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="link-line text-ivory/75 hover:text-ivory">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="eyebrow mb-6 text-gold-light/80">Visit</h2>
            <address className="font-serif text-lg leading-snug text-ivory/75 not-italic">
              {contact.addressLines.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
            </address>
          </div>

          <div>
            <h2 className="eyebrow mb-6 text-gold-light/80">Contact</h2>
            <ul className="space-y-2.5 font-serif text-lg">
              <li>
                <a href={contact.phoneHref} className="link-line text-ivory/75 hover:text-ivory">
                  {contact.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${contact.email}`} className="link-line break-all text-ivory/75 hover:text-ivory">
                  {contact.email}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="eyebrow mb-6 text-gold-light/80">Hours</h2>
            <dl className="space-y-2 font-serif text-lg leading-snug">
              {hoursSummary.map((h) => (
                <div key={h.days}>
                  <dt className="text-sm font-sans text-ivory/45">{h.days}</dt>
                  <dd className="text-ivory/75">{h.time}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      <div className="container-edge">
        <div className="flex flex-col gap-5 border-t border-ivory/12 py-8 text-xs text-ivory/45 md:flex-row md:items-center md:justify-between">
          <p>
            © {brand.copyrightYear} {brand.name}
          </p>
          <ul className="flex flex-wrap gap-x-8 gap-y-3">
            {contact.social.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="link-line text-ivory/60 hover:text-ivory">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
          <p>
            Photography via{" "}
            <a href="https://unsplash.com/" target="_blank" rel="noopener noreferrer" className="link-line text-ivory/60">
              Unsplash
            </a>
            <span className="mx-3">·</span>
            <a href="#top" className="link-line text-ivory/60">
              Back to top
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
