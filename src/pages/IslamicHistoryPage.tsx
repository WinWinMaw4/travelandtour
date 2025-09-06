import React, { useState } from "react";
import { Link } from "react-router-dom";
import { places } from "@constants/place";


const IslamicHistoryPage: React.FC = () => {
    const [lang, setLang] = useState<"en" | "mm">("en");

    // const places = [
    //     {
    //         name: {
    //             en: "Masjid al-Haram",
    //             mm: "မစ်စဂျစ် အယ်လ်-ဟာရမ်",
    //         },
    //         city: {
    //             en: "Makkah",
    //             mm: "မက်ကာ",
    //         },
    //         description: {
    //             en: "The holiest mosque in Islam, home of the Kaaba, visited by millions of pilgrims during Hajj and Umrah.",
    //             mm: "အစ္စလမ်တွင် အကျော်ကြားဆုံးကျောင်းတော်ဖြစ်ပြီး၊ ကာအဘာရှိရာနေရာ၊ ဟတ်ချ်နှင့်အူမာအတွင်း လာရောက်သည့် ဧည့်သည်များအများဆုံးနေရာဖြစ်သည်။",
    //         },
    //         image:
    //             "https://upload.wikimedia.org/wikipedia/commons/7/7e/Masjid_al-Haram_Makkah.jpg",
    //     },
    //     {
    //         name: {
    //             en: "Masjid an-Nabawi",
    //             mm: "မစ်စဂျစ် အန်-နဘဝီ",
    //         },
    //         city: {
    //             en: "Madinah",
    //             mm: "မဒီးနာ",
    //         },
    //         description: {
    //             en: "The Prophet’s Mosque, established by Prophet Muhammad (PBUH). A place of deep historical and spiritual significance.",
    //             mm: "တရားမူဆလင်များအတွက် အလွန်အရေးကြီးသောနေရာဖြစ်ပြီး၊ မဟာမက်နဘီ (ဆွလျ) တည်ထောင်ခဲ့သည့်ကျောင်းတော်ဖြစ်သည်။",
    //         },
    //         image:
    //             "https://upload.wikimedia.org/wikipedia/commons/6/6a/Al-Masjid_An-Nabawi.jpg",
    //     },
    //     {
    //         name: {
    //             en: "Mount Uhud",
    //             mm: "ဦဟုဒ်တောင်",
    //         },
    //         city: {
    //             en: "Madinah",
    //             mm: "မဒီးနာ",
    //         },
    //         description: {
    //             en: "Historical site of the Battle of Uhud, where early Muslims defended Islam against Quraysh.",
    //             mm: "ဦဟုဒ်စစ်ပွဲဖြစ်ပွားခဲ့သည့်နေရာဖြစ်ပြီး၊ ပထမဦးဆုံးမူဆလင်များသည် ဂူရိုင်ရှ်များကို တိုက်ခိုက်ကာ အစ္စလမ်ကို ကာကွယ်ခဲ့သည်။",
    //         },
    //         image:
    //             "https://upload.wikimedia.org/wikipedia/commons/d/d9/Mount_Uhud.jpg",
    //     },
    // ];

    return (
        <div className="font-lato">
            {/* Hero Section */}
            <section className="bg-gradient-to-b from-green-700 to-green-900 text-white py-20 text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                    Islamic History Journey
                </h1>
                <p className="text-lg md:text-xl max-w-2xl mx-auto">
                    Discover the history of sacred places in Saudi Arabia and make your
                    travel experience more meaningful.
                </p>
            </section>

            {/* Language Switch */}
            <div className="flex justify-center mt-6">
                <button
                    onClick={() => setLang("en")}
                    className={`px-4 py-2 rounded-l-lg border ${lang === "en" ? "bg-green-700 text-white" : "bg-gray-100"
                        }`}
                >
                    English
                </button>
                <button
                    onClick={() => setLang("mm")}
                    className={`px-4 py-2 rounded-r-lg border ${lang === "mm" ? "bg-green-700 text-white" : "bg-gray-100"
                        }`}
                >
                    မြန်မာ
                </button>
            </div>

            {/* History Section */}
            <section className="py-16 px-6 md:px-12 bg-gray-50">
                <h2 className="text-3xl font-semibold text-center mb-12">
                    {lang === "en" ? "Historical Places" : "သမိုင်းဝင်နေရာများ"}
                </h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {places.map((place, idx) => (
                        <Link to={`/place/${idx}`}>
                            <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer">
                                <img
                                    src={place.image}
                                    alt={place.name[lang]}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-5">
                                    <h3 className="text-xl font-bold">{place.name[lang]}</h3>
                                    <p className="text-sm text-gray-500">{place.city[lang]}</p>
                                    <p className="mt-2 text-gray-700 text-sm">
                                        {place.description[lang].slice(0, 80)}...
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Agency Info */}
            <section className="py-16 px-6 md:px-12 bg-white text-center">
                <h2 className="text-3xl font-semibold mb-6">Our Travel Agency</h2>
                <p className="max-w-2xl mx-auto text-gray-700 mb-6">
                    We provide guided Islamic tours in Saudi Arabia, including visits to
                    holy sites, historical landmarks, and cultural experiences. Let us
                    make your journey unforgettable.
                </p>
                <div className="bg-green-100 rounded-2xl p-6 max-w-lg mx-auto">
                    <h3 className="text-xl font-bold text-green-800 mb-2">
                        Al-Safa Travel Agency
                    </h3>
                    <p className="text-gray-700">📍 Jeddah, Saudi Arabia</p>
                    <p className="text-gray-700">📞 +966 123 456 789</p>
                    <p className="text-gray-700">✉️ info@alsafatravel.com</p>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-green-900 text-white py-6 text-center">
                <p>
                    &copy; {new Date().getFullYear()} Al-Safa Travel Agency. All rights
                    reserved.
                </p>
            </footer>
        </div>
    );
};

export default IslamicHistoryPage;
