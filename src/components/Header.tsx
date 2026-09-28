"use client";

import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { useEffect, useState, useCallback, useRef } from "react";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Articles", href: "#articles" },
  { label: "Contact", href: "#contact" },
  { label: "CV", href: "/cv" },
];

export function Header() {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState("home");
  const [activeIndex, setActiveIndex] = useState(-1);
  const isScrolling = useRef(false);

  useEffect(() => {
    if (pathname !== "/") return;

    const handleScroll = () => {
      if (isScrolling.current) return;
      isScrolling.current = true;

      requestAnimationFrame(() => {
        const sections = ["home", "about", "projects", "articles", "contact"];
        const scrollPosition = window.scrollY + 120;

        for (const section of sections) {
          const element = document.getElementById(section);
          if (element) {
            const { offsetTop, offsetHeight } = element;
            if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
              setActiveSection(section);
              break;
            }
          }
        }
        isScrolling.current = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  useEffect(() => {
    const idx = navItems.findIndex((item) => {
      if (item.href.startsWith("#")) {
        return activeSection === item.href.slice(1) && pathname === "/";
      }
      return pathname === item.href;
    });
    setActiveIndex(idx);
  }, [activeSection, pathname]);

  const handleClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const id = href.slice(1);
      setActiveSection(id);
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);

  return (
    <div className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative flex items-center gap-1 p-1.5 rounded-full border border-[var(--border)] bg-[var(--bg-secondary)]/80 backdrop-blur-xl shadow-lg shadow-black/5"
      >
        {activeIndex >= 0 && (
          <motion.div
            className="absolute top-1.5 bottom-1.5 rounded-full bg-[var(--text-primary)]"
            initial={false}
            animate={{
              left: `${activeIndex * 64 + 6}px`,
              width: "52px",
            }}
            transition={{ type: "spring", stiffness: 400, damping: 32, mass: 0.6 }}
          />
        )}
        {navItems.map((item) => {
          const isActive = item.href.startsWith("#")
            ? activeSection === item.href.slice(1) && pathname === "/"
            : pathname === item.href;

          const classes = `relative px-4 py-2 rounded-full transition-colors duration-200 ${
            isActive
              ? "text-[var(--bg)]"
              : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
          }`;

          if (item.href.startsWith("#")) {
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleClick(e, item.href)}
                className={classes}
              >
                <span className="relative z-10 text-xs font-medium">
                  {item.label}
                </span>
              </a>
            );
          }

          return (
            <Link key={item.href} href={item.href} className={classes}>
              <span className="relative z-10 text-xs font-medium">
                {item.label}
              </span>
            </Link>
          );
        })}
        <div className="w-px h-5 bg-[var(--border)] mx-1" />
        <ThemeSwitcher />
      </motion.nav>
    </div>
  );
}
