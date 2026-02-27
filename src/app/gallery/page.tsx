"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Play, Camera, Mountain, TreePine, CloudRain } from "lucide-react";

const categories = [
  { id: "all", label: "All", icon: Camera },
  { id: "trail", label: "Trails", icon: TreePine },
  { id: "mountain", label: "Mountains", icon: Mountain },
  { id: "monsoon", label: "Monsoon", icon: CloudRain },
];

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&q=80",
    alt: "Runners on misty mountain trail",
    caption: "Through the Mist",
    category: "trail",
    span: "col-span-2 row-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=600&q=80",
    alt: "Running in the monsoon",
    caption: "Cloud Running",
    category: "monsoon",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1502904550040-7534597429ae?w=600&q=80",
    alt: "Trail running through greenery",
    caption: "Lush Trails",
    category: "trail",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1486739985386-d4fae04ca6f7?w=600&q=80",
    alt: "Foggy mountain landscape",
    caption: "Nandi Hills Summit",
    category: "mountain",
    span: "col-span-1 row-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&q=80",
    alt: "Lush forest trail",
    caption: "Forest Canopy",
    category: "trail",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1542601098-8fc114e148e2?w=600&q=80",
    alt: "Mountain sunrise",
    caption: "Dawn at the Peak",
    category: "mountain",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80",
    alt: "Misty valley landscape",
    caption: "Valley of Clouds",
    category: "monsoon",
    span: "col-span-2 row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=600&q=80",
    alt: "Green hills panorama",
    caption: "Monsoon Greens",
    category: "monsoon",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80",
    alt: "Mountain peak in clouds",
    caption: "Above the Clouds",
    category: "mountain",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80",
    alt: "Aerial view of green landscape",
    caption: "The Green Expanse",
    category: "trail",
    span: "col-span-2 row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&q=80",
    alt: "Mountain range at twilight",
    caption: "Twilight Ridge",
    category: "mountain",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=600&q=80",
    alt: "Looking up through trees",
    caption: "Canopy View",
    category: "trail",
    span: "col-span-1 row-span-1",
  },
];

function Lightbox({
  images,
  index,
  onClose,
  onPrev,
  onNext,
  onGoTo,
}: {
  images: typeof galleryImages;
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  onGoTo: (i: number) => void;
}) {
  const img = images[index];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm" onClick={onClose}>
      {/* Left arrow */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 text-white/60 hover:text-white transition-colors"
      >
        <ChevronLeft size={36} />
      </button>

      {/* Right arrow */}
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 text-white/60 hover:text-white transition-colors"
      >
        <ChevronRight size={36} />
      </button>

      <div className="relative max-h-[90vh] max-w-[80vw]" onClick={(e) => e.stopPropagation()}>
        <Image
          src={img.src.replace("w=600", "w=1400").replace("w=800", "w=1400")}
          alt={img.alt}
          width={1400}
          height={900}
          className="max-h-[85vh] w-auto object-contain"
        />

        {/* Caption */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
          <p className="text-xs uppercase tracking-[0.2em] text-white/50">
            {String(index + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
          </p>
          <h3 className="text-xl font-bold text-white mt-1">{img.caption}</h3>
        </div>

        {/* Close */}
        <button onClick={onClose} className="absolute -top-12 right-0 p-2 text-white/60 hover:text-white transition-colors">
          <X size={28} />
        </button>
      </div>

      {/* Thumbnail strip */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 overflow-x-auto max-w-[90vw] px-4 py-2">
        {images.map((thumb, i) => (
          <button
            key={i}
            onClick={(e) => { e.stopPropagation(); onGoTo(i); }}
            className={`flex-shrink-0 w-16 h-12 overflow-hidden border-2 transition-all ${
              i === index ? "border-primary opacity-100" : "border-transparent opacity-40 hover:opacity-70"
            }`}
          >
            <Image src={thumb.src.replace("w=800", "w=100").replace("w=600", "w=100")} alt="" width={100} height={75} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredImages = activeCategory === "all"
    ? galleryImages
    : galleryImages.filter((img) => img.category === activeCategory);

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
    document.body.style.overflow = "hidden";
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
    document.body.style.overflow = "";
  }, []);

  const goNext = useCallback(() => {
    setLightboxIndex((prev) => (prev !== null ? (prev + 1) % filteredImages.length : null));
  }, [filteredImages.length]);

  const goPrev = useCallback(() => {
    setLightboxIndex((prev) => (prev !== null ? (prev - 1 + filteredImages.length) % filteredImages.length : null));
  }, [filteredImages.length]);

  const goTo = useCallback((i: number) => {
    setLightboxIndex(i);
  }, []);

  return (
    <div className="pt-20">
      {/* Hero header */}
      <section className="relative bg-bg-section-alt py-16 md:py-24 border-b border-border">
        <div className="mx-auto max-w-6xl px-4 text-center md:px-6">
          <p className="text-xs uppercase tracking-[0.3em] text-primary mb-3 font-semibold">Memories</p>
          <h1 className="mb-4 font-[family-name:var(--font-heading)] text-4xl font-extrabold text-text md:text-5xl">
            Gallery
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-text-muted">
            Relive the monsoon magic of Nandi Hills
          </p>
        </div>
      </section>

      {/* Aftermovie */}
      <section className="section-padding bg-bg-section-alt">
        <div className="mx-auto max-w-5xl">
          <div className="relative aspect-video overflow-hidden border border-border">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=1200&q=80')",
              }}
            />
            <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center">
              <button
                className="flex h-20 w-20 items-center justify-center bg-white/10 backdrop-blur-sm border border-white/20 transition-all hover:bg-white/20 hover:scale-110 mb-4"
                aria-label="Play aftermovie"
              >
                <Play size={36} className="ml-1 text-white" fill="white" />
              </button>
              <p className="text-white font-semibold text-lg">Aftermovie Coming Soon</p>
              <p className="text-white/40 text-sm">Edition 1 Highlights — Coming Soon</p>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="bg-bg border-b border-border">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className="flex gap-1 overflow-x-auto py-4">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 text-sm font-medium transition-all whitespace-nowrap ${
                    isActive
                      ? "bg-navy-dark text-white"
                      : "bg-transparent text-text-muted hover:bg-navy/5 hover:text-navy"
                  }`}
                >
                  <Icon size={16} />
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Photo Grid */}
      <section className="section-padding bg-bg">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[200px] md:auto-rows-[240px] gap-3">
            {filteredImages.map((img, i) => (
              <div
                key={`${activeCategory}-${i}`}
                className={`group relative overflow-hidden cursor-pointer border border-border ${img.span}`}
                onClick={() => openLightbox(i)}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-white/50 font-medium">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-sm font-bold text-white mt-0.5">{img.caption}</h3>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-12 text-center text-sm text-text-muted">
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
          <div className="border border-border bg-white p-8">
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
          images={filteredImages}
          index={lightboxIndex}
          onClose={closeLightbox}
          onPrev={goPrev}
          onNext={goNext}
          onGoTo={goTo}
        />
      )}
    </div>
  );
}
