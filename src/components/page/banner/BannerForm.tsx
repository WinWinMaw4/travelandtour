import React, { useState, ChangeEvent, FormEvent } from "react";
import BannerCoverUploader from "./BannerUploader";

interface BannerFormData {
    title: string;
    link: string;
    imageFile: File | null;
}

interface BannerFormProps {
    onSubmit: (data: BannerFormData) => void;
}

const BannerForm: React.FC<BannerFormProps> = ({ onSubmit }) => {
    const [title, setTitle] = useState("");
    const [link, setLink] = useState("");
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImageFile(e.target.files[0]);
            setPreview(URL.createObjectURL(e.target.files[0]));
        }
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onSubmit({ title, link, imageFile });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto">
            <div>
                <label className="block mb-1 font-semibold">Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter banner title"
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                />
            </div>

            <div>
                <label className="block mb-1 font-semibold">Link (optional)</label>
                <input
                    type="text"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    placeholder="Enter link (optional)"
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                />
            </div>

            <BannerCoverUploader preview={preview} onFileChange={handleFileChange} />

            <button
                type="submit"
                className="bg-emerald-600 text-white px-6 py-2 rounded hover:bg-emerald-700"
            >
                Create Banner
            </button>
        </form>
    );
};

export default BannerForm;
