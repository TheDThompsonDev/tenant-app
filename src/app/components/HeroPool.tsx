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

      <div className="absolute inset-0 bg-black/30 lg:bg-black/20" />

      <div className="relative z-10 text-center px-6">
        <h2 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold max-w-2xl mx-auto">
          Managing everyday apartment life just got easier.
        </h2>
      </div>
    </section>
  )
}