"use client";
import Footer from "../components/Footer";
import Header from "../components/Header";
import LABELS from "../constants/labels";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const firstName = searchParams ? searchParams.get("firstName") : null;
  const lastName = searchParams ? searchParams.get("lastName") : null;
  const email = searchParams ? searchParams.get("email") : null;
  const apartmentNumber = searchParams
    ? searchParams.get("apartmentNumber")
    : null;

  const username =
    lastName && apartmentNumber ? `${lastName}${apartmentNumber}` : "";

  return (
    <div>
      <Header />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 relative">
        <Link
          href="/createTenant"
          className="text-med text-gray-500 mb-4 inline-block absolute top-10 left-10">
          &larr; {LABELS.success.back}
        </Link>

        <h2 className="text-xl font-semibold text-gray-800 text-center">
          {LABELS.success.title}
        </h2>
        <div className="mt-6 bg-secondary-blue text-white rounded-xl p-6 shadow-lg h-56 w-72 sm:w-80 md:w-96 lg:w-[30rem]">
          <p className="mb-10 mt-5 ml-5">
            <span className="font-semibold underline">User Name:</span> <br />
            {username}
          </p>
          <p className="ml-5">
            <span className="font-semibold underline">Temporary Password:</span>{" "}
            <br />
            Southerland101
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
