"use client";

import { useRef } from "react";
import AnimatedContent from "./AnimatedContent";
import ScrollBlurReveal from "./ScrollBlurReveal";
import DecryptedText from "./DecryptedText";
import { Badge } from "./ui/badge";
import { Sparkles } from "lucide-react";

// Integration logos data
const integrations = [
    {
        name: "WhatsApp",
        icon: (
            <svg viewBox="0 0 24 24" className="w-6 h-6 sm:w-8 sm:h-8" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
        ),
        color: "from-green-400 to-green-600",
        glow: "rgba(34, 197, 94, 0.5)",
    },
    {
        name: "Instagram",
        icon: (
            <svg viewBox="0 0 24 24" className="w-6 h-6 sm:w-8 sm:h-8" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
        ),
        color: "from-pink-500 via-purple-500 to-orange-400",
        glow: "rgba(236, 72, 153, 0.5)",
    },
    {
        name: "Google Calendar",
        icon: (
            <svg viewBox="0 0 24 24" className="w-6 h-6 sm:w-8 sm:h-8" fill="currentColor">
                <path d="M19.5 3h-3V1.5a.5.5 0 00-1 0V3h-7V1.5a.5.5 0 00-1 0V3h-3A2.5 2.5 0 002 5.5v14A2.5 2.5 0 004.5 22h15a2.5 2.5 0 002.5-2.5v-14A2.5 2.5 0 0019.5 3zm1 16.5a1 1 0 01-1 1h-15a1 1 0 01-1-1V9h17v10.5zm0-12H3.5V5.5a1 1 0 011-1h3V6a.5.5 0 001 0V4.5h7V6a.5.5 0 001 0V4.5h3a1 1 0 011 1V7.5z" />
                <path d="M7 12h2v2H7zm4 0h2v2h-2zm4 0h2v2h-2zm-8 4h2v2H7zm4 0h2v2h-2z" />
            </svg>
        ),
        color: "from-blue-400 to-blue-600",
        glow: "rgba(59, 130, 246, 0.5)",
    },
    {
        name: "HubSpot",
        icon: (
            <svg viewBox="0 0 24 24" className="w-6 h-6 sm:w-8 sm:h-8" fill="currentColor">
                <path d="M18.164 7.93V5.084a2.198 2.198 0 001.267-1.984v-.066A2.2 2.2 0 0017.231.834h-.066a2.2 2.2 0 00-2.2 2.2v.066c0 .873.517 1.619 1.257 1.967V7.93a5.19 5.19 0 00-3.099 1.541l-8.15-6.328a2.572 2.572 0 00.12-.77A2.593 2.593 0 002.5 0 2.593 2.593 0 000 2.593a2.593 2.593 0 002.593 2.593c.538 0 1.032-.17 1.443-.455l8.014 6.22a5.203 5.203 0 00-.528 2.285c0 .836.2 1.625.551 2.326l-2.48 2.48a1.97 1.97 0 00-.607-.099 2.006 2.006 0 00-2.006 2.007 2.006 2.006 0 002.006 2.006 2.006 2.006 0 002.006-2.006c0-.217-.04-.423-.1-.619l2.445-2.445a5.21 5.21 0 008.811-3.766c0-2.574-1.866-4.707-4.314-5.15zM17.1 17.48a2.607 2.607 0 01-2.607-2.607 2.607 2.607 0 012.607-2.607 2.607 2.607 0 012.607 2.607 2.607 2.607 0 01-2.607 2.607z" />
            </svg>
        ),
        color: "from-orange-400 to-orange-600",
        glow: "rgba(251, 146, 60, 0.5)",
    },
    {
        name: "Slack",
        icon: (
            <svg viewBox="0 0 24 24" className="w-6 h-6 sm:w-8 sm:h-8" fill="currentColor">
                <path d="M5.042 15.165a2.528 2.528 0 01-2.52 2.523A2.528 2.528 0 010 15.165a2.527 2.527 0 012.522-2.52h2.52v2.52zm1.271 0a2.527 2.527 0 012.521-2.52 2.527 2.527 0 012.521 2.52v6.313A2.528 2.528 0 018.834 24a2.528 2.528 0 01-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 01-2.521-2.52A2.528 2.528 0 018.834 0a2.528 2.528 0 012.521 2.522v2.52H8.834zm0 1.271a2.528 2.528 0 012.521 2.521 2.528 2.528 0 01-2.521 2.521H2.522A2.528 2.528 0 010 8.834a2.528 2.528 0 012.522-2.521h6.312zm10.124 2.521a2.528 2.528 0 012.52-2.521A2.528 2.528 0 0124 8.834a2.528 2.528 0 01-2.522 2.521h-2.52V8.834zm-1.271 0a2.528 2.528 0 01-2.521 2.521 2.528 2.528 0 01-2.521-2.521V2.522A2.528 2.528 0 0115.166 0a2.528 2.528 0 012.521 2.522v6.312zm-2.521 10.124a2.528 2.528 0 012.521 2.52A2.528 2.528 0 0115.166 24a2.528 2.528 0 01-2.521-2.522v-2.52h2.521zm0-1.271a2.528 2.528 0 01-2.521-2.521 2.528 2.528 0 012.521-2.521h6.312A2.528 2.528 0 0124 15.166a2.528 2.528 0 01-2.522 2.521h-6.312z" />
            </svg>
        ),
        color: "from-purple-400 via-pink-400 to-yellow-400",
        glow: "rgba(168, 85, 247, 0.5)",
    },
    {
        name: "Notion",
        icon: (
            <svg viewBox="0 0 24 24" className="w-6 h-6 sm:w-8 sm:h-8" fill="currentColor">
                <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 2.07c-.42-.326-.98-.7-2.055-.607L3.186 2.676c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.886l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952l1.448.327s0 .84-1.168.84l-3.22.186c-.094-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.14c-.093-.514.28-.886.747-.933zM1.936 1.035l13.31-1.026c1.635-.14 2.055-.047 3.082.7l4.25 2.986c.7.513.934.653.934 1.213v16.378c0 1.026-.373 1.634-1.68 1.726l-15.458.934c-.98.047-1.448-.093-1.962-.747l-3.129-4.06c-.56-.747-.793-1.306-.793-1.96V2.667c0-.839.374-1.54 1.446-1.632z" />
            </svg>
        ),
        color: "from-gray-200 to-gray-400",
        glow: "rgba(156, 163, 175, 0.5)",
    },
    {
        name: "Zapier",
        icon: (
            <svg viewBox="0 0 24 24" className="w-6 h-6 sm:w-8 sm:h-8" fill="currentColor">
                <path d="M15.4 11.6L21 6l-2-2-5.6 5.6L8 4 6 6l5.6 5.6L6 17.2l2 2 5.4-5.6L19 19.2l2-2-5.6-5.6zM12 13.6c-.9 0-1.6-.7-1.6-1.6s.7-1.6 1.6-1.6 1.6.7 1.6 1.6-.7 1.6-1.6 1.6z" />
            </svg>
        ),
        color: "from-orange-500 to-red-500",
        glow: "rgba(249, 115, 22, 0.5)",
    },
    {
        name: "Gmail",
        icon: (
            <svg viewBox="0 0 24 24" className="w-6 h-6 sm:w-8 sm:h-8" fill="currentColor">
                <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 010 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" />
            </svg>
        ),
        color: "from-red-400 to-red-600",
        glow: "rgba(248, 113, 113, 0.5)",
    },
    {
        name: "Salesforce",
        icon: (
            <svg viewBox="0 0 24 24" className="w-6 h-6 sm:w-8 sm:h-8" fill="currentColor">
                <path d="M10.006 5.415a4.195 4.195 0 013.045-1.306c1.56 0 2.954.9 3.69 2.205.63-.3 1.35-.45 2.1-.45 2.85 0 5.159 2.34 5.159 5.22s-2.31 5.22-5.16 5.22c-.42 0-.81-.045-1.2-.15-.63 1.38-2.025 2.34-3.66 2.34-.48 0-.93-.075-1.35-.24a4.158 4.158 0 01-3.78 2.46 4.158 4.158 0 01-3.96-2.88 4.437 4.437 0 01-.99.12c-2.43 0-4.41-1.98-4.41-4.44a4.419 4.419 0 013.27-4.29A4.678 4.678 0 017.06 5.94c1.26 0 2.37.51 3.21 1.35a4.804 4.804 0 01-.27-1.875h.006z" />
            </svg>
        ),
        color: "from-blue-400 to-cyan-400",
        glow: "rgba(56, 189, 248, 0.5)",
    },
    {
        name: "Airtable",
        icon: (
            <svg viewBox="0 0 24 24" className="w-6 h-6 sm:w-8 sm:h-8" fill="currentColor">
                <path d="M11.992 1.966L2.433 5.502a.865.865 0 00-.024 1.612l9.494 3.787a.978.978 0 00.723 0l9.494-3.787a.865.865 0 00-.024-1.612L12.536 1.966a.975.975 0 00-.544 0zM2.04 8.767v8.093c0 .335.257.612.598.667l9.161 1.51a.38.38 0 00.443-.375v-8.27a.642.642 0 00-.412-.599L2.735 6.48c-.444-.17-.88.178-.695.623v1.664zm19.92 0v8.093a.686.686 0 01-.598.667l-9.16 1.51a.38.38 0 01-.444-.375v-8.27c0-.27.165-.512.412-.599l9.095-3.313c.444-.17.88.178.695.623v1.664z" />
            </svg>
        ),
        color: "from-yellow-400 to-yellow-600",
        glow: "rgba(250, 204, 21, 0.5)",
    },
    {
        name: "Google Sheets",
        icon: (
            <svg viewBox="0 0 24 24" className="w-6 h-6 sm:w-8 sm:h-8" fill="currentColor">
                <path d="M19.5 3H8.55L4.5 7.05V21c0 .825.675 1.5 1.5 1.5h13.5c.825 0 1.5-.675 1.5-1.5V4.5c0-.825-.675-1.5-1.5-1.5zM9 9h6v1.5H9V9zm6 3H9v1.5h6V12zm0 3H9v1.5h6V15zm1.5 3H7.5v-1.5h9V18zM8.25 6.75V4.5l-3.75 3.75h2.25c.825 0 1.5-.675 1.5-1.5z" />
            </svg>
        ),
        color: "from-green-400 to-green-600",
        glow: "rgba(74, 222, 128, 0.5)",
    },
    {
        name: "Calendly",
        icon: (
            <svg viewBox="0 0 24 24" className="w-6 h-6 sm:w-8 sm:h-8" fill="currentColor">
                <path d="M19.655 14.262c-.186 2.108-1.187 3.927-2.674 5.152-1.737 1.421-3.997 2.04-6.186 1.734-2.188-.306-4.156-1.453-5.435-3.17-1.314-1.76-1.8-3.955-1.37-6.018.445-2.123 1.765-4.016 3.601-5.175 1.815-1.15 4.013-1.523 6.098-1.04.178.042.36.09.534.145 2.022.638 3.73 2.073 4.71 3.964.98 1.89 1.168 4.116.722 6.408z" />
                <circle cx="12" cy="12" r="4" fill="white" />
            </svg>
        ),
        color: "from-blue-500 to-indigo-600",
        glow: "rgba(99, 102, 241, 0.5)",
    },
];

