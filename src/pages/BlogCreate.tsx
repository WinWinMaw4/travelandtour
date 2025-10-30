/* eslint-disable @typescript-eslint/no-explicit-any */
import  { useState, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useInvalidateEndpointMutation } from "@services/apiSlice";
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

const BlogCreate = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState<any>(null);
    const [coverImage, setCoverImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [errors, setErrors] = useState<ValidationErrors>({});

    const navigate = useNavigate();
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
        setErrors({}); // clear previous errors

        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", JSON.stringify(content));
        if (coverImage) formData.append("coverImage", coverImage);

        try {
            const res = await createBlog({
                url: endpoints.blogs,
                method: "POST",
                body: formData,
            }).unwrap();

            if (res?.message === "Blog created successfully") {
                navigate(-1);
                toast.success("Blog created successsfully.", {
                    duration: 4000, // Toast will disappear after 4 seconds
                });


            } else if (res?.errors) {
                // Assign API validation errors to state
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

    return (
        <div className="max-w-3xl mx-auto p-6 space-y-6 bg-white rounded-2xl shadow mt-10">
            <h1 className="text-3xl font-bold text-gray-800"> Create New Blog</h1>

            <BlogTitleInput
                value={title}
                onChange={setTitle}
                error={errors.title} // pass field error
            />

            <BlogEditor onChange={setContent} error={errors.content} />

            <BlogCoverUploader preview={preview} onFileChange={handleFileChange} />

            <BlogSubmitButton onClick={handleSubmit} isLoading={isLoading} mode="create" />
        </div>
    );
};

export default BlogCreate;