import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Introduction } from "@/components/sections/Introduction";
import { Philosophy } from "@/components/sections/Philosophy";
import { Signatures } from "@/components/sections/Signatures";
import { Experience } from "@/components/sections/Experience";
import { Menu } from "@/components/sections/Menu";
import { Gallery } from "@/components/sections/Gallery";
import { Testimonials } from "@/components/sections/Testimonials";
import { Reservation } from "@/components/sections/Reservation";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <main id="main">
        <Hero />
        <Introduction />
        <Philosophy />
        <Signatures />
        <Experience />
        <Menu />
        <Gallery />
        <Testimonials />
        <Reservation />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
