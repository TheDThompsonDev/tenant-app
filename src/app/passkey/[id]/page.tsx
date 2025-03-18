"use client";
import { useSearchParams } from "next/navigation";
import { Send } from "lucide-react";
import Header from "@/app/components/Header";
import LABELS from "../../constants/labels";
import Footer from "@/app/components/Footer";

interface Params {
  id: string;
}

interface KeyPageProps {
  params: Promise<Params>;
}

export default function KeyPage({ params }: KeyPageProps) {
  const searchParams = useSearchParams();

  if (!searchParams) {
    return <div>{LABELS.passcode.searchParams}</div>;
  }

  const tenant = searchParams.get("tenant");
  const unit = searchParams.get("unit");
  const date = searchParams.get("date");
  const status = searchParams.get("status");
  const code = searchParams.get("code") || "N/A";
  const splitCode = code ? code.split("") : [];

  const emailBody = LABELS.passcode.emailBody.replace("{code}", code);
  const mailtoLink = `mailto:?subject=${encodeURIComponent("Guest Key Code")}&body=${encodeURIComponent(emailBody)}`;


  return (
    <>
      <Header />
      <div className="flex flex-col items-center pt-10 min-h-screen p-4 bg-white text-center">
        <h1 className="text-2xl font-bold mb-4 text-primary-black">
          {LABELS.passcode.title}
        </h1>
        <div className="bg-alternate-green rounded-lg shadow-md text-black p-4">
          <span className="flex pb-4 text-lg">
            {tenant}
            <p className="pl-1">{LABELS.passcode.message}</p>
          </span>

          <p>
            {LABELS.passcode.date} {date}
          </p>
          <p>
            {LABELS.passcode.status} {status}
          </p>

          <div className="flex flex-col justify-center items-center">
            <p className="text-xl font-bold pt-4">
              {LABELS.passcode.unit} {unit}
            </p>

            <div className="flex items-center mt-2">
              <div className="flex gap-2">
                {splitCode.map((digit, index) => (
                  <div
                    key={`${digit}-${index}`}
                    className="flex border-1 border-black p-4 rounded-md bg-alternate-light-gray shadow-lg"
                  >
                    <p className="text-2xl font-bold">{digit}</p>
                  </div>
                ))}
              </div>
              <a href={mailtoLink}>
                <Send className="text-black w-6 h-6 ml-4" />
              </a>
            </div>
          </div>
        </div>
        <a
          href="/passkey"
          className="mt-4 px-6 py-2 bg-secondary-blue text-white rounded-lg font-bold"
        >
          {LABELS.passcode.button}
        </a>
      </div>
      <Footer />
    </>
  );
}
