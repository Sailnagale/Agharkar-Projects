import React, { useState, useEffect } from "react";
// 1. Firebase Imports
import { auth } from "./firebase";
import {
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

// Component Imports
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import About from "./components/About";
import Contact from "./components/Contact";
import SeedInspector from "./components/SeedInspector";
import RootAnalyzer from "./components/RootAnalyzer";
import LeafAnalyzer from "./components/LeafAnalyzer";
import VisitorStats from "./components/VisitorStats";

function App() {
  // Navigation State
  const [currentPage, setCurrentPage] = useState("home");
  // Tool State
  const [activeTool, setActiveTool] = useState("seeds");
  // Theme State
  const [darkMode, setDarkMode] = useState(false);
  // 2. User Authentication State
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 3. Listen for Login/Logout events
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false); // Stop loading once we know if user is in or out
    });
    return () => unsubscribe();
  }, []);

  // Theme Toggle Effect
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Login Function (to be passed to "Get Started" buttons)
  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  // Logic to decide what to show
  const renderContent = () => {
    if (currentPage === "about") return <About darkMode={darkMode} />;
    if (currentPage === "contact") return <Contact darkMode={darkMode} />;

    // --- HOME PAGE LOGIC ---

    // A. If Loading, show spinner
    if (loading) {
      return (
        <div className="flex h-[60vh] items-center justify-center">
          <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      );
    }

    // B. If NOT Logged In -> Show Welcome Screen
    if (!user) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 animate-fade-in-up">
          <div
            className={`p-8 rounded-3xl max-w-2xl ${
              darkMode ? "bg-gray-800" : "bg-white"
            } shadow-xl border border-gray-100`}
          >
            <div className="mb-6 inline-block p-4 rounded-full bg-green-100 text-green-600">
              <svg
                className="w-12 h-12"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                ></path>
              </svg>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-600">
              AgriVision AI
            </h1>
            <p
              className={`text-lg mb-8 ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Advanced Deep Learning for crop quality assessment. <br />
              Please sign in to access the <b>Seed</b>, <b>Root</b>, and{" "}
              <b>Leaf</b> analysis tools.
            </p>
            <button
              onClick={handleLogin}
              className="px-8 py-3 rounded-full font-bold text-lg bg-green-600 text-white shadow-lg hover:bg-green-700 hover:scale-105 transition-all"
            >
              Sign In with Google
            </button>
          </div>
        </div>
      );
    }

    // C. If Logged In -> Show the Tools (Your existing code)
    return (
      <>
        <div className="flex justify-center mb-10">
          <div
            className={`flex p-1 space-x-1 rounded-xl shadow-inner ${
              darkMode ? "bg-gray-800" : "bg-gray-200"
            }`}
          >
            <TabButton
              label="🌱 Seed Quality"
              isActive={activeTool === "seeds"}
              onClick={() => setActiveTool("seeds")}
              darkMode={darkMode}
            />
            <TabButton
              label="🥜 Root Nodules"
              isActive={activeTool === "roots"}
              onClick={() => setActiveTool("roots")}
              darkMode={darkMode}
            />
            <TabButton
              label="🍂 Leaf Damage"
              isActive={activeTool === "leaf"}
              onClick={() => setActiveTool("leaf")}
              darkMode={darkMode}
            />
          </div>
        </div>

        <div className="animate-fade-in-up min-h-[60vh]">
          {activeTool === "seeds" && <SeedInspector darkMode={darkMode} />}
          {activeTool === "roots" && <RootAnalyzer darkMode={darkMode} />}
          {activeTool === "leaf" && <LeafAnalyzer darkMode={darkMode} />}
        </div>

        <div className="mt-20 border-t border-gray-200/50 pt-10">
          <VisitorStats darkMode={darkMode} />
        </div>
      </>
    );
  };

  return (
    <div
      className={`min-h-screen flex flex-col font-sans transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-800"
      }`}
    >
      {/* Navbar gets the user prop so it knows when to show the profile picture */}
      <Navbar
        darkMode={darkMode}
        toggleTheme={() => setDarkMode(!darkMode)}
        onNavigate={setCurrentPage}
        activePage={currentPage}
        user={user}
      />

      <main className="flex-grow w-full max-w-7xl mx-auto px-4 py-8">
        {renderContent()}
      </main>

      <Footer darkMode={darkMode} />
    </div>
  );
}

// Helper: Tab Button Component
const TabButton = ({ label, isActive, onClick, darkMode }) => (
  <button
    onClick={onClick}
    className={`
      px-4 sm:px-6 py-2.5 text-xs sm:text-sm font-bold rounded-lg transition-all duration-200 whitespace-nowrap
      ${
        isActive
          ? darkMode
            ? "bg-green-600 text-white shadow-lg"
            : "bg-white text-green-700 shadow-md"
          : darkMode
          ? "text-gray-400 hover:text-white"
          : "text-gray-600 hover:text-gray-900"
      }
    `}
  >
    {label}
  </button>
);

export default App;
