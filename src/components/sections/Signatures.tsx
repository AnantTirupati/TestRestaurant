import Image from "next/image";
import { signatureDishes, type Dish } from "@/content/site";
import { SplitLines } from "@/components/ui/SplitLines";
import { Reveal } from "@/components/ui/Reveal";

/** Per-dish placement on the 12-column editorial grid (desktop). */
const layout = [
  { frame: "lg:col-span-5 lg:col-start-1", aspect: "aspect-4/5" },
  { frame: "lg:col-span-4 lg:col-start-8 lg:mt-56", aspect: "aspect-3/4" },
  { frame: "lg:col-span-6 lg:col-start-2 lg:-mt-16", aspect: "aspect-3/2" },
  { frame: "lg:col-span-4 lg:col-start-9 lg:mt-32", aspect: "aspect-4/5" },
];

function DishFigure({ dish, i }: { dish: Dish; i: number }) {
  const l = layout[i % layout.length];
  return (
    <Reveal y={48} className={`${l.frame} ${i % 2 ? "ml-[12%] sm:ml-[30%] lg:ml-0" : "mr-[8%] sm:mr-[22%] lg:mr-0"}`}>
      <figure className="group">
        <div className={`relative overflow-hidden bg-ink/10 ${l.aspect}`}>
          <Image
            src={dish.image.src}
            alt={dish.image.alt}
            fill
            sizes="(min-width: 1024px) 40vw, 90vw"
            className="object-cover transition-transform duration-1600 ease-luxe group-hover:scale-[1.045]"
          />
          <div className="absolute inset-0 bg-ink/0 transition-colors duration-1000 group-hover:bg-ink/10" />
        </div>
        <figcaption className="mt-6 grid grid-cols-[2.5rem_1fr] gap-x-3">
          <span className="pt-[0.55em] font-serif text-base text-gold">{dish.index}</span>
          <div>
            <div className="flex items-baseline justify-between gap-6">
              <h3 className="font-serif text-[1.85rem] leading-tight font-light text-ink md:text-[2.2rem]">{dish.name}</h3>
              {dish.price && <span className="shrink-0 font-serif text-xl text-ink/60">{dish.price}</span>}
            </div>
            <span
              aria-hidden
              className="mt-3 block h-px w-full origin-left scale-x-[0.12] bg-ink/40 transition-transform duration-1000 ease-luxe group-hover:scale-x-100"
            />
            <p className="mt-4 max-w-sm font-serif text-[1.1rem] leading-normal text-ink/65 italic">{dish.description}</p>
          </div>
        </figcaption>
      </figure>
    </Reveal>
  );
}

export function Signatures() {
  return (
    <section id="signatures" aria-labelledby="signatures-title" className="relative overflow-hidden bg-ivory-2 pt-24 pb-28 md:pt-32 md:pb-40">
      <div className="container-edge">
        {/* A single monumental word, the lede tucked against its baseline */}
        <div className="mb-20 flex flex-col gap-8 md:mb-32 lg:flex-row lg:items-end lg:justify-between">
          <SplitLines
            id="signatures-title"
            className="font-serif text-[clamp(3.6rem,13vw,13rem)] leading-[0.85] font-light tracking-[-0.03em] text-ink"
            lines={["Signatures"]}
          />
          <Reveal delay={0.15} className="max-w-xs lg:pb-5">
            <p className="prose-serif text-ink/75">
              A handful of dishes return, in some form, every season. They change as the ingredients do; their character remains.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-20 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-0">
          {signatureDishes.map((dish, i) => (
            <DishFigure key={dish.index} dish={dish} i={i} />
          ))}
        </div>

        <p className="mt-24 text-center text-xs text-ink/45 md:mt-32">
          Dish names and descriptions are placeholders pending the restaurant&apos;s current menu.
        </p>
      </div>
    </section>
  );
}
