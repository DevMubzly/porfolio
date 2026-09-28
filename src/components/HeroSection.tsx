"use client";

import { motion } from "motion/react";
import { SpotifyCard } from "./SpotifyCard";
import { SocialIcons } from "./SocialIcons";
import { ProfileAvatar } from "./Avatar";
import dynamic from "next/dynamic";

const GitHubHeatmap = dynamic(() => import("./GitHubHeatmap").then((mod) => mod.GitHubHeatmap), {
  ssr: false,
  loading: () => (
    <div className="p-6 overflow-hidden">
      <h3 className="text-sm font-medium text-[var(--text-primary)] mb-4">GitHub Contributions</h3>
      <div className="h-32 bg-[var(--bg-tertiary)] rounded animate-pulse" />
    </div>
  ),
});

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function HeroSection() {
  return (
    <section className="min-h-screen pt-40 px-6 lg:px-24">
      <div className="max-w-4xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          <motion.div variants={itemVariants} className="flex items-center gap-5">
            <div className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 rounded-full overflow-hidden">
              <ProfileAvatar />
            </div>
            <div className="flex-1 flex flex-col justify-center space-y-1">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-[var(--text-primary)]">
                Balinda Mubarak
              </h1>
              <p className="text-base sm:text-lg text-[var(--text-secondary)] font-light">
                Product Engineer
              </p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-4 text-sm text-[var(--text-muted)]">
            <span className="flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              bmubs15@gmail.com
            </span>
            <span className="flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              Uganda
            </span>
          </motion.div>

          <motion.p variants={itemVariants} className="text-base sm:text-lg text-[var(--text-secondary)] font-light leading-relaxed">
            I&apos;m a developer from Uganda focused on building elegant web applications and intelligent AI-powered systems. I like building cool stuff and shit.
          </motion.p>

          <motion.div variants={itemVariants}>
            <SpotifyCard />
          </motion.div>

          <motion.div variants={itemVariants}>
            <SocialIcons />
          </motion.div>

          <motion.div variants={itemVariants}>
            <GitHubHeatmap />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
