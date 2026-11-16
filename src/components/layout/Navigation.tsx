"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { brand, contact, navLinks } from "@/content/site";
import { ease } from "@/lib/motion";
import { scrollToHash, useLenis } from "@/components/providers/SmoothScroll";
import { Wordmark } from "@/components/ui/Wordmark";

/**
 * Site-wide navigation, rendered from the root layout so it appears on every
 * route. It stays pinned to the top of the viewport at all times.
 * On the home page links scroll smoothly to their section; on any other page
 * they navigate to `/#section`.
 */
export function Navigation() {
  const lenis = useLenis();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 60));

  // Only the home page has a hero to sit over; elsewhere the bar is always solid.
  const solid = scrolled || !isHome;
  const showBar = solid || open;
  const to = (hash: string) => (isHome ? hash : `/${hash}`);

  // Track which section is in view (home page only) for aria-current + underline
  useEffect(() => {
    if (!isHome) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    navLinks.forEach((l) => {
      const el = document.getElementById(l.href.slice(1));
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [isHome]);

  // Arriving at /#section from another page: the browser jumps to the anchor
  // before client-only layouts (e.g. the pinned Experience gallery) settle,
  // so re-align once they have.
  useEffect(() => {
    const hash = window.location.hash;
    if (!isHome || hash.length < 2) return;
    const t = window.setTimeout(() => {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (!el) return;
      if (lenis) lenis.scrollTo(el, { immediate: true, force: true });
      else el.scrollIntoView();
    }, 450);
    return () => window.clearTimeout(t);
  }, [isHome, lenis]);

  // Lock scroll + manage focus while the mobile menu is open
  useEffect(() => {
    if (!open) return;
    lenis?.stop();
    document.documentElement.style.overflow = "hidden";
    const t = window.setTimeout(() => firstLinkRef.current?.focus(), 350);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(t);
      lenis?.start();
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, lenis]);

  // Close the mobile menu if the viewport grows to desktop
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 64rem)");
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const go = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
      setOpen(false);
      if (!isHome) return; // let the browser navigate to /#section
      e.preventDefault();
      // wait for the mobile overlay to release the scroll lock
      window.setTimeout(() => scrollToHash(lenis, hash), open ? 420 : 0);
    },
    [isHome, lenis, open],
  );

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease, delay: 0.2 }}
        className="fixed inset-x-0 top-0 z-50 text-ivory"
      >
        <div
          className={`absolute inset-0 -z-10 transition-all duration-700 ease-luxe ${
            showBar ? "bg-ink/92 backdrop-blur-md" : "bg-linear-to-b from-ink/50 to-transparent"
          }`}
        />
        <nav
          aria-label="Primary"
          className={`container-edge flex items-center justify-between transition-[padding] duration-700 ease-luxe ${
            solid ? "py-4" : "py-6 md:py-8"
          }`}
        >
          <a href={to("#top")} onClick={(e) => go(e, "#top")} className="flex items-center" aria-label={`${brand.name} — home`}>
            <Wordmark />
          </a>

          <ul className="hidden items-center gap-10 lg:flex">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={to(l.href)}
                  onClick={(e) => go(e, l.href)}
                  aria-current={isHome && active === l.href.slice(1) ? "true" : undefined}
                  className="eyebrow link-line text-ivory/80 transition-colors duration-300 hover:text-ivory aria-[current=true]:text-ivory"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-5">
            <a
              href={to("#reserve")}
              onClick={(e) => go(e, "#reserve")}
              className="eyebrow group relative hidden overflow-hidden border border-gold/70 px-6 py-3 text-ivory transition-colors duration-500 hover:text-ink sm:inline-flex"
            >
              <span aria-hidden className="absolute inset-0 origin-bottom scale-y-0 bg-gold transition-transform duration-700 ease-luxe group-hover:scale-y-100" />
              <span className="relative">Reserve a Table</span>
            </a>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="relative -mr-2 flex h-11 w-11 items-center justify-center lg:hidden"
            >
              <span className={`absolute h-px w-7 bg-current transition-transform duration-500 ease-luxe ${open ? "rotate-45" : "-translate-y-1"}`} />
              <span className={`absolute h-px bg-current transition-all duration-500 ease-luxe ${open ? "w-7 -rotate-45" : "w-5 translate-x-1 translate-y-1"}`} />
            </button>
          </div>
        </nav>

        <motion.div
          aria-hidden
          style={{ scaleX: progress }}
          className={`absolute bottom-0 left-0 h-px w-full origin-left bg-gold transition-opacity duration-500 ${solid && !open ? "opacity-100" : "opacity-0"}`}
        />
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
            transition={{ duration: 0.8, ease }}
            className="grain fixed inset-0 z-40 flex flex-col bg-ink pt-28 text-ivory lg:hidden"
          >
            <nav aria-label="Mobile" className="container-edge flex-1 overflow-y-auto">
              <ul className="flex flex-col">
                {[...navLinks, { label: "Reservations", href: "#reserve" }].map((l, i) => (
                  <li key={l.href} className="overflow-hidden border-b border-ivory/10">
                    <motion.a
                      ref={i === 0 ? firstLinkRef : undefined}
                      href={to(l.href)}
                      onClick={(e) => go(e, l.href)}
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      transition={{ duration: 0.9, ease, delay: 0.18 + i * 0.06 }}
                      className="block py-4 font-serif text-[2.6rem] leading-none font-light transition-colors hover:text-gold-light sm:text-6xl"
                    >
                      {l.label}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </nav>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="container-edge grid gap-6 py-8 text-sm text-ivory/60 sm:grid-cols-2"
            >
              <div>
                <p className="eyebrow mb-3 text-gold">Visit</p>
                {contact.addressLines.map((l) => (
                  <p key={l}>{l}</p>
                ))}
              </div>
              <div>
                <p className="eyebrow mb-3 text-gold">Call</p>
                <a href={contact.phoneHref} className="block">
                  {contact.phone}
                </a>
                <a href={`mailto:${contact.email}`} className="block break-all">
                  {contact.email}
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
