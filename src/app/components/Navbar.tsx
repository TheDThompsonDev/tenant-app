import LABELS from '@/app/constants/labels';
import Link from 'next/link';
import NotificationBadge from '@/app/components/NotificationBadge';

export default function Navbar() {
  const navigationData = Object.entries(LABELS.navigation);

  const mockNotificationCount = 4; // TODO: replace this with data from server (hook?)

  const linkClasses =
    'flex h-[48px] grow items-center justify-center gap-2 rounded-md hover:bg-gray-50 p-3 text-sm font-medium md:flex-none md:justify-start md:p-2 md:px-3';

  return (
    <nav>
      <ul className='flex space-x-4'>
        {navigationData.map(([label, { href, text }]) => (
          <li key={text}>
            <Link href={href} className={linkClasses}>
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
}
