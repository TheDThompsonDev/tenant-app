"use client";
import { useSearchParams } from "next/navigation";
import { Send, Copy, Calendar, CheckCircle, Key, Clock, Shield } from "lucide-react";
import Header from "@/app/components/Header";
import LABELS from "../../constants/labels";
import Footer from "@/app/components/Footer";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function KeyPage() {
  const searchParams = useSearchParams();
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
  const mailtoLink = `mailto:?subject=${encodeURIComponent(LABELS.passcode.emailSubject)}&body=${encodeURIComponent(emailBody)}`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <Header />
      <div className="flex flex-col items-center pt-10 min-h-screen p-4 bg-gradient-to-b from-gray-50 to-white text-center">
        <div className={`w-full max-w-md transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <h1 className="text-2xl font-bold mb-6 text-primary-black flex items-center justify-center">
            <div className="bg-secondary-blue/10 p-2 rounded-full mr-3">
              <Key className="text-secondary-blue" size={24} />
            </div>
            {LABELS.passcode.title}
          </h1>
          
          <div className="bg-white rounded-xl shadow-xl text-black p-6 border border-gray-100 relative overflow-hidden transition-all duration-300 hover:shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-secondary-blue via-primary-green to-secondary-blue"></div>
            <div className="absolute -right-12 -top-12 w-24 h-24 bg-primary-green/5 rounded-full"></div>
            <div className="absolute -left-12 -bottom-12 w-24 h-24 bg-secondary-blue/5 rounded-full"></div>
            
            <div className="flex justify-center mb-6">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 text-green-800 shadow-sm">
                <CheckCircle size={16} className="mr-2" />
                <span className="text-sm font-medium">{status}</span>
              </div>
            </div>
            
            <div className="mb-8 pb-6 border-b border-gray-100">
              <h2 className="text-xl font-semibold mb-3 text-primary-black">{tenant}</h2>
              <p className="text-gray-600 mb-4">{LABELS.passcode.message}</p>
              <div className="flex justify-center space-x-6">
                <div className="flex items-center text-gray-500 text-sm">
                  <Calendar size={16} className="mr-2 text-primary-green" />
                  <span>{date}</span>
                </div>
                <div className="flex items-center text-gray-500 text-sm">
                  <Clock size={16} className="mr-2 text-secondary-blue" />
                  <span>{LABELS.passcode.hoursAccess}</span>
                </div>
              </div>
            </div>
            
            <div className="mb-8">
              <div className="flex items-center justify-center mb-4">
                <Shield size={18} className="mr-2 text-secondary-blue" />
                <h3 className="text-xl font-bold text-secondary-blue">{LABELS.passcode.unit} {unit}</h3>
              </div>
              
              <div className="flex justify-center mb-6">
                <div className="grid grid-cols-4 gap-3">
                  {splitCode.map((digit, index) => (
                    <div
                      key={`${digit}-${index}`}
                      className={`w-16 h-16 flex items-center justify-center border border-gray-200 rounded-lg bg-gray-50 shadow-sm transform transition-all duration-300 ${mounted ? `translate-y-0 opacity-100 delay-${index * 100}` : 'translate-y-4 opacity-0'} hover:scale-105 hover:shadow-md hover:border-primary-green/30`}
                    >
                      <p className="text-3xl font-bold text-primary-black">{digit}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleCopyCode}
                className="flex items-center px-5 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg transition-all duration-300 hover:shadow-md group"
              >
                {copied ? (
                  <>
                    <CheckCircle size={18} className="mr-2 text-green-600" />
                    <span>{LABELS.passcode.copiedMessage}</span>
                  </>
                ) : (
                  <>
                    <Copy size={18} className="mr-2 group-hover:text-primary-green transition-colors" />
                    <span>{LABELS.passcode.copyCodeButton}</span>
                  </>
                )}
              </button>
              
              <a
                href={mailtoLink}
                className="flex items-center px-5 py-3 bg-secondary-blue hover:bg-blue-700 text-white rounded-lg transition-all duration-300 hover:shadow-md hover:translate-y-[-2px]"
              >
                <Send size={18} className="mr-2" />
                <span>{LABELS.passcode.shareButton}</span>
              </a>
            </div>
          </div>
          
          <div className="mt-10 flex justify-center">
            <Link
              href="/passkey"
              className="px-6 py-3 bg-primary-green text-white rounded-lg font-medium hover:bg-green-600 transition-all duration-300 inline-flex items-center hover:shadow-lg hover:translate-y-[-2px] group"
            >
              <Key size={18} className="mr-2 group-hover:animate-pulse" />
              {LABELS.passcode.button}
            </Link>
          </div>

          <div className="mt-6 text-xs text-gray-400 flex items-center justify-center">
            <Shield size={12} className="mr-1" />
            <span>{LABELS.passcode.secureAccessMessage}</span>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
