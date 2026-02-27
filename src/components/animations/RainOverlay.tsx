"use client";

import { useRef, useEffect } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface Drop {
  x: number;
  y: number;
  speed: number;
  length: number;
  width: number;
  opacity: number;
}

export default function RainOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const mobile = window.innerWidth < 768;
    const dropCount = mobile ? 40 : 70;
    const drops: Drop[] = Array.from({ length: dropCount }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      speed: 1 + Math.random() * 2,
      length: 18 + Math.random() * 30,
      width: 0.8 + Math.random() * 0.7,
      opacity: 0.08 + Math.random() * 0.14,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.lineCap = "round";

      for (const drop of drops) {
        drop.y += drop.speed;
        drop.x -= 0.15; // gentle wind drift

        if (drop.y > canvas.height) {
          drop.y = -drop.length;
          drop.x = Math.random() * canvas.width;
        }
        if (drop.x < 0) {
          drop.x = canvas.width;
        }

        // Thin elongated streak — fades in from top, brightens toward bottom
        ctx.beginPath();
        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(drop.x - 0.3, drop.y + drop.length);
        ctx.strokeStyle = `rgba(173, 246, 132, ${drop.opacity})`;
        ctx.lineWidth = drop.width;
        ctx.stroke();
      }

      animRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [reducedMotion]);

  if (reducedMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-30 pointer-events-none opacity-70"
    />
  );
}
