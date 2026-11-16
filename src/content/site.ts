/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  SITE CONTENT — single source of truth
 * ─────────────────────────────────────────────────────────────────────────────
 *  Everything a restaurant owner would need to edit lives in this file.
 *
 *  Anything marked `PLACEHOLDER` is illustrative and MUST be replaced with
 *  verified information before launch: name, address, hours, dishes, prices,
 *  testimonials, phone numbers and social links. Nothing here is a factual
 *  claim about a real business.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { photo, type Photo } from "@/lib/photos";

/* ── Brand ─────────────────────────────────────────────────────────────── */

export const brand = {
  name: "Maison Ostrel", // PLACEHOLDER — restaurant name
  shortName: "Ostrel",
  monogram: "MO",
  tagline: "An Artful Expression of Taste.",
  description:
    "Where exceptional ingredients, thoughtful craftsmanship, and unforgettable hospitality come together.",
  city: "The City", // PLACEHOLDER — city name
  established: "MMXXVI", // PLACEHOLDER — year of opening (roman numerals)
  copyrightYear: 2026,
  siteUrl: "https://www.example.com", // PLACEHOLDER — production domain
};

/* ── Navigation ────────────────────────────────────────────────────────── */

export const navLinks = [
  { label: "Menu", href: "#menu" },
  { label: "Our Story", href: "#story" },
  { label: "Experience", href: "#experience" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
] as const;

/* ── Contact & location (all PLACEHOLDER) ─────────────────────────────── */

export const contact = {
  addressLines: ["00 Placeholder Street", "District Name", "City, Postcode"],
  phone: "+00 (0)00 0000 0000",
  phoneHref: "tel:+0000000000000",
  email: "reservations@example.com",
  // Used for the "Open in Maps" link. Replace with the real address.
  mapsQuery: "00 Placeholder Street, City",
  social: [
    { label: "Instagram", href: "https://www.instagram.com/" },
    { label: "Facebook", href: "https://www.facebook.com/" },
    { label: "TikTok", href: "https://www.tiktok.com/" },
  ],
};

/**
 * Opening hours — PLACEHOLDER.
 * `day` uses JS weekday numbers (0 = Sunday). `slots` drive the reservation
 * form's available times; leave empty for closed days.
 */
export const hours = [
  { day: 2, label: "Tuesday", time: "18:00 — 22:30", slots: ["18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30"] },
  { day: 3, label: "Wednesday", time: "18:00 — 22:30", slots: ["18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30"] },
  { day: 4, label: "Thursday", time: "18:00 — 22:30", slots: ["18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30"] },
  { day: 5, label: "Friday", time: "18:00 — 23:00", slots: ["18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00"] },
  { day: 6, label: "Saturday", time: "17:30 — 23:00", slots: ["17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00"] },
  { day: 0, label: "Sunday", time: "Closed", slots: [] as string[] },
  { day: 1, label: "Monday", time: "Closed", slots: [] as string[] },
];

export const hoursSummary = [
  { days: "Tuesday — Thursday", time: "18:00 — 22:30" },
  { days: "Friday", time: "18:00 — 23:00" },
  { days: "Saturday", time: "17:30 — 23:00" },
  { days: "Sunday & Monday", time: "Closed" },
];

/* ── Imagery ───────────────────────────────────────────────────────────── */
/* Photography via Unsplash (Unsplash License). Each image is used once.   */

export const images = {
  hero: photo("1414235077428-338989a2e8c0", "A candlelit table set for dinner, a plated course in the foreground", 1.5),
  introRoom: photo("1560053608-13721e0d69e8", "The dining room in the evening — white linen, dark timber and framed prints", 1.5),
  introDetail: photo("1572715376701-98568319fd0b", "A cook finishing a plate with tweezers at the pass", 0.75),
} satisfies Record<string, Photo>;

/* ── Our Story / Introduction ──────────────────────────────────────────── */

export const story = {
  eyebrow: "The House",
  statement: [
    "A dining room for those",
    "who notice the details —",
    "the weight of the linen,",
    "the pause between courses.",
  ],
  body: [
    "We opened with a simple conviction: that an evening at the table can be one of the most generous things a city offers. Not spectacle, but care — repeated, quietly, a thousand times a night.",
    "The kitchen cooks from what the season allows. The dining room is kept intentionally small, so that every guest is known by name before the second course arrives.",
  ],
  signature: "[Chef's name]", // PLACEHOLDER
  signatureRole: "Chef & Founder",
};

/* ── Culinary philosophy ──────────────────────────────────────────────── */

export const philosophy = [
  {
    numeral: "I",
    title: "The Ingredient",
    text: "We begin with the producer, not the recipe. Fish landed this morning, vegetables picked at the hour they are best, meat raised slowly and with respect.",
    image: photo("1601314002592-b8734bca6604", "Fresh fish steaks laid out with halved limes and herbs", 0.75),
  },
  {
    numeral: "II",
    title: "The Season",
    text: "The menu is rewritten as the year turns. When something is at its peak we celebrate it; when it passes, we let it go without regret.",
    image: photo("1551218808-94e220e084d2", "A cook finely chopping fresh herbs on a white board", 0.75),
  },
  {
    numeral: "III",
    title: "The Hand",
    text: "Technique in service of flavour. Fire, patience and precision — the slow work of a brigade that tastes everything, every time.",
    image: photo("1600565193348-f74bd3c7ccdf", "A chef working a pan over a high flame in the kitchen", 0.75),
  },
  {
    numeral: "IV",
    title: "The Plate",
    text: "Composition as the final seasoning. Each plate is arranged to be read — colour, height and texture placed with intention, then set down without ceremony.",
    image: photo("1611657365907-1ca5d9799f59", "A chef carefully finishing a plate with tweezers", 0.75),
  },
];

/* ── Signature dishes (PLACEHOLDER names, descriptions & prices) ──────── */

export type Dish = {
  index: string;
  name: string;
  description: string;
  price: string | null; // null renders as "Price to be confirmed"
  image: Photo;
};

export const signatureDishes: Dish[] = [
  {
    index: "01",
    name: "From the Sea",
    description: "Line-caught fish, the garden at its peak, a sauce reduced through the afternoon.",
    price: null,
    image: photo("1467003909585-2f8a72700288", "A delicate fish course on a white plate, glassware behind", 0.75),
  },
  {
    index: "02",
    name: "Shellfish, Citrus",
    description: "Shellfish from the morning boats, simply grilled, sharpened with citrus.",
    price: null,
    image: photo("1559742811-822873691df8", "Grilled prawns with citrus slices on a black plate", 0.75),
  },
  {
    index: "03",
    name: "From the Fire",
    description: "Aged beef, seared over embers and rested before it is carved at the pass.",
    price: null,
    image: photo("1558030006-450675393462", "Seared beef, rested and sliced on a dark board", 1.5),
  },
  {
    index: "04",
    name: "Red Fruits",
    description: "Red fruits at their ripest, layered with cream and a little restraint.",
    price: null,
    image: photo("1565958011703-44f9829ba187", "A layered cake topped with fresh raspberries on a dark plate", 0.75),
  },
];

/* ── The experience ───────────────────────────────────────────────────── */

export const experience = [
  {
    key: "ambience",
    label: "Ambience",
    title: "Light, kept low.",
    text: "Candlelight and warm brass. Music you notice only when it stops. The room is designed to slow the evening down.",
    image: photo("1578474846511-04ba529f0b88", "A dark, quiet dining room with tables laid in white linen", 0.75),
  },
  {
    key: "interior",
    label: "Interior",
    title: "A room with a point of view.",
    text: "Dark timber, soft stone and generous space between tables — so that conversation stays where it belongs.",
    image: photo("1484659619207-9165d119dafe", "Overhead view of dark tables and pendant lights in the dining room", 1.5),
  },
  {
    key: "hospitality",
    label: "Hospitality",
    title: "Anticipation, not attention.",
    text: "Our team reads the table rather than the script. A glass refilled before it is noticed, a pause respected.",
    image: photo("1502364271109-0a9a75a2a9df", "A chef preparing a course at the counter in front of guests", 1.5),
  },
  {
    key: "private",
    label: "Private Dining",
    title: "The table, entirely yours.",
    text: "A private room for gatherings of up to [00] guests, with a menu composed for the occasion. Details on request.", // PLACEHOLDER capacity
    image: photo("1550966871-3ed3cdb5ed0c", "A private dining room with white linen and tall windows", 1.5),
  },
  {
    key: "occasions",
    label: "Occasions",
    title: "Evenings worth remembering.",
    text: "Anniversaries, proposals, milestones. Tell us what matters and we will quietly arrange the rest.",
    image: photo("1510812431401-41d2bd2722f3", "Guests raising glasses of red wine in a toast", 1.5),
  },
];

/* ── Menu (PLACEHOLDER — no real dishes or prices) ────────────────────── */

export type MenuItem = { name: string; description: string; price: string | null; note?: string };
export type MenuCategory = { id: string; label: string; intro: string; items: MenuItem[] };

const placeholderItems = (prefix: string, count: number): MenuItem[] =>
  Array.from({ length: count }, (_, i) => ({
    name: `${prefix} ${["I", "II", "III", "IV", "V"][i]}`,
    description: "Description to follow with the season's menu",
    price: null,
  }));

export const menu: MenuCategory[] = [
  {
    id: "starters",
    label: "Starters",
    intro: "Light, bright openings that set the tone for the evening.",
    items: placeholderItems("Starter", 3),
  },
  {
    id: "mains",
    label: "Main Courses",
    intro: "The heart of the meal — built around the best of the day's market.",
    items: placeholderItems("Main Course", 4),
  },
  {
    id: "specials",
    label: "Chef's Specials",
    intro: "Dishes that appear briefly, when an ingredient is at its peak.",
    items: placeholderItems("Special", 2).map((item) => ({ ...item, note: "Availability changes daily" })),
  },
  {
    id: "desserts",
    label: "Desserts",
    intro: "A considered ending. Pastry made in-house each afternoon.",
    items: placeholderItems("Dessert", 3),
  },
  {
    id: "beverages",
    label: "Beverages",
    intro: "Wines chosen to accompany the kitchen, and a short list of classic cocktails.",
    items: [
      { name: "Wine by the Glass", description: "Selection changes with the menu", price: null },
      { name: "Wine Pairing", description: "Matched to each course of the tasting menu", price: null },
      { name: "House Cocktails", description: "A short list of classics, made with care", price: null },
      { name: "Non-Alcoholic Pairing", description: "House ferments, infusions and pressings", price: null },
    ],
  },
];


/* ── Gallery ──────────────────────────────────────────────────────────── */

export const gallery: (Photo & { caption: string })[] = [
  { ...photo("1577219491135-ce391730fb2c", "A chef plating under copper heat lamps at the pass", 0.75), caption: "The pass" },
  { ...photo("1519708227418-c8fd9a32b7a2", "Seared salmon on a dark plate with vegetables", 1.5), caption: "Seared" },
  { ...photo("1615361200141-f45040f367be", "A single piece of nigiri held in chopsticks against black", 0.75), caption: "Precision" },
  { ...photo("1590577976322-3d2d6e2130d5", "A chef finishing a row of plates at the kitchen counter", 1.5), caption: "Service" },
  { ...photo("1514362545857-3bc16c4c7d1b", "A stirred cocktail garnished with dried citrus, lit from above", 1.5), caption: "The bar" },
  { ...photo("1551024506-0bccd828d307", "Warm caramel poured over a plated dessert", 0.75), caption: "Finale" },
  { ...photo("1546241072-48010ad2862c", "Olive oil drizzled over charred greens", 0.75), caption: "Oil & fire" },
];

/* ── Testimonials (PLACEHOLDER — replace with verified reviews only) ──── */

export const testimonials = [
  {
    quote:
      "Reserved for a verified guest review. Replace this text with a genuine quotation, used with the guest's permission.",
    author: "Guest Name",
    source: "Source / Date",
  },
  {
    quote:
      "Reserved for a verified press quotation. Include the publication name and date exactly as published.",
    author: "Critic Name",
    source: "Publication / Date",
  },
  {
    quote:
      "Reserved for a third verified review. Short, specific quotes about a moment or a dish read best here.",
    author: "Guest Name",
    source: "Source / Date",
  },
];

/* ── Reservations ─────────────────────────────────────────────────────── */

export const reservations = {
  maxGuestsOnline: 8,
  largePartyNote: "For parties of more than eight, please call us directly.",
  policies: [
    "Tables are held for fifteen minutes past the reserved time.", // PLACEHOLDER
    "Please share dietary requirements when booking.",
    "Smart attire is kindly requested.", // PLACEHOLDER
  ],
};
