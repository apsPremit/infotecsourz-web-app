

import { UserAuth } from '@/context/AuthProvider';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react';
import { nextOption } from './api/auth/[...nextauth]/route';

const Home = async () => {
  redirect('/dashboard')

  return (
    <div>
      <h1>Home Page</h1>

    </div>
  );
};

export default Home
