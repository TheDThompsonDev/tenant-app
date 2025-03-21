"use client";

import React, { useState, useRef } from "react";
import { useTanstackForm } from "@/app/hooks/useTanstackForm";
import { useStore } from "@tanstack/react-form";

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

  const formRef = useRef(
    useTanstackForm<ComposeMessageFormValues>({
      defaultValues: {
        subject: "",
        body: "",
      },
      onSubmit: async (values) => {
        setIsSubmitting(true);

        try {
          const newMsg = {
            subject: values.subject,
            message: values.body,
            createdAt: new Date().toISOString(),
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
    <div className="bg-gray-100 rounded-md p-6 shadow-sm w-full max-w-2xl mx-auto">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          void form.handleSubmit();
        }}
      >
        <div className="mb-4">
          <label htmlFor="subject" className="sr-only">
            Subject
          </label>
          <input
            id="subject"
            type="text"
            value={subject}
            onChange={(e) => form.setFieldValue("subject", e.target.value)}
            placeholder="Subject"
            className="w-full p-3 border border-gray-300 rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="body" className="sr-only">
            Message
          </label>
          <textarea
            id="body"
            value={body}
            onChange={(e) => form.setFieldValue("body", e.target.value)}
            placeholder="Message"
            rows={4}
            className="w-full p-3 border border-gray-300 rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-800 text-white font-medium py-3 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          {isSubmitting ? "Sending..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
