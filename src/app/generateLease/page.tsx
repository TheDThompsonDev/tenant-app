"use client";

import LABELS from "../constants/labels";
import Header from "../components/Header";
import Footer from "../components/Footer";
import GenerateLeaseForm from "../components/GenerateLeaseForm";

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
