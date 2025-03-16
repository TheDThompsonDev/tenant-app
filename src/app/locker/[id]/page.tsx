"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import LABELS from "@/app/constants/labels";
import Header from "@/app/components/Header";
import LockerDetails from "@/app/components/LockerDetails";

import { packages } from "@/app/api/packages/route";

export default function PackageDetailsPage() {
  const params = useParams();

  if (!params || !params.id) {
    return (
      <p className="text-center text-red-500">{LABELS.package.notfoundError}</p>
    );
  }

  const id = params.id as string;

  {
    /*TODO: Fetch Package Details from database instead of hardcoded api */
  }
  const packageData = packages.find((item) => item.id === id);

  if (!packageData)
    return (
      <p className="text-center text-red-500">{LABELS.package.notfoundError}</p>
    );

  return (
    <>
      <Header />
      <div className="bg-white min-h-screen">
        <div className="flex flex-col justify-center ">
          <h2 className="text-black text-center text-3xl font-bold p-4">
            {LABELS.PackageDetails.title}
          </h2>

          <div className="flex flex-col text-black m-auto p-4">
            <Link
              href="/locker"
              className="text-sm text-gray-500 pb-4 inline-block"
            >
              &larr; {LABELS.package.back}
            </Link>
            <h3 className="text-2xl font-bold">
              {LABELS.PackageDetails.statusTitle} {packageData.status}
            </h3>
            {packageData.status.toLowerCase() === "ready for pickup" ? (
              <span>
                {LABELS.PackageDetails.deliveredTitle} {packageData.time}
              </span>
            ) : (
              <span>
                {LABELS.PackageDetails.pickupTitle} {packageData.pickupDate}
              </span>
            )}
          </div>

          {packageData.status === "Ready for pickup" ? (
            <LockerDetails
              id={packageData.id}
              lockerNumber={packageData.locker}
              lockerCode={packageData.lockerCode}
            />
          ) : (
            <div className="flex items-center justify-center flex-col rounded-md p-4 text-center text-white  bg-gray-500 text-white m-auto">
              <span className="p-4 w-full rounded-md flex flex-col p-4 text-center m-auto text-xl font-bold">
                {LABELS.PackageDetails.pickedupStatus}
              </span>
            </div>
          )}

          <div className="flex flex-col justify-center items-center lg:m-auto w-full lg:w-1/2 p-4">
            <p className="text-black">{LABELS.PackageDetails.notify}</p>
            <button className="bg-primary-green text-white p-4 rounded-md">
              {LABELS.PackageDetails.messageBtn}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
