import React from "react";

interface BlogTitleInputProps {
    value: string;
    onChange: (value: string) => void;
    error?: string;
}

const BlogTitleInput: React.FC<BlogTitleInputProps> = ({ value, onChange, error }) => {
    return (
        <div className="mb-4">
            <label className="block mb-1 font-semibold">Title</label>
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Enter blog title"
                className={`w-full border rounded-lg p-3 transition focus:ring-2 ${error ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-primary-700"
                    }`}
            />
            {error && <p className="text-red-500 mt-1 text-sm">{error}</p>}
        </div>
    );
};

export default BlogTitleInput;
