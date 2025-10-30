/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../../../style/BannerSection.css'

// Import modules correctly in Swiper 10+
import { Navigation, Autoplay, Pagination } from 'swiper/modules';
import { useGetEndpointQuery } from '@services/apiSlice';
import { endpoints } from '@services/endpoints';

const BannerSection: React.FC = () => {
    const { data: banners, isLoading, isError } = useGetEndpointQuery(endpoints.banners);

    if (isLoading) return <div>Loading...</div>;
    if (isError || !banners) return <div>Error loading banners</div>;

    return (

        <div className="w-full overflow-hidden">
            <Swiper
                modules={[Navigation, Autoplay, Pagination]}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 4000, disableOnInteraction: false }}
                loop
                slidesPerView={1}
                className="rounded-lg"
            >
                {banners.map((banner: any) => (
                    <SwiperSlide key={banner.id}>
                        <a href={banner.link} target="_blank" rel="noopener noreferrer" className="block w-full">
                            <div className="w-full aspect-[4/2] overflow-hidden rounded-lg">
                                <img
                                    src={
                                        banner.image?.startsWith("http")
                                            ? banner.image
                                            : `${import.meta.env.VITE_API_URL}${banner.image}`
                                    }
                                    alt={`Banner ${banner.id}`}
                                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                />
                            </div>
                        </a>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>

    );
};

export default BannerSection;
