"use client";

import { motion } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function SidePanel() {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    if (pathname !== "/") return;

    const handleScroll = () => {
      const sections = ["home", "about", "projects", "articles", "contact"];
      const scrollPosition = window.scrollY + 120;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            return;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed left-10 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-start gap-6">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="space-y-1"
      >
        <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider">Currently</p>
        <p className="text-xs text-[var(--text-secondary)] max-w-[140px] leading-relaxed">
          Building{" "}
          <a
            href="https://salastores.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--text-primary)] underline decoration-[var(--text-muted)] underline-offset-2 hover:decoration-[var(--text-primary)] transition-colors"
          >
            salastores.com
          </a>
        </p>
      </motion.div>

      <div className="w-px h-8 bg-[var(--border)]" />

      <nav className="flex flex-col gap-3">
        {["home", "projects", "articles", "contact"].map((section) => {
          const isActive = activeSection === section && pathname === "/";
          return (
            <button
              key={section}
              onClick={() => scrollToSection(section)}
              className="flex items-center gap-2 group text-left"
            >
              <div
                className={`w-1.5 h-1.5 rounded-full transition-colors ${
                  isActive ? "bg-[var(--text-primary)]" : "bg-[var(--border-strong)] group-hover:bg-[var(--text-muted)]"
                }`}
              />
              <span
                className={`text-xs capitalize transition-colors ${
                  isActive ? "text-[var(--text-primary)]" : "text-[var(--text-muted)] group-hover:text-[var(--text-secondary)]"
                }`}
              >
                {section}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
