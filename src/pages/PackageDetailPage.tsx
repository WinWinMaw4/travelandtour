// src/components/pages/PackageDetail.tsx (Updated)

import React, { useState } from "react"; // 👈 Add useState
import { useParams } from "react-router-dom";
import { useGetEndpointQuery } from "@services/apiSlice";
import { endpoints } from "@services/endpoints";
import { useTranslation } from "react-i18next";
import ShareButton from "@components/share/ShareButton";
import { Phone, Mail } from "lucide-react"; // 📞📧 Import icons
import BookingFormModal from "@components/page/booking/bookingFormModal";

// --- TYPE DEFINITIONS ---

interface PackageItem {
    id: number;
    title: string;
    price: number;
    description: string;
    coverImage?: string;
}

interface ApiContact {
    id: number;
    country_code: string; // e.g., 'AU', 'MM'
    city: string;
    state?: string;
    country: string;
    phone: string;
    email: string;
}

// --- Contact Information Modal Component (Repeated for context) ---

interface ContactInfoModalProps {
    isOpen: boolean;
    onClose: () => void;
    packageTitle: string;
    contactData: ApiContact[];
}

const ContactInfoModal: React.FC<ContactInfoModalProps> = ({ isOpen, onClose, packageTitle, contactData }) => {
    const { t } = useTranslation();

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 bg-opacity-60 p-4" onClick={onClose}>
            <div
                className="bg-white rounded-xl p-8 max-w-xl w-full shadow-2xl transition-all duration-300 transform scale-100"
                onClick={(e) => e.stopPropagation()}
            >
                <h3 className="text-2xl font-bold text-primary-700 mb-2">
                    {packageTitle}: {t("packages.modal.contactTitle")}
                </h3>
                <p className="text-gray-600 mb-6">
                    {t("packages.modal.contactInquiryPrompt")}
                </p>

                {/* Display Contact Information */}
                <div className="space-y-4">
                    {contactData.map((contact) => (
                        <div key={contact.id} className="border-l-4 border-primary-500 pl-4 py-2 bg-gray-50 rounded-md">
                            <p className="text-lg font-semibold mb-1 t          ext-gray-800">
                                {contact.city}, {contact.country} (T: {contact.country_code})
                            </p>

                            <div className="flex flex-col sm:flex-row sm:space-x-6 text-sm">
                                <a
                                    href={`tel:${contact.phone.replace(/\s/g, '')}`}
                                    className="flex items-center text-green-600 hover:text-green-700 transition font-medium"
                                >
                                    <Phone size={14} className="mr-2" />
                                    {t("packages.contact.call")}: {contact.phone}
                                </a>
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

                <div className="mt-8 flex justify-end">
                    <button
                        onClick={onClose}
                        className="bg-gray-200 text-gray-800 px-6 py-2 rounded-full hover:bg-gray-300 transition font-medium"
                    >
                        {t("packages.modal.closeButton")}
                    </button>
                </div>
            </div>
        </div>
    );
};
// -------------------------------------------------------------------------


const PackageDetail: React.FC = () => {
    const { t } = useTranslation();
    const { id } = useParams<{ id: string }>();
    const [isBookingOpen, setIsBookingOpen] = useState(false);


    // 1. Fetch Package Data
    const {
        data: packageData,
        error,
        isLoading: isPackageLoading
    } = useGetEndpointQuery(`${endpoints.packages}/${id}`);

    // 2. Fetch Contact Data
    const {
        data: contactApiData,
        isLoading: isContactsLoading
    } = useGetEndpointQuery(`${endpoints.contacts}`);

    const contacts: ApiContact[] = contactApiData?.data || [];

    // State for Modal Visibility
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openContactModal = () => setIsModalOpen(true);
    const closeContactModal = () => setIsModalOpen(false);

    // --- Loading and Error Handling ---
    if (isPackageLoading) {
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

    const pkg: PackageItem | null = packageData || null;

    if (!pkg) {
        return (
            <section className="max-w-4xl mx-auto px-6 py-20 text-center">
                <p className="text-gray-500">Package not found.</p>
            </section>
        );
    }
    // --- End Loading and Error Handling ---

    // Determine the main phone number (e.g., AU office) for the quick call button
    const auContact = contacts.find(c => c.country_code === 'AU');
    const AU_CONTACT_PHONE = auContact?.phone.replace(/\s/g, '') || "+61490866626"; // Fallback number

    const imageUrl = pkg.coverImage
        ? pkg.coverImage.startsWith("http")
            ? pkg.coverImage
            : `${import.meta.env.VITE_API_BASE_URL || ""}${pkg.coverImage}`
        : "https://via.placeholder.com/800x400?text=No+Cover+Image";


    const openBooking = () => setIsBookingOpen(true);
    const closeBooking = () => setIsBookingOpen(false);


    return (
        <>
            <section className="max-w-4xl mx-auto px-6 py-20">
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
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
                            {pkg.price ? `Est: AUD ${pkg.price}` : "Contact for Price"}
                        </p>

                        <div className="flex flex-col space-y-2 md:space-y-0 md:flex-row md:space-x-4">
                            {/* 📞 QUICK CALL BUTTON */}
                            {/* <a
                                href={`tel:${AU_CONTACT_PHONE}`}
                                className="bg-green-600 text-white px-8 py-3 rounded-full hover:bg-green-700 transition font-medium"
                            >
                                {t("packages.bookNow")}
                            </a> */}



                            {/* ℹ️ CONTACT US BUTTON (Triggers Contact Info Modal) */}
                            <button
                                onClick={openContactModal}
                                className="cursor-pointer bg-primary-700 text-white px-8 py-3 rounded-full hover:bg-primary-800 transition font-medium"
                            >
                                {t("packages.callNow")}
                            </button>
                            <button
                                onClick={openBooking}
                                className="cursor-pointer bg-green-600 text-white px-8 py-3 rounded-full hover:bg-green-700 transition font-medium"
                            >
                                {t("packages.bookNow")}
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Render the Contact Info Modal */}
            <ContactInfoModal
                isOpen={isModalOpen}
                onClose={closeContactModal}
                packageTitle={pkg.title}
                contactData={contacts}
            />

            <BookingFormModal
                isOpen={isBookingOpen}
                onClose={closeBooking}
                packageTitle={pkg.title}
                packageId={pkg.id}
            />

        </>
    );
};

export default PackageDetail;