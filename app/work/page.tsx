"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";

interface CaseStudy {
  id: string;
  company: string;
  industry: string;
  tags: string[];
  problem: string;
  system: string[];
  impact: string;
}

const caseStudies: CaseStudy[] = [
  {
    id: "marathon-realty-automation",
    company: "Marathon Realty",
    industry: "Real Estate",
    tags: ["Real Estate", "n8n Automation", "WhatsApp", "WATI", "AI Analysis", "Pre-Sales"],
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
      "**Reduced manual workload, faster customer response times, structured and analyzable pre-sales data, and a scalable communication infrastructure.** Marathon Realty transitioned from manual processes to an AI-driven, automation-first workflow.",
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
              description: caseStudy.problem,
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
              <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-white">
                Case Studies: Real Results
              </h1>
              <p className="text-base sm:text-lg text-white/70 max-w-xl mx-auto">
                How Indian businesses are closing more deals with less busywork.
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
                    <p className="text-sm text-white/70">
                      {caseStudy.industry}
                    </p>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6 pt-0 space-y-5 sm:space-y-6">
                    <div>
                      <h3 className="mb-2 text-xs sm:text-sm font-semibold uppercase tracking-wide text-white/60">
                        Problem
                      </h3>
                      <p className="text-sm leading-relaxed text-white/80">
                        {caseStudy.problem}
                      </p>
                    </div>

                    <div>
                      <h3 className="mb-3 text-xs sm:text-sm font-semibold uppercase tracking-wide text-white/60">
                        System
                      </h3>
                      <ul className="space-y-2">
                        {caseStudy.system.map((item, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-2 text-sm"
                          >
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-400/80" />
                            <span className="leading-relaxed text-white/80">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-2 border-t border-white/[0.08]">
                      <h3 className="mb-2 text-xs sm:text-sm font-semibold uppercase tracking-wide text-white/60">
                        Impact
                      </h3>
                      <p className="text-sm leading-relaxed text-white font-medium">
                        {caseStudy.impact}
                      </p>
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
