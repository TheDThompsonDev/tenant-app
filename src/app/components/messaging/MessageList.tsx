import React, { useState, useCallback, useMemo, Dispatch, SetStateAction } from "react";
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

type NotificationData = {
  id: string;
  subject: string | null;
  message: string | null;
  createdAt: string;
  notificationType?: string;
  senderId?: string;
  receiverId?: string;
  status?: string;
  priority?: string;
  apartmentNumber?: string;
  sender?: {
    apartmentNumber?: string;
  };
  receiver?: {
    apartmentNumber?: string;
  };
};

type MessageListProps = {
  messages: Message[];
  setMessages: Dispatch<SetStateAction<Message[]>>;
  isAdmin?: boolean;
  data?: NotificationData[];
};

function MessageIcon({ type }: { type: string }) {
  const iconMap: Record<string, JSX.Element> = {
    package: <Package size={18} className="text-white" />,
    management: <Home size={18} className="text-white" />,
    lease: <FileText size={18} className="text-white" />,
    general: <MessageSquare size={18} className="text-white" />,
    noise_complaint: <VolumeX size={18} className="text-white" />,
  };

  const bgColorMap: Record<string, string> = {
    package: "bg-blue-500",
    management: "bg-green-500",
    lease: "bg-purple-500",
    general: "bg-gray-500",
    noise_complaint: "bg-red-500",
  };

  return (
    <div
      className={`w-10 h-10 rounded-full flex items-center justify-center ${
        bgColorMap[type] || "bg-gray-500"
      }`}
    >
      {iconMap[type] || iconMap.general}
    </div>
  );
}

function formatTime(dateString: string): string {
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffInDays === 0) {
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else if (diffInDays === 1) {
      return "Yesterday";
    } else if (diffInDays < 7) {
      return date.toLocaleDateString([], { weekday: "short" });
    } else {
      return date.toLocaleDateString([], { month: "short", day: "numeric" });
    }
  } catch {
    return "Invalid date";
  }
}

const transformToMessage = (notification: NotificationData) => {
  const subject = notification.subject || LABELS.messaging.noSubject;
  const body = notification.message || "";
  const combinedText = (subject + " " + body).toLowerCase();
  const apartmentNumber = notification.sender?.apartmentNumber || notification.receiver?.apartmentNumber || notification.apartmentNumber || undefined;
  
  let type = notification.notificationType?.toLowerCase() || "general";
  
  if (combinedText.includes("noise") || combinedText.includes("complaint") || combinedText.includes("loud")) {
    type = "noise_complaint";
  } else if (combinedText.includes("package") || combinedText.includes("delivery") || combinedText.includes("mail")) {
    type = "package";
  } else if (combinedText.includes("lease") || combinedText.includes("contract") || combinedText.includes("agreement")) {
    type = "lease";
  } else if (combinedText.includes("management") || combinedText.includes("admin") || combinedText.includes("office")) {
    type = "management";
  }
  
  return {
    id: notification.id,
    subject: subject,
    body: body,
    createdAt: notification.createdAt,
    type: type as "package" | "management" | "lease" | "general" | "noise_complaint",
    apartmentNumber: apartmentNumber,
    status: notification.status,
    priority: notification.priority
  };
}


function MessageList({ messages, setMessages, isAdmin, data }: MessageListProps) {
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  
  const markAsRead = async (msgId: string) => {
    try {
      const url = isAdmin ?
      `/api/admin/notifications?id=${msgId}` :
      ` /api/notifications?id=${msgId}`;
      
      const res = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error(
          `Failed to update message: ${res.status} ${res.statusText}`
        );
      }

      const updatedMessage = await res.json();
      const updatedId = updatedMessage.id;
      const withoutUpdated = messages.filter((msg) => msg.id !== updatedId);
      const withUpdated = [...withoutUpdated, transformToMessage(updatedMessage)];
      const orderedMessages: Message[] = withUpdated.sort((a: Message, b: Message) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      setMessages(orderedMessages);
    } catch (error) {
      console.error(error);
    }
  }

  const filteredMessages = useMemo(() => {
    return messages.filter(
      (msg) =>
        msg.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.body.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [messages, searchTerm]);

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
                    {selectedMessage.apartmentNumber
                      ? `Apt #${selectedMessage.apartmentNumber}`
                      : "Admin"}
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
                onClick={async () => {
                  setSelectedMessage(msg);
                  await markAsRead(msg.id);
                }}
                className={`flex items-center p-4 ${msg.status === 'UNREAD' ? 'bg-primary-green/10' : ''} hover:bg-gray-50 transition-colors cursor-pointer group relative overflow-hidden`}
              >
                <div className={`absolute left-0 top-0 bottom-0 w-1 bg-primary-green ${msg.status === 'UNREAD' ? 'opacity-30' : 'opacity-0'}  group-hover:opacity-100 transition-opacity duration-200`}></div>
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
                    {isAdmin
                      ? msg.apartmentNumber === "0"
                        ? "From Admin"
                        : `From: Apt #${msg.apartmentNumber || "Unknown"}`
                      : msg.apartmentNumber === "0"
                      ? "From Admin"
                      : `From: Apt #${msg.apartmentNumber || "Unknown"}`}
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

export default React.memo(MessageList);
