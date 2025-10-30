/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useGetEndpointQuery, useInvalidateEndpointMutation } from "@services/apiSlice"; // ✅ adjust import if needed
import { endpoints } from "@services/endpoints"; // ✅ adjust import if needed
import { useSelector } from "react-redux";
import type { RootState } from "@store/index";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import ConfirmModal from "@components/share/ConfirmModal";

interface PackageItem {
    id: number;
    title: string;
    price: number;
    description: string;
    coverImage?: string;
}

const PackagesPage: React.FC = () => {
    const navigate = useNavigate();

    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [showConfirm, setShowConfirm] = useState(false);
    const [deletePackage, { isLoading: isDeleting }] = useInvalidateEndpointMutation();


    // ✅ Fetch from API
    const { data, isLoading, isError, refetch } = useGetEndpointQuery(`${endpoints.packages}`);
    const isAuthenticated = useSelector(
        (state: RootState) => state.auth.isAuthenticated
    );

    if (isLoading) {
        return (
            <section id="tours" className="max-w-6xl mx-auto px-6 py-20 text-center">
                <h3 className="text-3xl font-semibold mb-12">Our Packages</h3>
                <p className="text-gray-500">Loading packages...</p>
            </section>
        );
    }

    if (isError) {
        return (
            <section id="tours" className="max-w-6xl mx-auto px-6 py-20 text-center">
                <h3 className="text-3xl font-semibold mb-12">Our Packages</h3>
                <p className="text-red-600">Failed to load packages. Please try again later.</p>
            </section>
        );
    }

    const packages: PackageItem[] = data || [];

    const confirmDelete = async () => {
        if (!selectedId) return;
        try {
            const res = await deletePackage({
                url: `${endpoints.packages}/${selectedId}`,
                method: "DELETE",
            }).unwrap();

            toast.success(res?.message || "Package deleted successfully", {
                duration: 4000, // Toast will disappear after 4 seconds
            });
            // Optional: refetch packages after deletion
            refetch?.();
        } catch (error: any) {
            toast.error(error?.data?.message || "Failed to delete package");
        } finally {
            setShowConfirm(false);
            setSelectedId(null);
        }
    };


    return (
        <section id="tours" className="max-w-6xl mx-auto px-6 py-20">
            <div className="flex justify-between items-center mb-12">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center">Our Packages</h2>
                {
                    isAuthenticated && (
                        <Link
                            to="/dashboard/packages/create"
                            className="px-5 py-2 rounded text-white bg-primary-700 hover:bg-primary-800 focus:ring-primary-400 focus:ring-2"
                        >
                            + Create New Package
                        </Link>
                    )
                }
            </div>
            {packages.length === 0 ? (
                <p className="text-center text-gray-500">No packages available at the moment.</p>
            ) : (
                <div className="grid  sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {packages.map((pkg) => (
                        <div
                            key={pkg.id}
                            className="bg-white rounded-2xl shadow-md hover:shadow-lg transition overflow-hidden"
                            onClick={() => navigate(`/packages/${pkg.id}`)} // ✅ navigate to detail
                        >
                            <div className="aspect-3/2 overflow-hidden rounded-t-2xl">
                                <img
                                    src={pkg.coverImage
                                        ? pkg.coverImage.startsWith("http")
                                            ? pkg.coverImage
                                            : `${import.meta.env.VITE_API_BASE_URL || ""}${pkg.coverImage}`
                                        : "https://via.placeholder.com/800x400?text=No+Cover+Image"}
                                    alt={pkg.title}
                                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                                />
                            </div>

                            <div className="p-6 text-center">
                                <h4 className="text-xl font-semibold mb-2 line-clamp-2">{pkg.title}</h4>
                                <p className="text-gray-600 mb-2 line-clamp-3 ">{pkg.description}</p>
                                <p className="text-primary-700 font-bold mb-4">
                                    Est: {pkg.price ? `$${pkg.price}` : "Contact for Price"}
                                </p>
                                {/* <button className="bg-primary-700 text-white px-6 py-2 rounded-full hover:bg-primary-800 transition">
                                    Call Now
                                </button> */}

                                <div className="flex gap-2 w-full">
                                    <Link
                                        to={`/dashboard/packages/edit/${pkg.id}`}
                                        className="bg-yellow-400 px-3 py-1 rounded hover:bg-yellow-500 flex-1"
                                    >
                                        Edit
                                    </Link>

                                    <button
                                        onClick={() => {
                                            setSelectedId(pkg.id);
                                            setShowConfirm(true);
                                        }}
                                        className="bg-red-500 px-3 py-1 rounded text-white hover:bg-red-600 flex-1"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>
            )}

            <ConfirmModal
                open={showConfirm}
                onCancel={() => setShowConfirm(false)}
                onConfirm={confirmDelete}
                loading={isDeleting}
                title="Delete Package"
                message="Are you sure you want to delete this package? This action cannot be undone."
            />

        </section>
    );
};

export default PackagesPage;
