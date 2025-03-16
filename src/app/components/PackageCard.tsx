interface PackageCardProps {
  id: string;
  date: string;
  time: string;
  status: string;
  pickupDate: string;
}

export default function PackageCard({
  id,
  date,
  time,
  status,
  pickupDate,
}: PackageCardProps) {
  return (
    <button
      type="button"
      className={` flex flex-col rounded-md p-4 text-center text-white w-full ${
        status.toLowerCase() === "ready for pickup"
          ? "bg-primary-green"
          : "bg-gray-500"
      }`}
    >
      <div className="flex flex-col">
        <span className="text-xl font-bold">{id}</span>
        <span>Date: {date}</span>
        {status.toLowerCase() === "ready for pickup" ? (
          <span>Time delivered: {time}</span>
        ) : (
          <span>Picked up: {pickupDate}</span>
        )}
        <span className="font-bold">{status}</span>
      </div>
    </button>
  );
}
