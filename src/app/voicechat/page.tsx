'use client';

import { useState } from 'react';
import { VoiceChatButton } from '../components/voicechat/voiceChatButton';
import { VoiceChatModal } from '../components/voicechat/voiceChatModal';
import { useVoiceChat } from '@/app/hooks/useVoiceChat';

export default function VoiceChatDemoPage() {
  const [open, setOpen] = useState(false);
  const { status, isSpeaking, messages, startConversation, endConversation } =
    useVoiceChat({});

  const getAgentStatus = () => {
    if (status !== 'connected') return 'Inactive';
    if (isSpeaking) return 'Speaking';
    return 'Listening';
  };

  const handleStartConversation = async () => {
    setOpen(true);
    await startConversation({
      agentId: 'w9HcNnfGpTdqixgjY6vo',
    });
  };

  return (
    <div className='min-h-screen bg-white p-10 relative'>
      <h1 className='text-2xl font-bold text-center text-gray-800 mb-4'>
        Voice Chat UI
      </h1>

      <VoiceChatButton onClick={handleStartConversation} />
      <VoiceChatModal
        open={open}
        onClose={() => {
          setOpen(false);
          endConversation();
        }}
        status={getAgentStatus()}
        messages={messages}
      />
    </div>
  );
}
