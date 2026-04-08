import test from "node:test";
import assert from "node:assert/strict";
import { BodySizeLimitError, readJsonBody } from "@/lib/security/json";

test("readJsonBody rejects requests above the configured body limit", async () => {
  const oversizedPayload = JSON.stringify({
    message: "x".repeat(128),
  });

  const req = new Request("https://zaplead.in/api/chat", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "content-length": String(Buffer.byteLength(oversizedPayload)),
    },
    body: oversizedPayload,
  });

  await assert.rejects(
    () => readJsonBody(req, 64),
    (error) => error instanceof BodySizeLimitError
  );
});

test("readJsonBody returns parsed JSON for requests within the size limit", async () => {
  const req = new Request("https://zaplead.in/api/chat", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ message: "hello" }),
  });

  const result = await readJsonBody<{ message: string }>(req, 1024);

  assert.deepEqual(result, { message: "hello" });
});
