/* eslint-disable @typescript-eslint/no-explicit-any */
import EditorComponent from "@components/ui/EditorComponent";
import { useInvalidateEndpointMutation } from "@services/apiSlice";
import { endpoints } from "@services/endpoints";
import React, { useState, ChangeEvent } from "react";

const BlogCreate = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState<any>(null);
    const [coverImage, setCoverImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    const [createBlog, { isLoading }] = useInvalidateEndpointMutation();

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setCoverImage(file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result as string);
            reader.readAsDataURL(file);
        } else {
            setPreview(null);
        }
    };

    const handleSubmit = async () => {
        if (!title || !content) {
            return alert("Title and content are required");
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", JSON.stringify(content)); // store as JSON
        if (coverImage) formData.append("coverImage", coverImage);

        try {
            await createBlog({
                url: endpoints.blogs,
                method: "POST",
                body: formData,
            }).unwrap();
            alert("Blog created successfully!");
            setTitle("");
            setContent(null);
            setCoverImage(null);
            setPreview(null);
        } catch (err) {
            console.error(err);
            alert("Failed to create blog");
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-4 space-y-4">
            <h1 className="text-2xl font-bold">Create Blog</h1>

            <input
                type="text"
                placeholder="Blog Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border p-2 rounded"
            />

            <div>
                <label className="block mb-1 font-semibold">Content</label>
                <EditorComponent onChange={setContent} />
            </div>

            <div>
                <label className="block mb-1 font-semibold">Cover Image</label>
                <input type="file" accept="image/*" onChange={handleFileChange} />
                {preview && (
                    <img
                        src={preview}
                        alt="Preview"
                        className="mt-2 max-h-64 object-cover"
                    />
                )}
            </div>

            <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            >
                {isLoading ? "Creating..." : "Create Blog"}
            </button>
        </div>
    );
};

export default BlogCreate;
