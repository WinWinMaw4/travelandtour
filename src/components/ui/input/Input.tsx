/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

const Input: React.FC<InputProps> = ({ label, error, ...props }) => {
    return (
        <div className="w-full">
            {label && (
                <label className="block text-sm font-medium mb-1">{label}</label>
            )}

            <input
                {...props}
                required={props.required}
                className={`
                    w-full border p-3 rounded-lg outline-none
                    transition-all duration-200
                    focus:border-primary-600 focus:ring-2 focus:ring-primary-300
                    ${error ? "border-red-500" : "border-gray-300"}
                    ${props.className || ""}
                `}
            />

            {error && (
                <p className="text-red-500 text-sm mt-1">{error}</p>
            )}
        </div>
    );
};

export default Input;
