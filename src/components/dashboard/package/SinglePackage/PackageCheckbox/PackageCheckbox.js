import { StateContext } from '@/context/StateProvider';
import React, { useContext } from 'react';

const PackageCheckbox = ({ plan, isChecked }) => {
    const { setSelectedPackage, selectedPackage } = useContext(StateContext)


    return (
        <input
            id={plan?.package_name}
            className='absolute top-5 right-5 scale-150 hidden'
            type="radio"
            onChange={() => setSelectedPackage(plan)}
            checked={isChecked}
        />
    );
};

export default PackageCheckbox;