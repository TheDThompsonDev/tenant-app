import Image from 'next/image';

export default function Welcome() {
  const profilePic = '/Animal.jpg'; // TODO: Replace with the actual profile image source

  return (
    <div className='mt-16 flex flex-col items-center border-b border-black py-4'>
      <Image
        src={profilePic}
        width={100}
        height={100}
        alt='Profile Picture'
        className='rounded-full'
      />
      <p className='mt-2 font-medium text-lg'>Hi, Animal!</p>
    </div>
  );
}
