// src/components/ui/FlippingCallButton.tsx

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Phone, Mail, ChevronRight } from "lucide-react";

// --- API and Service Imports ---
// Assuming these imports are correct based on your project structure:
import { useGetEndpointQuery } from "@services/apiSlice";
import { endpoints } from "@services/endpoints";

// --- TYPE DEFINITIONS ---
/* eslint-disable @typescript-eslint/no-explicit-any */
// Define the shape of the data coming from your API endpoint
interface ApiContact {
    id: number;
    country_code: string; // e.g., 'AU', 'MM'
    city: string;
    state?: string;
    country: string;
    phone: string;
    email: string;
}

// Define the shape of an action for the button
interface Action {
    icon: React.ElementType;
    label: string;
    href: string;
    bgColor: string;
}

// --- DATA TRANSFORMATION LOGIC ---

/**
 * Transforms the API contact data into an array of Action objects 
 * for the flipping button.
 */
const generateContactActions = (data: ApiContact[]): Action[] => {
    return data.flatMap((contact) => [
        // 1. Phone/Call Action
        {
            icon: Phone,
            // Display country code and phone number on hover
            label: `Call ${contact.country_code} (${contact.phone})`,
            // Clean up phone number (remove spaces) for tel: link
            href: `tel:${contact.phone.replace(/\s/g, '')}`,
            bgColor: "bg-green-600",
        },
        // 2. Email Action
        {
            icon: Mail,
            label: `Email ${contact.country_code}`,
            href: `mailto:${contact.email}`,
            bgColor: "bg-blue-600",
        },
    ]);
};

// --- FLIPPING CALL BUTTON COMPONENT ---

const FlippingCallButton: React.FC = () => {
    // ----------------------------------------------------
    // 1. ALL HOOKS MUST BE CALLED UNCONDITIONALLY AT THE TOP
    // ----------------------------------------------------

    // Fetch Contact Data
    const { data, isLoading, isSuccess } = useGetEndpointQuery(`${endpoints.contacts}`);

    // Memoize Actions (Calculate actions only when data changes)
    const actions: Action[] = useMemo(() => {
        // Use 'as any' to bypass the strict type check since API return type uses 'any'
        if (isSuccess && data?.data) {
            return generateContactActions(data.data as any);
        }
        return [];
    }, [isSuccess, data]);

    // Component State
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    // Function to rotate the action
    const rotateAction = useCallback(() => {
        const len = actions.length;
        if (len === 0) return; // Guard against division by zero
        setCurrentIndex((prevIndex) => (prevIndex + 1) % len);
    }, [actions.length]);

    // Effect for automatic rotation when not hovered
    useEffect(() => {
        if (!isHovered && actions.length > 0) {
            const interval = setInterval(rotateAction, 3000);
            return () => clearInterval(interval);
        }
    }, [isHovered, rotateAction, actions.length]);


    // ----------------------------------------------------
    // 2. CONDITIONAL RETURN (AFTER ALL HOOKS)
    // ----------------------------------------------------

    // If data is loading or no actions are generated, render nothing
    if (isLoading || actions.length === 0) {
        return null;
    }

    // ----------------------------------------------------
    // 3. RENDERING LOGIC
    // ----------------------------------------------------

    const currentAction = actions[currentIndex];
    const IconComponent = currentAction.icon;

    return (
        <a
            href={currentAction.href}
            aria-label={currentAction.label}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`
                relative flex items-center h-12 rounded-full font-bold text-white transition-all duration-500 ease-in-out shadow-lg 
                ${currentAction.bgColor}
                hover:shadow-xl hover:scale-[1.02] 
                ${isHovered ? 'w-auto px-4' : 'w-12 justify-center'} 
            `}
        >
            <div className={`
                flex items-center transition-opacity duration-300 
                ${isHovered ? 'opacity-100' : 'opacity-0'} 
            `}>
                <span className="text-sm whitespace-nowrap">{currentAction.label}</span>
                <ChevronRight size={16} className="ml-1" />
            </div>

            <div className={`
                absolute flex items-center justify-center top-0 left-0 h-full w-12 rounded-full transition-opacity duration-300
                ${isHovered ? 'opacity-0' : 'opacity-100'} 
            `}>
                <IconComponent size={24} />
            </div>

        </a>
    );
};

export default FlippingCallButton;