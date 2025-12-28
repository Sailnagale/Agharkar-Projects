import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import About from "./components/About";
import Contact from "./components/Contact";
import SeedInspector from "./components/SeedInspector";
import RootAnalyzer from "./components/RootAnalyzer";
import LeafAnalyzer from "./components/LeafAnalyzer";

function App() {
  // Navigation State: 'home', 'about', 'contact'
  const [currentPage, setCurrentPage] = useState("home");

  // Tool State (Only used when currentPage === 'home')
  const [activeTool, setActiveTool] = useState("seeds");

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Logic to decide what to show on the screen
  const renderContent = () => {
    if (currentPage === "about") return <About darkMode={darkMode} />;
    if (currentPage === "contact") return <Contact darkMode={darkMode} />;

    // Default: Show the Dashboard (Home)
    return (
      <>
        {/* Project Switcher Tabs */}
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

        {/* The Active Tool Component */}
        <div className="animate-fade-in-up">
          {activeTool === "seeds" && <SeedInspector darkMode={darkMode} />}
          {activeTool === "roots" && <RootAnalyzer darkMode={darkMode} />}
          {activeTool === "leaf" && <LeafAnalyzer darkMode={darkMode} />}
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
      {/* Navbar with Navigation Logic passed down */}
      <Navbar
        darkMode={darkMode}
        toggleTheme={() => setDarkMode(!darkMode)}
        onNavigate={setCurrentPage}
        activePage={currentPage}
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
