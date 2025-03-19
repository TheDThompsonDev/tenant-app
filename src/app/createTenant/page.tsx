"use client";

import Image from "next/image";
import LABELS from "../constants/labels";
import Header from "../components/Header";
import CreateTenantForm from "../components/CreateTenantForm";
import Footer from "../components/Footer";

export default function createTenant() {
  return (
    <div>
      <Header />
      <div className="bg-white min-h-screen text-black flex flex-col lg:flex-row">
        <div className="hidden lg:block lg:w-1/2 h-screen relative ">
          <Image
            src={"/login.jpeg"}
            alt={LABELS.createTenant.imageAlt}
            fill
            className="object-cover"
          />
        </div>
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6">
          <div className="max-w-md w-full">
            <CreateTenantForm />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
