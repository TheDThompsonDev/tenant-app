"use client"
import { X, Mic } from "lucide-react"
console.log("VoiceChatModal rendered")

export function VoiceChatModal({
  open,
  onClose,
  isListening,
  transcript,
  response,
}: {
  open: boolean
  onClose: () => void
  isListening: boolean
  transcript: string
  response: string
}) {
  if (!open) return null
  

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-900 w-full max-w-md p-6 rounded-xl shadow-xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-lg font-semibold mb-4">Chat with Assistant</h2>

        <div className="mb-4 space-y-3">
          <div className="text-sm text-gray-700 dark:text-gray-300 border p-3 rounded">
            <strong>You:</strong> {transcript || <em>Say something...</em>}
          </div>
          {response && (
            <div className="text-sm text-gray-700 dark:text-gray-300 border p-3 rounded">
              <strong>Assistant:</strong> {response}
            </div>
          )}
        </div>

        <button
          className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 flex items-center justify-center gap-2"
        >
          <Mic className="w-4 h-4" />
          {isListening ? "Listening..." : "Start Talking"}
        </button>
      </div>
    </div>
  )
}
