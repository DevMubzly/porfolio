"use client";

import { motion } from "motion/react";
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
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });
  const navRef = useRef<HTMLDivElement>(null);
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
    const updateIndicator = () => {
      if (!navRef.current) return;
      const nav = navRef.current;
      const links = nav.querySelectorAll("a, button");
      const allItems = Array.from(links).filter((el) => {
        const text = el.textContent?.trim();
        return navItems.some((item) => item.label === text);
      });

      const activeItem = allItems.find((el) => {
        const text = el.textContent?.trim();
        const item = navItems.find((i) => i.label === text);
        if (!item) return false;
        if (item.href.startsWith("#")) {
          return activeSection === item.href.slice(1) && pathname === "/";
        }
        return pathname === item.href;
      });

      if (activeItem) {
        const navRect = nav.getBoundingClientRect();
        const itemRect = activeItem.getBoundingClientRect();
        setIndicator({
          left: itemRect.left - navRect.left,
          width: itemRect.width,
        });
      }
    };

    updateIndicator();
    window.addEventListener("resize", updateIndicator);
    return () => window.removeEventListener("resize", updateIndicator);
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
        ref={navRef}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative flex items-center gap-1 p-1.5 rounded-full border border-[var(--border)] bg-[var(--bg-secondary)]/80 backdrop-blur-xl shadow-lg shadow-black/5 max-w-full overflow-x-auto"
      >
        {indicator.width > 0 && (
          <motion.div
            className="absolute top-1.5 bottom-1.5 rounded-full bg-[var(--text-primary)]"
            initial={false}
            animate={{
              left: indicator.left,
              width: indicator.width,
            }}
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
          />
        )}
        {navItems.map((item) => {
          const isActive = item.href.startsWith("#")
            ? activeSection === item.href.slice(1) && pathname === "/"
            : pathname === item.href;

          const classes = `relative px-3 sm:px-4 py-2 rounded-full transition-colors duration-200 whitespace-nowrap ${
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
        <div className="w-px h-5 bg-[var(--border)] mx-1 flex-shrink-0" />
        <div className="flex-shrink-0">
          <ThemeSwitcher />
        </div>
      </motion.nav>
    </div>
  );
}
