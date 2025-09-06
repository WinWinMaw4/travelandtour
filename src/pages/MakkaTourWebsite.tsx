import React from "react";
// import LanguageSwitch from "@/components/LanguageSwitch";
import heroImage from "../assets/images/hero/hero.jpg"
import heroImage1 from "../assets/images/hero/8659.jpg"
import contactImage from "../assets/images/hero/8657.jpg"

import BlogSection from "./BlogSection";
import pilgrims from "@assets/images/aboutus/pilgrims.jpg"
import group1 from "@assets/images/aboutus/group1.jpg"
import plane from "@assets/images/aboutus/plane.jpg"
import map from "@assets/images/aboutus/map.jpg"



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
                className="relative bg-cover  bg-center text-white py-44 text-center bg-blend-color-burn "
                style={{ backgroundImage: `url(${heroImage1})` }}
            >
                {/* <div className="absolute inset-0 bg-emerald-700/60 backdrop-blur-xs max-w-xl"></div> */}

                <div className="relative z-10 max-w-2xl mx-start text-emerald-700">
                    <h2 className="text-5xl font-bold mb-4">Experience the Spiritual Journey</h2>
                    <p className="text-lg mb-8">
                        Join Makka Tour for a guided, safe, and memorable pilgrimage experience.
                    </p>
                    <a
                        href="#tours"
                        className="bg-emerald-700 text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition"
                    >
                        View Packages
                    </a>
                </div>
            </section>

            <section>
                <BlogSection />
            </section>

            {/* About Section */}
            {/* About Section */}
            <section id="about" className="max-w-6xl mx-auto px-6 py-20 text-center">
                <h3 className="text-3xl font-semibold mb-6">About Us</h3>
                <p className="text-gray-700 max-w-3xl mx-auto mb-8">
                    Makka Tour is dedicated to providing spiritual and memorable journeys for pilgrims visiting the holy cities. Our expert guides and comfortable packages ensure a smooth and enriching experience.
                </p>
                <p className="text-gray-700 max-w-3xl mx-auto mb-8">
                    We have been organizing pilgrimages for years, focusing on safety, comfort, and guidance. From transportation and accommodations to guided tours of holy sites, we take care of every detail so you can focus on your spiritual journey.
                </p>

                {/* Gallery */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-10">
                    <img src={pilgrims} alt="Pilgrims" className="w-full h-48 object-cover rounded-2xl shadow-md hover:scale-105 transition-transform" />
                    <img src={group1} alt="Makkah View" className="w-full h-48 object-cover rounded-2xl shadow-md hover:scale-105 transition-transform" />
                    <img src={plane} alt="Spiritual Gathering" className="w-full h-48 object-cover rounded-2xl shadow-md hover:scale-105 transition-transform" />
                    <img src={map} alt="Tour Bus" className="w-full h-48 object-cover rounded-2xl shadow-md hover:scale-105 transition-transform" />
                </div>
            </section>


            {/* Tours Section */}
            <section id="tours" className="max-w-6xl mx-auto px-6 py-20">
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
            </section>

            {/* Testimonials */}
            <section className="bg-gray-50 py-20">
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
            <section id="contact" className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 bg-cover bg-bottom"
            // style={{ backgroundImage: `url(${contactImage})` }}
            >
                {/* Contact Info */}
                <div className="space-y-6">
                    <h3 className="text-3xl font-semibold mb-6">Contact Info</h3>
                    <div className="bg-white/10 p-6 rounded-2xl shadow-md backdrop-blur-xs">
                        <p className="font-semibold">Phone: <span className="text-emerald-700">+966 123 456 789</span></p>
                        <p className="font-semibold">Email: <span className="text-emerald-700">info@makkatour.com</span></p>
                        <p className="font-semibold">Location: <span className="text-emerald-700">Makkah, Saudi Arabia</span></p>
                    </div>
                    <div className="">
                        <img src={contactImage} alt="contact image" className="" />
                    </div>
                </div>

                {/* Contact Form */}
                <form className="bg-white/50 p-8 rounded-2xl shadow-md space-y-4 backdrop-blur-xs">
                    <h3 className="text-2xl font-semibold mb-4">Send a Message</h3>
                    <input type="text" placeholder="Your Name" className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-600" />
                    <input type="email" placeholder="Your Email" className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-600" />
                    <textarea placeholder="Your Message" rows={5} className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-600"></textarea>
                    <button className="w-full bg-emerald-700 text-white py-3 rounded-xl hover:bg-emerald-800 transition">Send Message</button>
                </form>
            </section>

            {/* Footer
            <footer className="bg-gray-100 py-6 text-center text-gray-600 text-sm">
                © {new Date().getFullYear()} Makka Tour. All rights reserved.
            </footer> */}
        </div>
    );
};

export default MakkaTourWebsite;
