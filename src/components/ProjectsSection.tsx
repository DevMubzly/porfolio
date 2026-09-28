"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { ExternalLink } from "lucide-react";

interface Project {
  title: string;
  summary: string;
  description: string;
  stack: string[];
  status?: string;
  image?: string;
  projectURL?: string;
}

const projects: Project[] = [
  {
    title: "EdgeKeeper",
    summary: "Visual algorithmic trading platform",
    description: "A sophisticated no-code platform for building, backtesting, and deploying automated trading strategies using a visual node-based interface.",
    stack: ["Next.js", "TypeScript", "Python", "WebSockets"],
    status: "Live",
    image: "/image.png",
    projectURL: "https://edgekeeper.app",
  },
  {
    title: "MetroFried Chicken App",
    summary: "Cross-platform mobile ordering app",
    description: "React Native app for food ordering with menu browsing, cart, and order tracking.",
    stack: ["React Native", "Expo", "TypeScript", "Zustand"],
    status: "In Progress",
    image: "/chicken.jpg",
    projectURL: "https://github.com/DevMubzly/mfc-ordering-app",
  },
  {
    title: "Fortress",
    summary: "Enterprise LLM deployment platform",
    description: "Open-source platform for running LLMs on-premises with security and compliance.",
    stack: ["FastAPI", "Docker", "Next.js", "Prometheus"],
    status: "In Development",
    image: "/fortress.jpg",
    projectURL: "https://fortress-stack.tech",
  },
];

export function ProjectsSection() {
  return (
    <section id="projects" className="py-16 lg:py-20 px-6 lg:px-24">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="space-y-16"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between pb-12 gap-6 border-b border-[var(--border)]">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-[var(--text-primary)]">
              Selected Works
            </h2>
            <p className="text-base text-[var(--text-muted)] font-light max-w-sm md:text-right pb-2">
              A curated collection of projects and experimental systems.
            </p>
          </div>

          <div className="flex flex-col border-t border-[var(--border)]">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="group relative flex flex-col lg:flex-row justify-between lg:items-center py-12 px-4 md:px-6 lg:px-10 border-b border-[var(--border)] gap-8 transition-all duration-500 hover:bg-[var(--bg-secondary)] rounded-2xl md:-mx-6 lg:-mx-10">
                  <div className="flex flex-col flex-1 max-w-3xl space-y-6 z-10">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-[10px] sm:text-xs font-medium text-[var(--text-primary)] bg-[var(--bg-secondary)] border border-[var(--border)] px-3 py-1 rounded-full">
                        {project.status}
                      </span>
                      {project.stack.slice(0, 3).map((tech) => (
                        <span key={tech} className="text-xs text-[var(--text-muted)] font-medium hidden sm:block">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <h3 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-[var(--text-primary)] group-hover:translate-x-2 transition-transform duration-500">
                      {project.title}
                    </h3>

                    <p className="text-base sm:text-lg text-[var(--text-muted)] font-light leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-6 lg:flex-col lg:items-end lg:justify-center z-10 mt-2 lg:mt-0">
                    {project.projectURL ? (
                      <a
                        href={project.projectURL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-4 group/btn"
                      >
                        <span className="text-xs text-[var(--text-muted)] group-hover/btn:text-[var(--text-primary)] transition-colors duration-300">
                          View Project
                        </span>
                        <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-full border border-[var(--border)] bg-[var(--bg-secondary)] flex items-center justify-center group-hover/btn:bg-[var(--text-primary)] group-hover/btn:text-[var(--bg)] group-hover/btn:border-[var(--text-primary)] transition-all duration-500">
                          <ExternalLink className="w-5 h-5 lg:w-6 lg:h-6 group-hover/btn:rotate-45 group-hover/btn:scale-110 transition-transform duration-500" />
                        </div>
                      </a>
                    ) : (
                      <div className="flex items-center gap-4 cursor-not-allowed opacity-50">
                        <span className="text-xs uppercase tracking-widest text-[var(--text-muted)]">
                          Internal Project
                        </span>
                        <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-full border border-[var(--border)] bg-[var(--bg-tertiary)] flex items-center justify-center">
                          <span className="w-2 h-2 rounded-full bg-[var(--border)]"></span>
                        </div>
                      </div>
                    )}
                  </div>

                  {project.image && (
                    <div className="absolute inset-y-4 right-4 w-1/3 rounded-xl overflow-hidden opacity-0 group-hover:opacity-10 scale-95 group-hover:scale-100 hidden lg:block transition-all duration-700 ease-out pointer-events-none z-0">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="33vw"
                        className="object-cover object-center grayscale"
                      />
                      <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[var(--bg-secondary)]/50 to-[var(--bg-secondary)]"></div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
