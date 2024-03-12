// useUpdateSession.js

import { useSession } from 'next-auth/react';

const useUpdateSession = () => {
  const { data: session, update } = useSession();

  const updateSession = async (newData) => {
    console.log(newData);
    await update({
      ...session,
      user: {
        ...session.user,
        subscription: newData,
      },
    });
  };

  return { updateSession, session };
};

export default useUpdateSession;
