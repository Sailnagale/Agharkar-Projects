import React, { useState, useEffect } from "react";
// Import auth functions from your firebase file
import { auth, signInWithGoogle, logout } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

const Navbar = ({ darkMode, toggleTheme, onNavigate, activePage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);

  // Listen for authentication changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Helper for Link Classes
  const navLinkClass = (page) => `
    relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer
    ${
      activePage === page
        ? darkMode
          ? "bg-green-600/20 text-green-400"
          : "bg-green-100 text-green-700"
        : darkMode
        ? "text-gray-300 hover:bg-gray-800 hover:text-white"
        : "text-gray-600 hover:bg-gray-100 hover:text-green-600"
    }
  `;

  return (
    <nav
      className={`
      sticky top-0 z-50 border-b backdrop-blur-md shadow-sm transition-all duration-300
      ${
        darkMode
          ? "bg-gray-900/80 border-gray-800"
          : "bg-white/80 border-gray-200"
      }
    `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* --- 1. LOGO SECTION --- */}
          <div
            onClick={() => onNavigate("home")}
            className="flex items-center gap-3 cursor-pointer group"
          >
            {/* Animated Icon Container */}
            <div
              className={`
              w-10 h-10 rounded-xl flex items-center justify-center shadow-lg transform transition-transform group-hover:scale-110 group-hover:rotate-3
              ${
                darkMode
                  ? "bg-gradient-to-br from-green-600 to-emerald-800"
                  : "bg-gradient-to-br from-green-500 to-emerald-600"
              }
            `}
            >
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                ></path>
              </svg>
            </div>

            {/* Gradient Text */}
            <div className="flex flex-col">
              <span
                className={`text-lg font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r ${
                  darkMode
                    ? "from-white to-gray-400"
                    : "from-gray-900 to-gray-600"
                }`}
              >
                AgriVision AI
              </span>
              <span
                className={`text-[10px] font-bold uppercase tracking-widest ${
                  darkMode ? "text-green-400" : "text-green-600"
                }`}
              >
                Research Beta
              </span>
            </div>
          </div>

          {/* --- 2. DESKTOP MENU --- */}
          <div className="hidden md:flex items-center space-x-2">
            {/* === CHANGED: THEME TOGGLE (Moved to Start) === */}
            <button
              onClick={toggleTheme}
              className={`
                flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 transform hover:scale-105 mr-2
                ${
                  darkMode
                    ? "bg-gray-800 text-yellow-400 border border-gray-700 hover:border-yellow-400/50"
                    : "bg-gray-100 text-gray-600 border border-gray-200 hover:border-gray-400 hover:text-gray-900"
                }
              `}
            >
              {darkMode ? (
                <>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    ></path>
                  </svg>
                  <span>Light</span>
                </>
              ) : (
                <>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    ></path>
                  </svg>
                  <span>Dark</span>
                </>
              )}
            </button>

            {/* Navigation Links */}
            <span
              onClick={() => onNavigate("home")}
              className={navLinkClass("home")}
            >
              Home
            </span>
            <span
              onClick={() => onNavigate("about")}
              className={navLinkClass("about")}
            >
              About
            </span>
            <span
              onClick={() => onNavigate("contact")}
              className={navLinkClass("contact")}
            >
              Contact
            </span>

            {/* Divider */}
            <div
              className={`h-6 w-px mx-4 ${
                darkMode ? "bg-gray-700" : "bg-gray-300"
              }`}
            ></div>

            {/* AUTH SECTION (Desktop) */}
            {user ? (
              <div className="flex items-center gap-4 mr-2">
                {/* Profile Button */}
                <button
                  onClick={() => onNavigate("profile")}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-all group ${
                    activePage === "profile"
                      ? darkMode
                        ? "bg-gray-800 text-green-400 ring-1 ring-green-500"
                        : "bg-green-50 text-green-700 ring-1 ring-green-400"
                      : "hover:bg-gray-100/10"
                  }`}
                >
                  <img
                    src={user.photoURL}
                    alt="Profile"
                    referrerPolicy="no-referrer"
                    className="w-7 h-7 rounded-full border border-green-500"
                  />
                  <span
                    className={`text-sm font-medium ${
                      darkMode
                        ? "text-gray-300 group-hover:text-white"
                        : "text-gray-700 group-hover:text-green-600"
                    }`}
                  >
                    Profile
                  </span>
                </button>

                {/* Logout Button */}
                <button
                  onClick={logout}
                  className={`text-sm font-medium transition-colors hover:text-red-500 ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={signInWithGoogle}
                className={`mr-2 px-4 py-1.5 rounded-full text-sm font-bold shadow-md transition-all transform hover:-translate-y-0.5 ${
                  darkMode
                    ? "bg-white text-gray-900 hover:bg-gray-100"
                    : "bg-gray-900 text-white hover:bg-gray-800"
                }`}
              >
                Login
              </button>
            )}
          </div>

          {/* --- 3. MOBILE HAMBURGER BUTTON --- */}
          <div className="flex md:hidden items-center space-x-4">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full ${
                darkMode ? "text-yellow-400" : "text-gray-600"
              }`}
            >
              {darkMode ? (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  ></path>
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  ></path>
                </svg>
              )}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-lg ${
                darkMode
                  ? "text-gray-200 hover:bg-gray-800"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* --- 4. MOBILE MENU DROPDOWN --- */}
      {isOpen && (
        <div
          className={`md:hidden absolute w-full border-b shadow-lg transition-all z-40 ${
            darkMode
              ? "bg-gray-900 border-gray-800"
              : "bg-white border-gray-100"
          }`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            <MobileNavLink
              label="Home"
              active={activePage === "home"}
              onClick={() => {
                onNavigate("home");
                setIsOpen(false);
              }}
              darkMode={darkMode}
            />
            <MobileNavLink
              label="About Project"
              active={activePage === "about"}
              onClick={() => {
                onNavigate("about");
                setIsOpen(false);
              }}
              darkMode={darkMode}
            />
            <MobileNavLink
              label="Contact Team"
              active={activePage === "contact"}
              onClick={() => {
                onNavigate("contact");
                setIsOpen(false);
              }}
              darkMode={darkMode}
            />

            {/* AUTH SECTION (Mobile) */}
            <div
              className={`mt-4 pt-4 border-t ${
                darkMode ? "border-gray-800" : "border-gray-200"
              }`}
            >
              {user ? (
                <div className="px-3 flex items-center justify-between">
                  {/* Clickable Profile Info */}
                  <div
                    onClick={() => {
                      onNavigate("profile");
                      setIsOpen(false);
                    }}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <img
                      src={user.photoURL}
                      alt="p"
                      className="w-10 h-10 rounded-full border border-green-500/30 group-active:scale-95 transition-transform"
                    />
                    <div className="flex flex-col">
                      <span
                        className={`text-sm font-semibold ${
                          darkMode ? "text-gray-200" : "text-gray-800"
                        }`}
                      >
                        {user.displayName}
                      </span>
                      <span className="text-xs text-green-500 font-medium">
                        View Profile
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={logout}
                    className="text-sm text-red-500 font-medium px-3 py-1 hover:bg-red-50 rounded-md transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    signInWithGoogle();
                    setIsOpen(false);
                  }}
                  className={`w-full text-center py-2 rounded-md font-bold ${
                    darkMode
                      ? "bg-white text-gray-900"
                      : "bg-gray-900 text-white"
                  }`}
                >
                  Login with Google
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

// Helper Component for Mobile Links
const MobileNavLink = ({ label, active, onClick, darkMode }) => (
  <button
    onClick={onClick}
    className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors
    ${
      active
        ? darkMode
          ? "bg-green-900/50 text-green-400"
          : "bg-green-50 text-green-700"
        : darkMode
        ? "text-gray-300 hover:bg-gray-800 hover:text-white"
        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
    }
  `}
  >
    {label}
  </button>
);

export default Navbar;
