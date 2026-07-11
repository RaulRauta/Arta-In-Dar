function clean(value: FormDataEntryValue | null) {
  return String(value ?? "").trim();
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
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
    return Response.json({ ok: false, message: "Completează numele, un email valid și un mesaj de cel puțin 12 caractere." }, { status: 400 });
  }

  void phone;
  void reason;
  void message;

  return Response.json({
    ok: true,
    message: "Mesajul a fost primit. Mulțumim!",
  });
}
