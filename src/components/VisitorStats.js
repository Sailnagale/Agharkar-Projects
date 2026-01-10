import React, { useEffect } from "react";

const VisitorStats = ({ darkMode }) => {
  useEffect(() => {
    // 1. Load Globe Script (ClustrMaps)
    if (!document.getElementById("clstr_globe")) {
      const script = document.createElement("script");
      script.src =
        "//clustrmaps.com/globe.js?d=nnUJ4bmntKrBdqyIzUaP4HUyGFvAaX3tNB5axVGuIC0";
      script.id = "clstr_globe";
      script.async = true;

      const container = document.getElementById("globe-container");
      if (container) {
        container.innerHTML = "";
        container.appendChild(script);
      }
    }
  }, []);

  // Styles
  const cardStyle = `
    relative overflow-hidden rounded-2xl p-6 border shadow-lg transition-all duration-300
    ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}
  `;

  const titleStyle = `
    text-lg font-bold mb-4 uppercase tracking-widest
    ${darkMode ? "text-gray-200" : "text-gray-700"}
  `;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* --- CARD 1: GLOBAL REACH --- */}
        <div className={`${cardStyle} lg:col-span-2`}>
          <h3 className={titleStyle}>Global Research Reach</h3>

          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* 1. GLOBE */}
            <div className="flex-shrink-0 flex justify-center items-center">
              <div
                id="globe-container"
                className="w-[200px] h-[200px] flex items-center justify-center"
              >
                <span className="text-xs opacity-50">Loading Globe...</span>
              </div>
            </div>

            {/* 2. COUNTRY LIST (Flag Counter) */}
            <div className="flex-1 w-full">
              <p
                className={`text-sm mb-3 ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Top Visiting Countries (Live Data):
              </p>

              <div className="bg-gray-100/50 p-4 rounded-lg overflow-x-auto">
                <a
                  href="https://info.flagcounter.com/39CI"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="https://s01.flagcounter.com/count2/39CI/bg_FFFFFF/txt_000000/border_CCCCCC/columns_2/maxflags_10/viewers_0/labels_0/pageviews_0/flags_0/percent_0/"
                    alt="Flag Counter"
                    border="0"
                    className="max-w-full h-auto"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* --- CARD 2: TOTAL IMPACT --- */}
        <div className={`${cardStyle} flex flex-col justify-between`}>
          <div>
            <h3 className={titleStyle}>Total Impact</h3>
            <p
              className={`text-sm ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
               Researchers and users who have accessed the platform.
            </p>
          </div>

          <div className="mt-8 text-center">
            {/* --- YOUR NEW HIT COUNTER CODE --- */}
            <div className="flex justify-center items-center py-4 transform scale-110">
              <a
                href="https://www.hitwebcounter.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://hitwebcounter.com/counter/counter.php?page=21468590&style=0025&nbdigits=5&type=page&initCount=0"
                  title="Total Visitors"
                  alt="Total Visitors"
                  border="0"
                />
              </a>
            </div>

            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                darkMode
                  ? "bg-green-900/30 text-green-300"
                  : "bg-green-100 text-green-800"
              }`}
            >
              Tracking Live
            </span>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200/20">
            <div className="flex items-center justify-between text-xs opacity-70">
              <span>Model Backend:</span>
              <span className="text-blue-500 font-bold flex items-center gap-1">
                <span className="block w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                Hugging Face Spaces
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisitorStats;
