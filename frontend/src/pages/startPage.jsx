import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Orb from "../components/Orb/Orb";

export default function StartPage() {
  const navigate = useNavigate();

  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme) return savedTheme === "dark";
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return true;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  
  return (
    <div className="min-h-screen relative overflow-hidden transition-all duration-700 bg-white dark:bg-black font-['Inter',_sans-serif]">

      <style>
        {`
          .glass-card {
            background: rgba(255, 255, 255, 0.4);
            backdrop-filter: blur(24px);
            -webkit-backdrop-filter: blur(24px);
            border: 1px solid rgba(255, 255, 255, 0.5);
            box-shadow: 0 40px 100px -20px rgba(0, 0, 0, 0.1);
            position: relative;
            z-index: 10;
            overflow: hidden;
          }
       .dark .glass-card {
  background: #000000;   /* full black */
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 0 80px rgba(0, 0, 0, 0.9);
}
        `}
      </style>

      {/* Theme Toggle */}
      <button
        onClick={() => setIsDark(!isDark)}
        className="fixed top-8 right-8 z-50 w-11 h-11 rounded-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-xl border border-slate-100 dark:border-gray-800 flex items-center justify-center text-slate-600 dark:text-gray-400 hover:text-blue-500 transition-all hover:rotate-12 active:scale-95"
      >
        {isDark ? <i className="bi bi-sun-fill text-xl"></i> : <i className="bi bi-moon-stars-fill text-xl"></i>}
      </button>

      <section className="relative z-20 min-h-screen flex items-center justify-center px-6">
        <div className="max-w-4xl w-full py-12">
          {/* Central Glass Card */}
          <div className="glass-card rounded-[3.5rem] p-8 md:p-16 min-h-[420px] flex flex-col items-center justify-center text-center relative group">

            {/* Visual Effect: Orb moved inside and scaled for full coverage */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-90 scale-[2.2] flex items-center justify-center">
              <Orb
                hoverIntensity={2}
                rotateOnHover
                hue={0}
                forceHoverState={false}
                backgroundColor={isDark ? "#000000" : "#ffffff"}
              />
            </div>

            <div className="relative z-10">
              <h1 className="font-['Outfit',_sans-serif] text-5xl md:text-7xl font-black mb-6 tracking-tighter text-slate-900 dark:text-white leading-[0.95]">
                <span className="dark:text-white">Documenting</span> <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 drop-shadow-sm">your legacy.</span>
              </h1>

              <p className="text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed text-slate-600 dark:text-white font-medium font-['Inter',_sans-serif]">
                A minimalist, real-time collaborative workspace designed for high-performance storytelling and digital archiving.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <button
                  onClick={() => navigate("/login")}
                  className="group relative px-6 py-2.5 rounded-xl bg-slate-900 dark:bg-blue-600 text-white text-[9px] font-black uppercase tracking-[0.2em] shadow-xl hover:shadow-blue-500/30 hover:-translate-y-0.5 transition-all active:scale-95 overflow-hidden w-full sm:w-auto font-['Inter',_sans-serif]"
                >
                  <div className="relative z-10 flex items-center gap-3">
                    Start Creating
                    <i className="bi bi-arrow-right-short text-xl transition-transform group-hover:translate-x-1"></i>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}