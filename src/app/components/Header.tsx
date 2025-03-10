'use client';
import { useState } from 'react';
import CompanyLogo from '@/app/components/CompanyLogo';
import Navbar from '@/app/components/Navbar';
import LogoutBtn from '@/app/components/LogoutBtn';
import { Menu } from 'lucide-react';
import MobileNav from '@/app/components/MobileNav';
import Image from 'next/image';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const openMenu = () => setIsMenuOpen(true);
  const closeMenu = () => setIsMenuOpen(false);

  const profileImage = '/Animal.jpg'; // TODO: Replace with the actual profile image source

  return (
    <header className='relative text-white bg-[url("/street-view.jpeg")] bg-cover bg-center lg:bg-none lg:bg-white lg:text-black py-4 px-6'>
      {/* Mobile */}
      <div className='absolute inset-0 bg-black/20 lg:hidden' />
      <div className='relative z-10 flex flex-col'>
        <div className='flex justify-between items-center lg:hidden'>
          <CompanyLogo />
          <button
            className='lg:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400'
            onClick={openMenu}
          >
            <Menu size={36} />
          </button>
          {isMenuOpen && <MobileNav closeMenu={closeMenu} />}
        </div>
        <div className='mt-14 flex flex-col items-center lg:hidden'>
          <Image
            src={profileImage}
            width={24}
            height={24}
            alt='Profile Picture'
            className='w-24 h-24 rounded-full object-cover ring-4 ring-white'
          />
          <h3 className='mt-6 text-3xl'>Animal</h3>
          <p>wildanimal@email.com</p>
        </div>
      </div>

      {/* Desktop */}
      <div className='hidden mx-auto lg:flex justify-between items-center'>
        <CompanyLogo />
        <Navbar />
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
