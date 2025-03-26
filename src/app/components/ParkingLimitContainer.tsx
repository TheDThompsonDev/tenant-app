import { useState, useEffect } from "react";
import LABELS from "../constants/labels";
import ParkingPassCard from "./ParkingPassCard";
import { getCurrentUser } from "@/lib/appwrite";

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [passCount, setPassCount] = useState(0);

  useEffect(() => {
    const fetchParkingPasses = async () => {
      try {
        setLoading(true);
        const userResponse = await getCurrentUser();
        if (!userResponse.success || !userResponse.data) {
          setError("Unable to fetch user data");
          setLoading(false);
          return;
        }
        
        const userId = userResponse.data.$id;
        const response = await fetch(`/api/parking?userId=${userId}`);
        const data = await response.json();
        
        const formatDate = (dateString: string) => {
          return new Date(dateString).toLocaleString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          });
        };

        // Sort by creation date (newest first)
        const sortedPasses = [...data].sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        setPassCount(sortedPasses.length);
        const formattedPasses = sortedPasses.map((pass) => ({
          ...pass,
          createdAt: formatDate(pass.createdAt),
          expirationDate: pass.expirationDate ? formatDate(pass.expirationDate) : 'N/A',
        }));

        setParkingPasses(formattedPasses);
        setError(null);
      } catch (error) {
        console.error("Error fetching parking passes:", error);
        setError("Failed to load parking passes");
      } finally {
        setLoading(false);
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
        ({passCount}/2)
      </span>
      <p className="flex justify-center p-4 text-white">
        {LABELS.parkingLimit.description}
      </p>

      {loading ? (
        <div className="flex justify-center p-4">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-white"></div>
        </div>
      ) : error ? (
        <p className="text-white text-center">{error}</p>
      ) : (
        <div className="flex flex-col lg:flex-row w-full m-auto justify-center gap-4">
          {parkingPasses.length > 0 ? (
            parkingPasses.map((pass) => (
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
      )}
    </div>
  );
}