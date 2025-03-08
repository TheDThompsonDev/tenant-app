'use client';
import Navbar from '@/app/components/Navbar';
import { LogoutBtn } from './LogoutBtn';

export default function Header() {
  return (
    <header className='bg-white text-black p-4 shadow-md'>
      <div className='container mx-auto flex justify-between items-center'>
        {/* Replace h1 with svg image later */}
        <h1 className='text-xl font-semibold'>Tenant</h1>
        <Navbar />
        {/* notification icon dealio */}
        <LogoutBtn />
      </div>
    </header>
  );
}
