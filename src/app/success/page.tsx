"use client";
import Footer from "../components/Footer";
import Header from "../components/Header";
import LABELS from "../constants/labels";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const email = searchParams ? searchParams.get("email") : null;

  const [password, setPassword] = useState("");

  useEffect(() => {
    try {
      const storedPassword = typeof window !== 'undefined' ? sessionStorage.getItem("password") : null;
      if (storedPassword) {
        setPassword(storedPassword);
        sessionStorage.removeItem("password");
      }
    } catch (error) {
      console.log("Error accessing sessionStorage:", error);
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 relative">
      <Link
        href="/createTenant"
        className="text-med text-gray-500 mb-4 inline-block absolute top-10 left-10"
      >
        &larr; {LABELS.success.back}
      </Link>

      <h2 className="text-xl font-semibold text-gray-800 text-center">
        {LABELS.success.title}
      </h2>
      <div className="mt-6 bg-secondary-blue text-white rounded-xl p-6 shadow-lg h-56 w-72 sm:w-80 md:w-96 lg:w-[30rem]">
        <p className="mb-10 mt-5 ml-5">
          <span className="font-semibold underline">Email</span> <br />
          {email}
        </p>
        <p className="ml-5">
          <span className="font-semibold underline">
            {LABELS.success.temporaryPassword}
          </span>{" "}
          <br />
          {password}
        </p>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <div>
      <Header />
      <Suspense fallback={<div className="flex justify-center items-center min-h-screen">Loading...</div>}>
        <SuccessContent />
      </Suspense>
      <Footer />
    </div>
  );
}
