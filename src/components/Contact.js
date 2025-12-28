import React from "react";

const Contact = ({ darkMode }) => {
  return (
    <div
      className={`max-w-2xl mx-auto ${
        darkMode ? "text-gray-100" : "text-gray-800"
      }`}
    >
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-4">Get in Touch</h1>
        <p className={darkMode ? "text-gray-400" : "text-gray-600"}>
          Have questions about the research or the dataset? Send us a message.
        </p>
      </div>

      <div
        className={`p-8 rounded-2xl border shadow-sm ${
          darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        }`}
      >
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Name</label>
              <input
                type="text"
                className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-green-500 outline-none transition-colors ${
                  darkMode
                    ? "bg-gray-900 border-gray-700 text-white"
                    : "bg-gray-50 border-gray-200"
                }`}
                placeholder="Your Name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-green-500 outline-none transition-colors ${
                  darkMode
                    ? "bg-gray-900 border-gray-700 text-white"
                    : "bg-gray-50 border-gray-200"
                }`}
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Message</label>
            <textarea
              rows="4"
              className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-green-500 outline-none transition-colors ${
                darkMode
                  ? "bg-gray-900 border-gray-700 text-white"
                  : "bg-gray-50 border-gray-200"
              }`}
              placeholder="How can we help?"
            ></textarea>
          </div>

          <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl transition-transform active:scale-95 shadow-lg">
            Send Message
          </button>
        </form>
      </div>

      <div className="mt-8 text-center text-sm opacity-60">
        <p>Email: research@agrivision.edu • Location: VIT Pune, India</p>
      </div>
    </div>
  );
};

export default Contact;
