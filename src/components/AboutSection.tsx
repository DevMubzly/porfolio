"use client";

import { motion } from "motion/react";
import { Icon } from "@iconify/react";

const experience = [
  {
    title: "Software Engineer",
    company: "Tricsoft Technologies Ltd",
    period: "June 2026 - September 2026",
    location: "Kampala, Uganda",
    technologies: ["Next.js", "TypeScript", "NestJS", "Three.js", "PostgreSQL", "Linux", "Docker", "Nginx"],
    description: "Pioneered a major VR platform project as lead engineer, overseeing overall development from architecture to deployment.",
  },
  {
    title: "Lead Full-Stack Mobile Engineer",
    company: "Metro Fried Chicken by Chello",
    period: "June 2025 - December 2025",
    location: "Mbarara, Uganda",
    technologies: ["React Native", "Expo", "TypeScript", "Zustand"],
    description: "Leading end-to-end development of a cross-platform mobile ordering application. Building seamless food ordering experience with menu browsing, cart management, and order tracking while managing state architecture and performance optimization.",
  },
  {
    title: "IT Intern",
    company: "Ministry of Finance, Planning and Economic Development",
    period: "June 2025 - August 2025",
    location: "Kampala, Uganda",
    technologies: ["Database Administration", "Networking", "Service Desk"],
    description: "Worked under the Networking & Security department with responsibilities spanning database administration, datacentre management, and service desk operations.",
  },
];

const education = [
  { title: "Mbarara University of Science and Technology", period: "2023 - 2026", degree: "BSc Computer Science" },
  { title: "St. Henry's College Kitovu", period: "2016 - 2022", degree: "UCE & UACE" },
];

const recognition = [
  {
    title: "Hackathon Winner",
    desc: "1st Place at Industry 4.0+ Hackathon for ABQ Launch",
    url: "https://www.must.ac.ug/must-students-sweep-top-spots-at-the-national-industry-4-0-hackathon/",
  },
];

const techIcons: Record<string, string> = {
  "Next.js": "logos:nextjs-icon",
  "TypeScript": "logos:typescript-icon",
  "Python": "logos:python",
  "PostgreSQL": "logos:postgresql",
  "NestJS": "logos:nestjs",
  "Three.js": "logos:threejs",
  "Linux": "logos:linux-tux",
  "Docker": "logos:docker-icon",
  "Nginx": "logos:nginx",
  "React Native": "logos:react",
  "Expo": "logos:expo-icon",
  "Zustand": "logos:react",
  "Database Administration": "logos:mysql-icon",
  "Networking": "mdi:server-network",
  "Service Desk": "mdi:headset",
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold text-[var(--text-primary)] uppercase tracking-wider mb-4">{children}</p>
  );
}

export function AboutSection() {
  return (
    <section id="about" className="px-6 lg:px-24">
      <div className="max-w-4xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="space-y-10 pt-12"
        >
          {/* Experience */}
          <motion.div variants={itemVariants}>
            <SectionLabel>Experience</SectionLabel>
            <div className="border-t border-[var(--border)]">
              {experience.map((item, index) => (
                <div key={item.title}>
                  <div className="group py-5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <div>
                        <p className="text-lg font-light text-[var(--text-primary)] group-hover:text-[var(--text-secondary)] transition-colors">
                          {item.title}
                        </p>
                        <p className="text-sm text-[var(--text-muted)] mt-0.5">{item.company}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-[var(--text-muted)] whitespace-nowrap">
                          {item.period}
                        </span>
                        <p className="text-xs text-[var(--text-muted)] mt-0.5">{item.location}</p>
                      </div>
                    </div>
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed mt-3">
                      {item.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {item.technologies.map((tech) => (
                        <div
                          key={tech}
                          className="w-8 h-8 rounded-full border border-[var(--border)] bg-[var(--bg-secondary)] flex items-center justify-center text-[var(--text-secondary)]"
                        >
                          <Icon icon={techIcons[tech] || "mdi:code-tags"} className="w-4 h-4" />
                        </div>
                      ))}
                    </div>
                  </div>
                  {index < experience.length - 1 && (
                    <div className="border-t border-[var(--border)]" />
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Recognition */}
          <motion.div variants={itemVariants}>
            <SectionLabel>Recognition</SectionLabel>
            <div className="space-y-0 divide-y divide-[var(--border)]">
              {recognition.map((item) => (
                <motion.div
                  key={item.title}
                  className="group py-4"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-lg font-light text-[var(--text-primary)] group-hover:text-[var(--text-secondary)] transition-colors">
                    {item.title}
                  </p>
                  <p className="text-sm text-[var(--text-muted)] mt-0.5">{item.desc}</p>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 mt-2 text-sm text-[var(--text-primary)] border-b border-[var(--text-primary)] pb-0.5 hover:text-[var(--text-muted)] hover:border-[var(--text-muted)] transition-colors"
                  >
                    Read official news <span className="text-xs">↗</span>
                  </a>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Education */}
          <motion.div variants={itemVariants}>
            <SectionLabel>Education</SectionLabel>
            <div className="space-y-0 divide-y divide-[var(--border)]">
              {education.map((item) => (
                <motion.div
                  key={item.title}
                  className="group py-4 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.3 }}
                >
                  <div>
                    <p className="text-lg font-light text-[var(--text-primary)] group-hover:text-[var(--text-secondary)] transition-colors">
                      {item.title}
                    </p>
                    <p className="text-sm text-[var(--text-muted)] mt-0.5">{item.degree}</p>
                  </div>
                  <span className="text-xs text-[var(--text-muted)] whitespace-nowrap">
                    {item.period}
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
