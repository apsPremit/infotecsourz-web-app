"use client"
import { StateContext } from "@/context/StateProvider";
import { useContext } from "react";


const InputField = ({ label, event, disabled, valueField }) => {
    const { alignments } = useContext(StateContext)


    return (
        <div>
            <label className="relative" htmlFor="">
                <span className='block text-black font-semibold text-sm mb-2'>{label}</span>
                <input
                    disabled={disabled}
                    onChange={event}
                    value={alignments[valueField]}
                    type="text"
                    className="border disabled:border-shadow border-main focus:border-main outline-0 py-1.5 px-3 rounded text-sm w-full"
                />
                <span className="absolute top-9 bg-white px-2 text-sm right-3">%</span>
            </label>
        </div>
    );
};

export default InputField;