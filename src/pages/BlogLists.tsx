/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetEndpointQuery } from "@services/apiSlice";
import { endpoints } from "@services/endpoints";
import type { RootState } from "@store/index";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import Pagination from "@components/ui/Pagination";
import SEO from "@components/share/seo/SEO";
import { useTranslation } from "react-i18next";

// --- Types ---
interface Blog {
    id: number;
    title: string;
    slug: string;
    coverImage?: string;
    createdAt: string;
    content?: string;
}

interface ApiResponse {
    totalPages: number;
    currentPage: number;
    totalItems: number;
    blogs: Blog[];
}

const ITEMS_PER_PAGE = 30;

const BlogList: React.FC = () => {
    const { t } = useTranslation();
    const [searchParams, setSearchParams] = useSearchParams();

    // Read current pagination + search from URL
    const urlPage = searchParams.get("page") || "1";
    const urlSearch = searchParams.get("search") || "";

    const currentPage = Math.max(1, parseInt(urlPage, 10) || 1);
    const searchValue = urlSearch;

    // ✅ Dynamic API endpoint with search support
    const blogsEndpoint = `${endpoints.blogs}?page=${currentPage}&limit=${ITEMS_PER_PAGE}${searchValue ? `&search=${encodeURIComponent(searchValue)}` : ""
        }`;

    const { data: response, isLoading, isError, isFetching } =
        useGetEndpointQuery(blogsEndpoint);

    const apiData = response as ApiResponse | undefined;
    const blogs: Blog[] = apiData?.blogs || [];
    const totalPages = apiData?.totalPages || 1;

    const isAuthenticated = useSelector(
        (state: RootState) => state.auth.isAuthenticated
    );

    useEffect(() => {
        if (response && !isFetching) {
            console.log("Fetching:", blogsEndpoint);
        }
    }, [response, isFetching, blogsEndpoint]);

    // ✅ Page change maintains current search filter
    const handlePageChange = (page: number) => {
        searchParams.set("page", page.toString());
        if (searchValue) searchParams.set("search", searchValue);
        setSearchParams(searchParams);

        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // ✅ States
    if (isLoading)
        return <div className="text-center py-20">Loading blogs...</div>;

    if (isError)
        return (
            <div className="text-center py-20 text-red-600">
                Failed to load blogs.
            </div>
        );

    // if (!blogs.length)
    //     return (
    //         <div className="text-center py-20 text-gray-500">
    //             No blogs found.
    //         </div>
    //     );

    return (
        <>
            <SEO
                title={
                    searchValue
                        ? `Search results for "${searchValue}" | Blog | Makka Tour`
                        : currentPage > 1
                            ? `Blogs – Page ${currentPage} | Makka Tour`
                            : `Blog | Makka Tour – Spiritual & Travel Insights`
                }
                description={
                    searchValue
                        ? `Blog search results for "${searchValue}" at Makka Tour. Explore articles about Hajj, Umrah, Islamic history and travel guidance.`
                        : `Explore Hajj & Umrah travel guides, Islamic history articles, and spiritual journey insights with Makka Tour. Updated regularly for Muslim pilgrims.`
                }
                keywords="Hajj blog Myanmar, Umrah blog Myanmar, Makka Tour blogs, Islamic travel articles, pilgrimage guidance"
                url={`${window.location.origin}/blogs?page=${currentPage}` + (searchValue ? `&search=${encodeURIComponent(searchValue)}` : "")}
            // image="/default-blog-cover.png"
            />
            <section className="max-w-6xl mx-auto px-6 py-20">
                {/* ✅ Search + Create Button */}
                <div className="flex justify-between items-center mb-12 gap-4">
                    <h2 className="text-2xl md:text-3xl font-bold">{t("blogsList.sectionTitle")}</h2>

                    <div className="flex items-center gap-3">
                        {/* Search Input */}


                        {isAuthenticated && (
                            <Link
                                to="/blogs/create"
                                className="px-5 py-2 rounded text-white bg-primary-700 hover:bg-primary-800"
                            >
                                + Create Blog
                            </Link>
                        )}
                    </div>
                </div>
                <div className="w-full mb-5">
                    <input
                        type="text"
                        value={searchValue}
                        onChange={(e) => {
                            const value = e.target.value;
                            searchParams.set("search", value);
                            searchParams.set("page", "1");
                            setSearchParams(searchParams);
                        }}
                        placeholder={t("blogsList.searchPlaceholder")}
                        className="w-full px-4 py-3 border border-gray-400 rounded-lg focus-within:outline-0 focus:ring-primary-500 focus:border-primary-500"
                    />
                </div>

                {/* ✅ Blog List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {blogs.map((post: Blog) => {
                        // ✅ Better excerpt cleaning for Editor.js content
                        let excerpt = "";
                        if (post.content) {
                            try {
                                const parsed = JSON.parse(post.content);
                                const firstBlock = parsed?.blocks?.find(
                                    (b: any) => b.type === "paragraph" && b.data?.text
                                );
                                excerpt = firstBlock?.data?.text
                                    ?.replace(/<[^>]*>/g, "")
                                    .replace(/&nbsp;/g, " ")
                                    .replace(/\s+/g, " ")
                                    .trim()
                                    .slice(0, 150);
                            } catch {
                                excerpt = post.content
                                    .replace(/<[^>]*>/g, "")
                                    .replace(/&nbsp;/g, " ")
                                    .slice(0, 150);
                            }
                        }

                        return (
                            <Link
                                to={`/blogs/${post.slug}`}
                                key={post.id}
                                className="cursor-pointer"
                            >
                                <div className="bg-white overflow-hidden rounded-xl shadow hover:shadow-xl transition flex flex-col">
                                    <div className="w-full aspect-video overflow-hidden bg-gray-100">
                                        <img
                                            src={
                                                post.coverImage?.startsWith("http")
                                                    ? post.coverImage
                                                    : `${import.meta.env.VITE_API_BASE_URL || ""
                                                    }${post.coverImage}`
                                            }
                                            alt={post.title}
                                            className="w-full h-full object-cover hover:scale-105 transition-transform"
                                        />
                                    </div>

                                    <div className="p-5 flex-grow">
                                        <p className="text-xs text-gray-500 mb-1">
                                            {new Date(post.createdAt).toDateString()}
                                        </p>

                                        <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                                            {post.title}
                                        </h3>

                                        {excerpt && (
                                            <p className="text-gray-700 text-sm line-clamp-3">
                                                {excerpt}...
                                            </p>
                                        )}

                                        <span className="text-primary-700 font-semibold mt-3 inline-block">
                                            Read More →
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>

                {/* ✅ Pagination */}
                {totalPages > 1 && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                )}
            </section>
        </>
    );
};

export default BlogList;
