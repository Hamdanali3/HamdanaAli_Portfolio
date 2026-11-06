import React from "react";
import { cn } from "@/lib/utils";

interface RevealTextProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
  className?: string;
  delay?: number;
  stagger?: number;
}

export function RevealText({
  text,
  as: Tag = "div",
  className,
}: RevealTextProps) {
  return <Tag className={cn("inline", className)}>{text}</Tag>;
}
