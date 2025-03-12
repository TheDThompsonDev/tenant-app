import ICON_MAP from '@/app/constants/icons';
import Link from 'next/link';
import NotificationBadge from '@/app/components/NotificationBadge';
import { ChevronRight } from 'lucide-react';

interface DropdownLinkProps {
  label: string;
  href: string;
  icon: string;
}

export default function DropdownLink({ label, href, icon }: DropdownLinkProps) {
  const Icon = ICON_MAP[icon];
  const mockNotificationCount = 4; // TODO: replace this with data from server (hook?)

  return (
    <Link href={href} className='w-full flex flex-row px-6'>
      <div className='w-full flex flex-row justify-between'>
        <div className='flex flex-row gap-2'>
          <Icon />
          <p>{label}</p>
        </div>
        <div className='flex flex-row gap-2'>
          {label === 'Messages' && (
            <NotificationBadge value={mockNotificationCount} />
          )}
          <ChevronRight />
        </div>
      </div>
    </Link>
  );
}
