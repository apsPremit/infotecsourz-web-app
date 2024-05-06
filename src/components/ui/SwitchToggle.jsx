import { Switch } from '@headlessui/react';

const SwitchToggle = ({ isChecked, toggler, label }) => {
  const isLongLabel = label.length > 17;

  // Trim label text if it exceeds 15 characters
  const trimmedLabel = isLongLabel ? label.substring(0, 17) + '...' : label;
  return (
    <div className='cursor-pointer'>
      <label className='flex items-center cursor-pointer' htmlFor={label}>
        <Switch
          id={label}
          checked={isChecked}
          onChange={toggler}
          className={`${isChecked ? 'bg-main' : 'bg-slate-200'}
            relative inline-flex h-[16px] w-[28px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
        >
          <span
            aria-hidden='true'
            className={`${isChecked ? 'translate-x-3' : 'translate-x-0'}
              pointer-events-none inline-block h-[12px] w-[12px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
          />
        </Switch>
        <span title={label} className='ml-2 text-sm'>
          {isLongLabel ? trimmedLabel : label}
        </span>
      </label>
    </div>
  );
};

export default SwitchToggle;
