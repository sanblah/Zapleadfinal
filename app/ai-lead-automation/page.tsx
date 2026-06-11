import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  absoluteUrl,
  aiLeadAutomationFaqs,
  createBreadcrumbJsonLd,
  createFaqJsonLd,
  siteConfig,
} from "@/lib/seo";

export const metadata: Metadata = {
  title: "AI Lead Pipeline Automation",
  description:
    "Learn how AI lead pipeline automation captures, qualifies, routes, follows up with, and books high-intent leads across WhatsApp, web forms, CRM, and calendars.",
  alternates: {
    canonical: "/ai-lead-automation",
  },
  openGraph: {
    title: "AI Lead Pipeline Automation | ZapLead",
    description:
      "A practical guide to AI lead capture, WhatsApp qualification, CRM routing, follow-up, and booking automation.",
    url: "/ai-lead-automation",
    type: "article",
  },
};

const facts = [
  "AI lead automation captures inquiries from web forms, WhatsApp, and DMs.",
  "AI lead qualification scores intent using budget, timeline, need, and context.",
  "CRM automation syncs conversation notes, source data, owners, and next steps.",
  "Meeting booking automation turns qualified conversations into calendar events.",
];

const steps = [
  {
    title: "Capture Every Inquiry",
    body: "ZapLead connects web forms, WhatsApp, Instagram DM, and lead lists so new inquiries enter one trackable pipeline.",
  },
  {
    title: "Qualify Buyer Intent",
    body: "ZapLead AI agents ask structured questions, identify urgency, collect missing details, and tag leads by readiness.",
  },
  {
    title: "Route and Book",
    body: "ZapLead routes qualified leads to the right owner, updates the CRM, books meetings, and sends reminders.",
  },
];

const useCases = [
  "High-volume inbound inquiries",
  "WhatsApp-first sales conversations",
  "Real estate pre-sales follow-up",
  "Outbound lead list qualification",
  "Appointment and consultation booking",
  "Sales dashboard and handoff visibility",
];

const pageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${absoluteUrl("/ai-lead-automation")}#webpage`,
  url: absoluteUrl("/ai-lead-automation"),
  name: "AI Lead Pipeline Automation",
  description: metadata.description,
  publisher: {
    "@id": `${siteConfig.siteUrl}/#organization`,
  },
  about: {
    "@id": `${siteConfig.siteUrl}/#ai-lead-pipeline-automation`,
  },
};

export default function AiLeadAutomationPage() {
  return (
    <>
      {[pageJsonLd, createFaqJsonLd(aiLeadAutomationFaqs), createBreadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "AI Lead Pipeline Automation", path: "/ai-lead-automation" },
      ])].map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <div className="fixed inset-0 z-0">
        <BackgroundGradientAnimation
          gradientBackgroundStart="rgb(0, 5, 25)"
          gradientBackgroundEnd="rgb(0, 17, 82)"
          firstColor="18, 113, 255"
          secondColor="82, 39, 255"
          thirdColor="100, 220, 255"
          fourthColor="177, 158, 239"
          fifthColor="82, 39, 255"
          pointerColor="140, 100, 255"
          size="80%"
          blendingValue="hard-light"
          interactive={true}
          containerClassName="!h-full !w-full"
        />
        <div className="absolute inset-0 bg-black/30 pointer-events-none" />
      </div>

      <div className="relative z-10 min-h-screen pt-16">
        <section className="border-b border-white/[0.1] py-14 sm:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <Badge variant="outline" className="mb-6 glass-badge text-white">
              AI lead pipeline automation
            </Badge>
            <h1 className="mb-5 max-w-4xl text-3xl font-bold tracking-tight text-[#fde8d8] sm:text-5xl md:text-6xl">
              AI Lead Pipeline Automation: Capture, Qualify, Route, and Book Leads
            </h1>
            <p className="max-w-3xl text-lg font-light leading-relaxed text-white/75 sm:text-xl">
              AI lead pipeline automation uses AI agents and workflow systems to
              respond to leads, understand intent, update sales tools, and move
              qualified conversations toward a booked meeting.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="bg-white text-black hover:bg-white/90">
                <Link href="/contact">
                  Audit My Pipeline <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="glass" size="lg">
                <Link href="/work">View Case Studies</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16">
          <div className="mx-auto grid max-w-6xl gap-6 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr]">
            <Card className="liquid-shine">
              <CardHeader>
                <CardTitle className="text-2xl text-white">What It Means</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-base leading-relaxed text-white/75">
                  AI lead automation is the operating layer between marketing
                  channels and sales work. ZapLead builds that layer so lead
                  data, conversation context, follow-up, CRM state, and booking
                  status stay connected.
                </p>
              </CardContent>
            </Card>

            <div className="grid gap-3">
              {facts.map((fact) => (
                <div key={fact} className="flex gap-3 rounded-2xl border border-white/[0.1] bg-white/[0.05] p-4">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-300" />
                  <p className="text-base text-white/80">{fact}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="mb-8 text-3xl font-bold text-[#fde8d8] sm:text-4xl">
              How ZapLead Applies It
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              {steps.map((step, index) => (
                <Card key={step.title} className="liquid-shine h-full">
                  <CardHeader>
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-lg font-bold text-black">
                      {index + 1}
                    </div>
                    <CardTitle className="text-xl text-white">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-base leading-relaxed text-white/75">{step.body}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16">
          <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-2">
            <div>
              <h2 className="mb-4 text-3xl font-bold text-[#fde8d8]">Best-Fit Use Cases</h2>
              <p className="text-base leading-relaxed text-white/75">
                ZapLead is most useful when response speed, consistent follow-up,
                and clean sales handoff affect revenue outcomes.
              </p>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {useCases.map((item) => (
                <li key={item} className="rounded-full border border-white/[0.12] bg-white/[0.06] px-4 py-3 text-sm text-white/80">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="py-12 sm:py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <h2 className="mb-8 text-3xl font-bold text-[#fde8d8]">AI Lead Automation FAQ</h2>
            <div className="space-y-4">
              {aiLeadAutomationFaqs.map((item) => (
                <Card key={item.question} className="liquid-shine">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-xl text-white">{item.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-base leading-relaxed text-white/75">{item.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
