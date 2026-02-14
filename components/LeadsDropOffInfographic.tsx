"use client";

import React from 'react';
import { TrendingDown, Clock, XCircle, DollarSign, ArrowRight } from 'lucide-react';
import CountUp from './CountUp';
import { GlassEffect } from "@/components/ui/liquid-glass";

export const LeadsDropOffInfographic: React.FC = () => {
  return (
    <div className="relative w-full max-w-7xl mx-auto py-12">
      {/* Clean Title */}
      <div className="text-center mb-20">
        <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">
          Your Pipeline is <span className="text-red-400">Bleeding Money</span>
        </h2>
        <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto">
          <span className="text-red-400 font-semibold">75 out of 100 leads</span> walk away because you can&apos;t respond fast enough
        </p>
      </div>

      {/* Clean Drop-Off Flow */}
      <div className="relative mb-20">
        {/* Connection Line */}
        <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500/30 via-red-400/30 to-red-600/30 -translate-y-1/2" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Stage 1 */}
          <GlassEffect className="rounded-2xl p-8 border border-white/10 hover:border-blue-400/30 transition-all">
            <div className="text-center">
              <div className="text-7xl font-bold text-blue-400 mb-4">
                <CountUp to={100} from={0} duration={2} />
              </div>
              <h4 className="text-xl font-semibold text-white mb-2">Leads Arrive</h4>
              <p className="text-sm text-white/60">Web, WhatsApp, Instagram</p>
            </div>
          </GlassEffect>

          {/* Arrow */}
          <div className="hidden lg:flex absolute top-1/2 left-[22%] -translate-y-1/2 z-10">
            <ArrowRight className="h-6 w-6 text-red-400/50" />
          </div>

          {/* Stage 2 */}
          <GlassEffect className="rounded-2xl p-8 border border-white/10 hover:border-orange-400/30 transition-all">
            <div className="text-center">
              <div className="text-7xl font-bold text-orange-400 mb-4">
                <CountUp to={60} from={100} duration={2.5} delay={0.5} />
              </div>
              <h4 className="text-xl font-semibold text-white mb-2">Still Waiting</h4>
              <p className="text-sm text-red-300">40 gave up</p>
              <div className="mt-4 pt-4 border-t border-white/10">
                <p className="text-xs text-white/60 flex items-center justify-center gap-1">
                  <Clock className="h-3 w-3" />
                  6+ hour response time
                </p>
              </div>
            </div>
          </GlassEffect>

          {/* Arrow */}
          <div className="hidden lg:flex absolute top-1/2 left-[47%] -translate-y-1/2 z-10">
            <ArrowRight className="h-6 w-6 text-red-400/50" />
          </div>

          {/* Stage 3 */}
          <GlassEffect className="rounded-2xl p-8 border border-white/10 hover:border-red-400/30 transition-all">
            <div className="text-center">
              <div className="text-7xl font-bold text-red-400 mb-4">
                <CountUp to={35} from={60} duration={2.5} delay={1} />
              </div>
              <h4 className="text-xl font-semibold text-white mb-2">Got Qualified</h4>
              <p className="text-sm text-red-300">25 lost patience</p>
              <div className="mt-4 pt-4 border-t border-white/10">
                <p className="text-xs text-white/60 flex items-center justify-center gap-1">
                  <XCircle className="h-3 w-3" />
                  Manual process too slow
                </p>
              </div>
            </div>
          </GlassEffect>

          {/* Arrow */}
          <div className="hidden lg:flex absolute top-1/2 left-[72%] -translate-y-1/2 z-10">
            <ArrowRight className="h-6 w-6 text-red-400/50" />
          </div>

          {/* Stage 4 */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-red-500/30 hover:border-red-500/50 transition-all">
            <div className="text-center">
              <div className="text-7xl font-bold text-red-600 mb-4">
                <CountUp to={25} from={35} duration={2.5} delay={1.5} />
              </div>
              <h4 className="text-xl font-semibold text-white mb-2">Actually Book</h4>
              <p className="text-sm text-red-400 font-semibold">75% Lost</p>
              <div className="mt-4 pt-4 border-t border-white/10">
                <p className="text-xs text-white/60 flex items-center justify-center gap-1">
                  <XCircle className="h-3 w-3" />
                  No follow-up system
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Clean Stats */}
      <div className="grid md:grid-cols-3 gap-6 mb-16">
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 text-center">
          <div className="h-16 w-16 mx-auto mb-4 rounded-full bg-red-500/10 flex items-center justify-center">
            <TrendingDown className="h-8 w-8 text-red-400" />
          </div>
          <div className="text-6xl font-bold text-red-400 mb-2">
            <CountUp to={75} from={0} duration={2} delay={2} />%
          </div>
          <h4 className="text-lg font-semibold text-white mb-2">Leads Lost</h4>
          <p className="text-sm text-white/60">Gone to AI-powered competitors</p>
        </div>

        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 text-center">
          <div className="h-16 w-16 mx-auto mb-4 rounded-full bg-red-500/10 flex items-center justify-center">
            <Clock className="h-8 w-8 text-red-400" />
          </div>
          <div className="text-6xl font-bold text-red-400 mb-2">6-24h</div>
          <h4 className="text-lg font-semibold text-white mb-2">Your Response Time</h4>
          <p className="text-sm text-white/60">AI competitors reply in 2 minutes</p>
        </div>

        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 text-center">
          <div className="h-16 w-16 mx-auto mb-4 rounded-full bg-red-500/10 flex items-center justify-center">
            <DollarSign className="h-8 w-8 text-red-400" />
          </div>
          <div className="text-6xl font-bold text-red-400 mb-2">₹15L+</div>
          <h4 className="text-lg font-semibold text-white mb-2">Lost Per Month</h4>
          <p className="text-sm text-white/60">Revenue walking away daily</p>
        </div>
      </div>

      {/* Clean Summary */}
      <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-10 md:p-12 border border-white/10">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Every Month, <span className="text-red-400">₹15+ Lakhs</span> Walk Out Your Door
            </h3>
            <p className="text-lg text-white/70 mb-8">
              Those 75 leads you lost? Each worth ₹5,000 to ₹50,000. While you manually respond,
              competitors with <span className="text-blue-400 font-semibold">AI agents</span> book them instantly.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-red-500/20 flex items-center justify-center shrink-0 mt-0.5">
                  <XCircle className="h-4 w-4 text-red-400" />
                </div>
                <div>
                  <p className="font-semibold text-white">Your Team is Drowning</p>
                  <p className="text-sm text-white/70">3-4 hours daily on manual follow-ups</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-red-500/20 flex items-center justify-center shrink-0 mt-0.5">
                  <XCircle className="h-4 w-4 text-red-400" />
                </div>
                <div>
                  <p className="font-semibold text-white">Leads Die While You Sleep</p>
                  <p className="text-sm text-white/70">2 AM messages go unanswered until morning</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-red-500/20 flex items-center justify-center shrink-0 mt-0.5">
                  <XCircle className="h-4 w-4 text-red-400" />
                </div>
                <div>
                  <p className="font-semibold text-white">Zero Visibility</p>
                  <p className="text-sm text-white/70">No tracking of where leads vanish</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <div className="inline-flex flex-col items-center bg-white/5 p-10 rounded-3xl border border-white/10">
              <div className="text-9xl font-black text-red-500 mb-4">75</div>
              <div className="text-2xl font-bold text-white mb-2">Leads Lost</div>
              <div className="text-xl text-red-400 mb-6">Out of Every 100</div>
              <div className="bg-red-500/10 border border-red-500/20 px-6 py-4 rounded-xl">
                <p className="text-xl font-bold text-white mb-1">= ₹15,00,000 Lost</p>
                <p className="text-sm text-white/60">Every single month</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Clean CTA */}
      <div className="text-center mt-16">
        <p className="text-2xl text-white font-semibold mb-2">
          <span className="text-red-400">Stop the bleeding.</span>
        </p>
        <p className="text-lg text-white/70">
          See how <span className="text-blue-400 font-semibold">AI-powered ZapLead</span> captures ALL 100 leads below 👇
        </p>
      </div>
    </div>
  );
};
