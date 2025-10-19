import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 py-10 mt-12">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8 text-center md:text-left">

        {/* About */}
        <div>
          <h4 className="text-lg font-semibold text-emerald-700 mb-3">About Us</h4>
          <p className="text-gray-600 text-sm">
            Asia Sky Blue Travel and Tour provides trusted pilgrimage services with
            carefully planned Umrah & Hajj packages for a spiritual journey.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold text-emerald-700 mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li><a href="/" className="hover:text-emerald-700">Home</a></li>
            <li><a href="/#about" className="hover:text-emerald-700">About</a></li>
            <li><a href="/blogs" className="hover:text-emerald-700">Blogs</a></li>
            <li><a href="/#contact" className="hover:text-emerald-700">Contact</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-lg font-semibold text-emerald-700 mb-3">Contact</h4>

          {/* Australia */}
          <p className="text-gray-600 text-sm font-medium mt-4">🇦🇺 Brisbane, QLD, Australia</p>
          <p className="text-gray-600 text-sm">📞 0490 866 626</p>
          <p className="text-gray-600 text-sm">📧 aus@asiabluesky.com</p>

          {/* Myanmar */}
          <p className="text-gray-600 text-sm font-medium mt-4">🇲🇲 Yangon, Myanmar</p>
          <p className="text-gray-600 text-sm">📞 +959 517 1530</p>
          <p className="text-gray-600 text-sm">📧 mm@asiabluesky.com</p>
        </div>
      </div>

      <div className="border-t mt-8 pt-4 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Makka Tour. All rights reserved.
      </div>
    </footer >
  );
};

export default Footer;