interface LogoCardProps {
    integration: typeof integrations[0];
    index: number;
}

function LogoCard({ integration, index }: LogoCardProps) {
    return (
        <div
            className="logo-card group relative flex-shrink-0 mx-2 sm:mx-3"
            style={{ animationDelay: `${index * 0.1}s` }}
        >
            <div
                className={`
          relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-xl sm:rounded-2xl
          bg-gradient-to-br ${integration.color}
          p-[1px] overflow-hidden
          transition-all duration-500 ease-out
          group-hover:scale-110 group-hover:-translate-y-2
          group-hover:rotate-3
        `}
                style={{
                    boxShadow: `0 4px 20px -4px ${integration.glow}`,
                }}
            >
                {/* Inner glass container */}
                <div className="absolute inset-[1px] rounded-xl sm:rounded-2xl bg-black/80 backdrop-blur-xl flex items-center justify-center overflow-hidden">
                    {/* Floating animation wrapper */}
                    <div className="logo-float text-white/90 group-hover:text-white transition-colors duration-300">
                        {integration.icon}
                    </div>

                    {/* Glow effect on hover */}
                    <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{
                            background: `radial-gradient(circle at center, ${integration.glow} 0%, transparent 70%)`,
                        }}
                    />

                    {/* Shine sweep effect */}
                    <div className="absolute inset-0 overflow-hidden rounded-xl sm:rounded-2xl">
                        <div className="logo-shine absolute -inset-full w-[200%] h-[200%] bg-gradient-to-r from-transparent via-white/20 to-transparent rotate-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                    </div>
                </div>
            </div>

            {/* Label on hover */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:-translate-y-1">
                <span className="text-xs text-white/70 font-medium whitespace-nowrap bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full">
                    {integration.name}
                </span>
            </div>
        </div>
    );
}

