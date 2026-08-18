import nodemailer from "nodemailer";
import { contactReasons } from "@/lib/contact-data";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 20 * 1024;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const RATE_LIMIT_BUCKETS_MAX = 1_000;
const CONTACT_TO = envValue("CONTACT_TO_EMAIL", "artaindar7@yahoo.com");
const ALLOWED_REASONS = new Set<string>(contactReasons);

const rateLimitBuckets = new Map<string, { count: number; resetAt: number }>();

function envValue(name: string, fallback = "") {
  return (process.env[name] || fallback).trim().replace(/^["']|["']$/g, "");
}

function clean(value: FormDataEntryValue | null) {
  return String(value ?? "")
    .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, "")
    .trim();
}

function singleLine(value: string) {
  return value.replace(/[\r\n]+/g, " ").trim();
}

function within(value: string, min: number, max: number) {
  return value.length >= min && value.length <= max;
}

function isEmail(value: string) {
  return (
    value.length <= 254 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) &&
    !/[\r\n]/.test(value)
  );
}

function isPhone(value: string) {
  const compact = value.replace(/[\s().-]/g, "");
  return (
    value.length <= 16 &&
    (!compact || /^(0[237][0-9]{8}|\+40[237][0-9]{8})$/.test(compact))
  );
}

function isSupportedContentType(request: Request) {
  const contentType = request.headers.get("content-type")?.toLowerCase() ?? "";

  return (
    contentType.startsWith("multipart/form-data") ||
    contentType.startsWith("application/x-www-form-urlencoded")
  );
}

function json(
  body: { ok: boolean; message: string },
  init: ResponseInit = {},
) {
  const headers = new Headers(init.headers);
  headers.set("Cache-Control", "no-store");
  return Response.json(body, { ...init, headers });
}

function getAllowedOrigins(request: Request) {
  const url = new URL(request.url);
  const configuredOrigins = [
    envValue("NEXT_PUBLIC_SITE_URL"),
    envValue("SITE_URL"),
    envValue("VERCEL_URL") ? `https://${envValue("VERCEL_URL")}` : "",
    "https://arta-in-dar.vercel.app",
    process.env.NODE_ENV !== "production" ? `${url.protocol}//${url.host}` : "",
  ];

  return new Set(
    configuredOrigins
      .filter(Boolean)
      .map((origin) => {
        try {
          return new URL(origin).origin;
        } catch {
          return "";
        }
      })
      .filter(Boolean),
  );
}

function hasAllowedOrigin(request: Request) {
  const allowedOrigins = getAllowedOrigins(request);
  const origin = request.headers.get("origin");
  const referer = request.headers.get("referer");

  if (origin) {
    try {
      return allowedOrigins.has(new URL(origin).origin);
    } catch {
      return false;
    }
  }

  if (referer) {
    try {
      return allowedOrigins.has(new URL(referer).origin);
    } catch {
      return false;
    }
  }

  return false;
}

function getClientKey(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");

  return (
    forwardedFor
      ?.split(",")
      .map((part) => part.trim())
      .find(Boolean) ||
    realIp ||
    "unknown"
  );
}

function isRateLimited(request: Request) {
  const now = Date.now();
  const key = getClientKey(request);

  if (rateLimitBuckets.size > RATE_LIMIT_BUCKETS_MAX) {
    for (const [bucketKey, bucket] of rateLimitBuckets) {
      if (bucket.resetAt <= now) {
        rateLimitBuckets.delete(bucketKey);
      }
    }
  }

  const bucket = rateLimitBuckets.get(key);
  if (!bucket || bucket.resetAt <= now) {
    rateLimitBuckets.set(key, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });
    return false;
  }

  bucket.count += 1;
  return bucket.count > RATE_LIMIT_MAX_REQUESTS;
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
    disableFileAccess: true,
    disableUrlAccess: true,
  });
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") || "0");

  if (!Number.isFinite(contentLength) || contentLength < 0) {
    return json(
      {
        ok: false,
        message: "Cererea nu a putut fi citită.",
      },
      { status: 400 },
    );
  }

  if (contentLength > MAX_BODY_BYTES) {
    return json(
      {
        ok: false,
        message: "Mesajul este prea lung. Te rugăm să îl scurtezi.",
      },
      { status: 413 },
    );
  }

  if (!isSupportedContentType(request)) {
    return json(
      {
        ok: false,
        message: "Tipul cererii nu este acceptat.",
      },
      { status: 415 },
    );
  }

  if (!hasAllowedOrigin(request)) {
    return json(
      {
        ok: false,
        message: "Cererea nu a putut fi validată.",
      },
      { status: 403 },
    );
  }

  if (isRateLimited(request)) {
    return json(
      {
        ok: false,
        message: "Prea multe încercări. Te rugăm să revii peste câteva minute.",
      },
      { status: 429 },
    );
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return json(
      {
        ok: false,
        message: "Cererea nu a putut fi citită.",
      },
      { status: 400 },
    );
  }

  const trap = clean(formData.get("company"));

  if (trap) {
    return json({ ok: true, message: "Mesaj primit." });
  }

  const name = singleLine(clean(formData.get("name")));
  const email = singleLine(clean(formData.get("email")));
  const phone = singleLine(clean(formData.get("phone")));
  const reason = singleLine(clean(formData.get("reason")));
  const message = clean(formData.get("message"));

  if (!within(name, 2, 80) || !isEmail(email) || !within(message, 12, 3000)) {
    return json(
      {
        ok: false,
        message:
          "Completează numele, un email valid și un mesaj de 12-3000 caractere.",
      },
      { status: 400 },
    );
  }

  if (!isPhone(phone)) {
    return json(
      {
        ok: false,
        message:
          "Introdu un număr de telefon valid: 07XXXXXXXX, 02XXXXXXXX, 03XXXXXXXX sau +407XXXXXXXX.",
      },
      { status: 400 },
    );
  }

  if (!ALLOWED_REASONS.has(reason)) {
    return json(
      {
        ok: false,
        message: "Alege un motiv valid pentru mesaj.",
      },
      { status: 400 },
    );
  }

  const transporter = getTransporter();
  const smtpUser = envValue("SMTP_USER");

  if (!transporter || !smtpUser) {
    console.warn("Contact form SMTP is not configured.");
    return json(
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
        `Motiv: ${reason}`,
        "",
        message,
      ].join("\n"),
    });

    console.info("Contact form email sent", {
      messageId: result.messageId,
    });

    return json({
      ok: true,
      message: "Mesajul a fost trimis. Mulțumim!",
    });
  } catch (error) {
    console.error("Contact form email failed", error);
    return json(
      {
        ok: false,
        message:
          "Mesajul nu a putut fi trimis momentan. Te rugăm să încerci din nou.",
      },
      { status: 500 },
    );
  }
}
