import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { CheckCircle } from "lucide-react"; // ✅

interface BookingFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    packageTitle: string;
    onSubmit?: (data: any) => void; // optional callback for API submission
}

const BookingFormModal: React.FC<BookingFormModalProps> = ({
    isOpen,
    onClose,
    packageTitle,
    onSubmit,
}) => {
    const { t } = useTranslation();

    const [formData, setFormData] = useState({
        name: "",
        contact: "",
        email: "",
        suburb: "",
        person: 1,
        town: "",
        state: "",
        note: "",
    });

    const [success, setSuccess] = useState(false);

    if (!isOpen) return null;

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const submit = () => {
        if (onSubmit) onSubmit(formData);
        console.log("Booking Submitted:", formData);

        // Show success popup
        setSuccess(true);

        // Auto-close after 3s
        setTimeout(() => {
            setSuccess(false);
            onClose();
        }, 3000);
    };

    return (
        <>
            {/* Overlay */}
            <div
                className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
                onClick={onClose}
            >
                {/* Form Container */}
                <div
                    className="bg-white rounded-xl p-6 w-full max-w-2xl shadow-xl animate-fadeIn flex flex-col max-h-[80vh] overflow-y-auto"
                    onClick={(e) => e.stopPropagation()}
                >
                    <h3 className="text-2xl font-bold mb-6">
                        {t("packages.bookNow")} – {packageTitle}
                    </h3>

                    {/* FORM FIELDS */}
                    <div className="space-y-4">
                        {/* Name & Email Side-by-Side on large screens */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            <input
                                type="text"
                                name="name"
                                placeholder={t("form.name")}
                                className="w-full border p-3 rounded-lg"
                                value={formData.name}
                                onChange={handleChange}
                            />

                            <input
                                type="email"
                                name="email"
                                placeholder={t("form.email")}
                                className="w-full border p-3 rounded-lg"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>

                        <input
                            type="text"
                            name="contact"
                            placeholder={t("form.phone")}
                            className="w-full border p-3 rounded-lg"
                            value={formData.contact}
                            onChange={handleChange}
                        />

                        <div>
                            <label className="block text-sm font-medium mb-1">
                                {t("form.person")}
                            </label>
                            <div className="flex items-center gap-3">
                                <button
                                    type="button"
                                    className="px-3 py-1 bg-gray-300 rounded-lg"
                                    onClick={() =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            person: Math.max(1, prev.person - 1),
                                        }))
                                    }
                                >
                                    –
                                </button>
                                <span className="text-lg font-semibold">
                                    {formData.person}
                                </span>
                                <button
                                    type="button"
                                    className="px-3 py-1 bg-gray-300 rounded-lg"
                                    onClick={() =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            person: prev.person + 1,
                                        }))
                                    }
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        <input
                            type="text"
                            name="suburb"
                            placeholder={t("form.suburb")}
                            className="w-full border p-3 rounded-lg"
                            value={formData.suburb}
                            onChange={handleChange}
                        />

                        <input
                            type="text"
                            name="town"
                            placeholder={t("form.town")}
                            className="w-full border p-3 rounded-lg"
                            value={formData.town}
                            onChange={handleChange}
                        />

                        <input
                            type="text"
                            name="state"
                            placeholder={t("form.state")}
                            className="w-full border p-3 rounded-lg"
                            value={formData.state}
                            onChange={handleChange}
                        />

                        <textarea
                            name="note"
                            placeholder={t("form.note")}
                            className="w-full border p-3 rounded-lg"
                            rows={4}
                            value={formData.note}
                            onChange={handleChange}
                        />
                    </div>

                    {/* ACTION BUTTONS */}
                    <div className="mt-6 flex justify-end gap-3">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 rounded-full bg-gray-200"
                        >
                            {t("packages.modal.closeButton")}
                        </button>

                        <button
                            onClick={submit}
                            className="px-6 py-2 rounded-full bg-primary-700 text-white"
                        >
                            {t("form.submit")}
                        </button>
                    </div>
                </div>
            </div>

            {/* USER-FRIENDLY SUCCESS POPUP */}
            {success && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
                    <div className="bg-white rounded-xl shadow-xl flex flex-col items-center p-6 animate-fadeIn scale-110 max-w-sm">
                        <CheckCircle className="text-green-500 w-12 h-12 mb-4" />
                        <h4 className="text-lg font-semibold mb-2">
                            {t("form.successTitle") || "Booking Successful!"}
                        </h4>
                        <p className="text-center text-gray-700">
                            {t("form.successMessage") ||
                                "Thank you! We will contact you via email shortly."}
                        </p>
                    </div>
                </div>
            )}
        </>
    );
};

export default BookingFormModal;
