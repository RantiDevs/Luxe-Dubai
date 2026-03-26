import React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { motion } from "framer-motion";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    const baseStyles = "relative inline-flex items-center justify-center overflow-hidden font-sans tracking-wide transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-primary/50 hover-trigger";
    
    const variants = {
      primary: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_20px_rgba(201,168,76,0.15)] hover:shadow-[0_0_30px_rgba(201,168,76,0.3)]",
      outline: "border border-primary text-primary hover:bg-primary hover:text-primary-foreground",
      ghost: "text-foreground hover:text-primary",
    };
    
    const sizes = {
      sm: "px-4 py-2 text-xs",
      md: "px-8 py-3 text-sm",
      lg: "px-10 py-4 text-base",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        <span className="relative z-10">{children}</span>
        {variant !== "ghost" && (
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0" />
        )}
      </button>
    );
  }
);
Button.displayName = "Button";
