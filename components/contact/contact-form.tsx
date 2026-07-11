"use client";

import { useMemo, useState } from "react";
import { ArrowUpRight } from "@/components/ui/icons";
import { contactDetails, contactReasons } from "@/lib/contact-data";

type FormState = "idle" | "sending" | "success" | "fallback" | "error";

export function ContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const [message, setMessage] = useState("");
  const [formSnapshot, setFormSnapshot] = useState<Record<string, string> | null>(null);

  const mailtoHref = useMemo(() => {
    const data = formSnapshot ?? {};
    const subject = encodeURIComponent(`Mesaj site Arta în dar${data.reason ? ` · ${data.reason}` : ""}`);
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

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const snapshot = Object.fromEntries(formData.entries()) as Record<string, string>;
    setFormSnapshot(snapshot);
    setState("sending");
    setMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });
      const payload = (await response.json()) as { ok?: boolean; fallback?: boolean; message?: string };

      if (response.ok && payload.ok) {
        setState(payload.fallback ? "fallback" : "success");
        setMessage(payload.message ?? "Mesajul a fost pregătit.");
        if (!payload.fallback) form.reset();
        return;
      }

      setState("error");
      setMessage(payload.message ?? "Mesajul nu a putut fi trimis. Încearcă prin email direct.");
    } catch {
      setState("fallback");
      setMessage("Conexiunea a ezitat. Poți trimite același mesaj prin email direct.");
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" className="contact-form__honeypot" />

      <label>
        <span>Nume</span>
        <input name="name" type="text" required minLength={2} placeholder="Cum te numești?" />
      </label>

      <div className="contact-form__row">
        <label>
          <span>Email</span>
          <input name="email" type="email" required placeholder="email@exemplu.ro" />
        </label>
        <label>
          <span>Telefon</span>
          <input name="phone" type="tel" placeholder="Opțional" />
        </label>
      </div>

      <label>
        <span>Motiv</span>
        <select name="reason" defaultValue={contactReasons[0]}>
          {contactReasons.map((reason) => (
            <option key={reason} value={reason}>
              {reason}
            </option>
          ))}
        </select>
      </label>

      <label>
        <span>Mesaj</span>
        <textarea name="message" required minLength={12} rows={6} placeholder="Scrie-ne ce ai în minte..." />
      </label>

      <button type="submit" disabled={state === "sending"}>
        {state === "sending" ? "Se așază cerneala..." : "Trimite mesajul"} <ArrowUpRight className="size-4" />
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
