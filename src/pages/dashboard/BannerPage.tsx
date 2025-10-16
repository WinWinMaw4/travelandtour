import React from 'react';
import { Link } from 'react-router-dom';

const staticBanners = [
    { id: 1, title: 'Summer Sale', image: 'https://th.bing.com/th/id/R.74317c0a668048bc1169d48c3ace3994?rik=uGCz6OWu4cKPnQ&pid=ImgRaw&r=0' },
    { id: 2, title: 'New Arrivals', image: 'https://i.ytimg.com/vi/DaCwtvN-rCo/maxresdefault.jpg' },
    { id: 3, title: 'Special Offers', image: 'https://static.vecteezy.com/system/resources/previews/008/441/374/non_2x/islamic-banner-hajj-for-eid-adha-mubarak-and-pilgrimage-free-vector.jpg' },
    { id: 4, title: 'Winter Collection', image: '/images/banner4.jpg' },
    { id: 5, title: 'Flash Deals', image: '/images/banner5.jpg' },
    { id: 6, title: 'Best Sellers', image: '/images/banner6.jpg' },
];

const BannerPage = () => {
    return (
        <div>
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold mb-4">Banners</h2>

                {/* Add Button */}
                <div className="mb-6 ">
                    <Link to={"/dashboard/banner/create"} className="bg-emerald-700 text-white px-4 py-2 rounded hover:bg-emerald-800">
                        Add Banner
                    </Link>
                </div>
            </div>

            {/* Grid of Cards */}
            <div className="flex flex-wrap -mx-2">
                {staticBanners.map((banner) => (
                    <div key={banner.id} className="w-1/2 sm:w-1/2 lg:w-1/3 p-2">
                        <div className="border rounded shadow hover:shadow-lg overflow-hidden">
                            <div className="w-full aspect-[4/3] md:aspect-[16/9]">
                                <img src={banner.image} alt={banner.title} className="w-full h-full object-fill" />
                            </div>

                            <div className="p-4">
                                <h3 className=" md:text-lg font-semibold mb-2">{banner.title}</h3>
                                <div className="flex gap-2">
                                    <button className="bg-yellow-400 px-3 py-1 rounded hover:bg-yellow-500">
                                        Edit
                                    </button>
                                    <button className="bg-red-500 px-3 py-1 rounded text-white hover:bg-red-600">
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BannerPage;
