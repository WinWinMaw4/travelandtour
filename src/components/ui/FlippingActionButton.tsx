import React, { useState } from "react";
import { Phone, MessageCircle, Mail, ChevronRight } from "lucide-react";
import { BsWhatsapp } from "react-icons/bs";
import ContactInfoModal from "./ContactInfoModal";

interface ApiContact {
    id: number;
    country_code: string; // e.g., 'AU', 'MM'
    city: string;
    state?: string;
    country: string;
    phone: string;
    email: string;
}


interface Props {
    contacts: ApiContact[]; // API data
}

const FlippingActionButton: React.FC<Props> = ({ contacts }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Only Call Now button triggers modal
    const contactButtons = [
        { icon: Phone, label: "Call Now", bgColor: "bg-yellow-600", onClick: () => setIsModalOpen(true) },
        { icon: BsWhatsapp, label: "WhatsApp", bgColor: "bg-green-600", href: "https://wa.me/61490866626" },
        { icon: Mail, label: "Email Us", bgColor: "bg-blue-600", href: "mailto:asiaskyblue.au@gmail.com" },
    ];

    return (
        <>
            <div className="flex items-center gap-3">
                {contactButtons.map((btn, idx) => (
                    <HoverExpandButton
                        key={idx}
                        icon={btn.icon}
                        label={btn.label}
                        bgColor={btn.bgColor}
                        href={btn.href}
                        onClick={btn.onClick}
                    />
                ))}
            </div>

            {/* Modal for Call Now */}
            <ContactInfoModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                packageTitle="Quick Contact" // can replace with dynamic title
                contactData={contacts}
            />
        </>
    );
};

interface HoverProps {
    icon: React.ElementType;
    label: string;
    bgColor: string;
    href?: string;
    onClick?: () => void;
}

const HoverExpandButton: React.FC<HoverProps> = ({ icon: Icon, label, bgColor, href, onClick }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <a
            href={href}
            target="_blank"
            onClick={(e) => { if (onClick) { e.preventDefault(); onClick(); } }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`
        relative flex items-center h-10 rounded-full text-white font-semibold shadow-md
        transition-all duration-500 ease-in-out
        ${bgColor}
        hover:shadow-xl hover:scale-[1.02]
        ${isHovered ? "w-auto px-3" : "w-10 justify-center"}
      `}
        >
            {/* Label + Chevron */}
            <div className={`cursor-pointer flex items-center transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}>
                <span className="text-sm whitespace-nowrap">{label}</span>
                <ChevronRight size={14} className="ml-1" />
            </div>

            {/* Icon */}
            <div className={`absolute left-0 top-0 h-full w-10 cursor-pointer flex items-center justify-center transition-opacity duration-300 ${isHovered ? "opacity-0" : "opacity-100"}`}>
                <Icon size={18} />
            </div>
        </a>
    );
};

export default FlippingActionButton;
