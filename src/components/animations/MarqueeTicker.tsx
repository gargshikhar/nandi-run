"use client";

interface MarqueeTickerProps {
  text: string;
  speed?: number;
  direction?: "left" | "right";
  className?: string;
  stroke?: boolean;
}

export default function MarqueeTicker({
  text,
  speed = 30,
  direction = "left",
  className = "",
  stroke = false,
}: MarqueeTickerProps) {
  const separator = " — ";
  const content = `${text}${separator}`;
  // Repeat 6x to ensure seamless loop
  const repeated = Array(6).fill(content).join("");

  return (
    <div className="overflow-hidden py-6 md:py-8" aria-hidden="true">
      <div
        className={`flex whitespace-nowrap ${
          direction === "right" ? "[animation-direction:reverse]" : ""
        } animate-marquee`}
        style={
          { "--marquee-duration": `${speed}s` } as React.CSSProperties
        }
      >
        <span
          className={`font-[family-name:var(--font-heading)] font-extrabold uppercase tracking-wider ${
            stroke ? "text-stroke" : ""
          } ${className}`}
          style={{ fontSize: "var(--text-ticker)" }}
        >
          {repeated}
        </span>
      </div>
    </div>
  );
}
