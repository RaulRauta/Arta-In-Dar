"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowUpRight } from "@/components/ui/icons";
import { contactDetails, contactReasons } from "@/lib/contact-data";

type FormState = "idle" | "sending" | "success" | "fallback" | "error";
type ContactReason = (typeof contactReasons)[number];

export function ContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const [isActive, setIsActive] = useState(false);
  const [isReasonOpen, setIsReasonOpen] = useState(false);
  const [selectedReason, setSelectedReason] = useState<ContactReason>(
    contactReasons[0],
  );
  const [message, setMessage] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const [formSnapshot, setFormSnapshot] = useState<Record<string, string> | null>(
    null,
  );

  const mailtoHref = useMemo(() => {
    const data = formSnapshot ?? {};
    const subject = encodeURIComponent(
      `Mesaj site Arta în dar${data.reason ? ` · ${data.reason}` : ""}`,
    );
    const body = encodeURIComponent(
      [
        `Nume: ${data.name ?? ""}`,
        `Email: ${data.email ?? ""}`,
        `Telefon: ${data.phone ?? ""}`,
        `Motiv: ${data.reason ?? ""}`,
        "",
        data.message ?? "",
      ].join("\n"),
    );

    return `mailto:${contactDetails.email}?subject=${subject}&body=${body}`;
  }, [formSnapshot]);

  function handlePhoneInput(event: React.FormEvent<HTMLInputElement>) {
    const input = event.currentTarget;
    input.value = input.value.replace(/[^\d+\s().-]/g, "");
  }

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (!formRef.current?.contains(event.target as Node)) {
        setIsActive(false);
        setIsReasonOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const snapshot = Object.fromEntries(formData.entries()) as Record<
      string,
      string
    >;
    setFormSnapshot(snapshot);
    setState("sending");
    setMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });
      const payload = (await response.json()) as {
        ok?: boolean;
        fallback?: boolean;
        message?: string;
      };

      if (response.ok && payload.ok) {
        setState(payload.fallback ? "fallback" : "success");
        setMessage(payload.message ?? "Mesajul a fost pregătit.");
        if (!payload.fallback) {
          form.reset();
          setSelectedReason(contactReasons[0]);
          setIsReasonOpen(false);
        }
        return;
      }

      setState("error");
      setMessage(
        payload.message ??
          "Mesajul nu a putut fi trimis. Încearcă prin email direct.",
      );
    } catch {
      setState("fallback");
      setMessage(
        "Conexiunea a ezitat. Poți trimite același mesaj prin email direct.",
      );
    }
  }

  return (
    <form
      ref={formRef}
      className={`contact-form${isActive ? " contact-form--active" : ""}`}
      onFocus={() => setIsActive(true)}
      onPointerDown={() => setIsActive(true)}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="contact-form__honeypot"
      />

      <label>
        <span>Nume</span>
        <input
          name="name"
          type="text"
          required
          minLength={2}
          placeholder="Cum te numești?"
        />
      </label>

      <div className="contact-form__row">
        <label>
          <span>Email</span>
          <input
            name="email"
            type="email"
            required
            placeholder="email@exemplu.ro"
          />
        </label>
        <label>
          <span>Telefon</span>
          <input
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            pattern="(?:0[237][0-9]{8}|\+40[237][0-9]{8})"
            title="Introdu un număr românesc valid: 07XXXXXXXX, 02XXXXXXXX, 03XXXXXXXX sau +407XXXXXXXX."
            maxLength={12}
            onInput={handlePhoneInput}
            placeholder="07XXXXXXXX"
          />
        </label>
      </div>

      <div className="contact-reason-field">
        <span>Motiv</span>
        <input type="hidden" name="reason" value={selectedReason} />
        <button
          type="button"
          className="contact-reason-trigger"
          aria-haspopup="listbox"
          aria-expanded={isReasonOpen}
          onClick={() => setIsReasonOpen((current) => !current)}
        >
          <span>{selectedReason}</span>
          <i aria-hidden="true">⌄</i>
        </button>

        <div
          className={`contact-reason-menu${
            isReasonOpen ? " contact-reason-menu--open" : ""
          }`}
          role="listbox"
          aria-label="Alege motivul mesajului"
        >
          {contactReasons.map((reason) => (
            <button
              type="button"
              key={reason}
              role="option"
              aria-selected={reason === selectedReason}
              onClick={() => {
                setSelectedReason(reason);
                setIsReasonOpen(false);
              }}
            >
              {reason}
            </button>
          ))}
        </div>
      </div>

      <label>
        <span>Mesaj</span>
        <textarea
          name="message"
          required
          minLength={12}
          rows={6}
          placeholder="Scrie-ne ce ai în minte..."
        />
      </label>

      <button type="submit" disabled={state === "sending"}>
        {state === "sending" ? "Se așază cerneala..." : "Trimite mesajul"}{" "}
        <ArrowUpRight className="size-4" />
      </button>

      {message ? (
        <p className={`contact-form__status contact-form__status--${state}`}>
          {message}
          {state === "fallback" ? (
            <>
              {" "}
              <a href={mailtoHref}>Deschide emailul pregătit</a>
            </>
          ) : null}
        </p>
      ) : null}
    </form>
  );
}
