import { useState } from 'react';
import { useConversation } from '@11labs/react';

interface ConversationHookProps {
  onConnect?: () => void;
  onDisconnect?: () => void;
  onMessage?: (message: any) => void;
  onError?: (error: any) => void;
}

interface ConversationSessionProps {
  agentId: string;
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (error: any) => void;
}

export interface VolumeProps {
  volume: number;
}

export interface Message {
  role: string;
  content: string;
  timestamp: number;
}

export const useVoiceChat = (props: ConversationHookProps = {}) => {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [micPermission, setMicPermission] = useState<boolean>(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [volume, setVolume] = useState<number>(7);
  const [messages, setMessages] = useState<Message[]>([]);

  const conversation = useConversation({
    onConnect: () => {
      setIsConnected(true);
      props.onConnect?.();
    },
    onDisconnect: () => {
      setIsConnected(false);
      setConversationId(null);
      props.onDisconnect?.();
    },
    onMessage: (message) => {
      if (message.source === 'user') {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            role: 'user',
            content: message.message,
            timestamp: Date.now(),
          },
        ]);
      } else if (message.source === 'ai') {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            role: 'assistant',
            content: message.message,
            timestamp: Date.now(),
          },
        ]);
      }

      props.onMessage?.(message);
    },
    onError: (error) => {
      console.error('Conversation error:', error);
      props.onError?.(error);
    },
  });

  const { status, isSpeaking } = conversation;

  const requestMicPermission = async (): Promise<boolean> => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      setMicPermission(true);
      return true;
    } catch (error) {
      console.error('Error getting microphone permission:', error);
      setMicPermission(false);
      return false;
    }
  };

  const startConversation = async (
    sessionProps: ConversationSessionProps
  ): Promise<void> => {
    try {
      const hasMicPermission = micPermission || (await requestMicPermission());
      if (!hasMicPermission) {
        alert('Microphone permission is required for the conversation.');
        return;
      }

      if (!sessionProps.agentId) {
        console.error('Agent ID is required to start a conversation');
        return;
      }

      setMessages([]);

      const id = await conversation.startSession({
        agentId: sessionProps.agentId,
      });

      setConversationId(id);

      sessionProps.onStart?.();
    } catch (error) {
      console.error('Failed to start conversation:', error);
      sessionProps.onError?.(error);
    }
  };

  const endConversation = async (): Promise<void> => {
    try {
      await conversation.endSession();
    } catch (error) {
      console.error('Failed to end conversation:', error);
    }
  };

  const adjustVolume = async (volumeProps: VolumeProps): Promise<void> => {
    try {
      const floatVolume = volumeProps.volume / 10;
      await conversation.setVolume({ volume: floatVolume });
      setVolume(volumeProps.volume);
    } catch (error) {
      console.error('Failed to set volume:', error);
    }
  };

  const handleVolumeChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const newVolume = parseInt(e.target.value, 10);
    setVolume(newVolume);
    await adjustVolume({ volume: newVolume });
  };

  return {
    isConnected,
    micPermission,
    conversationId,
    volume,
    status,
    isSpeaking,
    messages,

    startConversation,
    endConversation,
    handleVolumeChange,
    adjustVolume,
  };
};
