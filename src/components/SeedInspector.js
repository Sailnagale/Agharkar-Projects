import React, { useState, useRef, useEffect } from "react";

const SeedInspector = ({ darkMode }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [result, setResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [timer, setTimer] = useState(0); // Timer state

  const imageRef = useRef(null);
  const canvasRef = useRef(null);
  const API_URL = "https://sail-nagale-yolo-backend.hf.space/detect-seeds";

  // --- LOCAL SAMPLES (In public/images folder) ---
  const SAMPLE_IMAGES = [
    {
      id: 1,
      url: "images/seed/i1.jpg",
      label: "Sample 1",
    },
    { id: 2, url: "images/seed/i6.jpg", label: "Sample 2" },
    { id: 3, url: "images/seed/i3.jpg", label: "Sample 3" },
    { id: 4, url: "images/seed/i7.jpg", label: "Sample 4" },
    { id: 5, url: "images/seed/i5.jpg", label: "Sample 5" },
    { id: 6, url: "images/seed/i8.jpg", label: "Sample 6" },
  ];

  // Timer Logic
  useEffect(() => {
    let interval;
    if (isAnalyzing) {
      interval = setInterval(() => setTimer((t) => t + 1), 1000);
    } else {
      setTimer(0);
    }
    return () => clearInterval(interval);
  }, [isAnalyzing]);

  // Handle User Upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setResult(null);
    }
  };

  // Handle Sample Selection
  const handleSampleSelect = async (sampleUrl) => {
    try {
      // 1. Show preview immediately
      setPreviewUrl(sampleUrl);
      setResult(null);

      // 2. Fetch the local file and convert to Blob -> File
      const response = await fetch(sampleUrl);
      const blob = await response.blob();
      const file = new File([blob], "sample_seed.jpg", { type: "image/jpeg" });

      setSelectedFile(file);
    } catch (err) {
      console.error("Could not load local sample:", err);
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

  // Canvas Drawing
  useEffect(() => {
    if (result && imageRef.current && canvasRef.current) {
      const img = imageRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      const draw = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        const scaleX = img.width / img.naturalWidth;
        const scaleY = img.height / img.naturalHeight;

        result.detections.forEach((det) => {
          const [x1, y1, x2, y2] = det.bbox;
          const color = det.class === "egg" ? "#FACC15" : "#FB7185";
          ctx.strokeStyle = color;
          ctx.lineWidth = 3;
          ctx.strokeRect(
            x1 * scaleX,
            y1 * scaleY,
            (x2 - x1) * scaleX,
            (y2 - y1) * scaleY
          );
        });
      };

      if (img.complete) draw();
      else img.onload = draw;
    }
  }, [result]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Controls */}
      <div className="lg:col-span-4 space-y-6">
        <div
          className={`p-6 rounded-2xl shadow-sm border transition-colors ${
            darkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          }`}
        >
          <h2 className="text-xl font-bold mb-4">Upload Sample</h2>

          <label
            className={`flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-300 ${
              selectedFile
                ? darkMode
                  ? "border-green-500 bg-green-900/20"
                  : "border-green-500 bg-green-50"
                : darkMode
                ? "border-gray-600 hover:bg-gray-700"
                : "border-gray-300 hover:bg-green-50"
            }`}
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
              {selectedFile ? (
                <p
                  className={`text-sm font-semibold ${
                    darkMode ? "text-green-400" : "text-green-700"
                  }`}
                >
                  {selectedFile.name}
                </p>
              ) : (
                <>
                  <svg
                    className="w-8 h-8 mb-3 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    ></path>
                  </svg>
                  <p className="text-sm text-gray-500">Click to upload</p>
                </>
              )}
            </div>
            <input
              type="file"
              className="hidden"
              onChange={handleFileChange}
              accept="image/*"
            />
          </label>

          {/* SAMPLES ROW */}
          <div className="mt-6">
            <p className="text-xs font-bold text-gray-400 uppercase mb-2">
              Or try a sample:
            </p>
            <div className="grid grid-cols-3 gap-2">
              {SAMPLE_IMAGES.map((sample) => (
                <button
                  key={sample.id}
                  onClick={() => handleSampleSelect(sample.url)}
                  className="relative h-16 rounded-lg overflow-hidden border border-gray-300 hover:border-green-500 hover:ring-2 hover:ring-green-500/50 transition-all"
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
            className={`w-full mt-6 py-4 rounded-xl font-bold text-lg shadow-lg transition-transform transform active:scale-95 text-white flex flex-col items-center justify-center
              ${
                isAnalyzing
                  ? "bg-gray-500 cursor-wait"
                  : "bg-green-600 hover:bg-green-700"
              }
            `}
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
              "Analyze Quality"
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
              : "bg-white border-gray-200"
          }`}
        >
          <div className="flex-grow relative flex items-center justify-center p-6 bg-black/5">
            {previewUrl ? (
              <div className="relative inline-block shadow-2xl rounded-lg overflow-hidden">
                <img
                  ref={imageRef}
                  src={previewUrl}
                  alt="Preview"
                  className="max-w-full max-h-[500px] block"
                />
                <canvas
                  ref={canvasRef}
                  className="absolute top-0 left-0 w-full h-full pointer-events-none"
                />
              </div>
            ) : (
              <div className="text-center opacity-40">
                <p>No image loaded</p>
              </div>
            )}
          </div>
          {result && (
            <div
              className={`p-6 border-t ${
                darkMode
                  ? "bg-gray-900 border-gray-700"
                  : "bg-gray-50 border-gray-100"
              }`}
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-yellow-400/10 border border-yellow-400/20 text-center">
                  <div className="text-3xl font-black text-yellow-600">
                    {result.stats.eggs}
                  </div>
                  <div className="text-xs font-bold uppercase tracking-wider text-yellow-600/70">
                    Insect Eggs
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-red-400/10 border border-red-400/20 text-center">
                  <div className="text-3xl font-black text-red-600">
                    {result.stats.holes}
                  </div>
                  <div className="text-xs font-bold uppercase tracking-wider text-red-600/70">
                    Seed Holes
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

export default SeedInspector;
