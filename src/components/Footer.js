import React from "react";

const Footer = ({ darkMode }) => {
  return (
    <footer
      className={`mt-auto py-8 border-t transition-colors duration-300 ${
        darkMode
          ? "bg-gray-900 border-gray-800 text-gray-400"
          : "bg-white border-gray-200 text-gray-500"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
        {/* --- 1. Left: Copyright Info --- */}
        <div className="text-center md:text-left">
          <p className="font-semibold text-sm">
            © 2026 AgriVision AI Research Group.
          </p>
          <p className="text-xs mt-1 opacity-75">Developed at ARI Pune</p>
        </div>

        {/* --- 2. Right: Links --- */}
        <div className="flex space-x-6 text-sm">
          <a href="#" className="hover:underline">
            Documentation
          </a>
          <a href="#" className="hover:underline">
            Privacy Policy
          </a>
          <a href="#" className="hover:underline">
            Report Issue
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
