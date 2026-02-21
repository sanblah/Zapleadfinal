"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Phone, MessageCircle, Mail, X } from "lucide-react";

export default function MobileActions() {
    const [isVisible, setIsVisible] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        // Only show on mobile
        const checkMobile = () => {
            setIsVisible(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener("resize", checkMobile);

        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    if (!isVisible) return null;

    return (
        <>
            {/* Floating WhatsApp button */}
            <a
                href="https://wa.me/918657532671?text=Hi%2C%20I%27m%20interested%20in%20ZapLead"
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-24 right-4 z-50 flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-transform duration-300 active:scale-90"
                style={{
                    background: "#25D366",
                    boxShadow: "0 4px 20px rgba(37,211,102,0.4)",
                }}
                aria-label="Chat on WhatsApp"
            >
                <MessageCircle className="w-6 h-6 text-white" fill="white" />
            </a>

            {/* Sticky bottom CTA bar */}
            <div
                className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 backdrop-blur-xl"
                style={{
                    background: "rgba(0,2,15,0.92)",
                    paddingBottom: "env(safe-area-inset-bottom)",
                }}
            >
                <div className="flex items-center justify-around py-2 px-4 gap-2">
                    {/* Call button */}
                    <a
                        href="tel:+918657532671"
                        className="flex flex-col items-center gap-1 py-2 px-3 rounded-xl transition-colors active:bg-white/10"
                    >
                        <Phone className="w-5 h-5 text-white/80" />
                        <span className="text-[10px] text-white/60">Call</span>
                    </a>

                    {/* WhatsApp button */}
                    <a
                        href="https://wa.me/918657532671?text=Hi%2C%20I%27m%20interested%20in%20ZapLead"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center gap-1 py-2 px-3 rounded-xl transition-colors active:bg-white/10"
                    >
                        <MessageCircle className="w-5 h-5 text-green-400" />
                        <span className="text-[10px] text-white/60">WhatsApp</span>
                    </a>

                    {/* Get Started CTA */}
                    <Link
                        href="/contact"
                        className="flex-1 max-w-[180px] text-center py-2.5 px-4 rounded-full text-sm font-bold text-black transition-transform active:scale-95"
                        style={{ background: "white" }}
                    >
                        Get Started
                    </Link>

                    {/* Email button */}
                    <a
                        href="mailto:aizaplead@gmail.com"
                        className="flex flex-col items-center gap-1 py-2 px-3 rounded-xl transition-colors active:bg-white/10"
                    >
                        <Mail className="w-5 h-5 text-white/80" />
                        <span className="text-[10px] text-white/60">Email</span>
                    </a>
                </div>
            </div>
        </>
    );
}
