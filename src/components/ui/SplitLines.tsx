"use client";

import { Fragment, type ElementType, type ReactNode } from "react";
import { motion } from "framer-motion";
import { ease, viewportOnce } from "@/lib/motion";

type SplitLinesProps = {
  lines: ReactNode[];
  as?: ElementType;
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
  /** "mount" animates immediately (hero); "view" waits for the viewport. */
  trigger?: "mount" | "view";
  duration?: number;
  id?: string;
};

/**
 * Editorial line-by-line reveal: each line rises out of a mask.
 *
 * Assistive tech reads the sentence once, unbroken, from an sr-only copy.
 * That copy renders the line nodes as-is (never by walking their children),
 * so server and client output are identical even when `lines` contains JSX
 * passed down from a Server Component.
 */
export function SplitLines({
  lines,
  as: Tag = "h2",
  className,
  lineClassName,
  delay = 0,
  stagger = 0.11,
  trigger = "view",
  duration = 1.15,
  id,
}: SplitLinesProps) {
  const play = trigger === "mount" ? { animate: "show" } : { whileInView: "show", viewport: viewportOnce };

  return (
    <Tag className={className} id={id}>
      <span className="sr-only">
        {lines.map((line, i) => (
          <Fragment key={i}>
            {i > 0 && " "}
            {line}
          </Fragment>
        ))}
      </span>
      <motion.span
        aria-hidden
        className="block"
        initial="hidden"
        {...play}
        variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
      >
        {lines.map((line, i) => (
          <span key={i} className="mb-[-0.1em] block overflow-hidden pb-[0.1em]">
            <motion.span
              className={`block will-change-transform ${lineClassName ?? ""}`}
              variants={{
                hidden: { y: "105%" },
                show: { y: "0%", transition: { duration, ease } },
              }}
            >
              {line}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
