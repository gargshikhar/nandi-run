"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { SITE } from "@/lib/constants";

const AmbientAudio = dynamic(() => import("@/components/AmbientAudio"), {
  ssr: false,
});

export default function FloatingElements() {
  return (
    <>
      {/* Stacked floating buttons — bottom-right, above the mobile register bar */}
      <div className="fixed bottom-[4.5rem] right-4 z-50 flex flex-col items-center gap-3 md:bottom-6 md:right-6">
        {/* Audio toggle */}
        <AmbientAudio />

        {/* WhatsApp */}
        <a
          href={`https://wa.me/${SITE.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg shadow-green-500/20 transition-transform hover:scale-110 hover:bg-green-400"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle size={28} />
        </a>
      </div>

      {/* Mobile Fixed Bottom Register Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-navy-dark/95 p-3 backdrop-blur-xl md:hidden">
        <Link
          href={SITE.registerUrl}
          className="block w-full rounded-full bg-primary py-3 text-center text-base font-bold text-navy-dark shadow-lg"
        >
          Register Now — Starting ₹1,250
        </Link>
      </div>
    </>
  );
}
