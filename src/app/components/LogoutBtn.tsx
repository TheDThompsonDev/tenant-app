'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { logout } from '@/lib/appwrite';

type LogoutButtonProps = {
  bgColor?: "bg-primary-green" | "bg-secondary-blue"
}

export default function LogoutBtn({bgColor = 'bg-secondary-blue'} : LogoutButtonProps) {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();

  const handleLogoutClick = async () => {
    try {
      setIsLoggingOut(true);
      const result = await logout();
      
      if (result.success) {
        // Redirect to login page after successful logout
        router.push('/login');
      } else {
        console.error('Logout failed:', result.error);
      }
    } catch (error) {
      console.error('Error during logout:', error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <button
      className={`flex h-[48px] grow items-center justify-center gap-2 rounded-md p-3 text-lg font-medium md:flex-none md:justify-start md:p-2 md:px-8 text-white ${bgColor}`}
      onClick={handleLogoutClick}
      disabled={isLoggingOut}
    >
      {isLoggingOut ? 'Logging out...' : 'Logout'}
    </button>
  );
}
