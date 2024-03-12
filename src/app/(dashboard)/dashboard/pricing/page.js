import PricingPage from '@/components/dashboard/package/PicingPage/PricingPage';

export const metadata = {
  title: 'Billing Info | Infotecsourz',
  description: 'Photo Retouching App',
};
const Pricing = () => {
  return (
    <div>
      <h1 className='mb-10 mt-5 text-center text-3xl font-bold'>
        Our exclusive subscription packages only made for you
      </h1>
      {/* <h1>{error.message}</h1> */}
      <PricingPage />
    </div>
  );
};

export default Pricing;
