import React from "react";
import { logout } from "../firebase";

const Profile = ({ user, darkMode }) => {
  if (!user) return null;

  // Format dates from Firebase metadata
  const joinDate = new Date(user.metadata.creationTime).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  const lastLogin = new Date(user.metadata.lastSignInTime).toLocaleDateString(
    "en-US",
    {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
  );

  return (
    <div className="max-w-4xl mx-auto animate-fade-in-up">
      {/* 1. Header Card */}
      <div
        className={`relative overflow-hidden rounded-3xl shadow-xl mb-8 ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        {/* Banner Background */}
        <div className="h-32 bg-gradient-to-r from-green-500 to-emerald-700"></div>

        <div className="px-8 pb-8">
          <div className="relative flex flex-col md:flex-row items-center md:items-end -mt-12 mb-6 gap-6">
            {/* Profile Image */}
            <div className="relative">
              <div
                className={`rounded-full p-1 ${
                  darkMode ? "bg-gray-800" : "bg-white"
                }`}
              >
                <img
                  src={user.photoURL}
                  alt={user.displayName}
                  className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-transparent"
                />
              </div>
              <div
                className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 border-4 border-white dark:border-gray-800 rounded-full"
                title="Online"
              ></div>
            </div>

            {/* Name & Email */}
            <div className="text-center md:text-left flex-1">
              <h1
                className={`text-3xl font-bold ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                {user.displayName}
              </h1>
              <p
                className={`text-lg ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {user.email}
              </p>
            </div>

            {/* Action Buttons */}
            <button
              onClick={logout}
              className="px-6 py-2 bg-red-50 text-red-600 font-bold rounded-full hover:bg-red-100 transition-colors border border-red-200"
            >
              Sign Out
            </button>
          </div>

          {/* User Meta Details */}
          <div
            className={`grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-xl border ${
              darkMode
                ? "bg-gray-900/50 border-gray-700"
                : "bg-gray-50 border-gray-100"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
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
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  ></path>
                </svg>
              </div>
              <div>
                <p
                  className={`text-xs uppercase font-bold ${
                    darkMode ? "text-gray-500" : "text-gray-400"
                  }`}
                >
                  Member Since
                </p>
                <p
                  className={`font-medium ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  {joinDate}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
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
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </div>
              <div>
                <p
                  className={`text-xs uppercase font-bold ${
                    darkMode ? "text-gray-500" : "text-gray-400"
                  }`}
                >
                  Last Login
                </p>
                <p
                  className={`font-medium ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  {lastLogin}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Stats / History Placeholder */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          label="Total Scans"
          value="0"
          icon="📸"
          color="bg-blue-500"
          darkMode={darkMode}
        />
        <StatCard
          label="Issues Found"
          value="0"
          icon="🐛"
          color="bg-orange-500"
          darkMode={darkMode}
        />
        <StatCard
          label="Contribution Score"
          value="Beta"
          icon="⭐"
          color="bg-yellow-500"
          darkMode={darkMode}
        />
      </div>

      <div
        className={`mt-8 p-8 rounded-2xl border text-center ${
          darkMode ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-white"
        }`}
      >
        <h3
          className={`text-xl font-bold mb-2 ${
            darkMode ? "text-white" : "text-gray-800"
          }`}
        >
          Scan History
        </h3>
        <p className={darkMode ? "text-gray-400" : "text-gray-500"}>
          Your recent analysis history will appear here once you start using the
          tools.
        </p>
      </div>
    </div>
  );
};

// Helper Component for Stats
const StatCard = ({ label, value, icon, color, darkMode }) => (
  <div
    className={`p-6 rounded-2xl shadow-lg border transition-transform hover:-translate-y-1 ${
      darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"
    }`}
  >
    <div className="flex items-center justify-between mb-4">
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl text-white shadow-md ${color}`}
      >
        {icon}
      </div>
    </div>
    <h3
      className={`text-3xl font-bold mb-1 ${
        darkMode ? "text-white" : "text-gray-800"
      }`}
    >
      {value}
    </h3>
    <p
      className={`text-sm font-medium ${
        darkMode ? "text-gray-400" : "text-gray-500"
      }`}
    >
      {label}
    </p>
  </div>
);

export default Profile;
