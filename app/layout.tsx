
import { Inter, Space_Grotesk, JetBrains_Mono, Dosis } from "next/font/google";
import "./globals.css";
import { StaggeredMenu } from "@/components/StaggeredMenu";
import { Footer } from "@/components/footer";
import { Sparkles } from "lucide-react";
import SmoothScroll from "@/components/SmoothScroll";

// Display font for headings - modern geometric sans
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

// Body font - clean and readable
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

// Monospace font for technical elements
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500", "600"],
});

// Dosis font for titles - modern rounded sans
const dosis = Dosis({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const metadata = {
  title: "ZapLead - AI Lead Pipeline Automation",
  description: "Turn leads into revenue with AI agents that capture, qualify, and book meetings 24/7. 92% conversion rate.",
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
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} ${dosis.variable}`}>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased bg-background text-foreground`}>
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
        <main id="main-content" className="relative z-10 bg-background">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
