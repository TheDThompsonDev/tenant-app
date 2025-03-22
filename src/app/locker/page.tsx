"use client";

import { useRouter } from "next/navigation";
import LABELS from "../constants/labels";
import Header from "../components/Header";
import PackageCard from "../components/PackageCard";
import { useEffect, useState } from "react";
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

  return (
    <>
      <Header />
      <div className="bg-white min-h-screen ">
        <h2 className="text-black text-3xl text-center font-bold p-4">
          {LABELS.packageList.title}
        </h2>

        <div className=" flex items-center flex-col justify-center m-4">
          {packages.length > 0 ? (
            packages.map((item) => (
              <div
                className="w-full md:w-1/2 m-4"
                key={item.id}
                onClick={() => router.push(`/locker/${item.id}`)}
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
        </div>
      </div>
      <Footer />
    </>
  );
}
