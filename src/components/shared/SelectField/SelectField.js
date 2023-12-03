import React from "react";

const SelectField = ({
  options,
  label,
  event,
  defaultValue,
  value,
  disabled,
}) => {
  return (
    <div className="w-full">
      <label className="w-full" htmlFor="">
        <span className="block text-black font-semibold text-sm mb-2">
          {label}
        </span>
        <select
          disabled={disabled}
          onChange={event}
          value={value || defaultValue}
          className="py-1.5 rounded px-3 border text-sm focus:border-main outline-0 border-main w-full accent-main font-light"
          name=""
          id=""
        >
          <option value={defaultValue} className="text-sm">
            {defaultValue}
          </option>

          {options.map((item) => (
            <option key={item?.id} value={item?.value} className="text-sm">
              {item?.title}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default SelectField;
