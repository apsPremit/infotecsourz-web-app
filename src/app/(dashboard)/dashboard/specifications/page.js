import SpecificationsLeftSide from '@/components/dashboard/specifications/SpecificationsLeftSide/SpecificationsLeftSide';
import SpecificationsRightSide from '@/components/dashboard/specifications/SpecificationsRightSide/SpecificationsRightSide';

export const metadata = {
  title: 'Order Specification | Infotecsourz',
  description: 'Photo Retouching App',
};

const Specifications = () => {
  return (
    <div className='lg:px-10'>
      <div className='grid grid-cols-1 gap-7 rounded bg-white p-5 lg:grid-cols-2'>
        {/* left side  */}
        <SpecificationsLeftSide />

        {/* right side  */}
        <SpecificationsRightSide />
      </div>
    </div>
  );
};

export default Specifications;
