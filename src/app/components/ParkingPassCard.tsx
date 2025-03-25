import { useState, useEffect } from "react";
import LABELS from "../constants/labels";
import { Car, CreditCard, Calendar, X } from "lucide-react";

type ParkingPassCardProps = {
  userId: string;
  make: string;
  model: string;
  color: string;
  licensePlate: string;
  parkingPassNumber: string;
  createdAt: string | Date;
  expirationDate: string | Date;
};

export default function ParkingPassCard({
  userId,
  createdAt,
  make,
  model,
  color,
  licensePlate,
  parkingPassNumber,
  expirationDate,
}: ParkingPassCardProps) {
  const [expirationStatus, setExpirationStatus] = useState("active");
  const [expirationCountdown, setExpirationCountdown] = useState("");

  const expirePass = () => {
    setExpirationStatus(LABELS.parkingPassCard.statusExpired);
  };

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const expirationTime = new Date(expirationDate).getTime();
      const timeLeft = expirationTime - now;

      if (timeLeft <= 0) {
        setExpirationStatus(LABELS.parkingPassCard.statusExpired);
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
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [expirationDate]);

  return (
    <>
      {expirationStatus === "active" ? (
        <div className="flex flex-col items-center bg-white shadow-2xl rounded-lg border-l-4 border-primary-green w-full max-w-xl m-auto lg:m-4 my-4 ">
          <div className="flex items-center justify-between p-4 bg-alternate-green text-primary-green w-full rounded-t-lg">
            <Car
              className="bg-primary-green text-white rounded-full p-2"
              size={50}
            />
            <h3 className="font-bold text-xl">
              {LABELS.parkingPassCard.title}
            </h3>
            <span
              className={`bg-primary-green text-white px-4 py-1 rounded-2xl`}
            >
              {LABELS.parkingPassCard.statusActive}
            </span>
          </div>

          <div className="flex flex-col text-black items-center">
            <div className="flex flex-row">
              <div className="p-2 flex items-center">
                <Calendar className="text-primary-green p-2" size={40} />
                <span className="text-gray-600">
                  {LABELS.parkingPassCard.createdTitle}
                  {createdAt.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="flex flex-row items-center text-secondary-blue  p-2">
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
          </div>

          <div className="p-4 flex gap-4 ">
            <button className="flex flex-row justify-between bg-secondary-blue py-1 px-4 rounded-md items-center ">
              <CreditCard className="p-2" size={40} />
              {LABELS.parkingPassCard.viewBtn}
            </button>

            <button
              onClick={expirePass}
              className="flex flex-row justify-between bg-red-400 py-1 px-4 rounded-md items-center text-white"
            >
              <Calendar className="p-2" size={40} />
              {LABELS.parkingPassCard.expireMeBtn}
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center bg-white shadow-2xl rounded-lg border-l-4 border-gray-400 w-full max-w-xl m-auto lg:m-4 my-4">
          <div className="flex items-center justify-between p-4 bg-gray-200 text-gray-600 w-full rounded-t-lg">
            <Car
              className="bg-gray-400 text-white rounded-full p-2"
              size={50}
            />
            <h3 className="font-bold text-xl">
              {LABELS.parkingPassCard.title}
            </h3>
            <span className="bg-gray-400 text-white px-4 py-1 rounded-2xl">
              {LABELS.parkingPassCard.statusExpired}
            </span>
          </div>

          <div className="flex flex-col text-black items-center">
            <div className="flex flex-row">
              <div className="p-2 flex items-center">
                <Calendar className="text-gray-400 p-2" size={40} />
                <span className="text-gray-600">
                  {LABELS.parkingPassCard.createdTitle}
                  {createdAt.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="flex flex-row items-center text-gray-600 p-2">
              <Car className="p-2" size={40} />
              <span className="font-bold px-2">
                {make}
                {LABELS.parkingPassCard.carFormat.comma} {model}
                {LABELS.parkingPassCard.carFormat.dash} {licensePlate}
              </span>
            </div>

            <div className="flex justify-center bg-gray-100 p-4 rounded-md w-full">
              <span className="font-bold text-xl">{expirationStatus}</span>
            </div>
          </div>

          <div className="p-4">
            <button
              onClick={expirePass}
              className="flex flex-row justify-between bg-red-400 py-1 px-4 rounded-md items-center text-white"
            >
              <X className="p-2" size={40} />
              {LABELS.parkingPassCard.deleteBtn}
            </button>
          </div>
        </div>
      )}
    </>
  );
}