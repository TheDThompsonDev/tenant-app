'use client';
import Header from '@/app/components/Header';
import Image from 'next/image';
import LABELS from '@/app/constants/labels';
import EditProfileForm from '@/app/components/EditProfileForm';
import Footer from '../components/Footer';

function ApartmentBg() {
  return (
    <div className='relative bg-[url("/street-view.jpeg")] bg-cover bg-center w-100 min-h-[200px] lg:min-h-[150px]'>
      {/* Dark Overlay */}
      <div className='absolute inset-0 bg-black/30' />
    </div>
  );
}

function ProfileHeader() {
  const profileImage = '/Animal.jpg'; // TODO: Replace with the actual profile image source

  return (
    <div className='flex flex-col items-center mb-12 relative bottom-32 lg:static'>
      <h3 className='text-2xl mb-6'>{LABELS.editProfile.title}</h3>
      <Image
        src={profileImage}
        width={24}
        height={24}
        alt='Profile Picture'
        className='w-24 h-24 rounded-full object-cover ring-4 ring-white lg:relative'
      />
    </div>
  );
}

export default function EditProfilePage() {
  return (
    <main className='bg-white relative'>
      <Header />
      <ApartmentBg />
      <div className='bg-secondary-blue h-screen flex flex-col items-stretch lg:pt-6'>
        <ProfileHeader />
        <EditProfileForm />
      </div>
      <Footer />
    </main>
  );
}
