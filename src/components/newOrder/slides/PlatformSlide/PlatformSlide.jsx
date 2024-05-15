import React, { useContext } from 'react';
import ImageBox from '@/components/newOrder/slides/ImageBox/ImageBox';
import { StateContext } from '@/context/StateProvider';
import SwitchToggle from '@/components/ui/SwitchToggle';

const PlatformSlide = () => {
  const { platforms, setPlatforms, handleSingleValueChange } =
    useContext(StateContext);
  const formatOptions = [
    { label: 'Amazon', value: 'amazon' },
    { label: 'Shopify', value: 'shopify' },
    { label: 'Bigcommerce', value: 'bigcommerce' },
    { label: 'Ebay', value: 'ebay' },
    { label: 'Etcy', value: 'etcy' },
    { label: 'WooCommerce', value: 'woocommerce' },
    { label: 'Others', value: 'others' },
  ];

  return (
    <div>
      <ImageBox />
      <h2 className='mb-5  text-lg font-bold'>Photos user for </h2>
      <div className='grid grid-cols-1 lg:grid-cols-3 space-y-1.5'>
        {formatOptions.map((item, i) => (
          <SwitchToggle
            key={i}
            isChecked={platforms[item.value]}
            toggler={() =>
              handleSingleValueChange(
                setPlatforms,
                item.value,
                !platforms[item.value]
              )
            }
            label={item.label}
          />
        ))}
      </div>
    </div>
  );
};

export default PlatformSlide;
