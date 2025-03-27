'use client';
import {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from 'react';
import { Models } from "appwrite";

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
  apartmentNumber?: string;
  sender?: {
    apartmentNumber?: string;
  };
  receiver?: {
    apartmentNumber?: string;
  };
};

export interface NotificationsContextType {
  notifications: NotificationData[] | null;
  setNotifications: Dispatch<SetStateAction<NotificationData[] | null>>;
  getNotifications: (user: UserType) => Promise<void>;
  isLoading: boolean;
  error: unknown;
}

export const NotificationContext = createContext<
  NotificationsContextType | undefined
>(undefined);

interface NotificationsProviderProps {
  children: ReactNode;
}

export const NotificationsProvider = ({
  children,
}: NotificationsProviderProps) => {
  const [notifications, setNotifications] = useState<NotificationData[] | null>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<unknown>(null);

  const getNotifications = async (user: UserType) => {
    try {
      setIsLoading(true);
      const url =
        user.name === 'admin'
          ? '/api/admin/notifications'
          : `/api/notifications?userId=${user.$id}`;

      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
      });

      if (!res.ok) {
        throw new Error(
          `Failed to fetch messages: ${res.status} ${res.statusText}`
        );
      }

      const data: NotificationData[] = await res.json();
      setNotifications(data);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        setNotifications,
        getNotifications,
        isLoading,
        error,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
