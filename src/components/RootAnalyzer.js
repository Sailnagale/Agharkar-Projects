import React, { useState, useEffect } from "react";

const RootAnalyzer = ({ darkMode }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [result, setResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [timer, setTimer] = useState(0);

  const API_URL = "https://sail-nagale-yolo-backend.hf.space/detect-roots";

  // --- LOCAL SAMPLES ---
  const SAMPLE_IMAGES = [
    { id: 1, url: "/images/root/124.jpg", label: "Root 1" },
    { id: 2, url: "/images/root/33.jpg", label: "Root 2" },
    { id: 3, url: "/images/root/206.jpg", label: "Root 3" },
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
      const file = new File([blob], "sample_root.jpg", { type: "image/jpeg" });
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
              : "bg-white border-amber-100"
          }`}
        >
          <h2
            className={`text-xl font-bold mb-6 ${
              darkMode ? "text-amber-400" : "text-amber-800"
            }`}
          >
            Upload Root Sample
          </h2>

          <label
            className={`flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-300 ${
              selectedFile
                ? darkMode
                  ? "border-amber-500 bg-amber-900/20"
                  : "border-amber-400 bg-amber-50"
                : darkMode
                ? "border-gray-600 hover:bg-gray-700"
                : "border-gray-300 hover:bg-amber-50"
            }`}
          >
            <div className="flex flex-col items-center justify-center text-center">
              {selectedFile ? (
                <>
                  <div className="w-8 h-8 mb-2 rounded-full bg-amber-100 flex items-center justify-center">
                    🥜
                  </div>
                  <p
                    className={`text-sm font-semibold ${
                      darkMode ? "text-amber-400" : "text-amber-700"
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
                  className="h-16 rounded-lg overflow-hidden border border-gray-300 hover:border-amber-500 hover:ring-2 hover:ring-amber-500/50"
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
                : "bg-amber-600 hover:bg-amber-700"
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
              "Count Nodules"
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
              : "bg-white border-amber-100"
          }`}
        >
          <div className="flex-grow flex items-center justify-center p-6 bg-black/5">
            {result?.processed_image ? (
              <img
                src={`data:image/jpeg;base64,${result.processed_image}`}
                alt="Processed Roots"
                className="max-w-full max-h-[500px] rounded-lg shadow-2xl"
              />
            ) : (
              <div className="text-center opacity-40">
                <p>Processed image will appear here</p>
              </div>
            )}
          </div>
          {result && (
            <div
              className={`p-6 border-t ${
                darkMode
                  ? "bg-gray-900 border-gray-700"
                  : "bg-amber-50 border-amber-100"
              }`}
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-amber-400/10 border border-amber-400/20 text-center">
                  <div className="text-3xl font-black text-amber-600">
                    {result.stats.node_count}
                  </div>
                  <div className="text-xs font-bold uppercase tracking-wider text-amber-600/70">
                    Total Nodules
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-blue-400/10 border border-blue-400/20 text-center">
                  <div className="text-3xl font-black text-blue-600">
                    {result.stats.avg_area}
                  </div>
                  <div className="text-xs font-bold uppercase tracking-wider text-blue-600/70">
                    Avg Area (mm²)
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RootAnalyzer;
