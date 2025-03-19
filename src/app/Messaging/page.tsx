"use client";
import React, { useState, useEffect } from "react";
import MessageList from "../components/messaging/MessageList";
import ComposeMessage from "../components/messaging/ComposeMessage";
import Header from "../components/Header";
import LABELS from "../constants/labels";
import { Pencil, ArrowLeft } from "lucide-react";
import Footer from "../components/Footer";

type Message = {
  id: string;
  subject: string;
  body: string;
  createdAt: string;
  from: "tenant" | "admin";
  type?: "package" | "management" | "lease" | "general";
};

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [showCompose, setShowCompose] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMessages() {
      try {
        setIsLoading(true);
        const res = await fetch("/api/notifications");

        if (!res.ok) {
          throw new Error("Failed to fetch messages");
        }

        const data = await res.json();
        setMessages(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching messages:", err);
        setError(LABELS.messaging.errorLoading);
      } finally {
        setIsLoading(false);
      }
    }

    fetchMessages();
  }, []);

  const handleComposeClick = () => {
    setShowCompose(true);
  };

  const handleBackClick = () => {
    setShowCompose(false);
  };

  const handleMessageSent = (newMessage: Message) => {
    setMessages((prev) => [newMessage, ...prev]);
    setShowCompose(false);
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white pt-6 flex flex-col items-center">
        <div className="w-full max-w-2xl px-4 mt-48 my-12">
          <header className="relative flex justify-center items-center mb-6 w-full">
            {showCompose ? (
              <>
                <button
                  className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                  onClick={handleBackClick}
                  aria-label="Back to messages"
                >
                  <ArrowLeft size={32} />
                </button>
                <h1 className="text-xl font-medium text-black text-center">
                  {LABELS.messaging.compose || LABELS.messaging.NewMessage}
                </h1>
              </>
            ) : (
              <>
                <h1 className="text-xl font-medium text-black text-center">
                  {LABELS.messaging.title}
                </h1>
                <button
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-green-400 hover:text-green-500 transition-colors"
                  onClick={handleComposeClick}
                  aria-label={LABELS.messaging.ariaLabel}
                >
                  <Pencil size={48} />
                </button>
              </>
            )}
          </header>

          {showCompose ? (
            <ComposeMessage onMessageSent={handleMessageSent} />
          ) : isLoading ? (
            <p className="text-center text-gray-500 my-8">
              {LABELS.messaging.loading}
            </p>
          ) : error ? (
            <p className="text-center text-red-500 my-8">{error}</p>
          ) : (
            <MessageList messages={messages} />
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
