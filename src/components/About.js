import React from "react";

const About = ({ darkMode }) => {
  return (
    <div
      className={`max-w-4xl mx-auto space-y-12 animate-fade-in-up ${
        darkMode ? "text-gray-100" : "text-gray-800"
      }`}
    >
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight">
          Intelligent Vision System for{" "}
          <span className="text-green-600">Agriculture</span>
        </h1>
        <p
          className={`text-xl max-w-2xl mx-auto ${
            darkMode ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Automating quality assessment for soybean seeds, root nodules, and
          plant leaves using advanced Computer Vision.
        </p>
      </div>

      {/* Project Overview Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Module 1 */}
        <div
          className={`p-6 rounded-2xl border ${
            darkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200 shadow-sm"
          }`}
        >
          <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center text-2xl mb-4">
            🌱
          </div>
          <h3 className="text-lg font-bold mb-2">Seed Quality Inspector</h3>
          <p
            className={`text-sm ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Uses <strong>YOLOv8 Deep Learning</strong> models to detect minute
            defects like insect eggs and holes in soybean seeds with high
            precision.
          </p>
        </div>

        {/* Module 2 */}
        <div
          className={`p-6 rounded-2xl border ${
            darkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200 shadow-sm"
          }`}
        >
          <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-2xl mb-4">
            🥜
          </div>
          <h3 className="text-lg font-bold mb-2">Root Nodule Counter</h3>
          <p
            className={`text-sm ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Utilizes <strong>OpenCV Contour Detection</strong> to automate the
            tedious task of counting root nodules and calculating their
            effective surface area.
          </p>
        </div>

        {/* Module 3 */}
        <div
          className={`p-6 rounded-2xl border ${
            darkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200 shadow-sm"
          }`}
        >
          <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-2xl mb-4">
            🍂
          </div>
          <h3 className="text-lg font-bold mb-2">Leaf Damage Analyzer</h3>
          <p
            className={`text-sm ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Implements <strong>HSV Color Segmentation</strong> to isolate leaf
            miner damage and mathematically calculate the exact percentage of
            affected leaf area.
          </p>
        </div>
      </div>

      {/* Tech Stack Section */}
      <div
        className={`p-8 rounded-3xl ${
          darkMode ? "bg-gray-800" : "bg-green-50"
        }`}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Technology Stack
        </h2>
        <div className="flex flex-wrap justify-center gap-4">
          {[
            "React.js",
            "Tailwind CSS",
            "Python (Flask)",
            "YOLOv8",
            "OpenCV",
            "Pandas",
            "Hugging Face Spaces",
          ].map((tech) => (
            <span
              key={tech}
              className={`px-4 py-2 rounded-full text-sm font-semibold ${
                darkMode
                  ? "bg-gray-700 text-gray-200"
                  : "bg-white text-green-800 shadow-sm"
              }`}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
