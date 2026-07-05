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
  // Once the reveal transition ends, drop the filter entirely so scrolling
  // doesn't keep compositing a (blur 0px) filter layer over a whole section.
  const [isSettled, setIsSettled] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsVisible(true);
      setIsSettled(true);
      return;
    }

    // Reveal once and stop observing: re-blurring sections on the way out of
    // the viewport caused large repaints on every scroll.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  useEffect(() => {
    if (!isVisible || isSettled) {
      return;
    }
    const timer = setTimeout(() => setIsSettled(true), duration * 1000);
    return () => clearTimeout(timer);
  }, [isVisible, isSettled, duration]);

  return (
    <div
      ref={ref}
      className={className}
      style={
        isSettled
          ? undefined
          : {
              filter: isVisible ? "blur(0px)" : `blur(${blurAmount}px)`,
              opacity: isVisible ? 1 : 0.3,
              transform: isVisible ? "translateY(0)" : "translateY(20px)",
              transitionProperty: "filter, opacity, transform",
              transitionDuration: `${duration}s`,
              transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
            }
      }
    >
      {children}
    </div>
  );
}
