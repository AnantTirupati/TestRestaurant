"use client";

import { useSyncExternalStore } from "react";

/** SSR-safe media query: returns `false` on the server and first paint. */
export function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

const noopSubscribe = () => () => {};

/** Today's date (YYYY-MM-DD) on the client; empty string during SSR. */
export function useTodayISO() {
  return useSyncExternalStore(
    noopSubscribe,
    () => {
      const d = new Date();
      return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    },
    () => "",
  );
}
