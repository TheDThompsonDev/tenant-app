import LABELS from "../constants/labels";

interface PackageDetailsProps {
  id: string;
  lockerNumber: string;
  lockerCode: string;
}

export default function PackageDetails({
  id,
  lockerNumber,
  lockerCode,
}: PackageDetailsProps) {
  const splitCode = typeof lockerCode === "string" ? lockerCode.split("-") : [];

  return (
    <div className="flex items-center justify-center flex-col rounded-md p-6 text-center text-white m-auto bg-white">
      <span className="text-xl font-bold text-black bg-secondary-green">
        {LABELS.PackageLocker.numberTitle} {lockerNumber}
      </span>
      <span className="text-xl font-bold text-black">
        {LABELS.PackageLocker.accessCodeTitle}
      </span>
      <div className="flex my-4">
        {splitCode.map((digit, index) => (
          <div key={`${digit}-${index}`}>
            <p className="text-2xl font-bold border p-4 rounded-md mx-4 bg-primary-green">
              {digit}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
