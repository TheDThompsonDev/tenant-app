import { FC } from 'react';
import type { Message as MessageType } from '@/app/hooks/useVoiceChat';

const formatTimestamp = (timestamp: number) => {
  const date = new Date(timestamp);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

interface MessageProps {
  message: MessageType;
}

const Message: FC<MessageProps> = ({ message }) => (
  <div
    className={`text-md text-white border p-3 rounded-lg ${
      message.role === 'user' ? 'bg-primary-green' : 'bg-secondary-blue'
    }`}
  >
    <div className='text-xs font-thin'>
      <span>{message.role === 'user' ? 'You' : 'AI'}</span>
      <span>{formatTimestamp(message.timestamp)}</span>
    </div>
    <div>{message.content}</div>
  </div>
);

export default Message;
