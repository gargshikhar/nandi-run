"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Play } from "lucide-react";

const galleryImages = [
  { src: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&q=80", alt: "Runners on misty mountain trail", caption: "Through the Mist" },
  { src: "https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=600&q=80", alt: "Running in the monsoon", caption: "Cloud Running" },
  { src: "https://images.unsplash.com/photo-1502904550040-7534597429ae?w=600&q=80", alt: "Trail running through greenery", caption: "Lush Trails" },
  { src: "https://images.unsplash.com/photo-1486739985386-d4fae04ca6f7?w=600&q=80", alt: "Foggy mountain landscape", caption: "Nandi Hills Summit" },
  { src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&q=80", alt: "Lush forest trail", caption: "Forest Canopy" },
  { src: "https://images.unsplash.com/photo-1542601098-8fc114e148e2?w=600&q=80", alt: "Mountain sunrise", caption: "Dawn at the Peak" },
  { src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80", alt: "Misty valley landscape", caption: "Valley of Clouds" },
  { src: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=600&q=80", alt: "Green hills panorama", caption: "Monsoon Greens" },
  { src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80", alt: "Mountain peak in clouds", caption: "Above the Clouds" },
  { src: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80", alt: "Aerial view of green landscape", caption: "The Green Expanse" },
  { src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&q=80", alt: "Mountain range at twilight", caption: "Twilight Ridge" },
  { src: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=600&q=80", alt: "Looking up through trees", caption: "Canopy View" },
];

function Lightbox({
  images,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  images: typeof galleryImages;
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const img = images[index];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm" onClick={onClose}>
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 text-white/60 hover:text-white transition-colors"
      >
        <ChevronLeft size={36} />
      </button>

      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 text-white/60 hover:text-white transition-colors"
      >
        <ChevronRight size={36} />
      </button>

      <div className="relative max-h-[90vh] max-w-[85vw]" onClick={(e) => e.stopPropagation()}>
        <Image
          src={img.src.replace("w=600", "w=1400").replace("w=800", "w=1400")}
          alt={img.alt}
          width={1400}
          height={900}
          className="max-h-[85vh] w-auto object-contain"
        />

        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
          <p className="text-xs uppercase tracking-[0.2em] text-white/50">
            {String(index + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
          </p>
          <h3 className="text-lg font-bold text-white mt-1">{img.caption}</h3>
        </div>

        <button onClick={onClose} className="absolute -top-12 right-0 p-2 text-white/60 hover:text-white transition-colors">
          <X size={28} />
        </button>
      </div>
    </div>
  );
}

export default function GalleryPage() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
    document.body.style.overflow = "hidden";
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
    document.body.style.overflow = "";
  }, []);

  const goNext = useCallback(() => {
    setLightboxIndex((prev) => (prev !== null ? (prev + 1) % galleryImages.length : null));
  }, []);

  const goPrev = useCallback(() => {
    setLightboxIndex((prev) => (prev !== null ? (prev - 1 + galleryImages.length) % galleryImages.length : null));
  }, []);

  return (
    <div className="pt-20">
      {/* Hero header — compact */}
      <section className="relative bg-bg-section-alt py-10 md:py-14 border-b border-border">
        <div className="mx-auto max-w-6xl px-4 text-center md:px-6">
          <p className="text-xs uppercase tracking-[0.3em] text-primary mb-2 font-semibold">Memories</p>
          <h1 className="mb-2 font-[family-name:var(--font-heading)] text-2xl font-extrabold text-text md:text-3xl">
            Gallery
          </h1>
          <p className="mx-auto max-w-2xl text-sm text-text-muted md:text-base">
            Relive the monsoon magic of Nandi Hills
          </p>
        </div>
      </section>

      {/* Aftermovie */}
      <section className="section-padding bg-bg-section-alt">
        <div className="mx-auto max-w-5xl">
          <div className="relative aspect-video overflow-hidden rounded-xl border border-border">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=1200&q=80')",
              }}
            />
            <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center">
              <button
                className="flex h-20 w-20 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm border border-white/20 transition-all hover:bg-white/20 hover:scale-110 mb-4"
                aria-label="Play aftermovie"
              >
                <Play size={36} className="ml-1 text-white" fill="white" />
              </button>
              <p className="text-white font-semibold text-lg">Aftermovie Coming Soon</p>
              <p className="text-white/40 text-sm">Edition 1 Highlights</p>
            </div>
          </div>
        </div>
      </section>

      {/* Simple Photo Grid */}
      <section className="section-padding bg-bg">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {galleryImages.map((img, i) => (
              <div
                key={i}
                className="group relative aspect-[4/3] overflow-hidden rounded-lg cursor-pointer border border-border"
                onClick={() => openLightbox(i)}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-sm font-bold text-white">{img.caption}</h3>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-10 text-center text-sm text-text-muted">
            Edition 1 photos coming soon. Full Edition 2 gallery available after race day.
          </p>
        </div>
      </section>

      {/* Results */}
      <section className="section-padding bg-bg-section-alt">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-4 font-[family-name:var(--font-heading)] text-2xl font-bold text-text">
            Race Results
          </h2>
          <div className="border border-border rounded-xl bg-white p-8">
            <p className="text-lg font-medium text-text-muted">
              Edition 2 results will be published after race day
            </p>
            <p className="mt-2 text-sm text-text-muted/60">
              August 9, 2026 — Stay tuned!
            </p>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          images={galleryImages}
          index={lightboxIndex}
          onClose={closeLightbox}
          onPrev={goPrev}
          onNext={goNext}
        />
      )}
    </div>
  );
}
