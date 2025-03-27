'use client';
import { createContext, useState, useContext, ReactNode, useCallback } from 'react';
import { Models } from "appwrite";

type UserType = Models.User<Models.Preferences>;

export type NotificationData = {
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
  setNotifications: React.Dispatch<React.SetStateAction<NotificationData[] | null>>;
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

  // Use useCallback to memoize the getNotifications function
  const getNotifications = useCallback(async (user: UserType) => {
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
  }, []); // Empty dependency array since it doesn't depend on any props or state

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

export const useNotifications = (): NotificationsContextType => {
  const context = useContext(NotificationContext);

  if (!context) {
    console.warn('useNotifications called outside of NotificationsProvider, using fallback implementation');
    return {
      notifications: [],
      setNotifications: () => {},
      getNotifications: async () => {},
      isLoading: false,
      error: null
    };
  }

  return context;
};
