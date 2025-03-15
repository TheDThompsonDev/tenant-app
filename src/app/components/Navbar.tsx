import LABELS from '@/app/constants/labels';
import Link from 'next/link';
import NotificationBadge from '@/app/components/NotificationBadge';
import { X, LogOut, Menu, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import ICON_MAP from '@/app/constants/icons';

const ProfileImage = ({ size = 40, className = '' }) => {
  const profileImage = '/Animal.jpg'; // TODO: Replace with the actual profile image source

  return (
    <Image
      src={profileImage}
      width={size}
      height={size}
      alt='Profile Picture'
      className={`rounded-full object-cover ${className}`}
    />
  );
};

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
  const navigationData = Object.entries(LABELS.navigation);
  const mockNotificationCount = 4; // TODO: replace this with data from server (hook?)

  const handleLogoutClick = () => {
    console.log('Logging out user...'); // TODO: replace with actual logout logic
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
        <div className='mt-16 flex flex-col items-center border-b border-black py-4'>
          <ProfileImage size={100} />
          <p className='mt-2 font-medium text-lg'>Hi, Animal!</p>
        </div>
        <div className='flex flex-col gap-6 pt-6 flex-grow'>
          {navigationData.map(([label, { href, text, icon }]) => (
            <Link key={label} href={href} className='w-full flex flex-row px-6'>
              <div className='w-full flex flex-row justify-between'>
                <div className='flex flex-row gap-2'>
                  {icon && renderIcon(icon)}
                  <p>{text}</p>
                </div>
                <div className='flex flex-row gap-2'>
                  {label === 'messages' && (
                    <NotificationBadge value={mockNotificationCount} />
                  )}
                  <ChevronRight />
                </div>
              </div>
            </Link>
          ))}
        </div>
        <button
          className='flex flex-row gap-2 mt-auto text-red-600 p-6'
          onClick={handleLogoutClick}
        >
          <LogOut />
          <p>Logout</p>
        </button>
      </div>
    );
  };

  const renderDesktopNav = () => {
    return (
      <nav>
        <ul className='flex space-x-4'>
          {navigationData.map(([label, { href, text }]) => (
            <li key={text}>
              <Link
                href={href}
                className='flex h-[48px] grow items-center justify-center gap-2 rounded-md hover:bg-gray-50 p-3 text-sm font-medium md:flex-none md:justify-start md:p-2 md:px-3'
              >
                <p className='hidden md:block text-lg'>{text}</p>
                {label === 'messages' && (
                  <NotificationBadge value={mockNotificationCount} />
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
