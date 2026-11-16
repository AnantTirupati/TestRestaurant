/** Shared motion language — one easing curve, a few durations. */

export const ease = [0.22, 1, 0.36, 1] as const; // expo-out: confident, unhurried
export const easeInOut = [0.65, 0, 0.35, 1] as const;

export const duration = {
  fast: 0.45,
  base: 0.9,
  slow: 1.4,
  cinematic: 2.4,
};

export const viewportOnce = { once: true, margin: "0px 0px -12% 0px" } as const;
