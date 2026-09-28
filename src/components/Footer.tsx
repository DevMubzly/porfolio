"use client";

import { motion } from "motion/react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="py-8 px-6 lg:px-24 border-t border-[var(--border)]">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4"
      >
        <p className="text-xs text-[var(--text-muted)] font-medium">
          © {new Date().getFullYear()} Balinda Mubarak
        </p>
        <Link
          href="/cv.html"
          target="_blank"
          className="text-xs text-[var(--text-secondary)] font-medium hover:text-[var(--text-primary)] transition-colors link-underline"
        >
          View CV
        </Link>
      </motion.div>
    </footer>
  );
}
