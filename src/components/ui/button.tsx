import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold uppercase tracking-[0.14em] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-blood-gradient text-white shadow-[0_14px_40px_-16px_rgba(220,20,60,0.9)] hover:shadow-[0_20px_60px_-14px_rgba(220,20,60,1)] hover:brightness-110 active:scale-[0.98]",
        outline:
          "border border-blood-500/40 bg-white/[0.02] text-ash-100 backdrop-blur hover:border-blood-500 hover:bg-blood-500/10 hover:text-white active:scale-[0.98]",
        ghost: "text-ash-200 hover:bg-white/5 hover:text-white",
        whatsapp:
          "bg-[#128C7E] text-white shadow-[0_14px_40px_-18px_rgba(18,140,126,0.95)] hover:bg-[#16a394] hover:shadow-[0_20px_56px_-16px_rgba(18,140,126,1)] active:scale-[0.98]",
        link: "rounded-none text-blood-300 underline-offset-4 hover:text-blood-200 hover:underline",
      },
      size: {
        sm: "h-10 px-5 text-[11px]",
        default: "h-12 px-7",
        lg: "h-14 px-9 text-sm",
        icon: "size-11 rounded-full px-0",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
