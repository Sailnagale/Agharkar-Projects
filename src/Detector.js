import React, { useState, useRef, useEffect } from "react";

const Detector = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  // Refs for drawing
  const imageRef = useRef(null);
  const canvasRef = useRef(null);

  const API_URL = "https://sail-nagale-yolo-backend.hf.space/detect";

  // 1. Handle File Select
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setResult(null); // Clear previous results
      setError(null);
    }
  };

  // 2. Main Analysis Function
  const handleAnalyzeClick = async () => {
    if (!selectedFile) return;

    setIsAnalyzing(true);
    setError(null);

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Server Error: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Backend Data:", data);

      // Extract detections
      const detections = data.detections || [];
      const eggCount = detections.filter((item) => item.class === "egg").length;
      const holeCount = detections.filter(
        (item) => item.class === "hole"
      ).length;

      setResult({
        detections: detections, // Save full list for drawing
        stats: {
          eggs: eggCount,
          holes: holeCount,
        },
      });
    } catch (err) {
      console.error("Analysis Failed:", err);
      setError("Failed to connect. Check console.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  // 3. DRAW BOXES (Runs whenever 'result' changes)
  useEffect(() => {
    if (result && imageRef.current && canvasRef.current) {
      const img = imageRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      // 1. Match Canvas Size to Displayed Image Size
      canvas.width = img.width;
      canvas.height = img.height;

      // 2. Calculate Scale (Displayed Size / Original Size)
      // Note: We need naturalWidth to know the real image size the server saw
      const scaleX = img.width / img.naturalWidth;
      const scaleY = img.height / img.naturalHeight;

      // 3. Loop and Draw
      result.detections.forEach((det) => {
        const [x1, y1, x2, y2] = det.bbox; // [minX, minY, maxX, maxY]

        // Scale coordinates to fit the screen
        const rectX = x1 * scaleX;
        const rectY = y1 * scaleY;
        const rectW = (x2 - x1) * scaleX;
        const rectH = (y2 - y1) * scaleY;

        // Pick Color: Yellow for Eggs, Red for Holes
        const color = det.class === "egg" ? "#FACC15" : "#FB7185"; // Tailwind yellow-400 : rose-400

        // Draw Box
        ctx.strokeStyle = color;
        ctx.lineWidth = 3;
        ctx.strokeRect(rectX, rectY, rectW, rectH);

        // Draw Label Background
        ctx.fillStyle = color;
        ctx.fillRect(rectX, rectY - 20, det.class.length * 10 + 10, 20);

        // Draw Text
        ctx.fillStyle = "black";
        ctx.font = "bold 12px sans-serif";
        ctx.fillText(det.class.toUpperCase(), rectX + 5, rectY - 5);
      });
    }
  }, [result]); // Runs when 'result' updates

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 font-sans text-gray-800">
      {/* NAVBAR */}
      <nav className="bg-green-700 text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-3">
              <span className="text-xl font-bold tracking-wide">
                AgriVision AI
              </span>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-grow w-full max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT: Controls */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Upload Sample
              </h2>

              <label
                className={`flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-xl cursor-pointer transition-all ${
                  selectedFile
                    ? "border-green-400 bg-green-50"
                    : "border-gray-300"
                }`}
              >
                <div className="text-center px-4">
                  <p className="text-sm font-semibold text-gray-600">
                    {selectedFile ? selectedFile.name : "Click to upload"}
                  </p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                  accept="image/*"
                />
              </label>

              {error && (
                <div className="mt-4 text-red-600 text-sm bg-red-50 p-2 rounded">
                  {error}
                </div>
              )}

              <button
                onClick={handleAnalyzeClick}
                disabled={!selectedFile || isAnalyzing}
                className={`w-full mt-6 py-3 rounded-xl text-white font-bold shadow-md transition-all ${
                  isAnalyzing
                    ? "bg-gray-400"
                    : "bg-green-600 hover:bg-green-700"
                }`}
              >
                {isAnalyzing ? "Processing..." : "Analyze Quality"}
              </button>
            </div>
          </div>

          {/* RIGHT: Results */}
          <div className="lg:col-span-8 space-y-6">
            {/* 1. METRICS DASHBOARD (Moved to TOP) */}
            {result && (
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-200 text-center">
                  <div className="text-yellow-700 text-xs font-bold uppercase">
                    Insect Eggs
                  </div>
                  <div className="text-3xl font-extrabold text-gray-900">
                    {result.stats.eggs}
                  </div>
                </div>
                <div className="bg-red-50 p-4 rounded-xl border border-red-200 text-center">
                  <div className="text-red-700 text-xs font-bold uppercase">
                    Seed Holes
                  </div>
                  <div className="text-3xl font-extrabold text-gray-900">
                    {result.stats.holes}
                  </div>
                </div>
              </div>
            )}

            {/* 2. IMAGE VISUALIZER */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 min-h-[500px] flex items-center justify-center relative overflow-hidden">
              {!previewUrl ? (
                <p className="text-gray-400">Image preview area</p>
              ) : (
                <div className="relative inline-block">
                  {/* ORIGINAL IMAGE */}
                  <img
                    ref={imageRef}
                    src={previewUrl}
                    alt="Analysis Target"
                    // Important: We wait for image to load to draw boxes
                    onLoad={() => {
                      if (result) setIsAnalyzing(false);
                    }}
                    className="max-w-full max-h-[600px] block"
                  />

                  {/* CANVAS OVERLAY (This draws the boxes) */}
                  <canvas
                    ref={canvasRef}
                    className="absolute top-0 left-0 w-full h-full pointer-events-none"
                  />

                  {/* Loading Spinner Overlay */}
                  {isAnalyzing && (
                    <div className="absolute inset-0 bg-white/50 flex items-center justify-center backdrop-blur-sm">
                      <div className="w-10 h-10 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Detector;
