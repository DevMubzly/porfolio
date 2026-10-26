"use client";

import { motion } from "motion/react";

const experience = [
  {
    title: "Software Engineer",
    company: "Tricsoft Technologies Ltd",
    period: "June 2026 - September 2026",
    technologies: ["Next.js", "TypeScript", "NestJS", "Three.js", "PostgreSQL", "Linux", "Docker", "Nginx"],
    description: "Pioneered a major VR platform project as lead engineer, overseeing overall development from architecture to deployment.",
  },
  {
    title: "Lead Full-Stack Mobile Engineer",
    company: "Metro Fried Chicken by Chello",
    period: "June 2025 - December 2025",
    technologies: ["React Native", "Expo", "TypeScript", "Zustand"],
    description: "Leading end-to-end development of a cross-platform mobile ordering application. Building seamless food ordering experience with menu browsing, cart management, and order tracking while managing state architecture and performance optimization.",
  },
  {
    title: "IT Intern",
    company: "Ministry of Finance, Planning and Economic Development",
    period: "June 2025 - August 2025",
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
    <p className="mb-5 text-2xl font-medium tracking-tight capitalize text-[var(--text-primary)] sm:text-3xl">{children}</p>
  );
}

export function AboutSection() {
  return (
    <section id="about" className="px-6 lg:px-24">
      <div className="max-w-[52rem] mx-auto">
        <hr className="my-16 lg:my-24 border-[var(--border)]" />
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {/* Experience */}
          <motion.div variants={itemVariants} id="work">
            <SectionLabel>Work Experience</SectionLabel>
            <div>
              {experience.map((item) => (
                <div key={item.title} className="border-b border-[var(--border)] py-5 last:border-b-0">
                  <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                    <p className="text-base font-medium text-[var(--text-primary)]">
                      {item.title}
                      <span className="ml-2 inline-block rounded-md bg-blue-500/10 px-2 py-0.5 text-sm font-normal text-blue-600">
                        {item.company}
                      </span>
                    </p>
                    <span className="shrink-0 whitespace-nowrap text-sm text-[var(--text-muted)]">
                      {item.period}
                    </span>
                  </div>
                  <p className="mt-1.5 text-base leading-relaxed text-[var(--text-secondary)]">
                    {item.description}
                  </p>
                  <p className="mt-2 text-sm text-[var(--text-muted)]">
                    {item.technologies.join(" · ")}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          <hr className="my-16 lg:my-24 border-[var(--border)]" />

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
                  <p className="text-base font-medium text-[var(--text-primary)] group-hover:text-[var(--text-secondary)] transition-colors">
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

          <hr className="my-16 lg:my-24 border-[var(--border)]" />

          {/* Education */}
          <motion.div variants={itemVariants}>
            <SectionLabel>Education</SectionLabel>
            <div className="space-y-0 divide-y divide-[var(--border)]">
              {education.map((item) => (
                <motion.div
                  key={item.title}
                  className="group py-6 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.3 }}
                >
                  <div>
                    <p className="text-base font-medium text-[var(--text-primary)] group-hover:text-[var(--text-secondary)] transition-colors">
                      {item.title}
                    </p>
                    <p className="text-sm text-[var(--text-muted)] mt-0.5">{item.degree}</p>
                  </div>
                  <span className="text-sm text-[var(--text-muted)] whitespace-nowrap">
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
