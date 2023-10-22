"use client";
import React from 'react';
import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/20/solid'
const FAQS = () => {
    const faqs = [
        {
            title: 'How To Create An Order ?',
            description: 'Just signup and select services you required. Then upload file with instruction on Upload section in dashboard.'
        },
        {
            title: 'Do You Offer A Free Trial ?',
            description: 'We have $20 free trial credit. You can try our service for free. No credit card required!'
        },
        {
            title: 'What Services Do You Offer ?',
            description: 'We are Offering Product photo Retouching, Model Photo Retouching, Clipping Path, Background removal and many more.'
        },
        {
            title: "How Do I Pay ?",
            description: "We work now you can pay later. We will send you an invoice at the end of every project."
        },
        {
            title: "What Is The Turn Around Time",
            description: "Our normal turnaround time is 12-24 hours."
        },
        {
            title: "How Can I Share My Photos ?",
            description: "You can signup and upload your files to our secured server or you can attach your file link."
        },
        {
            title: "What Is The Pricing Per Image",
            description: "Our Stating price is $0.30/photo for more details please visit our pricing page."
        },
        {
            title: "Do You Have Any Revision?",
            description: "Yes, Of course. If you do not like retouching style you can always ask for revisions. We will do it without any extra charege."
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