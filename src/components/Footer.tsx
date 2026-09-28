"use client";

import { motion } from "motion/react";

export function Footer() {
  return (
    <footer className="px-6 lg:px-24 pb-8">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs text-[var(--text-muted)] font-medium">
            Built by Mubarak ☁️
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
