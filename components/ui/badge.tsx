import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 backdrop-blur-xl backdrop-saturate-150",
  {
    variants: {
      variant: {
        default:
          "border-white/[0.12] bg-white/[0.08] text-white/90 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]",
        outline: "border-white/[0.15] bg-white/[0.06] text-foreground shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof badgeVariants> { }

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
