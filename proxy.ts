import { NextResponse, type NextRequest } from "next/server";

function envValue(name: string) {
  return (process.env[name] || "").trim().replace(/^["']|["']$/g, "");
}

function timingSafeEqual(left: string, right: string) {
  const leftBytes = new TextEncoder().encode(left);
  const rightBytes = new TextEncoder().encode(right);
  const length = Math.max(leftBytes.length, rightBytes.length);
  let diff = leftBytes.length ^ rightBytes.length;

  for (let index = 0; index < length; index += 1) {
    diff |= (leftBytes[index] ?? 0) ^ (rightBytes[index] ?? 0);
  }

  return diff === 0;
}

function decodeBasicAuth(header: string | null) {
  if (!header?.startsWith("Basic ")) {
    return null;
  }

  try {
    const decoded = Buffer.from(header.slice(6), "base64").toString("utf8");
    const separatorIndex = decoded.indexOf(":");

    if (separatorIndex === -1) {
      return null;
    }

    return {
      username: decoded.slice(0, separatorIndex),
      password: decoded.slice(separatorIndex + 1),
    };
  } catch {
    return null;
  }
}

function unauthorizedResponse() {
  return new NextResponse("Authentication required.", {
    status: 401,
    headers: {
      "Cache-Control": "no-store",
      "WWW-Authenticate": 'Basic realm="Sanity Studio", charset="UTF-8"',
      "X-Robots-Tag": "noindex, nofollow, noarchive",
    },
  });
}

export function proxy(request: NextRequest) {
  const expectedUsername = envValue("SANITY_STUDIO_USER");
  const expectedPassword = envValue("SANITY_STUDIO_PASSWORD");

  if (!expectedUsername || !expectedPassword) {
    return unauthorizedResponse();
  }

  const credentials = decodeBasicAuth(request.headers.get("authorization"));

  if (
    !credentials ||
    !timingSafeEqual(credentials.username, expectedUsername) ||
    !timingSafeEqual(credentials.password, expectedPassword)
  ) {
    return unauthorizedResponse();
  }

  const response = NextResponse.next();
  response.headers.set("Cache-Control", "no-store");
  response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
  return response;
}

export const config = {
  matcher: ["/studio", "/studio/:path*"],
};
