"use client"
import { Mic } from "lucide-react"

export function VoiceChatButton({ onClick }: { onClick: () => void }) {
  console.log("VoiceChatButton rendered")

  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-50 bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-lg transition-all"
    >
      <Mic className="h-6 w-6" />
    </button>
  )
}