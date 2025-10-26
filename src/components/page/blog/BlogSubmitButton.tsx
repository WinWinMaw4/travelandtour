import React from "react";

interface BlogSubmitButtonProps {
    onClick: () => void;
    isLoading: boolean;
    mode?: "create" | "update"; // ✅ new prop
}

const BlogSubmitButton: React.FC<BlogSubmitButtonProps> = ({ onClick, isLoading, mode = "create" }) => {
    const getText = () => {
        if (isLoading) return mode === "update" ? "Updating..." : "Creating...";
        return mode === "update" ? "Update Blog" : "Create Blog";
    };

    return (
        <button
            onClick={onClick}
            disabled={isLoading}
            className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold 
                 hover:bg-primary-700 transition disabled:opacity-50 mt-4"
        >
            {getText()}
        </button>
    );
};

export default BlogSubmitButton;
