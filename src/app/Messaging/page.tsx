"use client";

import React, { useState, useEffect, useCallback } from "react";
import MessageList from "../components/messaging/MessageList";
import ComposeMessage from "../components/messaging/ComposeMessage";
import Header from "../components/Header";
import LABELS from "../constants/labels";
import { MessageSquare, PenSquare, X, AlertCircle } from "lucide-react";
import Footer from "../components/Footer";
import { useNotifications } from '@/context/NotificationsContext';
import { useAuth } from "../hooks/useAuth";

type Message = {
  id: string;
  subject: string;
  body: string;
  createdAt: string;
  type?: "package" | "management" | "lease" | "general" | "noise_complaint";
  user?: string;
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
  userId: string;
  status: string;
  priority: string;
  updatedAt: string;
  apartmentNumber?: string;
  sender?: {
    apartmentNumber?: string;
  };
  receiver?: {
    apartmentNumber?: string;
  };
};

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const {
    notifications: rawNotificationData,
    getNotifications
  } = useNotifications();
  const [showCompose, setShowCompose] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);

  const transformNotificationsToMessages = useCallback((notifications: NotificationData[]): Message[] => {
    return notifications.map((notification) => {
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
    });
  }, []);

  useEffect(() => {
    if (user) {
      if (user.email.includes("admin") || user.prefs && user.prefs.role === 'admin') {
        setIsAdmin(true);
      }
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      getNotifications(user);
    }
  }, [user, getNotifications]);

  useEffect(() => {
    async function fetchMessages() {
      try {
        setIsLoading(true);

        if (!user || !user.$id) {
          console.error("No user ID available");
          setError(LABELS.messaging.errorUserInformation);
          setIsLoading(false);
          return;
        }

        // Transform notifications to messages format
        const transformedMessages = transformNotificationsToMessages(rawNotificationData || []);
        setMessages(transformedMessages);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching messages:", err);
        setError(LABELS.messaging.errorLoading);
        setIsLoading(false);
      }
    }

    if (user) {
      fetchMessages();
    }
  }, [user, rawNotificationData, transformNotificationsToMessages]);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-6 flex flex-col items-center">
        <div className="w-full max-w-5xl px-4 mt-24 mb-12">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-primary-green/10">
              <h1 className="text-2xl font-bold text-primary-black flex items-center">
                <MessageSquare className="mr-3 text-primary-green" size={24} />
                {LABELS.messaging.title}
              </h1>
              <button
                onClick={() => setShowCompose(!showCompose)}
                className={`flex items-center px-5 py-3 rounded-lg font-medium transition-all duration-300 ${
                  showCompose
                    ? "bg-gray-200 text-gray-800 hover:bg-gray-300"
                    : "bg-primary-green text-white hover:shadow-md"
                }`}
              >
                {showCompose ? (
                  <>
                    <X size={18} className="mr-2" />
                    {LABELS.messaging.cancel}
                  </>
                ) : (
                  <>
                    <PenSquare size={18} className="mr-2" />
                    {LABELS.messaging.compose}
                  </>
                )}
              </button>
            </div>

            <div className="p-6">
              {error && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-md">
                  <div className="flex items-center">
                    <AlertCircle className="text-red-500 mr-3" size={20} />
                    <p className="text-red-700">{error}</p>
                  </div>
                </div>
              )}

              {isLoading ? (
                <div className="flex flex-col justify-center items-center py-20">
                  <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-secondary-blue"></div>
                  <p className="mt-4 text-gray-500">
                    {LABELS.messaging.loading}
                  </p>
                </div>
              ) : (
                <div className="space-y-8">
                  {showCompose && (
                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-sm mb-8 transition-all duration-300 ease-in-out">
                      <h2 className="text-xl font-semibold mb-4 text-primary-black flex items-center">
                        <PenSquare
                          size={20}
                          className="mr-2 text-primary-green"
                        />
                        {LABELS.messaging.compose}
                      </h2>
                      <ComposeMessage
                        onMessageSent={(msg) => {
                          setMessages((prev) => [msg, ...prev]);
                          setShowCompose(false);
                        }}
                        isAdmin={isAdmin}
                      />
                    </div>
                  )}

                  <div className="transition-all duration-300 ease-in-out">
                    {messages.length === 0 && !showCompose ? (
                      <div className="flex flex-col items-center justify-center py-16 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                          <MessageSquare className="text-gray-400" size={28} />
                        </div>
                        <h3 className="text-lg font-medium text-gray-700 mb-2">
                          {LABELS.messaging.noMessages}
                        </h3>
                        <p className="text-gray-500 text-center max-w-md mb-6">
                          {LABELS.messaging.noMessagesDescription}
                        </p>
                        <button
                          onClick={() => setShowCompose(true)}
                          className="bg-primary-green text-white px-5 py-2 rounded-lg flex items-center hover:shadow-md transition-all duration-200"
                        >
                          <PenSquare size={16} className="mr-2" />
                          {LABELS.messaging.composeButton}
                        </button>
                      </div>
                    ) : (
                      <MessageList
                        messages={messages}
                        setMessages={setMessages}
                        isAdmin={isAdmin}
                        data={rawNotificationData || []}
                      />
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
