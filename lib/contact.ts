const fallbackContactHref = "/contact";

export const officialPhoneDisplay = "+1 (765) 517-6285";
export const officialPhoneHref = "tel:+17655176285";

export const whatsappFunnelHref =
  process.env.NEXT_PUBLIC_WHATSAPP_FUNNEL_URL?.trim() || fallbackContactHref;
