# Maison Ostrel — Restaurant Website

A single-page, editorial restaurant site built with **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS v4**, **Framer Motion** and **Lenis** smooth scrolling.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Editing content

Everything a restaurant owner edits lives in **`src/content/site.ts`**: name, address, phone, email, social links, opening hours (which also drive the reservation time slots), story copy, signature dishes, menu, gallery, testimonials and reservation policies.

> **Everything marked `PLACEHOLDER` must be replaced before launch.** The name "Maison Ostrel", the address, the hours, the dishes, the prices and the testimonials are all illustrative. Testimonials must be genuine, attributed reviews. Also set `brand.siteUrl` to the production domain (it drives canonical URLs, Open Graph and JSON-LD).

## Reservations

`src/lib/reservations.ts` validates the form on the client. That covers past dates, closed days, valid slots, a one-hour notice for same-day requests, party size, email and phone. **No booking backend is connected.** On submission the guest is told plainly that their table is *not* confirmed and is offered a pre-filled email and a phone link. To connect OpenTable, SevenRooms, Resy or your own API, implement `submitReservation()`. Return `status: "confirmed"` only once the provider has confirmed the booking.

## Map

`src/components/sections/Contact.tsx` contains a stylised map placeholder with a working "Open in Google Maps" link built from `contact.mapsQuery`. Replace it with a Google Maps `<iframe>` embed when the address is final.

## Imagery

Photography comes from Unsplash (Unsplash License) and is resized on Unsplash's CDN by a custom `next/image` loader (`src/lib/image-loader.ts`). Each photo is used once. To use the restaurant's own photography, put files in `public/` and point the `photo()` entries in `site.ts` at them, or swap in your own `src` strings.

## Structure

```
src/
  app/            layout (fonts, metadata, JSON-LD), page, global design tokens
  content/        site.ts — all editable content
  lib/            image loader, reservation logic, motion constants, hooks
  components/
    providers/    Lenis smooth scroll + reduced-motion handling
    layout/       Navigation, Footer
    sections/     Hero, Introduction, Philosophy, Signatures, Experience,
                  Menu, Gallery, Testimonials, Reservation, Contact
    ui/           Reveal, SplitLines, ParallaxImage, SectionMarker, Button
```

## Accessibility & motion

When `prefers-reduced-motion` is set, smooth scrolling and parallax are turned off. The pinned horizontal Experience section becomes a vertical sequence. The page has a skip link, semantic landmarks, keyboard-operable tabs, a focus-managed lightbox and labelled form fields with inline errors.
