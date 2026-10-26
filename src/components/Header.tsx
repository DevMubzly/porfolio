"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { scrollToId } from "@/lib/scroll";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Work", href: "#work" },
  { label: "Projects", href: "#projects" },
  { label: "Articles", href: "#articles" },
  { label: "Contact", href: "#contact" },
  { label: "CV", href: "/cv" },
];

const pillLink = "relative px-2.5 sm:px-3 py-2 rounded-full whitespace-nowrap text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200";

export function Header() {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const id = href.slice(1);

      if (pathname !== "/") {
        router.push(`/#${id}`);
        return;
      }

      scrollToId(id);
    }
  };

  const renderItem = (navItem: (typeof navItems)[number], classes: string) =>
    navItem.href.startsWith("#") ? (
      <a key={navItem.href} href={navItem.href} onClick={(e) => handleClick(e, navItem.href)} className={classes}>
        {navItem.label}
      </a>
    ) : (
      <Link key={navItem.href} href={navItem.href} className={classes}>
        {navItem.label}
      </Link>
    );

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50 flex items-center gap-0.5 p-1 rounded-full border border-[var(--border)] bg-[var(--bg-secondary)]/80 backdrop-blur-xl max-w-[calc(100vw-2rem)] overflow-x-auto print:hidden"
    >
      {navItems.map((navItem) => renderItem(navItem, pillLink))}
      <div className="w-px h-5 bg-[var(--border)] mx-1 flex-shrink-0" />
      <div className="flex-shrink-0">
        <ThemeSwitcher />
      </div>
    </motion.nav>
  );
}
