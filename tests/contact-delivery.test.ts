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

test("deliverContactSubmission sends SMTP email when SMTP is configured", async () => {
  let capturedMessage:
    | {
        from: string;
        to: string;
        replyTo: string;
        subject: string;
        text: string;
        html: string;
      }
    | undefined;

  await deliverContactSubmission(submission, {
    nodeEnv: "production",
    smtpHost: "smtp.example.com",
    smtpPort: 465,
    smtpSecure: true,
    smtpUser: "smtp-user",
    smtpPass: "smtp-pass",
    fromEmail: "forms@zaplead.in",
    toEmail: "sanchit@zaplead.in",
    transportFactory: () =>
      ({
        sendMail: async (message: unknown) => {
          const typedMessage = message as {
            from?: unknown;
            to?: unknown;
            replyTo?: unknown;
            subject?: unknown;
            text?: unknown;
            html?: unknown;
          };

          capturedMessage = {
            from: String(typedMessage.from),
            to: String(typedMessage.to),
            replyTo: String(typedMessage.replyTo),
            subject: String(typedMessage.subject),
            text: String(typedMessage.text),
            html: String(typedMessage.html),
          };
        },
      }) as never,
  });

  assert.ok(capturedMessage);
  assert.equal(capturedMessage.from, "forms@zaplead.in");
  assert.equal(capturedMessage.to, "sanchit@zaplead.in");
  assert.equal(capturedMessage.replyTo, submission.email);
  assert.match(capturedMessage.subject, /Ada Lovelace/);
  assert.match(capturedMessage.text, /Analytical Engines/);
  assert.match(capturedMessage.html, /Need instant lead qualification/);
});

test("deliverContactSubmission escapes HTML in user-supplied fields", async () => {
  let capturedHtml = "";

  await deliverContactSubmission(
    {
      ...submission,
      name: '<img src=x onerror=alert(1)>',
      company: 'Acme "& Sons" <script>alert(2)</script>',
    },
    {
      nodeEnv: "production",
      smtpHost: "smtp.example.com",
      smtpUser: "smtp-user",
      smtpPass: "smtp-pass",
      fromEmail: "forms@zaplead.in",
      transportFactory: () =>
        ({
          sendMail: async (message: unknown) => {
            capturedHtml = String((message as { html?: unknown }).html);
          },
        }) as never,
    }
  );

  assert.ok(capturedHtml);
  assert.doesNotMatch(capturedHtml, /<img src=x/);
  assert.doesNotMatch(capturedHtml, /<script>/);
  assert.match(capturedHtml, /&lt;img src=x onerror=alert\(1\)&gt;/);
  assert.match(capturedHtml, /Acme &quot;&amp; Sons&quot; &lt;script&gt;/);
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
