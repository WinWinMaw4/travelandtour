/* eslint-disable @typescript-eslint/no-explicit-any */
/* PackageEditor.tsx */
import React from "react";
import EditorComponent from "@components/ui/EditorComponent";

interface PackageEditorProps {
    onChange: (value: any) => void;
    error?: string;
    value?: any;
}

const PackageEditor: React.FC<PackageEditorProps> = ({ onChange, error, value }) => {
    return (
        <div className="mb-4">
            <label className="block mb-1 font-semibold">Description</label>
            <div className={`rounded-lg border ${error ? "border-red-500" : "border-gray-300"}`}>
                <EditorComponent onChange={onChange} value={value} />
            </div>
            {error && <p className="text-red-500 mt-1 text-sm">{error}</p>}
        </div>
    );
};

export default PackageEditor;
