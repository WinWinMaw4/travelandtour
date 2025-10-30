import React, { type ChangeEvent } from "react";

interface BannerCoverUploaderProps {
    preview: string | null;
    onFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const BannerCoverUploader: React.FC<BannerCoverUploaderProps> = ({ preview, onFileChange }) => {
    return (
        <div>
            <label className="block mb-1 font-semibold">Banner Image</label>
            <input
                type="file"
                accept="image/*"
                onChange={onFileChange}
                className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 
                   file:rounded-md file:border-0 file:text-sm file:font-semibold 
                   file:bg-blue-50 file:text-primary-600 hover:file:bg-primary-100"
            />
            {preview && (
                <div className="mt-3 rounded-lg overflow-hidden shadow aspect-video w-full">
                    <img
                        src={preview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                    />
                </div>
            )}
        </div>
    );
};

export default BannerCoverUploader;
