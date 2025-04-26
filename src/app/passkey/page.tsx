'use client';
import { useRouter } from 'next/navigation';
import Header from '@/app/components/Header';
import Lock from '../components/Lock';
import { v4 as uuidv4 } from 'uuid';
import LABELS from '../constants/labels';
import Footer from '../components/Footer';
import {
  CheckCircle,
  Calendar,
  Clock,
  Shield,
  LockKeyhole,
} from 'lucide-react';

export default function Home() {
  const router = useRouter();
  const generatePasscode = (): string => {
    const min = 1000;
    const max = 9999;
    return Math.floor(Math.random() * (max - min + 1) + min).toString();
  };

  const currentDate = new Date().toLocaleDateString();

  const handleGenerateKey = () => {
    const keyData = {
      id: uuidv4(),
      code: generatePasscode(),
      tenant: 'Tenant 01',
      unit: '202',
      date: new Date().toLocaleDateString(),
      status: 'Active',
    };
    router.push(
      `/passkey/${keyData.id}?code=${keyData.code}&tenant=${keyData.tenant}&unit=${keyData.unit}&date=${keyData.date}&status=${keyData.status}`
    );
  };

  return (
    <>
      <Header />
      <div className='flex flex-col items-center pt-10 min-h-screen p-4 bg-gradient-to-b from-gray-50 to-white text-center'>
        <div className='w-full max-w-md transition-all duration-700 opacity-100 translate-y-0'>
          <h1 className='text-2xl font-bold mb-6 text-primary-black flex items-center justify-center'>
            <div className='bg-secondary-blue/10 p-2 rounded-full mr-3'>
              <LockKeyhole className='text-secondary-blue' size={24} />
            </div>
            {LABELS.doorlock.title}
          </h1>

          <div className='bg-white rounded-xl shadow-xl text-black p-6 border border-gray-100 relative overflow-hidden transition-all duration-300 hover:shadow-2xl'>
            <div className='absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-secondary-blue via-primary-green to-secondary-blue'></div>
            <div className='absolute -right-12 -top-12 w-24 h-24 bg-primary-green/5 rounded-full'></div>
            <div className='absolute -left-12 -bottom-12 w-24 h-24 bg-secondary-blue/5 rounded-full'></div>

            <div className='flex justify-center mb-6'>
              <div className='inline-flex items-center px-4 py-2 rounded-full bg-green-100 text-green-800 shadow-sm'>
                <CheckCircle size={16} className='mr-2' />
                <span className='text-sm font-medium'>
                  {LABELS.doorlock.status}
                </span>
              </div>
            </div>

            <div className='mb-8 pb-6 border-b border-gray-100'>
              <div className='flex justify-center space-x-6'>
                <div className='flex items-center text-gray-500 text-sm'>
                  <Calendar size={16} className='mr-2 text-primary-green' />
                  <span>{currentDate}</span>
                </div>
                <div className='flex items-center text-gray-500 text-sm'>
                  <Clock size={16} className='mr-2 text-secondary-blue' />
                  <span>{LABELS.passcode.hoursAccess}</span>
                </div>
              </div>
            </div>

            <div className='flex flex-col items-center bg-white'>
              <div className='flex flex-col items-center text-center text-primary-black'>
                <div className='mb-8'>
                  <div className='flex items-center justify-center mb-4'>
                    <Shield size={18} className='mr-2 text-secondary-blue' />
                    <h3 className='text-xl font-bold text-secondary-blue'>
                      {LABELS.doorlock.unit}
                    </h3>
                  </div>
                </div>
              </div>

              <Lock initialLockedState={false} />

              <button
                onClick={handleGenerateKey}
                className='mt-20 px-4 py-2 bg-button text-white text-lg rounded-lg bg-secondary-blue hover:translate-y-0.5 hover:cursor-pointer'
              >
                {LABELS.doorlock.ButtonLabel}
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
