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

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
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

  const transporter = getTransporter();

  console.info("Contact form SMTP config", {
    hasUser: Boolean(process.env.SMTP_USER),
    hasPass: Boolean(process.env.SMTP_PASS),
    host: envValue("SMTP_HOST", "smtp.mail.yahoo.com"),
    port: envValue("SMTP_PORT", "465"),
    secure: envValue("SMTP_SECURE", "true"),
    to: CONTACT_TO,
  });

  if (!transporter) {
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

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safePhone = escapeHtml(phone || "-");
  const safeReason = escapeHtml(reason || "Contact site");
  const safeMessage = escapeHtml(message).replaceAll("\n", "<br />");

  try {
    const smtpUser = envValue("SMTP_USER");
    const plainText = [
      "Mesaj nou primit din formularul site-ului Arta in dar.",
      "",
      `Nume: ${name}`,
      `Email: ${email}`,
      `Telefon: ${phone || "-"}`,
      `Motiv: ${reason || "Contact site"}`,
      "",
      message,
    ].join("\n");

    const result = await transporter.sendMail({
      from: `"Arta in dar" <${smtpUser}>`,
      sender: smtpUser,
      to: CONTACT_TO,
      replyTo: email,
      subject: `Mesaj site Arta in dar - ${reason || "Contact"}`,
      envelope: {
        from: smtpUser,
        to: CONTACT_TO,
      },
      text: plainText,
      html: `
        <div style="font-family:Arial,sans-serif;line-height:1.6;color:#2D241F">
          <h2 style="margin:0 0 16px">Mesaj nou din formularul Arta in dar</h2>
          <p><strong>Nume:</strong> ${safeName}</p>
          <p><strong>Email:</strong> ${safeEmail}</p>
          <p><strong>Telefon:</strong> ${safePhone}</p>
          <p><strong>Motiv:</strong> ${safeReason}</p>
          <hr style="border:none;border-top:1px solid #ddd;margin:24px 0" />
          <p>${safeMessage}</p>
        </div>
      `,
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
    const smtpUser = envValue("SMTP_USER");
    const responseCode =
      typeof error === "object" && error && "responseCode" in error
        ? Number(error.responseCode)
        : null;

    if (responseCode === 550 && transporter && smtpUser) {
      try {
        console.warn("Contact form normal email failed with 550. Trying plain-text fallback.");

        const fallbackResult = await transporter.sendMail({
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

        console.info("Contact form fallback email sent", {
          messageId: fallbackResult.messageId,
          accepted: fallbackResult.accepted,
          rejected: fallbackResult.rejected,
        });

        return Response.json({
          ok: true,
          message: "Mesajul a fost trimis. Mulțumim!",
        });
      } catch (fallbackError) {
        console.error("Contact form fallback email failed", fallbackError);
      }
    }

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
