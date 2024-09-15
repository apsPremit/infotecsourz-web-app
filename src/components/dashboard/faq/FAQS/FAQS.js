'use client';
import React from 'react';
import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';

const FAQS = () => {
  const faqs = [
    {
      title: 'How To Create An Order ?',
      description: (
        <>
          Just sign up for free and select packages you like. Then, select
          services with instructions in the &apos;Create Order&apos; section of
          the dashboard. After choosing all required services, upload your
          photos and complete the order.
        </>
      ),
    },
    {
      title: 'What Services Do You Offer ?',
      description: (
        <>
          We offer all types of e-commerce product photo editing and model photo
          retouching services. For example, Cloth photos retouched products,
          food items, apparel models, cosmetics, machinery/parts, jewelry,
          farming equipment, background removal,
          <Link
            href='https://www.infotecsourz.com/blog/what-is-clipping-path-service/'
            className='text-main'
          >
            clipping path
          </Link>
          , color correction and more.
        </>
      ),
    },
    {
      title: 'Do You Offer A Free Trial ?',
      description:
        'We have 3 free trial credit. You can try our service for free. No credit card required!',
    },
    {
      title: 'How long the photo editing will take?',
      description:
        'The normal turnaround time is 12-72 hours. However, depending on the subscription package, we encourage our customers to contact us directly for faster turnaround.',
    },
    {
      title: 'How much do you charge for photo editing services',
      description: (
        <>
          Our pay-as-go services start at $0.30 per image, but we offer many
          monthly and yearly packages. To get more information about pricing,
          please visit our{' '}
          <Link href='/dashboard/pricing' className='text-main'>
            pricing
          </Link>{' '}
          page.
        </>
      ),
    },

    {
      title: 'Do You Have Any Revision?',
      description: `You will get revisions for each photos. It's free of cost.`,
    },
    {
      title: 'Do you offer any customer support?',
      description: `Yes. We will provide 24/7 customer support.`,
    },

    {
      title: 'How Do I Pay ?',
      description:
        'We work now you can pay later. We will send you an invoice at the end of every project.',
    },

    {
      title: 'How Can I Share My Photos ?',
      description: (
        <>
          You can signup and upload your files to our secured server or you can
          attach your file link. For more info, visit our{' '}
          <a href='/contact' className='text-main'>
            support
          </a>
          .
        </>
      ),
    },
  ];

  return (
    <div className='w-full'>
      <div className='mx-auto w-full rounded-2xl p-2'>
        {faqs.map((faq, index) => (
          <Disclosure key={index}>
            {({ open }) => (
              <div>
                <Disclosure.Button className='flex w-full justify-between rounded-lg border px-4 py-3 text-left text-sm font-medium focus:outline-none focus-visible:ring focus-visible:ring-opacity-75'>
                  <span className='text-lg font-bold'>{faq.title}</span>
                  <ChevronUpIcon
                    className={`${
                      open ? 'rotate-180 transform' : ''
                    } h-5 w-5 text-purple-500`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className='px-4 pb-2 pt-4 text-gray-500'>
                  {faq.description}
                </Disclosure.Panel>
              </div>
            )}
          </Disclosure>
        ))}
      </div>
    </div>
  );
};

export default FAQS;
