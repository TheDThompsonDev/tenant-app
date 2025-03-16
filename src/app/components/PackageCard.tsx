import LABELS from "../constants/labels";
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
        <span className="text-xl font-bold">{status}</span>
        <div className="flex flex-col m-4">
          <span>
            {LABELS.package.dateTitle} {date}
          </span>
          {status.toLowerCase() === "ready for pickup" ? (
            <span>
              {LABELS.package.timeTitle} {time}
            </span>
          ) : (
            <span>
              {LABELS.package.pickupTitle} {pickupDate}
            </span>
          )}
        </div>

        <span className="font-bold">{LABELS.packageList.actionBtn}</span>
      </div>
    </button>
  );
}
