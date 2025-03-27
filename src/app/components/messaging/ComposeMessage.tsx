"use client";

import React, { useState, useRef, useEffect } from "react";
import { useTanstackForm } from "@/app/hooks/useTanstackForm";
import { useStore } from "@tanstack/react-form";
import { getCurrentUser } from "@/lib/appwrite";
import {
  Send,
  AlertCircle,
  Package,
  Home,
  FileText,
  MessageSquare,
  VolumeX,
} from "lucide-react";
import LABELS from "@/app/constants/labels";
import {useNotifications} from '@/app/hooks/useNotifications';
import { useAuth } from '@/app/hooks/useAuth';

type Message = {
  id: string;
  subject: string;
  body: string;
  createdAt: string;
  from: "tenant" | "admin";
  type?: "package" | "management" | "lease" | "general" | "noise_complaint";
  user?: string;
  apartmentNumber?: string;
  status?: string;
  priority?: string;
};

type ComposeMessageFormValues = {
  subject: string;
  body: string;
  type: "package" | "management" | "lease" | "general" | "noise_complaint";
  receiverId?: string;
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

export default function ComposeMessage({
  onMessageSent,
  isAdmin = false,
}: ComposeMessageProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<"admin" | "tenant">("tenant");
  const [tenants, setTenants] = useState<{ id: string; name: string }[]>([]);
  const { getNotifications } = useNotifications();
  const { user } = useAuth();

  useEffect(() => {
    setUserRole(isAdmin ? "admin" : "tenant");
  

    if (isAdmin) {
      fetch("/api/users?userRole=tenant")
        .then((res) => res.json())
        .then((data) => {
          const transformed = data.map((user: any) => ({
            id: user.id,
            name:
              `${user.firstName || ""} ${user.lastName || ""} - APT: ${
                user.apartmentNumber
              }`.trim() || "Unnamed Tenant",
          }));
          setTenants(transformed);
        })
        .catch((err) => {
          console.error("error fetching tenants:", err);
          setTenants([]);
        });
    }
  }, [isAdmin]);

  const messageTypeOptions: MessageTypeOption[] = [
    {
      value: "general",
      label: "General",
      icon: <MessageSquare size={16} />,
      color: "bg-primary text-white",
    },
    {
      value: "package",
      label: "Package",
      icon: <Package size={16} />,
      color: "bg-primary-green text-white",
    },
    {
      value: "noise_complaint",
      label: "Noise Complaint",
      icon: <VolumeX size={16} />,
      color: "bg-red-500 text-white",
    },
    {
      value: "management",
      label: "Management",
      icon: <Home size={16} />,
      color: "bg-secondary-blue text-white",
    },
    {
      value: "lease",
      label: "Lease",
      icon: <FileText size={16} />,
      color: "bg-blue-800 text-white",
    },
  ];

  const formRef = useRef(
    useTanstackForm<ComposeMessageFormValues>({
      defaultValues: {
        subject: "",
        body: "",
        type: "general",
        receiverId: "",
      },
      onSubmit: async (values) => {
        setIsSubmitting(true);
        setError(null);

        try {
          const userResponse = await getCurrentUser();
          if (!userResponse.success || !userResponse.data) {
            throw new Error(LABELS.messaging.errorUserInfo);
          }

          const isAdmin = userResponse.data.name === "admin";

          const newMsg = {
            subject: values.subject,
            message: values.body,
            notificationType: values.type.toUpperCase(),
            sender: userResponse.data.$id,
            receiver: isAdmin ? values.receiverId : "ADMIN",
          };

          const url = isAdmin
            ? "/api/admin/notifications"
            : `/api/notifications`;

          const res = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newMsg),
          });

          if (!res.ok) {
            throw new Error("Failed to send message");
          }

          const savedMsg = await res.json();
          onMessageSent(savedMsg);
          if (user) {
            await getNotifications(user);
          }
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
  const receiverId = useStore(form.store, (state) => state.values.receiverId);

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
                  className={`flex items-center justify-center gap-2 p-2 rounded-md transition-all duration-200 ${
                    type === option.value
                      ? option.color + " shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
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
                htmlFor="receiverId"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Select Tenant
              </label>
              <select
                id="receiverId"
                value={receiverId}
                onChange={(e) =>
                  form.setFieldValue("receiverId", e.target.value)
                }
                className="w-full p-3 border border-gray-300 rounded-lg bg-white text-black 
                      focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-transparent
                      transition-all duration-200 ease-in-out shadow-sm"
                required
              >
                <option value="">Select a tenant...</option>
                {tenants.map((tenant) => (
                  <option key={tenant.id} value={tenant.id}>
                    {tenant.name}
                  </option>
                ))}
              </select>
              <p className="mt-1 text-xs text-gray-500">
                Tenant to send this message to
              </p>
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
