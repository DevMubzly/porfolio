"use client";
import { motion } from "motion/react";
import { useEffect, useRef } from "react";

export type Tab = "profile" | "articles" | "projects";

interface FloatingBarProps {
  active: Tab;
  onChange: (t: Tab) => void;
}

const tabs: { key: Tab; label: string }[] = [
  { key: "profile", label: "Profile" },
  { key: "projects", label: "Projects" },
  { key: "articles", label: "Articles" },
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
    <div
      className="fixed inset-y-0 left-30 sm:left-10 lg:left-30 hidden lg:flex md:hidden z-40 items-center pointer-events-none"
      ref={containerRef}
    >
      <div className="flex flex-col gap-2 px-1 py-1.5 rounded-2xl items-stretch text-[9px] sm:text-[10px] font-medium tracking-wide select-none pointer-events-auto bg-transparent">
        <div className="flex flex-col gap-1">
          {tabs.map((t) => {
            const selected = t.key === active;
            return (
              <button
                key={t.key}
                onClick={() => onChange(t.key)}
                className={`relative px-3 py-1.5 rounded-full text-left focus-ring transition-colors ${
                  selected ? "text-black" : "text-black/60 hover:text-black"
                }`}
              >
                {selected && (
                  <motion.span
                    layoutId="floating-bar-pill"
                    className="absolute inset-0 rounded-full -z-10"
                    transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                    style={{
                      background: "linear-gradient(120deg,#fff,#d9d9d9)",
                      boxShadow:
                        "0 4px 18px -6px rgba(0,0,0,0.18), 0 1px 0 0 rgba(255,255,255,0.8) inset",
                      filter: "var(--floating-bar-selected-filter, none)",
                    }}
                  />
                )}
                <span className="relative z-10">{t.label}</span>
              </button>
            );
          })}
        </div>
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
