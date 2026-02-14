"use client";

import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { XCircle, AlertTriangle } from "lucide-react";

const PipelineLeakage = () => {
    const [leads, setLeads] = useState<number[]>([]);
    const [revenueLost, setRevenueLost] = useState(0);
    const [shake, setShake] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setLeads((prev) => {
                const now = Date.now();
                const newLeads = [...prev, now];
                if (newLeads.length > 20) return newLeads.slice(newLeads.length - 20);
                return newLeads;
            });
        }, 1000); // Slightly faster to increase chaos
        return () => clearInterval(interval);
    }, []);

    // Trigger shake and revenue loss on leaks
    const handleLeak = () => {
        setRevenueLost((prev) => prev + 12500); // ₹12,500 per lead (avg deal value)
        setShake(true);
        setTimeout(() => setShake(false), 200);
    };

    return (
        <motion.div
            className="w-full max-w-4xl mx-auto p-4 sm:p-6 md:p-8 bg-black/90 border border-red-500/30 rounded-2xl sm:rounded-3xl backdrop-blur-xl overflow-hidden relative min-h-[350px] sm:min-h-[550px] flex flex-col items-center justify-center shadow-[0_0_50px_rgba(239,68,68,0.2)]"
            animate={shake ? { x: [-5, 5, -5, 5, 0], backgroundColor: "rgba(50, 0, 0, 0.9)" } : { backgroundColor: "rgba(0, 0, 0, 0.9)" }}
            transition={{ duration: 0.2 }}
        >
            {/* Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ef44441a_1px,transparent_1px),linear-gradient(to_bottom,#ef44441a_1px,transparent_1px)] bg-[size:32px_32px]" />
            <div className="absolute inset-0 bg-gradient-to-b from-red-900/10 via-transparent to-black/90 pointer-events-none" />

            {/* Top labels - stacked on mobile, absolute positioned on desktop */}
            <div className="relative z-20 w-full flex flex-col sm:flex-row sm:justify-between items-start gap-2 sm:gap-0 mb-4 sm:mb-0 sm:absolute sm:top-8 sm:left-8 sm:right-8">
                <div className="flex items-center gap-1.5 sm:gap-2">
                    <AlertTriangle className="text-red-500 animate-pulse w-4 h-4 sm:w-6 sm:h-6" />
                    <span className="text-red-500 font-bold tracking-widest uppercase text-[10px] sm:text-sm">System Critical</span>
                </div>
                <div className="text-left sm:text-right">
                    <p className="text-red-400 text-[10px] sm:text-xs font-mono uppercase tracking-widest mb-0.5 sm:mb-1 animate-pulse">Lost Revenue (Today)</p>
                    <div className="text-lg sm:text-2xl md:text-4xl font-black text-red-500 font-mono tracking-tighter tabular-nums">
                        -₹{revenueLost.toLocaleString()}
                    </div>
                </div>
            </div>

            <h3 className="text-lg sm:text-2xl md:text-3xl font-bold text-white mb-4 sm:mb-12 z-10 tracking-tight text-center">
                This Is Happening <span className="text-red-500 bg-red-500/10 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-base sm:text-2xl md:text-3xl">Right Now</span>
            </h3>

            <div className="relative w-full max-w-2xl h-[180px] sm:h-[280px] md:h-[350px]">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 600 300">
                    <defs>
                        <linearGradient id="pipeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#334155" stopOpacity="0.5" />
                            <stop offset="50%" stopColor="#475569" stopOpacity="0.5" />
                            <stop offset="100%" stopColor="#334155" stopOpacity="0.5" />
                        </linearGradient>
                        <filter id="redGlow" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur stdDeviation="6" result="coloredBlur" />
                            <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>

                    {/* Main Pipe Path (Broken) */}
                    <path d="M 50 150 L 200 150" stroke="url(#pipeGradient)" strokeWidth="40" fill="none" strokeLinecap="round" />
                    <path d="M 250 150 L 400 150" stroke="url(#pipeGradient)" strokeWidth="40" fill="none" strokeLinecap="round" />
                    <path d="M 450 150 L 550 150" stroke="url(#pipeGradient)" strokeWidth="40" fill="none" strokeLinecap="round" />

                    {/* Leak Visuals */}
                    <g transform="translate(225, 170)">
                        <circle r="4" fill="#EF4444" filter="url(#redGlow)" className="animate-ping" />
                        <text x="0" y="50" textAnchor="middle" className="fill-red-500 text-xs font-bold font-mono tracking-wider uppercase">Slow Reply</text>
                    </g>

                    <g transform="translate(425, 170)">
                        <circle r="4" fill="#EF4444" filter="url(#redGlow)" className="animate-ping" style={{ animationDelay: "0.5s" }} />
                        <text x="0" y="50" textAnchor="middle" className="fill-red-500 text-xs font-bold font-mono tracking-wider uppercase">No Follow-up</text>
                    </g>

                    {/* Leads */}
                    <AnimatePresence>
                        {leads.map((lead) => (
                            <Lead key={lead} onLeak={handleLeak} />
                        ))}
                    </AnimatePresence>

                </svg>
            </div>

            <div className="z-10 mt-2 text-center">
                <p className="text-red-500/80 text-[10px] sm:text-sm uppercase tracking-widest font-mono animate-pulse">
                    ⚠ EVERY 5 MINUTES, A LEAD GOES COLD
                </p>
            </div>
        </motion.div>
    );
};

const Lead = ({ onLeak }: { onLeak: () => void }) => {
    const [fate, setFate] = useState<"leak1" | "leak2" | "survive">("survive");
    const [isDead, setIsDead] = useState(false);

    useEffect(() => {
        const r = Math.random();
        if (r < 0.45) setFate("leak1");
        else if (r < 0.85) setFate("leak2");
        else setFate("survive");
    }, []);

    return (
        <motion.g>
            {!isDead ? (
                <motion.circle
                    r="6"
                    fill="#60A5FA"
                    initial={{ cx: 50, cy: 150, opacity: 0 }}
                    animate={
                        fate === "leak1"
                            ? { cx: [50, 225], cy: [150, 150], opacity: [0, 1] }
                            : fate === "leak2"
                                ? { cx: [50, 425], cy: [150, 150], opacity: [0, 1] }
                                : { cx: [50, 550], cy: [150, 150], opacity: [0, 1, 0] }
                    }
                    transition={{
                        duration: fate === "survive" ? 4 : fate === "leak1" ? 1.5 : 2.5,
                        ease: "linear" as any,
                    }}
                    onAnimationComplete={() => {
                        if (fate !== "survive") {
                            setIsDead(true);
                            onLeak();
                        }
                    }}
                />
            ) : (
                <motion.g
                    initial={{ opacity: 1, scale: 1 }}
                    animate={{ opacity: 0, y: 100, scale: 0.5 }}
                    transition={{ duration: 0.8 }}
                >
                    {/* Skull / X Icon when dead */}
                    <foreignObject
                        x={fate === "leak1" ? 213 : 413}
                        y={138}
                        width="24"
                        height="24"
                    >
                        <div className="flex items-center justify-center w-full h-full">
                            <XCircle className="text-red-500 w-6 h-6 drop-shadow-[0_0_10px_rgba(239,68,68,0.8)]" />
                        </div>
                    </foreignObject>
                </motion.g>
            )}
        </motion.g>
    );
};

export default PipelineLeakage;
