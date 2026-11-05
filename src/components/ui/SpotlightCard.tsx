"use client";

import React, { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "motion/react";
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
  const prefersReduced = useReducedMotion();

  const mouseX = useMotionValue(-400);
  const mouseY = useMotionValue(-400);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const springRotateX = useSpring(rotateX, { stiffness: 260, damping: 28 });
  const springRotateY = useSpring(rotateY, { stiffness: 260, damping: 28 });

  const spotlightSheen = useMotionTemplate`radial-gradient(520px circle at ${mouseX}px ${mouseY}px, rgba(255, 79, 31, 0.09), transparent 72%)`;
  const borderGlow = useMotionTemplate`radial-gradient(340px circle at ${mouseX}px ${mouseY}px, var(--border-strong), transparent 75%)`;

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!cardRef.current || e.pointerType !== "mouse") return;
    const rect = cardRef.current.getBoundingClientRect();
    const localX = e.clientX - rect.left;
    const localY = e.clientY - rect.top;
    mouseX.set(localX);
    mouseY.set(localY);

    if (enableTilt && !prefersReduced) {
      const pctX = (localX / rect.width - 0.5) * 2;
      const pctY = (localY / rect.height - 0.5) * 2;
      rotateX.set(-pctY * 2.4);
      rotateY.set(pctX * 2.4);
    }
  };

  const handlePointerLeave = () => {
    mouseX.set(-400);
    mouseY.set(-400);
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      data-cursor-label={cursorLabel}
      onClick={onClick}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={
        enableTilt && !prefersReduced
          ? {
              rotateX: springRotateX,
              rotateY: springRotateY,
              transformPerspective: 1100,
            }
          : undefined
      }
      className={cn(
        "group relative rounded-2xl border border-hairline bg-surface-1 transition-colors duration-300",
        className
      )}
    >
      {/* Specular pointer-tracked border ring */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: borderGlow,
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          padding: "1px",
        }}
      />

      {/* Ambient radial spotlight */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: spotlightSheen }}
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
    </motion.div>
  );
}
