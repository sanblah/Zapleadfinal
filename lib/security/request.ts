const DEV_ORIGINS = new Set(["http://localhost:3000", "http://127.0.0.1:3000"]);

type HeaderReader = {
  get(name: string): string | null;
};

function normalizeOrigin(value: string): string | null {
  try {
    return new URL(value).origin;
  } catch {
    return null;
  }
}

function getRequestOrigin(headers: HeaderReader): string | null {
  const forwardedHost = headers.get("x-forwarded-host");
  const host = forwardedHost ?? headers.get("host");
  if (!host) {
    return null;
  }

  const forwardedProto = headers.get("x-forwarded-proto");
  const proto = forwardedProto ?? (host.includes("localhost") ? "http" : "https");

  return normalizeOrigin(`${proto}://${host}`);
}

export function getAllowedOrigins(): Set<string> {
  const allowed = new Set<string>(DEV_ORIGINS);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  if (siteUrl) {
    const normalized = normalizeOrigin(siteUrl);
    if (normalized) {
      allowed.add(normalized);
    }
  }

  return allowed;
}

export function isAllowedOrigin(
  originHeader: string | null,
  headers?: HeaderReader
): boolean {
  if (!originHeader) {
    return process.env.NODE_ENV !== "production";
  }

  const normalized = normalizeOrigin(originHeader);
  if (!normalized) {
    return false;
  }

  if (getAllowedOrigins().has(normalized)) {
    return true;
  }

  if (!headers) {
    return false;
  }

  return getRequestOrigin(headers) === normalized;
}

export function isCrossSiteBrowserRequest(headers: HeaderReader): boolean {
  const secFetchSite = headers.get("sec-fetch-site");
  return secFetchSite === "cross-site";
}

export function getClientIp(headers: HeaderReader): string {
  const platformHeaders = [
    headers.get("cf-connecting-ip"),
    headers.get("x-vercel-forwarded-for"),
    headers.get("x-forwarded-for"),
  ];

  const forwarded = platformHeaders.find(Boolean);
  if (forwarded) {
    const ip = forwarded.split(",")[0]?.trim();
    if (ip) {
      return ip;
    }
  }

  const realIp = headers.get("x-real-ip")?.trim();
  if (realIp) {
    return realIp;
  }

  return "unknown";
}
