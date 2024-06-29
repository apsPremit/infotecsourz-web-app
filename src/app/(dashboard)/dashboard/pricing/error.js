'use client';

const Error = ({ error, reset }) => {
  return (
    <div className='flex flex-col items-center space-y-3 '>
      <h2>Something Went wrong</h2>
      <button className='rounded bg-shadow px-2 py-1.5' onClick={() => reset()}>
        Try again
      </button>
    </div>
  );
};
export default Error;
