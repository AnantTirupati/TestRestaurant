"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { testimonials } from "@/content/site";
import { ease } from "@/lib/motion";
import { Reveal } from "@/components/ui/Reveal";

/** One quotation at a time, centred like a pull-quote in a magazine. */
export function Testimonials() {
  const [i, setI] = useState(0);
  const t = testimonials[i];
  const go = (d: number) => setI((n) => (n + d + testimonials.length) % testimonials.length);

  return (
    <section id="words" aria-labelledby="words-title" className="relative bg-stone py-28 md:py-36">
      <div className="container-edge">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal y={10}>
            <h2 id="words-title" className="eyebrow text-wine/80">
              Kind Words
            </h2>
          </Reveal>

          <div aria-live="polite" className="mt-12 grid min-h-[17rem] place-items-center md:min-h-[15rem]">
            <AnimatePresence mode="wait">
              <motion.figure
                key={i}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.7, ease }}
              >
                <blockquote className="font-serif text-[clamp(1.6rem,3vw,2.6rem)] leading-[1.25] font-light text-ink italic">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-10">
                  <span className="block font-serif text-xl text-ink">{t.author}</span>
                  <span className="mt-1 block text-xs tracking-[0.08em] text-ink/50">{t.source}</span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          <div className="mt-12 flex items-center justify-center gap-6">
            <button type="button" onClick={() => go(-1)} aria-label="Previous testimonial" className="px-2 font-serif text-2xl text-ink/50 transition-colors hover:text-ink">
              ←
            </button>
            <div className="flex gap-3" role="group" aria-label="Choose testimonial">
              {testimonials.map((_, n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setI(n)}
                  aria-label={`Testimonial ${n + 1}`}
                  aria-current={n === i ? "true" : undefined}
                  className="group grid h-8 w-8 place-items-center"
                >
                  <span
                    className={`block h-px transition-all duration-700 ease-luxe ${n === i ? "w-8 bg-ink" : "w-3 bg-ink/30 group-hover:bg-ink/60"}`}
                  />
                </button>
              ))}
            </div>
            <button type="button" onClick={() => go(1)} aria-label="Next testimonial" className="px-2 font-serif text-2xl text-ink/50 transition-colors hover:text-ink">
              →
            </button>
          </div>

          <p className="mt-10 text-xs text-ink/45">Placeholder quotations — to be replaced with verified, attributed reviews.</p>
        </div>
      </div>
    </section>
  );
}
