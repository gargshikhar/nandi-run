"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Volume2, VolumeX } from "lucide-react";

/**
 * Ambient rain + thunder audio — user-controlled toggle.
 *
 * Click the button to start, click again to stop. No auto-play.
 *
 * Multi-layered Web Audio API soundscape:
 *  1. Heavy rain base (brown noise, low-passed)
 *  2. Light rain detail (white noise, band-passed for crispness)
 *  3. Mid-frequency rain texture
 *  4. Natural intensity variation via LFO
 *  5. Random thunder rumbles every ~15-50 seconds
 */

/** Brown noise — deeper, sounds like distant heavy rain */
function createBrownNoiseBuffer(ctx: AudioContext, seconds: number) {
  const len = ctx.sampleRate * seconds;
  const buf = ctx.createBuffer(2, len, ctx.sampleRate);
  for (let ch = 0; ch < 2; ch++) {
    const data = buf.getChannelData(ch);
    let last = 0;
    for (let i = 0; i < len; i++) {
      const white = Math.random() * 2 - 1;
      last = (last + 0.02 * white) / 1.02;
      data[i] = last * 3.5;
    }
  }
  return buf;
}

/** White noise — crisp, close-up rain detail */
function createWhiteNoiseBuffer(ctx: AudioContext, seconds: number) {
  const len = ctx.sampleRate * seconds;
  const buf = ctx.createBuffer(2, len, ctx.sampleRate);
  for (let ch = 0; ch < 2; ch++) {
    const data = buf.getChannelData(ch);
    for (let i = 0; i < len; i++) {
      data[i] = Math.random() * 2 - 1;
    }
  }
  return buf;
}

/** Create a single thunder rumble buffer */
function createThunderBuffer(ctx: AudioContext) {
  const sr = ctx.sampleRate;
  const duration = 3 + Math.random() * 2; // 3-5 seconds
  const len = Math.floor(sr * duration);
  const buf = ctx.createBuffer(2, len, sr);

  for (let ch = 0; ch < 2; ch++) {
    const data = buf.getChannelData(ch);
    let last = 0;
    for (let i = 0; i < len; i++) {
      const t = i / sr;
      const white = Math.random() * 2 - 1;
      last = (last + 0.02 * white) / 1.02;

      // Envelope: quick attack, long decay with secondary rumbles
      let env = 0;
      if (t < 0.1) {
        env = t / 0.1;
      } else {
        env = Math.exp(-(t - 0.1) * 1.5);
        env += 0.3 * Math.exp(-((t - 0.8) ** 2) * 20);
        env += 0.15 * Math.exp(-((t - 1.5) ** 2) * 15);
      }
      data[i] = last * 8 * env;
    }
  }
  return buf;
}

interface AudioNodes {
  ctx: AudioContext;
  masterGain: GainNode;
  thunderGain: GainNode;
}

