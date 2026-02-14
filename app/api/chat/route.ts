import { NextResponse } from "next/server";
import { sanitizeText } from "@/lib/security/input";
import { getClientIp, isAllowedOrigin, isCrossSiteBrowserRequest } from "@/lib/security/request";
import { rateLimit } from "@/lib/security/rate-limit";

export const runtime = "nodejs";

const SYSTEM_PROMPT = `You are the ZapLead Agent, a highly intelligent, energetic, and professional sales assistant. Your goal is to qualify leads for ZapLead, an AI-powered pipeline automation tool.

Key Information about ZapLead:
- **Core Function**: It captures, qualifies, books, and follows up with leads 24/7 across Web and WhatsApp.
- **Value Proposition**: "AI that qualifies, humans that close." It stops pipeline leakage and increases conversion rates by up to 92%.
- **Pricing**: Starts at $499/mo for the Starter plan.
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

Guidelines:
- Keep responses concise (under 3 sentences usually) but informative.
- Be enthusiastic but professional.
- If asked about pricing, mention the $499/mo starter plan.
- If the user seems interested, ask if they want to book a demo or see a breakdown.
- If asked "what do you help with?", explain the problem of lost leads and how ZapLead fixes it.
- Do not hallucinate features not mentioned.
- If you don't know something, suggest booking a discovery call with a human engineer.`;

const CHAT_RATE_LIMIT = { windowMs: 60_000, max: 30 };
const MAX_MESSAGE_LENGTH = 2_000;
const MAX_HISTORY_ITEMS = 20;
const MAX_HISTORY_TEXT_LENGTH = 1_000;
const ANTHROPIC_TIMEOUT_MS = 15_000;
const ANTHROPIC_MAX_RETRIES = 3;

type UserRole = "user" | "ai";

type HistoryItem = {
  role: UserRole;
  text: string;
};

type AnthropicResponsePayload = {
  content?: Array<{ text?: string }>;
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
  const payload = data as AnthropicResponsePayload;
  const firstText = payload.content?.find((block) => typeof block?.text === "string")?.text;
  if (!firstText) {
    return "Sorry, I couldn't generate a response.";
  }
  return sanitizeText(firstText, 4_000);
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function POST(req: Request) {
  try {
    if (!isAllowedOrigin(req.headers.get("origin")) || isCrossSiteBrowserRequest(req.headers)) {
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
      body = await req.json();
    } catch {
      return jsonNoStore({ error: "Invalid JSON payload." }, 400);
    }

    const parsedPayload = parsePayload(body);
    if (!parsedPayload) {
      return jsonNoStore({ error: "Invalid input." }, 400);
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      console.error("Chat API misconfiguration: missing upstream API key.");
      return jsonNoStore({ error: "Service is temporarily unavailable." }, 503);
    }

    const messages = [
      ...parsedPayload.history.map((msg) => ({
        role: msg.role === "ai" ? "assistant" : "user",
        content: msg.text,
      })),
      { role: "user", content: parsedPayload.message },
    ];

    let anthropicResponse: Response | null = null;

    for (let attempt = 1; attempt <= ANTHROPIC_MAX_RETRIES; attempt += 1) {
      try {
        anthropicResponse = await fetch("https://api.anthropic.com/v1/messages", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": apiKey,
            "anthropic-version": "2023-06-01",
          },
          body: JSON.stringify({
            model: "claude-sonnet-4-20250514",
            max_tokens: 1024,
            system: SYSTEM_PROMPT,
            messages,
          }),
          cache: "no-store",
          signal: AbortSignal.timeout(ANTHROPIC_TIMEOUT_MS),
        });

        if (
          anthropicResponse.ok ||
          (anthropicResponse.status >= 400 &&
            anthropicResponse.status < 500 &&
            anthropicResponse.status !== 429)
        ) {
          break;
        }
      } catch (error) {
        if (attempt === ANTHROPIC_MAX_RETRIES) {
          throw error;
        }
      }

      if (attempt < ANTHROPIC_MAX_RETRIES) {
        await delay(attempt * 1000);
      }
    }

    if (!anthropicResponse) {
      return jsonNoStore({ error: "Failed to generate response." }, 500);
    }

    if (!anthropicResponse.ok) {
      console.error("Anthropic API request failed.", {
        status: anthropicResponse.status,
        requestId: anthropicResponse.headers.get("request-id"),
      });
      return jsonNoStore({ error: "Failed to generate response." }, 502);
    }

    const data = (await anthropicResponse.json()) as unknown;
    const response = getAssistantText(data);

    return jsonNoStore({ response }, 200);
  } catch (error) {
    console.error("Chat API handler error.", {
      error: error instanceof Error ? error.message : "Unknown error",
    });
    return jsonNoStore({ error: "Failed to generate response." }, 500);
  }
}
