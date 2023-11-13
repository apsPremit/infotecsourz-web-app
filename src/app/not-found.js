import Link from 'next/link';
import React from 'react';
export const metadata = {
    title: "Not Found | Infotecsourz",
    description: "Photo Retouching App"
}
const notFound = () => {
    return (
        <div>
            <div className='w-screen min-h-screen bg-main flex justify-center items-center' >
                <div className='bg-white w-full md:w-1/3 min-h-[300px] flex flex-col justify-center items-center rounded p-5 text-center'>
                    <h1 className='text-7xl font-bold'>4<span className='text-main px-3'>0</span>4</h1>
                    <h3 className='uppercase font-bold text-lg my-3'>The page you requested not found</h3>
                    <Link href='/dashboard'>
                        <button className='px-3 py-2 rounded mt-5 hover:bg-mainHover bg-main text-white'>Go to Home Page</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default notFound;