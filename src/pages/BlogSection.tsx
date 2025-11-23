/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetEndpointQuery } from "@services/apiSlice";
import { endpoints } from "@services/endpoints";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

interface Blog {
  id: number;
  title: string;
  slug: string;
  coverImage?: string;
  createdAt: string;
  content?: string;
}

const BlogSection: React.FC = () => {
  const { t } = useTranslation()
  // Fetch only the latest 3 blogs
  const { data, isLoading, isError } = useGetEndpointQuery(`${endpoints.blogs}?latest=true`);

  if (isLoading)
    return <div className="text-center py-20 text-gray-500">Loading latest blogs...</div>;
  if (isError || !data)
    return <div className="text-center py-20 text-red-500">Failed to load blogs.</div>;

  return (
    <section id="blog" className="max-w-6xl mx-auto px-6 py-10 lg:py-20">
      <div className="flex justify-between items-center mb-12 flex-wrap gap-4">
        <h3 className="text-3xl font-semibold flex-1">{t("latestBlogs.sectionTitle")}</h3>
        <Link
          to="/blogs"
          className="text-primary-700 font-semibold hover:underline"
        >
          {t("latestBlogs.seeAll")}
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-2 md:gap-6 lg:gap-8">
        {data?.blogs?.map((post: Blog) => {
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
            // <Link key={post.id} to={`/blogs/${post.slug}`} className="cursor-pointer">
            <div key={post.id} className="bg-white group rounded-2xl shadow-md hover:shadow-lg overflow-hidden transition flex flex-col h-full">
              {/* Cover Image */}
              <Link to={`/blogs/${post.slug}`}>

                <div className="w-full aspect-[3/2] overflow-hidden bg-primary-200/20">
                  <img
                    src={
                      post.coverImage
                        ? post.coverImage.startsWith("http")
                          ? post.coverImage
                          : `${import.meta.env.VITE_API_BASE_URL || ""}${post.coverImage}`
                        : "https://via.placeholder.com/800x400?text=No+Cover+Image"
                    }
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </Link>

              {/* Blog Content */}
              <div className="p-4 lg:p-6 flex-1 flex flex-col">
                <p className="text-gray-500 text-xs md:text-sm mb-2">
                  {new Date(post.createdAt).toDateString()}
                </p>
                <h4 className="md:text-xl font-semibold mb-2 line-clamp-2 group-hover:text-primary-700">
                  {post.title}
                </h4>
                {excerpt && (
                  <p className="text-gray-700 text-sm md:text-base mb-4 line-clamp-3">
                    {excerpt}...
                  </p>
                )}
                <div className="mt-auto">
                  <Link
                    to={`/blogs/${post.slug}`}
                    className="text-primary-700 font-semibold hover:underline"
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            </div>
            // </Link>
          );
        })}
      </div>
    </section>
  );
};

export default BlogSection;
