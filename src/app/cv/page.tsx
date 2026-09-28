"use client";

import { motion } from "motion/react";
import { Printer } from "lucide-react";

const experience = [
  {
    title: "Software Engineer",
    company: "Tricsoft Technologies Ltd",
    period: "June 2026 - September 2026",
    desc: "Pioneered a major VR platform project as lead engineer, overseeing overall development from architecture to deployment.",
  },
  {
    title: "Lead Full-Stack Mobile Engineer",
    company: "Metro Fried Chicken by Chello",
    period: "June 2025 - December 2025",
    desc: "Leading the end-to-end development of a cross-platform mobile ordering application using React Native, Expo, and Zustand. Focusing on a seamless food ordering experience with menu browsing, cart management, and order tracking.",
  },
  {
    title: "IT Intern",
    company: "Ministry of Finance, Planning and Economic Development",
    period: "June 2025 - Aug 2025",
    desc: "Worked under the Networking & Security department with responsibilities spanning database administration, datacentre management, and service desk operations.",
  },
];

const projects = [
  {
    title: "SalaStores",
    status: "Live",
    subtitle: "E-commerce platform",
    desc: "A business operation system that organizes merchant inventory and exposes it as a store, Shopify-style. Built with Node.js, React, PostgreSQL, and deployed on Cloudflare.",
    tags: ["Node.js", "React", "PostgreSQL", "Cloudflare"],
    url: "https://salastores.com",
  },
  {
    title: "EdgeKeeper",
    status: "Live",
    subtitle: "Visual Algorithmic Trading Platform",
    desc: "A sophisticated no-code platform for building, backtesting, and deploying automated trading strategies using a visual node-based interface.",
    tags: ["Next.js", "TypeScript", "Python", "WebSockets"],
    url: "https://edgekeeper.app",
  },
  {
    title: "Fortress",
    status: "In Development",
    subtitle: "Enterprise LLM Deployment Platform",
    desc: "Open-source platform designed for running large language models on-premises with strict security, auditing, and compliance safeguards built-in.",
    tags: ["FastAPI", "Docker", "Next.js", "Prometheus"],
    url: "https://fortress-stack.tech",
  },
];

