import nodemailer from "nodemailer";

export type ContactSubmission = {
  name: string;
  email: string;
  company: string;
  currentTools: string;
  industry: string;
  details: string;
  submittedAt: string;
  emailDomain: string;
};

type DeliverContactSubmissionOptions = {
  nodeEnv?: string;
  webhookUrl?: string;
  fetchImpl?: typeof fetch;
  timeoutMs?: number;
  smtpHost?: string;
  smtpPort?: number;
  smtpSecure?: boolean;
  smtpUser?: string;
  smtpPass?: string;
  fromEmail?: string;
  toEmail?: string;
  transportFactory?: typeof nodemailer.createTransport;
};

export class ContactDeliveryError extends Error {
  code: "missing_configuration" | "delivery_failed";

  constructor(
    code: "missing_configuration" | "delivery_failed",
    message: string
  ) {
    super(message);
    this.name = "ContactDeliveryError";
    this.code = code;
  }
}

const DEFAULT_TIMEOUT_MS = 10_000;
const DEFAULT_CONTACT_RECIPIENT = "sanchit@zaplead.in";

const HTML_ESCAPES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (char) => HTML_ESCAPES[char]);
}

function isSmtpConfigured(options: DeliverContactSubmissionOptions): boolean {
  return Boolean(
    options.smtpHost &&
    options.smtpUser &&
    options.smtpPass &&
    options.fromEmail
  );
}

function formatSubmissionText(submission: ContactSubmission): string {
  return [
    "New ZapLead contact submission",
    "",
    `Name: ${submission.name}`,
    `Email: ${submission.email}`,
    `Company: ${submission.company}`,
    `Industry: ${submission.industry}`,
    `Current tools: ${submission.currentTools || "Not provided"}`,
    `Lead headache: ${submission.details || "Not provided"}`,
    `Submitted at: ${submission.submittedAt}`,
    `Email domain: ${submission.emailDomain}`,
  ].join("\n");
}

function formatSubmissionHtml(submission: ContactSubmission): string {
  const rows = [
    ["Name", submission.name],
    ["Email", submission.email],
    ["Company", submission.company],
    ["Industry", submission.industry],
    ["Current tools", submission.currentTools || "Not provided"],
    ["Lead headache", submission.details || "Not provided"],
    ["Submitted at", submission.submittedAt],
    ["Email domain", submission.emailDomain],
  ];

  return `
    <div style="font-family: Arial, sans-serif; color: #111827; line-height: 1.6;">
      <h2 style="margin-bottom: 16px;">New ZapLead contact submission</h2>
      <table style="border-collapse: collapse; width: 100%; max-width: 720px;">
        <tbody>
          ${rows
            .map(
              ([label, value]) => `
                <tr>
                  <td style="padding: 10px 12px; border: 1px solid #e5e7eb; font-weight: 600; width: 180px; vertical-align: top;">${escapeHtml(label)}</td>
                  <td style="padding: 10px 12px; border: 1px solid #e5e7eb; white-space: pre-wrap;">${escapeHtml(value)}</td>
                </tr>
              `
            )
            .join("")}
        </tbody>
      </table>
    </div>
  `;
}

export async function deliverContactSubmission(
  submission: ContactSubmission,
  options: DeliverContactSubmissionOptions
): Promise<void> {
  const {
    nodeEnv,
    webhookUrl,
    fetchImpl = fetch,
    timeoutMs = DEFAULT_TIMEOUT_MS,
    smtpHost,
    smtpPort = 465,
    smtpSecure = smtpPort === 465,
    smtpUser,
    smtpPass,
    fromEmail,
    toEmail = DEFAULT_CONTACT_RECIPIENT,
    transportFactory = nodemailer.createTransport,
  } = options;

  if (isSmtpConfigured({ smtpHost, smtpUser, smtpPass, fromEmail })) {
    const transport = transportFactory({
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    await transport.sendMail({
      from: fromEmail,
      to: toEmail,
      replyTo: submission.email,
      subject: `New ZapLead contact: ${submission.name} from ${submission.company}`,
      text: formatSubmissionText(submission),
      html: formatSubmissionHtml(submission),
    });

    return;
  }

  if (!webhookUrl) {
    if (nodeEnv === "production") {
      throw new ContactDeliveryError(
        "missing_configuration",
        "Missing SMTP configuration and CONTACT_WEBHOOK_URL."
      );
    }
    return;
  }

  const response = await fetchImpl(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      source: "zaplead-website",
      ...submission,
    }),
    cache: "no-store",
    signal: AbortSignal.timeout(timeoutMs),
  });

  if (!response.ok) {
    throw new ContactDeliveryError(
      "delivery_failed",
      `Contact delivery failed with status ${response.status}.`
    );
  }
}
