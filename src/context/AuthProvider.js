'use client';
import Loader from '@/components/shared/Loader/Loader';
import config from '@/config';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { createContext, useContext, useEffect, useState } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const session = useSession();
  const user = session?.data?.user;
  const getUser = async (userId, accessToken) => {
    return await axios.get(`${config.api_base_url}/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  };
  const { data: userData, isLoading } = useQuery({
    queryKey: 'user',
    queryFn: () => getUser(user?.userId, user?.accessToken),
    enabled: !!user,
    select: (data) => data.data.data,
  });
  if (isLoading) {
    return (
      <div className='h-screen flex items-center justify-center'>
        <Loader />
      </div>
    );
  }
  // console.log({ userData });
  const userInfo = {
    userData,
  };
  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
