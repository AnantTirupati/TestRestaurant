"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { gallery } from "@/content/site";
import { ease } from "@/lib/motion";
import { useLenis } from "@/components/providers/SmoothScroll";
import { SplitLines } from "@/components/ui/SplitLines";
import { Reveal } from "@/components/ui/Reveal";

const subscribeNoop = () => () => {};

/** Mosaic spans — mobile (2 cols) and desktop (12 cols). */
const spans = [
  "col-span-1 row-span-2 lg:col-span-4 lg:row-span-2",
  "col-span-1 row-span-1 lg:col-span-5 lg:row-span-1",
  "col-span-1 row-span-2 lg:col-span-3 lg:row-span-2",
  "col-span-1 row-span-1 lg:col-span-5 lg:row-span-1",
  "col-span-2 row-span-1 lg:col-span-6 lg:row-span-1",
  "col-span-1 row-span-1 lg:col-span-3 lg:row-span-1",
  "col-span-1 row-span-1 lg:col-span-3 lg:row-span-1",
];

function Lightbox({ index, onClose, onStep }: { index: number; onClose: () => void; onStep: (d: number) => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const item = gallery[index];

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onStep(1);
      if (e.key === "ArrowLeft") onStep(-1);
      // keep focus inside the dialog
      if (e.key === "Tab" && dialogRef.current) {
        const f = dialogRef.current.querySelectorAll<HTMLElement>("button");
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, onStep]);

  return (
    <motion.div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`Image ${index + 1} of ${gallery.length}: ${item.caption}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease }}
      className="fixed inset-0 z-60 flex flex-col bg-ink/96 text-ivory backdrop-blur-sm"
      onClick={onClose}
    >
      <div className="container-edge flex items-center justify-between py-6" onClick={(e) => e.stopPropagation()}>
        <span className="eyebrow text-ivory/60">
          {String(index + 1).padStart(2, "0")} / {String(gallery.length).padStart(2, "0")}
        </span>
        <button ref={closeRef} type="button" onClick={onClose} className="eyebrow flex items-center gap-3 p-2 text-ivory/80 hover:text-ivory">
          Close <X size={18} strokeWidth={1.25} aria-hidden />
        </button>
      </div>

      <div className="relative flex-1 px-4 md:px-24">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={item.src}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.6, ease }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.25}
            onDragEnd={(_, info) => {
              if (info.offset.x < -80) onStep(1);
              else if (info.offset.x > 80) onStep(-1);
            }}
            className="absolute inset-4 cursor-grab active:cursor-grabbing md:inset-x-24 md:inset-y-0"
            onClick={(e) => e.stopPropagation()}
          >
            <Image src={item.src} alt={item.alt} fill sizes="90vw" quality={80} className="object-contain" draggable={false} />
          </motion.div>
        </AnimatePresence>
        <button
          type="button"
          aria-label="Previous image"
          onClick={(e) => {
            e.stopPropagation();
            onStep(-1);
          }}
          className="absolute top-1/2 left-2 hidden -translate-y-1/2 border border-ivory/20 p-4 transition-colors hover:border-gold hover:text-gold md:left-6 md:block"
        >
          <ChevronLeft size={20} strokeWidth={1.25} aria-hidden />
        </button>
        <button
          type="button"
          aria-label="Next image"
          onClick={(e) => {
            e.stopPropagation();
            onStep(1);
          }}
          className="absolute top-1/2 right-2 hidden -translate-y-1/2 border border-ivory/20 p-4 transition-colors hover:border-gold hover:text-gold md:right-6 md:block"
        >
          <ChevronRight size={20} strokeWidth={1.25} aria-hidden />
        </button>
      </div>

      <div className="container-edge flex items-center justify-between py-6" onClick={(e) => e.stopPropagation()}>
        <p className="font-serif text-2xl italic">{item.caption}</p>
        <p className="hidden max-w-md text-right text-sm text-ivory/50 md:block">{item.alt}</p>
        <div className="flex gap-2 md:hidden">
          <button type="button" aria-label="Previous image" onClick={() => onStep(-1)} className="border border-ivory/20 p-3">
            <ChevronLeft size={18} strokeWidth={1.25} aria-hidden />
          </button>
          <button type="button" aria-label="Next image" onClick={() => onStep(1)} className="border border-ivory/20 p-3">
            <ChevronRight size={18} strokeWidth={1.25} aria-hidden />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export function Gallery() {
  const lenis = useLenis();
  const [open, setOpen] = useState<number | null>(null);
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const lastOpened = useRef<number>(0);

  const close = useCallback(() => {
    setOpen(null);
    triggerRefs.current[lastOpened.current]?.focus({ preventScroll: true });
  }, []);
  const step = useCallback((d: number) => {
    setOpen((i) => {
      if (i === null) return i;
      const n = (i + d + gallery.length) % gallery.length;
      lastOpened.current = n;
      return n;
    });
  }, []);

  const isOpen = open !== null;
  // portals need the DOM: false during SSR + hydration, true afterwards
  const mounted = useSyncExternalStore(subscribeNoop, () => true, () => false);
  useEffect(() => {
    if (!isOpen) return;
    lenis?.stop();
    document.documentElement.style.overflow = "hidden";
    return () => {
      lenis?.start();
      document.documentElement.style.overflow = "";
    };
  }, [isOpen, lenis]);

  return (
    <section id="gallery" aria-labelledby="gallery-title" className="grain relative bg-ink py-28 text-ivory md:py-40">
      <div className="container-edge">
        <div className="mb-14 grid gap-8 border-b border-ivory/12 pb-10 md:mb-20 lg:grid-cols-12 lg:items-end">
          <SplitLines
            id="gallery-title"
            className="font-serif text-title font-light lg:col-span-6"
            lines={["From the kitchen and the room"]}
          />
          <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9">
            <p className="prose-serif text-ivory/60 italic">
              The pass at the height of service, a plate resting before it leaves, the bar as the evening settles in.
            </p>
          </Reveal>
        </div>

        <ul className="grid auto-rows-[44vw] grid-cols-2 gap-3 sm:auto-rows-[34vw] md:gap-4 lg:auto-rows-[min(19vw,300px)] lg:grid-cols-12 lg:gap-5">
          {gallery.map((g, i) => (
            <motion.li
              key={g.src}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -8% 0px" }}
              transition={{ duration: 1.1, ease, delay: (i % 3) * 0.08 }}
              className={spans[i]}
            >
              <button
                ref={(el) => {
                  triggerRefs.current[i] = el;
                }}
                type="button"
                onClick={() => {
                  lastOpened.current = i;
                  setOpen(i);
                }}
                aria-label={`Open image: ${g.caption} — ${g.alt}`}
                className="group relative block h-full w-full cursor-zoom-in overflow-hidden bg-ink-3"
              >
                <Image
                  src={g.src}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 40vw, 50vw"
                  className="object-cover transition-transform duration-1600 ease-luxe group-hover:scale-[1.07]"
                />
                <span className="absolute inset-0 bg-linear-to-t from-ink/70 via-ink/0 to-ink/0 opacity-0 transition-opacity duration-700 group-hover:opacity-100 group-focus-visible:opacity-100" />
                <span className="absolute bottom-4 left-4 flex translate-y-3 items-baseline gap-3 opacity-0 transition-all duration-700 ease-luxe group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 md:bottom-6 md:left-6">
                  <span className="eyebrow text-gold">{String(i + 1).padStart(2, "0")}</span>
                  <span className="font-serif text-xl italic md:text-2xl">{g.caption}</span>
                </span>
              </button>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Portalled to <body> so it escapes this section's stacking context
          and sits above the navigation and every later section. */}
      {mounted &&
        createPortal(
          <AnimatePresence>{open !== null && <Lightbox index={open} onClose={close} onStep={step} />}</AnimatePresence>,
          document.body,
        )}
    </section>
  );
}
