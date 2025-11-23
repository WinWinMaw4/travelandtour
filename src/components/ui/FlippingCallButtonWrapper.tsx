// src/components/ui/FlippingCallButtonWrapper.tsx

import React, { useMemo } from "react";

// --- API and Service Imports ---
import { useGetEndpointQuery } from "@services/apiSlice";
import { endpoints } from "@services/endpoints";
import LocationContactButton from "./LocationContactButton";

// --- TYPE DEFINITIONS ---
/* eslint-disable @typescript-eslint/no-explicit-any */
interface ApiContact {
    country_code: string; // e.g., 'AU', 'MM'
    phone: string;
    email: string;
    // ... other fields
}

// --- FLIPPING BUTTON WRAPPER COMPONENT ---

const FlippingCallButtonWrapper: React.FC = () => {
    // 1. Fetch Contact Data
    const { data, isLoading, isSuccess } = useGetEndpointQuery(`${endpoints.contacts}`);

    // 2. Filter and Structure Contact Data
    const contactData = useMemo(() => {
        if (!isSuccess || !data?.data) {
            return { auContact: undefined, mmContact: undefined };
        }

        const contacts: ApiContact[] = data.data as any;

        // Find the specific contacts based on country code
        const auContact = contacts.find(c => c.country_code === 'AU');
        const mmContact = contacts.find(c => c.country_code === 'MM');

        return { auContact, mmContact };

    }, [isSuccess, data]);

    // 3. Early Return for Loading/No Data
    if (isLoading) {
        return null; // Or a simple loading state
    }

    const { auContact, mmContact } = contactData;

    // If neither contact is available, render nothing
    if (!auContact && !mmContact) {
        return null;
    }

    // 4. Render the two separate buttons
    return (
        <div className="flex space-x-2">
            {auContact && (
                <LocationContactButton
                    contact={{
                        countryCode: auContact.country_code,
                        phone: auContact.phone,
                        email: auContact.email
                    }}
                />
            )}

            {mmContact && (
                <LocationContactButton
                    contact={{
                        countryCode: mmContact.country_code,
                        phone: mmContact.phone,
                        email: mmContact.email
                    }}
                />
            )}
        </div>
    );
};

export default FlippingCallButtonWrapper;