import React, { useState } from "react";
import { Menu, X } from "lucide-react"; // lightweight icons

const NavBar: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const navLinks = [
        { label: "Home", href: "/" },                  // full path
        { label: "About", href: "/#about" },           // full path with hash
        { label: "Blogs", href: "/blogs" },            // full path
        { label: "Contact", href: "/#contact" },        // full path
    ];
    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
            <div className="max-w-[1920px] mx-auto px-6 py-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-emerald-700">
                    Asia Sky Blue Travel and Tour
                </h1>

                {/* Desktop Nav */}
                <nav className="hidden md:flex space-x-6">
                    {navLinks.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            className="hover:text-emerald-700 transition"
                        >
                            {link.label}
                        </a>
                    ))}
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
                    <nav className="flex flex-col space-y-4 p-6">
                        {navLinks.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                className="hover:text-emerald-700 transition"
                                onClick={() => setMenuOpen(false)}
                            >
                                {link.label}
                            </a>
                        ))}
                    </nav>
                </div>
            )}
        </header>
    );
};

export default NavBar;
