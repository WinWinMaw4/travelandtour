import { useGetEndpointQuery } from "@services/apiSlice";
import { endpoints } from "@services/endpoints";
import React from "react";
import { useTranslation } from "react-i18next";

const Branches: React.FC = () => {
    const { t } = useTranslation();
    const { data, isLoading } = useGetEndpointQuery(`${endpoints.contacts}`);

    if (isLoading) return <p>Loading...</p>;

    return (
        <div className="grid md:grid-cols-2 gap-6">
            {data?.data?.map((branch: any) => (
                <div
                    key={branch.id}
                    className="bg-white shadow-md rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition"
                >
                    <div className="flex items-center gap-2 mb-2">
                        {/* Use flag emoji based on country_code */}
                        <span className="text-2xl">
                            {branch.country_code === "AU" ? "🇦🇺" : branch.country_code === "MM" ? "🇲🇲" : "🏳️"}
                        </span>
                        <h4 className="text-lg font-semibold text-primary-700">
                            {branch.country} Branch
                        </h4>
                    </div>
                    <p className="text-sm text-gray-600">
                        📍 {branch.city}{branch.state ? `, ${branch.state}` : ""}
                    </p>
                    <p className="text-sm text-gray-600">
                        📞{" "}
                        <a href={`tel:${branch.phone}`} className="text-primary-700 hover:underline">
                            {branch.phone}
                        </a>
                    </p>
                    <p className="text-sm text-gray-600">
                        📧{" "}
                        <a href={`mailto:${branch.email}`} className="text-primary-700 hover:underline">
                            {branch.email}
                        </a>
                    </p>
                </div>
            ))}
        </div>
    );
};

export default Branches;
