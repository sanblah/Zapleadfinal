"use client";

import React, { useEffect, useRef, useState } from "react";

interface ScrollBlurRevealProps {
  children: React.ReactNode;
  blurAmount?: number;
  duration?: number;
  threshold?: number;
  className?: string;
}

export default function ScrollBlurReveal({
  children,
  blurAmount = 20,
  duration = 0.8,
  threshold = 0.3,
  className = "",
}: ScrollBlurRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update visibility based on whether element is intersecting
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    const element = ref.current;
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [threshold]);

  return (
    <div
      ref={ref}
      className={`transition-all ${className}`}
      style={{
        filter: isVisible ? "blur(0px)" : `blur(${blurAmount}px)`,
        opacity: isVisible ? 1 : 0.3,
        transform: isVisible ? "translateY(0)" : "translateY(20px)",
        transitionDuration: `${duration}s`,
        transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      {children}
    </div>
  );
}
