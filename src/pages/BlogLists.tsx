import { useGetEndpointQuery } from "@services/apiSlice";
import { endpoints } from "@services/endpoints";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

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
    const navigate = useNavigate();
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
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center">All Blog Posts</h2>
                <Link
                    to="/blogs/create"
                    className="px-5 py-2 rounded text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-emerald-400 focus:ring-2"
                >
                    + Create New Blog
                </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
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
                        <Link to={`/blogs/${post.slug}`}
                            className="cursor-pointer w-full h-full "
                        >

                            <div
                                key={idx}
                                className="bg-white group rounded-2xl shadow-md hover:shadow-lg overflow-hidden transition w-full h-full"
                            >
                                {/* Cover Image */}

                                <div className="w-full aspect-3/2 overflow-hidden bg-emerald-200/20">

                                    <img
                                        src={
                                            post.coverImage
                                                ? post.coverImage.startsWith("http")
                                                    ? post.coverImage
                                                    : `${import.meta.env.VITE_API_BASE_URL || ""}${post.coverImage}`
                                                : "https://via.placeholder.com/800x400?text=No+Cover+Image"
                                        }
                                        alt={post.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>


                                {/* Blog Content */}
                                <div className="p-6">
                                    <p className="text-gray-500 text-xs md:text-sm mb-2">
                                        {new Date(post.createdAt).toDateString()}
                                    </p>
                                    <h3 className="md:text-xl font-semibold mb-2 line-clamp-2 transition-colors group-hover:text-emerald-700">
                                        {post.title}
                                    </h3>

                                    {/* ✅ Now excerpt never crashes */}
                                    {excerpt && (
                                        <p className="text-sm md:text-base text-gray-700 mb-4 line-clamp-3">{excerpt}...</p>
                                    )}

                                    <Link
                                        to={`/blogs/${post.slug}`}
                                        className="text-emerald-700 font-semibold hover:underline"
                                    >
                                        Read More →
                                    </Link>
                                </div>
                            </div>
                        </Link>

                    );
                })}
            </div>

        </section>
    );
};

export default BlogList;
