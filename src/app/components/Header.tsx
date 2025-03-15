'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import CompanyLogo from '@/app/components/CompanyLogo';
import Navbar from '@/app/components/Navbar';
import LogoutBtn from '@/app/components/LogoutBtn';
import Image from 'next/image';
import { getCurrentUser } from '@/lib/appwrite';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDarkText, setIsDarkText] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in when component mounts
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

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsDarkText(entry.isIntersecting);
      },
      {
        root: null, // Observe relative to viewport
        threshold: 0.5, // Trigger when at least 50% of the header is over a white background
      }
    );

    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const handleLoginClick = () => {
    router.push('/login');
  };

  const profileImage = '/Animal.jpg'; // TODO: Replace with the actual profile image source

  return (
    <header
      ref={headerRef}
      className={`relative py-4 px-6 ${
        isDarkText ? 'text-black bg-white' : 'text-white bg-transparent'
      }`}
    >
      {/* Mobile View */}
      <div className='relative z-10 lg:hidden'>
        <div className='flex justify-between items-center'>
          <CompanyLogo />
          <Navbar
            isMobile={true}
            isMenuOpen={isMenuOpen}
            toggleMenu={toggleMenu}
            closeMenu={closeMenu}
          />
        </div>
      </div>

      {/* Desktop View */}
      <div className='hidden mx-auto lg:flex justify-between items-center'>
        <CompanyLogo />
        <Navbar isMobile={false} />
        <div className='flex flex-row gap-4 items-center justify-center'>
          {isLoggedIn ? (
            <>
              <Image
                src={profileImage}
                width={40}
                height={40}
                alt='Profile Picture'
                className='w-10 h-10 rounded-full object-cover'
              />
              <LogoutBtn />
            </>
          ) : (
            <button
              className='flex h-[48px] grow items-center justify-center gap-2 rounded-md p-3 text-lg font-medium md:flex-none md:justify-start md:p-2 md:px-8 text-white bg-secondary-blue'
              onClick={handleLoginClick}
            >
              Login
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
