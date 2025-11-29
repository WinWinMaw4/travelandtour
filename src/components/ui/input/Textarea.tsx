import React from "react";

interface TextareaProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
}

const Textarea: React.FC<TextareaProps> = ({ label, error, ...props }) => {
    return (
        <div className="w-full">
            {label && (
                <label className="block text-sm font-medium mb-1">{label}</label>
            )}

            <textarea
                {...props}
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

export default Textarea;
