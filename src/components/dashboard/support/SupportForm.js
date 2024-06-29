'use client';
import config from '@/config';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { ImSpinner2 } from 'react-icons/im';

const SupportForm = () => {
  const session = useSession();
  const user = session?.data?.user;
  const [loading, setLoading] = useState(false);

  const sendMessage = async (e) => {
    setLoading(true);
    e.preventDefault();
    const form = e.target;
    const subject = form.subject.value;
    const message = form.message.value;
    const phone = form.phone.value;
    const messageData = {
      user_id: user?.userId,
      subject,
      description: message,
      phone,
    };
    console.log(messageData);
    try {
      const supportUrl = `${config.api_base_url}/supports/create-support`;
      const res = await fetch(supportUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.accessToken}`,
        },
        body: JSON.stringify(messageData),
      });
      if (!res.ok) throw new Error(res.statusText);
      form.reset();
      toast.success('request sent');
      setLoading(false);
    } catch (error) {
      console.log('er', error);
      toast.error(error.message);
      form.reset();
      setLoading(false);
    }
  };

  return (
    <section className='bg-white dark:bg-gray-900'>
      <div className='py-8 lg:py-16 px-4 mx-auto max-w-screen-md'>
        <h2 className='mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white'>
          Contact Us
        </h2>
        <p className='mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl'>
          Got a technical issue? Want to send feedback about a our services?
          Need details about our Business plan? Let us know.
        </p>
        <form onSubmit={sendMessage} action='#' className='space-y-8'>
          <div>
            <label
              htmlFor='email'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'
            >
              Your email
            </label>
            <input
              type='email'
              defaultValue={user?.email}
              id='email'
              className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light'
              placeholder='name@flowbite.com'
              required=''
            />
          </div>

          <div>
            <label
              htmlFor='subject'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'
            >
              Your Phone Number
            </label>
            <input
              type='text'
              id='phone'
              name='phone'
              className='block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light'
              placeholder='Give you phone number'
              required
            />
          </div>

          <div>
            <label
              htmlFor='subject'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'
            >
              Subject
            </label>
            <input
              type='text'
              id='subject'
              name='subject'
              className='block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light'
              placeholder='Let us know how we can help you'
              required
            />
          </div>

          <div className='sm:col-span-2'>
            <label
              htmlFor='message'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400'
            >
              Your message
            </label>
            <textarea
              id='message'
              name='message'
              rows={6}
              className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
              placeholder='Leave a comment...'
            />
          </div>
          {loading && (
            <div className='flex items-center lg:ml-5 justify-start text-xl text-main'>
              <ImSpinner2 className='animate-spin' />
            </div>
          )}

          <button
            type='submit'
            className='bg-main px-3 py-2.5 text-white hover:bg-mainHover rounded '
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
