import {
  X,
  MessageSquareText,
  Lock,
  Package,
  CarFront,
  ChevronRight,
  LogOut,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';

interface DropdownLinkProps {
  icon: ReactNode;
  label: string;
  href: string;
}

export function DropdownLink({ icon, label, href }: DropdownLinkProps) {
  return (
    <div className='w-full flex flex-row justify-between px-6'>
      <Link href={href}>
        <div className='flex flex-row gap-2'>
          {icon}
          <p>{label}</p>
        </div>
      </Link>
      <ChevronRight />
    </div>
  );
}

interface MobileNavProps {
  closeMenu: () => void;
}

export default function MobileNav({ closeMenu }: MobileNavProps) {
  return (
    <div className='fixed inset-0 bg-white z-50 flex flex-col align-stretch text-black'>
      <button className='absolute top-6 right-8' onClick={closeMenu}>
        <X size={36} />
      </button>
      <div className='mt-16 flex flex-col items-center border-b border-black py-4'>
        <Image
          src='/Animal.jpg' // Replace with the actual profile image source
          width={100}
          height={100}
          alt='Profile Picture'
          className='rounded-full'
        />
        <p className='mt-2 font-medium text-lg'>Hi, Animal!</p>
      </div>
      <div className='flex flex-col gap-6 pt-6 flex-grow'>
        <DropdownLink icon={<MessageSquareText />} label='Messages' href='/' />
        <DropdownLink icon={<Lock />} label='Unlock My Door' href='/' />
        <DropdownLink icon={<Package />} label='My Packages' href='/' />
        <DropdownLink icon={<CarFront />} label='Guest Parking Pass' href='/' />
      </div>
      <button className='flex flex-row gap-2 mt-auto text-red-600 p-6'>
        <LogOut />
        <p>Logout</p>
      </button>
    </div>
  );
}
