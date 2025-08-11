"use client";
import { useState } from "react";
import { FloatingBar } from "@/components/FloatingBar";
import { InfoSection } from "@/components/InfoSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [active, setActive] = useState<"info" | "projects">("info");

  const handleChange = (tab: "info" | "projects") => setActive(tab);

  return (
    <main className="relative">
      <FloatingBar active={active} onChange={handleChange} />
      <AnimatePresence mode="wait">
        <motion.div
          key="sections"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          {active === "info" && (
            <motion.div
              key="info"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
            >
              <InfoSection />
            </motion.div>
          )}
          {active === "projects" && (
            <motion.div
              key="projects"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
            >
              <ProjectsSection />
            </motion.div>
          )}
          <footer className="max-w-6xl mx-auto px-6 pb-16 text-xs text-neutral-500 flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
            <div>© {new Date().getFullYear()} Balinda Mubarak</div>
            <div className="flex gap-5 font-medium">
              <a href="https://github.com/DevMubzly" className="hover:underline">GitHub</a>
              <a href="https://www.X.com/TtnlxMubz/" className="hover:underline">Twitter</a>
              <a href="mailto:bmubs15@gmail.com" className="hover:underline">Email</a>
            </div>
          </footer>
        </motion.div>
      </AnimatePresence>
    </main>
  );
}
