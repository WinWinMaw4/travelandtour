/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

interface Props {
    label?: string;
    preview: string | null;
    onChange: (file: File | null) => void;
}

const FileUploader: React.FC<Props> = ({ label = "Image", preview, onChange }) => {
    const inputRef = React.useRef<HTMLInputElement | null>(null);

    const triggerUpload = () => {
        inputRef.current?.click();
    };

    return (
        <div className="space-y-3">
            <p className="text-sm font-medium text-gray-700">{label}</p>

            {/* Upload Area */}
            <div className="flex items-center space-x-3">
                <button
                    type="button"
                    onClick={triggerUpload}
                    className="px-4 py-2 rounded-md bg-blue-800 text-white text-sm hover:bg-blue-900 transition active:scale-[0.98]"
                >
                    Upload Image
                </button>

                <input
                    type="file"
                    accept="image/*"
                    ref={inputRef}
                    className="hidden"
                    onChange={(e) => onChange(e.target.files?.[0] || null)}
                />

                {preview && (
                    <span className="text-xs text-gray-500">
                        Selected: {preview ? "1 file" : "None"}
                    </span>
                )}
            </div>

            {/* Preview */}
            {preview && (
                <div className="rounded-lg overflow-hidden shadow-md border bg-white">
                    <img
                        src={preview}
                        className="w-full h-40 object-contain"
                        alt="preview"
                    />
                </div>
            )}
        </div>
    );
};

export default FileUploader;
