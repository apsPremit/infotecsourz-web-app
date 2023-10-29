

import { UserAuth } from '@/context/AuthProvider';
import { redirect } from 'next/navigation';
import React from 'react';

const Home = () => {
  redirect('/dashboard')

  return (
    <div>
      <h1>Home Page</h1>

    </div>
  );
};

export default Home
