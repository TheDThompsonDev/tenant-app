'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import LABELS from '@/app/constants/labels';
import Header from '@/app/components/Header';
import LockerDetails from '@/app/components/LockerDetails';
import { useEffect, useState } from 'react';
import Footer from '@/app/components/Footer';
import { Package } from '@/types/package';
import { formatDate } from '../../../../utils/formatDate';

export default function PackageDetailsPage() {
  const params = useParams();
  const [packageData, setPackageData] = useState<Package | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!params || !params.id) {
      setError(true);
      setLoading(false);
      return;
    }

    const id = params.id as string;

    async function fetchPackage() {
      try {
        const response = await fetch(`/api/package/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch package');
        }

        const pkg = await response.json();
        setPackageData(pkg);
      } catch (err) {
        console.error('Error fetching package:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchPackage();
  }, [params]);

  if (loading) {
    return <p className='text-center'>{LABELS.loading}</p>;
  }

  if (error || !packageData) {
    return (
      <p className='text-center text-red-500'>{LABELS.package.notfoundError}</p>
    );
  }

  return (
    <>
      <Header />
      <div className='bg-white min-h-screen'>
        <div className='flex flex-col justify-center '>
          <h2 className='text-black text-center text-3xl font-bold p-4'>
            {LABELS.PackageDetails.title}
          </h2>

          <div className='flex flex-col text-black m-auto p-4'>
            <Link
              href='/locker'
              className='text-sm text-gray-500 pb-4 inline-block'
            >
              &larr; {LABELS.package.back}
            </Link>
            <h3 className='text-2xl font-bold'>
              {LABELS.PackageDetails.statusTitle}{' '}
              {packageData.packageLockerStatus === 'READY_FOR_PICKUP'
                ? 'Ready for pickup'
                : 'Picked up'}
            </h3>
            {packageData.packageLockerStatus === 'READY_FOR_PICKUP' ? (
              <span>
                {LABELS.PackageDetails.deliveredTitle}{' '}
                {formatDate(packageData.createdAt)}
              </span>
            ) : (
              <span>
                {LABELS.PackageDetails.pickupTitle}{' '}
                {formatDate(packageData.lastAcessed)}
              </span>
            )}
          </div>

          {packageData.packageLockerStatus === 'READY_FOR_PICKUP' ? (
            <div className='flex flex-col items-center pt-10 p-4 bg-gradient-to-b from-gray-50 to-white text-center'>
              <div className='w-full max-w-md transition-all duration-700 opacity-100 translate-y-0'>
                <div className='bg-white rounded-xl shadow-xl text-black p-6 border border-gray-100 relative overflow-hidden transition-all duration-300 hover:shadow-2xl'>
                  <div className='absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-secondary-blue via-primary-green to-secondary-blue'></div>
                  <div className='absolute -right-12 -top-12 w-24 h-24 bg-primary-green/5 rounded-full'></div>
                  <div className='absolute -left-12 -bottom-12 w-24 h-24 bg-secondary-blue/5 rounded-full'></div>

                  <LockerDetails
                    id={packageData.id}
                    lockerNumber={packageData.lockerNumber}
                    lockerCode={packageData.accessCode}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className='flex flex-col items-center pt-10 p-4 bg-gradient-to-b from-gray-50 to-white text-center'>
              <div className='w-full max-w-md transition-all duration-700 opacity-100 translate-y-0'>
                <div className='bg-white rounded-xl shadow-xl text-black p-6 border border-gray-100 relative overflow-hidden transition-all duration-300 hover:shadow-2xl'>
                  <div className='absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-secondary-blue via-primary-green to-secondary-blue'></div>
                  <div className='absolute -right-12 -top-12 w-24 h-24 bg-primary-green/5 rounded-full'></div>
                  <div className='absolute -left-12 -bottom-12 w-24 h-24 bg-secondary-blue/5 rounded-full'></div>

                  <span className='p-4 w-full rounded-md flex flex-col p-4 text-center m-auto text-xl font-bold'>
                    {LABELS.PackageDetails.pickedupStatus}
                  </span>
                </div>
              </div>
            </div>
          )}

          <div className='flex flex-col justify-center items-center lg:m-auto w-full lg:w-1/2 p-4'>
            <p className='text-black'>{LABELS.PackageDetails.notify}</p>
            <Link href='/messaging'>
              <button className='bg-primary-green text-white p-4 rounded-md'>
                {LABELS.PackageDetails.messageBtn}
              </button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
