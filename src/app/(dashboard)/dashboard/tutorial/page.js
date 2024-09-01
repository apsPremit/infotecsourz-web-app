import config from '@/config';
import React from 'react';

const page = () => {
  const steps = [
    {
      id: 1,
      text: 'Click on the Packages you like or you can select Free Trial. After select the package come to the dashboard and “Create New Order” button on the Dashboard.',
      child: [],
    },
    {
      id: 2,
      text: ' On the “Create New Order” page, select either “Product Photo” or “Model Photo” as the type of image you need retouched.',
      child: [],
    },
    {
      id: 3,
      text: ' Choose the specific retouching services you require from the available options,select the required services for your image, such as:',
      child: [
        ' Resize and Cropping',
        'Background removal',
        'Color correction',
        'Blemish/spot removal',
        'Blemish/spot removal',
        'Jewelry retouching/accessory addition and more',
      ],
    },
    {
      id: 4,
      text: 'Review your order details and select any additional options or instructions.',
      child: [],
    },
    {
      id: 5,
      text: 'Proceed to upload the image file you need edited.',
      child: [],
    },
    {
      id: 6,
      text: 'Select turnaround time',
      child: [],
    },
    {
      id: 7,
      text: 'Review the order details then click “Place Order” to submit your request.',
      child: [],
    },
    {
      id: 8,
      text: 'You will receive updates on the status of your order as it is processed by the Infotecsourz team.',
      child: [],
    },
  ];

  return (
    <div className='min-h-screen px-5'>
      <div>
        <h1 className='text-lg md:text-3xl font-bold text-center mt-5'>
          Use our service seamlessly from your home !
        </h1>
        <p className='text-center my-3'>
          Here are the steps to place an order on the Infotecsourz Photo
          Retouching Service
        </p>

        <ol className='list-decimal  md:px-10  space-y-4 mt-10 text-justify'>
          {steps.map((step) => (
            <li key={step.id}>
              {step.text}
              {step?.child?.length && (
                <ul className='list-disc  ps-5 mt-3'>
                  {step?.child.map((item, i) => (
                    <li key={item + i}>{item}</li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ol>

        <div className='flex justify-center my-10'>
          <iframe
            width='560'
            height='315'
            src={config.tutorial_link}
            title='YouTube video player'
            frameBorder='0'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
            referrerPolicy='strict-origin-when-cross-origin'
            allowFullScreen
          ></iframe>
        </div>
        <p className='text-start'>
          Let us know if you need any clarification on these steps or have
          additional questions e-mail us to{' '}
          <span className='text-main'>contact@infotecsourez.com</span> or
          contact support.
        </p>
      </div>
    </div>
  );
};

export default page;
