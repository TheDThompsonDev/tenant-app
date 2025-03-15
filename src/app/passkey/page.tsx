"use client";
import { useRouter } from "next/navigation";
import Lock from "../components/Lock";
import { v4 as uuidv4 } from "uuid";

export default function Home() {
  const router = useRouter();
  const generatePasscode = (): string => {
    const min = 1000;
    const max = 9999;
    return Math.floor(Math.random() * (max - min + 1) + min).toString();
  };

  const handleGenerateKey = () => {
    const keyData = {
      id: uuidv4(),
      code: generatePasscode(),
      userName: "Tenant 01",
      date: new Date().toLocaleDateString(),
      status: "Active",
    };

    router.push(
        `/passkey/${keyData.id}?code=${keyData.code}&userName=${keyData.userName}&date=${keyData.date}&status=${keyData.status}`
      );
    };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-white">
      <div className="flex flex-col items-center text-center py-8">
        <h1 className="text-2xl font-bold pb-1">Door Lock</h1>
        <h2 className="text-xl">Unit #2</h2>
      </div>
      <Lock initialLockedState={false} />

      <button
        onClick={handleGenerateKey}
        className="px-10 py-3 bg-button text-white text-2xl font-bold rounded-lg mt-10 bg-secondary-blue hover:translate-y-0.5 hover:cursor-pointer"
      >
        Generate Key
      </button>
    </div>
  );
}
