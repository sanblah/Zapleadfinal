"use client";

import { useState } from "react";
import { submitContactForm } from "@/app/contact/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CheckCircle2, AlertCircle } from "lucide-react";

export function ContactForm() {
  const [formState, setFormState] = useState<{
    status: "idle" | "loading" | "success" | "error";
    message?: string;
  }>({ status: "idle" });

  async function handleSubmit(formData: FormData) {
    setFormState({ status: "loading" });

    const result = await submitContactForm(formData);

    if (result.success) {
      setFormState({
        status: "success",
        message: result.message,
      });
    } else {
      setFormState({
        status: "error",
        message: result.message,
      });
    }
  }

  if (formState.status === "success") {
    return (
      <div className="glass-card p-6 sm:p-8 text-center">
        <CheckCircle2 className="mx-auto mb-4 h-12 w-12 text-green-400" />
        <h2 className="mb-2 text-xl font-semibold text-white">We&apos;ll be in touch soon</h2>
        <p className="mb-6 text-sm text-white/70">
          {formState.message || "You'll receive a personalized pipeline plan within 48 hours. Check your email!"}
        </p>
        <p className="text-sm text-white/70">
          Questions? Email{" "}
          <a
            href="mailto:aizaplead@gmail.com"
            className="text-white transition-colors hover:text-white/80"
          >
            aizaplead@gmail.com
          </a>
        </p>
      </div>
    );
  }

  return (
    <form action={handleSubmit} className="space-y-5 sm:space-y-6 glass-card p-5 sm:p-8">
      <div className="hidden" aria-hidden="true">
        <Label htmlFor="website">Website</Label>
        <Input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {formState.status === "error" && (
        <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 shrink-0 text-red-400" />
            <div>
              <p className="text-sm font-medium text-red-400">
                Submission failed
              </p>
              <p className="mt-1 text-sm text-white/70">
                {formState.message}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="name" className="text-white">
          Name <span className="text-red-400">*</span>
        </Label>
        <Input
          id="name"
          name="name"
          type="text"
          required
          placeholder="Your full name"
          autoComplete="name"
          maxLength={100}
          disabled={formState.status === "loading"}
          aria-required="true"
          className=""
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-white">
          Email <span className="text-red-400">*</span>
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          required
          placeholder="you@company.com"
          autoComplete="email"
          maxLength={254}
          disabled={formState.status === "loading"}
          aria-required="true"
          className="bg-white/5 border-white/20 text-white placeholder:text-white/40"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="company" className="text-white">
          Company <span className="text-red-400">*</span>
        </Label>
        <Input
          id="company"
          name="company"
          type="text"
          required
          placeholder="Your company name"
          autoComplete="organization"
          maxLength={120}
          disabled={formState.status === "loading"}
          aria-required="true"
          className="bg-white/5 border-white/20 text-white placeholder:text-white/40"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="currentTools" className="text-white">Current tools (optional)</Label>
        <Input
          id="currentTools"
          name="currentTools"
          type="text"
          placeholder="e.g., Zoho CRM, Google Sheets, WhatsApp, n8n"
          maxLength={200}
          disabled={formState.status === "loading"}
          className="bg-white/5 border-white/20 text-white placeholder:text-white/40"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="industry" className="text-white">
          Industry <span className="text-red-400">*</span>
        </Label>
        <select
          id="industry"
          name="industry"
          required
          disabled={formState.status === "loading"}
          className="flex h-11 w-full rounded-xl border border-white/[0.12] bg-white/[0.04] text-white px-4 py-2 text-sm backdrop-blur-xl backdrop-saturate-150 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/30 focus-visible:border-white/[0.25] focus-visible:bg-white/[0.06] disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]"
          aria-required="true"
        >
          <option value="" className="bg-[#0a0a1a] text-white">Select your industry</option>
          <option value="real-estate" className="bg-[#0a0a1a] text-white">Real Estate</option>
          <option value="education" className="bg-[#0a0a1a] text-white">Education / K-12 Schools</option>
          <option value="salon" className="bg-[#0a0a1a] text-white">Salon / Beauty</option>
          <option value="clinic" className="bg-[#0a0a1a] text-white">Clinic / Healthcare</option>
          <option value="fitness" className="bg-[#0a0a1a] text-white">Fitness / Gym</option>
          <option value="retail" className="bg-[#0a0a1a] text-white">Retail / Local Shop</option>
          <option value="services" className="bg-[#0a0a1a] text-white">Professional Services</option>
          <option value="other" className="bg-[#0a0a1a] text-white">Other</option>
        </select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="details" className="text-white">What&apos;s your biggest lead headache?</Label>
        <Textarea
          id="details"
          name="details"
          placeholder="e.g., 'We get 50 WhatsApp inquiries/day but can only reply to 10'"
          rows={5}
          maxLength={2000}
          disabled={formState.status === "loading"}
          className="bg-white/5 border-white/20 text-white placeholder:text-white/40"
        />
      </div>

      <Button
        type="submit"
        size="lg"
        className="w-full bg-white text-black hover:bg-white/90 rounded-full text-base font-semibold py-5 shadow-lg hover:shadow-xl transition-all duration-300"
        disabled={formState.status === "loading"}
      >
        {formState.status === "loading" ? "Sending..." : "Get My Free Audit"}
      </Button>
    </form>
  );
}
