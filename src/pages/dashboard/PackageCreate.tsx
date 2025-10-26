/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useInvalidateEndpointMutation } from "@services/apiSlice";
import { endpoints } from "@services/endpoints";
import toast, { Toaster } from "react-hot-toast";

interface ValidationErrors {
    title?: string;
    price?: string;
    description?: string;
    coverImage?: string;
    [key: string]: string | undefined;
}

const PackageCreate = () => {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState<number | string>("");
    const [description, setDescription] = useState("");
    const [coverImage, setCoverImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [errors, setErrors] = useState<ValidationErrors>({});

    const navigate = useNavigate();
    const [createPackage, { isLoading }] = useInvalidateEndpointMutation();

    // Handle image selection
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setCoverImage(file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result as string);
            reader.readAsDataURL(file);
        } else {
            setPreview(null);
        }
    };

    // Handle submit
    const handleSubmit = async () => {
        setErrors({}); // clear previous errors

        const formData = new FormData();
        formData.append("title", title);
        formData.append("price", price.toString());
        formData.append("description", description);
        if (coverImage) formData.append("coverImage", coverImage);

        try {
            const res = await createPackage({
                url: endpoints.packages,
                method: "POST",
                body: formData,
            }).unwrap();

            if (res?.message === "Package created successfully") {
                toast.success("Package created successfully.", {
                    duration: 4000, // Toast will disappear after 4 seconds
                });
                navigate(-1);
            } else if (res?.errors) {
                setErrors(res.errors);
            }
        } catch (err: any) {
            if (err?.data?.errors) {
                setErrors(err.data.errors);
            } else {
                console.error(err);
            }
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6 space-y-6 bg-white rounded-2xl shadow mt-10">
            <h1 className="text-3xl font-bold text-gray-800">Create New Package</h1>

            {/* Title Input */}
            <div>
                <label className="block font-semibold text-gray-700 mb-2">Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className={`w-full border rounded-lg p-2 focus:outline-none focus:ring-2 ${errors.title ? "border-red-500" : "border-gray-300"
                        }`}
                    placeholder="Enter package title"
                />
                {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
            </div>

            {/* Price Input */}
            <div>
                <label className="block font-semibold text-gray-700 mb-2">Price (USD)</label>
                <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className={`w-full border rounded-lg p-2 focus:outline-none focus:ring-2 ${errors.price ? "border-red-500" : "border-gray-300"
                        }`}
                    placeholder="Enter package price"
                />
                {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
            </div>

            {/* Description Input */}
            <div>
                <label className="block font-semibold text-gray-700 mb-2">Description</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className={`w-full border rounded-lg p-2 h-32 focus:outline-none focus:ring-2 ${errors.description ? "border-red-500" : "border-gray-300"
                        }`}
                    placeholder="Enter package details"
                />
                {errors.description && (
                    <p className="text-red-500 text-sm mt-1">{errors.description}</p>
                )}
            </div>

            {/* Cover Image Upload */}
            <div>
                <label className="block font-semibold text-gray-700 mb-2">Cover Image</label>

                {/* Custom File Upload Button */}
                <div className="flex items-center">
                    <label
                        htmlFor="coverImage"
                        className="cursor-pointer inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-5 h-5 mr-2"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                        </svg>
                        Choose Image
                    </label>

                    <input
                        id="coverImage"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                    />

                    {preview && (
                        <p className="ml-3 text-sm text-gray-600 truncate max-w-[200px]">
                            {preview ? "Image selected" : "No file chosen"}
                        </p>
                    )}
                </div>

                {errors.coverImage && (
                    <p className="text-red-500 text-sm mt-1">{errors.coverImage}</p>
                )}

                {/* Preview Section */}
                {preview && (
                    <div className="mt-3 rounded-lg border overflow-hidden max-w-sm aspect-[3/2]">
                        <img
                            src={preview}
                            alt="Preview"
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}
            </div>


            {/* Submit Button */}
            <div className="text-right">
                <button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className={`px-6 py-2 rounded-full text-white font-semibold transition ${isLoading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-primary-700 hover:bg-primary-800"
                        }`}
                >
                    {isLoading ? "Creating..." : "Create Package"}
                </button>
            </div>
        </div>
    );
};

export default PackageCreate;
