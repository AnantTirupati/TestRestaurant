"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import type { Photo } from "@/lib/photos";
import { ease, viewportOnce } from "@/lib/motion";

type ParallaxImageProps = {
  photo: Photo;
  sizes: string;
  className?: string;
  imageClassName?: string;
  /** Vertical travel in % of the frame. 0 disables parallax. */
  strength?: number;
  /** Clip-path wipe direction on reveal, or false for none. */
  reveal?: "up" | "left" | "right" | false;
  preload?: boolean;
  quality?: number;
  children?: React.ReactNode;
};

const clipFrom = {
  up: "inset(100% 0% 0% 0%)",
  left: "inset(0% 100% 0% 0%)",
  right: "inset(0% 0% 0% 100%)",
};

/**
 * Image frame with a clip-path reveal and a gentle scroll-linked parallax.
 * The frame (className) controls size; the image overscans to allow travel.
 */
export function ParallaxImage({
  photo,
  sizes,
  className = "",
  imageClassName = "",
  strength = 10,
  reveal = "up",
  preload = false,
  quality,
  children,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${strength}%`, `${strength}%`]);
  const travel = !reduce && strength > 0;

  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden bg-ink-3 ${className}`}
      initial={reveal ? { clipPath: clipFrom[reveal] } : false}
      whileInView={reveal ? { clipPath: "inset(0% 0% 0% 0%)" } : undefined}
      viewport={viewportOnce}
      transition={{ duration: 1.5, ease }}
    >
      <motion.div
        className="absolute inset-x-0 will-change-transform"
        style={{
          y: travel ? y : 0,
          top: travel ? `-${strength}%` : 0,
          bottom: travel ? `-${strength}%` : 0,
        }}
        initial={reveal ? { scale: 1.18 } : false}
        whileInView={reveal ? { scale: 1 } : undefined}
        viewport={viewportOnce}
        transition={{ duration: 2, ease }}
      >
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes={sizes}
          preload={preload}
          quality={quality}
          className={`object-cover ${imageClassName}`}
        />
      </motion.div>
      {children}
    </motion.div>
  );
}
