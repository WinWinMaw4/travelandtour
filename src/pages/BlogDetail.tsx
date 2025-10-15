/* eslint-disable no-case-declarations */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetEndpointQuery } from "@services/apiSlice";
import { endpoints } from "@services/endpoints";
import { useEffect, type JSX } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const BlogDetail: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const { data: post, error, isLoading } = useGetEndpointQuery(`${endpoints.blogs}/${slug}`);

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

    return (
        <article className="max-w-4xl mx-auto px-6 py-20">
            <div className="flex justify-end items-end">
                <div className=" mb-5  rounded ">
                    <Link to={`/blogs/edit/${post.slug}`} className="px-5 py-2 rounded bg-emerald-100 hover:text-emerald-800 hover:bg-emerald-200 focus-within:ring-emerald-400 focus-within:ring-2">Edit</Link>
                </div>
            </div>

            {/* Cover Image */}
            <a href={post.coverImage} target="_blank" rel="noopener noreferrer">
                {/* <img src={post.coverImage} alt={post.slug} className="w-full h-80 object-cover rounded-2xl mb-8 cursor-pointer" /> */}
                <div className="w-full mb-8 rounded-2xl overflow-hidden shadow aspect-video cursor-pointer">
                    <img
                        src={"https://img.freepik.com/premium-photo/aerial-view-kaaba-mecca-sunset-with-large-crowd-people-performing-tawaf_559896-6013.jpg"}
                        alt={post.slug}
                        className="w-full h-full object-contain"
                    />
                </div>
            </a>


            <p className="text-gray-500 text-sm mb-2">{new Date(post.createdAt).toDateString()}</p>
            <h1 className="text-4xl font-bold mb-10">{post.slug}</h1>

            {/* Render EditorJS content */}
            {parsedContent?.blocks?.map((block: any, idx: number) => {
                switch (block.type) {
                    case "paragraph":
                        return <div key={idx} className="prose prose-lg mb-6" dangerouslySetInnerHTML={{ __html: block.data.text }} />;
                    case "header":
                        const Tag = `h${block.data.level}` as keyof JSX.IntrinsicElements;

                        let headingClass = "";
                        switch (block.data.level) {
                            case 2:
                                headingClass = "text-2xl font-bold mb-4";
                                break;
                            case 3:
                                headingClass = "text-xl font-semibold mb-3";
                                break;
                            case 4:
                                headingClass = "text-lg font-medium mb-2";
                                break;
                            default:
                                headingClass = "text-base font-normal mb-2";
                        }

                        return (
                            <Tag key={idx} className={headingClass} dangerouslySetInnerHTML={{ __html: block.data.text }} />
                        );
                    case "list":
                        return block.data.style === "ordered" ? (
                            <ol key={idx} className="list-decimal list-inside mb-6">
                                {block.data.items.map((item: any, i: number) => <li key={i} dangerouslySetInnerHTML={{ __html: item.content }} />)}
                            </ol>
                        ) : (
                            <ul key={idx} className="list-disc list-inside mb-6">
                                {block.data.items.map((item: any, i: number) => <li key={i} dangerouslySetInnerHTML={{ __html: item.content }} />)}
                            </ul>
                        );
                    case "raw":
                        return (
                            <div
                                key={idx}
                                dangerouslySetInnerHTML={{ __html: block.data.html }}
                            />
                        );
                    case "quote":
                        return (
                            <blockquote key={idx} className="border-l-4 border-gray-300 pl-4 italic mb-6">
                                <div dangerouslySetInnerHTML={{ __html: block.data.text }} />
                                {block.data.caption && <cite className="block mt-1 text-sm">{block.data.caption}</cite>}
                            </blockquote>
                        );
                    case "image":
                        return (
                            <div key={idx} className="image-block">
                                <img src={block.data.file.url} alt={block.data.caption || ""} />
                                {block.data.caption && (
                                    <p className="caption text-sm text-gray-500">
                                        {block.data.caption}
                                    </p>
                                )}
                            </div>
                        );
                    case "link":
                        return (
                            <a
                                key={idx}
                                href={block.data.url}
                                target={block.data.target || "_blank"}
                                className="text-blue-600 underline"
                            >
                                {block.data.text}
                            </a>
                        );
                    case "table":
                        return (
                            <div key={idx} className="overflow-x-auto mb-6">
                                <table className="min-w-full border border-gray-300 border-collapse text-sm">
                                    <tbody>
                                        {block.data.content.map((row: string[], rowIndex: number) => (
                                            <tr key={rowIndex} className="border-b border-gray-200">
                                                {row.map((cell: string, cellIndex: number) => {
                                                    const CellTag =
                                                        block.data.withHeadings && rowIndex === 0
                                                            ? "th"
                                                            : "td";
                                                    return (
                                                        <CellTag
                                                            key={cellIndex}
                                                            className="border border-gray-300 px-3 py-2 text-left"
                                                            dangerouslySetInnerHTML={{ __html: cell }}
                                                        />
                                                    );
                                                })}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        );

                    default:
                        return null;
                }
            })}

            <div className="mt-12">
                <Link to="/blogs" className="text-emerald-700 font-semibold hover:underline">← Back to All Blogs</Link>
            </div>
        </article>
    );
};

export default BlogDetail;