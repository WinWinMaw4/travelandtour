import React from "react";
import { Link } from "react-router-dom";

interface Post {
    title: string;
    excerpt: string;
    date: string;
    img: string;
    slug: string;
}

const posts: Post[] = [
    {
        title: "Top 5 Tips for a Spiritual Journey",
        excerpt: "Learn how to make your pilgrimage smooth, safe, and memorable with these top tips.",
        date: "Aug 20, 2025",
        img: "https://tse4.mm.bing.net/th/id/OIP.yGk8QiyCBm9BNhBH8ESfLgHaEK?cb=ucfimgc2&rs=1&pid=ImgDetMain&o=7&rm=3",
        slug: "top-5-tips-for-a-spiritual-journey",
    },
    {
        title: "Makkah City Highlights",
        excerpt: "Explore the must-see places in Makkah during your spiritual journey.",
        date: "Sep 1, 2025",
        img: "https://i.ytimg.com/vi/ImmHnjNUXII/maxresdefault.jpg",
        slug: "makkah-city-highlights",
    },
    {
        title: "Choosing the Right Umrah Package",
        excerpt: "Guide to selecting the perfect Umrah package that fits your needs and budget.",
        date: "Sep 5, 2025",
        img: "https://www.haramain.com.au/wp-content/uploads/2023/08/All-Packages-1024x730.jpg",
        slug: "choosing-the-right-umrah-package",
    },
];

const BlogList: React.FC = () => {
    return (
        <section className="max-w-6xl mx-auto px-6 py-20">
            <h2 className="text-4xl font-bold text-center mb-12">All Blog Posts</h2>

            <div className="grid md:grid-cols-3 gap-8">
                {posts.map((post, idx) => (
                    <div
                        key={idx}
                        className="bg-white rounded-2xl shadow-md hover:shadow-lg overflow-hidden transition"
                    >
                        <img
                            src={post.img}
                            alt={post.title}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-6">
                            <p className="text-gray-500 text-sm mb-2">{post.date}</p>
                            <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                            <p className="text-gray-700 mb-4">{post.excerpt}</p>
                            <Link
                                to={`/blogs/${post.slug}`}
                                className="text-emerald-700 font-semibold hover:underline"
                            >
                                Read More →
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default BlogList;
