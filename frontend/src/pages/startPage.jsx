import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function StartPage() {
  const navigate = useNavigate();

  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      return (
        localStorage.getItem("theme") === "dark" ||
        (!("theme" in localStorage) &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
      );
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
    <div
      className="
        min-h-screen relative overflow-hidden transition-colors duration-500
        bg-gray-100 text-gray-900
        dark:bg-gradient-to-br dark:from-[#0b1220] dark:via-[#111827] dark:to-black dark:text-slate-300
      "
    >
      {/* Ambient Glow */}
      <div className="absolute -top-32 -left-32 w-[28rem] h-[28rem] bg-indigo-500/20 blur-[140px] rounded-full hidden dark:block" />
      <div className="absolute -bottom-32 -right-32 w-[28rem] h-[28rem] bg-purple-500/20 blur-[140px] rounded-full hidden dark:block" />

      {/* Theme Toggle */}
      <button
        onClick={() => setIsDark(!isDark)}
        className="
          fixed top-6 right-6 z-50
          text-gray-700 dark:text-yellow-400
          transition-transform hover:scale-110 active:scale-95
        "
        aria-label="Toggle theme"
      >
        {isDark ? "☀️" : "🌙"}
      </button>

      {/* HERO */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-6">
        <div
          className="
            relative max-w-4xl w-full p-[2px] rounded-[3rem]
            bg-gradient-to-br
            from-indigo-400 via-blue-400 to-purple-400
            dark:from-indigo-600 dark:via-blue-600 dark:to-purple-700
            shadow-2xl
          "
        >
          {/* Inner Capsule */}
          <div
            className="
              rounded-[3rem] px-10 sm:px-16 py-24 text-center
              bg-white/80 backdrop-blur-2xl
              dark:bg-slate-900/80
            "
          >
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-gray-900 dark:text-white">
              Welcome to{" "}
              <span
                className="
                  text-transparent bg-clip-text
                  bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600
                  dark:from-indigo-400 dark:via-blue-400 dark:to-purple-400
                "
              >
                Blogify
              </span>
            </h1>

            <p className="text-lg md:text-xl max-w-2xl mx-auto mb-14 leading-relaxed text-gray-600 dark:text-slate-400">
              A calm, modern place to write your thoughts, explore ideas,
              and share your stories with the world.
            </p>

            <button
              onClick={() => navigate("/login")}
              className="
                inline-flex items-center justify-center
                px-12 py-4 rounded-full
                text-white font-semibold text-lg
                bg-gradient-to-r from-indigo-600 to-purple-600
                hover:from-indigo-500 hover:to-purple-500
                transition-all duration-300
                shadow-lg hover:shadow-indigo-500/40
                hover:scale-105 active:scale-95
              "
            >
              Start Writing ✍️
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
