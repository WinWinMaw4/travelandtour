import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { places } from "@constants/place";

const PlaceDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [lang, setLang] = useState<"en" | "mm">("en");

    const place = places[Number(id)];

    if (!place) return <p>Place not found</p>;

    return (
        <div className="font-lato">
            <div className="flex justify-center mt-6">
                <button
                    onClick={() => setLang("en")}
                    className={`px-4 py-2 rounded-l-lg border ${lang === "en" ? "bg-green-700 text-white" : "bg-gray-100"}`}
                >
                    English
                </button>
                <button
                    onClick={() => setLang("mm")}
                    className={`px-4 py-2 rounded-r-lg border ${lang === "mm" ? "bg-green-700 text-white" : "bg-gray-100"}`}
                >
                    မြန်မာ
                </button>
            </div>

            <section className="py-16 px-6 md:px-12">
                <h1 className="text-4xl font-bold mb-4">{place.name[lang]}</h1>
                <p className="text-gray-500 mb-4">{place.city[lang]}</p>
                <img src={place.image} alt={place.name[lang]} className="w-full h-96 object-cover rounded-xl mb-6" />
                <p className="text-gray-700">{place.description[lang]}</p>
                <Link to="/" className="text-green-700 mt-6 inline-block">
                    &larr; Back to list
                </Link>
            </section>
        </div>
    );
};

export default PlaceDetailPage;
