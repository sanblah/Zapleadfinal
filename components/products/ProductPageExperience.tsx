"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect, useState, type CSSProperties } from "react";
import {
  ArrowRight,
  BarChart3,
  CalendarCheck,
  CheckCircle2,
  ChefHat,
  Clock,
  CreditCard,
  Headphones,
  MessageCircle,
  PhoneCall,
  RefreshCw,
  Send,
  Sparkles,
  Store,
  Target,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import AnimatedContent from "@/components/AnimatedContent";
import ScrollBlurReveal from "@/components/ScrollBlurReveal";
import DecryptedText from "@/components/DecryptedText";
import CountUp from "@/components/CountUp";
import SpotlightCard from "@/components/SpotlightCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Dual-rail revenue pipeline hero visual — client only, never SSR'd.
const ProductPipeline3D = dynamic(
  () => import("@/components/products/ProductPipeline3D"),
  { ssr: false },
);

type Product = {
  id: string;
  name: string;
  eyebrow: string;
  headline: string;
  intro: string;
  bestFor: string;
  proof: string;
  accent: string;
  accentSoft: string;
  spotlight: `rgba(${number}, ${number}, ${number}, ${number})`;
  Icon: LucideIcon;
  promise: string;
  pain: string;
  steps: Array<{
    title: string;
    body: string;
    icon: LucideIcon;
  }>;
  outcomes: string[];
};

const products: Product[] = [
  {
    id: "zapreach-os",
    name: "Zapreach OS",
    eyebrow: "Managed outbound engine",
    headline: "Works the list across voice, email, and LinkedIn.",
    intro:
      "A done-for-you outbound operating system for B2B teams with a defined ICP and more leads than humans can personally work.",
    bestFor:
      "Founders, agencies, and SMB sales teams with a real target list but too little consistent outreach capacity.",
    proof:
      "Voice pilot: 4 of 6 completed calls booked meetings, with 83% decision-maker confirmation and zero wait-rule violations.",
    accent: "#0FB5BA",
    accentSoft: "rgba(15,181,186,0.16)",
    spotlight: "rgba(15, 181, 186, 0.3)",
    Icon: PhoneCall,
    promise: "Cold list in. Booked calendar out.",
    pain:
      "Your team knows who to reach, but the list outpaces human hours and every unlogged call is a lesson lost.",
    steps: [
      {
        title: "Source once",
        body: "Apollo lists, ICP filters, enrichment, dedupe, and do-not-contact rules feed one clean lead pool.",
        icon: Target,
      },
      {
        title: "Reach everywhere",
        body: "AI voice calls, verified email sequences, and LinkedIn touches run from the same context.",
        icon: Workflow,
      },
      {
        title: "Book or learn",
        body: "The agent confirms the decision-maker, handles objections, captures email, and books the slot.",
        icon: CalendarCheck,
      },
      {
        title: "Report weekly",
        body: "Funnel drop-off, objections, outcomes, competitor mentions, and script suggestions sharpen the next run.",
        icon: BarChart3,
      },
    ],
    outcomes: [
      "Every lead worked across the right channels",
      "No duplicate outreach across campaigns",
      "Structured call, reply, and meeting logs",
      "Pitch tuning based on what prospects actually say",
    ],
  },
  {
    id: "chatpay",
    name: "Chatpay",
    eyebrow: "Managed WhatsApp ordering",
    headline: "Takes the order, takes payment, and sends it to operations.",
    intro:
      "A done-for-you WhatsApp ordering agent for food and beverage businesses that lose orders when chats pile up.",
    bestFor:
      "Cloud kitchens, bakeries, dessert brands, QSR teams, and WhatsApp-first operators with high message volume.",
    proof:
      "Bonnie's Bakery build: 168-product catalogue, in-thread Razorpay payment, POS write-back, and fulfilment automation.",
    accent: "#25D366",
    accentSoft: "rgba(37,211,102,0.16)",
    spotlight: "rgba(37, 211, 102, 0.3)",
    Icon: MessageCircle,
    promise: "WhatsApp order in. Paid kitchen ticket out.",
    pain:
      "Customers are ready to buy in WhatsApp, but slow replies, manual POS entry, and separate payment links make orders drop.",
    steps: [
      {
        title: "Reply instantly",
        body: "The agent answers peak-hour and after-hours chats in the brand's voice.",
        icon: Clock,
      },
      {
        title: "Build the order",
        body: "It guides the customer through menu, rules, availability, variants, and add-ons.",
        icon: Store,
      },
      {
        title: "Collect payment",
        body: "UPI, card, or pay-on-delivery logic happens in the same WhatsApp thread.",
        icon: CreditCard,
      },
      {
        title: "Send to kitchen",
        body: "Paid orders flow into the POS, kitchen queue, dashboard, or fulfilment workflow.",
        icon: ChefHat,
      },
    ],
    outcomes: [
      "No peak-hour WhatsApp pileup",
      "Fewer missed after-hours orders",
      "Less manual retyping into POS",
      "Owner dashboard for orders and revenue",
    ],
  },
];

const proofTiles = [
  {
    to: 4,
    suffix: "/6",
    label: "completed Zapreach voice pilot calls booked meetings",
  },
  {
    to: 83,
    suffix: "%",
    label: "decision-maker confirmation in the voice pilot",
  },
  {
    to: 168,
    suffix: "",
    label: "products handled in the Bonnie's Bakery Chatpay build",
  },
  {
    to: 95,
    suffix: "%+",
    label: "evaluation score reached by the WhatsApp ordering system",
  },
];

type ChatpayChatItem =
  | {
      kind: "message";
      role: "customer" | "agent";
      text: string;
      time: string;
    }
  | {
      kind: "order";
      role: "agent";
      title: string;
      time: string;
      rows: Array<{
        label: string;
        value: string;
      }>;
      total: string;
    };

const chatpayChat: ChatpayChatItem[] = [
  {
    kind: "message",
    role: "customer",
    text: "Hi, can I get a 500g eggless chocolate truffle cake for 6 pm today?",
    time: "4:18 PM",
  },
  {
    kind: "message",
    role: "agent",
    text: "Yes. I can reserve that slot. Would you like candles or a message on top?",
    time: "4:18 PM",
  },
  {
    kind: "message",
    role: "customer",
    text: "Candles please. Write Happy Birthday Aarav.",
    time: "4:19 PM",
  },
  {
    kind: "order",
    role: "agent",
    title: "Order ready",
    time: "4:19 PM",
    rows: [
      { label: "Item", value: "500g eggless truffle" },
      { label: "Add-on", value: "Candles + cake note" },
      { label: "Slot", value: "Today, 6:00 PM" },
    ],
    total: "Rs 920",
  },
  {
    kind: "message",
    role: "agent",
    text: "Payment link is ready. Once paid, I will send it to the kitchen automatically.",
    time: "4:20 PM",
  },
  {
    kind: "message",
    role: "customer",
    text: "Paid.",
    time: "4:21 PM",
  },
  {
    kind: "message",
    role: "agent",
    text: "Payment received. Order #CP-1842 is confirmed and queued for the kitchen.",
    time: "4:21 PM",
  },
];

const chatpayOperations = [
  {
    label: "Intent captured",
    detail: "Product, variant, occasion, and delivery slot parsed from chat.",
    icon: MessageCircle,
    step: 0,
  },
  {
    label: "Menu checked",
    detail: "Availability, add-ons, and catalogue rules validated live.",
    icon: Store,
    step: 2,
  },
  {
    label: "Payment tracked",
    detail: "UPI or card link sent in-thread; payment status comes back.",
    icon: CreditCard,
    step: 4,
  },
  {
    label: "Kitchen ticket",
    detail: "Paid order is pushed to POS, dashboard, or fulfilment queue.",
    icon: ChefHat,
    step: 6,
  },
];

function getActiveOperationIndex(step: number) {
  let activeIndex = 0;

  chatpayOperations.forEach((operation, index) => {
    if (step >= operation.step) {
      activeIndex = index;
    }
  });

  return activeIndex;
}

function ChatpayBubble({ item }: { item: ChatpayChatItem }) {
  if (item.kind === "order") {
    return (
      <div className="chatpay-bubble-in w-[86%] max-w-[19rem] self-start rounded-2xl rounded-tl-sm bg-white p-3 text-slate-950 shadow-[0_16px_40px_rgba(0,0,0,0.22)]">
        <div className="mb-3 flex items-center justify-between border-b border-slate-200 pb-2">
          <div>
            <div className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-emerald-700">
              {item.title}
            </div>
            <div className="mt-1 text-sm font-semibold text-slate-950">Ready for payment</div>
          </div>
          <CheckCircle2 className="h-4 w-4 text-emerald-600" />
        </div>

        <div className="space-y-2">
          {item.rows.map((row) => (
            <div key={row.label} className="flex items-start justify-between gap-3 text-xs">
              <span className="text-slate-500">{row.label}</span>
              <span className="max-w-[9rem] text-right font-semibold text-slate-900">{row.value}</span>
            </div>
          ))}
        </div>

        <div className="mt-3 flex items-center justify-between rounded-xl bg-emerald-50 px-3 py-2">
          <span className="text-xs font-semibold text-emerald-800">Amount</span>
          <span className="text-sm font-bold text-emerald-900">{item.total}</span>
        </div>

        <div className="mt-2 text-right text-[0.64rem] font-medium text-slate-400">{item.time}</div>
      </div>
    );
  }

  const isCustomer = item.role === "customer";

  return (
    <div
      className={`chatpay-bubble-in max-w-[82%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed shadow-[0_12px_32px_rgba(0,0,0,0.16)] ${
        isCustomer
          ? "self-end rounded-tr-sm bg-[#005c4b] text-white"
          : "self-start rounded-tl-sm bg-[#202c33] text-white"
      }`}
    >
      <div>{item.text}</div>
      <div className={`mt-1 text-right text-[0.62rem] ${isCustomer ? "text-white/55" : "text-white/42"}`}>
        {item.time}
      </div>
    </div>
  );
}

function ChatpayActionDemo() {
  const [step, setStep] = useState(0);
  const visibleMessages = chatpayChat.slice(0, step + 1);
  const activeOperation = getActiveOperationIndex(step);
  const isTyping = step < chatpayChat.length - 1 && chatpayChat[step + 1].role === "agent";

  useEffect(() => {
    const timer = window.setInterval(() => {
      setStep((currentStep) =>
        currentStep >= chatpayChat.length - 1 ? 0 : currentStep + 1,
      );
    }, 2200);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section id="chatpay-in-action" className="border-t border-white/[0.08] py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-9 lg:grid-cols-[0.86fr_1.14fr] lg:items-center">
          <ScrollBlurReveal>
            <div>
              <Badge
                variant="outline"
                className="mb-6 glass-badge text-white"
                style={{ borderColor: "rgba(37,211,102,0.34)", backgroundColor: "rgba(37,211,102,0.12)" }}
              >
                <MessageCircle className="mr-2 h-3.5 w-3.5 text-[#25D366]" />
                Chatpay in action
              </Badge>

              <h2 className="max-w-3xl text-3xl font-bold leading-tight text-[#fde8d8] sm:text-4xl md:text-5xl">
                Watch one WhatsApp order turn into a paid kitchen ticket.
              </h2>

              <p className="mt-5 max-w-2xl text-lg font-light leading-relaxed text-white/72">
                This is the product moment: Chatpay answers, asks the right follow-up,
                builds the bill, tracks payment, and hands operations a clean order.
              </p>

              <div className="mt-8 grid gap-3">
                {chatpayOperations.map((operation, index) => {
                  const Icon = operation.icon;
                  const isActive = index === activeOperation;
                  const isComplete = index < activeOperation;

                  return (
                    <button
                      key={operation.label}
                      type="button"
                      onClick={() => setStep(operation.step)}
                      className={`group flex w-full items-start gap-4 rounded-xl border p-4 text-left transition-all duration-300 ${
                        isActive
                          ? "border-[#25D366]/45 bg-[#25D366]/10 shadow-[0_18px_55px_rgba(37,211,102,0.11)]"
                          : "border-white/[0.08] bg-white/[0.035] hover:border-white/[0.16] hover:bg-white/[0.055]"
                      }`}
                    >
                      <span
                        className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${
                          isActive || isComplete
                            ? "border-[#25D366]/35 bg-[#25D366]/15 text-[#25D366]"
                            : "border-white/[0.08] bg-black/25 text-white/44"
                        }`}
                      >
                        <Icon className="h-[18px] w-[18px]" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-base font-semibold text-white">{operation.label}</span>
                        <span className="mt-1 block text-sm leading-relaxed text-white/58">
                          {operation.detail}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <Button
                  type="button"
                  onClick={() => setStep(0)}
                  variant="glass"
                  className="border-white/[0.12] bg-white/[0.045]"
                >
                  <RefreshCw className="h-4 w-4" />
                  Replay
                </Button>
                <Button
                  type="button"
                  onClick={() => setStep((currentStep) => Math.min(chatpayChat.length - 1, currentStep + 1))}
                  className="bg-white text-black hover:bg-white/90"
                >
                  Advance chat
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </ScrollBlurReveal>

          <AnimatedContent distance={45} duration={0.9}>
            <div className="relative mx-auto w-full max-w-[34rem] lg:max-w-none">
              <div className="absolute -inset-6 rounded-[2rem] bg-[radial-gradient(circle_at_25%_25%,rgba(37,211,102,0.22),transparent_36%),radial-gradient(circle_at_85%_30%,rgba(15,181,186,0.14),transparent_34%)] blur-2xl" />

              <div className="relative grid gap-4 rounded-[2rem] border border-white/[0.08] bg-[linear-gradient(145deg,rgba(255,255,255,0.13),rgba(255,255,255,0.035))] p-3 shadow-[0_30px_90px_rgba(0,0,0,0.48)] backdrop-blur-2xl md:grid-cols-[minmax(0,1fr)_12rem]">
                <div className="overflow-hidden rounded-[1.55rem] border border-white/[0.08] bg-[#0b141a]">
                  <div className="flex items-center gap-3 bg-[#075e54] px-4 py-3 text-white">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/14">
                      <Sparkles className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-semibold">ZapLead AI Agent</div>
                      <div className="text-xs text-white/68">Online - payment and POS enabled</div>
                    </div>
                    <CheckCircle2 className="h-4 w-4 text-white/70" />
                  </div>

                  <div
                    className="flex h-[24rem] flex-col justify-end gap-2.5 overflow-hidden p-4 sm:h-[33rem]"
                    aria-live="polite"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.07) 1px, transparent 0)",
                      backgroundSize: "22px 22px",
                    }}
                  >
                    {visibleMessages.map((item, index) => (
                      <ChatpayBubble key={`${item.kind}-${index}`} item={item} />
                    ))}

                    {isTyping ? (
                      <div className="chatpay-bubble-in flex w-fit items-center gap-1.5 self-start rounded-2xl rounded-tl-sm bg-[#202c33] px-3 py-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-white/45 chatpay-typing-dot" />
                        <span className="h-1.5 w-1.5 rounded-full bg-white/45 chatpay-typing-dot [animation-delay:120ms]" />
                        <span className="h-1.5 w-1.5 rounded-full bg-white/45 chatpay-typing-dot [animation-delay:240ms]" />
                      </div>
                    ) : null}
                  </div>

                  <div className="flex items-center gap-2 bg-[#111b21] px-4 py-3">
                    <div className="h-9 flex-1 rounded-full bg-white/10 px-4 text-sm leading-9 text-white/38">
                      Message customer
                    </div>
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#25D366] text-[#063b24]">
                      <Send className="h-4 w-4" />
                    </div>
                  </div>
                </div>

                <div className="grid gap-3 md:content-between">
                  <div className="rounded-2xl border border-white/[0.08] bg-black/28 p-4">
                    <div className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white/38">
                      System state
                    </div>
                    <div className="mt-3 text-2xl font-bold text-white">
                      {chatpayOperations[activeOperation].label}
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-white/58">
                      {chatpayOperations[activeOperation].detail}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-[#25D366]/20 bg-[#25D366]/10 p-4">
                    <div className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[#9cf2bf]">
                      Output
                    </div>
                    <div className="mt-3 text-lg font-semibold text-white">Paid order packet</div>
                    <p className="mt-2 text-sm leading-relaxed text-white/60">
                      Customer chat, payment event, item rules, and kitchen notes move as one record.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedContent>
        </div>
      </div>
    </section>
  );
}

function ProductFlowPanel({ product }: { product: Product }) {
  return (
    <SpotlightCard className="h-full rounded-2xl" spotlightColor={product.spotlight}>
      <div
        className="liquid-shine relative h-full overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 backdrop-blur-2xl sm:p-6"
        style={{ "--product-accent": product.accent } as CSSProperties}
      >
        <div className="absolute inset-y-6 left-8 hidden w-px bg-white/[0.08] sm:block" />

      <div className="relative mb-5">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/42">
          Operating loop
        </div>
        <h3 className="mt-2 text-2xl font-semibold text-white">
          {product.promise}
        </h3>
      </div>

      <div className="relative space-y-3">
        {product.steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <div
              key={step.title}
              className="grid gap-4 rounded-xl border border-white/[0.07] bg-black/20 p-4 sm:grid-cols-[2.5rem_1fr] sm:border-0 sm:bg-transparent sm:p-0"
            >
              <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-black/65">
                <Icon className="h-[18px] w-[18px]" style={{ color: product.accent }} />
              </div>
              <div className="pb-1 sm:border-b sm:border-white/[0.06] sm:pb-4">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold uppercase tracking-[0.16em] text-white/32">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h4 className="text-lg font-semibold text-white">{step.title}</h4>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      </div>
    </SpotlightCard>
  );
}

function ProductSection({ product }: { product: Product; index: number }) {
  const Icon = product.Icon;

  return (
    <section
      id={product.id}
      className="scroll-mt-24 border-t border-white/[0.08] py-20 sm:py-28"
      style={{ "--product-accent": product.accent } as CSSProperties}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <ScrollBlurReveal>
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <Badge
                variant="outline"
                className="mb-6 glass-badge text-white"
                style={{ borderColor: `${product.accent}55`, backgroundColor: product.accentSoft }}
              >
                <Icon className="mr-2 h-3.5 w-3.5" style={{ color: product.accent }} />
                {product.eyebrow}
              </Badge>

              <h2 className="max-w-3xl text-3xl font-bold leading-tight text-[#fde8d8] sm:text-4xl md:text-5xl">
                {product.name}{" "}
                <span className="mt-2 block text-white">{product.headline}</span>
              </h2>

              <p className="mt-6 max-w-2xl text-lg font-light leading-relaxed text-white/72">
                {product.intro}
              </p>

              <p className="mt-5 max-w-xl text-base font-medium leading-relaxed text-white/82">
                {product.pain}
              </p>
            </div>

            <AnimatedContent distance={45} duration={0.9}>
              <ProductFlowPanel product={product} />
            </AnimatedContent>
          </div>
        </ScrollBlurReveal>

        <AnimatedContent distance={35} duration={0.8}>
          <div className="mt-7 rounded-2xl border border-white/[0.08] bg-black/20 p-5 backdrop-blur-xl sm:p-6">
            <div className="mb-4 flex items-center gap-2">
              <Icon className="h-5 w-5" style={{ color: product.accent }} />
              <h3 className="text-lg font-semibold text-white">What changes</h3>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {product.outcomes.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-white/66">
                  <CheckCircle2
                    className="mt-0.5 h-4 w-4 shrink-0"
                    style={{ color: product.accent }}
                  />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </AnimatedContent>
      </div>
    </section>
  );
}

export default function ProductPageExperience() {
  return (
    <div className="relative z-10 min-h-screen overflow-hidden pt-16">
      <section className="relative min-h-[92vh] overflow-hidden border-b border-white/[0.08]">
        {/* Dual-rail pipeline: Zapreach + Chatpay stream into the ZapLead
            engine and out as booked / paid. Sits behind the hero copy. */}
        <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
          <ProductPipeline3D />
          {/* Desktop: left-weighted scrim (engine sits right, less text there). */}
          <div className="absolute inset-0 hidden md:block bg-[linear-gradient(to_right,rgba(0,5,25,0.8),rgba(0,5,25,0.32)_46%,transparent_74%)]" />
          {/* Mobile: centre-weighted scrim keeps the stacked copy readable. */}
          <div className="absolute inset-0 md:hidden bg-[radial-gradient(ellipse_120%_58%_at_50%_46%,rgba(0,5,25,0.82),rgba(0,5,25,0.4)_66%,transparent)]" />
        </div>

        <div className="relative z-10 mx-auto flex min-h-[92vh] max-w-7xl flex-col justify-center px-4 py-24 sm:px-6 sm:py-32">
          <div className="max-w-4xl">
            <h1
              className="text-4xl font-bold leading-tight text-[#fde8d8] sm:text-5xl md:text-6xl lg:text-7xl"
              style={{ textShadow: "0 0 40px rgba(0,0,0,0.75), 0 0 80px rgba(15,181,186,0.18)" }}
            >
              Zapreach OS and Chatpay{" "}
              <span className="block text-white">move revenue without manual bottlenecks.</span>
            </h1>

            <p className="mt-6 max-w-3xl text-lg font-light leading-relaxed text-white/78 sm:text-xl">
              One engine works a B2B lead list until meetings are booked. The other
              turns WhatsApp demand into paid operational orders. Both are built and
              run by ZapLead as managed systems, not DIY software.
            </p>
          </div>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="bg-white px-8 py-5 text-base text-black hover:bg-white/90 sm:text-lg"
            >
              <Link href="/contact">
                Design My Engine <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="glass" size="lg" className="px-8 py-5 text-base sm:text-lg">
              <Link href="#zapreach-os">Explore Products</Link>
            </Button>
          </div>

          <div className="mt-12 grid max-w-4xl gap-3 sm:grid-cols-2">
            {products.map((product, index) => {
              const Icon = product.Icon;
              return (
                <AnimatedContent key={product.id} delay={0.62 + index * 0.12} duration={0.7} distance={30}>
                  <SpotlightCard className="h-full rounded-2xl" spotlightColor={product.spotlight}>
                    <Link
                      href={`#${product.id}`}
                      className="liquid-shine group block h-full rounded-2xl border border-white/[0.12] bg-white/[0.06] p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-white/[0.24] hover:bg-white/[0.09]"
                    >
                      <Icon className="mb-5 h-6 w-6" style={{ color: product.accent }} />
                      <div className="text-xl font-semibold text-white">{product.name}</div>
                      <p className="mt-2 text-sm leading-relaxed text-white/65">{product.promise}</p>
                      <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-white transition-all group-hover:gap-3">
                        View system <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </Link>
                  </SpotlightCard>
                </AnimatedContent>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <ScrollBlurReveal>
            <div className="max-w-3xl">
              <Badge variant="outline" className="mb-5 glass-badge text-white">
                <Workflow className="mr-2 h-3.5 w-3.5" />
                Product philosophy
              </Badge>
              <h2 className="text-3xl font-bold text-[#fde8d8] sm:text-4xl md:text-5xl">
                <DecryptedText
                  text="Not more tools. Finished revenue loops."
                  animateOn="view"
                  sequential={true}
                  revealDirection="start"
                  speed={70}
                  className="text-white"
                  encryptedClassName="text-white/35"
                />
              </h2>
              <p className="mt-5 text-lg font-light leading-relaxed text-white/72">
                ZapLead packages reusable AI engines with client-specific integration.
                The core loop is repeatable; the edge that makes it useful is how it
                plugs into your channels, rules, people, and operating tools.
              </p>
            </div>
          </ScrollBlurReveal>
        </div>
      </section>

      {products.map((product, index) => (
        <ProductSection key={product.id} product={product} index={index} />
      ))}

      <ChatpayActionDemo />

      <section className="border-t border-white/[0.08] py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <ScrollBlurReveal>
            <div className="mb-10 text-center">
              <Badge variant="outline" className="mb-5 glass-badge text-white">
                <BarChart3 className="mr-2 h-3.5 w-3.5" />
                Working signals
              </Badge>
              <h2 className="text-3xl font-bold text-[#fde8d8] sm:text-4xl md:text-5xl">
                Working signals, reported honestly.
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-lg font-light leading-relaxed text-white/70">
                Working builds, directional pilots, and clear next steps for turning
                each loop into a repeatable managed service.
              </p>
            </div>
          </ScrollBlurReveal>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {proofTiles.map((tile, index) => (
              <AnimatedContent key={tile.label} delay={index * 0.08} duration={0.7} distance={35}>
                <div className="h-full rounded-xl border border-white/[0.08] bg-white/[0.04] p-5 backdrop-blur-xl">
                  <div className="bg-gradient-to-r from-white via-[#d8f8ff] to-[#7fe7c5] bg-clip-text text-3xl font-bold text-transparent">
                    <CountUp to={tile.to} duration={1.8} />
                    {tile.suffix}
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-white/65">{tile.label}</p>
                </div>
              </AnimatedContent>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6">
          <ScrollBlurReveal>
            <Badge variant="outline" className="mb-6 glass-badge text-white">
              <Headphones className="mr-2 h-3.5 w-3.5" />
              Build path
            </Badge>
            <h2 className="text-3xl font-bold text-[#fde8d8] sm:text-4xl md:text-5xl">
              Pick the bottleneck. ZapLead builds the operating layer.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg font-light leading-relaxed text-white/72">
              If the bottleneck is outbound, start with Zapreach OS. If the
              bottleneck is WhatsApp ordering, start with Chatpay. If both are
              leaking revenue, we can map the sequence together.
            </p>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <Button asChild size="lg" className="bg-white px-8 py-5 text-black hover:bg-white/90">
                <Link href="/contact">
                  Get a Product Fit Audit <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="glass" size="lg" className="px-8 py-5">
                <Link href="/work">Read Case Studies</Link>
              </Button>
            </div>
          </ScrollBlurReveal>
        </div>
      </section>

      <div className="product-ticker-wrap border-y border-white/[0.08] bg-black/25 py-5">
        <div className="product-ticker flex w-max items-center">
          {[0, 1].map((group) => (
            <div
              key={group}
              aria-hidden={group === 1 ? true : undefined}
              className="flex min-w-[100vw] shrink-0 items-center justify-around gap-8 px-4 text-sm font-medium uppercase text-white/45"
            >
              {[
                "Voice",
                "Email",
                "LinkedIn",
                "WhatsApp",
                "Payments",
                "POS",
                "Dashboard",
                "Reporting",
              ].map((item) => (
                <span key={`${group}-${item}`} className="inline-flex items-center gap-3 whitespace-nowrap">
                  <Send className="h-3.5 w-3.5 text-white/25" />
                  {item}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
