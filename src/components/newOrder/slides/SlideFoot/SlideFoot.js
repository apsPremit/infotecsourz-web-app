import React, { useContext } from 'react';
import styles from '@/app/styles.module.css'
import { StateContext } from '@/context/StateProvider';
import { redirect, useRouter } from 'next/navigation'

const SlideFoot = ({ handlePrev, handleNext, currentSlide }) => {
    const { photoType, modelCost, orderName, formats, backgroundColor, alignments, openOptions, productTotalCost, modelTotalCost } = useContext(StateContext)
    const router = useRouter()

    const goToNextPage = () => {
        if (currentSlide === 6) {
            return router.push('/dashboard/upload')

        }
        handleNext()
    }

    return (
        <div className='flex justify-between items-center mt-5'>
            <p className={`font-bold text-black text-md mt-2 ${currentSlide === 1 ? 'opacity-0' : ''}`}>${photoType === 'model' ? modelTotalCost : productTotalCost}
                <span className='font-normal text-sm'>/image</span>
            </p>
            <div className=''>
                <button disabled={currentSlide === 1} onClick={handlePrev} className={`mr-3 ${styles.btn_shadow}`}>Back</button>
                <button
                    onClick={goToNextPage}
                    disabled={
                        currentSlide === 1 &&
                        photoType === "" ||
                        currentSlide === 2 && orderName === "" ||
                        currentSlide === 3 && Object.values(formats).every((value) => value === false) ||
                        currentSlide === 4 && backgroundColor === "" ||
                        currentSlide == 5 && !(openOptions.isOriginalAspect || alignments.ratio || alignments.horizontalAlignment || alignments.verticalAlignment || alignments.marginOverall || alignments.marginLeft || alignments.marginRight || alignments.marginTop || alignments.marginBottom)
                    }
                    className={styles.btn_main}>Next</button>
            </div>
        </div>
    );
};

export default SlideFoot;