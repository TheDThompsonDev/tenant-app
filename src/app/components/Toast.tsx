import { useEffect, useState } from "react";
import { CircleCheckBig } from "lucide-react";

type ToastProps = {
  message: string;
  type: "success" | "error";
  onDismiss: () => void;
};

export const Toast = ({ message, type, onDismiss }: ToastProps) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const fadeOutTimer = setTimeout(() => setVisible(false), 2500); // Start fading out after 3.5s
    const removeTimer = setTimeout(() => onDismiss(), 4000); // Fully dismiss after 4s

    return () => {
      clearTimeout(fadeOutTimer);
      clearTimeout(removeTimer);
    };
  }, [onDismiss]);

  const toastColors =
    type === "success"
      ? "bg-alternate-green text-primary-green border-primary-green"
      : "bg-white text-red-500 border-red-500";

  return (
    <div className="flex flex-col items-center text-center justify-center w-full">
      <div
        className={`fixed bottom-8 ${toastColors} px-4 py-2 rounded-lg shadow-lg text-2xl border-4 flex flex-col items-center
          transition-opacity duration-500 ${visible ? "opacity-100" : "opacity-0"}`}
      >
        {message}
        <CircleCheckBig className="text-primary-green" />
      </div>
    </div>
  );
};
