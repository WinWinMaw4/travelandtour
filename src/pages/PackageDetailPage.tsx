import React from "react";
import { useParams } from "react-router-dom";
import { useGetEndpointQuery } from "@services/apiSlice";
import { endpoints } from "@services/endpoints";
import { useTranslation } from "react-i18next";
import ShareButton from "@components/share/ShareButton";

interface PackageItem {
    id: number;
    title: string;
    price: number;
    description: string;
    coverImage?: string;
}

const PackageDetail: React.FC = () => {
    const { t } = useTranslation();
    const { id } = useParams<{ id: string }>();

    const { data, error, isLoading } = useGetEndpointQuery(`${endpoints.packages}/${id}`);

    if (isLoading) {
        return (
            <section className="max-w-4xl mx-auto px-6 py-20 text-center">
                <p className="text-gray-500">Loading package details...</p>
            </section>
        );
    }

    if (error) {
        return (
            <section className="max-w-4xl mx-auto px-6 py-20 text-center">
                <p className="text-red-600">Failed to load package details. Please try again later.</p>
            </section>
        );
    }

    const pkg: PackageItem | null = data || null;

    if (!pkg) {
        return (
            <section className="max-w-4xl mx-auto px-6 py-20 text-center">
                <p className="text-gray-500">Package not found.</p>
            </section>
        );
    }

    const imageUrl = pkg.coverImage
        ? pkg.coverImage.startsWith("http")
            ? pkg.coverImage
            : `${import.meta.env.VITE_API_BASE_URL || ""}${pkg.coverImage}`
        : "https://via.placeholder.com/800x400?text=No+Cover+Image";

    return (
        <section className="max-w-4xl mx-auto px-6 py-20">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                {/* <div className="">
                    <img src={imageUrl} alt={pkg.title} className="w-full h-64 object-cover" />
                </div> */}

                <div className="w-full mb-8 rounded-2xl overflow-hidden shadow aspect-video cursor-pointer">
                    <img
                        src={imageUrl}
                        alt={pkg.title}
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="p-8">
                    <div className="flex justify-between items-center flex-wrap mb-3">
                        <h2 className="text-xl lg:text-3xl font-bold mb-4">{pkg.title}</h2>
                        <ShareButton />
                    </div>

                    <p className="text-gray-700 whitespace-pre-line leading-relaxed mb-4">
                        {pkg.description}
                    </p>
                    <p className="text-lg text-primary-700 font-semibold mb-6">
                        {pkg.price ? `Est: $${pkg.price}` : "Contact for Price"}
                    </p>

                    <button className="bg-primary-700 text-white px-8 py-3 rounded-full hover:bg-primary-800 transition">
                        <a href="tel:0490866626">{t("packages.economy13.button")}</a>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default PackageDetail;
