import React, { useContext } from 'react';
import styles from '@/app/styles.module.css';
import { StateContext } from '@/context/StateProvider';
import { redirect, useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import { useSession } from 'next-auth/react';
import { useAuth } from '@/context/AuthProvider';

const SlideFoot = ({ handlePrev, handleNext, currentSlide }) => {
  const {
    photoType,
    modelCost,
    orderName,
    formats,
    platforms,
    backgroundColor,
    alignments,
    openOptions,
    productTotalCost,
    modelTotalCost,
    selectedPackage,
  } = useContext(StateContext);

  const router = useRouter();
  const session = useSession();
  const user = session?.data?.user;
  const { userData } = useAuth();

  const goToNextPage = () => {
    if (currentSlide === 7) {
      return router.push('/dashboard/upload');
    }
    if (
      !userData?.subscription ||
      (userData?.subscription?.plan_type !== 'pay-as-go' &&
        userData?.subscription?.remaining_credit < 1)
    ) {
      return Swal.fire({
        title: 'You have no subscription, Please subscription to any plan',
        icon: 'warning',
        confirmButtonText: 'Upgrade',
      }).then((result) => {
        if (result.isConfirmed) {
          router.push('/dashboard/pricing');
        }
      });
    } else {
      handleNext();
    }
  };

  return (
    <div className='mt-5 flex items-center justify-between'>
      <p
        className={`text-md mt-2 font-bold text-black ${
          currentSlide === 1 ||
          userData?.subscription?.plan_type !== 'pay-as-go'
            ? 'opacity-0'
            : ''
        }`}
      >
        ${photoType === 'model' ? modelTotalCost : productTotalCost}
        <span className='text-sm font-normal'>/image</span>
      </p>
      <div className=''>
        <button
          disabled={currentSlide === 1}
          onClick={handlePrev}
          className={`mr-3 ${styles.btn_shadow}`}
        >
          Back
        </button>
        <button
          onClick={goToNextPage}
          disabled={
            (currentSlide === 1 && photoType === '') ||
            (currentSlide === 2 && orderName === '') ||
            (currentSlide === 3 &&
              Object.values(formats).every((value) => value === false)) ||
            (currentSlide === 4 && backgroundColor === '') ||
            (currentSlide === 5 &&
              Object.values(platforms).every((value) => value === false)) ||
            (currentSlide == 6 &&
              !(
                openOptions.isOriginalAspect ||
                alignments.ratio ||
                alignments.horizontalAlignment ||
                alignments.verticalAlignment ||
                alignments.marginOverall ||
                alignments.marginLeft ||
                alignments.marginRight ||
                alignments.marginTop ||
                alignments.marginBottom
              ))
          }
          className={styles.btn_main}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SlideFoot;
