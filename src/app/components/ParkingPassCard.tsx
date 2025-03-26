import { useState, useEffect } from "react";
import LABELS from "../constants/labels";
import { Car, CreditCard, Calendar, X } from "lucide-react";

type ParkingPassCardProps = {
  id: string;
  userId: string;
  make: string;
  model: string;
  color: string;
  licensePlate: string;
  parkingPassNumber: string;
  createdAt: string | Date;
  expirationDate: string | Date;
  formattedCreatedAt?: string;
  formattedExpirationDate?: string;
  onExpire?: () => void;
};

export default function ParkingPassCard({
  id,
  make,
  model,
  licensePlate,
  parkingPassNumber,
  createdAt,
  expirationDate,
  formattedCreatedAt,
  formattedExpirationDate,
  onExpire,
}: ParkingPassCardProps) {
  const [expirationStatus, setExpirationStatus] = useState("active");
  const [expirationCountdown, setExpirationCountdown] = useState("");
  const [isExpiring, setIsExpiring] = useState(false);

  const expirePass = async () => {
    if (isExpiring) return;
    
    try {
      setIsExpiring(true);
      
      const response = await fetch("/api/parking/expire", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      
      if (!response.ok) {
        throw new Error("Failed to expire parking pass");
      }
      
      setExpirationStatus(LABELS.parkingPassCard.statusExpired);
      
      if (onExpire) {
        onExpire();
      }
      
      console.log("Parking pass expired successfully");
    } catch (error) {
      console.log("Error expiring parking pass:", error);
    } finally {
      setIsExpiring(false);
    }
  };

  useEffect(() => {
    const updateCountdown = () => {
      if (expirationDate === 'N/A') {
        setExpirationCountdown('No expiration date');
        return;
      }
      
      const now = new Date();
      let parsedExpDate: Date;
      
      try {
        if (typeof expirationDate === 'string') {
          parsedExpDate = new Date(expirationDate);
          
          if (isNaN(parsedExpDate.getTime())) {
            setExpirationCountdown('24h 0m 0s');
            return;
          }
        } else {
          parsedExpDate = new Date(expirationDate);
        }
        
        const timeLeft = parsedExpDate.getTime() - now.getTime();
        
        if (timeLeft <= 0) {
          setExpirationStatus(LABELS.parkingPassCard.statusExpired);
          setExpirationCountdown('Expired');
          return;
        }
        
        const totalSeconds = Math.floor(timeLeft / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        
        const timeUnits = [
          { value: hours, label: LABELS.parkingPassCard.time.hour },
          { value: minutes, label: LABELS.parkingPassCard.time.minute },
          { value: seconds, label: LABELS.parkingPassCard.time.second },
        ];
        
        setExpirationCountdown(
          timeUnits.map(({ value, label }) => `${value}${label}`).join(" ")
        );
      } catch (error) {
        console.log("Error calculating countdown:", error);
        setExpirationCountdown('24h 0m 0s');
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [expirationDate]);

  const isExpired = expirationStatus === LABELS.parkingPassCard.statusExpired;

  return (
    <div className={`flex flex-col items-center bg-white shadow-2xl rounded-lg border-l-4 ${isExpired ? 'border-red-500' : 'border-primary-green'} w-full max-w-xl m-auto lg:m-4 my-4`}>
      <div className={`flex items-center justify-between p-4 ${isExpired ? 'bg-red-100 text-red-500' : 'bg-alternate-green text-primary-green'} w-full rounded-t-lg`}>
        <Car
          className={`${isExpired ? 'bg-red-500' : 'bg-primary-green'} text-white rounded-full p-2`}
          size={50}
        />
        <h3 className="font-bold text-xl">
          {LABELS.parkingPassCard.title}
        </h3>
        <span
          className={`${isExpired ? 'bg-red-500' : 'bg-primary-green'} text-white px-4 py-1 rounded-2xl`}
        >
          {isExpired ? LABELS.parkingPassCard.statusExpired : LABELS.parkingPassCard.statusActive}
        </span>
      </div>

      <div className="flex flex-col text-black items-center">
        <div className="flex flex-row">
          <div className="p-2 flex items-center">
            <Calendar className={`${isExpired ? 'text-red-500' : 'text-primary-green'} p-2`} size={40} />
            <span className="text-gray-600">
              {LABELS.parkingPassCard.createdTitle}
              {formattedCreatedAt || (typeof createdAt === 'string' ? createdAt : createdAt.toLocaleString())}
            </span>
          </div>
        </div>

        <div className="flex flex-row items-center text-secondary-blue p-2">
          <Car className="p-2" size={40} />
          <span className="font-bold px-2">
            {make}
            {LABELS.parkingPassCard.carFormat.comma} {model}
            {LABELS.parkingPassCard.carFormat.dash} {licensePlate}
          </span>
        </div>

        <div className="flex justify-center bg-gray-100 p-4 rounded-md w-full">
          <span className="font-bold text-xl">{expirationCountdown}</span>
        </div>

        <div className="text-sm text-gray-500 mt-2">
          {isExpired ? 'Expired on: ' : 'Will expire on: '}
          {formattedExpirationDate || (typeof expirationDate === 'string' ? expirationDate : expirationDate.toLocaleString())}
        </div>
      </div>

      <div className="p-4 flex gap-4">
        {!isExpired ? (
          <>
            <button className="flex flex-row justify-between bg-secondary-blue py-1 px-4 rounded-md items-center">
              <CreditCard className="p-2" size={40} />
              {LABELS.parkingPassCard.viewBtn} {parkingPassNumber && `#${parkingPassNumber}`}
            </button>

            <button
              onClick={expirePass}
              disabled={isExpiring}
              className={`flex flex-row justify-between ${isExpiring ? 'bg-gray-400' : 'bg-red-400'} py-1 px-4 rounded-md items-center text-white`}
            >
              <Calendar className="p-2" size={40} />
              {isExpiring ? 'Expiring...' : LABELS.parkingPassCard.expireMeBtn}
            </button>
          </>
        ) : (
          <button
            onClick={expirePass}
            className="flex flex-row justify-between bg-red-400 py-1 px-4 rounded-md items-center text-white"
          >
            <X className="p-2" size={40} />
            {LABELS.parkingPassCard.deleteBtn} {parkingPassNumber && `#${parkingPassNumber}`}
          </button>
        )}
      </div>
    </div>
  );
}