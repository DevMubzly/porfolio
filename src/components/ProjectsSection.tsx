"use client";

import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import { X, ExternalLink } from "lucide-react";

interface Project {
  title: string;
  summary: string;
  description: string;
  longDescription?: string;
  stack: string[];
  status?: string;
  image?: string;
  projectURL?: string;
}

const projects: Project[] = [
  {
    title: "Telegram SME AI Assistant",
    summary: "AI-powered Telegram assistant for small businesses",
    description: "SaaS product integrating with Telegram for inventory management, invoicing, and analytics.",
    stack: ["Express.js", "TypeScript", "Supabase", "OpenAI"],
    status: "Deployed",
    image: "/telegram bot.png",
    projectURL: "https://t.me/taviflow_bot",
  },
  {
    title: "Metro Fried Chicken App",
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
    image: "/fortress.png",
    projectURL: "https://fortress-stack.tech",
  },
];

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="relative z-[3] py-24 lg:py-32 px-6 lg:px-24 bg-[#F8F8F8] text-[#222222] rounded-t-[3rem] lg:rounded-t-[4rem] shadow-[0_-4px_24px_rgba(0,0,0,0.03)] flex flex-col justify-center -mt-8 lg:-mt-12">
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="space-y-24"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#E5E5E5] pb-12 gap-8">
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-light tracking-tight">
              Selected Works
            </h2>
            <p className="text-lg md:text-xl text-[#7B7B7B] font-light max-w-sm text-right">
              A collection of projects and experiments.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 auto-rows-[450px]">
            {projects.map((project, index) => {
              // Bento dynamic sizing logic
              const getSpan = () => {
                if (index === 0) return "lg:col-span-2 lg:row-span-1";
                if (index === 1) return "lg:col-span-1 lg:row-span-1";
                if (index === 2) return "lg:col-span-3 lg:row-span-1";
                return "lg:col-span-1 lg:row-span-1";
              };

              return (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`group relative overflow-hidden bg-white rounded-3xl cursor-pointer ${getSpan()} border border-[#E5E5E5] hover:border-[#222222] transition-colors duration-500`}
                  onClick={() => setSelectedProject(project)}
                >
                  {/* Background Image Area */}
                  <div className="absolute inset-0 w-full h-full">
                    {project.image ? (
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        priority={index === 0}
                        sizes="(max-width: 1024px) 100vw, 100vw"
                        className="object-cover opacity-10 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-in-out grayscale group-hover:grayscale-0"
                      />
                    ) : (
                      <div className="w-full h-full bg-[#FAFAFA]" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/80 to-white/10 group-hover:from-black/80 group-hover:via-black/40 group-hover:to-transparent transition-colors duration-700"></div>
                  </div>

                  {/* Foreground Content */}
                  <div className="absolute inset-0 p-8 lg:p-12 flex flex-col justify-end z-10 transition-colors duration-500">
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <span className="text-[10px] sm:text-xs font-medium uppercase tracking-widest border border-[#222222] group-hover:border-white text-[#222222] group-hover:text-white bg-white/50 group-hover:bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full transition-all duration-500">
                          {project.status}
                        </span>
                      </div>
                      
                      <h3 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-[#222222] group-hover:text-white transition-colors duration-500">
                        {project.title}
                      </h3>
                      
                      <p className="text-base sm:text-lg text-[#7B7B7B] group-hover:text-white/80 font-light max-w-xl leading-relaxed transition-colors duration-500">
                        {project.summary} - {project.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-x-4 gap-y-2 pt-2">
                        {project.stack.slice(0, 4).map((tech) => (
                          <span key={tech} className="text-xs uppercase tracking-wider text-[#222222] group-hover:text-white/90 font-medium transition-colors duration-500">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-12 bg-black/60 backdrop-blur-md overflow-y-auto"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative w-full max-w-5xl bg-[#F8F8F8] rounded-[2rem] shadow-2xl overflow-hidden my-auto flex flex-col md:flex-row"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 z-10 p-2.5 text-[#222222] hover:text-white bg-white hover:bg-[#222222] transition-colors rounded-full shadow-md"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Image Section */}
              <div className="w-full md:w-1/2 h-64 md:h-auto relative bg-[#E5E5E5] hidden md:block">
                {selectedProject.image ? (
                  <Image
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-[#FAFAFA] flex items-center justify-center">
                    <span className="text-[#7B7B7B] tracking-widest uppercase text-xs font-medium">No preview available</span>
                  </div>
                )}
              </div>

              {/* Content Section */}
              <div className="w-full md:w-1/2 p-8 md:p-12 space-y-8 flex flex-col justify-center">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <h3 className="text-3xl md:text-5xl font-light tracking-tight text-[#222222]">{selectedProject.title}</h3>
                  </div>
                  {selectedProject.status && (
                    <span className="inline-block text-[10px] md:text-xs font-medium text-[#7B7B7B] border border-[#E5E5E5] px-3 py-1 rounded-full uppercase tracking-widest">
                      {selectedProject.status}
                    </span>
                  )}
                </div>

                <p className="text-base md:text-lg text-[#7B7B7B] font-light leading-relaxed max-w-lg">
                  {selectedProject.longDescription || selectedProject.description}
                </p>

                <div className="flex flex-wrap gap-2 pt-6 border-t border-[#E5E5E5]">
                  {selectedProject.stack.map((tech) => (
                    <span key={tech} className="px-3 py-1.5 text-[10px] sm:text-xs font-medium bg-white text-[#222222] tracking-widest uppercase border border-[#E5E5E5] rounded-full">
                      {tech}
                    </span>
                  ))}
                </div>

                {selectedProject.projectURL && (
                  <div className="pt-8">
                    <a
                      href={selectedProject.projectURL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs md:text-sm text-white bg-[#222222] px-8 py-4 rounded-full hover:bg-black transition-all hover:scale-[1.02] tracking-widest uppercase font-medium shadow-md"
                    >
                      View Live Project <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
