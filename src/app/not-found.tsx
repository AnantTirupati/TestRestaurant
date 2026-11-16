import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <main id="main" className="grain flex min-h-svh flex-col justify-center bg-ink pt-28 pb-20 text-ivory">
      <div className="container-edge">
        <p className="eyebrow mb-10 flex items-center gap-4 text-gold">
          <span aria-hidden className="h-px w-10 bg-gold" />
          Error 404
        </p>
        <h1 className="max-w-[14ch] font-serif text-headline font-light tracking-[-0.015em]">
          This table <em className="text-gold-light">does not exist.</em>
        </h1>
        <p className="mt-8 max-w-sm leading-[1.85] text-ivory/60">
          The page you were looking for has moved or was never set. Let us show you back to the dining room.
        </p>
        <div className="mt-12 flex flex-wrap items-center gap-8">
          <ButtonLink href="/" variant="gold" arrow>
            Return Home
          </ButtonLink>
          <Link href="/#reserve" className="eyebrow link-line text-ivory/80 hover:text-ivory">
            Reserve a Table
          </Link>
        </div>
      </div>
    </main>
  );
}
