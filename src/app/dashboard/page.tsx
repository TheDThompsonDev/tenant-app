'use client';

import Header from '@/app/components/Header';
import Image from 'next/image';
import Link from 'next/link';
import { Pencil } from 'lucide-react';
import LABELS from '../constants/labels';
import ICON_MAP from '../constants/icons';
import { getCurrentUser } from '@/lib/appwrite';
import { Models } from 'appwrite';
import { useEffect, useState } from 'react';

type UserType = Models.User<Models.Preferences>;

const Dashboard = () => {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getCurrentUser();
        if (response.success && response.data) {
          setUser(response.data as UserType);
        } else {
          console.error('Failed to get user:', response.error);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const renderIcon = (iconName: string) => {
    if (!iconName || !ICON_MAP[iconName]) return null;
    const IconComponent = ICON_MAP[iconName];
    return <IconComponent size={36} color='white' />;
  };

  const EditProfileBtn = () => {
    return (
      <Link
        href='/editProfile'
        className='bg-primary-green border-4 border-white p-1 rounded-lg relative left-10 bottom-[110px] lg:static lg:border-none lg:px-4 lg:py-2 lg:mt-4 text-white'
      >
        <div className='block lg:hidden'>
          <Pencil size={16} fill='white' />
        </div>
        <div className='hidden lg:block'>
          <p>Edit Profile</p>
        </div>
      </Link>
    );
  };

  const Profile = () => {
    const profileImage = '/Animal.jpg'; // TODO: Replace with the actual profile image source
    const userName = user ? user.name : 'Loading...';
    const userEmail = user ? user.email : 'Loading...';

    return (
      <div className='mt-14 pb-10 flex flex-col items-center lg:items-start relative lg:mt-0 lg:px-4'>
        <Image
          src={profileImage}
          width={24}
          height={24}
          alt='Profile Picture'
          className='w-24 h-24 rounded-full object-cover ring-4 ring-white lg:relative'
        />
        <h3 className='mt-5 text-3xl text-white'>{userName}</h3>
        <p className='text-white'>{userEmail}</p>
        <EditProfileBtn />
      </div>
    );
  };

  const Address = () => {
    return (
      <div className='p-6 font-thin text-sm text-white'>
        <h2 className='text-2xl text-white'>Willow Creek Apartments</h2>
        <p className='text-white'>
          Address: 1250 Willow Creek Dr. Brookdale, TX 75201
        </p>
        <p className='text-white'>Website: www.willowcreekapts.com</p>
        <p className='text-white'>Phone: (555) 867 - 3412</p>
      </div>
    );
  };

  const DashboardBtns = () => {
    return (
      <div className='p-6'>
        <h3 className='hidden lg:block text-3xl mb-4 text-white'>Dashboard</h3>
        <div className='grid grid-cols-2 lg:grid-cols-3 gap-6'>
          {user?.name === 'admin'
            ? Object.entries(LABELS.adminDashboardBtns).map(
                ([label, { href, text, icon }]) => {
                  const Icon = renderIcon(icon);

                  return (
                    <Link
                      key={label}
                      href={href}
                      className='bg-primary-green flex flex-col gap-2 items-center justify-center p-6 rounded-lg text-white'
                    >
                      {Icon}
                      <p className='text-white text-center text-xs lg:text-sm'>
                        {text}
                      </p>
                    </Link>
                  );
                }
              )
            : Object.entries(LABELS.dashboardBtns).map(
                ([label, { href, text, icon }]) => {
                  const Icon = renderIcon(icon);

                  return (
                    <Link
                      key={label}
                      href={href}
                      className='bg-primary-green flex flex-col gap-2 items-center justify-center p-6 rounded-lg text-white'
                    >
                      {Icon}
                      <p className='text-white text-center text-xs lg:text-sm'>
                        {text}
                      </p>
                    </Link>
                  );
                }
              )}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        Loading...
      </div>
    );
  }

  return (
    <div className='relative h-screen'>
      <div className='absolute inset-0 bg-[url("/street-view.jpeg")] bg-cover bg-center lg:bg-none lg:bg-secondary-blue'>
        {/* Dark Overlay */}
        <div className='absolute inset-0 bg-black/20 lg:hidden' />
      </div>
      <div className='relative'>
        <Header />

        {/* Apartment Image for Desktop */}
        <div className='hidden lg:block lg:w-full lg:h-60 lg:bg-[url("/street-view.jpeg")] bg-cover bg-center'>
          <div className='w-full h-full bg-black/20' />
        </div>

        {/* Mobile */}
        <div className='lg:hidden'>
          <Profile />
          <div className='bg-secondary-blue lg:flex lg:flex-row'>
            <Address />
            <DashboardBtns />
          </div>
        </div>

        {/* Desktop */}
        <div className='hidden lg:flex flex-row mx-auto max-w-400 relative'>
          <div className='flex flex-col w-1/3 px-5 relative bottom-10'>
            <Profile />
            <Address />
          </div>
          <div className='flex-1'>
            <DashboardBtns />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
