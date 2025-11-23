// src/components/ui/LocationContactButton.tsx

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Phone, Mail, ChevronRight } from "lucide-react";

// --- TYPE DEFINITIONS ---

// Define the shape of an action for the button (same as before)
interface Action {
    icon: React.ElementType;
    label: string;
    countryCode: string;
    href: string;
    bgColor: string;
}

// Props for the button: it accepts the pre-calculated actions
interface LocationContactButtonProps {
    contact: {
        countryCode: string;
        phone: string;
        email: string;
    }
}

// --- DATA TRANSFORMATION LOGIC (Local to this component) ---

const generateActions = (contact: LocationContactButtonProps['contact']): Action[] => [
    // 1. Phone/Call Action
    {
        icon: Phone,
        label: `Call ${contact.countryCode}`,
        countryCode: `${contact.countryCode}`,
        href: `tel:${contact.phone.replace(/\s/g, '')}`,
        bgColor: "bg-green-600",
    },
    // 2. Email Action
    {
        icon: Mail,
        label: `Email ${contact.countryCode}`,
        countryCode: `${contact.countryCode}`,
        href: `mailto:${contact.email}`,
        bgColor: "bg-yellow-600",
    },
];

// --- LOCATION CONTACT BUTTON COMPONENT ---

const LocationContactButton: React.FC<LocationContactButtonProps> = ({ contact }) => {

    // 1. Calculate Actions
    const actions: Action[] = useMemo(() => generateActions(contact), [contact]);

    // 2. Component State and Handlers
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    // Function to rotate the action
    const rotateAction = useCallback(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % actions.length);
    }, [actions.length]);

    // Effect for automatic rotation
    useEffect(() => {
        if (!isHovered) {
            const interval = setInterval(rotateAction, 3000);
            return () => clearInterval(interval);
        }
    }, [isHovered, rotateAction]);

    const currentAction = actions[currentIndex];
    const IconComponent = currentAction.icon;

    return (
        <a
            href={currentAction.href}
            aria-label={currentAction.label}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`
                relative flex items-center h-10 rounded-full font-bold text-white transition-all duration-500 ease-in-out shadow-lg 
                ${currentAction.bgColor}
                hover:shadow-xl hover:scale-[1.02] 
                ${isHovered ? 'w-auto px-3' : 'w-10 justify-center'} 
            `}
        >
            {/* Hover Content */}
            <div className={`
                flex items-center transition-opacity duration-300 
                ${isHovered ? 'opacity-100' : 'opacity-0'} 
            `}>
                <span className="text-sm whitespace-nowrap">{currentAction.label}</span>
                <ChevronRight size={16} className="ml-1" />
            </div>

            {/* Icon Content */}
            <div className={`
                absolute flex items-center justify-center top-0 left-0 h-full w-10 rounded-full transition-opacity duration-300
                ${isHovered ? 'opacity-0' : 'opacity-100'} 
            `}>
                <IconComponent size={20} />
            </div>
        </a>
    );
};

export default LocationContactButton;