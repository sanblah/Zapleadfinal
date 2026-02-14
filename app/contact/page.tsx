"use client";

import { ContactForm } from "@/components/contact-form";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";

export default function ContactPage() {
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
        <div className="absolute inset-0 bg-black/30 pointer-events-none" />
      </div>

      <div className="relative z-10 min-h-screen pt-16">
        {/* Header */}
        <section className="border-b border-white/[0.1] py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-white">
                Let&apos;s Build Your Pipeline
              </h1>
              <p className="text-base sm:text-lg text-white/70 max-w-xl mx-auto">
                Tell us about your leads. Within 48 hours, you&apos;ll have a custom automation plan—free, no strings attached.
              </p>
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="py-8 sm:py-16">
          <div className="mx-auto max-w-2xl px-4 sm:px-6">
            <ContactForm />

            <div className="mt-6 sm:mt-8 glass-card p-5 sm:p-6 text-center">
              <p className="mb-3 text-sm font-medium text-white">Or reach us directly</p>
              <div className="space-y-2">
                <p className="text-sm text-white/80">
                  Email: <a href="mailto:aizaplead@gmail.com" className="text-white hover:text-white/80 transition-colors underline underline-offset-2">aizaplead@gmail.com</a>
                </p>
                <p className="text-sm text-white/80">
                  WhatsApp: <a href="https://wa.me/918657532671" className="text-white hover:text-white/80 transition-colors underline underline-offset-2">+91 86575 32671</a>
                </p>
                <p className="text-sm text-white/80">
                  Instagram: <a href="https://instagram.com/zapleadin" target="_blank" rel="noopener noreferrer" className="text-white hover:text-white/80 transition-colors underline underline-offset-2">@zapleadin</a>
                </p>
                <p className="text-sm text-white/80">
                  LinkedIn: <a href="https://www.linkedin.com/company/zapleadai/posts/?feedView=all" target="_blank" rel="noopener noreferrer" className="text-white hover:text-white/80 transition-colors underline underline-offset-2">ZapLead AI</a>
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
