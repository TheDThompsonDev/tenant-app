import { useState, useEffect } from 'react';
import { Models } from 'appwrite';
import { getCurrentUser } from '@/lib/appwrite';

type UserType = Models.User<Models.Preferences>;

export const useAuth = () => {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const initialize = async () => {
      try {
        const { success, data: user } = await getCurrentUser();
        if (success) {
          setUser(user as UserType || null);
        }
      } catch (error) {
        console.error(error);
        setError(error instanceof Error ? error : new Error(String(error)));
      } finally {
        setLoading(false);
      }
    };

    initialize();
  }, []);

  return { user, loading, error };
};
