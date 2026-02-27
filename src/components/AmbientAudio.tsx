"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Volume2, VolumeX } from "lucide-react";

/**
 * Ambient rain audio — ON by default.
 *
 * Because browsers block autoplay before user interaction, we listen for the
 * first click/tap/keydown anywhere on the page, then start playback automatically.
 * The user sees the speaker icon as "on" from the start and can mute at any time.
 */
export default function AmbientAudio() {
  /* `muted` tracks the user's preference — false = they want sound */
  const [muted, setMuted] = useState(false);
  /* Whether the audio is actually playing (unlocked by browser) */
  const [unlocked, setUnlocked] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  /* Create audio element once */
  useEffect(() => {
    const audio = new Audio();
    audio.loop = true;
    audio.volume = 0.15;
    audio.src =
      "https://cdn.freesound.org/previews/531/531947_6142149-lq.mp3";
    audio.preload = "auto"; // start loading immediately
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  /* Auto-play on first user interaction anywhere on the page */
  const tryAutoPlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || unlocked) return;

    audio
      .play()
      .then(() => {
        setUnlocked(true);
      })
      .catch(() => {
        /* Browser still blocking — will retry on next interaction */
      });
  }, [unlocked]);

  useEffect(() => {
    if (unlocked) return; // already playing, no need for listeners

    const events = ["click", "touchstart", "keydown"] as const;
    events.forEach((evt) =>
      window.addEventListener(evt, tryAutoPlay, { once: false, passive: true }),
    );

    return () => {
      events.forEach((evt) => window.removeEventListener(evt, tryAutoPlay));
    };
  }, [tryAutoPlay, unlocked]);

  /* Sync play/pause with muted state after unlock */
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !unlocked) return;

    if (muted) {
      audio.pause();
    } else {
      audio.play().catch(() => {});
    }
  }, [muted, unlocked]);

  const toggle = () => {
    /* If not yet unlocked, first interaction also starts audio */
    if (!unlocked) {
      const audio = audioRef.current;
      if (audio) {
        audio
          .play()
          .then(() => setUnlocked(true))
          .catch(() => {});
      }
      return; // already in "unmuted" state, just needed to unlock
    }
    setMuted((m) => !m);
  };

  /* Icon: show speaker ON by default (since audio intends to play) */
  const isAudible = unlocked && !muted;

  return (
    <button
      onClick={toggle}
      className="fixed bottom-20 right-4 z-40 flex h-10 w-10 items-center justify-center border border-border bg-white/80 backdrop-blur-sm text-navy transition-all hover:bg-white hover:border-navy/30"
      aria-label={isAudible ? "Mute rain sounds" : "Play rain sounds"}
      title={isAudible ? "Mute rain sounds" : "Unmute rain sounds"}
    >
      {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
    </button>
  );
}
