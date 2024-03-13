import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import PricingPage from '@/components/dashboard/package/PicingPage/PricingPage';
import config from '@/config';
import { getServerSession } from 'next-auth';

export const metadata = {
  title: 'Billing Info | Infotecsourz',
  description: 'Photo Retouching App',
};

const fetchPlans = async (token) => {
  try {
    const res = await fetch(`${config.api_base_url}/plans`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    const result = await res.json();
    return result.data;
  } catch (error) {
    throw new Error(error.message || 'something went wrong');
  }
};

const Pricing = async () => {
  const session = await getServerSession(authOptions);
  const plans = await fetchPlans(session?.user?.accessToken);
  return (
    <div>
      <h1 className='mb-10 mt-5 text-center text-3xl font-bold'>
        Our exclusive subscription packages only made for you
      </h1>
      {/* <h1>{error.message}</h1> */}
      <PricingPage plans={plans} />
    </div>
  );
};

export default Pricing;
