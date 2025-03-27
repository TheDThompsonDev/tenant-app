import { useContext } from 'react';
import {
  NotificationsContextType,
  NotificationContext,
} from '@/context/NotificationsContext';

export const useNotifications = (): NotificationsContextType => {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error(
      'useNotifications must be used within a NotificationsProvider'
    );
  }

  return context;
};
