/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useInvalidateEndpointMutation, useGetEndpointQuery } from "@services/apiSlice";
import { endpoints } from "@services/endpoints";
import toast, { Toaster } from "react-hot-toast";

interface ValidationErrors {
    title?: string;
    price?: string;
    description?: string;
    coverImage?: string;
    [key: string]: string | undefined;
}

const PackageEdit = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const { data: pkgData, isLoading: isFetching } = useGetEndpointQuery(`${endpoints.packages}/${id}`);
    const [updatePackage, { isLoading: isUpdating }] = useInvalidateEndpointMutation();

    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [coverImage, setCoverImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [errors, setErrors] = useState<ValidationErrors>({});

    // Populate data when package loads
    useEffect(() => {
        if (pkgData) {
            setTitle(pkgData.title || "");
            setPrice(pkgData.price?.toString() || "");
            setDescription(pkgData.description || "");
            setPreview(
                pkgData.coverImage?.startsWith("http")
                    ? pkgData.coverImage
                    : `${import.meta.env.VITE_API_BASE_URL || ""}${pkgData.coverImage}`
            );
        }
    }, [pkgData]);

    // Handle file change with preview
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setCoverImage(file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result as string);
            reader.readAsDataURL(file);
        } else {
            setPreview(pkgData?.coverImage || null);
        }
    };

    // Handle update submit
    const handleSubmit = async () => {
        setErrors({});

        const formData = new FormData();
        formData.append("title", title);
        formData.append("price", price);
        formData.append("description", description);
        if (coverImage) formData.append("coverImage", coverImage);

        try {
            const res = await updatePackage({
                url: `${endpoints.packages}/${id}`,
                method: "PATCH",
                body: formData,
            }).unwrap();

            if (res?.message === "Package updated successfully") {
                toast.success("Package updated successfully!");
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

    if (isFetching)
        return (
            <div className="text-center py-20 text-gray-500">
                Loading package data...
            </div>
        );

    return (
        <div className="max-w-3xl mx-auto p-6 space-y-6 bg-white rounded-2xl shadow mt-10">
            <Toaster position="top-right" />
            <h1 className="text-3xl font-bold text-gray-800">Edit Package</h1>

            {/* Title */}
            <div>
                <label className="block font-semibold text-gray-700 mb-2">Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className={`w-full border rounded-lg p-2 focus:ring-emerald-500 focus:border-emerald-500 ${errors.title ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
            </div>

            {/* Price */}
            <div>
                <label className="block font-semibold text-gray-700 mb-2">Price</label>
                <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className={`w-full border rounded-lg p-2 focus:ring-emerald-500 focus:border-emerald-500 ${errors.price ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
            </div>

            {/* Description */}
            <div>
                <label className="block font-semibold text-gray-700 mb-2">Description</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={5}
                    className={`w-full border rounded-lg p-2 focus:ring-emerald-500 focus:border-emerald-500 ${errors.description ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.description && (
                    <p className="text-red-500 text-sm mt-1">{errors.description}</p>
                )}
            </div>

            {/* Cover Image */}
            <div>
                <label className="block font-semibold text-gray-700 mb-2">Cover Image</label>

                {/* Custom File Upload */}
                <div className="flex items-center">
                    <label
                        htmlFor="coverImage"
                        className="cursor-pointer inline-flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
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
                        Choose File
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

                {preview && (
                    <div className="mt-3 rounded-lg border overflow-hidden aspect-[16/9]">
                        <img
                            src={preview}
                            alt="Preview"
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}
            </div>

            <button
                onClick={handleSubmit}
                disabled={isUpdating}
                className="bg-emerald-700 hover:bg-emerald-800 text-white px-6 py-2 rounded-lg font-semibold transition"
            >
                {isUpdating ? "Updating..." : "Update Package"}
            </button>
        </div>
    );
};

export default PackageEdit;
