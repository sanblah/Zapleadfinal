
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { StaggeredMenu } from "@/components/StaggeredMenu";
import { Footer } from "@/components/footer";
import { Sparkles } from "lucide-react";
import SmoothScroll from "@/components/SmoothScroll";
import MobileActions from "@/components/MobileActions";

// DM Sans — geometric sans-serif with consistent stroke weight
const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "ZapLead - AI Lead Pipeline Automation",
  description: "Turn leads into revenue with AI agents that capture, qualify, and book meetings 24/7. 92% conversion rate.",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    viewportFit: "cover" as const,
  },
  icons: {
    icon: "/Zapleadlogo.png",
    shortcut: "/Zapleadlogo.png",
    apple: "/Zapleadlogo.png",
  },
  openGraph: {
    title: "ZapLead - AI Lead Pipeline Automation",
    description: "Turn leads into revenue with AI agents that capture, qualify, and book meetings 24/7.",
    type: "website",
    locale: "en_US",
    siteName: "ZapLead",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={dmSans.variable}>
      <body className={`${dmSans.variable} antialiased bg-background text-foreground`} style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <SmoothScroll />
        <StaggeredMenu
          isFixed={true}
          position="right"
          colors={['#B19EEF', '#5227FF']}
          menuButtonColor="#ffffff"
          openMenuButtonColor="#000000"
          accentColor="#5227FF"
          logoUrl="/Zapleadlogo.png"
          items={[
            { label: 'Home', ariaLabel: 'Go to homepage', link: '/' },
            { label: 'Work', ariaLabel: 'View our work and case studies', link: '/work' },
            { label: 'Contact', ariaLabel: 'Get in touch with us', link: '/contact' },
          ]}
          socialItems={[
            { label: 'LinkedIn', link: 'https://www.linkedin.com/company/zapleadai/posts/?feedView=all' },
          ]}
          displaySocials={true}
          displayItemNumbering={true}
        />
        <main id="main-content" className="relative z-10 bg-background pb-16 md:pb-0">{children}</main>
        <Footer />
        <MobileActions />
      </body>
    </html>
  );
}
