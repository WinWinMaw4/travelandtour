import React, { useState } from "react";
import { Menu, X } from "lucide-react"; // lightweight icons
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "@store/index";
import { LanguageSwitcher } from "@components/ui/LanguagesSwitcher";
import { useTranslation } from "react-i18next";
import { scrollToSection } from "@utils/ScrollToSection";

const NavBar: React.FC = () => {
    const { t } = useTranslation();
    const location = useLocation();
    const navigate = useNavigate();

    const [menuOpen, setMenuOpen] = useState(false);
    const [currentSection, setCurrentSection] = useState<string>("home");


    // ✅ Get auth state from Redux
    const isAuthenticated = useSelector(
        (state: RootState) => state.auth.isAuthenticated
    );

    const handleSectionClick = (sectionId: string) => {
        navigate("/"); // go home first
        scrollToSection(sectionId);
    };

    const navLinks = [
        {
            id: "home", label: t("site.menu.home"), action: () => {
                navigate("/");
                window.scrollTo({ top: 0, behavior: "smooth" });
            }
        },
        { id: "about", label: t("site.menu.about"), action: () => handleSectionClick("about") },
        {
            id: "blogs", label: t("site.menu.blogs"), action: () => {
                navigate("/blogs");
                window.scrollTo({ top: 0, behavior: "smooth" });
            }
        },
        { id: "contact", label: t("site.menu.contact"), action: () => handleSectionClick("contact") },
    ];



    // ✅ Add dashboard link only if logged in
    if (isAuthenticated) {
        navLinks.push({ id: "dashboard", label: "Dashboard", action: () => navigate("/dashboard") });
    }

    React.useEffect(() => {
        const sections = document.querySelectorAll("section[id]");

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setCurrentSection(entry.target.id);
                    }
                });
            },
            { rootMargin: "-50% 0px -50% 0px" } // middle of viewport
        );

        sections.forEach((sec) => observer.observe(sec));

        return () => {
            sections.forEach((sec) => observer.unobserve(sec));
        };
    }, []);


    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
            <div className="max-w-[1920px] mx-auto px-6 py-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-primary-700">
                    <Link to={"/"}>Asia Sky Blue HAJJ & UMRAH</Link>
                </h1>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center space-x-6">
                    {navLinks.map((link) => (
                        <button
                            key={link.label}
                            onClick={() => {
                                link.action();
                                setMenuOpen(false);
                            }}
                            className={`transition cursor-pointer ${(link.id === currentSection && location.pathname === "/") ||
                                location.pathname.startsWith(`/${link.id}`)
                                ? "text-primary-700 font-bold"
                                : "hover:text-primary-700"
                                }`}

                        >
                            {link.label}
                        </button>
                    ))}


                    <LanguageSwitcher />

                </nav>


                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-primary-700"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {menuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="md:hidden bg-white border-t shadow-md">
                    <nav className="flex flex-col justify-start items-baseline space-y-4 p-6">
                        {navLinks.map((link) => (
                            <button
                                key={link.label}
                                onClick={() => {
                                    link.action();
                                    setMenuOpen(false);
                                }}
                                className="hover:text-primary-700 transition cursor-pointer"
                            >
                                {link.label}
                            </button>
                        ))}
                        <div className="relative">
                            <LanguageSwitcher />
                        </div>
                    </nav>
                </div>
            )}
        </header>
    );
};

export default NavBar;
