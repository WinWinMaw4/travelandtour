// src/components/pages/PackageDetail.tsx (Updated)
/* eslint-disable no-case-declarations */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState, type JSX } from "react"; // 👈 Add useState
import { useParams } from "react-router-dom";
import { useGetEndpointQuery } from "@services/apiSlice";
import { endpoints } from "@services/endpoints";
import { useTranslation } from "react-i18next";
import ShareButton from "@components/share/ShareButton";
import { Phone, Mail } from "lucide-react"; // 📞📧 Import icons
import BookingFormModal from "@components/page/booking/bookingFormModal";
import SEO from "@components/share/seo/SEO";
import metaCoverImage from "@assets/metaCover.png";


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

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [])

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

    const parsedContent = packageData.description ? JSON.parse(packageData.description) : null;

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

    const addTargetBlankToLinks = (htmlString: string): string => {
        if (!htmlString) return '';

        // Classes to ensure are present
        const requiredClasses = 'text-primary-700 hover:underline';

        return htmlString.replace(
            /<a\s+(.*?)href=['"](.*?)['"](.*?)\/?>/gi,
            (match, p1, href, p3) => {
                let attributes = p1 + p3;

                // 1. Add target="_blank" and rel="noopener noreferrer"
                if (!match.toLowerCase().includes('target="_blank"')) {
                    attributes += ' target="_blank"';
                }
                if (!match.toLowerCase().includes('rel="noopener noreferrer"')) {
                    attributes += ' rel="noopener noreferrer"';
                }

                // 2. Inject Tailwind classes
                const classMatch = attributes.match(/class=['"](.*?)['"]/i);

                if (classMatch) {
                    // Class attribute exists: Append required classes
                    const existingClasses = classMatch[1];
                    let newClasses = existingClasses;

                    // Only append classes if they aren't already there (basic check)
                    if (!existingClasses.includes('text-primary-700')) {
                        newClasses += ' text-primary-700';
                    }
                    if (!existingClasses.includes('hover:underline')) {
                        newClasses += ' hover:underline';
                    }

                    // Replace the old class attribute with the new one
                    attributes = attributes.replace(classMatch[0], `class="${newClasses.trim()}"`);

                } else {
                    // Class attribute doesn't exist: Add the new attribute
                    attributes += ` class="${requiredClasses}"`;
                }

                // Reconstruct the <a> tag
                // We use `p1` and `p3` for attributes not already matched by class or href
                return `<a ${attributes} href="${href}">`;
            }
        );
    };


    // Determine the description for SEO
    const seoDescription = pkg.description
        ? (() => {
            try {
                const parsed = JSON.parse(pkg.description);
                const firstBlock = parsed.blocks?.find(
                    (b: any) => b.type === "paragraph" && b.data?.text
                );

                if (firstBlock) {
                    return firstBlock.data.text
                        // 1. Remove HTML tags
                        .replace(/<[^>]*>/g, "")
                        // 2. Replace non-breaking space
                        .replace(/&nbsp;/g, " ")
                        .trim()
                        // 3. Truncate to 160 characters
                        .slice(0, 160);
                }
                // Fallback if JSON is parsed but no paragraph block is found
                return "Explore details of this exciting package for your next journey.";
            } catch {
                // Fallback if pkg.description is not valid JSON
                return pkg.description.replace(/<[^>]*>/g, "").slice(0, 160);
            }
        })()
        : "Explore details of this exciting package for your next journey with Asia Sky Blue.";


    const pkgUrl = `${window.location.origin}/packages/${pkg.id}`; // Using pkg.id based on context

    // Determine the keywords
    const seoKeywords = `Asia Sky Blue, Travel Package, Tour, Vacation, ${pkg.title}`;

    const BASE_URL = import.meta.env.VITE_API_BASE_URL;


    return (
        <>
            <SEO
                title={pkg.title + " | Asia Sky Blue"}
                description={seoDescription}
                keywords={seoKeywords}
                image={pkg.coverImage ? `${BASE_URL}${pkg.coverImage}` : metaCoverImage}
                url={pkgUrl}
            />
            <div id="packageDetail" className="min-w-sm max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-10 overflow-hidden">
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className="w-full mb-0 rounded-2xl overflow-hidden shadow aspect-video cursor-pointer">
                        <img
                            src={imageUrl}
                            alt={pkg.title}
                            className="w-full h-auto object-cover"
                        />
                    </div>

                    <div className="p-8 ">
                        <div className="flex justify-end items-center mb-2">
                            <ShareButton />

                        </div>
                        <div className="flex justify-between items-center flex-wrap mb-3">
                            <h2 className="text-xl lg:text-3xl font-bold mb-4">{pkg.title}</h2>
                        </div>
                        {/* 
                        <p className="text-gray-700 whitespace-pre-line leading-relaxed mb-4">
                            {pkg.description}
                        </p> */}
                        <p className="text-xl text-primary-700 font-bold mb-6">
                            {pkg.price ? `Est: AUD ${pkg.price}` : "Contact for Price"}
                        </p>

                        {/* Render EditorJS content */}
                        <div className="w-full">
                            {parsedContent?.blocks?.map((block: any, idx: number) => {
                                // 💡 Add processed content variable here
                                let processedHtml = block.data.text;

                                // Only process blocks that contain text/HTML (header, paragraph, list)
                                if (block.type === "paragraph" || block.type === "header") {
                                    processedHtml = addTargetBlankToLinks(block.data.text);
                                }

                                switch (block.type) {
                                    case "paragraph":
                                        return (
                                            <div
                                                key={idx}
                                                className="prose prose-lg wrap-break-word mb-6 prose-a:text-primary-700 hover:prose-a:text-primary-800 w-full"
                                                dangerouslySetInnerHTML={{ __html: processedHtml }}
                                            />
                                        );
                                    case "header":
                                        const Tag = `h${block.data.level}` as keyof JSX.IntrinsicElements;
                                        let headingClass = "";
                                        switch (block.data.level) {
                                            case 2: headingClass = "text-2xl font-bold mb-4"; break;
                                            case 3: headingClass = "text-xl font-semibold mb-3"; break;
                                            case 4: headingClass = "text-lg font-medium mb-2"; break;
                                            default: headingClass = "text-base font-normal mb-2";
                                        }
                                        return (
                                            <Tag
                                                key={idx}
                                                className={`${headingClass} prose-a:text-primary-700 hover:prose-a:text-primary-800`}
                                                dangerouslySetInnerHTML={{ __html: processedHtml }}
                                            />
                                        );
                                    case "list":
                                        return block.data.style === "ordered" ? (
                                            <ol key={idx} className="list-decimal list-inside mb-6 prose-a:text-primary-700 hover:prose-a:text-primary-800 wrap-break-word">
                                                {block.data.items.map((item: any, i: number) => (
                                                    <li key={i} dangerouslySetInnerHTML={{ __html: item.content }} />
                                                ))}
                                            </ol>
                                        ) : (
                                            <ul key={idx} className="list-disc list-inside mb-6 prose-a:text-primary-700 hover:prose-a:text-primary-800 wrap-break-word">
                                                {block.data.items.map((item: any, i: number) => (
                                                    <li key={i} dangerouslySetInnerHTML={{ __html: item.content }} />
                                                ))}
                                            </ul>
                                        );
                                    case "table":
                                        return (
                                            <div key={idx} className="**overflow-x-auto** mb-6">
                                                <table className="table-auto border border-gray-300 w-full text-left">
                                                    <thead className="bg-gray-100">
                                                        <tr>
                                                            {block.data.content[0].map((headerCell: string, hIdx: number) => (
                                                                <th key={hIdx} className="border border-gray-300 px-4 py-2 wrap-break-word">
                                                                    <div dangerouslySetInnerHTML={{ __html: headerCell }} />
                                                                </th>
                                                            ))}
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {block.data.content.slice(1).map((row: string[], rIdx: number) => (
                                                            <tr key={rIdx}>
                                                                {row.map((cell: string, cIdx: number) => (
                                                                    <td key={cIdx} className="border border-gray-300 px-4 py-2">
                                                                        <div dangerouslySetInnerHTML={{ __html: cell }} />
                                                                    </td>
                                                                ))}
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        );
                                    case "image":
                                        return (
                                            <div key={idx} className="image-block mb-6 max-w-full h-auto">
                                                <img src={block.data.file.url} alt={block.data.caption || ""} className="**max-w-full** h-auto rounded-lg shadow" />
                                                {block.data.caption && (
                                                    <p className="caption text-sm text-gray-500 mt-1">{block.data.caption}</p>
                                                )}
                                            </div>
                                        );
                                    case "quote":
                                        return (
                                            <blockquote key={idx} className="border-l-4 border-gray-300 pl-4 italic mb-6 prose-a:text-primary-700 hover:prose-a:text-primary-800">
                                                <div dangerouslySetInnerHTML={{ __html: block.data.text }} />
                                                {block.data.caption && <cite className="block mt-1 text-sm">{block.data.caption}</cite>}
                                            </blockquote>
                                        );
                                    case "linkTool":
                                        const { link, meta } = block.data;
                                        if (!meta || !meta.title) {
                                            // Fallback for simple links if link preview failed
                                            return (
                                                <p key={idx} className="mb-6">
                                                    <a
                                                        href={link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-primary-700 hover:text-primary-800 hover:underline"
                                                    >
                                                        {link}
                                                    </a>
                                                </p>
                                            );
                                        }
                                        // Rich Link Card Renderer
                                        return (
                                            <a
                                                key={idx}
                                                href={link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex flex-col md:flex-row border border-gray-200 rounded-xl overflow-hidden shadow-md mb-6 transition-shadow duration-200 hover:shadow-lg hover:border-primary-300"
                                            >
                                                <div className="p-4 flex-1">
                                                    <p className="text-xs text-gray-500 uppercase">{meta.site_name || "Link"}</p>
                                                    <h4 className="text-lg font-bold text-gray-800 mt-1 mb-2">{meta.title}</h4>
                                                    <p className="text-sm text-gray-600 line-clamp-2">{meta.description}</p>
                                                </div>
                                                {meta.image && (
                                                    <div className="md:w-40 w-full h-32 md:h-auto shrink-0">
                                                        <img
                                                            src={meta.image.url}
                                                            alt={meta.title}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                )}
                                            </a>
                                        );
                                    default:
                                        return null;
                                }
                            })}
                        </div>


                        <div className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:space-x-4">
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
            </div>

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