"use client";
import LABELS from '@/app/constants/labels';
import Link from 'next/link';
import NotificationBadge from '@/app/components/NotificationBadge';
import { X, LogOut, Menu, ChevronRight, Settings } from 'lucide-react';
import ICON_MAP from '@/app/constants/icons';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { logout, getCurrentUser } from '@/lib/appwrite';
import { Models } from 'appwrite';

type UserType = Models.User<Models.Preferences>;

interface NavbarProps {
  isMobile?: boolean;
  isMenuOpen?: boolean;
  toggleMenu?: () => void;
  closeMenu?: () => void;
}

export default function Navbar({
  isMobile = false,
  isMenuOpen = false,
  toggleMenu,
  closeMenu,
}: NavbarProps) {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);
  const [notificationCount, setNotificationCount] = useState(0);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getCurrentUser();
        if (response.success && response.data) {
          setUser(response.data as UserType);
        } else {
          console.error("Failed to get user:", response.error);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    async function fetchMessages() {
      try {
        const url =
          user?.name === 'admin'
            ? '/api/admin/notifications'
            : `/api/notifications?userId=${user?.$id}`;

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

        const data = await res.json();

        // TODO: this counts all messages, regardless of status ('UNREAD' or 'READ')
        setNotificationCount(data.length);
      } catch (err) {
        console.error('Error fetching messages:', err);
        return;
      }
    }

    if (user) {
      fetchMessages();
    }
  }, [user]);

  if (loading) {
    return null; 
  }

  const navigationData = Object.entries(
    user?.name === "admin" ? LABELS.navigationAdmin : LABELS.navigation
  );

  const handleLogoutClick = async () => {
    try {
      setIsLoggingOut(true);
      const result = await logout();

      if (result.success) {
   
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

  const renderIcon = (iconName: string) => {
    if (!iconName || !ICON_MAP[iconName]) return null;
    const IconComponent = ICON_MAP[iconName];
    return <IconComponent />;
  };

  const renderMobileMenu = () => {
    if (!isMenuOpen) return null;

    return (
      <div className='fixed inset-0 bg-white z-50 flex flex-col align-stretch text-black'>
        <button className='absolute top-6 right-8' onClick={closeMenu}>
          <X size={36} />
        </button>
        <div className='mt-16 flex flex-row py-4'>
          <button 
            className='flex flex-row gap-4 p-4 w-full items-center bg-secondary-blue text-alternate-light-gray bg-gradient-to-r from-secondary-blue to-primary-green shadow-md' 
            onClick={() => router.push("/dashboard")}>
            <Settings size={40} />
            <p className='text-xl'>{LABELS.mobileNav.cogTitle}</p>
          </button>

        </div>
        <div className='flex flex-col gap-6 pt-6 flex-grow'>
          {navigationData.map(([label, { href, text, icon }]) => (
            <Link key={label} href={href} className='w-full flex flex-row px-6'>
              <div className='w-full flex flex-row justify-between'>
                <div className='flex flex-row gap-2'>
                  {icon && renderIcon(icon)}
                  <p>{text}</p>
                  {label === 'messages' && (
                    <NotificationBadge 
                    className='ml-2'
                    value={notificationCount} />
                  )}
                </div>
                <div className='flex flex-row gap-2'>

                  <ChevronRight />
                </div>
              </div>
            </Link>
          ))}
        </div>
        <button
          className='flex flex-row gap-2 mt-auto text-red-600 p-6'
          onClick={handleLogoutClick}
          disabled={isLoggingOut}
        >
          <LogOut />
          <p>{isLoggingOut ? 'Logging out...' : 'Logout'}</p>
        </button>
      </div>
    );
  };

  const renderDesktopNav = () => {
    return (
      <nav>
        <ul className='flex space-x-8'>
          {navigationData.map(([label, { href, text }]) => (
            <li key={text}>
              <Link
                href={href}
                className='relative flex h-[48px] grow items-center justify-center gap-2 rounded-md p-3 text-sm md:flex-none md:justify-start md:p-2 md:px-3 tracking-tight text-secondary-dark-gray hover:drop-shadow-lg hover:text-alternate-gray duration-100 ease-in-out'
              >
                <p className='hidden md:block text-lg'>{text}</p>
                {label === 'messages' && (
                  <NotificationBadge 
                  className='absolute -top-2 -right-3 '
                  value={notificationCount} />
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    );
  };

  const renderMenuButton = () => {
    if (!toggleMenu) return null;

    return (
      <button
        className='p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400'
        onClick={toggleMenu}
      >
        <Menu size={36} />
      </button>
    );
  };

  return (
    <>
      {isMobile ? (
        <>
          {renderMenuButton()}
          {renderMobileMenu()}
        </>
      ) : (
        renderDesktopNav()
      )}
    </>
  );
}
