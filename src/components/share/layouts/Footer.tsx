/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetEndpointQuery } from "@services/apiSlice";
import { endpoints } from "@services/endpoints";
import { scrollToSection } from "@utils/ScrollToSection";
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { FaInstagram, FaFacebookF, FaYoutube, FaTiktok } from "react-icons/fa";


const Footer: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { data, isLoading } = useGetEndpointQuery(`${endpoints.contacts}`);


  const handleScrollToTop = () => {
    navigate("/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSectionClick = (sectionId: string) => {
    navigate("/"); // Go to home page first
    scrollToSection(sectionId);
  };

  return (
    <footer className="bg-gray-100 py-10 mt-12">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8 text-center md:text-left">

        {/* About */}
        <div>
          <h4 className="text-lg font-semibold text-emerald-700 mb-3">About Us</h4>
          <p className="text-gray-600 text-sm">
            {t("footer.about")}
          </p>
          {/* Social Links */}
          <div className="mt-4 flex space-x-4 justify-center md:justify-start">
            <a
              href="https://www.instagram.com/asiaskyblue?igsh=MXkwM3Fqb3UxcTJwZA=="
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-700 hover:text-pink-500 transition text-xl"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61583026522939"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-700 hover:text-blue-500 transition text-xl"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://www.youtube.com/@HajjandUmrahAus"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-600 hover:text-red-600 transition text-xl"
            >
              <FaYoutube />
            </a>
            <a
              href="https://www.tiktok.com/@asiaskybluehajjandumrah?_t=ZS-90s4x9VW5A4&_r=1"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-700 hover:text-black transition text-xl"
            >
              <FaTiktok />
            </a>
          </div>

        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold text-emerald-700 mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>
              <button
                onClick={handleScrollToTop}
                className="hover:text-emerald-700 transition"
              >
                {t("site.menu.home")}
              </button>
            </li>
            <li>
              <button
                onClick={() => handleSectionClick("about")}
                className="hover:text-emerald-700 transition"
              >
                {t("site.menu.about")}
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  navigate("/blogs");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="hover:text-emerald-700 transition"
              >
                {t("site.menu.blogs")}
              </button>
            </li>
            <li>
              <button
                onClick={() => handleSectionClick("contact")}
                className="hover:text-emerald-700 transition"
              >
                {t("site.menu.contact")}
              </button>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-lg font-semibold text-emerald-700 mb-3">Contact</h4>

          {isLoading ? (
            <p className="text-gray-600 text-sm">Loading...</p>
          ) : (
            data?.data?.map((contact: any) => (
              <div key={contact.id} className="mt-4">
                <p className="text-gray-600 text-sm font-medium">
                  <sub>{contact.country_code}</sub> {contact.city}
                  {contact.state ? `, ${contact.state}` : ""}, {contact.country}
                </p>
                <p className="text-gray-600 text-sm">
                  📞{" "}
                  <a href={`tel:${contact.phone}`} className="hover:text-emerald-700 transition">
                    {contact.phone}
                  </a>
                </p>
                <p className="text-gray-600 text-sm">
                  📧{" "}
                  <a href={`mailto:${contact.email}`} className="hover:text-emerald-700 transition">
                    {contact.email}
                  </a>
                </p>
              </div>
            ))
          )}


        </div>
      </div>

      <div className="border-t mt-8 pt-4 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Makka Tour. All rights reserved.
      </div>
    </footer >
  );
};

export default Footer;
