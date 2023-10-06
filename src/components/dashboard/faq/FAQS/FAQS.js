"use client";
import React from 'react';
import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/20/solid'
const FAQS = () => {
    const faqs = [
        {
            title: 'How to place an order?',
            description: 'It’s very easy than you think. Just request a quote with your e-mail and information. In few business hours you will get our e-mail with price quote. If you are agree on that price then upload your file and you are done. '
        },
        {
            title: 'What is your turnaround time?',
            description: 'We have TAT 24-72 hours but we can deliver the images sooner in case of emergency.'
        },
        {
            title: 'What Payment method do you accept?',
            description: 'We accept most of the online payment including PayPal, We are accepting bank wire transfer too.'
        },
        {
            title: "May I get refund If I don't like photos?",
            description: "If you don’t like our photo retouching then you can get revisions that free of cost. Unfortunately we don’t have any refund policy right now."
        },
        {
            title: "Is there any discount if I send images regular basis?",
            description: "Yes there is discounts and offers. for more information about discounts please contact us."
        },
    ]


    return (
        <div className="w-full ">
            <div className="mx-auto w-full  rounded-2xl p-2">
                {
                    faqs.map((faq, index) => <Disclosure
                        key={index}
                    >
                        {({ open }) => (
                            <div>
                                <Disclosure.Button className="flex w-full justify-between rounded-lg  px-4 py-3 text-left text-sm font-medium border focus:outline-none focus-visible:ring  focus-visible:ring-opacity-75">
                                    <span className='text-lg font-bold'>{faq.title}</span>
                                    <ChevronUpIcon
                                        className={`${open ? 'rotate-180 transform' : ''
                                            } h-5 w-5 text-purple-500`}
                                    />
                                </Disclosure.Button>
                                <Disclosure.Panel className="px-4 pt-4 pb-2  text-gray-500">
                                    {faq.description}
                                </Disclosure.Panel>
                            </div>
                        )}
                    </Disclosure>)
                }

            </div>
        </div>
    );
};

export default FAQS;