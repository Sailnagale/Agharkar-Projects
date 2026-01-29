import React, { useEffect, useRef } from "react";
import createGlobe from "cobe";

// --- 1. THE GLOBE COMPONENT ---
const InteractiveGlobe = ({ darkMode }) => {
  const canvasRef = useRef();

  useEffect(() => {
    let phi = 0;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 600,
      height: 600,
      phi: 0,
      theta: 0,
      // toggle 'dark' mode logic in the engine
      dark: darkMode ? 1 : 0,
      diffuse: 1.2,
      // --- VISUAL TWEAKS START ---
      // 1. More dots = clearer continents
      mapSamples: 100000,
      // 2. Adjust brightness: High for Dark Mode (glowing), Low for Light Mode (dark dots)
      mapBrightness: darkMode ? 6 : 1.2,
      // 3. Colors
      baseColor: darkMode ? [0.1, 0.1, 0.1] : [1, 1, 1],
      markerColor: darkMode ? [0.1, 0.8, 1] : [1, 0.1, 0.1], // Cyan (dark) / Red (light)
      glowColor: darkMode ? [0.1, 0.1, 0.2] : [0.9, 0.9, 0.9],
      // --- VISUAL TWEAKS END ---
      scale: 1,
      markers: [
        { location: [19.076, 72.8777], size: 0.1 }, // Pune (Home)
        { location: [40.7128, -74.006], size: 0.05 }, // New York
        { location: [35.6762, 139.6503], size: 0.05 }, // Tokyo
        { location: [40.4168, -3.7038], size: 0.05 }, // Madrid
        { location: [37.5665, 126.978], size: 0.05 }, // Seoul
      ],
      onRender: (state) => {
        // Spin slightly faster
        state.phi = phi;
        phi += 0.005;
      },
    });

    return () => {
      globe.destroy();
    };
  }, [darkMode]);

  return (
    <div className="flex items-center justify-center w-full h-full py-4">
      <div className="relative w-full max-w-[300px] aspect-square">
        <canvas
          ref={canvasRef}
          style={{ width: "100%", height: "100%", contain: "layout paint" }}
        />
      </div>
    </div>
  );
};

// --- 2. MAIN COMPONENT ---
const VisitorStats = ({ darkMode }) => {
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
            {/* Globe Section */}
            <div className="flex-shrink-0 w-full md:w-1/2 flex justify-center">
              <InteractiveGlobe darkMode={darkMode} />
            </div>

            {/* Stats Section */}
            <div className="flex-1 w-full">
              <p
                className={`text-sm mb-3 ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Top Visiting Countries (Live Data):
              </p>
              <div
                className={`p-4 rounded-lg overflow-x-auto ${
                  darkMode ? "bg-gray-900/50" : "bg-gray-50"
                }`}
              >
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
            <div className="flex justify-center items-center py-4 transform scale-110">
              <a
                href="https://www.hitwebcounter.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://hitwebcounter.com/counter/counter.php?page=21468592&style=0025&nbdigits=5&type=page&initCount=0"
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
