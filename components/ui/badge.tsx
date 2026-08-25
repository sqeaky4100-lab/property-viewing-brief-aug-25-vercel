import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva("inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-bold tracking-wide", {
  variants: {
    variant: {
      default: "bg-primary text-primary-foreground",
      secondary: "bg-secondary text-secondary-foreground",
      success: "bg-emerald-500/13 text-emerald-700 dark:text-emerald-300",
      warning: "bg-amber-500/15 text-amber-900 dark:text-amber-300",
      destructive: "bg-red-500/13 text-red-700 dark:text-red-300",
      blue: "bg-blue-500/13 text-blue-700 dark:text-blue-300",
    },
  },
  defaultVariants: { variant: "secondary" },
});

export function Badge({ className, variant, ...props }: React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof badgeVariants>) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}
