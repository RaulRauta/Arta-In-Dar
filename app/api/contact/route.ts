import nodemailer from "nodemailer";

export const runtime = "nodejs";

const CONTACT_TO = process.env.CONTACT_TO_EMAIL || "artaindar7@yahoo.com";

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
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.mail.yahoo.com",
    port: Number(process.env.SMTP_PORT || 465),
    secure: process.env.SMTP_SECURE !== "false",
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
    host: process.env.SMTP_HOST || "smtp.mail.yahoo.com",
    port: process.env.SMTP_PORT || "465",
    secure: process.env.SMTP_SECURE || "true",
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
    const result = await transporter.sendMail({
      from: `"Arta in dar" <${process.env.SMTP_USER}>`,
      sender: process.env.SMTP_USER,
      to: CONTACT_TO,
      replyTo: email,
      subject: `Mesaj site Arta in dar - ${reason || "Contact"}`,
      envelope: {
        from: process.env.SMTP_USER,
        to: CONTACT_TO,
      },
      text: [
        "Mesaj nou primit din formularul site-ului Arta in dar.",
        "",
        `Nume: ${name}`,
        `Email: ${email}`,
        `Telefon: ${phone || "-"}`,
        `Motiv: ${reason || "Contact site"}`,
        "",
        message,
      ].join("\n"),
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
