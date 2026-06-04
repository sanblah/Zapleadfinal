import { NextResponse } from "next/server";
import { sanitizeText } from "@/lib/security/input";
import { BodySizeLimitError, readJsonBody } from "@/lib/security/json";
import { getClientIp, isAllowedOrigin, isCrossSiteBrowserRequest } from "@/lib/security/request";
import { rateLimit } from "@/lib/security/rate-limit";

export const runtime = "nodejs";

const SYSTEM_PROMPT = `You are the ZapLead Agent, a highly intelligent, direct, and professional sales assistant for ZapLead Solutions. Your job is to qualify serious prospects, explain the product clearly, and guide interested users toward a free pipeline audit or engineering call.

Key Information about ZapLead:
- **Core Function**: ZapLead builds AI engagement systems that capture, qualify, book, follow up, sync, and analyze leads across Web, WhatsApp, Instagram DM, CRM, calendars, spreadsheets, and dashboards.
- **Value Proposition**: "AI that qualifies, humans that close." ZapLead stops pipeline leakage by replying quickly, keeping lead context clean, and automating the work that usually falls between sales and operations.
- **Primary Offer**: Free pipeline audit, followed by a scoped build for WhatsApp/web AI agents, CRM automation, dashboards, and integrations.
- **Typical Setup Time**: 3-4 weeks for a production-grade deployment, depending on integrations.
- **Pricing**: Starts at $499/mo for the Starter plan. Custom automation and WhatsApp-agent builds are scoped after the audit.
- **Speed**: Response time is ~0.2s (faster than any human).
- **Features**:
  - **Capture**: Web forms, chat, WhatsApp/Instagram DM.
  - **Qualify**: AI intent + scoring (budget, timeline, config).
  - **Enrich**: Auto-append UTM source, normalize, dedupe.
  - **Route**: Assign to reps by region, capacity, SLA timers.
  - **Book**: Calendar integration for calls, demos, site visits.
  - **Follow-up**: Drips on WhatsApp/Email/SMS with smart retries.
  - **Sync**: Two-way CRM (Zoho/Sheets/Supabase) + transcripts.
  - **Analyze**: Dashboards for trends, conversion, drop-offs.
- **Case Studies**:
  - **Bonnies Bakery**: Production WhatsApp ordering assistant and owner dashboard in Mulund. Two-month window: 20,123 messages, 1,248 active WhatsApp customers, 1,656 conversation threads, 6,237 AI replies, 65.3% AI share of outbound replies, 87 completed paid orders, ₹70,665 recorded revenue, and ₹812 average order value.
  - **ZapReach OS**: Multi-tenant WhatsApp agent platform for repeatable deployments. Includes onboarding, PDF/menu extraction, tenant runtime, encrypted integrations, usage tracking, and adapters for payments, inventory, POS, calendars, and future vertical tools.
  - **Marathon Realty**: Pre-sales automation using n8n, WATI, WhatsApp flows, transcript processing, and AI analysis to reduce manual workload and improve response times.

Guidelines:
- Keep responses concise (under 3 sentences usually) but informative.
- Be confident and practical, not hype-heavy.
- If asked about pricing, mention the $499/mo starter plan and explain that custom builds are scoped after the audit.
- If asked for proof, use the Bonnies Bakery, ZapReach OS, or Marathon Realty case studies above.
- If the user seems interested, ask one qualifying question and offer a free pipeline audit or demo.
- If asked "what do you help with?", explain the problem of lost leads and how ZapLead fixes it.
- Do not hallucinate features not mentioned.
- If you don't know something, suggest booking a discovery call with a ZapLead engineer.`;

const CHAT_RATE_LIMIT = { windowMs: 60_000, max: 30 };
const MAX_MESSAGE_LENGTH = 2_000;
const MAX_HISTORY_ITEMS = 20;
const MAX_HISTORY_TEXT_LENGTH = 1_000;
const MAX_REQUEST_BODY_BYTES = 16_384;
const OPENAI_MODEL = process.env.OPENAI_CHAT_MODEL ?? "gpt-5.4";
const OPENAI_TIMEOUT_MS = 15_000;
const OPENAI_MAX_RETRIES = 3;

type UserRole = "user" | "ai";

type HistoryItem = {
  role: UserRole;
  text: string;
};

type OpenAIResponsePayload = {
  output_text?: string;
  output?: Array<{
    content?: Array<{
      text?: string;
    }>;
  }>;
};

function jsonNoStore(
  body: Record<string, string>,
  status: number,
  headers?: Record<string, string>
) {
  return NextResponse.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store",
      ...headers,
    },
  });
}

function asRecord(value: unknown): Record<string, unknown> | null {
  if (typeof value !== "object" || value === null) {
    return null;
  }
  return value as Record<string, unknown>;
}

