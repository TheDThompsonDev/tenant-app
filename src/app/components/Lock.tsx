import { useState } from "react";
import { LockKeyhole, LockKeyholeOpen } from "lucide-react";


interface LockProps {
    initialLockedState: boolean;
}
const Lock = ({initialLockedState}: LockProps) => {
  const [isLocked, setIsLocked] = useState(initialLockedState);

  return (
    <button
      className={`w-80 h-20 flex items-center rounded-2xl p-10 transition duration-300   ${
        isLocked ? "bg-alternate-grey" : "bg-primary-green"
      }`}
      onClick={() => setIsLocked(!isLocked)}
    >
      <div
        className={`w-80 h-20 flex items-center justify-center bg-alternate-light-gray rounded-2xl shadow-md transform transition duration-300 ${
          isLocked ? "-translate-x-10" : "translate-x-10"
        }`}
      >
        {isLocked ? (
          <LockKeyholeOpen className="text-alternate-gray" />
        ) : (
          <LockKeyhole className="text-green-600" />
        )}
      </div>

    </button>
  );
};

export default Lock;
