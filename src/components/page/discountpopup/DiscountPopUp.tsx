import { useGetEndpointQuery } from "@services/apiSlice";
import { endpoints } from "@services/endpoints";
import React, { useEffect, useState } from "react";

const DiscountPopUp = () => {
    const endpoint = `${endpoints.discountpopup}`;
    const { data, isLoading } = useGetEndpointQuery(endpoint);

    const [showPopup, setShowPopup] = useState(false);

    const hasActivePopup =
        data &&
        data.isActive &&
        data.image;

    // Only run scroll logic if there IS a popup
    useEffect(() => {
        if (!hasActivePopup) return; // 🛑 Nothing to show, skip everything

        const lastShown = localStorage.getItem("discount_popup_last_shown");
        if (lastShown) {
            const diff = Date.now() - Number(lastShown);
            const oneHour = 60 * 60 * 1000;

            if (diff < oneHour) return;
        }

        const handleScroll = () => {
            setShowPopup(true);
            localStorage.setItem("discount_popup_last_shown", Date.now().toString());
            window.removeEventListener("scroll", handleScroll);
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, [hasActivePopup]);

    // Scroll lock only when popup exists AND is open
    useEffect(() => {
        if (showPopup && hasActivePopup) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [showPopup, hasActivePopup]);

    if (isLoading) return null;
    if (!hasActivePopup) return null;

    return (
        <>
            {showPopup && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]">
                    <div className="bg-white rounded-xl p-1 shadow-xl max-w-[90%] relative">
                        <button
                            onClick={() => setShowPopup(false)}
                            className="absolute -top-3 -right-3 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg text-black cursor-pointer"
                        >
                            ✕
                        </button>

                        <img
                            src={
                                data.image?.startsWith("http")
                                    ? data.image
                                    : `${import.meta.env.VITE_API_URL}${data.image}`
                            }
                            alt="discount popup"
                            className="rounded-lg max-h-[80vh] object-contain"
                        />
                    </div>
                </div>
            )}
        </>
    );
};


export default DiscountPopUp; 