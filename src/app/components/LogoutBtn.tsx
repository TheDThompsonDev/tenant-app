export function LogoutBtn() {
  const handleLogoutClick = () => {
    // trigger auth function for logout
    console.log('User logged out');
  };
  return (
    <button
      className='bg-alternate-light-gray flex h-[48px] grow items-center justify-center gap-2 rounded-md hover:bg-gray-50 p-3 text-sm font-medium md:flex-none md:justify-start md:p-2 md:px-3'
      onClick={handleLogoutClick}
    >
      Logout
    </button>
  );
}
