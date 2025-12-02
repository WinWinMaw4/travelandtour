/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useGetEndpointQuery, useInvalidateEndpointMutation } from "@services/apiSlice";
import { endpoints } from "@services/endpoints";
import FileUploader from "@components/ui/fileUploader/FileUploader";

const DiscountPopUpList = () => {
    const endpoint = `${endpoints.discountpopup}/admin`;
    const { data, isLoading } = useGetEndpointQuery(endpoint);
    const [mutate] = useInvalidateEndpointMutation();

    const [formData, setFormData] = useState({
        image: null as File | null,
        preview: null as string | null,
        isActive: true,
    });

    const [showCreateModal, setShowCreateModal] = useState(false);

    const [editItem, setEditItem] = useState<any>(null);

    if (isLoading)
        return <p className="p-4 text-gray-500 animate-pulse">Loading...</p>;

    // ------------ CREATE ------------
    const handleCreate = async () => {
        const fd = new FormData();
        if (formData.image) fd.append("image", formData.image);
        fd.append("isActive", String(formData.isActive));

        await mutate({
            url: `${endpoints.discountpopup}`,
            method: "POST",
            body: fd,
        });

        setFormData({ image: null, preview: null, isActive: true });
    };

    // ------------ UPDATE ------------
    const handleUpdate = async () => {
        const fd = new FormData();

        if (editItem.image instanceof File) {
            fd.append("image", editItem.image);
        }

        fd.append("isActive", String(editItem.isActive));

        await mutate({
            url: `${endpoints.discountpopup}/${editItem.id}`,
            method: "PATCH",
            body: fd,
        });

        setEditItem(null);
    };

    // ------------ DELETE ------------
    const handleDelete = async (id: number) => {
        await mutate({
            url: `${endpoints.discountpopup}/${id}`,
            method: "DELETE",
        });
    };

    return (
        <div className="p-4 max-w-7xl mx-auto space-y-8">
            <div className="flex justify-between items-center flex-wrap space-y-2">
                <h1 className="text-xl md:text-2xl font-semibold text-gray-800">Discount Popup Manager</h1>
                <button
                    onClick={() => setShowCreateModal(true)}
                    className="px-4 py-2 bg-primary-700 text-white rounded shadow hover:bg-primary-800 transition"
                >
                    + Create New Popup
                </button>

            </div>

            {/* LIST */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {data?.map((item: any) => (
                    <div
                        key={item.id}
                        className="bg-white shadow rounded-lg overflow-hidden"
                    >
                        <img
                            src={
                                item.image?.startsWith("http")
                                    ? item.image
                                    : `${import.meta.env.VITE_API_URL}${item.image}`
                            }
                            className="w-full h-40 object-contain"
                        />

                        <div className="p-3 space-y-2">
                            <p className="font-medium">
                                Status:{" "}
                                <span
                                    className={
                                        item.isActive
                                            ? "text-green-600"
                                            : "text-red-600"
                                    }
                                >
                                    {item.isActive ? "Active" : "Inactive"}
                                </span>
                            </p>

                            <div className="flex gap-2">
                                <button
                                    onClick={() =>
                                        setEditItem({
                                            ...item,
                                            preview: item.image.startsWith("http")
                                                ? item.image
                                                : `${import.meta.env.VITE_API_URL}${item.image}`,
                                        })
                                    }
                                    className="flex-1 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(item.id)}
                                    className="flex-1 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>


            {/* Create MODAL */}
            {showCreateModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-[9999]">
                    <div className="bg-white rounded-lg p-5 w-full max-w-md shadow-xl space-y-4">
                        <h3 className="text-xl font-semibold">Create New Popup</h3>

                        <FileUploader
                            preview={formData.preview}
                            onChange={(file) => {
                                setFormData({
                                    ...formData,
                                    image: file,
                                    preview: file ? URL.createObjectURL(file) : null,
                                });
                            }}
                        />

                        <div>
                            <label className="text-sm font-medium">Status</label>
                            <select
                                className="border p-2 rounded w-full mt-1"
                                value={formData.isActive ? "1" : "0"}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        isActive: e.target.value === "1",
                                    })
                                }
                            >
                                <option value="1">Active</option>
                                <option value="0">Inactive</option>
                            </select>
                        </div>

                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setShowCreateModal(false)}
                                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={async () => {
                                    await handleCreate();
                                    setShowCreateModal(false);
                                }}
                                className="px-4 py-2 bg-primary-700 text-white rounded hover:bg-primary-800"
                            >
                                Create
                            </button>
                        </div>
                    </div>
                </div>
            )}


            {/* EDIT MODAL */}
            {editItem && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-[9999]">
                    <div className="bg-white rounded-lg p-5 w-full max-w-md shadow-xl space-y-4">
                        <h3 className="text-xl font-semibold">Edit Popup</h3>

                        <FileUploader
                            preview={editItem.preview}
                            onChange={(file) =>
                                setEditItem({
                                    ...editItem,
                                    image: file,
                                    preview: file ? URL.createObjectURL(file) : editItem.preview,
                                })
                            }
                        />

                        <select
                            className="border p-2 rounded w-full"
                            value={editItem.isActive ? "1" : "0"}
                            onChange={(e) =>
                                setEditItem({
                                    ...editItem,
                                    isActive: e.target.value === "1",
                                })
                            }
                        >
                            <option value="1">Active</option>
                            <option value="0">Inactive</option>
                        </select>

                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setEditItem(null)}
                                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleUpdate}
                                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                            >
                                Update
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DiscountPopUpList;
