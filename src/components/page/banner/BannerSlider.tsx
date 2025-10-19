// BannerSlider.tsx
import React, { useState } from "react";

interface Banner {
    id: number;
    link: string;
    image: string;
}

interface BannerSliderProps {
    banners: Banner[];
}

const BannerSlider: React.FC<BannerSliderProps> = ({ banners }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
    };

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
    };

    if (!banners || banners.length === 0) return null;

    return (
        <div className="relative w-full max-w-4xl mx-auto overflow-hidden rounded-lg">
            {/* Slide */}
            <a href={banners[currentIndex].link} target="_blank" rel="noopener noreferrer">
                <img
                    src={banners[currentIndex].image}
                    alt={`Banner ${currentIndex + 1}`}
                    className="w-full h-64 object-cover transition-all duration-500"
                />
            </a>

            {/* Navigation */}
            <button
                onClick={prevSlide}
                className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
            >
                &#10094;
            </button>
            <button
                onClick={nextSlide}
                className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
            >
                &#10095;
            </button>

            {/* Dots */}
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {banners.map((_, index) => (
                    <span
                        key={index}
                        className={`w-3 h-3 rounded-full cursor-pointer ${index === currentIndex ? "bg-white" : "bg-gray-400"
                            }`}
                        onClick={() => setCurrentIndex(index)}
                    ></span>
                ))}
            </div>
        </div>
    );
};

export default BannerSlider;
