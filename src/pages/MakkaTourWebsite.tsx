import React from "react";
// import LanguageSwitch from "@/components/LanguageSwitch";
import heroImage1 from "../assets/images/hero/hero.png"
import heroImage2 from "../assets/images/hero/herosmalldevice.png"
import contactImage from "../assets/images/hero/8657.jpg"

import BlogSection from "./BlogSection";
import pilgrims from "@assets/images/aboutus/pilgrims.jpg"
import group1 from "@assets/images/aboutus/group1.jpg"
import plane from "@assets/images/aboutus/plane.jpg"
import map from "@assets/images/aboutus/map.jpg"
// import { useGetEndpointQuery } from "@services/apiSlice";
// import { endpoints } from "@services/endpoints";
import BannerSection from "@components/page/banner/BannerSection";
import PackagesSection from "./PackagsSection";
import ContactForm from "@components/page/Home/ContactForm";
import { useTranslation } from "react-i18next";
import Branches from "@components/page/Home/Branches";



const testimonials = [
    { name: "Ahmed", text: "Amazing experience! Highly recommended." },
    { name: "Fatima", text: "Professional staff and well organized." },
];

const MakkaTourWebsite: React.FC = () => {
    const { t, i18n } = useTranslation();


    const lang = i18n.language;


    return (
        <div className="font-sans">
            {/* Header */}
            {/* <header className="bg-white shadow-sm sticky top-0 z-50">
                <div className="max-w-[1920px] mx-auto px-6 py-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-primary-700">Asia Sky Blue Travel and Tour</h1>
                    <div className="flex items-center space-x-6">
                        <nav className="hidden md:flex space-x-4">
                            <a href="#home" className="hover:text-primary-700">Home</a>
                            <a href="#about" className="hover:text-primary-700">About</a>
                            <a href="#blogss" className="hover:text-primary-700">Blogs</a>
                            <a href="#contact" className="hover:text-primary-700">Contact</a>
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
                    <div className="relative z-10 max-w-2xl mx-auto md:mx-0 px-6 text-primary-700">
                        {/* <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                            {t("banner.title")}
                        </h2> */}
                        <h2
                            className={`font-bold mb-4 ${lang === "my"
                                ? "text-4xl" // smaller for Myanmar
                                : "text-6xl" // default for English
                                }`}
                        >
                            {t("banner.title")}
                        </h2>
                        <p
                            className={`mb-8 ${lang === "my"
                                ? "text-lg"
                                : "text-2xl"
                                }`}
                        >
                            {t("banner.subtitle")}
                        </p>
                        {/* <p className="text-base sm:text-lg md:text-xl mb-8">
                            {t("banner.subtitle")}
                        </p> */}
                        <a
                            href="#packages"
                            className="bg-primary-700 text-white px-5 py-2 sm:px-6 sm:py-3 rounded-full font-semibold hover:bg-gray-100 hover:text-primary-700 transition"
                        >
                            {t("banner.button")}
                        </a>
                    </div>
                </div>

                {/* Content overlay for mobile */}
                <div className="absolute inset-0 flex items-center justify-center md:hidden px-6">
                    <div className="relative h-full flex flex-col items-center justify-center max-w-xl text-primary-700 bg-white/70 rounded-xl p-6 ">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-3">
                            {t("banner.title")}
                        </h2>
                        <p className="text-sm sm:text-base mb-6 font-bold">
                            {t("banner.subtitle")}
                        </p>
                        <a
                            href="#packages"
                            className="bg-primary-700  text-white px-4 py-2 sm:px-5 sm:py-2 rounded-full font-semibold hover:bg-gray-100 hover:text-primary-700 transition"
                        >
                            {t("banner.button")}
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
            <section id="about" className="max-w-full mx-auto px-6 py-10 lg:py-24 text-center bg-primary-300/10 rounded-t-4xl">
                <h3 className="text-3xl font-semibold mb-6">{t("aboutUs.sectionTitle")}</h3>
                <p className="text-gray-700 max-w-3xl mx-auto mb-8 font-semibold text-lg">
                    {t("aboutUs.description")}
                </p>
                <p className="text-gray-700 max-w-3xl mx-auto mb-8 font-semibold text-lg">
                    {t("aboutUs.details")}
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
                                <p className="text-primary-700 font-bold mb-4">{tour.price}</p>
                                <button className="bg-primary-700 text-white px-6 py-2 rounded-full hover:bg-primary-800 transition">Book Now</button>
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
                            <p className="text-primary-700 font-semibold text-right">- {t.name}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Contact Section */}
            <section
                id="contact"
                className="max-w-6xl mx-auto px-6 lg:py-20 bg-cover bg-bottom"
            // style={{ backgroundImage: `url(${contactImage})` }}
            >
                <h2 className="text-3xl font-semibold text-center mb-12">{t("contact.sectionTitle")}</h2>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Left: Contact Info */}
                    <div className="space-y-8">
                        {/* <div className="bg-amber-500/20 text-amber-500 border border-amber-500 rounded px-5 py-2">
                            <p className="font-bold">Hello</p>
                            <p className="text-black/80">Description</p>
                        </div> */}

                        <Branches />



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
                    <ContactForm />
                    {/* <form className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-md space-y-4 border border-gray-100">
                        <h3 className="text-2xl font-semibold mb-4 text-primary-700">Send Us a Message</h3>
                        <p className="text-gray-600 text-sm mb-6">
                            Have questions or need help planning your journey? We’re happy to assist.
                        </p>
                        <input
                            type="text"
                            placeholder="Your Name"
                            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-600 outline-none"
                        />
                        <input
                            type="email"
                            placeholder="Your Email"
                            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-600 outline-none"
                        />
                        <textarea
                            placeholder="Your Message"
                            rows={5}
                            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-600 outline-none"
                        ></textarea>
                        <button
                            type="submit"
                            className="w-full bg-primary-700 text-white py-3 rounded-xl hover:bg-primary-800 transition font-medium"
                        >
                            Send Message
                        </button>
                    </form> */}
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
