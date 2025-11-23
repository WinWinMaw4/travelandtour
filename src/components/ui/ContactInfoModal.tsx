import React from "react";
import { Phone, Mail } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { ApiContact } from "@services/types"; // your API contact type
import { X } from "lucide-react";

interface ContactInfoModalProps {
    isOpen: boolean;
    onClose: () => void;
    packageTitle: string;
    contactData: ApiContact[];
}

const ContactInfoModal: React.FC<ContactInfoModalProps> = ({
    isOpen,
    onClose,
    packageTitle,
    contactData,
}) => {
    const { t } = useTranslation();

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-xl p-6 max-w-md w-full shadow-2xl relative"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition"
                >
                    <X size={22} />
                </button>

                <h3 className="text-xl font-bold text-primary-700 mb-4">{packageTitle}</h3>
                <p className="text-gray-600 mb-6">{t("packages.modal.contactInquiryPrompt")}</p>

                {/* Display all contacts */}
                <div className="flex flex-col gap-4">
                    {contactData.map((contact) => (
                        <div
                            key={contact.id}
                            className="border-l-4 border-primary-500 pl-4 py-2 bg-gray-50 rounded-md"
                        >
                            <p className="text-lg font-semibold text-gray-800 mb-1">
                                {contact.city}, {contact.country} (T: {contact.country_code})
                            </p>

                            <div className="flex flex-col sm:flex-row sm:space-x-6 text-sm">
                                {/* Phone */}
                                <a
                                    href={`tel:${contact.phone.replace(/\s/g, "")}`}
                                    className="flex items-center text-green-600 hover:text-green-700 transition font-medium"
                                >
                                    <Phone size={14} className="mr-2" />
                                    {t("packages.contact.call")}: {contact.phone}
                                </a>

                                {/* Email */}
                                <a
                                    href={`mailto:${contact.email}`}
                                    className="flex items-center text-blue-600 hover:text-blue-700 transition font-medium mt-1 sm:mt-0"
                                >
                                    <Mail size={14} className="mr-2" />
                                    {t("packages.contact.email")}: {contact.email}
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ContactInfoModal;
