"use client";

import { motion } from "motion/react";
import { ExternalLink } from "lucide-react";
import { Icon } from "@iconify/react";

interface Project {
  title: string;
  summary: string;
  description: string;
  stack: string[];
  status?: string;
  projectURL?: string;
}

const projects: Project[] = [
  {
    title: "SalaStores",
    summary: "E-commerce platform",
    description: "A business operation system that organizes merchant inventory and exposes it as a store, Shopify-style. Built with Node.js, React, PostgreSQL, and deployed on Cloudflare.",
    stack: ["Node.js", "React", "PostgreSQL", "Cloudflare"],
    status: "Live",
    projectURL: "https://salastores.com",
  },
  {
    title: "EdgeKeeper",
    summary: "Visual algorithmic trading platform",
    description: "A sophisticated no-code platform for building, backtesting, and deploying automated trading strategies using a visual node-based interface.",
    stack: ["Next.js", "TypeScript", "Python", "WebSockets"],
    status: "Live",
    projectURL: "https://edgekeeper.app",
  },
  {
    title: "Metro Fried Chicken by Chello",
    summary: "Cross-platform mobile ordering app",
    description: "React Native app for food ordering with menu browsing, cart, and order tracking.",
    stack: ["React Native", "Expo", "TypeScript", "Zustand"],
    status: "In Progress",
    projectURL: "https://github.com/DevMubzly/mfc-ordering-app",
  },
  {
    title: "Fortress",
    summary: "Enterprise LLM deployment platform",
    description: "Open-source platform for running LLMs on-premises with security and compliance.",
    stack: ["FastAPI", "Docker", "Next.js", "Prometheus", "Nginx", "React", "TypeScript", "Ollama"],
    status: "In Development",
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
    <section id="projects" className="py-16 lg:py-20 px-6 lg:px-24">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="space-y-10"
        >
          <div>
            <h2 className="text-xs font-semibold text-[var(--text-primary)] uppercase tracking-wider mb-4">
              Selected Works
            </h2>
            <p className="text-base text-[var(--text-muted)] font-light">
              A curated collection of projects and experimental systems.
            </p>
          </div>

          <div className="border-t border-[var(--border)]">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <div className="group flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-6 border-b border-[var(--border)] last:border-b-0">
                  <div className="flex-1 min-w-0 space-y-2">
                    <div className="flex items-center gap-3">
                      <p className="text-lg font-light text-[var(--text-primary)] group-hover:text-[var(--text-secondary)] transition-colors">
                        {project.title}
                      </p>
                      <span className="text-[10px] font-medium text-[var(--text-primary)] bg-[var(--bg-secondary)] border border-[var(--border)] px-2 py-0.5 rounded-full">
                        {project.status}
                      </span>
                    </div>
                    <p className="text-sm text-[var(--text-muted)]">{project.summary}</p>
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.stack.map((tech) => (
                        <div
                          key={tech}
                          className="w-7 h-7 rounded-full border border-[var(--border)] bg-[var(--bg-secondary)] flex items-center justify-center text-[var(--text-secondary)]"
                        >
                          <Icon icon={techIcons[tech] || "mdi:code-tags"} className="w-3.5 h-3.5" />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className="text-xs text-[var(--text-muted)] group-hover:text-[var(--text-primary)] transition-colors">
                      View
                    </span>
                    <a
                      href={project.projectURL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full border border-[var(--border)] flex items-center justify-center group-hover:bg-[var(--text-primary)] group-hover:text-[var(--bg)] group-hover:border-[var(--text-primary)] transition-all duration-300"
                    >
                      <ExternalLink className="w-3.5 h-3.5 group-hover:rotate-45 transition-transform duration-300" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
