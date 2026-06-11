"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import SpotlightCard from "@/components/SpotlightCard";
import AnimatedContent from "@/components/AnimatedContent";
import ScrollBlurReveal from "@/components/ScrollBlurReveal";
import DecryptedText from "@/components/DecryptedText";
import PipelineLeakage from "@/components/infographics/PipelineLeakage";
import ZapleadSolution from "@/components/infographics/ZapleadSolution";
import AIPlayground from "@/components/interactive/AIPlayground";
import LogosMarquee from "@/components/LogosMarquee";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import { createFaqJsonLd, homeFaqs } from "@/lib/seo";

const selectedWork = [
  {
    href: "/work#bonnies-bakery-whatsapp-agent",
    title: "Bonnies Bakery",
    meta: "WhatsApp ordering agent + owner dashboard",
    tags: ["WhatsApp AI", "Rista POS", "Razorpay"],
    description:
      "A production bakery assistant that checks stock, answers customers, creates payment links, and gives the owner a live dashboard for chat takeover and analytics.",
    result: "20,123 messages • 1,248 active customers • 87 completed paid orders across 2 months",
  },
  {
    href: "/work#ssa-project-apollo-ringg-pipeline",
    title: "SSA Project",
    meta: "Apollo to Ringg outbound automation",
    tags: ["Apollo", "Ringg AI", "Supabase"],
    description:
      "A cron-driven lead pipeline that pulls Apollo saved lists, deduplicates against Supabase, builds Ringg-ready CSV batches, and starts outbound AI-calling campaigns automatically.",
    result: "Apollo pull • dedup + CSV transform • Ringg campaign start + run logs",
  },
  {
    href: "/work#marathon-realty-automation",
    title: "Marathon Realty",
    meta: "Pre-sales automation and AI analysis",
    tags: ["Real Estate", "n8n", "WATI"],
    description:
      "Workflow automation for pre-sales transcripts, WhatsApp communication, AI analysis, and scalable handoff across high-volume inquiry flows.",
    result: "Reduced manual workload • faster response times • analyzable pre-sales data",
  },
];

const leadAutomationFacts = [
  {
    title: "ZapLead builds AI lead engagement systems.",
    body: "The system captures inquiries, asks qualification questions, updates CRM records, and routes sales-ready leads.",
  },
  {
    title: "ZapLead connects WhatsApp, web forms, DMs, CRM, and calendars.",
    body: "Every lead keeps its source, conversation context, next step, and owner in one pipeline.",
  },
  {
    title: "ZapLead helps teams reduce manual follow-up gaps.",
    body: "AI agents handle repeated questions and reminders while humans take over the conversations that need judgment.",
  },
];

