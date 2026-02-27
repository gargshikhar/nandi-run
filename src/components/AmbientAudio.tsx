"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Volume2, VolumeX } from "lucide-react";

/**
 * Ambient rain audio — ON by default.
 *
 * Uses the Web Audio API to generate pink noise that sounds like gentle rain.
 * No external audio file needed — instant, works offline, zero download.
 *
 * Browsers block AudioContext until a user gesture, so we listen for the
 * first click/tap anywhere, then resume the context automatically.
 */

/** Create a looping pink-noise buffer (sounds like rain) */
function createPinkNoiseBuffer(ctx: AudioContext) {
  const sampleRate = ctx.sampleRate;
  const length = sampleRate * 4; // 4-second loop
  const buffer = ctx.createBuffer(2, length, sampleRate);

  for (let ch = 0; ch < 2; ch++) {
    const data = buffer.getChannelData(ch);
    // Paul Kellet's refined method for pink noise generation
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < length; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11;
      b6 = white * 0.115926;
    }
  }

  return buffer;
}

export default function AmbientAudio() {
  const [muted, setMuted] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const gainRef = useRef<GainNode | null>(null);

  /** Initialise (or resume) the AudioContext + pink noise */
  const startAudio = useCallback(() => {
    // Already running
    if (ctxRef.current && ctxRef.current.state === "running") {
      setUnlocked(true);
      return;
    }

    // First time — create context, buffer & nodes
    if (!ctxRef.current) {
      const ctx = new AudioContext();
      const buffer = createPinkNoiseBuffer(ctx);

      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.loop = true;

      // Low-pass filter to soften the noise into a "rain" timbre
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 800;

      const gain = ctx.createGain();
      gain.gain.value = 0.18;

      source.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      source.start();

      ctxRef.current = ctx;
      gainRef.current = gain;
    }

    // Resume if suspended (browser autoplay policy)
    ctxRef.current.resume().then(() => setUnlocked(true)).catch(() => {});
  }, []);

  /** Listen for first user interaction → unlock audio */
  useEffect(() => {
    if (unlocked) return;

    const events = ["click", "touchstart", "keydown"] as const;
    const handler = () => startAudio();

    events.forEach((e) =>
      window.addEventListener(e, handler, { passive: true })
    );
    return () => {
      events.forEach((e) => window.removeEventListener(e, handler));
    };
  }, [unlocked, startAudio]);

  /** Sync gain with muted state */
  useEffect(() => {
    const gain = gainRef.current;
    if (!gain) return;

    if (muted) {
      gain.gain.linearRampToValueAtTime(0, gain.context.currentTime + 0.3);
    } else {
      gain.gain.linearRampToValueAtTime(0.18, gain.context.currentTime + 0.3);
    }
  }, [muted]);

  const toggle = () => {
    if (!unlocked) {
      startAudio();
      return;
    }
    setMuted((m) => !m);
  };

  return (
    <button
      onClick={toggle}
      className="flex h-11 w-11 items-center justify-center border border-border bg-white/80 backdrop-blur-sm text-navy transition-all hover:bg-white hover:border-navy/30"
      aria-label={unlocked && !muted ? "Mute rain sounds" : "Play rain sounds"}
      title={unlocked && !muted ? "Mute rain sounds" : "Unmute rain sounds"}
    >
      {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
    </button>
  );
}
