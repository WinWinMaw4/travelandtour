/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, type ChangeEvent } from "react";
import BannerCoverUploader from "./BannerUploader";

interface BannerFormProps {
    onSubmit: (formData: FormData) => void;
    errors?: { [key: string]: string };
    defaultLink?: string;
    defaultPreview?: string | null;
    isEdit?: boolean;
    isLoading?: boolean;
}

const BannerForm: React.FC<BannerFormProps> = ({
    onSubmit,
    errors = {},
    defaultLink = "",
    defaultPreview = null,
    isEdit = false,
    isLoading = false,
}) => {
    const [link, setLink] = useState(defaultLink);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(defaultPreview);
    const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

    // update initial values when editing existing banner
    useEffect(() => {
        setLink(defaultLink);
        setPreview(defaultPreview);
    }, [defaultLink, defaultPreview]);

    const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

    // Assuming you have a state for the file error, e.g.,
    // const [fileError, setFileError] = useState<string | null>(null);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;

        // Reset previous error
        // setFileError(null); 

        if (file) {
            if (file.size > MAX_FILE_SIZE) {
                // ⭐ VALIDATION FAILED: File is too large
                alert("Image must be smaller than 10MB"); // Or display error in your UI
                // setFileError("Image must be smaller than 10MB"); 

                // Clear the input and reset states to prevent the large file from being uploaded
                e.target.value = '';
                setImageFile(null);
                setPreview(defaultPreview);
                return; // Stop processing
            }

            // ⭐ VALIDATION PASSED: File is valid
            setImageFile(file);
            setPreview(URL.createObjectURL(file));

        } else {
            // No file selected (input cleared or cancelled)
            setImageFile(null);
            setPreview(defaultPreview);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const validationErrors: { [key: string]: string } = {};
        if (!isEdit && !imageFile) validationErrors.image = "Image is required";

        if (Object.keys(validationErrors).length > 0) {
            setFormErrors(validationErrors);
            return;
        }

        setFormErrors({});
        const formData = new FormData();
        formData.append("link", link);
        if (imageFile) formData.append("image", imageFile);

        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto">
            <div>
                <label className="block mb-1 font-semibold">Link (optional)</label>
                <input
                    type="text"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    placeholder="Enter link (optional)"
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-400"
                />
                {errors.link && <p className="text-red-500 text-sm">{errors.link}</p>}
            </div>

            <BannerCoverUploader preview={preview} onFileChange={handleFileChange} />
            {formErrors.image && <p className="text-red-500 text-sm">{formErrors.image}</p>}
            {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}

            <button
                type="submit"
                disabled={isLoading}
                className={`px-6 py-2 rounded text-white ${isLoading
                    ? "bg-primary-400 cursor-not-allowed"
                    : "bg-primary-600 hover:bg-primary-700"
                    }`}
            >
                {isLoading
                    ? isEdit
                        ? "Updating..."
                        : "Creating..."
                    : isEdit
                        ? "Update Banner"
                        : "Create Banner"}
            </button>
        </form>
    );
};

export default BannerForm;
