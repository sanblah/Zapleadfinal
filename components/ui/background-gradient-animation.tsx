"use client";
import { cn } from "@/lib/utils";
import { CSSProperties, useEffect, useRef, useState } from "react";

export const BackgroundGradientAnimation = ({
    gradientBackgroundStart = "rgb(108, 0, 162)",
    gradientBackgroundEnd = "rgb(0, 17, 82)",
    firstColor = "18, 113, 255",
    secondColor = "221, 74, 255",
    thirdColor = "100, 220, 255",
    fourthColor = "200, 50, 50",
    fifthColor = "180, 180, 50",
    pointerColor = "140, 100, 255",
    size = "80%",
    blendingValue = "hard-light",
    children,
    className,
    interactive = true,
    containerClassName,
}: {
    gradientBackgroundStart?: string;
    gradientBackgroundEnd?: string;
    firstColor?: string;
    secondColor?: string;
    thirdColor?: string;
    fourthColor?: string;
    fifthColor?: string;
    pointerColor?: string;
    size?: string;
    blendingValue?: string;
    children?: React.ReactNode;
    className?: string;
    interactive?: boolean;
    containerClassName?: string;
}) => {
    const interactiveRef = useRef<HTMLDivElement>(null);
    const currentPositionRef = useRef({ x: 0, y: 0 });
    const targetPositionRef = useRef({ x: 0, y: 0 });
    const animationFrameRef = useRef<number | null>(null);
    const gradientVariables = {
        "--gradient-background-start": gradientBackgroundStart,
        "--gradient-background-end": gradientBackgroundEnd,
        "--first-color": firstColor,
        "--second-color": secondColor,
        "--third-color": thirdColor,
        "--fourth-color": fourthColor,
        "--fifth-color": fifthColor,
        "--pointer-color": pointerColor,
        "--size": size,
        "--blending-value": blendingValue,
    } as CSSProperties;

    const startPointerAnimation = () => {
        if (!interactive) {
            return;
        }
        if (animationFrameRef.current !== null) {
            return;
        }

        const move = () => {
            const node = interactiveRef.current;
            if (!node) {
                return;
            }

            const current = currentPositionRef.current;
            const target = targetPositionRef.current;
            const deltaX = target.x - current.x;
            const deltaY = target.y - current.y;

            current.x += deltaX / 20;
            current.y += deltaY / 20;

            node.style.transform = `translate3d(${Math.round(current.x)}px, ${Math.round(
                current.y
            )}px, 0)`;

            if (Math.abs(deltaX) < 0.5 && Math.abs(deltaY) < 0.5) {
                current.x = target.x;
                current.y = target.y;
                animationFrameRef.current = null;
                return;
            }

            animationFrameRef.current = requestAnimationFrame(move);
        };

        animationFrameRef.current = requestAnimationFrame(move);
    };

    useEffect(() => {
        return () => {
            if (animationFrameRef.current !== null) {
                cancelAnimationFrame(animationFrameRef.current);
                animationFrameRef.current = null;
            }
        };
    }, [interactive]);

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
        if (interactiveRef.current) {
            const rect = interactiveRef.current.getBoundingClientRect();
            targetPositionRef.current = {
                x: event.clientX - rect.left,
                y: event.clientY - rect.top,
            };
            startPointerAnimation();
        }
    };

    const [isSafari, setIsSafari] = useState(false);
    useEffect(() => {
        setIsSafari(/^((?!chrome|android).)*safari/i.test(navigator.userAgent));
    }, []);

    return (
        <div
            className={cn(
                "h-screen w-screen relative overflow-hidden top-0 left-0 bg-[linear-gradient(40deg,var(--gradient-background-start),var(--gradient-background-end))]",
                containerClassName
            )}
            style={gradientVariables}
        >
            <svg className="hidden">
                <defs>
                    <filter id="blurMe">
                        <feGaussianBlur
                            in="SourceGraphic"
                            stdDeviation="10"
                            result="blur"
                        />
                        <feColorMatrix
                            in="blur"
                            mode="matrix"
                            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
                            result="goo"
                        />
                        <feBlend in="SourceGraphic" in2="goo" />
                    </filter>
                </defs>
            </svg>
            <div className={cn("", className)}>{children}</div>
            <div
                className={cn(
                    "gradients-container h-full w-full blur-lg",
                    isSafari ? "blur-2xl" : "[filter:url(#blurMe)_blur(40px)]"
                )}
            >
                <div
                    className={cn(
                        `absolute [background:radial-gradient(circle_at_center,_var(--first-color)_0,_var(--first-color)_50%)_no-repeat]`,
                        `[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]`,
                        `[transform-origin:center_center] will-change-transform`,
                        `animate-first`,
                        `opacity-100`
                    )}
                ></div>
                <div
                    className={cn(
                        `absolute [background:radial-gradient(circle_at_center,_rgba(var(--second-color),_0.8)_0,_rgba(var(--second-color),_0)_50%)_no-repeat]`,
                        `[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]`,
                        `[transform-origin:calc(50%-400px)] will-change-transform`,
                        `animate-second`,
                        `opacity-100`
                    )}
                ></div>
                <div
                    className={cn(
                        `absolute [background:radial-gradient(circle_at_center,_rgba(var(--third-color),_0.8)_0,_rgba(var(--third-color),_0)_50%)_no-repeat]`,
                        `[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]`,
                        `[transform-origin:calc(50%+400px)] will-change-transform`,
                        `animate-third`,
                        `opacity-100`
                    )}
                ></div>
                <div
                    className={cn(
                        `absolute [background:radial-gradient(circle_at_center,_rgba(var(--fourth-color),_0.8)_0,_rgba(var(--fourth-color),_0)_50%)_no-repeat]`,
                        `[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]`,
                        `[transform-origin:calc(50%-200px)] will-change-transform`,
                        `animate-fourth`,
                        `opacity-70`
                    )}
                ></div>
                <div
                    className={cn(
                        `absolute [background:radial-gradient(circle_at_center,_rgba(var(--fifth-color),_0.8)_0,_rgba(var(--fifth-color),_0)_50%)_no-repeat]`,
                        `[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]`,
                        `[transform-origin:calc(50%-800px)_calc(50%+800px)] will-change-transform`,
                        `animate-fifth`,
                        `opacity-100`
                    )}
                ></div>

                {interactive && (
                    <div
                        ref={interactiveRef}
                        onMouseMove={handleMouseMove}
                        className={cn(
                            `absolute [background:radial-gradient(circle_at_center,_rgba(var(--pointer-color),_0.8)_0,_rgba(var(--pointer-color),_0)_50%)_no-repeat]`,
                            `[mix-blend-mode:var(--blending-value)] w-full h-full -top-1/2 -left-1/2`,
                            `opacity-70 will-change-transform`
                        )}
                    ></div>
                )}
            </div>
        </div>
    );
};
