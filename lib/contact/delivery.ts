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

export async function deliverContactSubmission(
  submission: ContactSubmission,
  options: DeliverContactSubmissionOptions
): Promise<void> {
  const {
    nodeEnv,
    webhookUrl,
    fetchImpl = fetch,
    timeoutMs = DEFAULT_TIMEOUT_MS,
  } = options;

  if (!webhookUrl) {
    if (nodeEnv === "production") {
      throw new ContactDeliveryError(
        "missing_configuration",
        "Missing CONTACT_WEBHOOK_URL."
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
