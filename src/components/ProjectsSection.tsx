"use client";

import { motion } from "motion/react";
import { ExternalLink } from "lucide-react";
import { Icon } from "@iconify/react";

interface Project {
  title: string;
  summary: string;
  description: string;
  stack: string[];
  projectURL?: string;
}

const projects: Project[] = [
  {
    title: "SalaStores",
    summary: "E-commerce platform",
    description: "A business operation system that organizes merchant inventory and exposes it as a store, Shopify-style. Built with Node.js, React, PostgreSQL, and deployed on Cloudflare.",
    stack: ["Node.js", "React", "PostgreSQL", "Cloudflare"],
    projectURL: "https://salastores.com",
  },
  {
    title: "EdgeKeeper",
    summary: "Visual algorithmic trading platform",
    description: "A sophisticated no-code platform for building, backtesting, and deploying automated trading strategies using a visual node-based interface.",
    stack: ["Next.js", "TypeScript", "Python", "WebSockets"],
    projectURL: "https://edgekeeper.app",
  },
  {
    title: "Metro Fried Chicken by Chello",
    summary: "Cross-platform mobile ordering app",
    description: "React Native app for food ordering with menu browsing, cart, and order tracking.",
    stack: ["React Native", "Expo", "TypeScript", "Zustand"],
    projectURL: "https://github.com/DevMubzly/mfc-ordering-app",
  },
  {
    title: "Fortress",
    summary: "Enterprise LLM deployment platform",
    description: "Open-source platform for running LLMs on-premises with security and compliance.",
    stack: ["FastAPI", "Docker", "Next.js", "Prometheus", "Nginx", "React", "TypeScript", "Ollama"],
    projectURL: "https://fortress-stack.tech",
  },
];

const techIcons: Record<string, string> = {
  "Next.js": "logos:nextjs-icon",
  "TypeScript": "logos:typescript-icon",
  "Python": "logos:python",
  "PostgreSQL": "logos:postgresql",
  "React Native": "logos:react",
  "Expo": "logos:expo-icon",
  "Zustand": "logos:react",
  "FastAPI": "logos:python",
  "Docker": "logos:docker-icon",
  "Prometheus": "logos:prometheus-icon",
  "Node.js": "logos:nodejs-icon",
  "React": "logos:react",
  "Cloudflare": "logos:cloudflare-icon",
  "WebSockets": "mdi:websocket",
  "Nginx": "logos:nginx",
  "Ollama": "simple-icons:ollama",
};

export function ProjectsSection() {
  return (
    <section id="projects" className="px-6 lg:px-24">
      <div className="max-w-[52rem] mx-auto">
        <hr className="my-16 lg:my-24 border-[var(--border)]" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <h2 className="text-2xl font-medium tracking-tight capitalize text-[var(--text-primary)] sm:text-3xl">
            Selected Works
          </h2>

          <div className="grid gap-6 sm:grid-cols-2">
            {projects.map((project, index) => (
              <motion.a
                key={project.title}
                href={project.projectURL}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="group flex flex-col rounded-2xl bg-[var(--bg-secondary)] p-6 transition-colors hover:bg-[var(--bg-tertiary)]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h3 className="text-lg font-medium text-[var(--text-primary)] group-hover:text-[var(--text-secondary)] transition-colors">
                      {project.title}
                    </h3>
                    <p className="mt-1 text-xs font-medium text-[var(--text-muted)]">{project.summary}</p>
                  </div>
                  <span className="w-8 h-8 flex-shrink-0 flex items-center justify-center text-[var(--text-muted)] group-hover:text-[var(--text-primary)] transition-colors">
                    <ExternalLink className="w-3.5 h-3.5 group-hover:rotate-45 transition-transform duration-300" />
                  </span>
                </div>

                <p className="mt-3 text-sm text-[var(--text-secondary)] leading-relaxed">{project.description}</p>

                <div className="mt-auto pt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-[var(--text-muted)]">
                  {project.stack.map((tech) => (
                    <span key={tech} className="inline-flex items-center gap-1.5">
                      <Icon icon={techIcons[tech] || "mdi:code-tags"} className="w-3.5 h-3.5" />
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
