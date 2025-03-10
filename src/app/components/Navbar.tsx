import Link from 'next/link';

export default function Navbar() {
  const linkClasses =
    'flex h-[48px] grow items-center justify-center gap-2 rounded-md hover:bg-gray-50 p-3 text-sm font-medium md:flex-none md:justify-start md:p-2 md:px-3';

  return (
    <nav>
      <ul className='flex space-x-4'>
        <Link href='/' className={linkClasses}>
          <p className='hidden md:block text-lg'>Messages</p>
        </Link>
        <Link href='/' className={linkClasses}>
          <p className='hidden md:block text-lg'>Unlock Door</p>
        </Link>
        <Link href='/' className={linkClasses}>
          <p className='hidden md:block text-lg'>Packages</p>
        </Link>
        <Link href='/' className={linkClasses}>
          <p className='hidden md:block text-lg'>Parking</p>
        </Link>
      </ul>
    </nav>
  );
}
