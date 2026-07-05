import test from "node:test";
import assert from "node:assert/strict";
import { getClientIp } from "@/lib/security/request";

function headersOf(entries: Record<string, string>) {
  const map = new Map(
    Object.entries(entries).map(([key, value]) => [key.toLowerCase(), value])
  );
  return {
    get(name: string) {
      return map.get(name.toLowerCase()) ?? null;
    },
  };
}

test("getClientIp uses the rightmost x-forwarded-for entry", () => {
  assert.equal(
    getClientIp(headersOf({ "x-forwarded-for": "1.2.3.4, 10.0.0.1, 203.0.113.9" })),
    "203.0.113.9"
  );
});

test("getClientIp ignores client-spoofed leftmost entries", () => {
  assert.equal(
    getClientIp(headersOf({ "x-forwarded-for": "fake-ip-9999, 198.51.100.7" })),
    "198.51.100.7"
  );
});

test("getClientIp falls back to x-real-ip then unknown", () => {
  assert.equal(getClientIp(headersOf({ "x-real-ip": "198.51.100.5" })), "198.51.100.5");
  assert.equal(getClientIp(headersOf({})), "unknown");
});

test("getClientIp rejects oversized header values", () => {
  assert.equal(
    getClientIp(headersOf({ "x-forwarded-for": "a".repeat(500) })),
    "unknown"
  );
});
