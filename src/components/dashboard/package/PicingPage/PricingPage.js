'use client';
import { baseUrl } from '@/utils/functions/baseUrl';
import React, { useEffect, useState } from 'react';
import SinglePackage from '../SinglePackage/SinglePackage';
import PricingTable from '@/components/shared/PricingTable/PricingTable';
import { useSession } from 'next-auth/react';
import CustomPlan from '../SinglePackage/CustomPlan';
import PlanToggle from '@/components/ui/PlanToggle';

const PricingPage = ({ plans }) => {
  const [planType, setPlanType] = useState('monthly');
  const session = useSession();
  const user = session?.data?.user;
  const monthlyPlans = plans.filter(
    (plan) => plan.bill_type === 'monthly' || plan.bill_type === 'custom'
  );
  const yearlyPlans = plans.filter((plan) => plan.bill_type === 'yearly') || [];
  const togglePlanType = () => {
    setPlanType((prevPlanType) =>
      prevPlanType === 'monthly' ? 'yearly' : 'monthly'
    );
  };
  const currentPlans = planType === 'monthly' ? monthlyPlans : yearlyPlans;
  return (
    <div>
      <div className='flex justify-center items-center my-5'>
        <PlanToggle
          toggler={togglePlanType}
          isChecked={planType === 'yearly'}
        />
      </div>
      <div className='mb-10 grid grid-cols-1 gap-5 lg:grid-cols-3 lg:px-10'>
        {currentPlans?.map((plan) => (
          <SinglePackage key={plan._id} plan={plan} />
        ))}
        {plans?.length > 0 && planType === 'monthly' && (
          <CustomPlan facilities={plans[0].facilities} />
        )}
      </div>
      <PricingTable />
    </div>
  );
};

export default PricingPage;
