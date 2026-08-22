const ALLOWED_PROTOCOLS = new Set(["http:", "https:", "mailto:", "tel:"]);

export function safeLinkValidation(value?: string) {
  const trimmed = value?.trim();

  if (!trimmed) {
    return true;
  }

  if (trimmed.startsWith("/") && !trimmed.startsWith("//")) {
    return true;
  }

  try {
    const url = new URL(trimmed);
    return ALLOWED_PROTOCOLS.has(url.protocol)
      ? true
      : "Folosește doar linkuri interne sau URL-uri http, https, mailto ori tel.";
  } catch {
    return "Folosește un link intern valid, de exemplu /contact, sau un URL complet.";
  }
}
