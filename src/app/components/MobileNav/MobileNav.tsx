import LABELS from '@/app/constants/labels';
import { X, LogOut } from 'lucide-react';
import { Welcome, DropdownLink } from '@/app/components/MobileNav';

interface MobileNavProps {
  closeMenu: () => void;
}

export default function MobileNav({ closeMenu }: MobileNavProps) {
  const navigationData = Object.entries(LABELS.navigation);

  const handleLogoutClick = () => {
    console.log('Logging out user...'); // TODO: replace with actual logout logic
  };

  return (
    <div className='fixed inset-0 bg-white z-50 flex flex-col align-stretch text-black'>
      <button className='absolute top-6 right-8' onClick={closeMenu}>
        <X size={36} />
      </button>
      <Welcome />
      <div className='flex flex-col gap-6 pt-6 flex-grow'>
        {navigationData.map(([label, { href, text, icon }]) => (
          <DropdownLink key={label} icon={icon} label={text} href={href} />
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
}