export default function AmbientAudio() {
  const [playing, setPlaying] = useState(false);
  const nodesRef = useRef<AudioNodes | null>(null);
  const thunderTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /** Build the full audio graph */
  const buildAudioGraph = useCallback((): AudioNodes | null => {
    try {
      const ctx = new AudioContext();

      // Master gain (for fade in/out)
      const masterGain = ctx.createGain();
      masterGain.gain.value = 0; // start silent, fade in on play
      masterGain.connect(ctx.destination);

      // Rain sub-mix
      const rainGain = ctx.createGain();
      rainGain.gain.value = 0.22;
      rainGain.connect(masterGain);

      // Layer 1: Heavy rain (brown noise, low-passed)
      const brownBuf = createBrownNoiseBuffer(ctx, 5);
      const brownSrc = ctx.createBufferSource();
      brownSrc.buffer = brownBuf;
      brownSrc.loop = true;
      const brownLP = ctx.createBiquadFilter();
      brownLP.type = "lowpass";
      brownLP.frequency.value = 600;
      const brownGain = ctx.createGain();
      brownGain.gain.value = 0.7;
      brownSrc.connect(brownLP);
      brownLP.connect(brownGain);
      brownGain.connect(rainGain);
      brownSrc.start();

      // Layer 2: Detail rain (white noise, band-passed)
      const whiteBuf = createWhiteNoiseBuffer(ctx, 4);
      const whiteSrc = ctx.createBufferSource();
      whiteSrc.buffer = whiteBuf;
      whiteSrc.loop = true;
      const whiteBP = ctx.createBiquadFilter();
      whiteBP.type = "bandpass";
      whiteBP.frequency.value = 3000;
      whiteBP.Q.value = 0.5;
      const whiteGain = ctx.createGain();
      whiteGain.gain.value = 0.25;
      whiteSrc.connect(whiteBP);
      whiteBP.connect(whiteGain);
      whiteGain.connect(rainGain);
      whiteSrc.start();

      // Layer 3: Mid rain texture
      const midBuf = createWhiteNoiseBuffer(ctx, 6);
      const midSrc = ctx.createBufferSource();
      midSrc.buffer = midBuf;
      midSrc.loop = true;
      const midBP = ctx.createBiquadFilter();
      midBP.type = "bandpass";
      midBP.frequency.value = 1000;
      midBP.Q.value = 0.3;
      const midGain = ctx.createGain();
      midGain.gain.value = 0.35;
      midSrc.connect(midBP);
      midBP.connect(midGain);
      midGain.connect(rainGain);
      midSrc.start();

      // Natural intensity variation (LFO)
      const lfo = ctx.createOscillator();
      lfo.type = "sine";
      lfo.frequency.value = 0.08;
      const lfoGain = ctx.createGain();
      lfoGain.gain.value = 0.06;
      lfo.connect(lfoGain);
      lfoGain.connect(rainGain.gain);
      lfo.start();

      // Thunder sub-mix
      const thunderGain = ctx.createGain();
      thunderGain.gain.value = 0.35;
      thunderGain.connect(masterGain);

      return { ctx, masterGain, thunderGain };
    } catch {
      return null;
    }
  }, []);

  /** Play a single thunder rumble */
  const playThunder = useCallback(() => {
    const nodes = nodesRef.current;
    if (!nodes || nodes.ctx.state !== "running") return;

    const buf = createThunderBuffer(nodes.ctx);
    const src = nodes.ctx.createBufferSource();
    src.buffer = buf;

    const lp = nodes.ctx.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.value = 200 + Math.random() * 150;

    const panner = nodes.ctx.createStereoPanner();
    panner.pan.value = (Math.random() - 0.5) * 1.2;

    const env = nodes.ctx.createGain();
    env.gain.value = 0.5 + Math.random() * 0.5;

    src.connect(lp);
    lp.connect(panner);
    panner.connect(env);
    env.connect(nodes.thunderGain);
    src.start();

    src.onended = () => {
      src.disconnect();
      lp.disconnect();
      panner.disconnect();
      env.disconnect();
    };
  }, []);

  /** Schedule recurring thunder */
  const scheduleThunder = useCallback(() => {
    const delay = (15 + Math.random() * 35) * 1000;
    thunderTimerRef.current = setTimeout(() => {
      playThunder();
      if (Math.random() < 0.3) {
        setTimeout(() => playThunder(), 800 + Math.random() * 1500);
      }
      scheduleThunder();
    }, delay);
  }, [playThunder]);

  /** Stop thunder scheduling */
  const stopThunder = useCallback(() => {
    if (thunderTimerRef.current) {
      clearTimeout(thunderTimerRef.current);
      thunderTimerRef.current = null;
    }
  }, []);

  /** Start audio playback */
  const startPlaying = useCallback(() => {
    // Build graph on first play
    if (!nodesRef.current) {
      const nodes = buildAudioGraph();
      if (!nodes) return;
      nodesRef.current = nodes;
    }

    const nodes = nodesRef.current;
    nodes.ctx.resume().then(() => {
      // Fade in over 0.5s
      const t = nodes.ctx.currentTime;
      nodes.masterGain.gain.cancelScheduledValues(t);
      nodes.masterGain.gain.setValueAtTime(nodes.masterGain.gain.value, t);
      nodes.masterGain.gain.linearRampToValueAtTime(1, t + 0.5);

      setPlaying(true);

      // Start thunder after 5-15s
      stopThunder();
      const firstDelay = (5 + Math.random() * 10) * 1000;
      thunderTimerRef.current = setTimeout(() => {
        playThunder();
        scheduleThunder();
      }, firstDelay);
    }).catch(() => {});
  }, [buildAudioGraph, playThunder, scheduleThunder, stopThunder]);

  /** Stop audio playback (fade out, then suspend) */
  const stopPlaying = useCallback(() => {
    const nodes = nodesRef.current;
    if (!nodes) return;

    stopThunder();

    // Fade out over 0.5s, then suspend
    const t = nodes.ctx.currentTime;
    nodes.masterGain.gain.cancelScheduledValues(t);
    nodes.masterGain.gain.setValueAtTime(nodes.masterGain.gain.value, t);
    nodes.masterGain.gain.linearRampToValueAtTime(0, t + 0.5);

    setTimeout(() => {
      nodes.ctx.suspend().catch(() => {});
    }, 600);

    setPlaying(false);
  }, [stopThunder]);

  /** Toggle on/off */
  const toggle = () => {
    if (playing) {
      stopPlaying();
    } else {
      startPlaying();
    }
  };

  /** Cleanup on unmount */
  useEffect(() => {
    return () => {
      stopThunder();
      if (nodesRef.current) {
        nodesRef.current.ctx.close().catch(() => {});
        nodesRef.current = null;
      }
    };
  }, [stopThunder]);

  return (
    <button
      onClick={toggle}
      className="flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-white/80 backdrop-blur-sm text-navy transition-all hover:bg-white hover:border-navy/30"
      aria-label={playing ? "Stop rain sounds" : "Play rain sounds"}
      title={playing ? "Stop rain sounds" : "Play rain sounds"}
    >
      {playing ? <Volume2 size={18} /> : <VolumeX size={18} />}
    </button>
  );
}
