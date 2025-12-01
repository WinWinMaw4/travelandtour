import React from "react";
import { useSearchParams } from "react-router-dom";
import { useGetEndpointQuery } from "@services/apiSlice";
import { endpoints } from "@services/endpoints";
import Pagination from "@components/ui/Pagination";

const ITEMS_PER_PAGE = 20;

interface Booking {
    id: number;
    title: string;
    price: number;
    packageId: number;
    name: string;
    contact: string;
    email: string;
    suburb: string;
    person: number;
    town: string;
    state: string;
    note: string;
    createdAt: string;
}

interface ApiResponse {
    totalItems: number;
    totalPages: number;
    currentPage: number;
    bookings: Booking[];
}

const BookingPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const urlPage = searchParams.get("page") || "1";
    const urlSearch = searchParams.get("search") || "";

    const currentPage = Math.max(1, parseInt(urlPage, 10) || 1);

    const endpoint = `${endpoints.bookings}?page=${currentPage}&limit=${ITEMS_PER_PAGE}${urlSearch ? `&search=${encodeURIComponent(urlSearch)}` : ""
        }`;

    const { data, isLoading } = useGetEndpointQuery(endpoint);

    const api = data as ApiResponse | undefined;
    const bookings = api?.bookings || [];

    const handlePageChange = (page: number) => {
        setSearchParams({ page: String(page), search: urlSearch });
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Bookings</h1>

            {/* Search */}
            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Search by name or package..."
                    defaultValue={urlSearch}
                    onChange={(e) =>
                        setSearchParams({ page: "1", search: e.target.value })
                    }
                    className="w-full px-4 py-2 border rounded-lg shadow-sm focus-within:outline-0 focus:ring focus:ring-primary-200"
                />
            </div>

            {/* Loading */}
            {isLoading && (
                <div className="text-center py-10 text-gray-600">Loading...</div>
            )}

            {/* Empty */}
            {!isLoading && bookings.length === 0 && (
                <div className="text-center text-gray-500 py-10">No bookings found.</div>
            )}

            {/* Card List */}
            <div className="space-y-4">
                <div className="space-y-4">
                    {bookings.map((item) => (
                        <div
                            key={item.id}
                            className="rounded-lg border bg-white shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 p-4"
                        >
                            {/* Header */}
                            <div className="flex justify-between items-center">
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-900">
                                        {item.title}
                                    </h2>
                                    <p className="text-primary-600 font-bold text-sm">
                                        AUD {item.price.toLocaleString()}
                                    </p>
                                </div>

                                <span className="px-2 py-1 text-[11px] font-semibold bg-primary-100 text-primary-700 rounded-md">
                                    #{item.id}
                                </span>
                            </div>

                            {/* Compact Grid */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-2 mt-4 text-[13px]">

                                <div>
                                    <p className="text-gray-500">Name</p>
                                    <p className="font-medium">{item.name}</p>
                                </div>

                                <div>
                                    <p className="text-gray-500">Contact</p>
                                    <p className="font-medium">{item.contact}</p>
                                </div>

                                <div>
                                    <p className="text-gray-500">Email</p>
                                    <p className="font-medium break-all">{item.email}</p>
                                </div>

                                <div>
                                    <p className="text-gray-500">Person</p>
                                    <p className="font-medium">{item.person}</p>
                                </div>

                                <div>
                                    <p className="text-gray-500">Suburb</p>
                                    <p className="font-medium">{item.suburb}</p>
                                </div>

                                <div>
                                    <p className="text-gray-500">Town</p>
                                    <p className="font-medium">{item.town}</p>
                                </div>

                                <div>
                                    <p className="text-gray-500">State</p>
                                    <p className="font-medium">{item.state}</p>
                                </div>

                                <div>
                                    <p className="text-gray-500">Created</p>
                                    <p className="font-medium">
                                        {new Date(item.createdAt).toLocaleString()}
                                    </p>
                                </div>

                            </div>

                            {/* Note (collapsed style) */}
                            {item.note && (
                                <div className="mt-3 bg-gray-50 rounded-md p-3 text-[13px]">
                                    <p className="text-gray-500">Note</p>
                                    <p className="text-gray-800 mt-1">{item.note}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

            </div>

            {/* Pagination */}
            <Pagination
                currentPage={api?.currentPage || 1}
                totalPages={api?.totalPages || 1}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default BookingPage;
