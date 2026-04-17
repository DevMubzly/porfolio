"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { ExternalLink } from "lucide-react";

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
    image: "/fortress.jpg",
    projectURL: "https://fortress-stack.tech",
  },
];

export function ProjectsSection() {
  return (
    <section id="projects" className="relative py-24 lg:py-32 px-6 lg:px-24 bg-[#F8F8F8] text-[#222222] rounded-t-[3rem] lg:rounded-t-[4rem] shadow-[0_-4px_24px_rgba(0,0,0,0.03)] flex flex-col justify-center -mt-8 lg:-mt-12 transition-colors duration-300 z-[3]">
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="space-y-16 lg:space-y-24"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between pb-12 lg:pb-16 gap-6 lg:gap-8 border-b border-[#E5E5E5]">
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-light tracking-tight">
              Selected Works
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-[#7B7B7B] font-light max-w-sm md:text-right pb-2">
              A curated collection of projects and experimental systems.
            </p>
          </div>

          <div className="flex flex-col border-t border-[#E5E5E5] pt-4">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="group relative flex flex-col lg:flex-row justify-between lg:items-center py-12 lg:py-16 border-b border-[#E5E5E5] gap-8 transition-colors duration-500 hover:bg-white rounded-2xl md:-mx-6 lg:-mx-10 hover:px-6 lg:hover:px-10">
                  {/* Left Column: Details */}
                  <div className="flex flex-col flex-1 max-w-3xl space-y-6 z-10">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-[10px] sm:text-xs font-medium uppercase tracking-widest text-[#222222] bg-white border border-[#E5E5E5] px-3 py-1 rounded-full shadow-sm">
                        {project.status}
                      </span>
                      {project.stack.slice(0, 3).map((tech) => (
                        <span key={tech} className="text-xs uppercase tracking-wider text-[#7B7B7B] font-medium hidden sm:block">
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    <h3 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-[#222222] group-hover:translate-x-2 transition-transform duration-500">
                      {project.title}
                    </h3>
                    
                    <p className="text-base sm:text-lg text-[#7B7B7B] font-light leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Right Column: Interaction */}
                  <div className="flex items-center gap-6 lg:flex-col lg:items-end lg:justify-center z-10 mt-2 lg:mt-0">
                    {project.projectURL ? (
                      <a
                        href={project.projectURL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-4 group/btn"
                      >
                        <span className="text-xs uppercase tracking-widest text-[#7B7B7B] group-hover/btn:text-[#222222] transition-colors duration-300">
                          View Project
                        </span>
                        <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-full border border-[#E5E5E5] bg-white flex items-center justify-center group-hover/btn:bg-[#222222] group-hover/btn:text-white group-hover/btn:border-[#222222] shadow-sm transition-all duration-500">
                          <ExternalLink className="w-5 h-5 lg:w-6 lg:h-6 group-hover/btn:rotate-45 group-hover/btn:scale-110 transition-transform duration-500" />
                        </div>
                      </a>
                    ) : (
                      <div className="flex items-center gap-4 cursor-not-allowed opacity-50">
                        <span className="text-xs uppercase tracking-widest text-[#7B7B7B]">
                          Internal Project
                        </span>
                        <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-full border border-[#E5E5E5] bg-[#F8F8F8] flex items-center justify-center">
                          <span className="w-2 h-2 rounded-full bg-[#E5E5E5]"></span>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Subtle Expanding Image Preview Background on Hover (Desktop Only) */}
                  {project.image && (
                    <div className="absolute inset-y-4 right-4 w-1/3 rounded-xl overflow-hidden opacity-0 group-hover:opacity-10 scale-95 group-hover:scale-100 hidden lg:block transition-all duration-700 ease-out pointer-events-none z-0">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover object-center grayscale"
                      />
                      <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#F8F8F8]/50 to-[#F8F8F8]"></div>
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
