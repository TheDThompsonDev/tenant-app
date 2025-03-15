'use client';
import { useState } from 'react';
import CompanyLogo from '@/app/components/CompanyLogo';
import Navbar from '@/app/components/Navbar';
import LogoutBtn from '@/app/components/LogoutBtn';
import Image from 'next/image';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const profileImage = '/Animal.jpg'; // TODO: Replace with the actual profile image source

  return (
    <header className='relative text-white bg-transparent lg:bg-white lg:text-black py-4 px-6'>
      <div className='absolute inset-0 bg-black/20 lg:hidden' />

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
          <Image
            src={profileImage}
            width={40}
            height={40}
            alt='Profile Picture'
            className='w-10 h-10 rounded-full object-cover'
          />
          <LogoutBtn />
        </div>
      </div>
    </header>
  );
}
