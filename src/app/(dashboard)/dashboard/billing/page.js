import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import BillingPage from '@/components/dashboard/billing/BillingPage/BillingPage';
import { getServerSession } from 'next-auth';

export const metadata = {
  title: 'Billing | Infotecsourz',
  description: 'Photo Retouching App',
};

const Billing = async () => {
  const session = await getServerSession(authOptions);
  return (
    <div className='w-full'>
      <BillingPage session={session} />
    </div>
  );
};

export default Billing;
