import React from "react";
// import LanguageSwitch from "@/components/LanguageSwitch";
import heroImage1 from "../assets/images/hero/8659.png"
import heroImage2 from "../assets/images/hero/8659smalldevice.png"
import contactImage from "../assets/images/hero/8657.jpg"

import BlogSection from "./BlogSection";
import pilgrims from "@assets/images/aboutus/pilgrims.jpg"
import group1 from "@assets/images/aboutus/group1.jpg"
import plane from "@assets/images/aboutus/plane.jpg"
import map from "@assets/images/aboutus/map.jpg"
import { useGetEndpointQuery } from "@services/apiSlice";
import { endpoints } from "@services/endpoints";
import BannerSection from "@components/page/banner/BannerSection";
import PackagesSection from "./PackagsSection";



const tours = [
    { title: "Umrah Package 3 Days", price: "$499", duration: "3 Days", img: "https://i.pinimg.com/736x/8e/bc/53/8ebc5386d7b355812b0e3b64c7621483.jpg" },
    { title: "Hajj Premium Package", price: "$1299", duration: "7 Days", img: "https://www.jetwayhajjgroup.com/uploads/4623102.png" },
    { title: "Makka City Tour", price: "$299", duration: "2 Days", img: "https://tse3.mm.bing.net/th/id/OIP.8pbqOY61TnfIo3wbXaUIlAHaEV?cb=ucfimgc2&rs=1&pid=ImgDetMain&o=7&rm=3" },
];

const testimonials = [
    { name: "Ahmed", text: "Amazing experience! Highly recommended." },
    { name: "Fatima", text: "Professional staff and well organized." },
];

