"use client";

import Image from "next/image";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useRef, useState } from "react";
import { philosophy } from "@/content/site";
import { ease } from "@/lib/motion";
import { SectionMarker } from "@/components/ui/SectionMarker";
import { SplitLines } from "@/components/ui/SplitLines";
import { Reveal } from "@/components/ui/Reveal";
import { ParallaxImage } from "@/components/ui/ParallaxImage";

type Principle = (typeof philosophy)[number];

function PrincipleRow({ item, index, active, onActivate }: { item: Principle; index: number; active: boolean; onActivate: (i: number) => void }) {
  return (
    <li onPointerEnter={() => onActivate(index)} className="group border-t border-ivory/12 py-10 md:py-14">
      {/* Inline image for small screens, where the sticky panel is hidden */}
      <ParallaxImage photo={item.image} sizes="100vw" strength={6} className="mb-8 aspect-4/3 lg:hidden" />
      <Reveal className="grid grid-cols-[3.5rem_1fr] gap-x-4 md:grid-cols-[5rem_1fr]">
        <span
          className={`pt-2 font-serif text-2xl transition-colors duration-700 md:text-3xl ${active ? "text-gold" : "text-ivory/30"}`}
          aria-hidden
        >
          {item.numeral}
        </span>
        <div>
          <h3 className={`font-serif text-title font-light transition-colors duration-700 ${active ? "text-ivory" : "lg:text-ivory/55"}`}>
            {item.title}
          </h3>
          <p className={`prose-serif mt-4 max-w-md transition-colors duration-700 ${active ? "text-ivory/70" : "text-ivory/70 lg:text-ivory/35"}`}>
            {item.text}
          </p>
        </div>
      </Reveal>
    </li>
  );
}

export function Philosophy() {
  const [active, setActive] = useState(0);
  const current = philosophy[active];
  const listRef = useRef<HTMLOListElement>(null);
  // the row crossing the middle of the viewport is the active one
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start center", "end center"] });
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(Math.min(philosophy.length - 1, Math.max(0, Math.floor(v * philosophy.length))));
  });

  return (
    <section id="philosophy" aria-labelledby="philosophy-title" className="grain relative bg-ink py-28 text-ivory md:py-40">
      <div className="container-edge">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Sticky image panel (desktop) */}
          <div className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-28 h-[calc(100svh-10rem)]">
              <div className="relative h-full overflow-hidden bg-ink-3">
                <AnimatePresence initial={false}>
                  <motion.div
                    key={current.title}
                    initial={{ clipPath: "inset(0% 0% 100% 0%)", scale: 1.08 }}
                    animate={{ clipPath: "inset(0% 0% 0% 0%)", scale: 1 }}
                    exit={{ opacity: 0.4 }}
                    transition={{ duration: 1.1, ease }}
                    className="absolute inset-0"
                  >
                    <Image src={current.image.src} alt={current.image.alt} fill sizes="40vw" className="object-cover" />
                  </motion.div>
                </AnimatePresence>
                <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-ink/70 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end gap-6 p-8">
                  <span className="font-serif text-[6.5rem] leading-[0.8] font-light text-ivory/90">{current.numeral}</span>
                  <span className="pb-2 font-serif text-xl italic text-ivory/70">{current.title}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <SectionMarker label="Culinary Philosophy" tone="light" className="mb-12" />
            <SplitLines
              id="philosophy-title"
              className="mb-8 font-serif text-headline font-light tracking-[-0.015em]"
              lines={["Four quiet", "principles."]}
            />
            <Reveal delay={0.1}>
              <p className="prose-serif mb-16 max-w-md text-ivory/65 md:mb-24">
                Nothing on the plate is there by accident. These are the ideas the kitchen returns to every day — before the first
                guest arrives, and long after the last one leaves.
              </p>
            </Reveal>
            <ol ref={listRef} className="border-b border-ivory/12">
              {philosophy.map((item, i) => (
                <PrincipleRow key={item.title} item={item} index={i} active={active === i} onActivate={setActive} />
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
