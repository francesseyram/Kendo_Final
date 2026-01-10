"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import clsx from "clsx"

type GalleryImage = {
  src: string
  alt: string
}

type GalleryMasonryProps = {
  images: GalleryImage[]
}

export function GalleryMasonry({ images }: GalleryMasonryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const close = useCallback(() => setActiveIndex(null), [])
  const prev = useCallback(
    () => setActiveIndex((i) => (i !== null && i > 0 ? i - 1 : i)),
    []
  )
  const next = useCallback(
    () =>
      setActiveIndex((i) =>
        i !== null && i < images.length - 1 ? i + 1 : i
      ),
    [images.length]
  )

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close()
      if (e.key === "ArrowRight") next()
      if (e.key === "ArrowLeft") prev()
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [close, next, prev])

  return (
    <>
      {/* Masonry Grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 sm:gap-6 space-y-4 sm:space-y-6">
        {images.map((img, i) => (
          <div
            key={i}
            onClick={() => setActiveIndex(i)}
            className="relative group cursor-pointer overflow-hidden rounded-2xl glass border border-primary/10 hover:border-primary/30 transition-all duration-500"
          >
            <Image
              src={img.src}
              alt={img.alt}
              width={800}
              height={600}
              className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
              loading={i < 6 ? "eager" : "lazy"}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Caption */}
            <div className="absolute bottom-4 left-4 right-4 text-sm text-foreground opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
              {img.alt}
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {activeIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-lg flex items-center justify-center">
          {/* Close */}
          <button
            onClick={close}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white/70 hover:text-white transition-colors z-10 p-2"
            aria-label="Close lightbox"
          >
            <X size={24} className="sm:w-7 sm:h-7" />
          </button>

          {/* Prev */}
          <button
            onClick={prev}
            className={clsx(
              "absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors z-10 p-2",
              activeIndex === 0 && "opacity-30 pointer-events-none"
            )}
            aria-label="Previous image"
          >
            <ChevronLeft size={32} className="sm:w-9 sm:h-9" />
          </button>

          {/* Next */}
          <button
            onClick={next}
            className={clsx(
              "absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors z-10 p-2",
              activeIndex === images.length - 1 &&
                "opacity-30 pointer-events-none"
            )}
            aria-label="Next image"
          >
            <ChevronRight size={32} className="sm:w-9 sm:h-9" />
          </button>

          {/* Image */}
          <div className="max-w-5xl w-full px-4 sm:px-6">
            <Image
              src={images[activeIndex].src}
              alt={images[activeIndex].alt}
              width={1600}
              height={1000}
              className="w-full h-auto rounded-xl object-contain max-h-[85vh]"
              priority
              sizes="(max-width: 768px) 100vw, 90vw"
            />

            {/* Caption */}
            <p className="mt-4 text-center text-xs sm:text-sm text-white/70 px-4">
              {images[activeIndex].alt}
            </p>
          </div>
        </div>
      )}
    </>
  )
}

