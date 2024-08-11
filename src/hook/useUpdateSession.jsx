// useUpdateSession.js

import { useSession } from 'next-auth/react';

const useUpdateSession = () => {
  const { data: session, update } = useSession();

  const updateSession = async (newData, able_free_trial) => {
    await update({
      ...session,
      user: {
        ...session.user,
        able_free_trial: able_free_trial,
        subscription: newData,
      },
    });
  };

  return { updateSession, session };
};

export default useUpdateSession;
