"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import LABELS from "@/app/constants/labels";
import Header from "@/app/components/Header";
import LockerDetails from "@/app/components/LockerDetails";

export default function PackageDetailsPage() {
  const params = useParams();

  if (!params || !params.id) {
    return <p className="text-center text-red-500">Package not found.</p>;
  }

  const id = params.id as string;

  const packageData = LABELS.package.packageCards.find(
    (item) => item.id === id
  );

  if (!packageData)
    return <p className="text-center text-red-500">Package not found.</p>;

  return (
    <>
      <Header />
      <div className="bg-white min-h-screen">
        <div className="flex flex-col justify-center m-4">
          <h2 className="text-black text-center text-3xl font-bold p-4">
            Package Details
          </h2>

          <Link
            href="/locker"
            className="text-sm text-gray-500 mb-4 inline-block"
          >
            &larr; {LABELS.package.back}
          </Link>
          <div className="flex flex-col text-black m-auto p-4">
            <h3 className="text-2xl font-bold"> Package #: {packageData.id}</h3>
            <span>Package Status: {packageData.status}</span>
            {packageData.status.toLowerCase() === "ready for pickup" ? (
              <span>Time delivered: {packageData.time}</span>
            ) : (
              <span>Picked up: {packageData.pickupDate}</span>
            )}
          </div>

          {packageData.status === "Ready for pickup" ? (
            <LockerDetails
              id={packageData.id}
              lockerNumber={packageData.locker}
              lockerCode={packageData.lockerCode}
            />
          ) : (
            <div className="flex items-center justify-center flex-col rounded-md p-4 text-center text-white w-full lg:w-1/2 bg-gray-500 text-white m-auto">
              <span className="p-4 w-full rounded-md flex flex-col p-4 text-center m-auto text-xl font-bold">
                This package was picked up.
              </span>
            </div>
          )}

          <div className="flex flex-col m-4 lg:m-auto w-full lg:w-1/2">
            <div>
              <p className="text-black">Notify us if there are any issues</p>
              <button className="bg-primary-green text-white p-4 rounded-md">
                send a message
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
