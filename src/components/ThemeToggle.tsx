"use client";
import { useEffect, useState } from "react";

// Simple theme persistence key
const STORAGE_KEY = "theme-preference";

type Theme = "light" | "dark";

// Always start light unless user previously picked dark
function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "light";
  const stored = window.localStorage.getItem(STORAGE_KEY) as Theme | null;
  if (stored === 'dark') return 'dark';
  return 'light';
}

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<Theme>(() => getInitialTheme());

  // Apply theme class to <html>
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    try { window.localStorage.setItem(STORAGE_KEY, theme); } catch {}
  }, [theme]);

  // Avoid hydration mismatch by delaying icon render until mounted
  useEffect(() => setMounted(true), []);

  function toggle() {
    setTheme(t => (t === "dark" ? "light" : "dark"));
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Activate light mode" : "Activate dark mode"}
      className={`group relative inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium border-gradient focus-ring glass ${className}`}
    >
      {/* Icon container */}
      <span className="relative flex h-5 w-5 items-center justify-center">
        {mounted && (
          <>
            {/* Sun */}
            <svg
              className={`absolute h-5 w-5 transition-all duration-500 ${isDark ? "scale-0 rotate-90 opacity-0" : "scale-100 rotate-0 opacity-100"}`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2m-3.65-7.07-1.42 1.42M6.35 17.65l-1.42 1.42" />
            </svg>
            {/* Moon */}
            <svg
              className={`absolute h-5 w-5 transition-all duration-500 ${isDark ? "scale-100 rotate-0 opacity-100" : "scale-0 -rotate-90 opacity-0"}`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 12.79A9 9 0 0 1 11.21 3 7 7 0 1 0 21 12.79Z" />
            </svg>
          </>
        )}
      </span>
      <span className="relative">
        {mounted ? (isDark ? "Dark" : "Light") : <span className="opacity-0">Mode</span>}
      </span>
      {/* Animated underline flare */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-full"
      >
        <span
          className={`absolute inset-0 rounded-full opacity-0 transition-opacity duration-700 group-hover:opacity-100 ${isDark ? "bg-gradient-to-r from-slate-600/40 via-slate-400/20 to-slate-600/40" : "bg-gradient-to-r from-zinc-200/60 via-white/40 to-zinc-200/60"}`}
        />
      </span>
    </button>
  );
}
