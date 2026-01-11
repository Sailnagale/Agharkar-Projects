import React, { useEffect } from "react";

const Footer = ({ darkMode }) => {
  // Use useEffect to load the script when the Footer mounts
  useEffect(() => {
    // 1. Check if the script is already there to prevent duplicates
    if (!document.getElementById("clstr_globe")) {
      const script = document.createElement("script");
      script.src =
        "//clustrmaps.com/globe.js?d=nnUJ4bmntKrBdqyIzUaP4HUyGFvAaX3tNB5axVGuIC0";
      script.id = "clstr_globe";
      script.async = true; // Load asynchronously to not block the page

      // 2. Append it to our specific container
      const container = document.getElementById("map-widget-container");
      if (container) {
        container.appendChild(script);
      }
    }
  }, []);

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

        {/* --- 2. Center: Visitor Map Widget --- */}
        <div className="flex flex-col items-center">
          <span className="text-[10px] uppercase tracking-widest mb-2 opacity-60">
            Visitor Live Map
          </span>

          {/* We created a dedicated container ID for the script to attach to */}
          <div
            id="map-widget-container"
            className="opacity-80 hover:opacity-100 transition-opacity flex justify-center"
            style={{ minHeight: "60px", minWidth: "60px" }} // Reserved space so layout doesn't jump
          >
            {/* The script will be injected here by useEffect */}
          </div>
        </div>

        {/* --- 3. Right: Links --- */}
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
