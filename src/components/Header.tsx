"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { NAV_ITEMS, SITE } from "@/lib/constants";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  // Scroll detection
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-navy-dark/95 backdrop-blur-xl border-b border-white/8 shadow-lg"
          : "bg-navy-dark/95 backdrop-blur-xl"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2" onClick={() => setMobileOpen(false)}>
          <span className="flex h-9 w-9 items-center justify-center rounded-lg text-lg"
            style={{ background: "var(--gradient-hero)" }}
          >
            🏔️
          </span>
          <div className="flex flex-col leading-tight text-white transition-colors">
            <span className="text-sm font-bold tracking-wider uppercase font-[family-name:var(--font-heading)]">
              Nandi Run
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-white/70 transition-colors hover:text-white hover:bg-white/8"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href={SITE.registerUrl}
            className="ml-3 relative rounded-full bg-primary px-6 py-2.5 text-sm font-bold text-navy-dark shadow-lg transition-all hover:bg-accent-dark hover:shadow-xl hover:scale-105"
          >
            Register Now
            <span className="absolute inset-0 rounded-full animate-pulse-glow pointer-events-none" />
          </Link>
        </nav>

        {/* Mobile: Register + Hamburger */}
        <div className="flex items-center gap-3 lg:hidden">
          <Link
            href={SITE.registerUrl}
            className="rounded-full bg-primary px-4 py-2 text-xs font-bold text-navy-dark shadow-lg"
          >
            Register
          </Link>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-lg text-white/70 transition-colors hover:text-white"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="fixed top-0 left-0 h-screen w-screen z-[9990] lg:hidden" style={{ backgroundColor: "#0B2A57" }}>
          <div className="flex justify-end p-4">
            <button
              onClick={() => setMobileOpen(false)}
              className="p-2 text-white/70 hover:text-white"
              aria-label="Close menu"
            >
              <X size={28} />
            </button>
          </div>
          <nav className="flex flex-col items-center gap-2 pt-8">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="w-full max-w-xs px-6 py-4 text-center text-xl font-semibold text-white transition-colors hover:bg-white/10 hover:text-primary"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={SITE.registerUrl}
              onClick={() => setMobileOpen(false)}
              className="mt-6 rounded-full bg-primary px-10 py-4 text-lg font-bold text-navy-dark shadow-xl"
            >
              Register Now
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
