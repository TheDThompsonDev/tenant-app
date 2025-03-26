import { FC } from "react";
import type { Message as MessageType } from "@/app/hooks/useVoiceChat";

const formatTimestamp = (timestamp: number) => {
  const date = new Date(timestamp);
  return date
    .toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    .replace(/^0/, '');
};

interface MessageProps {
  message: MessageType;
}

const Message: FC<MessageProps> = ({ message }) => (
  <div
    className={`text-md border p-3 rounded-lg ${
      message.role === "user"
        ? "bg-alternate-green text-secondary-dark-gray"
        : "bg-alternate-light-gray text-primary-black"
    }`}
  >
    <div className="text-xs font-thin">
      <span>{message.role === "user" ? "You" : "AI"}</span>{" "}
      <span>{formatTimestamp(message.timestamp)}</span>
    </div>
    <div>{message.content}</div>
  </div>
);

export default Message;