const MakkaTourWebsite: React.FC = () => {


    return (
        <div className="font-sans">
            {/* Header */}
            {/* <header className="bg-white shadow-sm sticky top-0 z-50">
                <div className="max-w-[1920px] mx-auto px-6 py-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-emerald-700">Asia Sky Blue Travel and Tour</h1>
                    <div className="flex items-center space-x-6">
                        <nav className="hidden md:flex space-x-4">
                            <a href="#home" className="hover:text-emerald-700">Home</a>
                            <a href="#about" className="hover:text-emerald-700">About</a>
                            <a href="#blogss" className="hover:text-emerald-700">Blogs</a>
                            <a href="#contact" className="hover:text-emerald-700">Contact</a>
                        </nav>
                    </div>
                </div>
            </header> */}

            {/* Hero Section */}
            <section
                id="home"
                className="relative text-white text-center md:text-left bg-blend-color-burn"
            >
                {/* Show image only on mobile */}
                <div className="md:hidden">
                    <img
                        src={heroImage2}
                        alt="Hero"
                        className="w-full h-[350px] object-contain"
                    />
                </div>

                {/* Background image only for md+ */}
                <div
                    className="hidden md:flex relative bg-cover bg-center w-full py-44"
                    style={{ backgroundImage: `url(${heroImage1})` }}
                >
                    <div className="relative z-10 max-w-2xl mx-auto md:mx-0 px-6 text-emerald-700">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                            Experience the Spiritual Journey
                        </h2>
                        <p className="text-base sm:text-lg md:text-xl mb-8">
                            Join Makka Tour for a guided, safe, and memorable pilgrimage experience.
                        </p>
                        <a
                            href="#tours"
                            className="bg-emerald-700 text-white px-5 py-2 sm:px-6 sm:py-3 rounded-full font-semibold hover:bg-gray-100 hover:text-emerald-700 transition"
                        >
                            View Packages
                        </a>
                    </div>
                </div>

                {/* Content overlay for mobile */}
                <div className="absolute inset-0 flex items-center justify-center md:hidden px-6">
                    <div className="relative h-full flex flex-col items-center justify-center max-w-xl text-emerald-700 bg-white/70 rounded-xl p-6 ">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-3">
                            Experience the Spiritual Journey
                        </h2>
                        <p className="text-sm sm:text-base mb-6">
                            Join Makka Tour for a guided, safe, and memorable pilgrimage experience.
                        </p>
                        <a
                            href="#tours"
                            className="bg-emerald-700 text-white px-4 py-2 sm:px-5 sm:py-2 rounded-full font-semibold hover:bg-gray-100 hover:text-emerald-700 transition"
                        >
                            View Packages
                        </a>
                    </div>
                </div>
            </section>

            <section className="aspect-[4/2] lg:mt-24 max-w-screen md:max-w-3xl xl:max-w-5xl mx-auto overflow-hidden">
                <BannerSection />
            </section>

            <section className="">
                <BlogSection />
            </section>

            {/* About Section */}
            {/* About Section */}
            <section id="about" className="max-w-full mx-auto px-6 pt-10 pb-20 text-center bg-emerald-300/10 rounded-t-4xl">
                <h3 className="text-3xl font-semibold mb-6">About Us</h3>
                <p className="text-gray-700 max-w-3xl mx-auto mb-8 font-semibold text-lg">
                    Makka Tour is dedicated to providing spiritual and memorable journeys for
                    pilgrims visiting the holy cities. Our expert guides and comfortable packages
                    ensure a smooth and enriching experience.
                </p>
                <p className="text-gray-700 max-w-3xl mx-auto mb-8 font-semibold text-lg">
                    We have been organizing pilgrimages for years, focusing on safety, comfort,
                    and guidance. From transportation and accommodations to guided tours of holy
                    sites, we take care of every detail so you can focus on your spiritual
                    journey.
                </p>

                {/* Gallery */}
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-1 md:gap-4 mt-10 max-w-6xl mx-auto">
                    <a
                        href={pilgrims}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img
                            src={pilgrims}
                            alt="Pilgrims"
                            className="w-full h-48 object-cover rounded-2xl shadow-md hover:scale-105 transition-transform"
                        />
                    </a>

                    <a
                        href={group1}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img
                            src={group1}
                            alt="Makkah View"
                            className="w-full h-48 object-cover rounded-2xl shadow-md hover:scale-105 transition-transform"
                        />
                    </a>

                    <a
                        href={plane}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img
                            src={plane}
                            alt="Spiritual Gathering"
                            className="w-full h-48 object-cover rounded-2xl shadow-md hover:scale-105 transition-transform"
                        />
                    </a>

                    <a
                        href={map}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img
                            src={map}
                            alt="Tour Bus"
                            className="w-full h-48 object-cover rounded-2xl shadow-md hover:scale-105 transition-transform"
                        />
                    </a>
                </div>
            </section>



            {/* Tours Section */}
            <section>
                <PackagesSection />
            </section>
            {/* <section id="tours" className="max-w-6xl mx-auto px-6 py-20">
                <h3 className="text-3xl font-semibold text-center mb-12">Our Packages</h3>
                <div className="grid md:grid-cols-3 gap-8">
                    {tours.map((tour, idx) => (
                        <div key={idx} className="bg-white rounded-2xl shadow-md hover:shadow-lg transition overflow-hidden">
                            <img src={tour.img} alt={tour.title} className="w-full h-48 object-cover" />
                            <div className="p-6 text-center">
                                <h4 className="text-xl font-semibold mb-2">{tour.title}</h4>
                                <p className="text-gray-600 mb-2">{tour.duration}</p>
                                <p className="text-emerald-700 font-bold mb-4">{tour.price}</p>
                                <button className="bg-emerald-700 text-white px-6 py-2 rounded-full hover:bg-emerald-800 transition">Book Now</button>
                            </div>
                        </div>
                    ))}
                </div>
            </section> */}

            {/* Testimonials */}
            <section className="bg-gray-50 py-20 hidden">
                <h3 className="text-3xl font-semibold text-center mb-12">Testimonials</h3>
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
                    {testimonials.map((t, idx) => (
                        <div key={idx} className="bg-white p-6 rounded-2xl shadow-md">
                            <p className="text-gray-700 mb-4">"{t.text}"</p>
                            <p className="text-emerald-700 font-semibold text-right">- {t.name}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Contact Section */}
            <section
                id="contact"
                className="max-w-6xl mx-auto px-6 py-20 bg-cover bg-bottom"
            // style={{ backgroundImage: `url(${contactImage})` }}
            >
                <h2 className="text-3xl font-semibold text-center mb-12">Get in Touch</h2>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Left: Contact Info */}
                    <div className="space-y-8">
                        <div className="grid sm:grid-cols-2 gap-6">
                            {/* Australia Branch */}
                            <div className="bg-white shadow-md rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-2xl">🇦🇺</span>
                                    <h4 className="text-lg font-semibold text-emerald-700">Australia Branch</h4>
                                </div>
                                <p className="text-sm text-gray-600">📍 Brisbane, QLD</p>
                                <p className="text-sm text-gray-600">
                                    📞{" "}
                                    <a
                                        href="tel:0490866626"
                                        className="text-emerald-700 hover:underline"
                                    >
                                        0490 866 626
                                    </a>
                                </p>
                                <p className="text-sm text-gray-600">
                                    📧{" "}
                                    <a
                                        href="mailto:aus@asiabluesky.com"
                                        className="text-emerald-700 hover:underline"
                                    >
                                        aus@asiabluesky.com
                                    </a>
                                </p>
                            </div>

                            {/* Myanmar Branch */}
                            <div className="bg-white shadow-md rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-2xl">🇲🇲</span>
                                    <h4 className="text-lg font-semibold text-emerald-700">Myanmar Branch</h4>
                                </div>
                                <p className="text-sm text-gray-600">📍 Yangon</p>
                                <p className="text-sm text-gray-600">
                                    📞{" "}
                                    <a
                                        href="tel:+9595171530"
                                        className="text-emerald-700 hover:underline"
                                    >
                                        +959 517 1530
                                    </a>
                                </p>
                                <p className="text-sm text-gray-600">
                                    📧{" "}
                                    <a
                                        href="mailto:mm@asiabluesky.com"
                                        className="text-emerald-700 hover:underline"
                                    >
                                        mm@asiabluesky.com
                                    </a>
                                </p>
                            </div>
                        </div>

                        {/* Optional image or map */}
                        <div className="rounded-2xl overflow-hidden shadow-md">
                            <img
                                src={contactImage}
                                alt="Asia Sky Blue Travel Office"
                                className="w-full h-64 object-cover"
                            />
                        </div>
                    </div>

                    {/* Right: Contact Form */}
                    <form className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-md space-y-4 border border-gray-100">
                        <h3 className="text-2xl font-semibold mb-4 text-emerald-700">Send Us a Message</h3>
                        <p className="text-gray-600 text-sm mb-6">
                            Have questions or need help planning your journey? We’re happy to assist.
                        </p>
                        <input
                            type="text"
                            placeholder="Your Name"
                            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-600 outline-none"
                        />
                        <input
                            type="email"
                            placeholder="Your Email"
                            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-600 outline-none"
                        />
                        <textarea
                            placeholder="Your Message"
                            rows={5}
                            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-600 outline-none"
                        ></textarea>
                        <button
                            type="submit"
                            className="w-full bg-emerald-700 text-white py-3 rounded-xl hover:bg-emerald-800 transition font-medium"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </section>



            {/* Footer
            <footer className="bg-gray-100 py-6 text-center text-gray-600 text-sm">
                © {new Date().getFullYear()} Makka Tour. All rights reserved.
            </footer> */}
        </div>
    );
};

export default MakkaTourWebsite;
