"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useId, useRef, useState, type ReactNode } from "react";
import { contact, hoursSummary, reservations } from "@/content/site";
import {
  emptyRequest,
  formatDateLong,
  mailtoFor,
  maxBookingDate,
  slotsFor,
  submitReservation,
  validate,
  type FieldErrors,
  type ReservationRequest,
} from "@/lib/reservations";
import { useTodayISO } from "@/lib/hooks";
import { ease } from "@/lib/motion";
import { SectionMarker } from "@/components/ui/SectionMarker";
import { SplitLines } from "@/components/ui/SplitLines";
import { Reveal } from "@/components/ui/Reveal";
import { Button, ButtonLink } from "@/components/ui/Button";

const control =
  "peer w-full appearance-none rounded-none border-0 border-b border-ivory/25 bg-transparent py-3 text-[1.05rem] text-ivory placeholder:text-ivory/30 transition-colors duration-500 focus:border-gold focus:outline-none aria-[invalid=true]:border-[#e7a3a3] disabled:cursor-not-allowed disabled:opacity-40 [&>option]:bg-ink [&>option]:text-ivory";

function Field({
  label,
  htmlFor,
  error,
  hint,
  optional,
  className = "",
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  hint?: string;
  optional?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={`relative ${className}`}>
      <label htmlFor={htmlFor} className="eyebrow mb-1 flex justify-between text-ivory/55">
        {label}
        {optional && <span className="text-ivory/30 normal-case tracking-normal">Optional</span>}
      </label>
      {children}
      <AnimatePresence initial={false}>
        {error ? (
          <motion.p
            id={`${htmlFor}-error`}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-2 text-xs text-[#f0b8b8]"
          >
            {error}
          </motion.p>
        ) : hint ? (
          <p id={`${htmlFor}-hint`} className="mt-2 text-xs text-ivory/40">
            {hint}
          </p>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function SelectChevron() {
  return <ChevronDown aria-hidden size={16} strokeWidth={1.25} className="pointer-events-none absolute right-0 bottom-4 text-ivory/50" />;
}

type Status = "idle" | "submitting" | "done" | "error";

export function Reservation() {
  const uid = useId();
  const id = (k: string) => `${uid}-${k}`;
  const today = useTodayISO();
  const formRef = useRef<HTMLFormElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const [values, setValues] = useState<ReservationRequest>(emptyRequest);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof ReservationRequest, boolean>>>({});
  const [status, setStatus] = useState<Status>("idle");

  // only evaluated client-side, once a date has been chosen
  const slots = values.date ? slotsFor(values.date) : [];

  const set = (k: keyof ReservationRequest, v: string) => {
    const next = { ...values, [k]: v };
    // a new date can invalidate the chosen time
    if (k === "date" && next.time && !slotsFor(v).includes(next.time)) next.time = "";
    setValues(next);
    if (touched[k] || errors[k]) setErrors(validate(next));
  };
  const blur = (k: keyof ReservationRequest) => {
    setTouched((t) => ({ ...t, [k]: true }));
    setErrors(validate(values));
  };
  const err = (k: keyof ReservationRequest) => (touched[k] ? errors[k] : undefined);
  const a11y = (k: keyof ReservationRequest) => ({
    "aria-invalid": err(k) ? true : undefined,
    "aria-describedby": err(k) ? `${id(k)}-error` : undefined,
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    setTouched(Object.fromEntries(Object.keys(values).map((k) => [k, true])));
    if (Object.keys(found).length) {
      const first = Object.keys(found)[0];
      formRef.current?.querySelector<HTMLElement>(`#${CSS.escape(id(first))}`)?.focus();
      return;
    }
    setStatus("submitting");
    try {
      await submitReservation(values);
      setStatus("done");
      panelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="reserve" aria-labelledby="reserve-title" className="grain relative overflow-hidden bg-wine py-28 text-ivory md:py-40">

      <div className="container-edge relative grid gap-16 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <SectionMarker label="Reservations" tone="light" className="mb-12" />
          <SplitLines
            id="reserve-title"
            className="font-serif text-headline font-light tracking-[-0.015em]"
            lines={["Reserve", "a table"]}
          />
          <Reveal delay={0.15} className="mt-10 max-w-sm space-y-10">
            <p className="prose-serif text-ivory/75">
              Share a few details and our team will be in touch to confirm your table. For same-day requests, please call us.
            </p>

            <dl className="space-y-3 text-sm">
              {hoursSummary.map((h) => (
                <div key={h.days} className="flex justify-between gap-6 border-b border-ivory/10 pb-3">
                  <dt className="text-ivory/55">{h.days}</dt>
                  <dd className="tabular-nums">{h.time}</dd>
                </div>
              ))}
            </dl>

            <div>
              <p className="eyebrow mb-3 text-gold">By telephone</p>
              <a href={contact.phoneHref} className="font-serif text-3xl link-line">
                {contact.phone}
              </a>
            </div>

            <ul className="space-y-2 text-xs leading-relaxed text-ivory/45">
              {reservations.policies.map((p) => (
                <li key={p}>— {p}</li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div ref={panelRef} className="scroll-mt-24 lg:col-span-6 lg:col-start-7">
          <Reveal y={36} className="relative border border-ivory/12 bg-ink/25 p-6 backdrop-blur-[2px] sm:p-10 md:p-14">
            <AnimatePresence mode="wait" initial={false}>
              {status !== "done" ? (
                <motion.form
                  key="form"
                  ref={formRef}
                  noValidate
                  onSubmit={onSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.5, ease }}
                  aria-describedby={id("legend")}
                >
                  <p id={id("legend")} className="mb-10 font-serif text-2xl italic text-ivory/90">
                    Tell us about your evening
                  </p>

                  <fieldset className="grid gap-x-8 gap-y-9 sm:grid-cols-3">
                    <legend className="sr-only">Date, time and party size</legend>
                    <Field label="Date" htmlFor={id("date")} error={err("date")}>
                      <input
                        id={id("date")}
                        type="date"
                        required
                        min={today || undefined}
                        max={today ? maxBookingDate() : undefined}
                        value={values.date}
                        onChange={(e) => set("date", e.target.value)}
                        onBlur={() => blur("date")}
                        className={`${control} scheme-dark`}
                        {...a11y("date")}
                      />
                    </Field>
                    <Field label="Time" htmlFor={id("time")} error={err("time")}>
                      <select
                        id={id("time")}
                        required
                        value={values.time}
                        disabled={!values.date || slots.length === 0}
                        onChange={(e) => set("time", e.target.value)}
                        onBlur={() => blur("time")}
                        className={control}
                        {...a11y("time")}
                      >
                        <option value="">{values.date ? (slots.length ? "Select" : "Unavailable") : "Choose date"}</option>
                        {slots.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                      <SelectChevron />
                    </Field>
                    <Field label="Guests" htmlFor={id("guests")} error={err("guests")}>
                      <select
                        id={id("guests")}
                        required
                        value={values.guests}
                        onChange={(e) => set("guests", e.target.value)}
                        onBlur={() => blur("guests")}
                        className={control}
                        {...a11y("guests")}
                      >
                        {Array.from({ length: reservations.maxGuestsOnline }, (_, n) => (
                          <option key={n + 1} value={n + 1}>
                            {n + 1} {n === 0 ? "guest" : "guests"}
                          </option>
                        ))}
                      </select>
                      <SelectChevron />
                    </Field>
                  </fieldset>

                  <fieldset className="mt-9 grid gap-x-8 gap-y-9 sm:grid-cols-2">
                    <legend className="sr-only">Your details</legend>
                    <Field label="Full name" htmlFor={id("name")} error={err("name")} className="sm:col-span-2">
                      <input
                        id={id("name")}
                        type="text"
                        autoComplete="name"
                        required
                        value={values.name}
                        onChange={(e) => set("name", e.target.value)}
                        onBlur={() => blur("name")}
                        className={control}
                        {...a11y("name")}
                      />
                    </Field>
                    <Field label="Email" htmlFor={id("email")} error={err("email")}>
                      <input
                        id={id("email")}
                        type="email"
                        inputMode="email"
                        autoComplete="email"
                        required
                        value={values.email}
                        onChange={(e) => set("email", e.target.value)}
                        onBlur={() => blur("email")}
                        className={control}
                        {...a11y("email")}
                      />
                    </Field>
                    <Field label="Phone" htmlFor={id("phone")} error={err("phone")}>
                      <input
                        id={id("phone")}
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        required
                        value={values.phone}
                        onChange={(e) => set("phone", e.target.value)}
                        onBlur={() => blur("phone")}
                        className={control}
                        {...a11y("phone")}
                      />
                    </Field>
                    <Field label="Occasion" htmlFor={id("occasion")} optional>
                      <select id={id("occasion")} value={values.occasion} onChange={(e) => set("occasion", e.target.value)} className={control}>
                        <option value="">None</option>
                        <option>Birthday</option>
                        <option>Anniversary</option>
                        <option>Celebration</option>
                        <option>Business dinner</option>
                      </select>
                      <SelectChevron />
                    </Field>
                    <Field label="Requests" htmlFor={id("notes")} error={err("notes")} optional>
                      <input
                        id={id("notes")}
                        type="text"
                        maxLength={500}
                        value={values.notes}
                        onChange={(e) => set("notes", e.target.value)}
                        onBlur={() => blur("notes")}
                        className={control}
                        {...a11y("notes")}
                      />
                    </Field>
                  </fieldset>

                  <div className="mt-12 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                    <p className="max-w-[16rem] text-xs leading-relaxed text-ivory/45">{reservations.largePartyNote}</p>
                    <Button type="submit" variant="gold" arrow disabled={status === "submitting"} aria-busy={status === "submitting"}>
                      {status === "submitting" ? "Sending…" : "Request Table"}
                    </Button>
                  </div>
                  {status === "error" && (
                    <p role="alert" className="mt-6 text-sm text-[#f0b8b8]">
                      Something went wrong. Please try again, or call us on {contact.phone}.
                    </p>
                  )}
                </motion.form>
              ) : (
                <motion.div
                  key="done"
                  role="status"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease }}
                >
                  <p className="eyebrow mb-6 text-gold">Request prepared — not yet confirmed</p>
                  <h3 className="font-serif text-[2.6rem] leading-[1.05] font-light">
                    Thank you, {values.name.split(" ")[0]}.
                  </h3>
                  <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-6 border-y border-ivory/12 py-8 text-sm">
                    <div className="col-span-2">
                      <dt className="eyebrow mb-1 text-ivory/45">Date</dt>
                      <dd className="font-serif text-xl">{formatDateLong(values.date)}</dd>
                    </div>
                    <div>
                      <dt className="eyebrow mb-1 text-ivory/45">Time</dt>
                      <dd className="font-serif text-xl">{values.time}</dd>
                    </div>
                    <div>
                      <dt className="eyebrow mb-1 text-ivory/45">Guests</dt>
                      <dd className="font-serif text-xl">{values.guests}</dd>
                    </div>
                  </dl>
                  <p className="mt-8 text-sm leading-[1.85] text-ivory/70">
                    Online booking is not yet connected, so <strong className="font-medium text-ivory">your table has not been reserved</strong>.
                    To complete your request, send it to us by email or call — we&apos;ll confirm availability personally.
                  </p>
                  <div className="mt-10 flex flex-wrap gap-4">
                    <ButtonLink href={mailtoFor(values)} variant="gold" arrow>
                      Send by Email
                    </ButtonLink>
                    <ButtonLink href={contact.phoneHref} variant="ghost-light">
                      Call {contact.phone}
                    </ButtonLink>
                  </div>
                  <button type="button" onClick={() => setStatus("idle")} className="eyebrow link-line mt-10 text-ivory/60 hover:text-ivory">
                    Edit details
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
