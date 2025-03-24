"use client"

import { useState, useEffect } from "react"
import { VoiceChatButton } from "../components/voicechat/voiceChatButton"
import { VoiceChatModal } from "../components/voicechat/voiceChatModal" 

export default function VoiceChatDemoPage() {
  const [open, setOpen] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [response, setResponse] = useState("")

  const handleStartTalking = () => {
    setIsListening(true)
    setTranscript("Hi, I have a question about my lease.")
    setTimeout(() => {
      setResponse("Sure! I'd be happy to help you with that.")
      setIsListening(false)
    }, 1500)
  }

  // Fix: Run conversationalAI on open
  useEffect(() => {
    if (open && !isListening && transcript === "") {
      handleStartTalking()
    }
  }, [open, isListening, transcript])

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-10 relative">
      <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-4">
        Voice Chat UI
      </h1>
    
      <VoiceChatButton onClick={() => setOpen(true)} />
      <VoiceChatModal
        open={open}
        onClose={() => {
          setOpen(false)
          setTranscript("")
          setResponse("")
        }}
        isListening={isListening}
        transcript={transcript}
        response={response}
      />
    </div>
  )
}
