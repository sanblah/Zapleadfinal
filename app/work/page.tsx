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
    id: "bonnies-bakery-whatsapp-agent",
    company: "Bonnies Bakery",
    industry: "Bakery / WhatsApp Ordering",
    status: "Live in production",
    timeframe: "Two-month production window: Apr 4-Jun 4, 2026",
    tags: ["WhatsApp AI", "Twilio", "Supabase", "Rista POS", "Razorpay", "Owner Dashboard"],
    summary:
      "A production WhatsApp ordering assistant and owner dashboard for Bonnies Bakery in Mulund, built to answer product questions, check live stock, take prepaid orders, and give the owner a live control room.",
    problem:
      "Bonnies Bakery's customers already ordered through WhatsApp, but the channel depended on fast human replies during rushes, after hours, and across Hindi, English, Marathi, and Hinglish. Routine questions about stock, price, delivery, and payment consumed owner time, while slow replies or wrong information risked lost orders.",
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
    id: "ssa-project-apollo-ringg-pipeline",
    company: "SSA Project",
    industry: "Outbound Lead Pipeline / AI Calling Ops",
    status: "v1 automation pipeline",
    timeframe: "Spec approved May 25, 2026",
    tags: ["Apollo", "Ringg AI", "Supabase", "Render Cron", "Python", "YAML Campaigns"],
    summary:
      "A cron-driven Apollo-to-Ringg pipeline that pulls leads from a saved Apollo list, deduplicates them against Supabase, builds a Ringg-compatible CSV, starts the outbound AI-calling campaign, and logs every run for auditability.",
    problem:
      "Outbound calling operations were dependent on manual list exports, spreadsheet cleanup, no-phone filtering, Ringg uploads, and remembering who had already been called. That made campaign execution slow, error-prone, and hard to audit after the fact.",
    system: [
      "Three-layer architecture: markdown directives, Python orchestration, and deterministic execution scripts",
      "Apollo saved-list puller with extra filters, pagination, and exponential-backoff retries",
      "Supabase-backed dedup layer that checks `called_leads` before any lead is re-queued for calling",
      "CSV builder that drops no-phone leads and maps normalized Apollo fields into Ringg's upload schema",
      "Ringg integration that uploads the CSV, triggers `/campaign/start`, and only marks leads called after a successful start",
      "Per-run audit logging in Supabase `campaign_runs`, plus per-campaign YAML configs and a dry-run mode for safe staging",
    ],
    impact:
      "SSA Project turns outbound AI calling from a manual ops task into a reproducible cron job. Once a campaign config is set, one run can pull leads, remove duplicates, skip bad phone records, hand the batch to Ringg, and leave behind a queryable run log for debugging and reporting.",
    metrics: [
      { value: "3", label: "system layers in the repo architecture" },
      { value: "2", label: "Supabase tables tracking leads and run history" },
      { value: "5x", label: "Apollo retry budget on HTTP/rate-limit failures" },
      { value: "3x", label: "Ringg retry budget on upload/start failures" },
    ],
    proofPoints: [
      "The repo's approved design spec explicitly defines a cron-triggered Apollo -> dedup -> CSV -> Ringg -> Supabase flow.",
      "The sample campaign config `configs/campaigns/saas_demo_us.yaml` shows list-based Apollo sourcing, Ringg campaign mapping, and a dry-run mode.",
      "Tests cover Apollo pagination, dedup behavior, CSV generation, Ringg upload/start behavior, and end-to-end run orchestration.",
      "The initial migration creates `called_leads` and `campaign_runs`, which gives the pipeline durable audit state instead of spreadsheet memory.",
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
