"use client";
import React from 'react';
import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/20/solid'
const FAQS = () => {
    const faqs = [
        {
            title: 'How to start ?',
            description: 'Just signup and upload file with instruction on Upload section in dashboard'
        },
        {
            title: 'What are the photos that you edit ?',
            description: 'We edit and retouch all types of  photos. For example- Electronics product, Food Items, Apparel, Cosmetics, machinery/parts, farming equipment, and more.'
        },
        {
            title: 'Can I get fast price quote ?',
            description: 'Yes, we offer fast quote service on any  photo editing request. You will get response within 30 minutes . Request Quote Now.'
        },
        {
            title: "How long the photo editing will take?",
            description: "The general turnaround is 24-72 hours for up to 1000 photos. However depending on urgency, we encourage our customers to get in touch with us directly for faster turnarounds."
        },
        {
            title: "Can I share photos via Dropbox, Google Drive, Wetransfer",
            description: "Yes you can share photos through Dropbox, Wetransfer, Google drive to our E-mail: contact@infotecsourz.com"
        },
        {
            title: "What if I don't like the editing photos?",
            description: "You will get revisions for each photos. It's free of cos"
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