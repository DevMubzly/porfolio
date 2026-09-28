"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ThemeSwitcher } from "./ThemeSwitcher";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Projects", href: "#projects" },
  { label: "Articles", href: "#articles" },
  { label: "Contact", href: "#contact" },
  { label: "CV", href: "/cv" },
];

export function Header() {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const id = href.slice(1);
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex items-center gap-1 p-1.5 rounded-full border border-[var(--border)] bg-[var(--bg-secondary)]/80 backdrop-blur-xl shadow-lg shadow-black/5 max-w-full overflow-x-auto"
      >
        {navItems.map((item) => {
          const classes = "relative px-3 sm:px-4 py-2 rounded-full whitespace-nowrap text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200";

          if (item.href.startsWith("#")) {
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleClick(e, item.href)}
                className={classes}
              >
                {item.label}
              </a>
            );
          }

          return (
            <Link key={item.href} href={item.href} className={classes}>
              {item.label}
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
