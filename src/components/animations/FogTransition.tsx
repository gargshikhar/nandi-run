"use client";

import { useRef, useEffect } from "react";

interface FogTransitionProps {
  height?: number;
  colorFrom?: string;
  colorTo?: string;
}

export default function FogTransition({
  height = 200,
  colorFrom = "#F6FFF0",
  colorTo = "#F0FFD7",
}: FogTransitionProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Simple noise-based fog using layered gradients
    let time = 0;

    const draw = () => {
      time += 0.005;
      const { width, height: h } = canvas;

      // Base gradient
      const grad = ctx.createLinearGradient(0, 0, 0, h);
      grad.addColorStop(0, colorFrom);
      grad.addColorStop(1, colorTo);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, h);

      // Animated fog layers with green tint
      ctx.globalAlpha = 0.12;
      for (let layer = 0; layer < 3; layer++) {
        const speed = 0.3 + layer * 0.2;
        const yOffset = h * (0.2 + layer * 0.25);
        const amplitude = h * 0.15;

        ctx.beginPath();
        ctx.moveTo(0, h);

        for (let x = 0; x <= width; x += 4) {
          const nx = x / width;
          const y =
            yOffset +
            Math.sin(nx * 4 + time * speed) * amplitude * 0.5 +
            Math.sin(nx * 7 + time * speed * 1.3 + layer) * amplitude * 0.3 +
            Math.sin(nx * 13 + time * speed * 0.7) * amplitude * 0.2;
          ctx.lineTo(x, y);
        }

        ctx.lineTo(width, h);
        ctx.closePath();
        ctx.fillStyle = `rgba(173, 246, 132, ${0.06 + layer * 0.02})`;
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      animRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [colorFrom, colorTo]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full pointer-events-none"
      style={{ height: `${height}px` }}
    />
  );
}
