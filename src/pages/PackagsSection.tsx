import React from "react";
import { useGetEndpointQuery } from "@services/apiSlice"; // ✅ adjust import if needed
import { endpoints } from "@services/endpoints"; // ✅ adjust import if needed

interface PackageItem {
    id: number;
    title: string;
    price: number;
    description: string;
    coverImage?: string;
}

const PackagesSection: React.FC = () => {
    // ✅ Fetch from API
    const { data, isLoading, isError } = useGetEndpointQuery(`${endpoints.packages}`);

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

    return (
        <section id="tours" className="max-w-6xl mx-auto px-6 py-20">
            <h3 className="text-3xl font-semibold text-center mb-12">Our Packages</h3>

            {packages.length === 0 ? (
                <p className="text-center text-gray-500">No packages available at the moment.</p>
            ) : (
                <div
                    className="grid  sm:grid-cols-2 md:grid-cols-3 gap-8"
                >
                    {packages.map((pkg) => (
                        <div
                            key={pkg.id}
                            className="bg-white group rounded-2xl shadow-md hover:shadow-lg transition overflow-hidden"
                        >
                            <div className="aspect-[3/2] overflow-hidden rounded-t-2xl">
                                <a
                                    href={
                                        pkg.coverImage
                                            ? pkg.coverImage.startsWith("http")
                                                ? pkg.coverImage
                                                : `${import.meta.env.VITE_API_BASE_URL || ""}${pkg.coverImage}`
                                            : "https://via.placeholder.com/800x400?text=No+Cover+Image"
                                    }
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <img
                                        src={
                                            pkg.coverImage
                                                ? pkg.coverImage.startsWith("http")
                                                    ? pkg.coverImage
                                                    : `${import.meta.env.VITE_API_BASE_URL || ""}${pkg.coverImage}`
                                                : "https://via.placeholder.com/800x400?text=No+Cover+Image"
                                        }
                                        alt={pkg.title}
                                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                                    />
                                </a>
                            </div>

                            <div className="p-6 text-center">
                                <h4 className="text-xl font-semibold mb-2 group-hover:text-emerald-700">{pkg.title}</h4>
                                <p className="text-gray-600 mb-2">{pkg.description}</p>
                                <p className="text-emerald-700 font-bold mb-4">
                                    {pkg.price ? `Est : $${pkg.price}` : "Contact for Price"}
                                </p>
                                <button className="bg-emerald-700 text-white px-6 py-2 rounded-full hover:bg-emerald-800 transition">
                                    Call Now
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

        </section>
    );
};

export default PackagesSection;
