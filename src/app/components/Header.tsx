'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import CompanyLogo from '@/app/components/CompanyLogo';
import Navbar from '@/app/components/Navbar';
import LogoutBtn from '@/app/components/LogoutBtn';
import { getCurrentUser } from '@/lib/appwrite';
import { Settings } from 'lucide-react';
import Link from 'next/link';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const result = await getCurrentUser();
        setIsLoggedIn(result.success);
      } catch (error) {
        console.error('Error checking auth status:', error);
        setIsLoggedIn(false);
      }
    };

    checkAuthStatus();
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const handleLoginClick = () => {
    router.push('/login');
  };

  const handleParkingClick = () => {
    console.log('Parking btn clicked');
  };

  return (
    <header className='relative bg-white text-black py-4 px-6'>
      {/* Mobile View */}
      <div className='relative z-10 lg:hidden'>
        <div className='flex justify-between items-center'>
          <CompanyLogo />
          {isLoggedIn ? (
            <Navbar
              isMobile={true}
              isMenuOpen={isMenuOpen}
              toggleMenu={toggleMenu}
              closeMenu={closeMenu}
            />
          ) : (
            <div className='flex flex-row gap-4'>
              <button
                className='flex h-[48px] grow items-center justify-center gap-2 rounded-md p-3 text-lg font-medium md:flex-none md:justify-start md:p-2 md:px-8 text-white bg-secondary-blue'
                onClick={handleParkingClick}
              >
                <Link href='/parking'>Parking</Link>
              </button>
              <button
                className='px-4 py-2 rounded-md text-white bg-primary-green text-sm'
                onClick={handleLoginClick}
              >
                Login
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Desktop View */}
      <div className='hidden mx-auto lg:flex justify-between items-center'>
        <CompanyLogo />
        {isLoggedIn ? (
          <>
            <Navbar isMobile={false} />
            <div className='flex flex-row gap-4 items-center justify-center'>
              <button>
                <Settings
                  className='text-secondary-dark-gray'
                  width={32}
                  height={32}
                  onClick={() => router.push('/dashboard')}
                />
              </button>

              <LogoutBtn />
            </div>
          </>
        ) : (
          <div className='flex flex-row gap-4 items-center justify-center'>
            <button
              className='flex h-[48px] grow items-center justify-center gap-2 rounded-md p-3 text-lg font-medium md:flex-none md:justify-start md:p-2 md:px-8 text-white bg-secondary-blue'
              onClick={handleParkingClick}
            >
              <Link href='/parking'>Guest Parking</Link>
            </button>
            <button
              className='flex h-[48px] grow items-center justify-center gap-2 rounded-md p-3 text-lg font-medium md:flex-none md:justify-start md:p-2 md:px-8 text-white bg-primary-green'
              onClick={handleLoginClick}
            >
              Login
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
