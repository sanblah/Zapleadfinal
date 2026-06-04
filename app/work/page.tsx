import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";

export const metadata: Metadata = {
  title: "ZapLead Case Studies",
  description:
    "See how ZapLead builds production WhatsApp agents, automation systems, and reusable AI operating layers.",
};

interface CaseStudy {
  id: string;
  company: string;
  industry: string;
  status: string;
  timeframe: string;
  tags: string[];
  summary: string;
  problem: string;
  system: string[];
  impact: string;
  metrics: Array<{
    value: string;
    label: string;
  }>;
  proofPoints: string[];
}

const caseStudies: CaseStudy[] = [
  {
    id: "confidential-bakery-whatsapp-agent",
    company: "Confidential Bakery Client",
    industry: "Bakery / WhatsApp Ordering",
    status: "Live in production",
    timeframe: "Two-month production window: Apr 4-Jun 4, 2026",
    tags: ["WhatsApp AI", "Twilio", "Supabase", "Rista POS", "Razorpay", "Owner Dashboard"],
    summary:
      "A production WhatsApp ordering assistant and owner dashboard for a Mulund bakery client, built to answer product questions, check live stock, take prepaid orders, and give the owner a live control room.",
    problem:
      "The client's customers already ordered through WhatsApp, but the channel depended on fast human replies during rushes, after hours, and across Hindi, English, Marathi, and Hinglish. Routine questions about stock, price, delivery, and payment consumed owner time, while slow replies or wrong information risked lost orders.",
    system: [
      "Node.js + TypeScript Express backend receiving Twilio WhatsApp webhooks",
      "10-second message buffer so fragmented customer messages are interpreted together",
      "Claude agent with tool use for live Rista POS inventory, product photos, delivery validation, order status, and Razorpay payment links",
      "Supabase database, storage, and realtime message stream for conversation history, AI state, labels, contacts, and analytics",
      "Private owner dashboard with live chat, AI on/off takeover, manual replies, labels, contact notes, and analytics",
      "Monitoring and recovery layer with integration logs, pg_cron checks, stale Razorpay order polling, and paid-order fulfillment safeguards",
    ],
    impact:
      "Across the two-month production window, the system processed 20,123 WhatsApp messages from 1,248 active customers, sent 6,237 AI replies, and recorded 87 completed paid orders worth ₹70,665. The bot handled routine ordering at scale while the owner retained takeover control for custom, media-heavy, or payment-sensitive conversations.",
    metrics: [
      { value: "20,123", label: "messages analyzed across Apr 4-Jun 4" },
      { value: "1,248", label: "active WhatsApp customers" },
      { value: "1,656", label: "conversation threads" },
      { value: "6,237", label: "AI replies sent" },
      { value: "65.3%", label: "AI share of outbound replies" },
      { value: "87", label: "completed paid orders" },
      { value: "₹70,665", label: "recorded two-month revenue" },
      { value: "₹812", label: "average order value" },
    ],
    proofPoints: [
      "Backend is live on Render; the private owner dashboard is live on Netlify.",
      "All WhatsApp orders are designed around Razorpay advance payment before Rista POS fulfillment.",
      "Two-month production data shows 207 payment-link recipients, 41.1% phone-level link-to-paid conversion, and a 37 pickup / 50 delivery split.",
      "Customer behavior data shows 375 inbound media messages from 268 customers and 540 customers with custom or media-related intent.",
      "Peak demand concentrated around 11 AM-1 PM IST; the busiest day in the window was May 9, 2026 with 1,147 messages.",
    ],
  },
  {
    id: "zapreach-os-whatsapp-agent-platform",
    company: "ZapReach OS",
    industry: "Multi-Tenant WhatsApp Agent Platform",
    status: "Reusable platform layer",
    timeframe: "Built from the bakery deployment pattern",
    tags: ["Agent Platform", "Multi-Tenant", "Onboarding Wizard", "Twilio", "Claude", "Encrypted Integrations"],
    summary:
      "The operating system behind repeatable WhatsApp AI deployments: a multi-tenant platform where a business can upload its menu or brochure, configure integrations, and publish a WhatsApp agent without a custom build every time.",
    problem:
      "Every new AI WhatsApp deployment used to require bespoke setup: prompt design, PDF understanding, Twilio wiring, payment and calendar integrations, runtime configuration, dashboard access, and usage tracking. That made launches slower and made each client harder to support consistently.",
    system: [
      "Five-step onboarding wizard: basics, PDF upload, AI extraction review, integrations, and publish",
      "Claude Haiku extraction converts menus, brochures, and price lists into editable business configuration",
      "Runtime registry maps inbound Twilio numbers to the correct tenant and hot-reloads tenant changes from Supabase Realtime",
      "Tenant-safe data model with tenants, tenant_configs, tenant_integrations, onboarding_sessions, usage_logs, messages, chat_state, and pending_orders",
      "Pluggable adapters for inventory, payments, POS, appointment booking, and future vertical-specific tools",
      "AES-256-GCM encrypted per-tenant credentials for integrations like Razorpay, Twilio, Calendly, Google Sheets, and Rista POS",
      "Usage tracking for billing periods, AI invocations, message volume, and token usage",
    ],
    impact:
      "ZapReach OS turns the bakery-style implementation into a repeatable launch system. Instead of rebuilding the same WhatsApp agent stack for every client, ZapLead can provision tenants, personalize their agent from source material, connect approved tools, and operate all clients through one runtime and dashboard model.",
    metrics: [
      { value: "5", label: "onboarding steps" },
      { value: "1", label: "runtime for many businesses" },
      { value: "35", label: "platform tests noted in project plan" },
      { value: "256-bit", label: "credential encryption design" },
    ],
    proofPoints: [
      "Platform architecture includes tenant provisioning, PDF extraction, runtime registry, credential encryption, and usage logging.",
      "The bakery deployment supplies the production pattern for inventory, payments, dashboard control, and WhatsApp conversation handling.",
      "The system is designed to support verticals such as food, salons, real estate, and service businesses with different enabled tools.",
    ],
  },
  {
    id: "marathon-realty-automation",
    company: "Marathon Realty",
    industry: "Real Estate",
    status: "Delivered automation system",
    timeframe: "Implementation project",
    tags: ["Real Estate", "n8n Automation", "WhatsApp", "WATI", "AI Analysis", "Pre-Sales"],
    summary:
      "A pre-sales automation system for real estate inquiries, call transcripts, WhatsApp communication, and AI-assisted analysis.",
    problem:
      "Pre-sales processes relied heavily on manual handling of call transcripts and customer communication. This resulted in operational delays, inconsistent follow-ups, limited analytical insights, and scalability constraints as inquiry volumes grew.",
    system: [
      "Workflow and system architecture design",
      "End-to-end n8n automation for pre-sales call transcripts with AI-based diarisation and analysis",
      "WhatsApp chatbot integration via WATI + n8n with backend logic and frontend conversational flows",
      "Prompt engineering and AI logic configuration",
      "End-to-end testing, troubleshooting, and optimization for scalability",
      "Structured handoff for future expansion",
    ],
    impact:
      "Reduced manual workload, faster customer response times, structured and analyzable pre-sales data, and a scalable communication infrastructure. Marathon Realty transitioned from manual processes to an AI-driven, automation-first workflow.",
    metrics: [
      { value: "48h", label: "pipeline audit window" },
      { value: "AI", label: "transcript analysis layer" },
      { value: "WATI", label: "WhatsApp delivery channel" },
    ],
    proofPoints: [
      "n8n workflows automated pre-sales call transcript processing and AI analysis.",
      "WhatsApp chatbot flows connected customer communication to backend automation logic.",
      "Structured handoff made future expansion easier for the internal team.",
    ],
  },
];

