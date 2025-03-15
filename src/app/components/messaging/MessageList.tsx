import React from 'react';

type Message = {
  id: string;
  subject: string;
  body: string;
  createdAt: string;
  from: 'tenant' | 'admin';
  type?: 'package' | 'management' | 'lease' | 'general';
};

type MessageListProps = {
  messages: Message[];
};

export default function MessageList({ messages }: MessageListProps) {
  if (!messages.length) {
    return <p className="text-center text-gray-500 my-8">No messages found.</p>;
  }

  return (
    <div className="space-y-4 w-full">
      {messages.map((msg) => (
        <div key={msg.id} className="flex items-center bg-gray-100 rounded-md py-4 px-4 w-full max-w-2xl mx-auto">
          <div className="mr-4">
            <MessageIcon type={msg.type || 'general'} />
          </div>
          <div className="flex-grow overflow-hidden pr-2">
            <h3 className="font-medium text-gray-800">{msg.subject}</h3>
            <p className="text-sm text-gray-600 truncate">{msg.body}</p>
          </div>
          <div className="text-sm text-gray-500 ml-2 whitespace-nowrap">
            {formatTime(msg.createdAt)}
          </div>
        </div>
      ))}
    </div>
  );
}

function MessageIcon({ type }: { type: string }) {
  const colors = {
    package: 'bg-green-400',
    management: 'bg-gray-500',
    lease: 'bg-blue-800',
    general: 'bg-blue-500',
  };

  const bgColor = colors[type as keyof typeof colors] || colors.general;

  return (
    <div className={`w-10 h-10 rounded-full ${bgColor} flex items-center justify-center flex-shrink-0`}>
      <p className="text-white">{type.charAt(0).toUpperCase()}</p>
    </div>
  );
}

function formatTime(dateString: string) {
  return new Date(dateString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}
