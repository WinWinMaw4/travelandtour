import { useGetEndpointQuery } from "@services/apiSlice";
import { endpoints } from "@services/endpoints";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

interface Blog {
    id: number;
    title: string;
    slug: string;
    coverImage?: string;
    createdAt: string;
    content?: string;
}

const BlogList: React.FC = () => {
    const { data, isLoading, isError } = useGetEndpointQuery(`${endpoints.blogs}`);

    useEffect(() => {
        console.log("Fetched Blogs:", data);
    }, [data]);

    if (isLoading)
        return (
            <div className="text-center py-20 text-gray-500">
                Loading blogs...
            </div>
        );

    if (isError)
        return (
            <div className="text-center py-20 text-red-500">
                Failed to load blogs. Please try again later.
            </div>
        );

    if (!data || data.length === 0)
        return (
            <div className="text-center py-20 text-gray-500">
                No blogs available yet.
            </div>
        );

    return (
        <section className="max-w-6xl mx-auto px-6 py-20">
            <div className="flex justify-between items-center mb-12">
                <h2 className="text-4xl font-bold text-center">All Blog Posts</h2>
                <Link
                    to="create"
                    className="text-emerald-700 hover:underline font-medium"
                >
                    + Create New
                </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                {data.map((post: Blog, idx: number) => {
                    let excerpt = "";

                    // ✅ safely parse Editor.js JSON content if valid
                    if (post.content) {
                        try {
                            const parsed = JSON.parse(post.content);
                            excerpt =
                                parsed?.blocks?.[0]?.data?.text?.replace(/<[^>]+>/g, "")?.slice(0, 120) ||
                                "";
                        } catch {
                            // content is plain text, not JSON
                            excerpt = post.content.slice(0, 120);
                        }
                    }

                    return (
                        <div
                            key={idx}
                            className="bg-white rounded-2xl shadow-md hover:shadow-lg overflow-hidden transition"
                        >
                            {/* Cover Image */}
                            <img
                                src={
                                    post.coverImage?.startsWith("http")
                                        ? post.coverImage
                                        : `${import.meta.env.VITE_API_BASE_URL || ""}${post.coverImage}`
                                }
                                alt={post.title}
                                className="w-full h-48 object-cover"
                            />

                            {/* Blog Content */}
                            <div className="p-6">
                                <p className="text-gray-500 text-sm mb-2">
                                    {new Date(post.createdAt).toDateString()}
                                </p>
                                <h3 className="text-xl font-semibold mb-2 line-clamp-2">
                                    {post.title}
                                </h3>

                                {/* ✅ Now excerpt never crashes */}
                                {excerpt && (
                                    <p className="text-gray-700 mb-4 line-clamp-3">{excerpt}...</p>
                                )}

                                <Link
                                    to={`/blogs/${post.slug}`}
                                    className="text-emerald-700 font-semibold hover:underline"
                                >
                                    Read More →
                                </Link>
                            </div>
                        </div>
                    );
                })}
            </div>

        </section>
    );
};

export default BlogList;
