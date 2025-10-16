import BannerForm from "@components/page/banner/BannerForm";
import React from "react";

const BannerCreatePage: React.FC = () => {
    const handleCreateBanner = (data: { title: string; link: string; imageFile: File | null }) => {
        console.log("Banner Data:", data);
        // ✅ Here you can send the data to your API
    };

    return (
        <section className="max-w-4xl mx-auto px-6 py-20">
            <h1 className="text-3xl font-bold mb-8 text-center">Create New Banner</h1>
            <BannerForm onSubmit={handleCreateBanner} />
        </section>
    );
};

export default BannerCreatePage;
