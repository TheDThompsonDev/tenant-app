"use client"
import { Mic } from "lucide-react"

export function VoiceChatButton({ onClick }: { onClick: () => void }) {

  return (
    <button
      onClick={onClick}
      className="border border-alternate-green fixed bottom-6 z-50 hover:bg-alternate-green bg-primary-green hover:text-primary-green text-alternate-green p-6 rounded-full shadow-lg transition-all"
    >
      <Mic className="h-6 w-6" />
    </button>
    
  )
}