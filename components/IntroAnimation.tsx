"use client";

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface IntroAnimationProps {
  onComplete: () => void;
}

export const IntroAnimation: React.FC<IntroAnimationProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!containerRef.current || !logoRef.current || !glowRef.current) return;

    const container = containerRef.current;
    const logo = logoRef.current;
    const glow = glowRef.current;

    // Create main timeline
    const tl = gsap.timeline({
      onComplete: () => {
        setIsVisible(false);
        onComplete();
      }
    });

    // Initial setup
    gsap.set(logo, { scale: 0.9, opacity: 0 });
    gsap.set(glow, { scale: 0.8, opacity: 0 });

    // Animation sequence
    tl
      // Fade in logo centered
      .to(logo, {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: 'power2.out'
      })
      .to(glow, {
        opacity: 0.5,
        scale: 1.2,
        duration: 0.6,
        ease: 'power2.out'
      }, '-=0.6')
      // Brief pause
      .to({}, { duration: 0.4 })
      // Move to top-left
      .to(logo, {
        x: -window.innerWidth / 2 + 140,
        y: -window.innerHeight / 2 + 50,
        scale: 0.35,
        duration: 0.8,
        ease: 'power2.inOut'
      })
      // Fade out background
      .to(glow, {
        opacity: 0,
        duration: 0.5
      }, '-=0.6')
      .to(container, {
        opacity: 0,
        duration: 0.5
      }, '-=0.3');

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{
        background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.3) 0%, rgba(124, 58, 237, 0.3) 50%, rgba(236, 72, 153, 0.3) 100%), #000'
      }}
    >
      {/* Glow effect */}
      <div
        ref={glowRef}
        className="absolute w-[400px] h-[400px] rounded-full blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)'
        }}
      />

      {/* Logo */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={logoRef}
        src="/zaplead.png"
        alt="ZapLead"
        className="relative z-10 drop-shadow-2xl w-[320px] h-auto"
        draggable={false}
      />
    </div>
  );
};
