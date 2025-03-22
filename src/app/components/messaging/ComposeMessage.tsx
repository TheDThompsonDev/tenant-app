"use client";

import React, { useState, useRef, useEffect } from "react";
import { useTanstackForm } from "@/app/hooks/useTanstackForm";
import { useStore } from "@tanstack/react-form";
import { getCurrentUser } from "@/lib/appwrite";
import { Send, AlertCircle, Package, Home, FileText, MessageSquare, VolumeX, Building } from "lucide-react";
import LABELS from "@/app/constants/labels";

type Message = {
  id: string;
  subject: string;
  body: string;
  createdAt: string;
  from: "tenant" | "admin";
  type?: "package" | "management" | "lease" | "general" | "noise";
  user?: string;
  apartmentNumber?: string;
};

type ComposeMessageFormValues = {
  subject: string;
  body: string;
  type: "package" | "management" | "lease" | "general" | "noise";
  apartmentNumber?: string;
};

type ComposeMessageProps = {
  onMessageSent: (msg: Message) => void;
  userId?: string;
  isAdmin?: boolean;
};

type MessageTypeOption = {
  value: ComposeMessageFormValues["type"];
  label: string;
  icon: React.ReactNode;
  color: string;
};

export default function ComposeMessage({ onMessageSent, isAdmin = false }: ComposeMessageProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<"admin" | "tenant">("tenant");

  useEffect(() => {
    setUserRole(isAdmin ? "admin" : "tenant");
  }, [isAdmin]);

  const messageTypeOptions: MessageTypeOption[] = [
    { value: "general", label: "General", icon: <MessageSquare size={16} />, color: "bg-primary text-white" },
    { value: "package", label: "Package", icon: <Package size={16} />, color: "bg-primary-green text-white" },
    { value: "noise", label: "Noise Complaint", icon: <VolumeX size={16} />, color: "bg-red-500 text-white" },
    { value: "management", label: "Management", icon: <Home size={16} />, color: "bg-secondary-blue text-white" },
    { value: "lease", label: "Lease", icon: <FileText size={16} />, color: "bg-blue-800 text-white" },
  ];

  const formRef = useRef(
    useTanstackForm<ComposeMessageFormValues>({
      defaultValues: {
        subject: "",
        body: "",
        type: "general",
        apartmentNumber: "",
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
            notificationType: values.type.toUpperCase(),
            user: userResponse.data.$id,
            from: userRole as "tenant" | "admin",
            type: values.type,
            ...(userRole === "admin" && values.apartmentNumber 
              ? { apartmentNumber: values.apartmentNumber } 
              : {}),
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
  const type = useStore(form.store, (state) => state.values.type);
  const apartmentNumber = useStore(form.store, (state) => state.values.apartmentNumber);

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
              htmlFor="type"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Message Type
            </label>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
              {messageTypeOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => form.setFieldValue("type", option.value)}
                  className={`flex items-center justify-center gap-2 p-2 rounded-md transition-all duration-200 ${type === option.value ? option.color + ' shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                >
                  <span className="flex-shrink-0">{option.icon}</span>
                  <span className="text-xs font-medium">{option.label}</span>
                </button>
              ))}
            </div>
          </div>
          {userRole === "admin" && (
            <div className="relative">
              <label
                htmlFor="apartmentNumber"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Apartment Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Building size={16} className="text-gray-400" />
                </div>
                <input
                  id="apartmentNumber"
                  type="text"
                  value={apartmentNumber}
                  onChange={(e) => form.setFieldValue("apartmentNumber", e.target.value)}
                  placeholder="e.g. 101"
                  className="w-full pl-10 p-3 border border-gray-300 rounded-lg bg-white text-black 
                          focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-transparent
                          transition-all duration-200 ease-in-out shadow-sm"
                  required={userRole === "admin"}
                />
              </div>
              <p className="mt-1 text-xs text-gray-500">Enter the apartment number to send this message to</p>
            </div>
          )}

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
            {userRole === "tenant" 
              ? "Your message will be sent to management" 
              : LABELS.messaging.allFieldsRequired}
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
