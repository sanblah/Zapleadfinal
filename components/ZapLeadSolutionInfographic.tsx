"use client";

import React from 'react';
import { Bot, Sparkles, CheckCircle2, ArrowRight, Zap, Target, TrendingUp } from 'lucide-react';
import { GlassEffect } from "@/components/ui/liquid-glass";

export const ZapLeadSolutionInfographic: React.FC = () => {
  // SVG Person Component
  const PersonIcon = ({ opacity = 1, fill = "currentColor" }: { opacity?: number; fill?: string }) => (
    <svg
      width="24"
      height="40"
      viewBox="0 0 24 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ opacity }}
    >
      <circle cx="12" cy="6" r="5" fill={fill} />
      <path
        d="M12 13C7 13 4 16 4 20V35C4 37 5 38 7 38H17C19 38 20 37 20 35V20C20 16 17 13 12 13Z"
        fill={fill}
      />
    </svg>
  );

  const renderPeopleGrid = (total: number, active: number, color: string = "#60a5fa") => {
    const rows = 4;
    const cols = Math.ceil(total / rows);

    return (
      <div className="flex flex-col gap-2 items-center justify-center min-h-[160px]">
        {Array.from({ length: rows }).map((_, rowIdx) => (
          <div key={rowIdx} className="flex gap-2">
            {Array.from({ length: cols }).map((_, colIdx) => {
              const index = rowIdx * cols + colIdx;
              if (index >= total) return null;
              const isActive = index < active;
              return (
                <div key={colIdx} className="transition-all duration-500">
                  <PersonIcon
                    opacity={isActive ? 1 : 0.2}
                    fill={isActive ? color : "#4b5563"}
                  />
                </div>
              );
            })}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto py-12">
      {/* Title */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-4 mb-6 bg-gradient-to-r from-blue-950/60 to-purple-950/60 px-8 py-4 rounded-2xl border-2 border-blue-500/30">
          <div className="relative">
            <div className="h-14 w-14 rounded-full bg-blue-500/20 flex items-center justify-center animate-pulse">
              <Bot className="h-8 w-8 text-blue-400" />
            </div>
            <div className="absolute -top-1 -right-1">
              <Sparkles className="h-5 w-5 text-yellow-400 animate-pulse" />
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">AI-Powered</span> ZapLead: <span className="text-green-400">92%</span> Conversion
          </h2>
        </div>
        <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto">
          Our <span className="text-blue-400 font-bold">AI agents</span> work 24/7 to turn <span className="text-green-400 font-bold">100 leads into 92+ meetings</span>
        </p>
      </div>

      {/* Horizontal Flow with Connection Line */}
      <div className="relative mb-16">
        {/* Connection Line */}
        <div className="hidden md:block absolute top-32 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-green-500"
          style={{ top: '140px' }} />

        <div className="grid md:grid-cols-4 gap-6 relative z-10">
          {/* Stage 1: AI Instant Response */}
          <GlassEffect className="rounded-3xl p-6 border-2 border-blue-400/40 relative overflow-hidden bg-gradient-to-br from-blue-950/40 to-blue-900/40 hover:scale-105 transition-transform duration-300">
            <div className="absolute top-4 right-4">
              <div className="relative">
                <Zap className="h-10 w-10 text-blue-400 animate-pulse" />
                <Sparkles className="h-4 w-4 text-yellow-400 absolute -top-1 -right-1 animate-pulse" />
              </div>
            </div>
            <div className="relative z-10">
              <div className="text-center mb-4">
                <div className="inline-flex items-center gap-2 mb-2">
                  <Bot className="h-6 w-6 text-blue-400" />
                  <p className="text-xs font-bold text-blue-400 uppercase">AI Agent</p>
                </div>
                <div className="text-6xl font-black bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                  100
                </div>
                <h4 className="text-xl font-bold text-white mb-1">Instant Response</h4>
                <p className="text-sm text-blue-300 font-semibold">&lt;2 min reply time</p>
              </div>

              {renderPeopleGrid(25, 25, "#60a5fa")}

              <div className="mt-4 pt-4 border-t border-blue-400/20 space-y-2">
                <p className="text-xs text-white/80 flex items-center gap-2">
                  <CheckCircle2 className="h-3 w-3 text-green-400" />
                  24/7 AI availability
                </p>
                <p className="text-xs text-white/80 flex items-center gap-2">
                  <CheckCircle2 className="h-3 w-3 text-green-400" />
                  Multi-channel capture
                </p>
              </div>
            </div>
          </GlassEffect>

          {/* Stage 2: AI Qualification */}
          <GlassEffect className="rounded-3xl p-6 border-2 border-purple-400/40 relative overflow-hidden bg-gradient-to-br from-purple-950/40 to-purple-900/40 hover:scale-105 transition-transform duration-300">
            <div className="absolute top-4 right-4">
              <div className="relative">
                <Target className="h-10 w-10 text-purple-400 animate-pulse" />
                <Sparkles className="h-4 w-4 text-yellow-400 absolute -top-1 -right-1 animate-pulse" />
              </div>
            </div>
            <div className="relative z-10">
              <div className="text-center mb-4">
                <div className="inline-flex items-center gap-2 mb-2">
                  <Bot className="h-6 w-6 text-purple-400" />
                  <p className="text-xs font-bold text-purple-400 uppercase">AI Scoring</p>
                </div>
                <div className="text-6xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                  98
                </div>
                <h4 className="text-xl font-bold text-white mb-1">Smart Qualify</h4>
                <p className="text-sm text-purple-300 font-semibold">Only 2 not interested</p>
              </div>

              {renderPeopleGrid(25, 24, "#a78bfa")}

              <div className="mt-4 pt-4 border-t border-purple-400/20 space-y-2">
                <p className="text-xs text-white/80 flex items-center gap-2">
                  <CheckCircle2 className="h-3 w-3 text-green-400" />
                  AI intent detection
                </p>
                <p className="text-xs text-white/80 flex items-center gap-2">
                  <CheckCircle2 className="h-3 w-3 text-green-400" />
                  Auto lead scoring
                </p>
              </div>
            </div>
          </GlassEffect>

          {/* Stage 3: AI Booking */}
          <GlassEffect className="rounded-3xl p-6 border-2 border-pink-400/40 relative overflow-hidden bg-gradient-to-br from-pink-950/40 to-pink-900/40 hover:scale-105 transition-transform duration-300">
            <div className="absolute top-4 right-4">
              <div className="relative">
                <Zap className="h-10 w-10 text-pink-400 animate-pulse" />
                <Sparkles className="h-4 w-4 text-yellow-400 absolute -top-1 -right-1 animate-pulse" />
              </div>
            </div>
            <div className="relative z-10">
              <div className="text-center mb-4">
                <div className="inline-flex items-center gap-2 mb-2">
                  <Bot className="h-6 w-6 text-pink-400" />
                  <p className="text-xs font-bold text-pink-400 uppercase">AI Booking</p>
                </div>
                <div className="text-6xl font-black bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent mb-2">
                  95
                </div>
                <h4 className="text-xl font-bold text-white mb-1">Meetings Set</h4>
                <p className="text-sm text-pink-300 font-semibold">3 rescheduled later</p>
              </div>

              {renderPeopleGrid(25, 24, "#f472b6")}

              <div className="mt-4 pt-4 border-t border-pink-400/20 space-y-2">
                <p className="text-xs text-white/80 flex items-center gap-2">
                  <CheckCircle2 className="h-3 w-3 text-green-400" />
                  Calendar auto-sync
                </p>
                <p className="text-xs text-white/80 flex items-center gap-2">
                  <CheckCircle2 className="h-3 w-3 text-green-400" />
                  AI reminder system
                </p>
              </div>
            </div>
          </GlassEffect>

          {/* Stage 4: AI Follow-up */}
          <GlassEffect className="rounded-3xl p-6 border-2 border-green-400/50 relative overflow-hidden bg-gradient-to-br from-green-950/40 to-green-900/40 hover:scale-105 transition-transform duration-300">
            <div className="absolute inset-0 bg-green-500/5" />
            <div className="absolute top-4 right-4">
              <div className="relative">
                <TrendingUp className="h-10 w-10 text-green-400 animate-pulse" />
                <Sparkles className="h-4 w-4 text-yellow-400 absolute -top-1 -right-1 animate-pulse" />
              </div>
            </div>
            <div className="relative z-10">
              <div className="text-center mb-4">
                <div className="inline-flex items-center gap-2 mb-2">
                  <Bot className="h-6 w-6 text-green-400" />
                  <p className="text-xs font-bold text-green-400 uppercase">AI Nurture</p>
                </div>
                <div className="text-6xl font-black bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-2">
                  92
                </div>
                <h4 className="text-xl font-bold text-white mb-1">Showed Up</h4>
                <p className="text-sm text-green-300 font-semibold">3 no-shows recovered</p>
              </div>

              {renderPeopleGrid(25, 23, "#4ade80")}

              <div className="mt-4 pt-4 border-t border-green-400/20 space-y-2">
                <p className="text-xs text-white/80 flex items-center gap-2">
                  <CheckCircle2 className="h-3 w-3 text-green-400" />
                  AI follow-up drips
                </p>
                <p className="text-xs text-white/80 flex items-center gap-2">
                  <CheckCircle2 className="h-3 w-3 text-green-400" />
                  Smart re-engagement
                </p>
              </div>
            </div>
          </GlassEffect>
        </div>
      </div>

      {/* Impact Summary */}
      <GlassEffect className="rounded-3xl p-10 md:p-12 border-2 border-green-500/50 bg-gradient-to-br from-green-950/40 to-emerald-900/30 relative overflow-hidden mb-12">
        <div className="absolute top-0 right-0 w-96 h-96 bg-green-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />

        <div className="relative z-10">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-3 mb-4 bg-green-500/10 px-4 py-2 rounded-full border border-green-500/20">
                <Bot className="h-6 w-6 text-green-400" />
                <p className="text-sm font-bold text-green-400 uppercase">AI-Powered Results</p>
              </div>
              <h3 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">
                From <span className="text-red-400">25%</span> to <span className="text-green-400">92%</span> Conversion
              </h3>
              <p className="text-xl text-white/80 mb-8">
                While competitors lose 75 leads, <span className="text-blue-400 font-bold">AI-powered ZapLead</span> converts 92 out of 100 automatically.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4 bg-green-950/40 p-4 rounded-xl border border-green-500/20">
                  <div className="h-8 w-8 rounded-full bg-green-500/20 flex items-center justify-center shrink-0 mt-1">
                    <CheckCircle2 className="h-5 w-5 text-green-400" />
                  </div>
                  <div>
                    <p className="font-bold text-white text-lg mb-1">AI Responds Instantly</p>
                    <p className="text-white/80">&lt;2 minute response 24/7. <span className="text-green-400 font-semibold">No lead waits.</span></p>
                  </div>
                </div>
                <div className="flex items-start gap-4 bg-green-950/40 p-4 rounded-xl border border-green-500/20">
                  <div className="h-8 w-8 rounded-full bg-green-500/20 flex items-center justify-center shrink-0 mt-1">
                    <CheckCircle2 className="h-5 w-5 text-green-400" />
                  </div>
                  <div>
                    <p className="font-bold text-white text-lg mb-1">AI Qualifies & Books</p>
                    <p className="text-white/80">Auto-scoring, calendar sync, reminders. <span className="text-green-400 font-semibold">Zero manual work.</span></p>
                  </div>
                </div>
                <div className="flex items-start gap-4 bg-green-950/40 p-4 rounded-xl border border-green-500/20">
                  <div className="h-8 w-8 rounded-full bg-green-500/20 flex items-center justify-center shrink-0 mt-1">
                    <CheckCircle2 className="h-5 w-5 text-green-400" />
                  </div>
                  <div>
                    <p className="font-bold text-white text-lg mb-1">AI Never Stops Following Up</p>
                    <p className="text-white/80">Smart drip campaigns across WhatsApp, email, SMS. <span className="text-green-400 font-semibold">Zero leads lost.</span></p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <div className="inline-flex flex-col items-center bg-green-950/60 p-10 rounded-3xl border-2 border-green-500/40">
                <div className="text-9xl font-black bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent leading-none mb-4" style={{ fontSize: '10rem' }}>
                  92
                </div>
                <div className="text-3xl font-bold text-white mb-3">
                  Leads Converted
                </div>
                <div className="text-2xl text-green-400 font-semibold mb-8">
                  Out of Every 100
                </div>
                <div className="bg-green-500/20 border-2 border-green-500/40 px-8 py-5 rounded-2xl w-full">
                  <p className="text-2xl font-black text-white mb-1">
                    = ₹55,20,000 Revenue
                  </p>
                  <p className="text-white/70 mb-3">
                    Every single month
                  </p>
                  <p className="text-sm text-green-300">
                    (at ₹60k average deal value)
                  </p>
                  <div className="mt-4 pt-4 border-t border-green-500/20">
                    <p className="text-lg font-bold text-green-400">
                      <span className="text-3xl">3.7x</span> More Revenue
                    </p>
                    <p className="text-xs text-white/60">vs manual process</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </GlassEffect>

      {/* AI Advantage Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <GlassEffect className="rounded-2xl p-6 border-2 border-blue-400/30 bg-blue-950/20 text-center hover:border-blue-400/50 transition-all hover:scale-105">
          <div className="mb-4 flex justify-center">
            <div className="relative">
              <div className="h-16 w-16 rounded-full bg-blue-500/20 flex items-center justify-center">
                <Bot className="h-10 w-10 text-blue-400" />
              </div>
              <Sparkles className="h-5 w-5 text-yellow-400 absolute -top-1 -right-1 animate-pulse" />
            </div>
          </div>
          <div className="text-4xl font-black text-blue-400 mb-2">24/7</div>
          <h4 className="text-lg font-bold text-white mb-2">AI Never Sleeps</h4>
          <p className="text-white/70 text-sm">While you rest, <span className="text-blue-400 font-semibold">AI captures</span> every 2 AM lead</p>
        </GlassEffect>

        <GlassEffect className="rounded-2xl p-6 border-2 border-purple-400/30 bg-purple-950/20 text-center hover:border-purple-400/50 transition-all hover:scale-105">
          <div className="mb-4 flex justify-center">
            <div className="relative">
              <div className="h-16 w-16 rounded-full bg-purple-500/20 flex items-center justify-center">
                <Target className="h-10 w-10 text-purple-400" />
              </div>
              <Sparkles className="h-5 w-5 text-yellow-400 absolute -top-1 -right-1 animate-pulse" />
            </div>
          </div>
          <div className="text-4xl font-black text-purple-400 mb-2">98%</div>
          <h4 className="text-lg font-bold text-white mb-2">AI Qualification</h4>
          <p className="text-white/70 text-sm"><span className="text-purple-400 font-semibold">AI extracts</span> intent, budget, timeline instantly</p>
        </GlassEffect>

        <GlassEffect className="rounded-2xl p-6 border-2 border-green-400/30 bg-green-950/20 text-center hover:border-green-400/50 transition-all hover:scale-105">
          <div className="mb-4 flex justify-center">
            <div className="relative">
              <div className="h-16 w-16 rounded-full bg-green-500/20 flex items-center justify-center">
                <TrendingUp className="h-10 w-10 text-green-400" />
              </div>
              <Sparkles className="h-5 w-5 text-yellow-400 absolute -top-1 -right-1 animate-pulse" />
            </div>
          </div>
          <div className="text-4xl font-black text-green-400 mb-2">₹40L+</div>
          <h4 className="text-lg font-bold text-white mb-2">Extra Revenue</h4>
          <p className="text-white/70 text-sm"><span className="text-green-400 font-semibold">AI recovers</span> leads you would have lost</p>
        </GlassEffect>
      </div>
    </div>
  );
};
