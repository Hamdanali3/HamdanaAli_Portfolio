"use client";

import React, { useEffect, useState, useSyncExternalStore } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";

function subscribeFinePointer(cb: () => void) {
  const mq = window.matchMedia("(pointer: fine)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

function getFinePointerSnapshot() {
  return window.matchMedia("(pointer: fine)").matches;
}

function getFinePointerServerSnapshot() {
  return false;
}

export function CustomCursor() {
  const prefersReduced = useReducedMotion();
  const isFinePointer = useSyncExternalStore(
    subscribeFinePointer,
    getFinePointerSnapshot,
    getFinePointerServerSnapshot
  );

  const [label, setLabel] = useState<string | null>(null);
  const [pressed, setPressed] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springX = useSpring(cursorX, { stiffness: 520, damping: 34, mass: 0.35 });
  const springY = useSpring(cursorY, { stiffness: 520, damping: 34, mass: 0.35 });

  useEffect(() => {
    if (prefersReduced || !isFinePointer) return;

    const handleMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      const target = e.target as HTMLElement | null;
      const labeledAncestor = target?.closest<HTMLElement>("[data-cursor-label]");
      setLabel(labeledAncestor?.getAttribute("data-cursor-label") ?? null);
    };

    const handleDown = () => setPressed(true);
    const handleUp = () => setPressed(false);

    window.addEventListener("mousemove", handleMove, { passive: true });
    window.addEventListener("mousedown", handleDown, { passive: true });
    window.addEventListener("mouseup", handleUp, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mousedown", handleDown);
      window.removeEventListener("mouseup", handleUp);
    };
  }, [cursorX, cursorY, isFinePointer, prefersReduced]);

  if (!isFinePointer || prefersReduced) return null;

  return (
    <motion.div
      aria-hidden="true"
      style={{ x: springX, y: springY }}
      className="pointer-events-none fixed top-0 left-0 z-[120] -translate-x-1/2 -translate-y-1/2 hidden lg:flex items-center justify-center"
    >
      <motion.div
        animate={{
          scale: pressed ? 0.88 : 1,
        }}
        transition={{ duration: 0.15 }}
        className={
          label
            ? "rounded-full bg-signal px-3 py-1 font-mono text-[10px] font-semibold tracking-[0.12em] uppercase text-white shadow-lg whitespace-nowrap"
            : "h-4 w-4 rounded-full border border-signal/75 bg-signal/15 backdrop-blur-[1px]"
        }
      >
        {label ?? null}
      </motion.div>
    </motion.div>
  );
}
