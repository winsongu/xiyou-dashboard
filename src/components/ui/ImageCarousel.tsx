"use client";

import { useState } from "react";

interface CarouselImage {
  url: string;
  alt: string;
  caption?: string;
}

export default function ImageCarousel({
  images,
}: {
  images: CarouselImage[];
}) {
  const [current, setCurrent] = useState(0);

  if (images.length === 0) return null;

  return (
    <div className="card-brutal overflow-hidden mb-8">
      {/* Image Display */}
      <div className="relative aspect-[2/1] bg-ink overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={images[current].url}
          alt={images[current].alt}
          className="w-full h-full object-cover"
        />

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={() =>
                setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1))
              }
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 border-2 border-ink rounded-sm shadow-brutal-sm flex items-center justify-center hover:bg-gold transition-colors font-bold text-lg"
            >
              ←
            </button>
            <button
              onClick={() =>
                setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1))
              }
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 border-2 border-ink rounded-sm shadow-brutal-sm flex items-center justify-center hover:bg-gold transition-colors font-bold text-lg"
            >
              →
            </button>
          </>
        )}

        {/* Counter Badge */}
        <div className="absolute top-3 right-3 badge-pixel bg-ink text-white text-[10px]">
          {current + 1} / {images.length}
        </div>
      </div>

      {/* Caption */}
      {images[current].caption && (
        <div className="px-4 py-2 bg-paper-dark border-t-2 border-ink/10 text-xs text-ink-muted text-center font-medium">
          {images[current].caption}
        </div>
      )}

      {/* Dot Indicators */}
      {images.length > 1 && (
        <div className="flex justify-center gap-2 py-3 bg-white">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`w-3 h-3 rounded-sm border-2 border-ink transition-colors ${
                idx === current ? "bg-gold" : "bg-paper-dark"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
