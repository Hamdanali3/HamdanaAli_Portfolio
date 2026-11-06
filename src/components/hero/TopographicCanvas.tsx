"use client";

import React, { useEffect, useRef } from "react";

function detectLightScheme(): boolean {
  const meta = document.querySelector<HTMLMetaElement>('meta[name="color-scheme"]');
  const content = meta?.content?.trim();
  if (content === "light") return true;
  if (content === "dark") return false;
  return !window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export function TopographicCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || typeof window === "undefined") return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let rafId = 0;
    let idleStartTimer: ReturnType<typeof setTimeout> | undefined;
    let isVisible = true;
    let width = 0;
    let height = 0;
    let time = 0;
    let isLight = detectLightScheme();

    const pointer = { x: -9999, y: -9999 };

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      width = parent.clientWidth;
      height = parent.clientHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const drawFrame = () => {
      if (width <= 0 || height <= 0) return;
      ctx.clearRect(0, 0, width, height);

      const baseStroke = isLight ? "rgba(17, 19, 23, 0.065)" : "rgba(243, 242, 238, 0.055)";
      const highlightStroke = isLight ? "rgba(184, 43, 4, 0.22)" : "rgba(255, 105, 61, 0.24)";
      const signalDot = isLight ? "#b82b04" : "#ff693d";

      const contourCount = 9;
      const stepX = 28;

      for (let i = 0; i < contourCount; i++) {
        const baseY = (height / (contourCount + 1)) * (i + 1);
        ctx.beginPath();

        for (let x = 0; x <= width + stepX; x += stepX) {
          const ridgeA = Math.sin(x * 0.0042 + i * 0.65 + time * 0.4) * 22;
          const ridgeB = Math.cos(x * 0.0095 - i * 0.4 + time * 0.24) * 12;
          let y = baseY + ridgeA + ridgeB;

          const dx = x - pointer.x;
          const dy = y - pointer.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < 32400) {
            const dist = Math.sqrt(distSq);
            const influence = Math.pow(1 - dist / 180, 2);
            y += (dy / (dist + 1)) * influence * 18;
          }

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        ctx.strokeStyle = i % 4 === 0 ? highlightStroke : baseStroke;
        ctx.lineWidth = i % 4 === 0 ? 1.05 : 0.8;
        ctx.stroke();
      }

      const spacing = 80;
      for (let gx = spacing / 2; gx < width; gx += spacing) {
        for (let gy = spacing / 2; gy < height; gy += spacing) {
          const dx = gx - pointer.x;
          const dy = gy - pointer.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < 36100) {
            const proximity = Math.max(0, 1 - Math.sqrt(distSq) / 190);
            ctx.fillStyle = signalDot;
            ctx.globalAlpha = proximity * 0.6;
            ctx.beginPath();
            ctx.arc(gx, gy, 1.2 + proximity * 1.5, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalAlpha = 1;
          } else {
            ctx.fillStyle = baseStroke;
            ctx.fillRect(gx - 0.7, gy - 0.7, 1.4, 1.4);
          }
        }
      }
    };

    resize();
    drawFrame();

    const onResize = () => {
      resize();
      drawFrame();
    };
    window.addEventListener("resize", onResize, { passive: true });

    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const syncScheme = () => {
      isLight = detectLightScheme();
      drawFrame();
    };
    mq.addEventListener("change", syncScheme);

    const metaEl = document.querySelector('meta[name="color-scheme"]');
    const metaObserver = new MutationObserver(syncScheme);
    if (metaEl) {
      metaObserver.observe(metaEl, { attributes: true, attributeFilter: ["content"] });
    }

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
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

    if (!reducedMotion) {
      // Defer continuous ambient wave loop until after initial page settle to keep TBT near 0ms
      idleStartTimer = setTimeout(() => {
        let lastFrame = 0;
        const loop = (now: number) => {
          if (isVisible && now - lastFrame >= 32) {
            lastFrame = now;
            time += 0.022;
            drawFrame();
          }
          rafId = requestAnimationFrame(loop);
        };
        rafId = requestAnimationFrame(loop);
      }, 1600);
    }

    return () => {
      if (idleStartTimer) clearTimeout(idleStartTimer);
      cancelAnimationFrame(rafId);
      observer.disconnect();
      metaObserver.disconnect();
      mq.removeEventListener("change", syncScheme);
      window.removeEventListener("resize", onResize);
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
