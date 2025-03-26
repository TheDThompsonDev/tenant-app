import LABELS from "../constants/labels";
import {
  Package,
  CheckCircle,
  ArrowRight,
  Container,
  Key,
  PackageCheck,
} from "lucide-react";
import { formatDate } from "../../../utils/formatDate";
interface PackageCardProps {
  id: string;
  accessCode: string;
  lockerNumber: string;
  status: string;
  lastAcessed: string;
}

export default function PackageCard({
  status,
  accessCode,
  lockerNumber,
  lastAcessed,
}: PackageCardProps) {
  const isReady = status === "READY_FOR_PICKUP";

  return (
    <div
      className={`w-full overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:shadow-lg ${
        isReady
          ? "border-l-4 border-primary-green"
          : "border-l-4 border-gray-500"
      }`}
    >
      <div
        className={`flex items-center justify-between p-4 ${
          isReady
            ? "bg-primary-green bg-opacity-10"
            : "bg-gray-500 bg-opacity-10"
        }`}
      >
        <div className="flex items-center space-x-3">
          {isReady ? (
            <div className="flex items-center justify-center p-2 bg-primary-green rounded-full">
              <Package size={20} className="text-white" />
            </div>
          ) : (
            <div className="flex items-center justify-center p-2 bg-gray-500 rounded-full">
              <CheckCircle size={20} className="text-white" />
            </div>
          )}
          <span
            className={`text-lg font-semibold ${
              isReady ? "text-primary-green" : "text-gray-500"
            }`}
          >
            {isReady ? "Ready for pickup" : "Picked up"}
          </span>
        </div>
        <div
          className={`text-xs px-2 py-1 rounded-full ${
            isReady ? "bg-primary-green text-white" : "bg-gray-500 text-white"
          }`}
        >
          {isReady ? "Active" : "Completed"}
        </div>
      </div>

      <div className="p-5 bg-white">
        <div className="flex flex-col space-y-3">
          <div className="flex items-center space-x-2">
            <Container size={16} className="text-gray-500" />
            <span className="text-sm text-gray-700">
              {LABELS.package.lockerNumberTitle}{" "}
              <span className="font-medium">{lockerNumber}</span>
            </span>
          </div>

          <div className="flex items-center space-x-2">
            {isReady ? (
              <>
                <Key size={16} className="text-gray-500" />

                <span className="text-sm text-gray-700">
                  {LABELS.package.accessCodeTitle}{" "}
                  <span className="font-medium">{accessCode}</span>
                </span>
              </>
            ) : (
              <>
                <PackageCheck size={16} className="text-gray-500" />
                <span className="text-sm text-gray-700">
                  {LABELS.package.pickupTitle}{" "}
                  <span className="font-medium">{formatDate(lastAcessed)}</span>
                </span>
              </>
            )}
          </div>
        </div>

        <div className="mt-6">
          <button
            className={`flex items-center justify-center w-full py-2 rounded-md transition-colors duration-300 ${
              isReady
                ? "bg-primary-green hover:bg-green-600"
                : "bg-gray-500 hover:bg-gray-600"
            } text-white font-medium`}
          >
            <span>{LABELS.packageList.actionBtn}</span>
            <ArrowRight size={16} className="ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
}
