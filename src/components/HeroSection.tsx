"use client";

import { motion } from "motion/react";
import { SpotifyCard } from "./SpotifyCard";
import { SocialIcons } from "./SocialIcons";
import { Icon } from "@iconify/react";
import dynamic from "next/dynamic";

const techStack = [
  { name: "Next.js", icon: "logos:nextjs-icon" },
  { name: "TypeScript", icon: "logos:typescript-icon" },
  { name: "React", icon: "logos:react" },
  { name: "Python", icon: "logos:python" },
  { name: "Node.js", icon: "logos:nodejs-icon" },
  { name: "PostgreSQL", icon: "logos:postgresql" },
  { name: "Docker", icon: "logos:docker-icon" },
  { name: "Cloudflare", icon: "logos:cloudflare-icon" },
];

const GitHubHeatmap = dynamic(() => import("./GitHubHeatmap").then((mod) => mod.GitHubHeatmap), {
  ssr: false,
  loading: () => (
    <div className="p-6 overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <div className="h-3.5 w-32 bg-[var(--bg-tertiary)] rounded animate-pulse" />
        <div className="h-2.5 w-16 bg-[var(--bg-tertiary)] rounded animate-pulse" />
      </div>
      <div className="space-y-1.5">
        <div className="h-2.5 w-full bg-[var(--bg-tertiary)] rounded animate-pulse" />
        <div className="flex gap-1">
          {Array.from({ length: 52 }).map((_, i) => (
            <div key={i} className="w-2.5 h-2.5 rounded-sm bg-[var(--bg-tertiary)] animate-pulse" />
          ))}
        </div>
        <div className="flex gap-1">
          {Array.from({ length: 52 }).map((_, i) => (
            <div key={i} className="w-2.5 h-2.5 rounded-sm bg-[var(--bg-tertiary)] animate-pulse" />
          ))}
        </div>
        <div className="flex gap-1">
          {Array.from({ length: 52 }).map((_, i) => (
            <div key={i} className="w-2.5 h-2.5 rounded-sm bg-[var(--bg-tertiary)] animate-pulse" />
          ))}
        </div>
        <div className="flex gap-1">
          {Array.from({ length: 52 }).map((_, i) => (
            <div key={i} className="w-2.5 h-2.5 rounded-sm bg-[var(--bg-tertiary)] animate-pulse" />
          ))}
        </div>
        <div className="flex gap-1">
          {Array.from({ length: 52 }).map((_, i) => (
            <div key={i} className="w-2.5 h-2.5 rounded-sm bg-[var(--bg-tertiary)] animate-pulse" />
          ))}
        </div>
        <div className="flex gap-1">
          {Array.from({ length: 52 }).map((_, i) => (
            <div key={i} className="w-2.5 h-2.5 rounded-sm bg-[var(--bg-tertiary)] animate-pulse" />
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between mt-4">
        <div className="h-2.5 w-28 bg-[var(--bg-tertiary)] rounded animate-pulse" />
        <div className="h-2.5 w-20 bg-[var(--bg-tertiary)] rounded animate-pulse" />
      </div>
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
    <section id="home" className="min-h-screen pt-40 pb-16 px-6 lg:px-24">
      <div className="max-w-4xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          <motion.div variants={itemVariants} className="flex items-center gap-5">
            <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 rounded-full overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/avatar.svg" alt="Balinda Mubarak" className="w-full h-full" />
            </div>
            <div className="flex-1 pt-4 flex flex-col justify-center items-start space-y-1">
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
            Hi, I&apos;m a developer from Uganda focused on building elegant web applications and intelligent AI-powered systems.
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

          <motion.div variants={itemVariants} className="space-y-4">
            <p className="text-xs font-semibold text-[var(--text-primary)] uppercase tracking-wider">Tech Stack</p>
            <div className="flex flex-wrap items-center gap-3">
              {techStack.map((tech) => (
                <motion.div
                  key={tech.name}
                  className="relative group w-10 h-10 rounded-full border border-[var(--border)] bg-[var(--bg-secondary)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)] transition-colors cursor-default"
                  whileHover={{ y: -3, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon icon={tech.icon} className="w-5 h-5" />
                  <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded-md bg-[var(--text-primary)] text-[var(--bg)] text-[10px] font-medium whitespace-nowrap opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200">
                    {tech.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
