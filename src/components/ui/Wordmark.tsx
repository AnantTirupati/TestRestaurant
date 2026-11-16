import { brand } from "@/content/site";

/**
 * The house lockup: a small spaced "MAISON" set over the name in italic serif.
 * Replace with an SVG logotype once the brand identity is final.
 */
export function Wordmark({ size = "sm", align = "start" }: { size?: "sm" | "lg"; align?: "start" | "center" }) {
  const lg = size === "lg";
  return (
    <span className={`inline-flex flex-col leading-none ${align === "center" ? "items-center" : "items-start"}`}>
      <span className={`font-sans font-medium uppercase ${lg ? "mb-3 text-[0.7rem] tracking-[0.62em]" : "mb-1.5 text-[0.5rem] tracking-[0.58em]"}`}>
        {brand.name.split(" ")[0]}
      </span>
      <span className={`font-serif font-light italic ${lg ? "text-[clamp(3.5rem,8vw,6rem)] tracking-[-0.01em]" : "text-[1.75rem] tracking-[0.01em]"}`}>
        {brand.shortName}
      </span>
    </span>
  );
}
