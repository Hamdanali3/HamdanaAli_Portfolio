"use client";

import React, { useEffect, useRef, useState, useSyncExternalStore } from "react";

function subscribeFinePointer(cb: () => void) {
  const mq = window.matchMedia("(pointer: fine)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

function getFinePointerSnapshot() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function getFinePointerServerSnapshot() {
  return false;
}

export function CustomCursor() {
  const isFinePointer = useSyncExternalStore(
    subscribeFinePointer,
    getFinePointerSnapshot,
    getFinePointerServerSnapshot
  );

  const cursorRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string | null>(null);
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    if (!isFinePointer) return;

    const handleMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }
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
  }, [isFinePointer]);

  if (!isFinePointer) return null;

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      style={{ transform: "translate3d(-100px, -100px, 0)" }}
      className="pointer-events-none fixed top-0 left-0 z-[120] hidden lg:flex items-center justify-center transition-transform duration-75 ease-out will-change-transform"
    >
      <div
        className={
          label
            ? `rounded-full bg-signal px-3 py-1 font-mono text-[10px] font-semibold tracking-[0.12em] uppercase text-white shadow-lg whitespace-nowrap transition-transform duration-150 ${
                pressed ? "scale-90" : "scale-100"
              }`
            : `h-4 w-4 rounded-full border border-signal/75 bg-signal/15 backdrop-blur-[1px] transition-transform duration-150 ${
                pressed ? "scale-90" : "scale-100"
              }`
        }
      >
        {label ?? null}
      </div>
    </div>
  );
}
