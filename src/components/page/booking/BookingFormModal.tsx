/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { CheckCircle } from "lucide-react";
import { useInvalidateEndpointMutation } from "@services/apiSlice";
import { endpoints } from "@services/endpoints";
import Input from "@components/ui/input/Input";
import Textarea from "@components/ui/input/Textarea";


interface BookingFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    packageTitle: string;
    packageId: string | number;
}

const BookingFormModal: React.FC<BookingFormModalProps> = ({
    isOpen,
    onClose,
    packageTitle,
    packageId
}) => {
    const { t } = useTranslation();

    const [sendRequest, { isLoading }] = useInvalidateEndpointMutation();
    const [errors, setErrors] = useState<any>({});
    const [success, setSuccess] = useState(false);

    const [formData, setFormData] = useState({
        packageId: packageId ? Number(packageId) : null,
        name: "",
        contact: "",
        email: "",
        suburb: "",
        person: 1,
        town: "",
        state: "",
        note: "",
    });

    React.useEffect(() => {
        setFormData((prev) => ({
            ...prev,
            packageId: packageId ? Number(packageId) : null,
        }));
    }, [packageId]);


    if (!isOpen) return null;

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors((prev: any) => ({ ...prev, [e.target.name]: undefined }));
    };

    const submit = async () => {
        setErrors({});
        try {
            const res = await sendRequest({
                url: endpoints.bookings,
                method: "POST",
                body: formData,
            }).unwrap();

            if (res?.booking) {
                setSuccess(true);

                setTimeout(() => {
                    setSuccess(false);
                    onClose();
                }, 4000);

                return;
            }
        } catch (err: any) {
            if (err?.data?.errors) {
                setErrors(err.data.errors);
            }
        }
    };

    return (
        <>
            <div
                className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
                onClick={onClose}
            >
                {!success && (
                    <div
                        className="bg-white rounded-xl p-6 w-full max-w-2xl shadow-xl animate-fadeIn flex flex-col max-h-[80vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h3 className="text-2xl font-bold mb-6">
                            {t("packages.bookNow")} – {packageTitle}
                        </h3>

                        <div className="space-y-4">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                <Input
                                    name="name"
                                    placeholder={t("form.name")}
                                    value={formData.name}
                                    onChange={handleChange}
                                    error={errors.name}
                                />

                                <Input
                                    name="email"
                                    type="email"
                                    placeholder={t("form.email")}
                                    value={formData.email}
                                    onChange={handleChange}
                                    error={errors.email}
                                />
                            </div>

                            <Input
                                name="contact"
                                placeholder={t("form.phone")}
                                value={formData.contact}
                                onChange={handleChange}
                                error={errors.contact}
                            />

                            {/* Person Selector */}
                            <div>
                                <label className="block text-sm font-medium mb-2">
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

                            <Input
                                name="suburb"
                                placeholder={t("form.suburb")}
                                value={formData.suburb}
                                onChange={handleChange}
                                error={errors.suburb}
                            />

                            <Input
                                name="town"
                                placeholder={t("form.town")}
                                value={formData.town}
                                onChange={handleChange}
                                error={errors.town}
                            />

                            <Input
                                name="state"
                                placeholder={t("form.state")}
                                value={formData.state}
                                onChange={handleChange}
                                error={errors.state}
                                required
                            />

                            <Textarea
                                name="note"
                                rows={4}
                                placeholder={t("form.note")}
                                value={formData.note}
                                onChange={handleChange}
                                error={errors.note}
                            />
                        </div>

                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                onClick={onClose}
                                className="px-4 py-2 rounded-full bg-gray-200 cursor-pointer"
                            >
                                {t("packages.modal.closeButton")}
                            </button>

                            <button
                                onClick={submit}
                                disabled={isLoading}
                                className="px-6 py-2 cursor-pointer rounded-full bg-primary-700 text-white"
                            >
                                {isLoading
                                    ? t("form.submitting")
                                    : t("form.submit")}
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* SUCCESS POPUP */}
            {success && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
                    <div className="bg-white rounded-xl shadow-xl flex flex-col items-center p-6 animate-fadeIn scale-110 max-w-sm">
                        <CheckCircle className="text-green-500 w-12 h-12 mb-4" />
                        <h4 className="text-lg font-semibold mb-2">
                            {t("form.successTitle") || "Booking Successful!"}
                        </h4>
                        <p className="text-center text-gray-700">
                            {t("form.successMessage") ||
                                "Thank you! We will contact you shortly."}
                        </p>
                    </div>
                </div>
            )}
        </>
    );
};

export default BookingFormModal;
