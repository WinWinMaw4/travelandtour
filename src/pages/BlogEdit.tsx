/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, type ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useInvalidateEndpointMutation, useGetEndpointQuery } from "@services/apiSlice";
import { endpoints } from "@services/endpoints";
import toast from "react-hot-toast";

import BlogTitleInput from "@components/page/blog/BlogTitleInput";
import BlogEditor from "@components/page/blog/BlogEditor";
import BlogCoverUploader from "@components/page/blog/BlogCoverUploader";
import BlogSubmitButton from "@components/page/blog/BlogSubmitButton";

interface ValidationErrors {
    title?: string;
    content?: string;
    [key: string]: string | undefined;
}

const BlogEdit = () => {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();

    const { data: blogData, isLoading: isFetching } = useGetEndpointQuery(`${endpoints.blogs}/${slug}`);
    const [updateBlog, { isLoading: isUpdating }] = useInvalidateEndpointMutation();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState<any>(null);
    const [coverImage, setCoverImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [errors, setErrors] = useState<ValidationErrors>({});

    // Populate state with existing blog
    useEffect(() => {
        if (blogData) {
            setTitle(blogData.title || "");
            try {
                setContent(blogData.content ? JSON.parse(blogData.content) : null);
            } catch {
                setContent(blogData.content || null);
            }
            setPreview(blogData.coverImage?.startsWith("http")
                ? blogData.coverImage
                : `${import.meta.env.VITE_API_BASE_URL || ""}${blogData.coverImage}`);
        }
    }, [blogData]);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setCoverImage(file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result as string);
            reader.readAsDataURL(file);
        } else {
            setPreview(blogData?.coverImage || null);
        }
    };

    const handleSubmit = async () => {
        setErrors({}); // clear previous errors

        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", JSON.stringify(content));
        if (coverImage) formData.append("coverImage", coverImage);

        try {
            const res = await updateBlog({
                url: `${endpoints.blogs}/${blogData?.id}`,
                method: "PATCH", // use PATCH or PUT
                body: formData,
            }).unwrap();

            if (res?.message === "Blog updated successfully") {
                navigate(-1);
                toast.success("Blog updated successfully!", {
                    duration: 4000, // Toast will disappear after 4 seconds
                });
            } else if (res?.errors) {
                setErrors(res.errors);
            }
        } catch (err: any) {
            if (err?.data?.errors) {
                setErrors(err.data.errors);
            } else {
                console.error(err);
            }
        }
    };

    if (isFetching)
        return (
            <div className="text-center py-20 text-gray-500">
                Loading blog data...
            </div>
        );

    return (
        <div className="max-w-3xl mx-auto p-6 space-y-6 bg-white rounded-2xl shadow mt-10">
            <h1 className="text-3xl font-bold text-gray-800">Edit Blog</h1>

            <BlogTitleInput value={title} onChange={setTitle} error={errors.title} />
            {content === null ? (
                <div className="text-gray-500 py-6 text-center">Loading editor...</div>
            ) : (
                <BlogEditor onChange={setContent} error={errors.content} value={content} />
            )}


            <BlogCoverUploader preview={preview} onFileChange={handleFileChange} />
            <BlogSubmitButton onClick={handleSubmit} isLoading={isUpdating} mode="update" />
        </div>
    );
};

export default BlogEdit;
