import React, { useEffect, useRef } from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// --- DATA ---
const guides = [
  {
    name: "Dr. Abhinandan S. Patil",
    role: "Research Mentor at ARI", // Updated Role
    image: "images/team/abhinandanpatil.png",
    bio: "Plant Breeder & Geneticist. Previously worked with IRRI (Philippines), PGBI, CALS, SNU (South Korea), and ARO-Volcani Center (Israel).",
    socials: { email: "mailto:example@ari.res.in" },
  },
  {
    name: "Prof. Sayali Shinde",
    role: "Guide at VIT Pune",
    image: "images/team/sayalishinde.png",
    bio: "Expert guidance in project architecture and research methodologies.",
    socials: { email: "mailto:example@vit.edu" },
  },
  {
    name: "Prof. Mandar Diwakar",
    role: "Guide at VIT Pune",
    image: "images/team/mandardiwakar.png",
    bio: "Specialized support in technical implementation and development strategy.",
    socials: { email: "mailto:example@vit.edu" },
  },
];

const developers = [
  {
    name: "Sail Nagale",
    role: "Full Stack Developer & AI Researcher",
    image: "images/team/sail.png",
    // Rewritten to sound more expert/professional
    bio: "AI Researcher specializing in Deep Learning and Computer Vision. Agricultural AI solutions with expertise in scalable full-stack architectures.",
    socials: {
      github: "https://github.com/Sailnagale",
      linkedin: "https://www.linkedin.com/in/sail-nagale-4891a5321/",
      email: "mailto:sail.nagale24@vit.edu",
    },
  },
  {
    name: "Aditya Mane",
    role: "Backend Developer & System Architect",
    image: "images/team/aditya.jpeg",
    bio: "Passionate developer focused on scalable backend architectures, database optimization, and cloud infrastructure.",
    socials: {
      github: "https://github.com/",
      linkedin: "https://linkedin.com/",
      email: "mailto:aditya@example.com",
    },
  },
];

// --- COMPONENT ---
export default function Developers({ darkMode }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".team-col", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className={`py-20 border-t transition-colors duration-300 ${
        darkMode
          ? "bg-black text-white border-gray-900"
          : "bg-slate-50 text-gray-900 border-gray-200"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Title */}
        <div className="text-center mb-16">
          <h2
            className={`text-4xl md:text-5xl font-bold mb-4 ${
              darkMode ? "text-white" : "text-gray-800"
            }`}
          >
            Meet the Team
          </h2>
          <p
            className={`max-w-2xl mx-auto ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Collaboration between research excellence and engineering
            innovation.
          </p>
        </div>

        {/* Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Mentors */}
          <div className="team-col">
            <h3 className="text-2xl font-bold mb-8 text-green-600 flex items-center justify-center lg:justify-start">
              <span className="mr-2">🌱</span> Research Mentors
            </h3>
            <div className="space-y-6">
              {guides.map((guide, index) => (
                <HorizontalCard
                  key={index}
                  data={guide}
                  theme="green"
                  darkMode={darkMode}
                />
              ))}
            </div>
          </div>

          {/* Interns & Developers */}
          <div className="team-col">
            {/* Updated Header */}
            <h3 className="text-2xl font-bold mb-8 text-cyan-600 flex items-center justify-center lg:justify-start">
              <span className="mr-2">💻</span> Interns & Developers
            </h3>
            <div className="space-y-6">
              {developers.map((dev, index) => (
                <HorizontalCard
                  key={index}
                  data={dev}
                  theme="cyan"
                  darkMode={darkMode}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// --- CARD COMPONENT ---
const HorizontalCard = ({ data, theme, darkMode }) => {
  const isGreen = theme === "green";

  // Dynamic Styles based on Theme & Dark Mode
  const cardBg = darkMode
    ? "bg-gray-900 border-gray-800 hover:bg-gray-800"
    : "bg-white border-gray-200 shadow-sm hover:shadow-md hover:border-gray-300";

  const nameColor = darkMode ? "text-white" : "text-gray-900";
  const roleColor = isGreen ? "text-green-600" : "text-cyan-600";
  const descColor = darkMode ? "text-gray-400" : "text-gray-600";

  const glowColor = isGreen ? "bg-green-500" : "bg-cyan-500";
  const borderColor = isGreen
    ? darkMode
      ? "group-hover:border-green-500"
      : "group-hover:border-green-400"
    : darkMode
    ? "group-hover:border-cyan-500"
    : "group-hover:border-cyan-400";

  return (
    <div
      className={`group relative border rounded-xl p-5 flex flex-col sm:flex-row items-center sm:items-start gap-5 transition-all duration-300 ${cardBg} ${borderColor}`}
    >
      {/* Image */}
      <div className="relative flex-shrink-0">
        <div
          className={`absolute inset-0 ${glowColor} rounded-full blur opacity-10 group-hover:opacity-30 transition-opacity duration-300`}
        />
        <img
          src={data.image}
          alt={data.name}
          className={`relative w-24 h-24 rounded-full object-cover border-2 transition-colors duration-300 z-10 ${
            darkMode ? "border-gray-700" : "border-gray-100"
          }`}
        />
      </div>

      {/* Content */}
      <div className="text-center sm:text-left flex-grow">
        <h4
          className={`text-lg font-bold transition-colors ${nameColor} group-hover:${roleColor}`}
        >
          {data.name}
        </h4>
        <p
          className={`text-xs font-bold uppercase tracking-wide mb-2 ${roleColor}`}
        >
          {data.role}
        </p>
        <p className={`text-sm leading-relaxed mb-3 ${descColor}`}>
          {data.bio}
        </p>

        {/* Social Icons */}
        <div className="flex justify-center sm:justify-start space-x-3">
          {data.socials.github && (
            <a
              href={data.socials.github}
              target="_blank"
              rel="noreferrer"
              className={`transition-colors ${
                darkMode
                  ? "text-gray-500 hover:text-white"
                  : "text-gray-400 hover:text-gray-900"
              }`}
            >
              <FaGithub size={18} />
            </a>
          )}
          {data.socials.linkedin && (
            <a
              href={data.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              className={`transition-colors ${
                darkMode
                  ? "text-gray-500 hover:text-blue-400"
                  : "text-gray-400 hover:text-blue-600"
              }`}
            >
              <FaLinkedin size={18} />
            </a>
          )}
          {data.socials.email && (
            <a
              href={data.socials.email}
              className={`transition-colors ${
                darkMode
                  ? "text-gray-500 hover:text-red-400"
                  : "text-gray-400 hover:text-red-600"
              }`}
            >
              <FaEnvelope size={18} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
