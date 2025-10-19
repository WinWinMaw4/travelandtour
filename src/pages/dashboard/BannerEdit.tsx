/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetEndpointQuery, useInvalidateEndpointMutation } from "@services/apiSlice";
import { endpoints } from "@services/endpoints";
import toast from "react-hot-toast";
import BannerForm from "@components/page/banner/BannerForm";

const BannerEditPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const { data: banner, isLoading } = useGetEndpointQuery(`${endpoints.banners}/${id}`);
    const [updateBanner, { isLoading: isUpdating }] = useInvalidateEndpointMutation();

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const [formData, setFormData] = useState<{
        link: string;
        preview: string | null;
    }>({
        link: "",
        preview: null,
    });

    // Load existing banner info
    useEffect(() => {
        console.log("banner data", banner)
        if (banner) {
            setFormData({
                link: banner.link || "",
                preview: banner.image
                    ? banner.image.startsWith("http")
                        ? banner.image
                        : `${import.meta.env.VITE_API_URL}${banner.image}`
                    : null,
            });
        }
    }, [banner]);

    const handleUpdateBanner = async (updatedData: FormData) => {
        setErrors({});
        try {
            const res = await updateBanner({
                url: `${endpoints.banners}/${id}`,
                method: "PUT",
                body: updatedData,
            }).unwrap();

            if (res?.message === "Banner updated successfully") {
                toast.success("Banner updated successfully");
                navigate(-1);
            } else if (res?.errors) {
                setErrors(res.errors);
            }
        } catch (err: any) {
            if (err?.data?.errors) {
                setErrors(err.data.errors);
            } else {
                console.error(err);
                toast.error("Something went wrong");
            }
        }
    };

    if (isLoading) return <p>Loading banner details...</p>;

    return (
        <section className="max-w-4xl mx-auto px-6 py-20">
            <h1 className="text-3xl font-bold mb-8 text-center">Edit Banner</h1>
            <BannerForm
                onSubmit={handleUpdateBanner}
                errors={errors}
                defaultLink={formData.link}
                defaultPreview={formData.preview}
                isEdit
                isLoading={isUpdating}
            />
        </section>
    );
};

export default BannerEditPage;
