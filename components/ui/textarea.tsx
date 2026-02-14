import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> { }

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[80px] sm:min-h-[100px] w-full rounded-xl border border-white/[0.12] bg-white/[0.04] px-4 py-3 text-base sm:text-sm text-white backdrop-blur-xl backdrop-saturate-150 ring-offset-background placeholder:text-white/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/30 focus-visible:border-white/[0.25] focus-visible:bg-white/[0.06] disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
