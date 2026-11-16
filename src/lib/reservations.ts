import { contact, hours, reservations } from "@/content/site";

export type ReservationRequest = {
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  guests: string;
  name: string;
  email: string;
  phone: string;
  occasion: string;
  notes: string;
};

export type FieldErrors = Partial<Record<keyof ReservationRequest, string>>;

export const emptyRequest: ReservationRequest = {
  date: "",
  time: "",
  guests: "2",
  name: "",
  email: "",
  phone: "",
  occasion: "",
  notes: "",
};

const BOOKING_WINDOW_DAYS = 90;

export function toISODate(d: Date) {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

/** Parse YYYY-MM-DD as a local date (avoids UTC off-by-one). */
export function parseISODate(v: string) {
  const [y, m, d] = v.split("-").map(Number);
  return new Date(y, (m ?? 1) - 1, d ?? 1);
}

export function maxBookingDate(now = new Date()) {
  const d = new Date(now);
  d.setDate(d.getDate() + BOOKING_WINDOW_DAYS);
  return toISODate(d);
}

/** Available time slots for a given date, excluding times already passed today. */
export function slotsFor(dateISO: string, now = new Date()) {
  if (!dateISO) return [];
  const date = parseISODate(dateISO);
  const day = hours.find((h) => h.day === date.getDay());
  if (!day) return [];
  if (dateISO !== toISODate(now)) return day.slots;
  const cutoff = now.getHours() * 60 + now.getMinutes() + 60; // one hour's notice
  return day.slots.filter((s) => {
    const [h, m] = s.split(":").map(Number);
    return h * 60 + m >= cutoff;
  });
}

export function validate(r: ReservationRequest, now = new Date()): FieldErrors {
  const e: FieldErrors = {};
  const today = toISODate(now);

  if (!r.date) e.date = "Please choose a date.";
  else if (r.date < today) e.date = "That date has already passed.";
  else if (r.date > maxBookingDate(now)) e.date = `We take bookings up to ${BOOKING_WINDOW_DAYS} days ahead.`;
  else if (slotsFor(r.date, now).length === 0) {
    const isToday = r.date === today;
    e.date = isToday ? "No more tables can be requested online for today." : "We are closed on that day — please choose another date.";
  }

  if (!r.time) e.time = "Please choose a time.";
  else if (r.date && !slotsFor(r.date, now).includes(r.time)) e.time = "That time is not available on the chosen date.";

  const guests = Number(r.guests);
  if (!Number.isInteger(guests) || guests < 1) e.guests = "Please choose the number of guests.";
  else if (guests > reservations.maxGuestsOnline) e.guests = reservations.largePartyNote;

  if (r.name.trim().length < 2) e.name = "Please enter your full name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(r.email.trim())) e.email = "Please enter a valid email address.";
  const digits = r.phone.replace(/\D/g, "");
  if (!/^[+\d\s().-]+$/.test(r.phone.trim()) || digits.length < 7 || digits.length > 15)
    e.phone = "Please enter a valid phone number, including country code.";
  if (r.notes.length > 500) e.notes = "Please keep notes under 500 characters.";

  return e;
}

export function formatDateLong(dateISO: string) {
  return parseISODate(dateISO).toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
}

/** Pre-filled email so the guest can send their request directly. */
export function mailtoFor(r: ReservationRequest) {
  const subject = `Reservation request — ${formatDateLong(r.date)}, ${r.time}, ${r.guests} guests`;
  const body = [
    `Name: ${r.name}`,
    `Date: ${formatDateLong(r.date)}`,
    `Time: ${r.time}`,
    `Guests: ${r.guests}`,
    `Phone: ${r.phone}`,
    `Email: ${r.email}`,
    r.occasion && `Occasion: ${r.occasion}`,
    r.notes && `Notes: ${r.notes}`,
  ]
    .filter(Boolean)
    .join("\n");
  return `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export type SubmitResult = { status: "confirmed"; reference: string } | { status: "pending-manual" };

/**
 * Submit a reservation request.
 *
 * ⚠️ No booking backend is connected yet. This resolves with
 * `pending-manual`, and the UI tells the guest plainly that their table
 * is NOT confirmed and offers email/phone to complete the booking.
 *
 * To connect a real system (OpenTable, SevenRooms, Resy, or your own API),
 * POST `request` to it here and return `{ status: "confirmed", reference }`
 * only when the provider has actually confirmed the booking.
 */
export async function submitReservation(request: ReservationRequest): Promise<SubmitResult> {
  void request;
  await new Promise((r) => setTimeout(r, 900));
  return { status: "pending-manual" };
}
