"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const experience = [
  { title: "Software Engineer", company: "Tricsoft Technologies Ltd", period: "2025 - Present", location: "Kampala, Uganda" },
  { title: "Lead Full-Stack Mobile Engineer", company: "MFC Ordering App", period: "2025", location: "Kampala, Uganda" },
  { title: "IT Intern", company: "Ministry of Finance, Planning and Economic Development", period: "June 2025 - August 2025", location: "Kampala, Uganda" },
];

const education = [
  { title: "Mbarara University of Science and Technology", period: "2023 - 2026", degree: "BSc Computer Science" },
  { title: "St. Henry's College Kitovu", period: "2016 - 2022", degree: "UCE & UACE" },
];

const recognition = [
  { title: "Hackathon Winner", desc: "1st Place at Industry 4.0+ Hackathon for ABQ Launch" },
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
    <p className="text-xl font-light text-[var(--text-primary)] mb-6">{children}</p>
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
          className="space-y-10 pt-4"
        >
          {/* Experience */}
          <motion.div variants={itemVariants}>
            <SectionLabel>Experience</SectionLabel>
            <div className="space-y-0 divide-y divide-[var(--border)]">
              {experience.map((item) => (
                <motion.div
                  key={item.title}
                  className="group py-5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.3 }}
                >
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
                </motion.div>
              ))}
            </div>
            <Link
              href="/experiences"
              className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors group/link pt-4"
            >
              <span className="link-underline">Show all experiences</span>
              <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* Recognition */}
          <motion.div variants={itemVariants}>
            <SectionLabel>Recognition</SectionLabel>
            <div className="space-y-0 divide-y divide-[var(--border)]">
              {recognition.map((item) => (
                <motion.div
                  key={item.title}
                  className="group py-5"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-lg font-light text-[var(--text-primary)] group-hover:text-[var(--text-secondary)] transition-colors">
                    {item.title}
                  </p>
                  <p className="text-sm text-[var(--text-muted)] mt-0.5">{item.desc}</p>
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
                  className="group py-5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1"
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