function parsePayload(payload: unknown): { message: string; history: HistoryItem[] } | null {
  const record = asRecord(payload);
  if (!record) {
    return null;
  }

  if (typeof record.message !== "string") {
    return null;
  }

  const message = sanitizeText(record.message, MAX_MESSAGE_LENGTH);
  if (!message) {
    return null;
  }

  const history: HistoryItem[] = [];
  const historyValue = record.history;

  if (historyValue !== undefined) {
    if (!Array.isArray(historyValue) || historyValue.length > MAX_HISTORY_ITEMS) {
      return null;
    }

    for (const item of historyValue) {
      const historyRecord = asRecord(item);
      if (!historyRecord) {
        return null;
      }

      const role = historyRecord.role;
      const text = historyRecord.text;

      if ((role !== "user" && role !== "ai") || typeof text !== "string") {
        return null;
      }

      const sanitizedText = sanitizeText(text, MAX_HISTORY_TEXT_LENGTH);
      if (!sanitizedText) {
        continue;
      }

      history.push({ role, text: sanitizedText });
    }
  }

  return { message, history };
}

function getAssistantText(data: unknown): string {
  const payload = data as OpenAIResponsePayload;
  const outputText =
    typeof payload.output_text === "string"
      ? payload.output_text
      : payload.output
        ?.flatMap((item) => item.content ?? [])
        .find((block) => typeof block?.text === "string")?.text;

  if (!outputText) {
    return "Sorry, I couldn't generate a response.";
  }
  return sanitizeText(outputText, 4_000);
}

function buildConversationInput(payload: { message: string; history: HistoryItem[] }) {
  return [
    ...payload.history.map((msg) => `${msg.role === "ai" ? "Assistant" : "User"}: ${msg.text}`),
    `User: ${payload.message}`,
  ].join("\n");
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function POST(req: Request) {
  try {
    if (
      !isAllowedOrigin(req.headers.get("origin"), req.headers) ||
      isCrossSiteBrowserRequest(req.headers)
    ) {
      return jsonNoStore({ error: "Forbidden request origin." }, 403);
    }

    const ip = getClientIp(req.headers);
    const limitResult = rateLimit(`chat:${ip}`, CHAT_RATE_LIMIT);

    if (!limitResult.allowed) {
      return jsonNoStore(
        { error: "Too many requests. Please try again shortly." },
        429,
        { "Retry-After": String(limitResult.retryAfterSeconds) }
      );
    }

    let body: unknown;
    try {
      body = await readJsonBody(req, MAX_REQUEST_BODY_BYTES);
    } catch (error) {
      if (error instanceof BodySizeLimitError) {
        return jsonNoStore({ error: "Request payload is too large." }, 413);
      }
      return jsonNoStore({ error: "Invalid JSON payload." }, 400);
    }

    const parsedPayload = parsePayload(body);
    if (!parsedPayload) {
      return jsonNoStore({ error: "Invalid input." }, 400);
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      console.error("Chat API misconfiguration: missing upstream API key.");
      return jsonNoStore({ error: "Service is temporarily unavailable." }, 503);
    }

    const input = buildConversationInput(parsedPayload);
    let openAIResponse: Response | null = null;

    for (let attempt = 1; attempt <= OPENAI_MAX_RETRIES; attempt += 1) {
      try {
        openAIResponse = await fetch("https://api.openai.com/v1/responses", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: OPENAI_MODEL,
            instructions: SYSTEM_PROMPT,
            input,
            max_output_tokens: 900,
            store: false,
          }),
          cache: "no-store",
          signal: AbortSignal.timeout(OPENAI_TIMEOUT_MS),
        });

        if (
          openAIResponse.ok ||
          (openAIResponse.status >= 400 &&
            openAIResponse.status < 500 &&
            openAIResponse.status !== 429)
        ) {
          break;
        }
      } catch (error) {
        if (attempt === OPENAI_MAX_RETRIES) {
          throw error;
        }
      }

      if (attempt < OPENAI_MAX_RETRIES) {
        await delay(attempt * 1000);
      }
    }

    if (!openAIResponse) {
      return jsonNoStore({ error: "Failed to generate response." }, 500);
    }

    if (!openAIResponse.ok) {
      console.error("OpenAI API request failed.", {
        status: openAIResponse.status,
        requestId: openAIResponse.headers.get("x-request-id"),
      });
      return jsonNoStore({ error: "Failed to generate response." }, 502);
    }

    const data = (await openAIResponse.json()) as unknown;
    const response = getAssistantText(data);

    return jsonNoStore({ response }, 200);
  } catch (error) {
    console.error("Chat API handler error.", {
      error: error instanceof Error ? error.message : "Unknown error",
    });
    return jsonNoStore({ error: "Failed to generate response." }, 500);
  }
}
