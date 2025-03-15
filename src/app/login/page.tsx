"use client"

import Image from "next/image"
import Link from "next/link"
import LoginForm from "./Loginform"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col lg:flex-row">
      <div className="hidden lg:block lg:w-1/2 h-screen relative">
        <Image
          src="/login.jpeg"
          alt="Apartment Building"
          layout="fill"
          objectFit="cover"
        />
      </div>

      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6">
        <div className="max-w-md w-full">
          <Link href="/" className="text-sm text-gray-500 mb-4 inline-block">
            &larr; Back
          </Link>

          <LoginForm />

          <p className="text-center text-gray-600 mt-4">
            Don&apos;t have an account?{" "}
            <Link href="/contact" className="text-blue-600">
              Contact us
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

