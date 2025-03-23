import { FC } from 'react';
import { Loader } from 'lucide-react';

interface LoadingPageProps {
  message?: string;
}

const LoadingPage: FC<LoadingPageProps> = ({ message = 'Loading...' }) => {
  return (
    <div className='flex h-screen w-full items-center justify-center bg-gray-100'>
      <div className='flex flex-col items-center gap-4'>
        <Loader className='h-12 w-12 animate-spin text-primary-green' />
        <span className='text-lg font-medium text-secondary-blue'>
          {message}
        </span>
      </div>
    </div>
  );
};

export default LoadingPage;
