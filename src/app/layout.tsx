import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import { brand, contact, hours } from "@/content/site";
import { images } from "@/content/site";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { Navigation } from "@/components/layout/Navigation";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const title = `${brand.name} — Restaurant, ${brand.city}`;

export const metadata: Metadata = {
  metadataBase: new URL(brand.siteUrl),
  title: { default: title, template: `%s — ${brand.name}` },
  description: `${brand.tagline} ${brand.description} Seasonal tasting menus, private dining and reservations.`,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: brand.name,
    title,
    description: brand.description,
    images: [{ url: `${images.hero.src}?fm=jpg&fit=crop&w=1200&h=630&q=80`, width: 1200, height: 630, alt: images.hero.alt }],
  },
  twitter: { card: "summary_large_image", title, description: brand.description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#141310",
  width: "device-width",
  initialScale: 1,
};

const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: brand.name,
  description: brand.description,
  url: brand.siteUrl,
  telephone: contact.phone,
  email: contact.email,
  image: images.hero.src,
  servesCuisine: "Contemporary",
  acceptsReservations: true,
  address: { "@type": "PostalAddress", streetAddress: contact.addressLines.join(", ") },
  openingHoursSpecification: hours
    .filter((h) => h.slots.length)
    .map((h) => {
      const [opens, closes] = h.time.split("—").map((t) => t.trim());
      return { "@type": "OpeningHoursSpecification", dayOfWeek: dayNames[h.day], opens, closes };
    }),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${manrope.variable}`}>
      <body>
        <a
          href="#main"
          className="eyebrow sr-only z-100 bg-ivory px-5 py-4 text-ink focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
        >
          Skip to content
        </a>
        <SmoothScroll>
          <Navigation />
          {children}
        </SmoothScroll>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
