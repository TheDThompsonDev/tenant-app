"use client"

import Image from "next/image"

export default function HeroPool () {
  return (
    <section className="relative w-full h-[500px] lg:h-[600px] flex items-center justify-center">
      <Image
        src="/pool.png"
        alt="apartment life"
        layout="fill"
        objectFit="cover"
        className="absolute inset-0 w-full h-full"
      />

      {/* dark overlay over image */}
      <div className="absolute inset-0 bg-black/30 lg:bg-black/20" />

      <div className="relative z-10 text-center px-6">
        <h2 className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl max-w-2xl mx-auto drop-shadow-[2px_3px_3px_rgba(0,0,0,0.5)]">
          Managing everyday apartment life just got easier.
        </h2>
      </div>
    </section>
  )
}