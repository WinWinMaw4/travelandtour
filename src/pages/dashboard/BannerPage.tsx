/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useGetEndpointQuery, useInvalidateEndpointMutation } from "@services/apiSlice";
import { endpoints } from "@services/endpoints";
import toast from "react-hot-toast";
import ConfirmModal from "@components/share/ConfirmModal";

const BannerPage: React.FC = () => {
    const { data, isLoading, isError, refetch } = useGetEndpointQuery(endpoints.banners);
    const [deleteBanner, { isLoading: isDeleting }] = useInvalidateEndpointMutation();

    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [showConfirm, setShowConfirm] = useState(false);

    if (isLoading) return <p>Loading banners...</p>;
    if (isError) return <p className="text-red-500">Failed to load banners.</p>;

    const banners = data?.data || data || [];

    const handleDelete = (id: number) => {
        setSelectedId(id);
        setShowConfirm(true);
    };

    const confirmDelete = async () => {
        if (!selectedId) return;
        try {
            const res = await deleteBanner({
                url: `${endpoints.banners}/${selectedId}`,
                method: "DELETE",
            }).unwrap();

            toast.success(res?.message || "Banner deleted successfully");
            refetch();
        } catch (error: any) {
            toast.error(error?.data?.message || "Failed to delete banner");
        } finally {
            setShowConfirm(false);
            setSelectedId(null);
        }
    };

    return (
        <div className="max-w-[1420px] mx-auto">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">Banners</h2>

                <div className="mb-6">
                    <Link
                        to="/dashboard/banner/create"
                        className="bg-emerald-700 text-white px-4 py-2 rounded hover:bg-emerald-800"
                    >
                        + Add Banner
                    </Link>
                </div>
            </div>

            <div className="flex flex-wrap -mx-2">
                {banners.length > 0 ? (
                    banners.map((banner: any) => (
                        <div key={banner.id} className="w-1/2 sm:w-1/2 lg:w-1/3 p-2">
                            <div className="border rounded shadow hover:shadow-lg overflow-hidden w-full h-full">
                                <div className="w-full aspect-[4/3] md:aspect-[16/9] bg-gray-100">
                                    <img
                                        src={
                                            banner.image?.startsWith("http")
                                                ? banner.image
                                                : `${import.meta.env.VITE_API_URL}${banner.image}`
                                        }
                                        alt={banner.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                <div className="p-4">
                                    <h3 className="md:text-lg font-semibold mb-2 line-clamp-2">
                                        {banner.link}
                                    </h3>
                                    <div className="flex gap-2">
                                        <Link
                                            to={`/dashboard/banner/edit/${banner.id}`}
                                            className="bg-yellow-400 px-3 py-1 rounded hover:bg-yellow-500"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(banner.id)}
                                            className="bg-red-500 px-3 py-1 rounded text-white hover:bg-red-600"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No banners found.</p>
                )}
            </div>

            {/* ✅ Confirmation Modal */}
            <ConfirmModal
                open={showConfirm}
                onCancel={() => setShowConfirm(false)}
                onConfirm={confirmDelete}
                loading={isDeleting}
                title="Delete Banner"
                message="Are you sure you want to delete this banner? This action cannot be undone."
            />
        </div>
    );
};

export default BannerPage;
