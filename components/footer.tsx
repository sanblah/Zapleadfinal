"use client";

import { useRef, useEffect, type MouseEvent as ReactMouseEvent } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Footer() {
  const currentYear = new Date().getFullYear();
  const footerRef = useRef<HTMLElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const handleBackToTop = (event: ReactMouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const ctx = gsap.context(() => {
      const sections = [topRef.current, brandRef.current, bottomRef.current].filter(
        Boolean
      ) as HTMLElement[];

      if (!sections.length) return;

      // Clear stale inline styles from prior route transitions.
      gsap.set(sections, { clearProps: "transform,opacity,visibility" });

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) {
        gsap.set(sections, { opacity: 1, y: 0, clearProps: "transform,opacity,visibility" });
        return;
      }

      const createReveal = (
        element: HTMLElement | null,
        fromVars: gsap.TweenVars,
        toVars: gsap.TweenVars,
        start: string
      ) => {
        if (!element) return;

        ScrollTrigger.create({
          trigger: footer,
          start,
          once: true,
          invalidateOnRefresh: true,
          onEnter: () => {
            gsap.fromTo(
              element,
              fromVars,
              {
                ...toVars,
                overwrite: "auto",
              }
            );
          },
        });
      };

      createReveal(
        topRef.current,
        { y: 30, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.8, ease: "power3.out" },
        "top 90%"
      );

      createReveal(
        brandRef.current,
        { y: 60, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 1, ease: "power3.out" },
        "top 85%"
      );

      createReveal(
        bottomRef.current,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.8, delay: 0.3, ease: "power2.out" },
        "top 95%"
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative z-30 isolate w-full overflow-hidden pb-0 pt-10 sm:pt-14"
      role="contentinfo"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 left-1/4 h-56 w-56 rounded-full bg-blue-500/15 blur-[110px]" />
        <div className="absolute -bottom-20 right-1/4 h-64 w-64 rounded-full bg-purple-500/20 blur-[120px]" />
      </div>

      <div className="w-full">
        <div className="frosted-glass relative w-full overflow-hidden rounded-none border-x-0 border-b-0 border-white/[0.15]">
          <div
            ref={topRef}
            className="grid gap-10 border-b border-white/[0.1] p-6 sm:p-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr]"
          >
            <div className="space-y-6">
              <Link href="/" className="inline-flex items-center gap-3">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-white/90 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2)]">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13 2L4.09 12.11a1 1 0 00.77 1.64H11v6.5a.5.5 0 00.9.3L20.91 10.39a1 1 0 00-.77-1.64H13V2.25a.5.5 0 00-.9-.3L13 2z"
                      fill="currentColor"
                    />
                  </svg>
                </span>
                <span className="text-xl font-semibold text-white">ZapLead</span>
              </Link>

              <p className="max-w-md text-base leading-relaxed text-white/75 font-light">
                Capture, qualify, route, and follow up with every lead across web and
                WhatsApp without manual bottlenecks.
              </p>

              <div className="flex flex-wrap gap-3">
                <Link href="/contact" className="glass-button px-5 py-2.5 text-sm font-semibold text-white">
                  Talk to an Engineer
                </Link>
                <Link href="/work" className="glass-badge px-5 py-2.5 text-sm font-semibold text-white/90">
                  View Case Studies
                </Link>
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-white/45">
                Navigate
              </h3>
              <ul className="space-y-3 text-base">
                <li>
                  <Link href="/" className="text-white/80 font-light transition-colors duration-200 hover:text-white">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/work" className="text-white/80 font-light transition-colors duration-200 hover:text-white">
                    Work
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-white/80 font-light transition-colors duration-200 hover:text-white">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-white/45">
                Connect
              </h3>
              <ul className="space-y-3 text-base">
                <li>
                  <a
                    href="mailto:aizaplead@gmail.com"
                    className="text-white/80 font-light transition-colors duration-200 hover:text-white"
                  >
                    aizaplead@gmail.com
                  </a>
                </li>
                <li>
                  <a
                    href="https://wa.me/918657532671"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/80 font-light transition-colors duration-200 hover:text-white"
                  >
                    WhatsApp
                  </a>
                </li>
                <li>
                  <a
                    href="https://instagram.com/zapleadin"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/80 font-light transition-colors duration-200 hover:text-white"
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/company/zapleadai/posts/?feedView=all"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/80 font-light transition-colors duration-200 hover:text-white"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+918657532671"
                    className="text-white/80 font-light transition-colors duration-200 hover:text-white"
                  >
                    +91 86575 32671
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div
            ref={brandRef}
            className="border-b border-white/[0.1] overflow-hidden px-8 py-20 sm:px-14 sm:py-28"
          >
            <Link
              href="/contact"
              aria-label="Go to contact page"
              className="group relative inline-block"
            >
              <span
                className="relative block text-[clamp(4rem,16vw,11rem)] font-bold tracking-[-0.04em]"
                style={{ fontFamily: "var(--font-heading), system-ui, sans-serif" }}
              >
                <span className="relative inline-block h-[1.2em] overflow-hidden leading-none align-top pr-[0.08em]">
                  <span className="invisible block h-[1.2em] leading-[1.2] whitespace-nowrap">
                    Try Now →
                  </span>
                  <span className="pointer-events-none absolute inset-0 flex flex-col transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform group-hover:-translate-y-[1.2em]">
                    <span className="block h-[1.2em] leading-[1.2] whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r from-white to-white/55">
                      ZapLead
                    </span>
                    <span className="block h-[1.2em] leading-[1.2] whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200">
                      Try Now →
                    </span>
                  </span>
                </span>
                <span className="sr-only">
                  ZapLead
                </span>
              </span>
            </Link>
            <p className="mt-4 text-base text-white/55 font-light">
              AI that qualifies. Humans that close.
            </p>
          </div>

          <div
            ref={bottomRef}
            className="relative z-20 flex flex-col items-start justify-between gap-4 px-6 py-5 sm:flex-row sm:items-center sm:px-10 sm:py-6"
          >
            <div className="text-xs text-white/45">
              ZapLead © {currentYear}. Built for high-speed lead conversion.
            </div>

            <div className="flex items-center gap-5">
              <a
                href="https://instagram.com/zapleadin"
                target="_blank"
                rel="noopener noreferrer"
                className="pointer-events-auto text-white/50 transition-colors duration-200 hover:text-white"
                aria-label="Instagram"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>

              <a
                href="https://wa.me/918657532671"
                target="_blank"
                rel="noopener noreferrer"
                className="pointer-events-auto text-white/50 transition-colors duration-200 hover:text-white"
                aria-label="WhatsApp"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>

              <a
                href="https://www.linkedin.com/company/zapleadai/posts/?feedView=all"
                target="_blank"
                rel="noopener noreferrer"
                className="pointer-events-auto text-white/50 transition-colors duration-200 hover:text-white"
                aria-label="LinkedIn"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M4.98 3.5C4.98 4.88 3.86 6 2.48 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V24h-4V8zm7 0h3.83v2.17h.05c.53-1 1.84-2.17 3.79-2.17 4.05 0 4.8 2.66 4.8 6.12V24h-4v-7.78c0-1.86-.03-4.25-2.59-4.25-2.6 0-3 2.03-3 4.12V24h-4V8z" />
                </svg>
              </a>

              <a
                href="mailto:aizaplead@gmail.com"
                className="pointer-events-auto text-white/50 transition-colors duration-200 hover:text-white"
                aria-label="Email"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </a>

              <a
                href="#main-content"
                onClick={handleBackToTop}
                className="pointer-events-auto text-xs font-medium uppercase tracking-[0.14em] text-white/55 transition-colors duration-200 hover:text-white"
              >
                Back to Top
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
