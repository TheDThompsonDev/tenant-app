'use client';
import { useState } from 'react';
import Header from '@/app/components/Header';
import Image from 'next/image';
import LABELS from '@/app/constants/labels';
import EditProfileForm from '@/app/components/EditProfileForm';
import ChangePasswordForm from '@/app/components/ChangePasswordForm';
import Footer from '../components/Footer';
import { UserRound } from 'lucide-react';

function ApartmentBg() {
  return (
    <div className='relative bg-[url("/street-view.jpeg")] bg-cover bg-center w-100 min-h-[200px] lg:min-h-[150px]'>
      {/* Dark Overlay */}
      <div className='absolute inset-0 bg-black/30' />
    </div>
  );
}

function ProfileHeader() {

  return (
    <div className='flex flex-col items-center mb-12 relative bottom-32 lg:static'>
      <h3 className='text-2xl mb-6 text-alternate-light-gray'>{LABELS.editProfile.title}</h3>
      <UserRound
          width={24}
          height={24}
          className={`w-24 h-24 rounded-full object-cover border-2 border-white lg:relative bg-alternate-green text-primary-green`}
        />
    </div>
  );
}

export default function EditProfilePage() {
  const [isChangePasswordDisplayed, setIsChangePasswordDisplayed] =
    useState(false);

  const displayChangePassword = () => setIsChangePasswordDisplayed(true);
  const displayEditProfile = () => setIsChangePasswordDisplayed(false);

  return (
    <main className='bg-white relative'>
      <Header />
      <ApartmentBg />
      <div className='bg-secondary-blue h-screen flex flex-col items-stretch lg:pt-6'>
        <ProfileHeader />
        {isChangePasswordDisplayed ? (
          <ChangePasswordForm displayEditProfile={displayEditProfile} />
        ) : (
          <EditProfileForm displayChangePassword={displayChangePassword} />
        )}
      </div>
      <Footer />
    </main>
  );
}
