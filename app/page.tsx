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


export default function HomePage() {
  return (
    <>

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
          <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 py-20 sm:py-32 text-center overflow-visible">
            <AnimatedContent delay={0} duration={0.8}>
              <Badge
                variant="outline"
                className="mb-8 glass-badge text-white px-6 py-2.5 text-sm font-medium"
              >
                <Sparkles className="h-4 w-4 mr-2 text-yellow-400 animate-pulse" />
                Lead Response in 5 Seconds, Not 5 Hours
              </Badge>
            </AnimatedContent>

            <AnimatedContent delay={0.15} duration={1}>
              <h1 className="mb-4 sm:mb-6 text-3xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl leading-[1.15] pb-1">
                <span className="bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 bg-clip-text text-transparent drop-shadow-2xl">
                  Your Leads Deserve
                </span>
              </h1>
            </AnimatedContent>

            <AnimatedContent delay={0.3} duration={1}>
              <h1 className="mb-6 sm:mb-8 text-3xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl leading-[1.15] pb-1">
                <span className="bg-gradient-to-r from-pink-200 via-purple-300 to-blue-300 bg-clip-text text-transparent drop-shadow-2xl">
                  Instant Responses
                </span>
              </h1>
            </AnimatedContent>

            <AnimatedContent delay={0.45} duration={0.8} distance={30}>
              <p className="mb-8 sm:mb-12 text-base sm:text-xl md:text-2xl text-white/80 max-w-3xl mx-auto font-light leading-relaxed">
                Most leads go cold in <span className="text-red-400 font-semibold">5 minutes</span>. Our AI responds in <span className="text-green-400 font-semibold">5 seconds</span>—qualifying, booking, and following up while your competitors are still typing.
              </p>
            </AnimatedContent>

            <AnimatedContent delay={0.6} duration={0.8} distance={30}>
              <div className="flex flex-col items-center justify-center gap-3 sm:gap-4 sm:flex-row">
                <Link href="/contact">
                  <Button
                    size="lg"
                    className="bg-white text-black hover:bg-white/90 hover:scale-105 px-8 sm:px-10 py-5 sm:py-6 text-lg sm:text-xl shadow-2xl rounded-full transition-all duration-300 w-full sm:w-auto"
                  >
                    See It Work on Your Leads
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/work">
                  <Button
                    variant="glass"
                    size="lg"
                    className="text-white px-8 sm:px-10 py-5 sm:py-6 text-lg sm:text-xl rounded-full w-full sm:w-auto"
                  >
                    Read 2 min demo
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </AnimatedContent>
          </div>
        </section>

        {/* The Problem Section */}
        <section className="py-16 sm:py-24 relative">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <ScrollBlurReveal>
              <div className="mb-16 text-center">
                <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl text-white">
                  <DecryptedText
                    text="Every Hour, You're Losing ₹12,500"
                    animateOn="view"
                    sequential={true}
                    revealDirection="start"
                    speed={80}
                    className="text-white"
                    encryptedClassName="text-white/40"
                  />
                </h2>
                <p className="text-lg text-white/70 max-w-2xl mx-auto">
                  65% of your leads go cold before your team replies. That&apos;s not a sales problem—it&apos;s a speed problem.
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
                <h2 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl text-white">
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
                <p className="text-xl text-white/70 max-w-2xl mx-auto">
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

        {/* How It Works Section */}
        <section className="py-16 sm:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <ScrollBlurReveal>
              <div className="mb-20 text-center">
                <AnimatedContent delay={0} duration={0.8}>
                  <h2 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-white">
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
                      <p className="text-base text-white/80 leading-relaxed">
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
                      <p className="text-base text-white/80 leading-relaxed">
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
                      <p className="text-base text-white/80 leading-relaxed">
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

        {/* What's Inside Section */}
        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <ScrollBlurReveal>
              <div className="mb-16 text-center">
                <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl text-white">
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
                <p className="text-lg text-white/70">
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
                        <span className="text-sm text-white/80">
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

        {/* Selected Work Section */}
        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <ScrollBlurReveal>
              <div className="mb-16 text-center">
                <AnimatedContent delay={0} duration={0.8}>
                  <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl text-white">
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
                  <p className="text-lg text-white/70">
                    See how Indian businesses are booking 3x more meetings with zero extra headcount.
                  </p>
                </AnimatedContent>
              </div>
            </ScrollBlurReveal>

            <ScrollBlurReveal>
              <div className="max-w-2xl mx-auto">
                <AnimatedContent delay={0} duration={0.8} distance={50}>
                  <SpotlightCard className="h-full" spotlightColor="rgba(124, 58, 237, 0.3)">
                    <Card className="glass-card liquid-shine h-full transform-gpu">
                      <CardHeader>
                        <div className="flex flex-wrap gap-2 mb-3">
                          <Badge variant="outline" className="w-fit glass-badge text-white text-xs">
                            Real Estate
                          </Badge>
                          <Badge variant="outline" className="w-fit glass-badge text-white text-xs">
                            n8n Automation
                          </Badge>
                          <Badge variant="outline" className="w-fit glass-badge text-white text-xs">
                            WhatsApp
                          </Badge>
                        </div>
                        <CardTitle className="text-white text-2xl">Marathon Realty</CardTitle>
                        <p className="text-sm text-white/60 mt-1">Implementation Partner: Zaplead Solutions</p>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-sm text-white/70 leading-relaxed">
                          Modernized pre-sales operations through workflow automation and AI-driven analysis—reducing manual effort, improving response times, and building a scalable system for customer interactions.
                        </p>
                        <p className="text-sm text-white font-medium">
                          Reduced manual workload • Faster response times • Scalable AI-driven workflow
                        </p>
                        <Link
                          href="/work#marathon-realty-automation"
                          className="inline-flex items-center gap-2 text-sm text-white font-medium transition-all hover:gap-3"
                        >
                          View case <ArrowRight className="h-3 w-3" />
                        </Link>
                      </CardContent>
                    </Card>
                  </SpotlightCard>
                </AnimatedContent>
              </div>

              <div className="mt-12 text-center">
                <Link href="/work">
                  <Button variant="ghost" className="glass-button text-white px-8 py-6 text-lg">
                    See All Case Studies <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
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
                  <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl text-white">
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
                    <h3 className="mb-3 text-xl font-semibold text-white">AI Does the Busywork</h3>
                    <p className="text-sm text-white/70 leading-relaxed">
                      Your AI handles inquiries, objections, and scheduling. Your team shows up ready to close—with full conversation context.
                    </p>
                  </div>
                </AnimatedContent>

                <AnimatedContent delay={0.2} duration={0.8} distance={50}>
                  <div className="text-center glass-card liquid-shine rounded-2xl p-8 transform-gpu">
                    <h3 className="mb-3 text-xl font-semibold text-white">
                      Meetings Just Appear on Calendars
                    </h3>
                    <p className="text-sm text-white/70 leading-relaxed">
                      Forget &apos;when are you free?&apos; — leads pick a slot, it lands on your calendar, they get a WhatsApp reminder. Done.
                    </p>
                  </div>
                </AnimatedContent>

                <AnimatedContent delay={0.4} duration={0.8} distance={50}>
                  <div className="text-center glass-card liquid-shine rounded-2xl p-8 transform-gpu">
                    <h3 className="mb-3 text-xl font-semibold text-white">
                      See What&apos;s Actually Converting
                    </h3>
                    <p className="text-sm text-white/70 leading-relaxed">
                      Which campaigns drive bookings? Where do leads ghost you? Know in 60 seconds, not 6 meetings.
                    </p>
                  </div>
                </AnimatedContent>
              </div>

              <AnimatedContent delay={0.6} duration={0.8}>
                <div className="text-center">
                  <h3 className="mb-6 text-2xl sm:text-3xl font-bold text-white">
                    Ready to 3x Your Bookings?
                  </h3>
                  <Link href="/contact">
                    <Button size="lg" className="bg-white text-black hover:bg-white/90 hover:scale-105 px-10 py-6 text-xl shadow-2xl rounded-full transition-all duration-300">
                      Get Your Free Pipeline Audit <ArrowRight className="h-5 w-5 ml-2" />
                    </Button>
                  </Link>
                </div>
              </AnimatedContent>
            </ScrollBlurReveal>
          </div>
        </section>
      </div>
    </>
  );
}
