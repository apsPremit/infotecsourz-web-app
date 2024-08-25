import NewOrderPage from '@/components/newOrder/NewOrderPage';
export const metadata = {
  title: 'Create New Order | Infotecsourz',
  description: 'Photo Retouching App',
};

const NewOrder = () => {
  return (
    <div className='bg-white lg:p-5 min-h-[calc(100vh-36px)]'>
      <NewOrderPage />
    </div>
  );
};

export default NewOrder;
