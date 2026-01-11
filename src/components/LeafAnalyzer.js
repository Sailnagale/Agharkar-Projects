import React, { useState, useEffect } from "react";

const LeafAnalyzer = ({ darkMode }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [result, setResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [timer, setTimer] = useState(0);

  const API_URL = "https://sail-nagale-yolo-backend.hf.space/detect-leaf";

  // --- LOCAL SAMPLES ---
  const SAMPLE_IMAGES = [
    { id: 1, url: "/images/leaf/11.jpg", label: "Leaf 1" },
    // { id: 2, url: "/images/leaf/66.jpg", label: "Leaf 2" },
    { id: 3, url: "/images/leaf/163.jpg", label: "Leaf 3" },
    { id: 4, url: "/images/leaf/174.jpg", label: "Leaf 4" },
    // { id: 5, url: "/images/leaf/203.jpg", label: "Leaf 5" },
    { id: 6, url: "/images/leaf/207.jpg", label: "Leaf 6" },
  ];

  useEffect(() => {
    let interval;
    if (isAnalyzing) interval = setInterval(() => setTimer((t) => t + 1), 1000);
    else setTimer(0);
    return () => clearInterval(interval);
  }, [isAnalyzing]);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setResult(null);
  };

  const handleSampleSelect = async (sampleUrl) => {
    try {
      setResult(null);
      const response = await fetch(sampleUrl);
      const blob = await response.blob();
      const file = new File([blob], "sample_leaf.jpg", { type: "image/jpeg" });
      setSelectedFile(file);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;
    setIsAnalyzing(true);
    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const res = await fetch(API_URL, { method: "POST", body: formData });
      if (!res.ok) throw new Error("Backend Error");
      const data = await res.json();
      setResult(data);
    } catch (err) {
      alert("Error: " + err.message);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Controls */}
      <div className="lg:col-span-4 space-y-6">
        <div
          className={`p-6 rounded-2xl shadow-sm border transition-colors ${
            darkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-emerald-100"
          }`}
        >
          <h2
            className={`text-xl font-bold mb-6 ${
              darkMode ? "text-emerald-400" : "text-emerald-800"
            }`}
          >
            Upload Leaf Sample
          </h2>

          <label
            className={`flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-300 ${
              selectedFile
                ? darkMode
                  ? "border-emerald-500 bg-emerald-900/20"
                  : "border-emerald-400 bg-emerald-50"
                : darkMode
                ? "border-gray-600 hover:bg-gray-700"
                : "border-gray-300 hover:bg-emerald-50"
            }`}
          >
            <div className="flex flex-col items-center justify-center text-center">
              {selectedFile ? (
                <>
                  <div className="w-8 h-8 mb-2 rounded-full bg-emerald-100 flex items-center justify-center">
                    🍂
                  </div>
                  <p
                    className={`text-sm font-semibold ${
                      darkMode ? "text-emerald-400" : "text-emerald-700"
                    }`}
                  >
                    {selectedFile.name}
                  </p>
                </>
              ) : (
                <p className="text-sm text-gray-500">Click to upload</p>
              )}
            </div>
            <input
              type="file"
              className="hidden"
              onChange={handleFileChange}
              accept="image/*"
            />
          </label>

          {/* SAMPLES */}
          <div className="mt-6">
            <p className="text-xs font-bold text-gray-400 uppercase mb-2">
              Or try a sample:
            </p>
            <div className="grid grid-cols-3 gap-2">
              {SAMPLE_IMAGES.map((sample) => (
                <button
                  key={sample.id}
                  onClick={() => handleSampleSelect(sample.url)}
                  className="h-16 rounded-lg overflow-hidden border border-gray-300 hover:border-emerald-500 hover:ring-2 hover:ring-emerald-500/50"
                >
                  <img
                    src={sample.url}
                    alt={sample.label}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleAnalyze}
            disabled={!selectedFile || isAnalyzing}
            className={`w-full mt-6 py-4 rounded-xl font-bold text-lg shadow-lg text-white flex flex-col items-center justify-center ${
              isAnalyzing
                ? "bg-gray-500 cursor-wait"
                : "bg-emerald-600 hover:bg-emerald-700"
            }`}
          >
            {isAnalyzing ? (
              <>
                <span>Processing... ({timer}s)</span>
                {timer > 3 && (
                  <span className="text-xs font-normal opacity-90 mt-1 animate-pulse text-yellow-200">
                    Waking up free server...
                  </span>
                )}
              </>
            ) : (
              "Analyze Damage"
            )}
          </button>
        </div>
      </div>

      {/* Visualizer */}
      <div className="lg:col-span-8">
        <div
          className={`rounded-2xl shadow-sm border overflow-hidden min-h-[500px] flex flex-col ${
            darkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-emerald-100"
          }`}
        >
          <div className="flex-grow flex items-center justify-center p-6 bg-black/5">
            {result?.processed_image ? (
              <img
                src={`data:image/jpeg;base64,${result.processed_image}`}
                alt="Processed Leaf"
                className="max-w-full max-h-[500px] rounded-lg shadow-2xl"
              />
            ) : (
              <div className="text-center opacity-40">
                <p>Damage heatmap will appear here</p>
              </div>
            )}
          </div>
          {result && (
            <div
              className={`p-6 border-t ${
                darkMode
                  ? "bg-gray-900 border-gray-700"
                  : "bg-emerald-50 border-emerald-100"
              }`}
            >
              <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-red-400/10 border border-red-400/20 text-center">
                <div className="text-sm font-bold text-red-600 uppercase mb-1">
                  Leaf Area Damaged
                </div>
                <div className="text-5xl font-black text-gray-800 dark:text-gray-100">
                  {result.stats.damage_percentage}%
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4 dark:bg-gray-700 max-w-md">
                  <div
                    className="bg-red-600 h-2.5 rounded-full"
                    style={{
                      width: `${Math.min(
                        result.stats.damage_percentage,
                        100
                      )}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeafAnalyzer;
