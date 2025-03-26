import { useEffect } from "react";
import { CircleCheckBig } from "lucide-react";

type ToastProps = {
  message: string;
  type: "success" | "error";
  onDismiss: () => void;
};

export const Toast = ({ message, type, onDismiss }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss();
    }, 4000);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  const toastColors = type === "success" ? "bg-alternate-green text-primary-green" : "bg-white text-red-500";

  return (
    <div className="flex flex-col items-center text-center justify-center w-full">
      <div
        className={`fixed bottom-8 ${toastColors} px-4 py-2 rounded-lg shadow-lg text-2xl border-4 border-primary-green flex flex-col items-center`}
      >
        {message}
        <CircleCheckBig className="text-primary-green" />
      </div>
    </div>
  );
};
