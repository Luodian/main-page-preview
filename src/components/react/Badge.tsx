import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent font-medium bg-accent-base text-bgColor hover:bg-accent-base/80",
        secondary:
          "border-transparent font-medium bg-accent-base/10 text-accent-base hover:bg-accent-base/20",
        destructive:
          "border-transparent bg-red-500 text-white hover:bg-red-500/80",
        outline: "text-textColor border-special-light",
        accent: "border-transparent bg-accent text-bgColor hover:bg-accent/80",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  showHash?: boolean;
}

function Badge({
  className,
  variant,
  showHash = false,
  children,
  ...props
}: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      {showHash && "#"}
      {children}
    </div>
  );
}

export { Badge, badgeVariants };
