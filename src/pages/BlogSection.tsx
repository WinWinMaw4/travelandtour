import React from "react";
import { Link } from "react-router-dom"; // if you're using react-router

interface Post {
  title: string;
  excerpt: string;
  date: string;
  img: string;
  slug: string; // add slug for detail page
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

const BlogSection: React.FC = () => {
  return (
    <section id="blog" className="max-w-6xl mx-auto px-6 py-20">
      <div className="flex justify-between items-center mb-12">
        <h3 className="text-3xl font-semibold">Latest Posts</h3>
        <Link
          to="/blogs"
          className="text-emerald-700 font-semibold hover:underline"
        >
          See All
        </Link>
      </div>

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
              <h4 className="text-xl font-semibold mb-2">{post.title}</h4>
              <p className="text-gray-700 mb-4">{post.excerpt}</p>
              <Link
                to={`/blogs/${post.slug}`}
                className="text-emerald-700 font-semibold hover:underline"
              >
                Read More
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BlogSection;
