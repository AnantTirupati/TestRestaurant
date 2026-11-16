"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState, type KeyboardEvent } from "react";
import { menu } from "@/content/site";
import { ease } from "@/lib/motion";
import { SplitLines } from "@/components/ui/SplitLines";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Set like a printed carte: centred, typographic, no imagery competing with
 * the words. Categories switch in place as accessible tabs.
 */
export function Menu() {
  const [active, setActive] = useState(0);
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const listRef = useRef<HTMLDivElement>(null);
  const category = menu[active];

  const select = (i: number) => {
    setActive(i);
    // keep the chosen tab in view on narrow screens (horizontal only — never moves the page)
    const tab = tabsRef.current[i];
    const list = listRef.current;
    if (tab && list) list.scrollTo({ left: tab.offsetLeft - (list.clientWidth - tab.clientWidth) / 2, behavior: "smooth" });
  };

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    const last = menu.length - 1;
    const next = { ArrowRight: active === last ? 0 : active + 1, ArrowLeft: active === 0 ? last : active - 1, Home: 0, End: last }[e.key];
    if (next === undefined) return;
    e.preventDefault();
    select(next);
    tabsRef.current[next]?.focus();
  };

  return (
    <section id="menu" aria-labelledby="menu-title" className="relative bg-ivory py-28 md:py-44">
      <div className="container-edge">
        <header className="mx-auto max-w-2xl text-center">
          <Reveal y={10}>
            <p className="eyebrow text-wine/80">Dinner</p>
          </Reveal>
          <SplitLines
            id="menu-title"
            className="mt-8 font-serif text-[clamp(3rem,8vw,7.5rem)] leading-[0.9] font-light tracking-[-0.02em]"
            lines={["The Menu"]}
          />
          <Reveal delay={0.15}>
            <p className="prose-serif mx-auto mt-8 max-w-md text-ink/65 italic">
              Written each morning, according to the market. Please ask us about allergies — the kitchen will gladly adapt.
            </p>
          </Reveal>
        </header>

        {/* Category tabs */}
        <Reveal delay={0.1} className="mt-16 md:mt-24">
          <div
            ref={listRef}
            role="tablist"
            aria-label="Menu categories"
            className="-mx-5 flex gap-8 overflow-x-auto border-y border-ink/12 px-5 [scrollbar-width:none] md:mx-0 md:justify-center md:gap-12 md:px-0 [&::-webkit-scrollbar]:hidden"
          >
            {menu.map((c, i) => (
              <button
                key={c.id}
                ref={(el) => {
                  tabsRef.current[i] = el;
                }}
                role="tab"
                id={`tab-${c.id}`}
                aria-selected={active === i}
                aria-controls={`panel-${c.id}`}
                tabIndex={active === i ? 0 : -1}
                onClick={() => select(i)}
                onKeyDown={onKeyDown}
                className={`relative shrink-0 py-5 font-serif text-[1.2rem] whitespace-nowrap transition-colors duration-500 md:text-[1.35rem] ${
                  active === i ? "text-ink italic" : "text-ink/45 hover:text-ink/80"
                }`}
              >
                {c.label}
                {active === i && (
                  <motion.span layoutId="menu-underline" className="absolute inset-x-0 bottom-0 h-px bg-wine" transition={{ duration: 0.6, ease }} />
                )}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mx-auto mt-16 max-w-2xl md:mt-24">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={category.id}
              id={`panel-${category.id}`}
              role="tabpanel"
              aria-labelledby={`tab-${category.id}`}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.55, ease }}
              className="text-center"
            >
              <h3 className="eyebrow text-gold">{category.label}</h3>
              <p className="mx-auto mt-4 max-w-sm font-serif text-lg text-ink/55 italic">{category.intro}</p>

              <ul className="mt-14 space-y-12">
                {category.items.map((item, i) => (
                  <motion.li
                    key={item.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease, delay: 0.08 + i * 0.06 }}
                  >
                    <p className="font-serif text-[1.65rem] leading-tight text-ink md:text-[1.9rem]">{item.name}</p>
                    <p className="mt-2 text-[0.8rem] tracking-[0.04em] text-ink/50">
                      {item.description}
                      {item.note && <span className="text-wine/70"> · {item.note}</span>}
                    </p>
                    {item.price && <p className="mt-2 font-serif text-lg text-ink/70">{item.price}</p>}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>

          <div aria-hidden className="mx-auto mt-16 h-px w-10 bg-gold/60" />
          <p className="mt-8 text-center text-xs leading-relaxed text-ink/45">
            Sample layout — the current menu, with prices, will be published here once confirmed by the kitchen.
          </p>
        </div>
      </div>
    </section>
  );
}
