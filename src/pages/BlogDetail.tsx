/* eslint-disable no-case-declarations */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetEndpointQuery, useInvalidateEndpointMutation } from "@services/apiSlice";
import { endpoints } from "@services/endpoints";
import { useEffect, useState, type JSX } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../index.css"
import { useSelector } from "react-redux";
import type { RootState } from "@store/index";

const BlogDetail: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();

    // ✅ Get auth state from Redux
    const isAuthenticated = useSelector(
        (state: RootState) => state.auth.isAuthenticated
    );

    const { data: post, error, isLoading } = useGetEndpointQuery(`${endpoints.blogs}/${slug}`);
    const [deleteBlog] = useInvalidateEndpointMutation(); // assuming your RTK Query API slice has delete mutation

    const [showConfirm, setShowConfirm] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    if (isLoading) return <div className="text-center py-20 text-gray-500">Loading blog post...</div>;
    if (error || !post)
        return (
            <div className="max-w-4xl mx-auto px-6 py-20">
                <h2 className="text-2xl font-bold mb-6">Post Not Found</h2>
                <Link to="/blogs" className="text-emerald-700 hover:underline">← Back to Blogs</Link>
            </div>
        );

    const parsedContent = post.content ? JSON.parse(post.content) : null;

    const handleDelete = async () => {
        try {
            setIsDeleting(true);
            // await deleteBlog(`${endpoints.blogs}/${post.id}`).unwrap();

            await deleteBlog({
                url: `${endpoints.blogs}/${post?.id}`,
                method: "DELETE", // use PATCH or PUT
            }).unwrap();

            setShowConfirm(false);
            navigate("/blogs");
        } catch (err) {
            console.error("❌ Failed to delete blog:", err);
            alert("Failed to delete blog. Please try again.");
        } finally {
            setIsDeleting(false);
        }
    };

    const BASE_URL = import.meta.env.VITE_API_BASE_URL;


    return (
        <article className="max-w-4xl mx-auto px-6 py-20 relative">
            {/* Confirm Modal */}
            {showConfirm && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                    <div className="bg-white rounded-2xl shadow-xl w-[90%] max-w-sm p-6 text-center">
                        <h3 className="text-xl font-semibold mb-4">Delete this blog?</h3>
                        <p className="text-gray-600 mb-6">This action cannot be undone.</p>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={() => setShowConfirm(false)}
                                className="px-5 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
                                disabled={isDeleting}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                className="px-5 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 disabled:opacity-50"
                                disabled={isDeleting}
                            >
                                {isDeleting ? "Deleting..." : "Delete"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit + Delete buttons */}
            {
                isAuthenticated && (
                    <div className="flex justify-end items-end gap-3 mb-5">
                        <Link
                            to={`/blogs/edit/${post.slug}`}
                            className="px-5 py-2 rounded bg-emerald-100 text-emerald-700 hover:text-emerald-800 hover:bg-emerald-200 focus:ring-emerald-400 focus:ring-2"
                        >
                            Edit
                        </Link>
                        <button
                            onClick={() => setShowConfirm(true)}
                            className="px-5 py-2 rounded bg-red-100 text-red-700 hover:bg-red-200 focus:ring-red-400 focus:ring-2"
                        >
                            Delete
                        </button>
                    </div>
                )
            }

            {/* Cover Image */}
            <a href={`${BASE_URL}${post.coverImage}`} target="_blank" rel="noopener noreferrer">
                <div className="w-full mb-8 rounded-2xl overflow-hidden shadow aspect-video cursor-pointer">
                    <img
                        src={post.coverImage ? `${BASE_URL}${post.coverImage}` : "https://via.placeholder.com/800x400?text=No+Cover+Image"}
                        alt={post.slug}
                        className="w-full h-full object-cover"
                    />
                </div>
            </a>

            <p className="text-gray-500 text-sm mb-2">{new Date(post.createdAt).toDateString()}</p>
            <h1 className="text-4xl font-bold mb-10">{post.title}</h1>

            {/* Render EditorJS content */}
            {parsedContent?.blocks?.map((block: any, idx: number) => {
                switch (block.type) {
                    case "paragraph":
                        return (
                            <div
                                key={idx}
                                className="prose prose-lg mb-6 prose-a:text-emerald-700 hover:prose-a:text-emerald-800"
                                dangerouslySetInnerHTML={{ __html: block.data.text }}
                            />
                        );
                    case "header":
                        const Tag = `h${block.data.level}` as keyof JSX.IntrinsicElements;
                        let headingClass = "";
                        switch (block.data.level) {
                            case 2: headingClass = "text-2xl font-bold mb-4"; break;
                            case 3: headingClass = "text-xl font-semibold mb-3"; break;
                            case 4: headingClass = "text-lg font-medium mb-2"; break;
                            default: headingClass = "text-base font-normal mb-2";
                        }
                        return (
                            <Tag
                                key={idx}
                                className={`${headingClass} prose-a:text-emerald-700 hover:prose-a:text-emerald-800`}
                                dangerouslySetInnerHTML={{ __html: block.data.text }}
                            />
                        );
                    case "list":
                        return block.data.style === "ordered" ? (
                            <ol key={idx} className="list-decimal list-inside mb-6 prose-a:text-emerald-700 hover:prose-a:text-emerald-800">
                                {block.data.items.map((item: any, i: number) => (
                                    <li key={i} dangerouslySetInnerHTML={{ __html: item.content }} />
                                ))}
                            </ol>
                        ) : (
                            <ul key={idx} className="list-disc list-inside mb-6 prose-a:text-emerald-700 hover:prose-a:text-emerald-800">
                                {block.data.items.map((item: any, i: number) => (
                                    <li key={i} dangerouslySetInnerHTML={{ __html: item.content }} />
                                ))}
                            </ul>
                        );
                    case "table":
                        return (
                            <div key={idx} className="overflow-x-auto mb-6">
                                <table className="table-auto border border-gray-300 w-full text-left">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            {block.data.content[0].map((headerCell: string, hIdx: number) => (
                                                <th key={hIdx} className="border border-gray-300 px-4 py-2">
                                                    <div dangerouslySetInnerHTML={{ __html: headerCell }} />
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {block.data.content.slice(1).map((row: string[], rIdx: number) => (
                                            <tr key={rIdx}>
                                                {row.map((cell: string, cIdx: number) => (
                                                    <td key={cIdx} className="border border-gray-300 px-4 py-2">
                                                        <div dangerouslySetInnerHTML={{ __html: cell }} />
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        );
                    case "image":
                        return (
                            <div key={idx} className="image-block mb-6">
                                <img src={block.data.file.url} alt={block.data.caption || ""} className="rounded-lg shadow" />
                                {block.data.caption && (
                                    <p className="caption text-sm text-gray-500 mt-1">{block.data.caption}</p>
                                )}
                            </div>
                        );
                    case "quote":
                        return (
                            <blockquote key={idx} className="border-l-4 border-gray-300 pl-4 italic mb-6 prose-a:text-emerald-700 hover:prose-a:text-emerald-800">
                                <div dangerouslySetInnerHTML={{ __html: block.data.text }} />
                                {block.data.caption && <cite className="block mt-1 text-sm">{block.data.caption}</cite>}
                            </blockquote>
                        );
                    default:
                        return null;
                }
            })}


            <div className="mt-12">
                <Link to="/blogs" className="text-emerald-700 font-semibold hover:underline">
                    ← Back to All Blogs
                </Link>
            </div>
        </article>
    );
};

export default BlogDetail;
