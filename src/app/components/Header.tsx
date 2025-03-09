'use client';
import CompanyLogo from '@/app/components/CompanyLogo';
import Navbar from '@/app/components/Navbar';
import LogoutBtn from '@/app/components/LogoutBtn';

export default function Header() {
  return (
    <header className='bg-white text-black p-4 shadow-md'>
      <div className='container mx-auto flex justify-between items-center'>
        <CompanyLogo />
        <Navbar />
        {/* notification icon dealio */}
        <LogoutBtn />
      </div>
    </header>
  );
}
