'use client';
const SubscribedPackage = ({ session }) => {
  return (
    <div className='mg:grid-cols-2 mb-5 grid grid-cols-1 text-white lg:grid-cols-3  '>
      <div className='mt-3 rounded-lg bg-blue-500 px-5 pb-5 pt-2 shadow'>
        <p className='text-sm font-bold'>Subscribed Package</p>
        <p className='my-1 text-lg font-bold capitalize'>
          {session?.user?.subscription?.plan_name}
        </p>
        {session?.user?.subscription?.remaining_credit > 0 && (
          <p className='text-sm'>
            Remaining Credit:
            <span className='font-bold'>
              {session?.user?.subscription?.remaining_credit}
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default SubscribedPackage;
