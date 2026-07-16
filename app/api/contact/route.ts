import nodemailer from "nodemailer";

export const runtime = "nodejs";

function envValue(name: string, fallback = "") {
  return (process.env[name] || fallback).trim().replace(/^["']|["']$/g, "");
}

const CONTACT_TO = envValue("CONTACT_TO_EMAIL", "artaindar7@yahoo.com");

function clean(value: FormDataEntryValue | null) {
  return String(value ?? "").trim();
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isPhone(value: string) {
  return !value || /^[0-9+().\s-]+$/.test(value);
}

function getTransporter() {
  const user = envValue("SMTP_USER");
  const pass = envValue("SMTP_PASS").replace(/\s+/g, "");

  if (!user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host: envValue("SMTP_HOST", "smtp.mail.yahoo.com"),
    port: Number(envValue("SMTP_PORT", "465")),
    secure: envValue("SMTP_SECURE", "true") !== "false",
    auth: { user, pass },
    connectionTimeout: 15000,
    greetingTimeout: 15000,
    socketTimeout: 20000,
  });
}

export async function POST(request: Request) {
  console.info("Contact form request received");

  const formData = await request.formData();
  const trap = clean(formData.get("company"));

  if (trap) {
    return Response.json({ ok: true, message: "Mesaj primit." });
  }

  const name = clean(formData.get("name"));
  const email = clean(formData.get("email"));
  const phone = clean(formData.get("phone"));
  const reason = clean(formData.get("reason"));
  const message = clean(formData.get("message"));

  if (name.length < 2 || !isEmail(email) || message.length < 12) {
    return Response.json(
      {
        ok: false,
        message:
          "Completează numele, un email valid și un mesaj de cel puțin 12 caractere.",
      },
      { status: 400 },
    );
  }

  if (!isPhone(phone)) {
    return Response.json(
      {
        ok: false,
        message: "Telefonul poate conține doar cifre și semne de telefon.",
      },
      { status: 400 },
    );
  }

  const transporter = getTransporter();
  const smtpUser = envValue("SMTP_USER");

  console.info("Contact form SMTP config", {
    hasUser: Boolean(smtpUser),
    hasPass: Boolean(envValue("SMTP_PASS")),
    host: envValue("SMTP_HOST", "smtp.mail.yahoo.com"),
    port: envValue("SMTP_PORT", "465"),
    secure: envValue("SMTP_SECURE", "true"),
    to: CONTACT_TO,
  });

  if (!transporter || !smtpUser) {
    console.warn("Contact form SMTP is not configured.");
    return Response.json(
      {
        ok: false,
        message:
          "Mesajul nu a putut fi trimis momentan. Te rugăm să încerci din nou.",
      },
      { status: 500 },
    );
  }

  try {
    const result = await transporter.sendMail({
      from: smtpUser,
      to: CONTACT_TO,
      subject: "Contact site Arta in dar",
      envelope: {
        from: smtpUser,
        to: CONTACT_TO,
      },
      text: [
        "Mesaj nou primit din formularul site-ului.",
        "",
        `Nume: ${name}`,
        `Email: ${email}`,
        `Telefon: ${phone || "-"}`,
        `Motiv: ${reason || "Contact site"}`,
        "",
        message,
      ].join("\n"),
    });

    console.info("Contact form email sent", {
      messageId: result.messageId,
      accepted: result.accepted,
      rejected: result.rejected,
    });

    return Response.json({
      ok: true,
      message: "Mesajul a fost trimis. Mulțumim!",
    });
  } catch (error) {
    console.error("Contact form email failed", error);
    return Response.json(
      {
        ok: false,
        message:
          "Mesajul nu a putut fi trimis momentan. Te rugăm să încerci din nou.",
      },
      { status: 500 },
    );
  }
}
