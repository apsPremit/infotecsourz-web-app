'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { baseUrl } from '@/utils/functions/baseUrl';
import { useSession } from 'next-auth/react';
import Loader from '@/components/shared/Loader/Loader';
import config from '@/config';
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(false);
  const session = useSession();
  console.log('ur', userData);
  useEffect(() => {
    if (session?.data?.user) {
      fetch(`${config.api_base_url}/users/${session?.data?.user?.id}`)
        .then((res) => res.json())
        .then((data) => {
          setUserData(data?.data);
        })
        .catch((error) => {
          console.log('error from auth provider', error);
          setUserData({});
        });
    }
  }, [session]);

  if (session.status === 'loading') {
    return (
      <div className='flex h-screen items-center justify-center'>
        <Loader />
      </div>
    );
  }

  const userInfo = {
    userData,
    setUserData,
  };

  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
};

export const UserAuth = () => useContext(AuthContext);
