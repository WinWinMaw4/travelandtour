/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, ChangeEvent, useEffect } from "react";
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

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setImageFile(file);
        if (file) setPreview(URL.createObjectURL(file));
        else setPreview(defaultPreview);
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
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
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
                    ? "bg-emerald-400 cursor-not-allowed"
                    : "bg-emerald-600 hover:bg-emerald-700"
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
