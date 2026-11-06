"use client";

import React, { useRef } from "react";
import { cn } from "@/lib/utils";

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  enableTilt?: boolean;
  showFiducials?: boolean;
  cursorLabel?: string;
  onClick?: () => void;
}

export function SpotlightCard({
  children,
  className,
  enableTilt = false,
  showFiducials = false,
  cursorLabel,
  onClick,
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el || e.pointerType !== "mouse") return;
    const rect = el.getBoundingClientRect();
    const localX = e.clientX - rect.left;
    const localY = e.clientY - rect.top;
    el.style.setProperty("--spot-x", `${localX}px`);
    el.style.setProperty("--spot-y", `${localY}px`);

    if (enableTilt) {
      const pctX = (localX / rect.width - 0.5) * 2;
      const pctY = (localY / rect.height - 0.5) * 2;
      el.style.transform = `perspective(1100px) rotateX(${(-pctY * 2.1).toFixed(2)}deg) rotateY(${(pctX * 2.1).toFixed(2)}deg)`;
    }
  };

  const handlePointerLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.setProperty("--spot-x", "-400px");
    el.style.setProperty("--spot-y", "-400px");
    if (enableTilt) {
      el.style.transform = "";
    }
  };

  return (
    <div
      ref={cardRef}
      data-cursor-label={cursorLabel}
      onClick={onClick}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{
        ["--spot-x" as string]: "-400px",
        ["--spot-y" as string]: "-400px",
      }}
      className={cn(
        "group relative rounded-2xl border border-hairline bg-surface-1 transition-[border-color,background-color,transform] duration-200 ease-out",
        className
      )}
    >
      {/* Specular pointer-tracked border ring */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(340px circle at var(--spot-x) var(--spot-y), var(--border-strong), transparent 75%)",
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          padding: "1px",
        }}
      />

      {/* Ambient radial spotlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(520px circle at var(--spot-x) var(--spot-y), rgba(255, 79, 31, 0.085), transparent 72%)",
        }}
      />

      {showFiducials && (
        <div aria-hidden="true" className="pointer-events-none">
          <span className="absolute top-2.5 left-3 font-mono text-[10px] text-ink-muted/60 select-none">
            +
          </span>
          <span className="absolute top-2.5 right-3 font-mono text-[10px] text-ink-muted/60 select-none">
            +
          </span>
          <span className="absolute bottom-2.5 left-3 font-mono text-[10px] text-ink-muted/60 select-none">
            +
          </span>
          <span className="absolute bottom-2.5 right-3 font-mono text-[10px] text-ink-muted/60 select-none">
            +
          </span>
        </div>
      )}

      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}
