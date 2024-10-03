// import SupportForm from '@/components/dashboard/support/SupportForm/SupportForm';
import SupportForm from '@/components/dashboard/support/SupportForm';
import SupportTable from '@/components/ui/SupportTable';
import React from 'react';
export const metadata = {
  title: 'Support | Infotecsourz',
  description: 'Photo Retouching App',
};
const page = () => {
  return (
    <div>
      <SupportForm />
      <div className='py-5'>
        <SupportTable />
      </div>
    </div>
  );
};

export default page;
