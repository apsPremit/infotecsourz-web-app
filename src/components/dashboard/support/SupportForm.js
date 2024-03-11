'use client';
import { UserAuth } from '@/context/AuthProvider';
import sendSupportMessage from '@/utils/functions/sendSupportMessage';

import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { ImSpinner2 } from 'react-icons/im';

const SupportForm = () => {
  const { userData } = UserAuth();
  const [loading, setLoading] = useState(false);

  const sendMessage = async (e) => {
    setLoading(true);
    e.preventDefault();
    const form = e.target;
    const subject = form.subject.value;
    const message = form.message.value;
    const phone = form.phone.value;
    const messageData = { email: userData?.email, subject, message, phone };
    try {
      const sendResult = await sendSupportMessage(messageData);
      if (sendResult?.error) {
        setLoading(false);
        return toast.error(sendResult?.error);
      }
      if (sendResult?.message) {
        toast.success(sendResult?.message);
        setLoading(false);
        return form.reset();
      }
    } catch (error) {
      setLoading(false);
      console.log(error?.error);
    }
  };

  return (
    <section className='dark:bg-gray-900 bg-white'>
      <div className='mx-auto max-w-screen-md px-4 py-8 lg:py-16'>
        <h2 className='dark:text-white mb-4 text-center text-4xl font-extrabold tracking-tight text-gray-900'>
          Contact Us
        </h2>
        <p className='dark:text-gray-400 mb-8 text-center font-light text-gray-500 sm:text-xl lg:mb-16'>
          Got a technical issue? Want to send feedback about a our services?
          Need details about our Business plan? Let us know.
        </p>
        <form onSubmit={sendMessage} action='#' className='space-y-8'>
          <div>
            <label
              htmlFor='email'
              className='dark:text-gray-300 mb-2 block text-sm font-medium text-gray-900'
            >
              Your email
            </label>
            <input
              type='email'
              defaultValue={userData?.email}
              id='email'
              className='focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm'
              placeholder='name@flowbite.com'
              required=''
            />
          </div>

          <div>
            <label
              htmlFor='subject'
              className='dark:text-gray-300 mb-2 block text-sm font-medium text-gray-900'
            >
              Your Phone Number
            </label>
            <input
              defaultValue={userData?.name}
              type='text'
              id='phone'
              name='phone'
              className='focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-gray-900 shadow-sm'
              placeholder='Give you phone number'
              required
            />
          </div>

          <div>
            <label
              htmlFor='subject'
              className='dark:text-gray-300 mb-2 block text-sm font-medium text-gray-900'
            >
              Subject
            </label>
            <input
              type='text'
              id='subject'
              name='subject'
              className='focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-gray-900 shadow-sm'
              placeholder='Let us know how we can help you'
              required
            />
          </div>

          <div className='sm:col-span-2'>
            <label
              htmlFor='message'
              className='dark:text-gray-400 mb-2 block text-sm font-medium text-gray-900'
            >
              Your message
            </label>
            <textarea
              id='message'
              name='message'
              rows={6}
              className='focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm'
              placeholder='Leave a comment...'
            />
          </div>
          {loading && (
            <div className='flex items-center justify-start text-xl text-main lg:ml-5'>
              <ImSpinner2 className='animate-spin' />
            </div>
          )}

          <button
            type='submit'
            className='rounded bg-main px-3 py-2.5 text-white hover:bg-mainHover '
          >
            Send Message
          </button>
        </form>
      </div>
      <Toaster position='top-center' reverseOrder={false} />
    </section>
  );
};

export default SupportForm;
