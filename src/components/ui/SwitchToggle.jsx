import { useState } from 'react';
import { Switch } from '@headlessui/react';

const SwitchToggle = ({ isChecked, toggler, label }) => {
  return (
    <div className=''>
      <Switch
        checked={isChecked}
        onChange={toggler}
        className={`${isChecked ? 'bg-main' : 'bg-slate-200'}
            relative inline-flex h-[16px] w-[28px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
      >
        <span className='sr-only'>Use setting</span>
        <span
          aria-hidden='true'
          className={`${isChecked ? 'translate-x-3' : 'translate-x-0'}
              pointer-events-none inline-block h-[12px] w-[12px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
        />
      </Switch>
      <span className='ml-2 text-sm'>{label}</span>
    </div>
  );
};

export default SwitchToggle;
