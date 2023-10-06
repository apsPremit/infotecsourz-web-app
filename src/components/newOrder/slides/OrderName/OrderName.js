import React, { useContext } from 'react';
import ImageBox from '../ImageBox/ImageBox';
import styles from '@/app/styles.module.css'
import SlideFoot from '../SlideFoot/SlideFoot';
import { StateContext } from '@/context/StateProvider';

const OrderName = () => {
    const { orderName, setOrderName, costObj, setCostObj } = useContext(StateContext)



    return (

        <div>
            <h2 className='text-xl  font-bold mb-5'>Give your photo file name </h2>
            <ImageBox />

            <div>
                <input
                    type="text"
                    required
                    className=' w-full  border border-[#1751D0] rounded-md outline-0  py-2 px-3 focus:border-main'
                    onChange={(e) => {
                        setOrderName(e.target.value)

                    }}
                    value={orderName ? orderName : ''}
                />
            </div>
        </div>

    );
};

export default OrderName;