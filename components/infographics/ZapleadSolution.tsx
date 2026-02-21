"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { ShieldCheck, Zap } from "lucide-react";

const ZapleadSolution = () => {
    const [leads, setLeads] = useState<number[]>([]);

    useEffect(() => {
        const interval = setInterval(() => {
            setLeads((prev) => {
                const now = Date.now();
                const newLeads = [...prev, now];
                if (newLeads.length > 20) return newLeads.slice(newLeads.length - 20);
                return newLeads;
            });
        }, 600); // Fast flow
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative mx-auto flex w-full max-w-4xl flex-col items-center justify-center overflow-hidden rounded-3xl border border-blue-500/30 bg-black/80 p-4 shadow-[0_0_50px_rgba(59,130,246,0.15)] backdrop-blur-xl sm:p-8 min-h-[430px] sm:min-h-[500px]">
            {/* Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#3b82f61a_1px,transparent_1px),linear-gradient(to_bottom,#3b82f61a_1px,transparent_1px)] bg-[size:24px_24px]" />
            <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 via-transparent to-black/90 pointer-events-none" />

            <h3 className="z-10 mb-8 flex items-center gap-2 text-center text-2xl sm:text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white sm:mb-12 sm:gap-3">
                <Zap className="h-5 w-5 text-blue-400 fill-blue-400 animate-pulse sm:h-6 sm:w-6" />
                The Automated Pipeline
            </h3>

            <div className="relative h-[220px] w-full max-w-2xl sm:h-[350px]">
                <svg className="h-full w-full" viewBox="0 0 600 300">
                    <defs>
                        <linearGradient id="fiberGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.2" />
                            <stop offset="50%" stopColor="#60A5FA" stopOpacity="0.8" />
                            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.2" />
                        </linearGradient>
                        <filter id="blueGlow" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                            <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                        <filter id="greenGlow" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                            <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>

                    {/* Main Fiber Optic Path */}
                    <path
                        d="M 50 150 C 150 150, 150 100, 250 100 C 350 100, 350 200, 450 200 C 550 200, 550 150, 600 150"
                        stroke="#1e3a8a"
                        strokeWidth="8"
                        fill="none"
                        strokeLinecap="round"
                        className="opacity-50"
                    />

                    {/* Animated Pulse on Path */}
                    <motion.path
                        d="M 50 150 C 150 150, 150 100, 250 100 C 350 100, 350 200, 450 200 C 550 200, 550 150, 600 150"
                        stroke="url(#fiberGradient)"
                        strokeWidth="8"
                        fill="none"
                        strokeLinecap="round"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: [0, 1, 1], pathOffset: [0, 0, 1], opacity: [0, 1, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />

                    {/* Shield 1: Instant Reply */}
                    <g transform="translate(250, 100)">
                        <circle r="25" fill="#1e3a8a" fillOpacity="0.5" className="animate-pulse" />
                        <circle r="25" stroke="#60A5FA" strokeWidth="2" fill="none" strokeDasharray="4 4" className="animate-[spin_4s_linear_infinite]" />
                        <foreignObject x="-20" y="-20" width="40" height="40">
                            <div className="flex items-center justify-center w-full h-full text-blue-400">
                                <ShieldCheck size={24} />
                            </div>
                        </foreignObject>
                        <text x="0" y="-35" textAnchor="middle" className="fill-blue-300 text-[10px] font-mono tracking-wider uppercase">Instant Reply</text>
                    </g>

                    {/* Shield 2: Auto Follow-up */}
                    <g transform="translate(450, 200)">
                        <circle r="25" fill="#1e3a8a" fillOpacity="0.5" className="animate-pulse" />
                        <circle r="25" stroke="#60A5FA" strokeWidth="2" fill="none" strokeDasharray="4 4" className="animate-[spin_4s_linear_infinite_reverse]" />
                        <foreignObject x="-20" y="-20" width="40" height="40">
                            <div className="flex items-center justify-center w-full h-full text-blue-400">
                                <ShieldCheck size={24} />
                            </div>
                        </foreignObject>
                        <text x="0" y="45" textAnchor="middle" className="fill-blue-300 text-[10px] font-mono tracking-wider uppercase">Auto Follow-up</text>
                    </g>

                    {/* Leads */}
                    {leads.map((lead) => (
                        <Lead key={lead} />
                    ))}

                </svg>
            </div>

            <div className="z-10 mt-2 text-center">
                <p className="text-blue-400/80 text-[11px] sm:text-sm uppercase tracking-[0.14em] sm:tracking-widest font-mono">
                    System Status: <span className="text-green-400 font-bold">OPTIMIZED (100%)</span>
                </p>
            </div>
        </div>
    );
};

const Lead = () => {
    return (
        <motion.g>
            <motion.circle
                r="5"
                fill="#60A5FA"
                filter="url(#blueGlow)"
                style={{
                    offsetPath: 'path("M 50 150 C 150 150, 150 100, 250 100 C 350 100, 350 200, 450 200 C 550 200, 550 150, 600 150")'
                }}
                animate={{
                    offsetDistance: ["0%", "100%"],
                    fill: ["#60A5FA", "#4ADE80"],
                    filter: ["url(#blueGlow)", "url(#greenGlow)"]
                }}
                transition={{ duration: 3, ease: "linear" }}
            />
        </motion.g>
    );
};

export default ZapleadSolution;
