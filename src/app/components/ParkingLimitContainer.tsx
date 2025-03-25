import { useState, useEffect } from "react";
import LABELS from "../constants/labels";
import ParkingPassCard from "./ParkingPassCard";

type ParkingPass = {
  id: string;
  userId: string;
  make: string;
  model: string;
  color: string;
  licensePlate: string;
  parkingPassNumber: string;
  createdAt: string | Date;
  expirationDate: string | Date;
};

export default function ParkingLimitContainer() {
  const [parkingPasses, setParkingPasses] = useState<ParkingPass[]>([]);

  useEffect(() => {
    const fetchParkingPasses = async () => {
      try {
        const response = await fetch("/api/parking");
        const data = await response.json();
        console.log(data)

        const formatDate = (dateString: string) => {
          return new Date(dateString).toLocaleString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          });
        };

        const latestPasses = [...data]
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
          .slice(0, 2)
          .map((pass) => ({
            ...pass,
            createdAt: formatDate(pass.createdAt),
            // expirationDate: formatDate(pass.expirationDate),
          }));

        setParkingPasses(latestPasses);
      } catch (error) {
        console.error("Error fetching parking passes:", error);
      }
    };
    fetchParkingPasses();
  }, []);

  return (
    <div className="flex flex-col p-4 w-full bg-secondary-blue">
      <h2 className="flex justify-center text-2xl font-bold text-white">
        {LABELS.parkingLimit.title}
      </h2>
      <span className="flex justify-center text-xl font-bold text-white">
        {/* ({activePasses.length}/2) */}
      </span>
      <p className="flex justify-center p-4 text-white">
        {LABELS.parkingLimit.description}
      </p>

      <div className="flex flex-col lg:flex-row w-full m-auto justify-center">
        {parkingPasses.length > 0 ? (
          parkingPasses
            .slice(0, 2)
            .map((pass) => (
              <ParkingPassCard
                key={pass.id}
                userId={pass.userId}
                make={pass.make}
                model={pass.model}
                color={pass.color}
                licensePlate={pass.licensePlate}
                parkingPassNumber={pass.parkingPassNumber}
                createdAt={pass.createdAt}
                expirationDate={pass.expirationDate}
              />
            ))
        ) : (
          <p className="text-white">No active passes available.</p>
        )}
      </div>
    </div>
  );
}