export default function LogosMarquee() {
    const containerRef = useRef<HTMLDivElement>(null);

    // Single duplication for seamless infinite scroll — no need for 4x copies
    const marqueeItems = [...integrations, ...integrations];

    return (
        <section className="py-16 sm:py-24 relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="mx-auto max-w-7xl px-4 sm:px-6 relative z-10" ref={containerRef}>
                <ScrollBlurReveal>
                    {/* Section Header */}
                    <div className="mb-10 sm:mb-16 text-center">
                        <AnimatedContent delay={0} duration={0.8}>
                            <Badge variant="outline" className="mb-4 sm:mb-6 glass-badge text-purple-300 border-purple-500/30 px-4 py-1.5">
                                <Sparkles className="h-3 w-3 mr-2 animate-pulse" />
                                Universal Connectivity
                            </Badge>
                        </AnimatedContent>
                        <AnimatedContent delay={0.2} duration={0.8}>
                            <h2 className="mb-4 sm:mb-6 text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
                                <DecryptedText
                                    text="We Can Help You Connect Anything"
                                    animateOn="view"
                                    sequential={true}
                                    revealDirection="center"
                                    speed={80}
                                    className="text-white"
                                    encryptedClassName="text-white/40"
                                />
                            </h2>
                        </AnimatedContent>
                        <AnimatedContent delay={0.4} duration={0.8}>
                            <p className="text-base sm:text-xl text-white/70 max-w-2xl mx-auto">
                                Your <span className="text-blue-400 font-semibold">CRM</span>, <span className="text-green-400 font-semibold">WhatsApp</span>, calendars, spreadsheets—whatever tools you use, we&apos;ll make them talk to each other.
                            </p>
                        </AnimatedContent>
                    </div>
                </ScrollBlurReveal>

                {/* Single Marquee Row */}
                <div className="relative">
                    {/* Edge fades */}
                    <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 z-10 bg-gradient-to-r from-[#000510] to-transparent pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 z-10 bg-gradient-to-l from-[#000510] to-transparent pointer-events-none" />

                    <div className="marquee-container overflow-hidden">
                        <div className="marquee-track-left flex py-4">
                            {marqueeItems.map((integration, index) => (
                                <LogoCard key={`marquee-${index}`} integration={integration} index={index} />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <AnimatedContent delay={0.6} duration={0.8}>
                    <div className="mt-10 sm:mt-16 flex flex-wrap justify-center gap-6 sm:gap-8 md:gap-16">
                        {[
                            { value: "50+", label: "Integrations" },
                            { value: "3-4 Weeks", label: "Setup Time" },
                            { value: "0", label: "Code Required" },
                        ].map((stat, index) => (
                            <div key={index} className="text-center group cursor-default">
                                <div className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                                    {stat.value}
                                </div>
                                <div className="text-xs sm:text-sm text-white/50 mt-1">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </AnimatedContent>
            </div>
        </section>
    );
}
