"use client";

import { cn } from "@/lib/utils";

export function ButtonLoader({ className, variant = "light" }) {
  const spinnerColor = variant === "light" 
    ? "border-white/30 border-t-white" 
    : "border-black/30 border-t-black";
  
  return (
    <div 
      className={cn(
        "w-4 h-4 border-2 rounded-full animate-spin",
        spinnerColor,
        className
      )} 
    />
  );
}