import React, { useState } from "react";
import { Menu, X } from "lucide-react"; // lightweight icons
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "@store/index";
import { LanguageSwitcher } from "@components/ui/LanguagesSwitcher";
import { useTranslation } from "react-i18next";
import { scrollToSection } from "@utils/ScrollToSection";

const NavBar: React.FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [menuOpen, setMenuOpen] = useState(false);

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
            label: t("site.menu.home"), action: () => {
                navigate("/");
                window.scrollTo({ top: 0, behavior: "smooth" });
            }
        },
        { label: t("site.menu.about"), action: () => handleSectionClick("about") },
        {
            label: t("site.menu.blogs"), action: () => {
                navigate("/blogs");
                window.scrollTo({ top: 0, behavior: "smooth" });
            }
        },
        { label: t("site.menu.contact"), action: () => handleSectionClick("contact") },
        // { label: "Dashboard", href: "/dashboard" },        // full path
        // full path
    ];

    // ✅ Add dashboard link only if logged in
    if (isAuthenticated) {
        navLinks.push({ label: "Dashboard", action: () => navigate("/dashboard") });
    }
    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
            <div className="max-w-[1920px] mx-auto px-6 py-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-emerald-700">
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
                            className="hover:text-emerald-700 transition cursor-pointer"
                        >
                            {link.label}
                        </button>
                    ))}

                    <LanguageSwitcher />

                </nav>


                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-emerald-700"
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
                                className="hover:text-emerald-700 transition cursor-pointer"
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
