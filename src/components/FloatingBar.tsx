"use client";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

type Tab = "info" | "projects";

interface FloatingBarProps {
  active: Tab;
  onChange: (t: Tab) => void;
}

const tabs: { key: Tab; label: string; }[] = [
  { key: "info", label: "Info" },
  { key: "projects", label: "Projects" },
];

export function FloatingBar({ active, onChange }: FloatingBarProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const setVar = () => {
      if (containerRef.current) {
        const w = containerRef.current.offsetWidth;
        document.documentElement.style.setProperty("--floating-bar-width", w + "px");
      }
    };
    setVar();
    window.addEventListener("resize", setVar);
    return () => window.removeEventListener("resize", setVar);
  }, []);
  return (
    <div className="fixed top-6 right-6 z-40" ref={containerRef}>
  <div className="glass border-gradient flex gap-2 px-3 py-2 rounded-full items-center text-[11px] sm:text-sm font-medium tracking-wide shadow-lg select-none">
        {tabs.map(t => {
          const selected = t.key === active;
          return (
            <button
              key={t.key}
              onClick={() => onChange(t.key)}
              className={`relative px-4 py-2 rounded-full focus-ring transition-colors ${selected ? "text-black" : "text-black/60 hover:text-black"}`}
            >
              {selected && (
                <motion.span
                  layoutId="floating-bar-pill"
                  className="absolute inset-0 rounded-full -z-10"
                  transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                  style={{
                    background: "linear-gradient(120deg,#fff,#d9d9d9)",
                    boxShadow: "0 4px 18px -6px rgba(0,0,0,0.18), 0 1px 0 0 rgba(255,255,255,0.8) inset",
                    filter: "var(--floating-bar-selected-filter, none)"
                  }}
                />
              )}
              {t.label}
            </button>
          );
        })}
      </div>
      <style jsx>{`
        :global(html.dark [layoutid='floating-bar-pill']), :global(html.dark span[layoutid='floating-bar-pill']) {
          background: linear-gradient(120deg,#3a4349,#2d3439 55%,#252b30);
          box-shadow: 0 4px 20px -6px rgba(0,0,0,0.6),0 1px 0 0 rgba(255,255,255,0.07) inset,0 0 0 1px rgba(255,255,255,0.05) inset;
        }
      `}</style>
    </div>
  );
}
