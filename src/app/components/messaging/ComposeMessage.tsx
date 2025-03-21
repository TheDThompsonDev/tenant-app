"use client";

import React, { useState, useRef } from "react";
import { useTanstackForm } from "@/app/hooks/useTanstackForm";
import { useStore } from "@tanstack/react-form";
import { getCurrentUser } from "@/lib/appwrite";
import { Send, AlertCircle } from "lucide-react";
import LABELS from "@/app/constants/labels";

type Message = {
  id: string;
  subject: string;
  body: string;
  createdAt: string;
  from: "tenant" | "admin";
  type?: "package" | "management" | "lease" | "general";
  user?: string;
};

type ComposeMessageFormValues = {
  subject: string;
  body: string;
};

type ComposeMessageProps = {
  onMessageSent: (msg: Message) => void;
  userId?: string;
};

export default function ComposeMessage({
  onMessageSent,
  userId,
}: ComposeMessageProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const formRef = useRef(
    useTanstackForm<ComposeMessageFormValues>({
      defaultValues: {
        subject: "",
        body: "",
      },
      onSubmit: async (values) => {
        setIsSubmitting(true);
        setError(null);

        try {
          const userResponse = await getCurrentUser();
          if (!userResponse.success || !userResponse.data) {
            throw new Error(LABELS.messaging.errorUserInfo);
          }

          const newMsg = {
            subject: values.subject,
            message: values.body,
            notificationType: "GENERAL",
            user: userResponse.data.$id,
            from: "tenant" as const,
            type: "general" as const,
            user: userId,
          };

          const res = await fetch("/api/notifications", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newMsg),
          });

          if (!res.ok) {
            throw new Error("Failed to send message");
          }

          const savedMsg = await res.json();
          onMessageSent(savedMsg);
          return { status: "success" as const };
        } catch (error) {
          console.error("Error sending message:", error);
          setError(LABELS.messaging.errorSending);
          return { status: "error" as const };
        } finally {
          setIsSubmitting(false);
        }
      },
    })
  );

  const form = formRef.current;
  const subject = useStore(form.store, (state) => state.values.subject);
  const body = useStore(form.store, (state) => state.values.body);

  return (
    <div className="w-full">
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center text-red-600 shadow-sm">
          <AlertCircle size={18} className="mr-3 flex-shrink-0" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          void form.handleSubmit();
        }}
        className="space-y-6"
      >
        <div className="space-y-4">
          <div className="relative">
            <label
              htmlFor="subject"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {LABELS.messaging.subjectLabel}
            </label>
            <input
              id="subject"
              type="text"
              value={subject}
              onChange={(e) => form.setFieldValue("subject", e.target.value)}
              placeholder={LABELS.messaging.subjectPlaceholder}
              className="w-full p-3 border border-gray-300 rounded-lg bg-white text-black 
                       focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-transparent
                       transition-all duration-200 ease-in-out shadow-sm"
              required
            />
          </div>

          <div className="relative">
            <label
              htmlFor="body"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {LABELS.messaging.messageLabel}
            </label>
            <textarea
              id="body"
              value={body}
              onChange={(e) => form.setFieldValue("body", e.target.value)}
              placeholder={LABELS.messaging.messagePlaceholder}
              rows={8}
              className="w-full p-4 border border-gray-300 rounded-lg bg-white text-black 
                       focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-transparent
                       transition-all duration-200 ease-in-out shadow-sm resize-none"
              required
            />
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="text-xs text-gray-500">
            {LABELS.messaging.allFieldsRequired}
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-primary-green text-white font-medium py-3 px-6 rounded-lg
                     hover:opacity-90 transition-all duration-200 ease-in-out flex items-center justify-center
                     shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                Sending...
              </>
            ) : (
              <>
                <Send size={18} className="mr-2" />
                {LABELS.messaging.sendButton}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
