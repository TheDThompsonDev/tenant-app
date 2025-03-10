export default function LogoutBtn() {
  const handleLogoutClick = () => {
    // trigger auth function for logout
    console.log('User logged out');
  };

  return (
    <button
      className='flex h-[48px] grow items-center justify-center gap-2 rounded-md p-3 text-lg font-medium md:flex-none md:justify-start md:p-2 md:px-8 text-white bg-[#164E63]'
      onClick={handleLogoutClick}
    >
      Logout
    </button>
  );
}