const homeFaqJsonLd = createFaqJsonLd(homeFaqs);

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeFaqJsonLd) }}
      />

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
        {/* Subtle overlay to tone down brightness - pointer-events-none to let clicks through */}
        <div className="absolute inset-0 bg-black/30 pointer-events-none" />
      </div>

      <div className="relative z-10 min-h-screen">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">

          {/* Content */}
          <div className="relative z-10 mx-auto max-w-6xl px-4 pt-24 pb-20 sm:px-6 sm:py-32 text-center overflow-visible">
            <AnimatedContent delay={0} duration={0.8}>
              <Badge
                variant="outline"
                className="mb-8 glass-badge text-white px-6 py-2.5 text-sm font-medium"
              >
                <Sparkles className="h-4 w-4 mr-2 text-yellow-400 animate-pulse" />
                AI lead pipeline automation for WhatsApp + web
              </Badge>
            </AnimatedContent>

            <AnimatedContent delay={0.15} duration={1}>
              <h1 className="mb-6 sm:mb-8 text-3xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl leading-[1.15] pb-1 text-[#fde8d8]"
                style={{ textShadow: "0 0 60px rgba(255,255,255,0.3), 0 0 120px rgba(82,39,255,0.2)" }}
              >
                AI Lead Pipeline Automation
                <span className="block italic">For Instant Responses</span>
              </h1>
            </AnimatedContent>

            <AnimatedContent delay={0.45} duration={0.8} distance={30}>
              <p className="mb-8 sm:mb-12 text-base sm:text-xl md:text-2xl text-white/80 max-w-3xl mx-auto font-light leading-relaxed">
                ZapLead builds AI agents and workflow systems that capture,
                qualify, route, follow up with, and book high-intent leads.
              </p>
            </AnimatedContent>

            <AnimatedContent delay={0.6} duration={0.8} distance={30}>
              <div className="flex w-full flex-col items-center justify-center gap-3 sm:gap-4 sm:flex-row">
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-black hover:bg-white/90 hover:scale-105 px-8 sm:px-10 py-5 sm:py-6 text-lg sm:text-xl shadow-2xl rounded-full transition-all duration-300 w-full sm:w-auto"
                >
                  <Link href="/contact" className="w-full sm:w-auto">
                    See It Work on Your Leads
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="glass"
                  size="lg"
                  className="text-white px-8 sm:px-10 py-5 sm:py-6 text-lg sm:text-xl rounded-full w-full sm:w-auto"
                >
                  <Link href="/work" className="w-full sm:w-auto">
                    View Case Studies
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </AnimatedContent>
          </div>
        </section>

        {/* The Problem Section */}
        <section className="py-16 sm:py-24 relative">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <ScrollBlurReveal>
              <div className="mb-16 text-center">
                <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl text-[#fde8d8]">
                  <DecryptedText
                    text="Lead Pipelines Break When Follow-Up Is Slow"
                    animateOn="view"
                    sequential={true}
                    revealDirection="start"
                    speed={80}
                    className="text-white"
                    encryptedClassName="text-white/40"
                  />
                </h2>
                <p className="text-xl sm:text-2xl text-white/70 max-w-2xl mx-auto">
                  ZapLead keeps lead context, qualification, routing, and booking
                  connected so sales teams do not rebuild the same information manually.
                </p>
              </div>

              <div className="mt-12">
                <PipelineLeakage />
              </div>
            </ScrollBlurReveal>
          </div>
        </section>

        {/* AI Playground Section */}
        <section className="py-16 sm:py-24 relative overflow-hidden">
          {/* Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="mx-auto max-w-7xl px-4 sm:px-6 relative z-10">
            <ScrollBlurReveal>
              <div className="mb-16 text-center">
                <Badge variant="outline" className="mb-6 glass-badge text-blue-300 border-blue-500/30 px-4 py-1.5">
                  <Sparkles className="h-3 w-3 mr-2 animate-pulse" />
                  Live Interactive Demo
                </Badge>
                <h2 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl text-[#fde8d8]">
                  <DecryptedText
                    text="Chat With Our AI Right Now"
                    animateOn="view"
                    sequential={true}
                    revealDirection="center"
                    speed={80}
                    className="text-white"
                    encryptedClassName="text-white/40"
                  />
                </h2>
                <p className="text-xl sm:text-2xl text-white/70 max-w-2xl mx-auto">
                  This is the same AI your leads would talk to. <span className="text-blue-400 font-semibold">Ask anything</span>—pricing, availability, objections. Time the response.
                </p>
              </div>

              <div className="mt-8">
                <AIPlayground />
              </div>
            </ScrollBlurReveal>
          </div>
        </section>

        {/* Logos Marquee Section */}
        <LogosMarquee />

        {/* AI Lead Automation Facts */}
        <section className="pt-14 pb-10 sm:pt-20 sm:pb-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <ScrollBlurReveal>
              <div className="mb-12 text-center">
                <AnimatedContent delay={0} duration={0.8}>
                  <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl text-[#fde8d8]">
                    <DecryptedText
                      text="What ZapLead Does"
                      animateOn="view"
                      sequential={true}
                      revealDirection="start"
                      speed={80}
                      className="text-white"
                      encryptedClassName="text-white/40"
                    />
                  </h2>
                </AnimatedContent>
                <AnimatedContent delay={0.2} duration={0.8}>
                  <p className="mx-auto max-w-3xl text-lg sm:text-xl text-white/70 font-light">
                    ZapLead builds AI lead pipeline automation for teams that need
                    faster response, cleaner qualification, and better sales handoff.
                  </p>
                </AnimatedContent>
              </div>
            </ScrollBlurReveal>

            <ScrollBlurReveal>
              <div className="grid gap-6 md:grid-cols-3">
                {leadAutomationFacts.map((fact, index) => (
                  <AnimatedContent key={fact.title} delay={index * 0.15} duration={0.8} distance={40}>
                    <Card className="glass-card liquid-shine h-full transform-gpu">
                      <CardHeader>
                        <CardTitle className="text-xl text-white">{fact.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-base leading-relaxed text-white/75 font-light">
                          {fact.body}
                        </p>
                      </CardContent>
                    </Card>
                  </AnimatedContent>
                ))}
              </div>

              <div className="mt-8 text-center">
                <Link
                  href="/ai-lead-automation"
                  className="inline-flex items-center gap-2 text-sm font-medium text-white transition-all hover:gap-3"
                >
                  Read the AI lead automation guide <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </ScrollBlurReveal>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="pt-14 pb-10 sm:pt-24 sm:pb-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <ScrollBlurReveal>
              <div className="mb-20 text-center">
                <AnimatedContent delay={0} duration={0.8}>
                  <h2 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-[#fde8d8]">
                    <DecryptedText
                      text="From Lead to Meeting in 3 Steps"
                      animateOn="view"
                      sequential={true}
                      revealDirection="start"
                      speed={80}
                      className="text-white"
                      encryptedClassName="text-white/40"
                    />
                  </h2>
                </AnimatedContent>
                <AnimatedContent delay={0.2} duration={0.8}>
                  <p className="text-xl sm:text-2xl text-white/70 font-light">
                    We build, deploy, and optimize—you just close deals.
                  </p>
                </AnimatedContent>
              </div>
            </ScrollBlurReveal>

            <ScrollBlurReveal>
              <div className="grid gap-6 md:grid-cols-3 mb-16">
                <AnimatedContent delay={0} duration={0.8} distance={50}>
                  <Card className="glass-card-enhanced liquid-shine h-full group transform-gpu">
                    <CardHeader className="pb-4">
                      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-400 to-purple-500 text-white shadow-[0_8px_24px_0_rgba(79,70,229,0.4)] group-hover:scale-110 group-hover:shadow-[0_12px_32px_0_rgba(79,70,229,0.5)] transition-all duration-300">
                        <span className="text-2xl font-bold">1</span>
                      </div>
                      <CardTitle className="text-white text-2xl font-bold">1. We Audit Your Pipeline</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-lg text-white/80 leading-relaxed">
                        We analyze where leads come from, where they drop off, and what&apos;s costing you money. Takes 48 hours, not weeks.
                      </p>
                    </CardContent>
                  </Card>
                </AnimatedContent>

                <AnimatedContent delay={0.2} duration={0.8} distance={50}>
                  <Card className="glass-card-enhanced liquid-shine h-full group transform-gpu">
                    <CardHeader className="pb-4">
                      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-400 to-pink-500 text-white shadow-[0_8px_24px_0_rgba(124,58,237,0.4)] group-hover:scale-110 group-hover:shadow-[0_12px_32px_0_rgba(124,58,237,0.5)] transition-all duration-300">
                        <span className="text-2xl font-bold">2</span>
                      </div>
                      <CardTitle className="text-white text-2xl font-bold">2. We Deploy Your AI Agent</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-lg text-white/80 leading-relaxed">
                        Your AI goes live on web + WhatsApp, connected to your CRM and calendar. Zero code changes on your end.
                      </p>
                    </CardContent>
                  </Card>
                </AnimatedContent>

                <AnimatedContent delay={0.4} duration={0.8} distance={50}>
                  <Card className="glass-card-enhanced liquid-shine h-full group transform-gpu">
                    <CardHeader className="pb-4">
                      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-400 to-blue-500 text-white shadow-[0_8px_24px_0_rgba(236,72,153,0.4)] group-hover:scale-110 group-hover:shadow-[0_12px_32px_0_rgba(236,72,153,0.5)] transition-all duration-300">
                        <span className="text-2xl font-bold">3</span>
                      </div>
                      <CardTitle className="text-white text-2xl font-bold">3. We Optimize Weekly</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-lg text-white/80 leading-relaxed">
                        Every week we analyze conversations, fix drop-offs, and improve close rates. You get a dashboard, not homework.
                      </p>
                    </CardContent>
                  </Card>
                </AnimatedContent>
              </div>

              <div className="mt-12">
                <ZapleadSolution />
              </div>
            </ScrollBlurReveal>
          </div>
        </section>

        {/* Selected Work Section */}
        <section className="pt-10 pb-12 sm:pt-14 sm:pb-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <ScrollBlurReveal>
              <div className="mb-10 sm:mb-12 text-center">
                <AnimatedContent delay={0} duration={0.8}>
                  <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl text-[#fde8d8]">
                    <DecryptedText
                      text="Real Results, Real Numbers"
                      animateOn="view"
                      sequential={true}
                      revealDirection="start"
                      speed={80}
                      className="text-white"
                      encryptedClassName="text-white/40"
                    />
                  </h2>
                </AnimatedContent>
                <AnimatedContent delay={0.2} duration={0.8}>
                  <p className="text-xl sm:text-2xl text-white/70">
                    Production systems we have built for WhatsApp ordering, AI automation, and repeatable agent deployment.
                  </p>
                </AnimatedContent>
              </div>
            </ScrollBlurReveal>

            <ScrollBlurReveal>
              <div className="grid gap-6 lg:grid-cols-3">
                {selectedWork.map((work, index) => (
                  <AnimatedContent key={work.href} delay={index * 0.15} duration={0.8} distance={50}>
                    <SpotlightCard className="h-full" spotlightColor="rgba(124, 58, 237, 0.3)">
                      <Card className="glass-card liquid-shine h-full transform-gpu">
                        <CardHeader>
                          <div className="mb-3 flex flex-wrap gap-2">
                            {work.tags.map((tag) => (
                              <Badge key={tag} variant="outline" className="w-fit glass-badge text-white text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <CardTitle className="text-white text-2xl">{work.title}</CardTitle>
                          <p className="mt-1 text-sm text-white/60">{work.meta}</p>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <p className="text-base sm:text-lg text-white/70 leading-relaxed">
                            {work.description}
                          </p>
                          <p className="text-base sm:text-lg text-white font-medium">
                            {work.result}
                          </p>
                          <Link
                            href={work.href}
                            className="inline-flex items-center gap-2 text-sm text-white font-medium transition-all hover:gap-3"
                          >
                            View case <ArrowRight className="h-3 w-3" />
                          </Link>
                        </CardContent>
                      </Card>
                    </SpotlightCard>
                  </AnimatedContent>
                ))}
              </div>

              <div className="mt-10 text-center">
                <Button asChild variant="ghost" className="glass-button text-white px-8 py-6 text-lg">
                  <Link href="/work">
                    See All Case Studies <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </ScrollBlurReveal>
          </div>
        </section>

        {/* What's Inside Section */}
        <section className="pt-10 pb-16 sm:pt-14 sm:pb-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <ScrollBlurReveal>
              <div className="mb-16 text-center">
                <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl text-[#fde8d8]">
                  <DecryptedText
                    text="Everything Your Sales Team Wishes They Had"
                    animateOn="view"
                    sequential={true}
                    revealDirection="start"
                    speed={80}
                    className="text-white"
                    encryptedClassName="text-white/40"
                  />
                </h2>
                <p className="text-xl sm:text-2xl text-white/70">
                  One system that handles the grunt work so your team handles closings.
                </p>
              </div>

              <div className="mx-auto max-w-3xl">
                <div className="frosted-glass rounded-2xl p-8 transform-gpu">
                  <ul className="grid gap-4 sm:grid-cols-2">
                    {[
                      "Capture: Web forms + WhatsApp + Instagram DM—leads can't slip through",
                      "Qualify: AI scores by budget, timeline, and intent—not guesswork",
                      "Enrich: Auto-tags UTM source and dedupes—clean data, always",
                      "Route: Assigns to the right rep instantly—no manual sorting",
                      "Book: Puts meetings on calendars automatically—no back-and-forth",
                      "Follow-up: WhatsApp/Email drips with smart retries—no lead left behind",
                      "Sync: Two-way CRM sync + full conversation transcripts",
                      "Analyze: See exactly where leads convert or drop off",
                    ].map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-white" />
                        <span className="text-base sm:text-lg text-white/80">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </ScrollBlurReveal>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="pt-10 pb-16 sm:pt-14 sm:pb-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <ScrollBlurReveal>
              <div className="mb-12 text-center">
                <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl text-[#fde8d8]">
                  <DecryptedText
                    text="AI Lead Automation FAQ"
                    animateOn="view"
                    sequential={true}
                    revealDirection="start"
                    speed={80}
                    className="text-white"
                    encryptedClassName="text-white/40"
                  />
                </h2>
                <p className="mx-auto max-w-2xl text-lg text-white/70 font-light">
                  Direct answers about ZapLead, WhatsApp AI agents, CRM automation,
                  and sales pipeline handoff.
                </p>
              </div>

              <div className="space-y-4">
                {homeFaqs.map((item) => (
                  <Card key={item.question} className="glass-card liquid-shine">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-xl text-white">{item.question}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-base leading-relaxed text-white/75 font-light">
                        {item.answer}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollBlurReveal>
          </div>
        </section>

        {/* Why ZapLead Section */}
        <section className="py-16 sm:py-24 pb-20 sm:pb-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <ScrollBlurReveal>
              <div className="mb-16 text-center">
                <AnimatedContent delay={0} duration={0.8}>
                  <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl text-[#fde8d8]">
                    <DecryptedText
                      text="Why ZapLead"
                      animateOn="view"
                      sequential={true}
                      revealDirection="start"
                      speed={80}
                      className="text-white"
                      encryptedClassName="text-white/40"
                    />
                  </h2>
                </AnimatedContent>
              </div>
            </ScrollBlurReveal>

            <ScrollBlurReveal>
              <div className="grid gap-8 md:grid-cols-3 mb-16">
                <AnimatedContent delay={0} duration={0.8} distance={50}>
                  <div className="text-center glass-card liquid-shine rounded-2xl p-8 transform-gpu">
                    <h3 className="mb-3 text-xl font-semibold text-[#fde8d8]">AI Does the Busywork</h3>
                    <p className="text-base sm:text-lg text-white/70 leading-relaxed">
                      Your AI handles inquiries, objections, and scheduling. Your team shows up ready to close—with full conversation context.
                    </p>
                  </div>
                </AnimatedContent>

                <AnimatedContent delay={0.2} duration={0.8} distance={50}>
                  <div className="text-center glass-card liquid-shine rounded-2xl p-8 transform-gpu">
                    <h3 className="mb-3 text-xl font-semibold text-[#fde8d8]">
                      Meetings Just Appear on Calendars
                    </h3>
                    <p className="text-base sm:text-lg text-white/70 leading-relaxed">
                      Forget &apos;when are you free?&apos; — leads pick a slot, it lands on your calendar, they get a WhatsApp reminder. Done.
                    </p>
                  </div>
                </AnimatedContent>

                <AnimatedContent delay={0.4} duration={0.8} distance={50}>
                  <div className="text-center glass-card liquid-shine rounded-2xl p-8 transform-gpu">
                    <h3 className="mb-3 text-xl font-semibold text-[#fde8d8]">
                      See What&apos;s Actually Converting
                    </h3>
                    <p className="text-base sm:text-lg text-white/70 leading-relaxed">
                      Which campaigns drive bookings? Where do leads ghost you? Know in 60 seconds, not 6 meetings.
                    </p>
                  </div>
                </AnimatedContent>
              </div>

              <AnimatedContent delay={0.6} duration={0.8}>
                <div className="text-center">
                  <h3 className="mb-6 text-2xl sm:text-3xl font-bold text-[#fde8d8]">
                    Ready to Find the Gaps in Your Pipeline?
                  </h3>
                  <Button asChild size="lg" className="bg-white text-black hover:bg-white/90 hover:scale-105 px-10 py-6 text-xl shadow-2xl rounded-full transition-all duration-300">
                    <Link href="/contact">
                      Get Your Free Pipeline Audit <ArrowRight className="h-5 w-5 ml-2" />
                    </Link>
                  </Button>
                </div>
              </AnimatedContent>
            </ScrollBlurReveal>
          </div>
        </section>
      </div>
    </>
  );
}
