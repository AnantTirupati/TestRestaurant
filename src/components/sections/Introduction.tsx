import { images, story } from "@/content/site";
import { SectionMarker } from "@/components/ui/SectionMarker";
import { SplitLines } from "@/components/ui/SplitLines";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { Reveal } from "@/components/ui/Reveal";

export function Introduction() {
  return (
    <section id="story" aria-labelledby="story-title" className="relative bg-ivory py-28 md:py-40 xl:py-48">
      <div className="container-edge">
        <SectionMarker label={story.eyebrow} className="mb-14 md:mb-20" />

        <SplitLines
          id="story-title"
          className="font-serif text-[clamp(1.95rem,6vw,6.25rem)] leading-[1.02] font-light tracking-[-0.015em] text-ink lg:max-w-none"
          lines={[
            story.statement[0],
            <span key="1">
              who notice the <em className="text-wine">details</em> —
            </span>,
            <span key="2" className="lg:pl-[2.2em]">
              {story.statement[2]}
            </span>,
            <span key="3" className="lg:pl-[2.2em]">
              the <em className="text-wine">pause</em> between courses.
            </span>,
          ]}
        />

        <div className="mt-20 grid gap-14 md:mt-28 lg:grid-cols-12 lg:gap-8">
          <ParallaxImage
            photo={images.introRoom}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="aspect-4/5 md:aspect-16/11 lg:col-span-7 lg:aspect-4/5 xl:aspect-5/6"
            strength={8}
          />

          <div className="flex flex-col lg:col-span-4 lg:col-start-9 lg:pt-40">
            <Reveal className="prose-serif space-y-6 text-ink/80">
              {story.body.map((p, i) => (
                <p key={i} className={i === 0 ? "first-letter:float-left first-letter:mt-[0.06em] first-letter:mr-2.5 first-letter:text-[4.4rem] first-letter:leading-[0.78] first-letter:font-light first-letter:text-wine" : ""}>
                  {p}
                </p>
              ))}
            </Reveal>

            <Reveal delay={0.15} className="mt-12 flex items-end gap-6 border-t border-ink/15 pt-8">
              <div>
                <p className="font-serif text-[1.65rem] italic text-ink">{story.signature}</p>
                <p className="eyebrow mt-2 text-ink/50">{story.signatureRole}</p>
              </div>
            </Reveal>

            <ParallaxImage
              photo={images.introDetail}
              sizes="(min-width: 1024px) 25vw, 70vw"
              reveal="left"
              strength={6}
              className="mt-16 ml-auto aspect-4/5 w-3/4 sm:w-1/2 lg:mt-auto lg:w-[78%] lg:translate-x-[10%]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
