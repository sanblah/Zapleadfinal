import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> { }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-12 sm:h-11 w-full rounded-xl border border-white/[0.12] bg-white/[0.04] px-4 py-2.5 sm:py-2 text-base sm:text-sm text-white backdrop-blur-xl backdrop-saturate-150 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-white/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/30 focus-visible:border-white/[0.25] focus-visible:bg-white/[0.06] disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
