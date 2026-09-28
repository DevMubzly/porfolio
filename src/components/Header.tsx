"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeSwitcher } from "./ThemeSwitcher";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Experiences", href: "/experiences" },
  { label: "CV", href: "/cv" },
];

export function Header() {
  const pathname = usePathname();

  return (
    <div className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex items-center gap-1 p-1.5 rounded-full border border-[var(--border)] bg-[var(--bg-secondary)]/80 backdrop-blur-xl shadow-lg shadow-black/5"
      >
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href} className="relative px-4 py-2">
              {isActive && (
                <motion.div
                  layoutId="nav-active"
                  className="absolute inset-0 rounded-full bg-[var(--text-primary)]"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span
                className={`relative z-10 text-xs font-medium transition-colors duration-200 ${
                  isActive ? "text-[var(--bg)]" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
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
