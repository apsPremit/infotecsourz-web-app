import { StateContext } from '@/context/StateProvider';
import React, { useContext } from 'react';

const PackageCheckbox = ({ plan, isChecked }) => {
  const { setSelectedPackage, selectedPackage } = useContext(StateContext);

  return (
    <input
      id={plan?.package_name}
      className='absolute right-5 top-5 hidden scale-150'
      type='radio'
      onChange={() => setSelectedPackage(plan)}
      checked={isChecked}
    />
  );
};

export default PackageCheckbox;
