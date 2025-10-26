import { useTranslation } from 'react-i18next';
import { useState } from 'react';

const languages = [
    { code: 'en', label: 'English', flag: 'En' },
    { code: 'my', label: 'မြန်မာ', flag: '🇲🇲' },
];

export const LanguageSwitcher = () => {
    const { i18n } = useTranslation();
    const [open, setOpen] = useState(false);

    const changeLanguage = (code: string) => {
        i18n.changeLanguage(code);
        setOpen(false);
    };

    const currentLang = languages.find((l) => l.code === i18n.language) || languages[0];

    return (
        <div className="relative inline-block text-left">
            {/* Dropdown button */}
            <button
                onClick={() => setOpen(!open)}
                className="inline-flex items-center justify-center px-4 py-2 bg-gray-100 rounded-md shadow-sm hover:bg-gray-200"
            >
                <span className="mr-2">{currentLang.flag}</span>
                {currentLang.label}
                <svg
                    className="ml-2 w-4 h-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {/* Dropdown menu */}
            {open && (
                <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                    {languages.map((lang) => (
                        <button
                            key={lang.code}
                            onClick={() => changeLanguage(lang.code)}
                            className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center"
                        >
                            <span className="mr-2">{lang.flag}</span>
                            {lang.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};
