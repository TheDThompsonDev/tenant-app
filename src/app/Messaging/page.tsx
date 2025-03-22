"use client";
import React, { useState, useEffect } from "react";
import MessageList from "../components/messaging/MessageList";
import ComposeMessage from "../components/messaging/ComposeMessage";
import Header from "../components/Header";
import LABELS from "../constants/labels";
import { MessageSquare, PenSquare, X, AlertCircle } from "lucide-react";
import Footer from "../components/Footer";
import { getCurrentUser } from "@/lib/appwrite";
import { Models } from "appwrite";

type Message = {
  id: string;
  subject: string;
  body: string;
  createdAt: string;
  from: "tenant" | "admin";
  type?: "package" | "management" | "lease" | "general";
  user?: string;
};

type UserType = Models.User<Models.Preferences>;

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
};

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [showCompose, setShowCompose] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getCurrentUser();
        if (response.success && response.data) {
          setUser(response.data as UserType);
        } else {
          console.error("Failed to get user:", response.error);
        }
      } catch (err) {
        console.error("Error fetching user:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

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

        const res = await fetch(`/api/notifications?userId=${user.$id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error(`Failed to fetch messages: ${res.status} ${res.statusText}`);
        }

        const data = await res.json();
        console.log("Fetched notifications:", data);

        const transformedMessages = data.map((notification: NotificationData) => ({
          id: notification.id,
          subject: notification.subject || LABELS.messaging.noSubject,
          body: notification.message || "",
          createdAt: notification.createdAt,
          from: "admin",
          type: notification.notificationType?.toLowerCase() || "general",
        }));

        setMessages(transformedMessages);
        setError(null);
      } catch (err) {
        console.error("Error fetching messages:", err);
        setError(LABELS.messaging.errorLoading);
      } finally {
        setIsLoading(false);
      }
    }

    if (user) {
      fetchMessages();
    }
  }, [user]);

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
                className={`flex items-center px-5 py-3 rounded-lg font-medium transition-all duration-300 ${showCompose 
                  ? 'bg-gray-200 text-gray-800 hover:bg-gray-300' 
                  : 'bg-primary-green text-white hover:shadow-md'}`}
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
                  <p className="mt-4 text-gray-500">{LABELS.messaging.loading}</p>
                </div>
              ) : (
                <div className="space-y-8">
                  {showCompose && (
                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-sm mb-8 transition-all duration-300 ease-in-out">
                      <h2 className="text-xl font-semibold mb-4 text-primary-black flex items-center">
                        <PenSquare size={20} className="mr-2 text-primary-green" />
                        {LABELS.messaging.compose}
                      </h2>
                      <ComposeMessage
                        onMessageSent={(msg) => {
                          setMessages((prev) => [msg, ...prev]);
                          setShowCompose(false);
                        }}
                      />
                    </div>
                  )}

                  <div className="transition-all duration-300 ease-in-out">
                    {messages.length === 0 && !showCompose ? (
                      <div className="flex flex-col items-center justify-center py-16 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                          <MessageSquare className="text-gray-400" size={28} />
                        </div>
                        <h3 className="text-lg font-medium text-gray-700 mb-2">{LABELS.messaging.noMessages}</h3>
                        <p className="text-gray-500 text-center max-w-md mb-6">{LABELS.messaging.noMessagesDescription}</p>
                        <button 
                          onClick={() => setShowCompose(true)}
                          className="bg-primary-green text-white px-5 py-2 rounded-lg flex items-center hover:shadow-md transition-all duration-200"
                        >
                          <PenSquare size={16} className="mr-2" />
                          {LABELS.messaging.composeButton}
                        </button>
                      </div>
                    ) : (
                      <MessageList messages={messages} />
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
