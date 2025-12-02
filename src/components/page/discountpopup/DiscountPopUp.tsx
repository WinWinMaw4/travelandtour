import { useGetEndpointQuery } from "@services/apiSlice";
import { endpoints } from "@services/endpoints";
import React, { useEffect, useState } from "react";

const DiscountPopUp = () => {
    const endpoint = `${endpoints.discountpopup}`;
    const { data, isLoading } = useGetEndpointQuery(endpoint);

    const [showPopup, setShowPopup] = useState(false);

    // 🕒 Check last popup time
    useEffect(() => {
        const lastShown = localStorage.getItem("discount_popup_last_shown");
        if (lastShown) {
            const diff = Date.now() - Number(lastShown);
            const oneHour = 60 * 60 * 1000;

            if (diff < oneHour) {
                return; // Do NOT show popup yet
            }
        }

        const handleScroll = () => {
            setShowPopup(true);
            localStorage.setItem("discount_popup_last_shown", Date.now().toString());
            window.removeEventListener("scroll", handleScroll);
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // 🚫 Disable page scroll when popup is open
    useEffect(() => {
        if (showPopup) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [showPopup]);

    if (isLoading) return null;
    if (!data || !data.image || !data.isActive) return null;

    return (
        <>
            {showPopup && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]">
                    <div className="bg-white rounded-xl p-1 shadow-xl max-w-[90%] relative">
                        {/* Close button */}
                        <button
                            onClick={() => setShowPopup(false)}
                            className="absolute -top-3 -right-3 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg text-black cursor-pointer"
                        >
                            ✕
                        </button>

                        {/* Image */}
                        <img
                            // src={data.image}
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