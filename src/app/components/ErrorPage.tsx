import { FC } from 'react';
import { AlertTriangle } from 'lucide-react';
import Link from 'next/link';

interface ErrorPageProps {
  message?: string;
}

const ErrorPage: FC<ErrorPageProps> = ({
  message = 'Something went wrong.',
}) => {
  return (
    <div className='flex h-screen w-full items-center justify-center bg-white'>
      <div className='flex flex-col items-center gap-4'>
        <AlertTriangle className='h-12 w-12 text-red-600' />
        <span className='text-lg font-medium text-primary-black'>
          {message}
        </span>
        <p className='text-primary-black'>
          Click{' '}
          <Link href={'/'} className='text-lg font-medium text-primary-green'>
            here
          </Link>{' '}
          to return home.
        </p>
      </div>
    </div>
  );
};
export default ErrorPage;
