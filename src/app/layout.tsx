import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingElements from "@/components/FloatingElements";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import ClientEffects from "@/components/providers/ClientEffects";

export const metadata: Metadata = {
  title: "Nandi Hills Monsoon Run | Run into the Clouds, Race with the Rain!",
  description:
    "One of India's few monsoon hill runs — 600m+ elevation gain through clouds and rain at Nandi Hills, Bengaluru. Half Marathon (21.1K) and 10K Run on August 9, 2026.",
  keywords:
    "Nandi Hills, monsoon run, half marathon, 10K run, Bengaluru, hill running, trail running, marathon India",
  openGraph: {
    title: "Nandi Hills Monsoon Run 2026",
    description:
      "Run into the Clouds, Race with the Rain! One of India's few monsoon hill runs at Nandi Hills.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Preload web fonts so they're ready for first paint — prevents FOUT */}
        <link
          rel="preload"
          href="https://fonts.gstatic.com/s/spacegrotesk/v16/V8mDoQDjQSkFtoMM3T6r8E7mPbF4C_k3HqUtEw.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfAZ9hiA.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body className="antialiased">
        {/* Ready-gate: covers page with hero-matching navy while assets settle.
            Pure CSS — 0.3s hold, 0.4s fade. Only visible on full page loads;
            SPA navigations keep it hidden (animation already completed). */}
        <div
          aria-hidden="true"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "#0B2A57",
            pointerEvents: "none",
            animation: "pageReady 0.4s ease 0.3s forwards",
          }}
        />
        <SmoothScrollProvider>
          <ClientEffects />
          <Header />
          <main>{children}</main>
          <Footer />
          <FloatingElements />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
