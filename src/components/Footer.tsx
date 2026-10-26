"use client";

import { motion } from "motion/react";
import { SocialIcons } from "./SocialIcons";

export function Footer() {
  return (
    <footer className="px-6 lg:px-24 pb-8">
      <div className="max-w-[52rem] mx-auto text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-4"
        >
          <p className="text-xs text-[var(--text-muted)] font-medium">
            Built by Mubarak ☁️
          </p>
          <div className="flex justify-center">
            <SocialIcons compact />
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
