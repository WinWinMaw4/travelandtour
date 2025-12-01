// src/components/sections/PackagesSection.tsx

import React, { useState } from "react";
import { useGetEndpointQuery } from "@services/apiSlice";
import { endpoints } from "@services/endpoints";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Phone, Mail } from "lucide-react"; // 📞📧 Import icons for the modal
import BookingFormModal from "@components/page/booking/bookingFormModal";

// --- TYPE DEFINITIONS ---

interface PackageItem {
    id: number | string;
    title: string;
    price: number;
    description: string;
    coverImage?: string;
}

// Define the shape of the contact data from the API
interface ApiContact {
    id: number;
    country_code: string; // e.g., 'AU', 'MM'
    city: string;
    state?: string;
    country: string;
    phone: string;
    email: string;
}


// --- 1. Contact Information Modal Component ---

interface ContactInfoModalProps {
    isOpen: boolean;
    onClose: () => void;
    packageTitle: string;
    contactData: ApiContact[]; // Pass the fetched contact data
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
                            <p className="text-lg font-semibold mb-1 text-gray-800">
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


// --- 2. Packages Section Component ---

const PackagesSection: React.FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [isBookingOpen, setIsBookingOpen] = useState(false);


    // Fetch Packages Data
    const {
        data: packageData,
        isLoading: isPackagesLoading,
        isError: isPackagesError
    } = useGetEndpointQuery(`${endpoints.packages}`);

    // Fetch Contact Data
    const {
        data: contactApiData,
        isLoading: isContactsLoading
    } = useGetEndpointQuery(`${endpoints.contacts}`);

    const contacts: ApiContact[] = contactApiData?.data || [];

    // State for Modal Visibility and Selected Package
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPackageTitle, setSelectedPackageTitle] = useState("");
    const [selectedPackageId, setSelectedPackageId] = useState<number | string>("");


    const openContactModal = (title: string) => {
        setSelectedPackageTitle(title);
        setIsModalOpen(true);
    };

    const closeContactModal = () => {
        setIsModalOpen(false);
        setSelectedPackageTitle("");
    };


    // --- Loading and Error Handling ---
    if (isPackagesLoading) {
        return (
            <section id="packages" className="max-w-6xl mx-auto px-6 py-20 text-center">
                <h3 className="text-3xl font-semibold mb-12">{t("packages.sectionTitle")}</h3>
                <p className="text-gray-500">Loading packages...</p>
            </section>
        );
    }

    if (isPackagesError) {
        return (
            <section id="packages" className="max-w-6xl mx-auto px-6 py-20 text-center">
                <h3 className="text-3xl font-semibold mb-12">{t("packages.sectionTitle")}</h3>
                <p className="text-red-600">Failed to load packages. Please try again later.</p>
            </section>
        );
    }
    // --- End Loading and Error Handling ---

    const packages: PackageItem[] = packageData || [];

    // Determine the main phone number (e.g., AU office) for the quick call button
    const auContact = contacts.find(c => c.country_code === 'AU');
    const AU_CONTACT_PHONE = auContact?.phone.replace(/\s/g, '') || "+61490866626"; // Fallback number

    const openBooking = () => setIsBookingOpen(true);
    const closeBooking = () => setIsBookingOpen(false);


    return (
        <>
            <section id="packages" className="max-w-6xl mx-auto px-6 py-20">
                <h3 className="text-3xl font-semibold text-center mb-12">{t("packages.sectionTitle")}</h3>

                {packages.length === 0 ? (
                    <p className="text-center text-gray-500">No packages available at the moment.</p>
                ) : (
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
                        {packages.map((pkg) => {
                            const imageUrl = pkg.coverImage
                                ? pkg.coverImage.startsWith("http")
                                    ? pkg.coverImage
                                    : `${import.meta.env.VITE_API_BASE_URL || ""}${pkg.coverImage}`
                                : "https://via.placeholder.com/800x400?text=No+Cover+Image";

                            // ✅ Better excerpt cleaning for Editor.js content
                            let excerpt = "";
                            if (pkg.description) {
                                try {
                                    const parsed = JSON.parse(pkg.description);
                                    const firstBlock = parsed?.blocks?.find(
                                        (b: any) => b.type === "paragraph" && b.data?.text
                                    );
                                    excerpt = firstBlock?.data?.text
                                        ?.replace(/<[^>]*>/g, "")
                                        .replace(/&nbsp;/g, " ")
                                        .replace(/\s+/g, " ")
                                        .trim()
                                        .slice(0, 150);
                                } catch {
                                    excerpt = pkg.description
                                        .replace(/<[^>]*>/g, "")
                                        .replace(/&nbsp;/g, " ")
                                        .slice(0, 150);
                                }
                            }


                            return (
                                <div
                                    key={pkg.id}
                                    className="bg-white group rounded-2xl shadow-md hover:shadow-lg transition overflow-hidden cursor-pointer"
                                    onClick={() => navigate(`/packages/${pkg.id}`)}
                                >
                                    {/* ... Image and Details ... (omitted for brevity) */}
                                    <div className="aspect-3/2 overflow-hidden rounded-t-2xl">
                                        <img src={imageUrl} alt={pkg.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                                    </div>
                                    <div className="p-6 text-center">
                                        <h4 className="text-xl font-semibold mb-2 group-hover:text-primary-700 line-clamp-2">{pkg.title}</h4>
                                        <p className="text-gray-600 mb-2 line-clamp-3">
                                            {/* {pkg.description} */}
                                            {excerpt}...
                                        </p>
                                        <p className="text-primary-700 font-bold mb-4">
                                            {pkg.price ? `Est : AUD ${pkg.price}` : "Contact for Price"}
                                        </p>

                                        <div className="flex justify-center space-x-4">
                                            {/* 📞 CALL NOW BUTTON */}
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    openContactModal(pkg.title);
                                                }
                                                }
                                                className="cursor-pointer bg-primary-700 text-white px-8 py-3 rounded-full hover:bg-primary-800 transition font-medium"
                                            >
                                                {t("packages.callNow")}
                                            </button>

                                            {/* ℹ️ CONTACT US BUTTON (Triggers Contact Info Modal) */}
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setSelectedPackageId(pkg.id)
                                                    setSelectedPackageTitle(pkg.title);
                                                    openBooking()// Open the contact modal
                                                }}
                                                // Change the color and text to reflect a contact action
                                                className="cursor-pointer bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition text-sm font-medium"
                                            >
                                                {t("packages.bookNow")}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </section>

            {/* 3. Render the Contact Info Modal */}
            <ContactInfoModal
                isOpen={isModalOpen}
                onClose={closeContactModal}
                packageTitle={selectedPackageTitle}
                contactData={contacts}
            />

            <BookingFormModal
                isOpen={isBookingOpen}
                onClose={closeBooking}
                packageTitle={selectedPackageTitle}
                packageId={Number(selectedPackageId)}
            />

        </>
    );
};

export default PackagesSection;