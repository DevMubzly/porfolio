"use client";

import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const experiences = [
  {
    title: "Software Engineer",
    company: "Tricsoft Technologies Ltd",
    period: "2025 - Present",
    technologies: ["Next.js", "TypeScript", "Python", "PostgreSQL"],
    responsibilities: [
      "Developing and maintaining software solutions",
      "Contributing to full-stack development",
      "Collaborating on enterprise projects",
    ],
  },
  {
    title: "Lead Full-Stack Mobile Engineer",
    company: "MFC Ordering App",
    period: "2025",
    technologies: ["React Native", "Expo", "TypeScript", "Zustand"],
    responsibilities: [
      "Leading end-to-end development of a cross-platform mobile ordering application",
      "Building seamless food ordering experience with menu browsing, cart management, and order tracking",
      "Managing state architecture and performance optimization",
    ],
  },
  {
    title: "IT Intern",
    company: "Ministry of Finance, Planning and Economic Development",
    period: "June 2025 - August 2025",
    technologies: ["Database Administration", "Networking", "Service Desk"],
    responsibilities: [
      "Worked under the Networking & Security department",
      "Database administration and datacentre management",
      "Service desk operations and support",
    ],
  },
];

const techIcons: Record<string, string> = {
  "Next.js": "▲",
  "TypeScript": "TS",
  "Python": "PY",
  "PostgreSQL": "DB",
  "React Native": "RN",
  "Expo": "EX",
  "Zustand": "ZS",
  "Database Administration": "DB",
  "Networking": "NW",
  "Service Desk": "SD",
};

function AccordionItem({
  exp,
  isOpen,
  onToggle,
  index,
}: {
  exp: (typeof experiences)[0];
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="border border-[var(--border)] rounded-2xl overflow-hidden bg-[var(--bg-secondary)]"
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-6 text-left group"
      >
        <div>
          <h2 className="text-xl font-light text-[var(--text-primary)] group-hover:text-[var(--text-secondary)] transition-colors">
            {exp.title}
          </h2>
          <p className="text-sm text-[var(--text-muted)] mt-1">{exp.company}</p>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs text-[var(--text-muted)]">{exp.period}</span>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="w-8 h-8 rounded-full border border-[var(--border)] flex items-center justify-center"
          >
            <ChevronDown className="w-4 h-4 text-[var(--text-muted)]" />
          </motion.div>
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 space-y-6">
              <div>
                <p className="text-xs text-[var(--text-muted)] mb-3">Technologies</p>
                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--bg-tertiary)] text-sm text-[var(--text-secondary)]"
                    >
                      <span className="w-5 h-5 rounded bg-[var(--text-primary)] text-[var(--bg)] flex items-center justify-center text-[9px] font-bold">
                        {techIcons[tech] || tech.slice(0, 2).toUpperCase()}
                      </span>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs text-[var(--text-muted)] mb-3">What I did</p>
                <ul className="space-y-2">
                  {exp.responsibilities.map((resp) => (
                    <li key={resp} className="flex items-start gap-3 text-sm text-[var(--text-secondary)]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--text-muted)] mt-2 flex-shrink-0" />
                      {resp}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function ExperiencesPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <main className="min-h-screen pt-28 pb-16 px-6 lg:px-24">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-[var(--text-primary)] mb-4">
            Experiences
          </h1>
          <p className="text-[var(--text-muted)] text-lg font-light mb-12">
            A detailed look at my professional journey.
          </p>
        </motion.div>

        <div className="space-y-4">
          {experiences.map((exp, index) => (
            <AccordionItem
              key={exp.title}
              exp={exp}
              index={index}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
