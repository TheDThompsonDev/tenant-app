"use client";

import Header from "@/app/components/Header";
import GuestParkingPassForm from "@/app/components/GuestParkingPassForm";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <div className="flex-grow">
        <GuestParkingPassForm />
      </div>
      <Footer />
    </div>
  );
}
