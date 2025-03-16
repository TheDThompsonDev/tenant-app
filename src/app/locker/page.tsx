"use client";

import { useRouter } from "next/navigation";
import LABELS from "../constants/labels";
import Header from "../components/Header";
import PackageCard from "../components/PackageCard";

export default function Home() {
  const router = useRouter();

  return (
    <>
      <Header />
      <div className="bg-white min-h-screen ">
        <h2 className="text-black text-3xl text-center font-bold p-4">
          My Packages
        </h2>

        {/* TODO: Fetch package list from the database instead of using hardcoded data*/}
        <div className=" flex items-center flex-col justify-center m-4">
          {LABELS.package.packageCards.map((item) => {
            return (
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
            );
          })}
        </div>
      </div>
    </>
  );
}
