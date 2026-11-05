"use client";

import React, { useEffect, useRef } from "react";

export function TopographicCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || typeof window === "undefined") return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let rafId = 0;
    let isVisible = true;
    let width = 0;
    let height = 0;
    let time = 0;

    const pointer = { x: -9999, y: -9999, vx: 0, vy: 0 };

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = parent.clientWidth;
      height = parent.clientHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const nx = e.clientX - rect.left;
      const ny = e.clientY - rect.top;
      pointer.vx = nx - pointer.x;
      pointer.vy = ny - pointer.y;
      pointer.x = nx;
      pointer.y = ny;
    };

    const onPointerLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave, { passive: true });

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.02 }
    );
    observer.observe(canvas);

    const drawFrame = () => {
      ctx.clearRect(0, 0, width, height);

      const computed = getComputedStyle(document.documentElement);
      const primaryInk = computed.getPropertyValue("--text-primary").trim() || "#f3f2ee";
      const signalInk = computed.getPropertyValue("--accent-signal").trim() || "#ff4f1f";
      const isLight = primaryInk === "#111317";

      const baseStroke = isLight ? "rgba(17, 19, 23, 0.075)" : "rgba(243, 242, 238, 0.065)";
      const highlightStroke = isLight ? "rgba(217, 56, 11, 0.28)" : "rgba(255, 79, 31, 0.30)";

      // Topographic elevation isolines inspired by Hindu Kush terrain contours
      const contourCount = 11;
      const stepX = 22;

      for (let i = 0; i < contourCount; i++) {
        const baseY = (height / (contourCount + 1)) * (i + 1);
        ctx.beginPath();

        for (let x = 0; x <= width + stepX; x += stepX) {
          const ridgeA = Math.sin(x * 0.0042 + i * 0.65 + time * 0.45) * 26;
          const ridgeB = Math.cos(x * 0.0095 - i * 0.4 + time * 0.28) * 14;
          let y = baseY + ridgeA + ridgeB;

          const dx = x - pointer.x;
          const dy = y - pointer.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 190) {
            const influence = Math.pow(1 - dist / 190, 2);
            y += (dy / (dist + 1)) * influence * 22;
          }

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        ctx.strokeStyle = i % 4 === 0 ? highlightStroke : baseStroke;
        ctx.lineWidth = i % 4 === 0 ? 1.1 : 0.85;
        ctx.stroke();
      }

      // Subtle coordinate lattice nodes that brighten near pointer
      const spacing = 72;
      for (let gx = spacing / 2; gx < width; gx += spacing) {
        for (let gy = spacing / 2; gy < height; gy += spacing) {
          const dx = gx - pointer.x;
          const dy = gy - pointer.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const proximity = Math.max(0, 1 - dist / 210);

          if (proximity > 0.08) {
            ctx.fillStyle = signalInk;
            ctx.globalAlpha = proximity * 0.65;
            ctx.beginPath();
            ctx.arc(gx, gy, 1.3 + proximity * 1.6, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalAlpha = 1;
          } else {
            ctx.fillStyle = baseStroke;
            ctx.fillRect(gx - 0.75, gy - 0.75, 1.5, 1.5);
          }
        }
      }
    };

    if (reducedMotion) {
      drawFrame();
    } else {
      const loop = () => {
        if (isVisible) {
          time += 0.012;
          drawFrame();
        }
        rafId = requestAnimationFrame(loop);
      };
      rafId = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
