"use client"

import Image from "next/image"
import Link from "next/link"
import LoginForm from "../components/Loginform"
import LABELS from "@/app/constants/labels"
import { getCurrentUser } from "@/lib/appwrite"
import { useEffect } from "react"
import { useRouter } from "next/navigation"


export default function LoginPage() {
  const router = useRouter()

  useEffect(() => {
    const checkIfLoggedIn = async () => {
      const response = await getCurrentUser()
      if (response.success) {
        router.push("/dashboard")
      }
    }

    checkIfLoggedIn()
  }, [router])

  return (
    <div className="min-h-screen bg-white flex flex-col lg:flex-row">
      <div className="hidden lg:block lg:w-1/2 h-screen relative">
        <Image
          src="/login.jpeg"
          alt={LABELS.login.page.imageAlt}
          fill
          className="object-cover"
        />
      </div>

      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6">
        <div className="max-w-md w-full">
          <Link href="/" className="text-sm text-gray-500 mb-4 inline-block">
            &larr; {LABELS.login.page.backLink}
          </Link>

          <LoginForm />

          <p className="text-center text-gray-600 mt-4">
            {LABELS.login.page.noAccountText}{" "}
            <Link href="/#contact" className="text-blue-600">
              {LABELS.login.page.contactUsLink}
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
