"use server";

import { headers } from "next/headers";
import { isValidEmail, sanitizeText } from "@/lib/security/input";
import { getClientIp, isAllowedOrigin, isCrossSiteBrowserRequest } from "@/lib/security/request";
import { rateLimit } from "@/lib/security/rate-limit";

interface FormResult {
  success: boolean;
  message: string;
}

const CONTACT_RATE_LIMIT = { windowMs: 60 * 60 * 1000, max: 5 };
const NAME_MAX = 100;
const EMAIL_MAX = 254;
const COMPANY_MAX = 120;
const CURRENT_TOOLS_MAX = 200;
const DETAILS_MAX = 2_000;
const VALID_INDUSTRIES = new Set([
  "real-estate",
  "education",
  "salon",
  "clinic",
  "fitness",
  "retail",
  "services",
  "other",
]);

function readField(formData: FormData, key: string, maxLength: number): string {
  const value = formData.get(key);
  if (typeof value !== "string") {
    return "";
  }
  return sanitizeText(value, maxLength);
}

function successResponse(): FormResult {
  return {
    success: true,
    message: "We'll get back to you within 24 hours to discuss your pipeline.",
  };
}

export async function submitContactForm(
  formData: FormData
): Promise<FormResult> {
  const headerStore = await headers();

  if (!isAllowedOrigin(headerStore.get("origin")) || isCrossSiteBrowserRequest(headerStore)) {
    return {
      success: false,
      message: "Request blocked. Please refresh and try again.",
    };
  }

  const ip = getClientIp(headerStore);
  const limitResult = rateLimit(`contact:${ip}`, CONTACT_RATE_LIMIT);
  if (!limitResult.allowed) {
    return {
      success: false,
      message: "Too many submissions. Please try again in about an hour.",
    };
  }

  // Honeypot for bot submissions.
  const website = readField(formData, "website", 200);
  if (website) {
    return successResponse();
  }

  const name = readField(formData, "name", NAME_MAX);
  const email = readField(formData, "email", EMAIL_MAX).toLowerCase();
  const company = readField(formData, "company", COMPANY_MAX);
  const currentTools = readField(formData, "currentTools", CURRENT_TOOLS_MAX);
  const industry = readField(formData, "industry", 40);
  const details = readField(formData, "details", DETAILS_MAX);

  if (!name || !email || !company || !industry) {
    return {
      success: false,
      message: "Please fill in all required fields.",
    };
  }

  if (!isValidEmail(email)) {
    return {
      success: false,
      message: "Please enter a valid email address.",
    };
  }

  if (!VALID_INDUSTRIES.has(industry)) {
    return {
      success: false,
      message: "Please choose a valid industry option.",
    };
  }

  try {
    // Keep responses consistent while backend integrations are added.
    await new Promise((resolve) => setTimeout(resolve, 250));

    // Avoid logging direct PII in server logs.
    console.info("Contact form accepted", {
      emailDomain: email.split("@")[1] ?? "unknown",
      industry,
      company,
      hasDetails: details.length > 0,
      hasCurrentTools: currentTools.length > 0,
    });

    return successResponse();
  } catch (error) {
    console.error("Form submission error", {
      error: error instanceof Error ? error.message : "Unknown error",
    });
    return {
      success: false,
      message:
        "Something went wrong. Please try again or email us at aizaplead@gmail.com",
    };
  }
}
