'use client';
import { UserAuth } from '@/context/AuthProvider';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

const LogOutBtn = () => {
  const router = useRouter();
  const { logOut } = UserAuth();
  const handleLogOut = () => {
    logOut().then(() => {
      Cookies.remove('access-token');
      router.push('/login');
    });
  };
  return (
    <button
      onClick={handleLogOut}
      className='ml-2 rounded border bg-main px-3 py-1.5 text-white hover:bg-mainHover '
    >
      Logout
    </button>
  );
};

export default LogOutBtn;
