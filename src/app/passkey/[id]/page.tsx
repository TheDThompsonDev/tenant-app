"use client"
import { useSearchParams } from "next/navigation";
import { Send } from "lucide-react";



interface Params {
    id: string;
}

interface KeyPageProps{
    params: Promise<Params>
}

export default function KeyPage({ params }: KeyPageProps) {
  const searchParams = useSearchParams();
  
  if(!searchParams){
    return <div>Loading...</div>
  }

  const userName = searchParams.get("userName")
  const date = searchParams.get("date")
  const status = searchParams.get("status")
  const code = searchParams.get("code")
  const splitCode = code ? code.split("") : []

  const emailBody = `Hello, here is your guest key code: ${code}`;
  const mailtoLink = `mailto:?subject=Guest Key Code&body=${encodeURIComponent(emailBody)}`;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-white">
      <h1 className="text-2xl font-bold mb-4">New Key Details</h1>
      <div className="bg-alternate-green rounded-lg shadow-md text-black p-4">
        <span className="flex">
        {userName}
<p className="pl-1">created a new guest key code!
</p>
        </span>
        {/*strong>Key ID: {params.id}</p> */}
        <p>Date: {date}</p>
        <p>Status: {status}</p>


    <div className="flex justify-center items-center">

        <div className="flex my-4 gap-2 ">
            {splitCode.map((digit, index) =>(
                <div key={index}
                className="flex border-1 border-black p-4 rounded-md bg-alternate-light-gray shadow-lg">
                    <p className="text-2xl font-bold">{digit}</p>
                    </div>
            ))}
        </div>
            <a href={mailtoLink}>
                <Send className="text-black w-8 h-8 ml-4"/>
            </a>
                
            </div>
      </div>
      <a
        href="/passkey"
        className="mt-4 px-6 py-2 bg-secondary-blue text-white rounded-lg font-bold"
      >
       Make another key
      </a>
    </div>
  );
}