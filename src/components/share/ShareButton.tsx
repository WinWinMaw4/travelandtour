// ShareButton.tsx
import { useState, useEffect, useRef } from 'react';
import {
    RiShareForwardFill,
    RiShareForwardLine,
    RiFacebookFill,
    RiTelegramFill,
    RiLinksLine,
    RiWhatsappFill,
} from 'react-icons/ri';

import { toast } from 'react-toastify';
import { FacebookShareButton, TelegramShareButton, WhatsappShareButton, ViberShareButton } from 'react-share';
import { LiaViber } from 'react-icons/lia';
// import { useTranslation } from 'react-i18next';

const ShareButton = () => {
    // const { t } = useTranslation();
    const [isShare, setIsShare] = useState<boolean>(false);
    const [showOptions, setShowOptions] = useState<boolean>(false); // State for dropdown visibility
    const dropdownRef = useRef<HTMLDivElement | null>(null);
    const baseUrl = import.meta.env.VITE_SITE_DOMAIN;

    const handleShareClick = () => {
        setIsShare(!isShare);
        setShowOptions(!showOptions);
    };

    // const pathname = window.location.pathname;

    // const pathParts = pathname.split('/');
    // const lastPart = pathParts[pathParts.length - 1];

    // // const formattedUrlTitle = decodeURIComponent(lastPart).replace(/\s+/g, '-')

    // const route = pathParts[1];

    // const id = lastPart.split('-').pop();

    // Create the new URL
    const newUrl = window.location.href;

    const handleCopyLink = () => {
        navigator.clipboard.writeText(newUrl);
        toast.success('Link copied to clipboard!');
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setShowOptions(false);
            setIsShare(false)
        }

    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <div className="share" onClick={handleShareClick}>
                <div
                    className={`flex justify-center items-center rounded border px-2 py-1 cursor-pointer ${isShare ? 'bg-emerald-700 text-white' : 'text-charcoal bg-white'
                        }`}
                >
                    {isShare ? (
                        <RiShareForwardFill size={18} className="sm:me-1" />
                    ) : (
                        <RiShareForwardLine size={18} className="sm:me-1" />
                    )}
                    <span className="select-none text-sm ">Share</span>
                </div>
            </div>

            {showOptions && (
                <div className="absolute top-10 right-0 w-40 bg-white shadow-lg rounded-md z-10">
                    <ul className="py-1">
                        <li className='px-2 py-1 cursor-pointer hover:bg-charcoal-100/20'>
                            <FacebookShareButton
                                url={newUrl}
                                className="flex items-center px-2 py-1 hover:bg-gray-500 w-full"
                            >
                                <RiFacebookFill size={18} className="me-2 text-blue-600" />
                                Facebook
                            </FacebookShareButton>
                        </li>
                        <li className='px-2 py-1 cursor-pointer hover:bg-charcoal-100/20'>
                            <WhatsappShareButton
                                url={newUrl}
                                className="flex items-center px-2 py-1 hover:bg-gray-500 w-full"
                            >
                                <RiWhatsappFill size={18} className="me-2 text-green-600" />
                                WhatsApp
                            </WhatsappShareButton>
                        </li>
                        <li className='px-2 py-1 cursor-pointer hover:bg-charcoal-100/20'>
                            <TelegramShareButton
                                url={newUrl}
                                className="flex items-center px-2 py-1 hover:bg-gray-100 w-full"
                            >
                                <RiTelegramFill size={18} className="me-2 text-blue-500" />
                                Telegram
                            </TelegramShareButton>
                        </li>
                        <li className='px-2 py-1 cursor-pointer hover:bg-charcoal-100/20'>
                            <ViberShareButton
                                url={newUrl}
                                className="flex items-center px-2 py-1 hover:bg-gray-100 w-full"
                            >
                                <LiaViber size={18} className="me-2 text-violet-600" />
                                Viber
                            </ViberShareButton>
                        </li>

                        <li onClick={handleCopyLink} className="flex items-center px-2 py-1 hover:bg-gray-100 cursor-pointer w-full">
                            <RiLinksLine size={18} className="me-2 text-gray-600" />
                            Copy Link
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default ShareButton;
