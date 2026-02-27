"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { ChevronDown, Bell } from "lucide-react";
import { SITE } from "@/lib/constants";
import SplitText from "@/components/animations/SplitText";
import NotifyModal from "@/components/NotifyModal";

function useCountdown(targetDate: Date) {
  const calculate = useCallback(() => {
    const diff = targetDate.getTime() - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  }, [targetDate]);

  const [time, setTime] = useState(() => calculate());

  useEffect(() => {
    setTime(calculate());
    const timer = setInterval(() => setTime(calculate()), 1000);
    return () => clearInterval(timer);
  }, [calculate]);

  return time;
}

export default function HeroSection() {
  const countdown = useCountdown(SITE.raceDay);
  const [notifyOpen, setNotifyOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  /**
   * Video autoplay strategy (mobile-first):
   *
   * 1. Two video sources: 181 KB mobile (640p, no audio) vs 1.1 MB desktop
   *    (720p, no audio). Both have movflags +faststart so playback can begin
   *    before the full file is downloaded.
   *
   * 2. The <video> element is always in the DOM with autoPlay + muted +
   *    playsInline — these three together satisfy iOS Safari autoplay policy.
   *
   * 3. On mount we ALSO call .play() explicitly as a belt-and-suspenders
   *    approach. We try on every buffering milestone (loadedmetadata,
   *    loadeddata, canplay) because mobile browsers are inconsistent.
   *
   * 4. If play() still rejects (e.g. iOS low-power mode, data-saver), we
   *    register a one-shot touchstart/click listener to resume on first
   *    user interaction.
   */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Pick the right source for this device
    const isMobile = window.innerWidth < 768;
    video.src = isMobile
      ? "/videos/promo-mobile.mp4"
      : "/videos/promo-optimized.mp4";

    let playing = false;

    const tryPlay = () => {
      if (playing) return;
      video.play().then(() => {
        playing = true;
      }).catch(() => {
        // Autoplay blocked — retry on first user interaction
        const resume = () => {
          video.play().then(() => { playing = true; }).catch(() => {});
          document.removeEventListener("touchstart", resume);
          document.removeEventListener("click", resume);
        };
        document.addEventListener("touchstart", resume, { once: true });
        document.addEventListener("click", resume, { once: true });
      });
    };

    // Try playing at every buffering milestone
    video.addEventListener("loadedmetadata", tryPlay, { once: true });
    video.addEventListener("loadeddata", tryPlay, { once: true });
    video.addEventListener("canplay", tryPlay, { once: true });

    // Also try immediately in case readyState is already sufficient
    if (video.readyState >= 1) tryPlay();

    video.load();
  }, []);

  const countdownItems = [
    { value: countdown.days, label: "Days" },
    { value: countdown.hours, label: "Hours" },
    { value: countdown.minutes, label: "Minutes" },
    { value: countdown.seconds, label: "Seconds" },
  ];

  return (
    <section className="relative overflow-hidden bg-navy-dark">
      {/* Background video — always in the DOM; src set in useEffect per device */}
      <video
        ref={videoRef}
        poster="/videos/poster.jpg"
        preload="auto"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
        style={{ transform: "scale(1.1)" }}
      />
      {/* Subtle overlay for text readability */}
      <div className="absolute inset-0 bg-navy-dark/40" />

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 pt-20 pb-24 md:pb-20">
        <div className="mx-auto max-w-6xl text-center">
          {/* Edition badge */}
          <div className="mb-6 inline-block rounded-lg border border-white/20 bg-white/10 backdrop-blur-sm px-5 py-2 text-xs font-medium uppercase tracking-[0.2em] text-white md:mb-8">
            {SITE.edition} &middot; {SITE.date}
          </div>

          {/* Split-text headline */}
          <SplitText
            as="h1"
            className="mb-3 text-[2rem] sm:text-[2.75rem] md:text-[3.5rem] lg:text-[4.5rem] font-[family-name:var(--font-heading)] font-bold leading-[1.15] tracking-tight text-white whitespace-nowrap md:mb-4"
            playOnMount
          >
            Run into the Clouds
          </SplitText>

          <SplitText
            as="h1"
            className="mb-6 text-[2rem] sm:text-[2.75rem] md:text-[3.5rem] lg:text-[4.5rem] font-[family-name:var(--font-heading)] font-bold leading-[1.15] tracking-tight whitespace-nowrap md:mb-8"
            charClassName="bg-gradient-to-r from-[#ADF684] via-[#83EDA3] to-[#3AD77E] bg-clip-text text-transparent"
            playOnMount
            delay={0.4}
          >
            Race with the Rain
          </SplitText>

          {/* Subheadline */}
          <p className="mx-auto mb-8 max-w-2xl text-sm text-white/70 leading-relaxed sm:text-lg md:mb-12 md:text-xl">
            One of India&apos;s few monsoon hill runs — 600m+ elevation gain
            through clouds and rain at Nandi Hills, Bengaluru
          </p>

          {/* CTA Buttons */}
          <div className="mb-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center md:mb-16 md:gap-4">
            <Link
              href={SITE.registerUrl}
              className="group relative rounded-xl bg-primary px-10 py-4 text-lg font-bold text-navy-dark shadow-2xl transition-all hover:bg-accent-dark hover:scale-105"
              style={{ boxShadow: "var(--shadow-glow)" }}
            >
              Register Now
            </Link>
            <button
              onClick={() => setNotifyOpen(true)}
              className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm px-8 py-3.5 text-base font-semibold text-white transition-all hover:bg-white/20 hover:border-white/30"
            >
              <Bell size={18} />
              Notify Me
            </button>
          </div>

          {/* Countdown */}
          <div className="inline-flex gap-3 rounded-2xl border border-white/15 bg-white/10 backdrop-blur-sm px-6 py-5 sm:gap-8 sm:px-12 sm:py-8">
            {countdownItems.map((item) => (
              <div key={item.label} className="text-center">
                <div className="font-[family-name:var(--font-heading)] text-3xl font-bold text-white sm:text-5xl md:text-6xl tabular-nums">
                  {String(item.value).padStart(2, "0")}
                </div>
                <div className="mt-1 text-[9px] uppercase tracking-[0.15em] text-white/50 sm:mt-2 sm:text-xs sm:tracking-[0.2em]">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-bounce text-white/40 md:bottom-12">
        <ChevronDown size={28} />
      </div>

      {/* Notify Modal */}
      <NotifyModal isOpen={notifyOpen} onClose={() => setNotifyOpen(false)} />
    </section>
  );
}