export default function WorkPage() {
  return (
    <>
      {/* JSON-LD for each case study */}
      {caseStudies.map((caseStudy) => (
        <script
          key={caseStudy.id}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CreativeWork",
              name: `${caseStudy.company} — ${caseStudy.industry} Engagement System`,
              description: caseStudy.summary,
              creator: {
                "@type": "Organization",
                name: "ZapLead",
              },
              about: {
                "@type": "Thing",
                name: caseStudy.industry,
              },
              keywords: caseStudy.tags.join(", "),
            }),
          }}
        />
      ))}

      {/* Gradient Animation Background - Fixed to cover entire viewport */}
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
        {/* Header Section */}
        <section className="border-b border-white/[0.1] py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-[#fde8d8]">
                Case Studies: Systems in Production
              </h1>
              <p className="text-lg sm:text-xl text-white/70 max-w-xl mx-auto font-light leading-relaxed">
                How ZapLead builds WhatsApp agents, automation systems, and operating layers that keep revenue conversations moving.
              </p>
            </div>
          </div>
        </section>

        {/* Case Studies */}
        <section className="py-8 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="space-y-6 sm:space-y-10">
              {caseStudies.map((caseStudy) => (
                <Card
                  key={caseStudy.id}
                  id={caseStudy.id}
                  className="scroll-mt-20 liquid-shine"
                >
                  <CardHeader className="p-4 sm:p-6">
                    <div className="mb-3 flex flex-wrap gap-2">
                      {caseStudy.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="glass-badge text-white text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <CardTitle className="text-xl sm:text-2xl text-white">
                      {caseStudy.company}
                    </CardTitle>
                    <p className="text-base text-white/70 font-light">
                      {caseStudy.industry}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2 text-xs text-white/60">
                      <span className="rounded-full border border-white/[0.12] bg-white/[0.05] px-3 py-1">
                        {caseStudy.status}
                      </span>
                      <span className="rounded-full border border-white/[0.12] bg-white/[0.05] px-3 py-1">
                        {caseStudy.timeframe}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6 pt-0 space-y-5 sm:space-y-6">
                    <p className="text-base sm:text-lg leading-relaxed text-white/85 font-light">
                      {caseStudy.summary}
                    </p>

                    {caseStudy.metrics.length > 0 && (
                      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                        {caseStudy.metrics.map((metric) => (
                          <div
                            key={`${caseStudy.id}-${metric.label}`}
                            className="rounded-xl border border-white/[0.1] bg-white/[0.05] p-4"
                          >
                            <div className="text-2xl font-bold bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
                              {metric.value}
                            </div>
                            <div className="mt-1 text-xs leading-relaxed text-white/55">
                              {metric.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    <div>
                      <h3 className="mb-2 text-xs sm:text-sm font-semibold uppercase tracking-wide text-[#fde8d8]/60">
                        Problem
                      </h3>
                      <p className="text-base leading-relaxed text-white/80 font-light">
                        {caseStudy.problem}
                      </p>
                    </div>

                    <div>
                      <h3 className="mb-3 text-xs sm:text-sm font-semibold uppercase tracking-wide text-[#fde8d8]/60">
                        System
                      </h3>
                      <ul className="space-y-2">
                        {caseStudy.system.map((item, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-2 text-base"
                          >
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-400/80" />
                            <span className="leading-relaxed text-white/80 font-light">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-2 border-t border-white/[0.08]">
                      <h3 className="mb-2 text-xs sm:text-sm font-semibold uppercase tracking-wide text-[#fde8d8]/60">
                        Impact
                      </h3>
                      <p className="text-base leading-relaxed text-white font-medium">
                        {caseStudy.impact}
                      </p>
                    </div>

                    <div>
                      <h3 className="mb-3 text-xs sm:text-sm font-semibold uppercase tracking-wide text-[#fde8d8]/60">
                        Proof Points
                      </h3>
                      <ul className="space-y-2">
                        {caseStudy.proofPoints.map((item, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-2 text-base"
                          >
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-300/80" />
                            <span className="leading-relaxed text-white/80 font-light">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
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