const skills = [
  { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
  { category: "Backend", items: ["Node.js", "Python", "FastAPI", "PostgreSQL"] },
  { category: "DevOps", items: ["Docker", "Git / GitHub Actions", "Nginx"] },
  { category: "AI", items: ["LangChain", "OpenAI API", "Hugging Face", "RAG Systems"] },
];

const education = [
  { title: "Mbarara University of Science and Technology", period: "2023 - 2026", degree: "BSc Computer Science" },
  { title: "St. Henry's College Kitovu", period: "2016 - 2022", degree: "UCE & UACE" },
];

const achievements = [
  {
    title: "1st Place Winner",
    subtitle: "Industry 4.0+ Hackathon for ABQ Launch",
    desc: "Recognized for top innovation and technical implementation at the national level.",
    url: "https://www.must.ac.ug/must-students-sweep-top-spots-at-the-national-industry-4-0-hackathon/",
  },
];

const interests = ["Building innovations", "movies", "music", "hiking", "swimming", "football", "table tennis"];

const referees = [
  { name: "Mr. Baguma Asuman", phone: "+256701988620", role: "Systems Officer & Software Developer, Ministry of Finance, Planning and Economic Development" },
  { name: "Mr. Buri Gershom", phone: "+256773635525", role: "Lecturer, Mbarara University of Science and Technology" },
  { name: "Muhesi Joyce", phone: "+256784789636", role: "Nursing Officer In-Charge, Maternity Ward, Fort Portal Regional Referral Hospital" },
];

export default function CVPage() {
  return (
    <main className="min-h-screen pt-28 pb-16 px-6 lg:px-24">
      <div className="max-w-4xl mx-auto relative">
        {/* Decorative wavy lines on the right */}
        <div className="absolute top-0 right-0 w-32 h-full overflow-hidden pointer-events-none hidden lg:block">
          <svg className="w-full h-full" viewBox="0 0 100 800" preserveAspectRatio="none" fill="none">
            <path d="M50 0 C80 100, 20 200, 50 300 C80 400, 20 500, 50 600 C80 700, 20 800, 50 800" stroke="var(--border)" strokeWidth="1" opacity="0.5" />
            <path d="M70 0 C100 100, 40 200, 70 300 C100 400, 40 500, 70 600 C100 700, 40 800, 70 800" stroke="var(--border)" strokeWidth="1" opacity="0.3" />
            <path d="M30 0 C60 100, 0 200, 30 300 C60 400, 0 500, 30 600 C60 700, 0 800, 30 800" stroke="var(--border)" strokeWidth="1" opacity="0.4" />
          </svg>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Print CV Button */}
          <div className="flex justify-end mb-8">
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--border)] bg-[var(--bg-secondary)] text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)] transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              Print CV
            </button>
          </div>

          {/* Header */}
          <div className="pb-8 mb-12 border-b-2 border-[var(--text-primary)]">
            <h1 className="text-4xl sm:text-5xl font-light tracking-tight text-[var(--text-primary)] mb-2">
              Balinda Mubarak
            </h1>
            <p className="text-lg text-[var(--text-muted)] font-light mb-6">
              Full-Stack Developer / AI Engineer
            </p>
            <div className="flex flex-wrap gap-4 text-sm text-[var(--text-muted)] mb-6">
              <span>bmubs15@gmail.com</span>
              <span>+256771050357</span>
              <span>https://bmubarak.xyz</span>
            </div>
            <p className="text-base text-[var(--text-secondary)] font-light leading-relaxed">
              I am a developer focused on building elegant web applications and intelligent AI-powered systems. I specialize in crafting minimal, resilient architectures from backend infrastructure down to the frontend user experience.
            </p>
          </div>

          {/* Experience */}
          <section className="mb-12">
            <h2 className="text-sm font-medium text-[var(--text-muted)] tracking-wide border-b border-[var(--border)] pb-3 mb-6">
              Experience
            </h2>
            <div className="space-y-6">
              {experience.map((item) => (
                <div key={item.title} className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                  <div>
                    <p className="text-lg font-light text-[var(--text-primary)]">{item.title}</p>
                    <p className="text-sm text-[var(--text-muted)]">{item.company}</p>
                    <p className="text-sm text-[var(--text-secondary)] mt-2 leading-relaxed">{item.desc}</p>
                  </div>
                  <span className="text-xs text-[var(--text-muted)] whitespace-nowrap">{item.period}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Selected Works */}
          <section className="mb-12">
            <h2 className="text-sm font-medium text-[var(--text-muted)] tracking-wide border-b border-[var(--border)] pb-3 mb-6">
              Selected Works
            </h2>
            <div className="space-y-6">
              {projects.map((project) => (
                <div key={project.title} className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-3">
                      <p className="text-lg font-light text-[var(--text-primary)]">{project.title}</p>
                      <span className="text-[10px] font-medium text-[var(--text-primary)] bg-[var(--bg-secondary)] border border-[var(--border)] px-2 py-0.5 rounded-full">
                        {project.status}
                      </span>
                    </div>
                    <p className="text-sm text-[var(--text-muted)]">{project.subtitle}</p>
                    <p className="text-sm text-[var(--text-secondary)] mt-2 leading-relaxed">{project.desc}</p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {project.tags.map((tag) => (
                        <span key={tag} className="text-[10px] text-[var(--text-muted)] font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Capabilities */}
          <section className="mb-12">
            <h2 className="text-sm font-medium text-[var(--text-muted)] tracking-wide border-b border-[var(--border)] pb-3 mb-6">
              Capabilities
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {skills.map((group) => (
                <div key={group.category}>
                  <p className="text-xs text-[var(--text-muted)] mb-3">{group.category}</p>
                  <div className="space-y-2">
                    {group.items.map((item) => (
                      <p key={item} className="text-sm text-[var(--text-secondary)]">{item}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Education */}
          <section className="mb-12">
            <h2 className="text-sm font-medium text-[var(--text-muted)] tracking-wide border-b border-[var(--border)] pb-3 mb-6">
              Education
            </h2>
            <div className="space-y-6">
              {education.map((item) => (
                <div key={item.title} className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                  <div>
                    <p className="text-lg font-light text-[var(--text-primary)]">{item.title}</p>
                    <p className="text-sm text-[var(--text-muted)]">{item.degree}</p>
                  </div>
                  <span className="text-xs text-[var(--text-muted)] whitespace-nowrap">{item.period}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Achievements */}
          <section className="mb-12">
            <h2 className="text-sm font-medium text-[var(--text-muted)] tracking-wide border-b border-[var(--border)] pb-3 mb-6">
              Achievements
            </h2>
            {achievements.map((item) => (
              <div key={item.title}>
                <p className="text-lg font-light text-[var(--text-primary)]">{item.title}</p>
                <p className="text-sm text-[var(--text-muted)]">{item.subtitle}</p>
                <p className="text-sm text-[var(--text-secondary)] mt-2 leading-relaxed">{item.desc}</p>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 text-sm text-[var(--text-primary)] border-b border-[var(--text-primary)] pb-0.5 hover:text-[var(--text-muted)] hover:border-[var(--text-muted)] transition-colors"
                >
                  Read official news ↗
                </a>
              </div>
            ))}
          </section>

          {/* Interests */}
          <section className="mb-12">
            <h2 className="text-sm font-medium text-[var(--text-muted)] tracking-wide border-b border-[var(--border)] pb-3 mb-6">
              Interests
            </h2>
            <p className="text-sm text-[var(--text-secondary)]">{interests.join(", ")}</p>
          </section>

          {/* Referees */}
          <section>
            <h2 className="text-sm font-medium text-[var(--text-muted)] tracking-wide border-b border-[var(--border)] pb-3 mb-6">
              Referees
            </h2>
            <div className="space-y-6">
              {referees.map((ref) => (
                <div key={ref.name} className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                  <div>
                    <p className="text-lg font-light text-[var(--text-primary)]">{ref.name}</p>
                    <p className="text-sm text-[var(--text-muted)]">{ref.role}</p>
                  </div>
                  <span className="text-xs text-[var(--text-muted)] whitespace-nowrap">{ref.phone}</span>
                </div>
              ))}
            </div>
          </section>
        </motion.div>
      </div>
    </main>
  );
}
