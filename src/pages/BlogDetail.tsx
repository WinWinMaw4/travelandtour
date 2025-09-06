import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";

interface BlogSection {
    title: string;
    description: string;
    img: string;
}

interface Post {
    title: string;
    excerpt: string;
    date: string;
    coverImg: string;
    slug: string;
    sections: BlogSection[];
    youtubeVideo: string;
}
const posts: Post[] = [
    {
        title: "Top 5 Tips for a Spiritual Journey",
        excerpt: "Learn how to make your pilgrimage smooth, safe, and memorable with these top tips.",
        date: "Aug 20, 2025",
        coverImg: "https://tse4.mm.bing.net/th/id/OIP.yGk8QiyCBm9BNhBH8ESfLgHaEK?cb=ucfimgc2&rs=1&pid=ImgDetMain&o=7&rm=3",
        slug: "top-5-tips-for-a-spiritual-journey",
        sections: [
            {
                title: "Plan Ahead",
                description: `
          <p>Ensure all travel documents, visas, and accommodations are prepared well in advance.</p>
          <p>Check health requirements, such as vaccinations and travel insurance.</p>
        `,
                img: "/images/tips-plan-ahead.jpg",
            },
            {
                title: "Pack Wisely",
                description: `
          <p>Bring comfortable clothing, essential medicines, and light luggage.</p>
          <ul class="list-disc list-inside mt-2 space-y-1">
            <li>Comfortable walking shoes</li>
            <li>Portable prayer mat</li>
            <li>Reusable water bottle</li>
          </ul>
        `,
                img: "/images/tips-pack.jpg",
            },
            {
                title: "Stay Spiritually Focused",
                description: `
          <p>Engage in regular prayers, reflection, and spiritual learning.</p>
          <p>Maintain mindfulness and patience during your journey.</p>
        `,
                img: "/images/tips-spiritual-focus.jpg",
            },
        ],
        youtubeVideo: "https://www.youtube.com/embed/example1", // Replace with real video if available
    },
    {
        title: "Makkah City Highlights",
        excerpt: "Discover spiritual, historical, and modern marvels in Makkah.",
        date: "Sep 1, 2025",
        coverImg: "https://blog.umrahme.com/wp-content/uploads/2023/06/visit_makkah.jpg",
        slug: "makkah-city-highlights",
        sections: [
            {
                title: "Masjid al-Haram & The Kaaba",
                description: `
          <p>The world’s largest mosque and the center of <em>Islamic worship</em>.</p>
          <p>Millions of pilgrims gather here to perform <strong>Umrah</strong> and <strong>Hajj</strong>.</p>
        `,
                img: "/images/makkah-kaaba.jpg",
            },
            {
                title: "Clock Tower & Museum",
                description: `
          <p>The iconic <strong>Abraj Al-Bait Clock Tower</strong> offers breathtaking views of the Grand Mosque.</p>
          <ul class="list-disc list-inside mt-2 space-y-1">
            <li>Museum about timekeeping</li>
            <li>Astronomy & Islamic history</li>
          </ul>
        `,
                img: "/images/makkah-clocktower.jpg",
            },
        ],
        youtubeVideo: `https://www.youtube.com/embed/t503_GApnok?si=v5HC_xDYlqRWMz91`
    },
    {
        title: "Choosing the Right Umrah Package",
        excerpt: "Guide to selecting the perfect Umrah package that fits your needs and budget.",
        date: "Sep 5, 2025",
        coverImg: "https://www.haramain.com.au/wp-content/uploads/2023/08/All-Packages-1024x730.jpg",
        slug: "choosing-the-right-umrah-package",
        sections: [
            {
                title: "Understand Package Types",
                description: `
          <p>Umrah packages vary based on accommodation, transport, and included services.</p>
          <ul class="list-disc list-inside mt-2 space-y-1">
            <li>Budget Packages</li>
            <li>Standard Packages</li>
            <li>Luxury Packages</li>
          </ul>
        `,
                img: "/images/package-types.jpg",
            },
            {
                title: "Compare Prices and Services",
                description: `
          <p>Look for packages that provide the best value, considering hotels, transport, and guidance.</p>
          <p>Read reviews and ask for recommendations from past pilgrims.</p>
        `,
                img: "/images/package-compare.jpg",
            },
            {
                title: "Check Flexibility & Support",
                description: `
          <p>Choose a package that offers flexible dates and good customer support.</p>
          <p>Ensure they provide guidance for visas and on-ground assistance.</p>
        `,
                img: "/images/package-support.jpg",
            },
        ],
        youtubeVideo: "https://www.youtube.com/embed/example2", // Replace with real video if available
    },
];



const BlogDetail: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const post = posts.find((p) => p.slug === slug);

    // Scroll to top smoothly on component mount
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    if (!post) {
        return (
            <div className="max-w-4xl mx-auto px-6 py-20">
                <h2 className="text-2xl font-bold mb-6">Post Not Found</h2>
                <Link to="/blogs" className="text-emerald-700 hover:underline">
                    ← Back to Blogs
                </Link>
            </div>
        );
    }

    return (
        <article className="max-w-4xl mx-auto px-6 py-20">
            {/* Cover Image */}
            <a href={post.coverImg} target="_blank" rel="noopener noreferrer">
                <img
                    src={post.coverImg}
                    alt={post.title}
                    className="w-full h-80 object-cover rounded-2xl mb-8 cursor-pointer"
                />
            </a>
            <p className="text-gray-500 text-sm mb-2">{post.date}</p>
            <h1 className="text-4xl font-bold mb-10">{post.title}</h1>

            {/* Sections */}
            <div className="space-y-12 mb-6">
                {post.sections.map((section, idx) => (
                    <div
                        key={idx}
                        className="grid md:grid-cols-1 gap-8 items-start"
                    >
                        {/* <img
                            src={section.img}
                            alt={section.title}
                            className="w-full h-64 object-cover rounded-xl shadow-md"
                        /> */}
                        <div>
                            <h2 className="text-2xl font-semibold mb-3">{section.title}</h2>
                            <div
                                className="prose prose-lg max-w-none text-gray-700"
                                dangerouslySetInnerHTML={{ __html: section.description }}
                            />
                        </div>
                    </div>
                ))}
            </div>
            <div className="">
                <div className="relative w-full pb-[56.25%] h-0 overflow-hidden rounded-xl shadow-md">
                    <iframe
                        src={post.youtubeVideo}
                        title="YouTube video player"
                        className="absolute top-0 left-0 w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                    />
                </div>
            </div>


            {/* Back Link */}
            <div className="mt-12">
                <Link
                    to="/blogs"
                    className="text-emerald-700 font-semibold hover:underline"
                >
                    ← Back to All Blogs
                </Link>
            </div>
        </article>
    );
};

export default BlogDetail;
