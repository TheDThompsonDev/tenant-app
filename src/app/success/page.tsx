'use client';
import { CircleUser } from 'lucide-react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import LABELS from '../constants/labels';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';

function SuccessContent() {
  const searchParams = useSearchParams();
  const email = searchParams ? searchParams.get('email') : null;

  const [password, setPassword] = useState('');

  useEffect(() => {
    try {
      const storedPassword =
        typeof window !== 'undefined'
          ? sessionStorage.getItem('password')
          : null;
      if (storedPassword) {
        setPassword(storedPassword);
        sessionStorage.removeItem('password');
      }
    } catch (error) {
      console.error('Error accessing sessionStorage:', error);
    }
  }, []);

  return (
    <div className='min-h-screen flex flex-col justify-center bg-gray-100 p-4 relative'>
      <Link
        href='/createTenant'
        className='text-med text-gray-500 mb-4 inline-block absolute top-10 left-10'
      >
        &larr; {LABELS.success.back}
      </Link>
      <div className='max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden'>
        <div className='bg-gradient-to-r from-primary-green to-secondary-blue p-7 text-white'>
          <h2 className='text-2xl font-bold flex items-center'>
            <CircleUser className='mr-3 w-10 h-10 md:w-7 md:h-7' />
            {LABELS.success.title}
          </h2>
        </div>
        <div className='grid grid-cols-12'>
          <div className='col-span-7 border-r border-gray-200 p-6'>
            <h3 className='text-lg underline font-semibold mb-4 text-gray-500'>
              {LABELS.success.credentialsMessage}
            </h3>
            <p className='mb-10 mt-5'>
              <span
                className='font-semibold text-gray-500
              '
              >
                {LABELS.success.email}
              </span>{' '}
              <br />
              <span
                className='font-semibold text-gray-500
              '
              >
                {email}
              </span>
            </p>
            <p>
              <span className='font-semibold  text-gray-500'>
                {LABELS.success.temporaryPassword}
              </span>{' '}
              <br />
              <span className='font-semibold  text-gray-500'>{password}</span>
            </p>
          </div>

          <div className='col-span-5 p-5 flex items-center justify-center'>
            <p className='text-gray-500 text-lg'>
              {LABELS.success.registrationMessage}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <div>
      <Header />
      <Suspense
        fallback={
          <div className='flex justify-center items-center min-h-screen'>
            Loading...
          </div>
        }
      >
        <SuccessContent />
      </Suspense>
      <Footer />
    </div>
  );
}
