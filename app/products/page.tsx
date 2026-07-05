import type { Metadata } from "next";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import ProductPageExperience from "@/components/products/ProductPageExperience";
import { absoluteUrl, createBreadcrumbJsonLd, siteConfig } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Zapreach OS and Chatpay",
  description:
    "Explore ZapLead products: Zapreach OS for managed outbound across voice, email, and LinkedIn, and Chatpay for paid WhatsApp ordering into your POS or kitchen.",
  alternates: {
    canonical: "/products",
  },
  openGraph: {
    title: "Zapreach OS and Chatpay | ZapLead",
    description:
      "Two managed AI revenue engines from ZapLead: one for outbound pipeline, one for WhatsApp ordering.",
    url: "/products",
    type: "website",
  },
};

const productPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${absoluteUrl("/products")}#webpage`,
  url: absoluteUrl("/products"),
  name: "Zapreach OS and Chatpay",
  description: metadata.description,
  publisher: {
    "@id": `${siteConfig.siteUrl}/#organization`,
  },
  mainEntity: {
    "@type": "ItemList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Zapreach OS",
        url: `${absoluteUrl("/products")}#zapreach-os`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Chatpay",
        url: `${absoluteUrl("/products")}#chatpay`,
      },
    ],
  },
};

const productServicesJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${siteConfig.siteUrl}/#zapreach-os`,
    name: "Zapreach OS",
    serviceType: "Managed AI outbound engine",
    provider: {
      "@id": `${siteConfig.siteUrl}/#organization`,
    },
    url: absoluteUrl("/products#zapreach-os"),
    description:
      "A done-for-you outbound engine that works a deduped B2B lead pool across voice, email, and LinkedIn, then books meetings and reports back.",
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${siteConfig.siteUrl}/#chatpay`,
    name: "Chatpay",
    serviceType: "Managed WhatsApp ordering agent",
    provider: {
      "@id": `${siteConfig.siteUrl}/#organization`,
    },
    url: absoluteUrl("/products#chatpay"),
    description:
      "A done-for-you WhatsApp ordering agent that replies instantly, takes payment in chat, and sends paid orders to the kitchen, POS, or operating tools.",
  },
];

export default function ProductsPage() {
  return (
    <>
      {[productPageJsonLd, ...productServicesJsonLd, createBreadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Products", path: "/products" },
      ])].map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <div className="fixed inset-0 z-0">
        <BackgroundGradientAnimation
          gradientBackgroundStart="rgb(0, 5, 25)"
          gradientBackgroundEnd="rgb(0, 17, 82)"
          firstColor="18, 113, 255"
          secondColor="82, 39, 255"
          thirdColor="100, 220, 255"
          fourthColor="177, 158, 239"
          fifthColor="37, 211, 102"
          pointerColor="140, 100, 255"
          size="80%"
          blendingValue="hard-light"
          interactive={true}
          containerClassName="!h-full !w-full"
        />
        <div className="absolute inset-0 bg-black/35 pointer-events-none" />
      </div>

      <ProductPageExperience />
    </>
  );
}
