import { useContext } from 'react';
import {
  NotificationsContextType,
  NotificationContext,
} from '@/context/NotificationsContext';

export const useNotifications = (): NotificationsContextType => {
  const context = useContext(NotificationContext);

  // Instead of throwing an error, return a default implementation
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
