"use client";

import { motion } from "motion/react";

const skills = [
  { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
  { category: "Backend", items: ["Node.js", "Python", "FastAPI", "PostgreSQL"] },
  { category: "DevOps", items: ["Docker", "Git", "GitHub Actions", "Nginx"] },
  { category: "AI", items: ["LangChain", "OpenAI API", "Hugging Face", "RAG Systems"] },
];

const experience = [
  {
    title: "Lead Full-Stack Engineer",
    company: "MFC Ordering App",
    period: "2025 - Present",
  },
  {
    title: "BSc Computer Science",
    company: "Mbarara University of Science and Technology",
    period: "2023 - 2026",
  },
  {
    title: "UCE & UACE",
    company: "St. Henry's College Kitovu",
    period: "2016 - 2022",
  },
];

const achievements = [
  {
    title: "Hackathon Winner",
    desc: "1st Place at Industry 4.0+ Hackathon for ABQ Launch",
  },
];

export function AboutSection() {
  return (
    <section id="about" className="relative z-[2] py-24 lg:py-32 px-6 lg:px-24 bg-white text-[#222222] rounded-t-[3rem] lg:rounded-t-[4rem] shadow-[0_-4px_24px_rgba(0,0,0,0.03)] flex flex-col justify-center">
      <div className="max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="space-y-20 lg:space-y-32"
        >
          {/* Main About Block */}
          <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-12 lg:gap-24 relative">
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-light tracking-tight md:w-1/3">
              About
            </h2>
            <div className="md:w-2/3">
              <p className="text-lg sm:text-xl md:text-3xl text-[#7B7B7B] font-light leading-relaxed max-w-3xl">
                I&apos;m a developer from Uganda focused on building web applications and AI-powered systems.
                I enjoy working across the stack, from designing interfaces to building backend infrastructure.
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-20 lg:gap-32">
            {/* Skills */}
            <div className="space-y-12">
              <h3 className="text-sm font-medium text-[#222222] uppercase tracking-widest border-b border-[#E5E5E5] pb-4">
                Skills & Technologies
              </h3>
              <div className="grid grid-cols-2 gap-y-10 gap-x-8">
                {skills.map((group) => (
                  <div key={group.category}>
                    <p className="text-sm text-[#222222] uppercase tracking-wider mb-6 font-medium">
                      {group.category}
                    </p>
                    <ul className="space-y-3">
                      {group.items.map((skill) => (
                        <li
                          key={skill}
                          className="text-base text-[#7B7B7B] font-light"
                        >
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Experience & Education */}
            <div className="space-y-16">
              <div className="space-y-12">
                <h3 className="text-sm font-medium text-[#222222] uppercase tracking-widest border-b border-[#E5E5E5] pb-4">
                  Experience & Education
                </h3>
                <div className="space-y-10">
                  {experience.map((item) => (
                    <div key={item.title} className="group flex flex-col gap-2">
                      <p className="text-sm text-[#7B7B7B] tracking-wide uppercase font-medium">
                        {item.period}
                      </p>
                      <p className="text-2xl lg:text-3xl font-light text-[#222222]">
                        {item.title}
                      </p>
                      <p className="text-lg text-[#7B7B7B] font-light">
                        {item.company}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Achievements */}
              <div className="space-y-12 pt-8 border-t border-[#E5E5E5]">
                <h3 className="text-sm font-medium text-[#222222] uppercase tracking-widest border-b border-[#E5E5E5] pb-4">
                  Achievements
                </h3>
                <div className="space-y-10">
                  {achievements.map((item) => (
                    <div key={item.title} className="group flex flex-col gap-2">
                      <p className="text-2xl lg:text-3xl font-light text-[#222222]">
                        {item.title}
                      </p>
                      <p className="text-lg text-[#7B7B7B] font-light">
                        {item.desc}{" "}
                        <a 
                          href="https://www.must.ac.ug/must-students-sweep-top-spots-at-the-national-industry-4-0-hackathon/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[#222222] hover:text-[#7B7B7B] border-b border-[#222222] hover:border-[#7B7B7B] transition-colors ml-1"
                        >
                          Read the Official News <span className="text-xs">↗</span>
                        </a>
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
