"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { brand, images } from "@/content/site";
import { ease } from "@/lib/motion";
import { SplitLines } from "@/components/ui/SplitLines";
import { ButtonLink, Magnetic } from "@/components/ui/Button";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "18%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-12%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      id="top"
      aria-labelledby="hero-title"
      className="grain relative flex h-svh min-h-160 flex-col overflow-hidden bg-ink text-ivory"
    >
      {/* Photograph — slow cinematic settle, then parallax on scroll */}
      <motion.div style={{ y: imageY }} className="absolute inset-0 -z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.6, ease }}
          className="absolute inset-0 animate-hero-zoom"
        >
          <Image
            src={images.hero.src}
            alt={images.hero.alt}
            fill
            preload
            fetchPriority="high"
            quality={80}
            sizes="100vw"
            className="object-cover object-[62%_50%]"
          />
        </motion.div>
        {/* tonal grading: weight the left and the floor so type sits in shadow */}
        <div className="absolute inset-0 bg-linear-to-r from-ink/85 via-ink/45 to-ink/10" />
        <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/20 to-ink/40" />
      </motion.div>

      <motion.div style={{ y: contentY, opacity: fade }} className="container-edge relative mt-auto pb-28 md:pb-32">
        <motion.p
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 1, ease }}
          className="eyebrow mb-8 flex items-center gap-4 text-gold"
        >
          <span aria-hidden className="h-px w-10 bg-gold" />
          Dining Room &nbsp;·&nbsp; {brand.city}
        </motion.p>

        <div className="grid items-end gap-10 lg:grid-cols-12">
          <SplitLines
            as="h1"
            id="hero-title"
            trigger="mount"
            delay={0.55}
            stagger={0.13}
            duration={1.3}
            className="font-serif text-display font-light tracking-[-0.02em] lg:col-span-8"
            lines={[
              "An Artful",
              <span key="e" className="pl-[0.9em] italic text-gold-light md:pl-[1.6em]">
                Expression
              </span>,
              "of Taste.",
            ]}
          />

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.25, duration: 1.1, ease }}
            className="max-w-sm lg:col-span-4 lg:col-start-9 lg:pb-4"
          >
            <p className="prose-serif mb-10 text-ivory/80">{brand.description}</p>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-5">
              <Magnetic>
                <ButtonLink href="#reserve" variant="gold" arrow>
                  Reserve a Table
                </ButtonLink>
              </Magnetic>
              <a href="#menu" className="eyebrow link-line text-ivory/80 hover:text-ivory">
                View the Menu
              </a>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Footer rail: scroll cue + service note */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1.2 }}
        className="container-edge absolute inset-x-0 bottom-0"
      >
        <div className="flex items-end justify-between border-t border-ivory/15 pt-5 pb-6">
          <a href="#story" className="eyebrow flex items-center gap-4 text-ivory/60 hover:text-ivory">
            <span aria-hidden className="relative block h-10 w-px overflow-hidden bg-ivory/20">
              <span className="absolute inset-0 animate-scroll-line bg-gold" />
            </span>
            Scroll
          </a>
          <p className="eyebrow hidden text-ivory/50 sm:block">Dinner · Tuesday — Saturday</p>
        </div>
      </motion.div>
    </section>
  );
}
