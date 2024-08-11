import { Switch } from '@headlessui/react';

const PlanToggle = ({ isChecked, toggler, label }) => {
  // Trim label text if it exceeds 15 characters

  return (
    <div className='cursor-pointer'>
      <label className='flex items-center cursor-pointer' htmlFor={label}>
        <span title className='ml-2 text-lg'>
          Monthly Plans
        </span>
        <Switch
          id={label}
          checked={isChecked}
          onChange={toggler}
          className={`${isChecked ? 'bg-main' : 'bg-slate-200'}
            relative inline-flex h-[27px] w-[50px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75 mx-3`}
        >
          <span
            aria-hidden='true'
            className={`${isChecked ? 'translate-x-5' : 'translate-x-0'}
              pointer-events-none inline-block h-[24px] w-[24px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
          />
        </Switch>
        <span className='ml-2 text-lg'>Yearly Plans</span>
      </label>
    </div>
  );
};

export default PlanToggle;
