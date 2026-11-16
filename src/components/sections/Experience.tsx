"use client";

import Image from "next/image";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { experience } from "@/content/site";
import { SectionMarker } from "@/components/ui/SectionMarker";
import { SplitLines } from "@/components/ui/SplitLines";
import { Reveal } from "@/components/ui/Reveal";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { useMediaQuery } from "@/lib/hooks";

type Chapter = (typeof experience)[number];

function Intro() {
  return (
    <div className="flex flex-col justify-center">
      <SectionMarker label="The Experience" tone="light" className="mb-12" />
      <SplitLines
        id="experience-title"
        className="font-serif text-headline font-light tracking-[-0.015em] text-ivory"
        lines={["An evening,", "considered."]}
      />
      <Reveal delay={0.2}>
        <p className="prose-serif mt-10 max-w-sm text-ivory/65">
          From the moment the door opens to the last glass, nothing is left to chance — and nothing feels rehearsed.
        </p>
      </Reveal>
    </div>
  );
}

function Panel({ chapter, i }: { chapter: Chapter; i: number }) {
  const tall = i % 2 === 0;
  return (
    <article className={`group flex shrink-0 flex-col ${tall ? "w-[34vw] max-w-[560px]" : "w-[46vw] max-w-[780px] justify-end"}`}>
      <div className={`relative overflow-hidden bg-ink-3 ${tall ? "h-[64vh]" : "h-[52vh]"}`}>
        <Image
          src={chapter.image.src}
          alt={chapter.image.alt}
          fill
          sizes="50vw"
          className="object-cover transition-transform duration-1800 ease-luxe group-hover:scale-105"
        />
      </div>
      <div className="mt-7 max-w-md">
        <p className="eyebrow mb-4 text-gold-light/80">{chapter.label}</p>
        <h3 className="font-serif text-[2.4rem] leading-[1.05] font-light text-ivory">{chapter.title}</h3>
        <p className="prose-serif mt-4 text-ivory/65">{chapter.text}</p>
      </div>
    </article>
  );
}

/** Desktop: vertical scroll drives a horizontal gallery of chapters. */
function HorizontalStory() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (!trackRef.current) return;
      setDistance(Math.max(0, trackRef.current.scrollWidth - window.innerWidth));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setStep(Math.min(experience.length - 1, Math.max(0, Math.round(v * experience.length - 0.5))));
  });

  return (
    <div ref={wrapRef} style={{ height: `calc(100svh + ${distance}px)` }} className="relative">
      <div className="sticky top-0 flex h-svh flex-col justify-center overflow-hidden">
        <motion.div ref={trackRef} style={{ x }} className="flex w-max items-center gap-[6vw] pr-[8vw] pl-[max(4rem,calc((100vw-1600px)/2+4rem))] will-change-transform">
          <div className="w-[32vw] max-w-[520px] shrink-0">
            <Intro />
          </div>
          {experience.map((c, i) => (
            <Panel key={c.key} chapter={c} i={i} />
          ))}
        </motion.div>

        {/* progress rail */}
        <div className="container-edge absolute inset-x-0 bottom-8 flex items-center gap-6">
          <span className="eyebrow w-28 text-ivory/50">{experience[step].label}</span>
          <div className="relative h-px flex-1 bg-ivory/15">
            <motion.div style={{ scaleX: scrollYProgress }} className="absolute inset-0 origin-left bg-gold" />
          </div>
          <span className="eyebrow text-ivory/50">
            {String(step + 1).padStart(2, "0")} / {String(experience.length).padStart(2, "0")}
          </span>
        </div>
      </div>
    </div>
  );
}

/** Mobile / reduced motion: an editorial vertical sequence. */
function StackedStory() {
  return (
    <div className="container-edge py-28 md:py-40">
      <Intro />
      <div className="mt-20 space-y-24">
        {experience.map((c, i) => (
          <article key={c.key} className={i % 2 ? "md:ml-[25%]" : "md:mr-[25%]"}>
            <ParallaxImage photo={c.image} sizes="(min-width: 768px) 75vw, 100vw" strength={6} className="aspect-4/5 sm:aspect-3/2" />
            <Reveal className="mt-7 grid gap-4 sm:grid-cols-[8rem_1fr]">
              <span className="eyebrow pt-3 text-gold">
                {c.label}
              </span>
              <div>
                <h3 className="font-serif text-[2.2rem] leading-[1.05] font-light text-ivory">{c.title}</h3>
                <p className="prose-serif mt-4 max-w-md text-ivory/65">{c.text}</p>
              </div>
            </Reveal>
          </article>
        ))}
      </div>
    </div>
  );
}

export function Experience() {
  const reduce = useReducedMotion();
  const desktop = useMediaQuery("(min-width: 64rem) and (min-height: 600px)");

  return (
    <section id="experience" aria-labelledby="experience-title" className="grain relative bg-ink-2 text-ivory">
      {desktop && !reduce ? <HorizontalStory /> : <StackedStory />}
    </section>
  );
}
