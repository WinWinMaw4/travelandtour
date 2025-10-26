/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useInvalidateEndpointMutation } from "@services/apiSlice";
import { endpoints } from "@services/endpoints";
import toast from "react-hot-toast";
import BannerForm from "@components/page/banner/BannerForm";

const BannerCreatePage: React.FC = () => {
    const navigate = useNavigate();
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [createBanner, { isLoading }] = useInvalidateEndpointMutation();

    const handleCreateBanner = async (formData: FormData) => {
        setErrors({}); // reset previous errors
        try {
            const res = await createBanner({
                url: endpoints.banners,
                method: "POST",
                body: formData,
            }).unwrap();

            if (res?.message === "Banner created successfully") {
                toast.success("Banner created successfully", {
                    duration: 4000, // Toast will disappear after 4 seconds
                });
                navigate(-1); // redirect after success
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

    return (
        <section className="max-w-4xl mx-auto px-6 py-20">
            <h1 className="text-3xl font-bold mb-8 text-center">Create New Banner</h1>
            <BannerForm onSubmit={handleCreateBanner} errors={errors} />
        </section>
    );
};

export default BannerCreatePage;
