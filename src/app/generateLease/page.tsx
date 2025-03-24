"use client";
import Header from "../components/Header";
import Footer from "../components/Footer";
import GenerateLeaseForm from "../components/lease/GenerateLeaseForm";

export default function generateLease() {
  return (
    <div>
      <Header />
      <div className="bg-white min-h-screen text-black flex flex-col lg:flex-row">
        <GenerateLeaseForm />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
