'use client';

import Header from "@/app/components/Header";
import Image from "next/image";
import Link from "next/link";
import { Pencil } from "lucide-react";
import LABELS from "../constants/labels";
import ICON_MAP from "../constants/icons";
import { getCurrentUser } from "@/lib/appwrite";
import { Models } from "appwrite";
import { useEffect, useState } from "react";
import { text } from "stream/consumers";

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
          console.error("Failed to get user:", response.error);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
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

  const EditProfileBtn = ({ user }: { user: { name: string } }) => {
    const buttonColor = user.name === 'admin' ? 'bg-secondary-blue' : 'bg-primary-green'
    const textColor = user.name === 'admin' ? 'text-alternate-light-gray' : 'text-white'
    const hiddenButton = user.name === 'admin' ? 'hidden' : 'block'
    return (
      <Link
        href="/editProfile"
        className={`${buttonColor} ${hiddenButton} border-4 border-white p-1 rounded-lg relative left-10 bottom-[110px] lg:static lg:border-none lg:px-4 lg:py-2 lg:mt-4`}
      >
        <div className='block lg:hidden'>
          <Pencil size={16} fill='white' />
        </div>
        <div className="hidden lg:block">
          <p className={textColor}>Edit Profile</p>
        </div>
      </Link>
    );
  };

  const Profile = ({user}: {user:UserType}) => {
    if (!user) return <div>Loading...</div>
    const profileImage = user.name.toLowerCase() === "admin" ? "/admin.png" : "/Animal.jpg"; // TODO: Replace with the actual profile image source
    const userName = user ? user.name : "Loading...";
    const userEmail = user ? user.email : "Loading...";
    const textColor = user.name === 'admin' ? 'text-white lg:text-secondary-blue' : 'text-white'
const paddingBottom = user.name === 'admin' ? '' : 'p-10'
    return (
      <div className={`${textColor} mt-14 ${paddingBottom} flex flex-col items-center lg:items-start relative lg:mt-0 lg:px-4 text-white`}>
        <Image
          src={profileImage}
          width={24}
          height={24}
          alt='Profile Picture'
          className='w-24 h-24 rounded-full object-cover ring-4 ring-white lg:relative'
        />
        <h3 className="mt-5 text-3xl">{userName}</h3>
        <p>{userEmail}</p>
        <EditProfileBtn user={user}/>
      </div>
    );
  };

  const Address = ({user}: {user:UserType}) => {
    const textColor = user.name === 'admin' ? 'text-black' : 'text-white'
    return (
      <div className={`${textColor} p-6 font-thin text-sm`}>
        <h2 className="text-2xl">Willow Creek Apartments</h2>
        <p>Address: 1250 Willow Creek Dr. Brookdale, TX 75201</p>
        <p>Website: www.willowcreekapts.com</p>
        <p>Phone: (555) 867 - 3412</p>
      </div>
    );
  };

  const DashboardBtns = () => {
    return (
      <div className="p-6">
        <h3 className="hidden lg:block text-3xl mb-4">Dashboard</h3>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
          {user?.name === "admin"
            ? Object.entries(LABELS.adminDashboardBtns).map(
                ([label, { href, text, icon }]) => {
                  const Icon = renderIcon(icon);

                  return (
                    <Link
                      key={label}
                      href={href}
                      className="bg-secondary-blue flex flex-col gap-2 items-center justify-center p-6 rounded-lg text-white"
                    >
                      {Icon}
                      <p className="text-white text-center text-xs lg:text-sm">
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
                      className="bg-primary-green flex flex-col gap-2 items-center justify-center p-6 rounded-lg text-white"
                    >
                      {Icon}
                      <p className="text-white text-center text-xs lg:text-sm">
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

  const TenantDashboard = ({ user }: { user: UserType }) => {
    return (
      <div className="relative h-screen">
      <div className='absolute inset-0 bg-[url("/street-view.jpeg")] bg-cover bg-center lg:bg-none lg:bg-secondary-blue'>
        {/* Dark Overlay */}
        <div className='absolute inset-0 bg-black/20 lg:hidden' />
      </div>
      <div className='relative'>
        <Header />
      <div>
        <div className='hidden lg:block lg:w-full lg:h-60 lg:bg-[url("/street-view.jpeg")] bg-cover bg-center'>
          <div className='w-full h-full bg-black/20' />
        </div>

        {/* Mobile */}
        <div className="lg:hidden">
          <Profile user={user}/>
          <div className="bg-secondary-blue lg:flex lg:flex-row">
            <Address user={user}/>
            <DashboardBtns />
          </div>
        </div>

        {/* Desktop */}
        <div className="hidden lg:flex flex-row mx-auto max-w-400 relative">
          <div className="flex flex-col w-1/3 px-5 relative bottom-10">
            <Profile user={user}/>
            <Address user={user}/>
          </div>
          <div className='flex-1'>
            <DashboardBtns />
          </div>
        </div>
      </div>
      </div>
      </div>
    )
  }

  const AdminDashboard = ({ user }: { user: UserType }) => {
    return (
      <div className="relative">
      <div className='absolute inset-0 bg-[url("/street-view.jpeg")] bg-cover bg-center lg:bg-none lg:bg-alternate-light-gray'>
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/20 lg:hidden" />
      </div>
      <div className="relative">
        <Header />
      <div>
        <div className='hidden lg:block lg:w-full lg:h-60 lg:bg-[url("/street-view.jpeg")] bg-cover bg-center'>
          <div className="w-full h-full bg-black/20" />
        </div>

        {/* Mobile */}
        <div className="lg:hidden">
          <Profile user={user}/>
          <div className="bg-alternate-light-gray lg:flex lg:flex-row min-h-screen">
            <Address user={user}/>
            <DashboardBtns />
          </div>
        </div>

        {/* Desktop */}
        <div className="hidden lg:flex flex-row mx-auto max-w-400 relative">
          <div className="flex flex-col w-1/3 px-5 relative bottom-10 min-h-screen">
            <Profile user={user}/>
            <Address user={user}/>
          </div>
          <div className="flex-1">
            <DashboardBtns />
          </div>
        </div>
      </div>
      </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <>
        {user?.name === "admin" ? <AdminDashboard user={user} /> : <TenantDashboard user={user} />}
    </>
  );
};

export default Dashboard;
