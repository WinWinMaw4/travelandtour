/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { useGetEndpointQuery, useInvalidateEndpointMutation } from "@services/apiSlice";
import { endpoints } from "@services/endpoints";
import { toast } from "react-toastify";

const ContactPage = () => {
    const { data, isLoading } = useGetEndpointQuery(`${endpoints.contacts}`);
    const [contacts, setContacts] = useState<any[]>([]);
    const [savingId, setSavingId] = useState<number | null>(null);

    // RTK Query mutation
    const [updateContact] = useInvalidateEndpointMutation();

    useEffect(() => {
        if (data?.data) {
            // Filter to only show ID 1 and 2
            const filtered = data.data.filter((item: any) => item.id === 1 || item.id === 2);
            setContacts(filtered);
        }
    }, [data]);

    const handleInputChange = (id: number, field: string, value: string) => {
        setContacts((prev) =>
            prev.map((ct) => (ct.id === id ? { ...ct, [field]: value } : ct))
        );
    };

    const handleSave = async (contact: any) => {
        setSavingId(contact.id);

        try {
            await updateContact({
                url: `${endpoints.contacts}/${contact.id}`,
                method: "PUT",
                body: contact,
            }).unwrap();

            toast.success("Updated Successfully");
        } catch (error) {
            console.error(error);
            toast.error("Updating Failed ❌");
        } finally {
            setSavingId(null);
        }
    };


    if (isLoading) return <p>Loading...</p>;

    return (
        <div className="p-6 space-y-8 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-primary-700">Contact</h1>

            {contacts.map((ct) => (
                <div
                    key={ct.id}
                    className="border border-gray-300 p-4 rounded-lg shadow-sm space-y-3"
                >
                    <p className="text-sm font-semibold">
                        {ct.country_code} {ct.city}
                        {ct.state ? `, ${ct.state}` : ""}, {ct.country}
                    </p>

                    <div className="space-y-2">
                        {/* Phone field */}
                        <input
                            type="text"
                            className="w-full border border-primary-700 focus-within:outline-0 focus-within:border-2 rounded px-3 py-1"
                            value={ct.phone}
                            onChange={(e) => handleInputChange(ct.id, "phone", e.target.value)}
                        />

                        {/* Email field */}
                        <input
                            type="email"
                            className="w-full border border-primary-700 focus-within:outline-0 focus-within:border-2 rounded px-3 py-1"
                            value={ct.email}
                            onChange={(e) => handleInputChange(ct.id, "email", e.target.value)}
                        />

                        {/* Save button */}
                        <button
                            className="bg-primary-600 text-white px-4 py-1 rounded cursor-pointer"
                            disabled={savingId === ct.id} // remove isUpdating here
                            onClick={() => handleSave(ct)}
                        >
                            {savingId === ct.id ? "Saving..." : "Save Changes"}
                        </button>

                    </div>
                </div>
            ))}
        </div>
    );
};

export default ContactPage;
