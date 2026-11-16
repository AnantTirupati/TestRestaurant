import { Reveal } from "./Reveal";

/** Quiet section label: "The Philosophy ———". Used sparingly, never numbered. */
export function SectionMarker({
  label,
  tone = "dark",
  className = "",
}: {
  label: string;
  tone?: "dark" | "light";
  className?: string;
}) {
  const color = tone === "light" ? "text-gold-light/80" : "text-wine/80";
  return (
    <Reveal y={10} className={`flex items-center gap-4 ${color} ${className}`}>
      <span className="eyebrow">{label}</span>
      <span aria-hidden className="h-px w-10 bg-current opacity-40" />
    </Reveal>
  );
}
