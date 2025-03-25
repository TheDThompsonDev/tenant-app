'use client';
import { useEffect, useRef } from 'react';
import { X, Mic } from 'lucide-react';
import type { Message as MessageType } from '@/app/hooks/useVoiceChat';
import Message from '@/app/components/voicechat/Message';

export function VoiceChatModal({
  open,
  onClose,
  messages,
  startConversation,
  endConversation,
  conversationStarted,
}: {
  open: boolean;
  onClose: () => void;
  messages: MessageType[];
  startConversation: (args: { agentId: string }) => Promise<void>;
  endConversation: () => Promise<void>
  conversationStarted: boolean
}) {
  const transcriptRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (transcriptRef.current) {
      transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight;
    }
  }, [messages]);

  if (!open) return null;

  return (
    <div className='fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center'>
      <div className='bg-white w-full max-w-md p-6 rounded-xl shadow-xl relative'>
        <button
          onClick={onClose}
          className='absolute top-4 right-4 text-secondary-blue'
        >
          <X className='w-5 h-5' />
        </button>

        <h2 className='text-xl text-secondary-blue font-semibold mb-4'>
          Chat with Assistant
        </h2>

        <div
          className='mb-4 space-y-3 flex flex-col max-h-[300px] overflow-y-auto'
          ref={transcriptRef}
        >
          {messages.length === 0 ? (
            <div className='text-secondary-blue'>
              <p>No conversation history yet.</p>
              <p>Start a conversation to see the transcript here.</p>
            </div>
          ) : (
            messages.map((message, index) => (
              <Message key={index} message={message} />
            ))
          )}
        </div>

        {!conversationStarted ? (
          <button
            onClick={() =>
              startConversation({
                agentId: "w9HcNnfGpTdqixgjY6vo",
              })
            }
            className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 flex items-center justify-center gap-2"
          >
            <Mic className="w-4 h-4" />
            Start Talking
          </button>
        ) : (
          <button
            onClick={endConversation}
            className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 flex items-center justify-center gap-2"
          >
            <Mic className="w-4 h-4" />
            Stop Talking
          </button>
        )}
      </div>
    </div>
  );
}
