"use client";

import { useRouter } from "next/navigation";
import LABELS from "../constants/labels";
import Header from "../components/Header";
import PackageCard from "../components/PackageCard";
import { useEffect, useState } from "react";
import { Package } from "lucide-react";
import { packages } from "@/app/api/packages/route";
import Footer from "../components/Footer";

type Package = {
  id: string;
  date: string;
  time: string;
  locker: string;
  lockerCode: string;
  status: string;
  pickupDate: string;
};

export default function Home() {
  const router = useRouter();
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchPackages() {
      try {
        const response = await fetch('/api/packages');
        if (!response.ok) {
          throw new Error('Failed to fetch packages');
        }
        const data = await response.json();
        setPackages(data);
      } catch (err) {
        console.error('Error fetching packages:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchPackages();
  }, []);

  if (loading) {
    return (
      <>
        <Header />
        <div className="bg-white min-h-screen flex justify-center items-center">
          <p>{LABELS.loading}</p>
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <div className="bg-white min-h-screen flex justify-center items-center">
          <p className="text-red-500">{LABELS.packageList.errorLoading || "Error loading packages"}</p>
        </div>
        <Footer />
      </>
    );
  }
  
  const readyCount = packages.filter(pkg => pkg.status.toLowerCase() === "ready for pickup").length;
  const pickedUpCount = packages.filter(pkg => pkg.status.toLowerCase() === "picked up").length;


  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <div className="bg-white min-h-screen ">
        <h2 className="text-black text-3xl text-center font-bold p-4">
          {LABELS.packageList.title}
        </h2>

        <div className=" flex items-center flex-col justify-center m-4">
          {packages.length > 0 ? (
            packages.map((item) => (
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm mb-8 overflow-hidden">
          <div className="bg-gradient-to-r from-secondary-blue to-primary-green p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="text-white mb-4 md:mb-0">
                <h1 className="text-2xl md:text-3xl font-bold">{LABELS.packageList.title}</h1>
                <p className="mt-2 opacity-90">{LABELS.packageList.description}</p>
              </div>
              <div className="flex space-x-4">
                <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-3 text-white text-center min-w-[100px]">
                  <div className="text-2xl font-bold">{readyCount}</div>
                  <div className="text-xs">{LABELS.packageList.readyForPickup}</div>
                </div>
                <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-3 text-white text-center min-w-[100px]">
                  <div className="text-2xl font-bold">{pickedUpCount}</div>
                  <div className="text-xs">{LABELS.packageList.pickedUp}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <div className="flex items-center mb-4">
            <Package className="text-primary-green mr-2" size={24} />
            <h2 className="text-xl font-semibold text-gray-800">{LABELS.packageList.yourPackages}</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages.map((item) => (
              <div
                key={item.id}
                onClick={() => router.push(`/locker/${item.id}`)}
                className="cursor-pointer transform transition-transform hover:scale-[1.02] focus:outline-none"
              >
                <PackageCard
                  id={item.id}
                  date={item.date}
                  time={item.time}
                  status={item.status}
                  pickupDate={item.pickupDate}
                />
              </div>
            ))
          ) : (
            <p>{LABELS.packageList.noPackages || "No packages found"}</p>
          )}

            ))}
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">{LABELS.packageList.helpTitle}</h3>
          <p className="text-gray-600 mb-4">{LABELS.packageList.helpDescription}</p>
          <button className="bg-secondary-blue hover:bg-blue-800 text-white px-4 py-2 rounded-md transition-colors duration-300">
            {LABELS.packageList.contactButton}
          </button>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
