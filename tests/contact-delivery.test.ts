import test from "node:test";
import assert from "node:assert/strict";
import {
  ContactDeliveryError,
  deliverContactSubmission,
  type ContactSubmission,
} from "@/lib/contact/delivery";

const submission: ContactSubmission = {
  name: "Ada Lovelace",
  email: "ada@example.com",
  company: "Analytical Engines",
  currentTools: "Zoho",
  industry: "services",
  details: "Need instant lead qualification",
  submittedAt: "2026-04-08T12:00:00.000Z",
  emailDomain: "example.com",
};

test("deliverContactSubmission rejects production submissions when no delivery channel is configured", async () => {
  await assert.rejects(
    () =>
      deliverContactSubmission(submission, {
        nodeEnv: "production",
        webhookUrl: "",
        fetchImpl: async () => new Response(null, { status: 200 }),
      }),
    (error) =>
      error instanceof ContactDeliveryError &&
      error.code === "missing_configuration"
  );
});

test("deliverContactSubmission posts JSON to the configured webhook", async () => {
  let capturedRequest: Request | undefined;

  await deliverContactSubmission(submission, {
    nodeEnv: "production",
    webhookUrl: "https://example.com/hooks/contact",
    fetchImpl: async (input, init) => {
      capturedRequest = new Request(input, init);
      return new Response(null, { status: 202 });
    },
  });

  assert.ok(capturedRequest);
  assert.equal(capturedRequest.method, "POST");
  assert.equal(capturedRequest.headers.get("content-type"), "application/json");

  const payload = await capturedRequest.json();
  assert.equal(payload.email, submission.email);
  assert.equal(payload.company, submission.company);
});
