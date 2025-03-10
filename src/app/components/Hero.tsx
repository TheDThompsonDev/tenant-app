"use client"

import Image from "next/image"

export default function Hero() {
  return (
    <section className="relative h-screen w-full flex items-center justify-center">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/hero-image.png"
          alt="Modern Apartment Living"
          layout="fill"
          objectFit="cover"
          priority
        />
      </div>

      {/* Container */}
      <div className="text-center px-6 md:px-12">
        <h1 className="text-white text-3xl md:text-5xl lg:text-6xl font-bold leading-tight max-w-3xl">
          Smart Solutions for Modern Apartment Living
        </h1>
      
        <button className="mt-6 px-6 py-3 bg-[#10B981] text-white text-lg font-semibold rounded-lg">
          Get Started
        </button>
      </div>
    </section>
  )
}