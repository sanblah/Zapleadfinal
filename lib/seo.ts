export type FaqItem = {
  question: string;
  answer: string;
};

export const siteConfig = {
  name: "ZapLead",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://zaplead.in",
  description:
    "ZapLead builds AI lead pipeline automation for WhatsApp, web forms, CRM routing, follow-up, and meeting booking.",
  email: "sanchit@zaplead.in",
  phone: "+918657532671",
  whatsApp: "https://wa.me/918657532671",
  instagram: "https://instagram.com/zapleadin",
  linkedIn: "https://www.linkedin.com/company/zapleadai/posts/?feedView=all",
};

export const seoKeywords = [
  "AI lead pipeline automation",
  "AI lead qualification",
  "WhatsApp AI agent",
  "CRM automation",
  "lead response automation",
  "AI sales assistant",
  "meeting booking automation",
  "ZapLead",
];

export const homeFaqs: FaqItem[] = [
  {
    question: "What is ZapLead?",
    answer:
      "ZapLead is an AI lead pipeline automation studio that builds systems for lead capture, qualification, routing, CRM sync, follow-up, and meeting booking.",
  },
  {
    question: "What does ZapLead automate?",
    answer:
      "ZapLead automates web form intake, WhatsApp conversations, lead scoring, CRM updates, sales handoffs, reminders, and reporting dashboards.",
  },
  {
    question: "Does ZapLead build WhatsApp AI agents?",
    answer:
      "Yes. ZapLead builds WhatsApp AI agents that answer questions, qualify intent, collect context, and route sales-ready conversations to the right team.",
  },
  {
    question: "Who is ZapLead best for?",
    answer:
      "ZapLead is best for businesses with high-intent inbound leads, repeated qualification questions, manual follow-up gaps, or sales teams that need cleaner handoffs.",
  },
];

export const aiLeadAutomationFaqs: FaqItem[] = [
  {
    question: "What is AI lead pipeline automation?",
    answer:
      "AI lead pipeline automation uses AI agents and workflow tools to capture, qualify, route, follow up with, and report on leads across channels.",
  },
  {
    question: "How is AI lead automation different from a chatbot?",
    answer:
      "A chatbot only answers messages, while AI lead automation connects conversation, scoring, CRM updates, calendar booking, and human handoff.",
  },
  {
    question: "Can AI lead automation work with WhatsApp?",
    answer:
      "Yes. WhatsApp AI lead automation can answer inbound questions, check context, qualify buyers, send reminders, and escalate conversations to a sales rep.",
  },
  {
    question: "What data should an AI lead pipeline track?",
    answer:
      "An AI lead pipeline should track source, intent, budget, timeline, contact details, conversation transcript, owner, next step, and conversion status.",
  },
];

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.siteUrl).toString();
}

export function createFaqJsonLd(faqs: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function createBreadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${siteConfig.siteUrl}/#organization`,
  name: siteConfig.name,
  url: siteConfig.siteUrl,
  logo: absoluteUrl("/Zapleadlogo.png"),
  description: siteConfig.description,
  email: siteConfig.email,
  telephone: siteConfig.phone,
  sameAs: [siteConfig.linkedIn, siteConfig.instagram],
  knowsAbout: seoKeywords,
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteConfig.siteUrl}/#website`,
  name: siteConfig.name,
  url: siteConfig.siteUrl,
  publisher: {
    "@id": `${siteConfig.siteUrl}/#organization`,
  },
};

export const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${siteConfig.siteUrl}/#ai-lead-pipeline-automation`,
  name: "AI Lead Pipeline Automation",
  serviceType: "AI lead qualification and pipeline automation",
  provider: {
    "@id": `${siteConfig.siteUrl}/#organization`,
  },
  url: absoluteUrl("/ai-lead-automation"),
  areaServed: ["India", "United States", "Global"],
  description: siteConfig.description,
};
