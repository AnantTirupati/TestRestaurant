"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useRef, type AnchorHTMLAttributes, type ButtonHTMLAttributes, type ReactNode } from "react";

type Variant = "gold" | "ivory" | "ink" | "ghost-light" | "ghost-dark";

const variants: Record<Variant, string> = {
  gold: "bg-gold text-ink border-gold [--fill:var(--color-ivory)]",
  ivory: "bg-ivory text-ink border-ivory [--fill:var(--color-gold)]",
  ink: "bg-ink text-ivory border-ink [--fill:var(--color-wine)]",
  "ghost-light": "bg-transparent text-ivory border-ivory/40 [--fill:var(--color-ivory)] hover:text-ink",
  "ghost-dark": "bg-transparent text-ink border-ink/30 [--fill:var(--color-ink)] hover:text-ivory",
};

const base =
  "group relative inline-flex items-center justify-center gap-4 overflow-hidden border px-7 py-4 eyebrow transition-colors duration-500 ease-luxe disabled:pointer-events-none disabled:opacity-50";

function Inner({ children, arrow }: { children: ReactNode; arrow?: boolean }) {
  return (
    <>
      {/* fill wipes up from the bottom on hover */}
      <span
        aria-hidden
        className="absolute inset-0 origin-bottom scale-y-0 bg-[var(--fill)] transition-transform duration-700 ease-luxe group-hover:scale-y-100"
      />
      <span className="relative">{children}</span>
      {arrow && (
        <span aria-hidden className="relative block h-px w-6 bg-current transition-[width] duration-500 ease-luxe group-hover:w-9">
          <span className="absolute right-0 -top-[3px] h-[7px] w-[7px] rotate-45 border-t border-r border-current" />
        </span>
      )}
    </>
  );
}

export function ButtonLink({
  variant = "gold",
  arrow = false,
  className = "",
  children,
  ...rest
}: AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: Variant; arrow?: boolean }) {
  return (
    <a className={`${base} ${variants[variant]} ${className}`} {...rest}>
      <Inner arrow={arrow}>{children}</Inner>
    </a>
  );
}

export function Button({
  variant = "gold",
  arrow = false,
  className = "",
  children,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; arrow?: boolean }) {
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...rest}>
      <Inner arrow={arrow}>{children}</Inner>
    </button>
  );
}

/** Gently pulls its child toward the cursor. Used for primary CTAs only. */
export function Magnetic({ children, strength = 0.28 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const x = useSpring(useMotionValue(0), { stiffness: 180, damping: 18, mass: 0.4 });
  const y = useSpring(useMotionValue(0), { stiffness: 180, damping: 18, mass: 0.4 });

  const onMove = (e: React.PointerEvent) => {
    if (reduce || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div ref={ref} className="inline-block" style={{ x, y }} onPointerMove={onMove} onPointerLeave={reset}>
      {children}
    </motion.div>
  );
}
