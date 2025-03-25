import React from "react";
import { useState } from "react";
import {
  ArrowLeft,
  Clock,
  User,
  Package,
  Home,
  FileText,
  MessageSquare,
  Search,
  VolumeX,
} from "lucide-react";
import LABELS from "@/app/constants/labels";

type Message = {
  id: string;
  subject: string;
  body: string;
  createdAt: string;
  type?: "package" | "management" | "lease" | "general" | "noise_complaint";
  apartmentNumber?: string;
  status?: string;
  priority?: string;
};

type MessageListProps = {
  messages: Message[];
  isAdmin?: boolean;
};

export default function MessageList({ messages, isAdmin }: MessageListProps) {
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredMessages = messages.filter(
    (msg) =>
      msg.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.body.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!messages.length) {
    return (
      <div className="text-center py-16 bg-gray-50 rounded-lg border border-gray-200 flex flex-col items-center justify-center">
        <MessageSquare className="text-gray-400 mb-4" size={48} />
        <p className="text-gray-600 font-medium text-lg mb-2">
          {LABELS.messaging.noMessagesFound}
        </p>
        <p className="text-gray-500 text-sm">
          {LABELS.messaging.noMessagesDescription}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4 w-full">
      {!selectedMessage && (
        <div className="mb-4 relative">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder={LABELS.messaging.searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-blue focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>
      )}

      {selectedMessage ? (
        <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden transition-all duration-300 ease-in-out">
          <div className="border-b border-gray-200 p-4 flex items-center bg-gray-50">
            <button
              onClick={() => setSelectedMessage(null)}
              className="text-secondary-blue hover:text-primary-green transition-colors flex items-center font-medium"
            >
              <ArrowLeft size={18} className="mr-2" />
              <span>{LABELS.messaging.backToMessages}</span>
            </button>
          </div>

          <div className="p-6">
            <div className="flex items-center mb-6">
              <MessageIcon type={selectedMessage.type || "general"} />
              <div className="ml-4">
                <h3 className="text-xl font-bold text-primary-black">
                  {selectedMessage.subject}
                </h3>
                <div className="flex items-center text-sm text-gray-500 mt-2">
                  <User size={14} className="mr-1" />
                  <span className="capitalize mr-3">
                    {selectedMessage.apartmentNumber ? `Apt #${selectedMessage.apartmentNumber}` : "Admin"}
                  </span>
                  <Clock size={14} className="mr-1" />
                  <span>{formatTime(selectedMessage.createdAt)}</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-5 rounded-lg my-4 shadow-inner">
              <p className="text-gray-800 whitespace-pre-line leading-relaxed">
                {selectedMessage.body}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="divide-y divide-gray-200 bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
          {filteredMessages.length === 0 ? (
            <div className="p-8 text-center">
              <Search size={24} className="mx-auto text-gray-400 mb-3" />
              <p className="text-gray-600">
                {LABELS.messaging.noSearchResults}
              </p>
            </div>
          ) : (
            filteredMessages.map((msg) => (
              <div
                key={msg.id}
                onClick={() => setSelectedMessage(msg)}
                className="flex items-center p-4 hover:bg-gray-50 transition-colors cursor-pointer group relative overflow-hidden"
              >
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary-green opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                <div className="mr-4">
                  <MessageIcon type={msg.type || "general"} />
                </div>
                <div className="flex-grow overflow-hidden pr-2">
                  <h3 className="font-medium text-gray-800 mb-1 group-hover:text-primary-green transition-colors">
                    {msg.subject}
                  </h3>
                  <p className="text-sm text-gray-600 truncate">{msg.body}</p>
                </div>
                <div className="text-xs text-gray-500 ml-2 whitespace-nowrap flex flex-col items-end">
                  <span className="bg-gray-100 px-2 py-1 rounded-full mb-1 group-hover:bg-primary-green/10 transition-colors">
                    {formatTime(msg.createdAt)}
                  </span>
                  <span className="capitalize text-xs text-primary-green">
                    {isAdmin ? LABELS.messaging.fromLabel : "to: "}
                    {msg.apartmentNumber ? `Apt #${msg.apartmentNumber}` : "Admin"}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

function MessageIcon({ type }: { type: string }) {
  const iconMap = {
    package: <Package size={18} className="text-white" />,
    management: <Home size={18} className="text-white" />,
    lease: <FileText size={18} className="text-white" />,
    general: <MessageSquare size={18} className="text-white" />,
    noise_complaint: <VolumeX size={18} className="text-white" />,
  };

  const colors = {
    package: "bg-primary-green",
    management: "bg-secondary-blue",
    lease: "bg-blue-800",
    general: "bg-primary",
    noise_complaint: "bg-red-500",
  };

  const bgColor = colors[type as keyof typeof colors] || colors.general;
  const icon = iconMap[type as keyof typeof iconMap] || iconMap.general;

  return (
    <div
      className={`w-10 h-10 rounded-full ${bgColor} flex items-center justify-center flex-shrink-0 shadow-sm transition-transform duration-200 hover:scale-110`}
    >
      {icon}
    </div>
  );
}

function formatTime(dateString: string) {
  const date = new Date(dateString);
  return (
    date.toLocaleDateString([], {
      month: "short",
      day: "numeric",
    }) +
    " at " +
    date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })
  );
}
