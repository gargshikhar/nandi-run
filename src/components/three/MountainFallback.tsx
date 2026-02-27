"use client";

// Deterministic pseudo-random to avoid hydration mismatch
function seeded(i: number) {
  const x = Math.sin(i * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

const r = (n: number, d = 2) => Math.round(n * 10 ** d) / 10 ** d;

const rainDrops = Array.from({ length: 35 }, (_, i) => ({
  left: `${r(seeded(i) * 100)}%`,
  height: `${r(16 + seeded(i + 100) * 24)}px`,
  width: `${r(0.8 + seeded(i + 400) * 0.8)}px`,
  duration: `${r(3.5 + seeded(i + 200) * 4)}s`,
  delay: `${r(seeded(i + 300) * 4)}s`,
}));

export default function MountainFallback() {
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ background: "var(--gradient-navy-bg)" }}>
      {/* Green glow in top-left */}
      <div className="absolute inset-0" style={{ background: "var(--gradient-navy-glow)" }} />

      {/* Mountain silhouettes */}
      <svg
        className="absolute bottom-0 left-0 w-full"
        viewBox="0 0 1440 400"
        preserveAspectRatio="none"
        style={{ height: "60%" }}
      >
        {/* Far mountain range */}
        <path
          d="M0,400 L0,250 Q100,180 200,220 Q350,120 500,200 Q600,100 720,180 Q850,80 1000,160 Q1100,100 1200,180 Q1300,120 1440,200 L1440,400 Z"
          fill="#0B2A57"
          opacity="0.5"
        />
        {/* Mid mountain range */}
        <path
          d="M0,400 L0,280 Q120,200 250,260 Q400,160 550,240 Q650,150 800,230 Q900,140 1050,220 Q1150,160 1300,240 Q1380,200 1440,250 L1440,400 Z"
          fill="#0B2A57"
          opacity="0.7"
        />
        {/* Near mountain range */}
        <path
          d="M0,400 L0,320 Q150,260 300,300 Q450,220 600,290 Q750,200 900,280 Q1050,230 1200,300 Q1350,260 1440,310 L1440,400 Z"
          fill="#071D3F"
        />
      </svg>

      {/* Animated cloud layers */}
      <div className="absolute top-[20%] w-full h-20 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(173,246,132,0.2), transparent)",
            animation: "drift 15s linear infinite",
          }}
        />
      </div>
      <div className="absolute top-[35%] w-full h-16 opacity-15">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(173,246,132,0.15), transparent)",
            animation: "drift 20s linear infinite 5s",
          }}
        />
      </div>
      <div className="absolute top-[50%] w-full h-24 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(173,246,132,0.1), transparent)",
            animation: "drift 25s linear infinite 10s",
          }}
        />
      </div>

      {/* CSS Rain */}
      <div className="absolute inset-0 pointer-events-none">
        {rainDrops.map((drop, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              left: drop.left,
              width: drop.width,
              height: drop.height,
              background: `linear-gradient(to bottom, transparent 0%, rgba(173,246,132,0.10) 30%, rgba(173,246,132,0.20) 70%, rgba(131,237,163,0.30) 100%)`,
              borderRadius: "40% 40% 50% 50%",
              animation: `rain-fall ${drop.duration} linear ${drop.delay} infinite`,
            }}
          />
        ))}
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bg to-transparent" />
    </div>
  );
}
