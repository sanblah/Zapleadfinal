"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface BlurTextProps {
    text: string;
    className?: string;
    variant?: {
        hidden: { filter: string; opacity: number; y: number };
        visible: { filter: string; opacity: number; y: number };
    };
    duration?: number;
    delay?: number;
}

export function BlurText({
    text,
    className,
    variant,
    duration = 1,
    delay = 0.2,
}: BlurTextProps) {
    const defaultVariants = {
        hidden: { filter: "blur(10px)", opacity: 0, y: 20 },
        visible: { filter: "blur(0px)", opacity: 1, y: 0 },
    };
    const combinedVariants = variant || defaultVariants;

    return (
        <motion.h1
            initial="hidden"
            animate="visible"
            transition={{ duration, delay }}
            variants={combinedVariants}
            className={cn("font-display text-4xl font-bold tracking-tight drop-shadow-sm", className)}
        >
            {text}
        </motion.h1>
    );
}
