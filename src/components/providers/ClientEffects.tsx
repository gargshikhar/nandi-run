"use client";

import dynamic from "next/dynamic";

const PageTransition = dynamic(() => import("@/components/animations/PageTransition"), { ssr: false });
const RainScene = dynamic(() => import("@/components/three/RainScene"), { ssr: false });
const AmbientAudio = dynamic(() => import("@/components/AmbientAudio"), { ssr: false });

export default function ClientEffects() {
  return (
    <>
      <PageTransition />
      <RainScene />
      <AmbientAudio />
    </>
  );
}
