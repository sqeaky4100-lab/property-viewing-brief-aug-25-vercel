"use client";

import * as React from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export const Sheet = SheetPrimitive.Root;
export const SheetTrigger = SheetPrimitive.Trigger;
export const SheetClose = SheetPrimitive.Close;

export function SheetContent({ className, children, ...props }: React.ComponentProps<typeof SheetPrimitive.Content>) {
  return (
    <SheetPrimitive.Portal>
      <SheetPrimitive.Overlay className="fixed inset-0 z-50 bg-black/42 backdrop-blur-[2px] data-[state=closed]:animate-out data-[state=open]:animate-in" />
      <SheetPrimitive.Content
        className={cn("fixed inset-y-0 left-0 z-50 flex w-[88vw] max-w-sm flex-col border-r border-border bg-background shadow-2xl outline-none data-[state=closed]:-translate-x-full data-[state=open]:translate-x-0 transition-transform duration-300", className)}
        {...props}
      >
        {children}
        <SheetPrimitive.Close className="absolute right-3 top-[calc(.75rem+env(safe-area-inset-top))] flex size-11 items-center justify-center rounded-full bg-muted" aria-label="Close navigation">
          <X className="size-5" />
        </SheetPrimitive.Close>
      </SheetPrimitive.Content>
    </SheetPrimitive.Portal>
  );
}

export const SheetTitle = SheetPrimitive.Title;
export const SheetDescription = SheetPrimitive.Description;
