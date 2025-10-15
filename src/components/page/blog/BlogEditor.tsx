/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import EditorComponent from "@components/ui/EditorComponent";

interface BlogEditorProps {
    onChange: (value: any) => void;
    error?: string;
    value?: any; // ⚡ add this line to allow existing content

}

const BlogEditor: React.FC<BlogEditorProps> = ({ onChange, error, value }) => {
    return (
        <div className="mb-4">
            <label className="block mb-1 font-semibold">Content</label>
            <div className={`rounded-lg ${error ? "border-red-500" : "border-gray-300"}`}>
                <EditorComponent onChange={onChange} value={value} />
            </div>
            {error && <p className="text-red-500 mt-1 text-sm">{error}</p>}
        </div>
    );
};

export default BlogEditor;
