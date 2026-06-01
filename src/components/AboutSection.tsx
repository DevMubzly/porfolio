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
    title: "Lead Full-Stack Mobile Engineer",
    company: "MFC Ordering App",
    period: "2025 - Dec 26th",
  },
  {
    title: "IT Intern",
    company: "Ministry of Finance, Planning and Economic Development",
    period: "June 2025 - Aug 2025",
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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const slideInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export function AboutSection() {
  return (
    <section id="about" className="relative z-[2] py-24 lg:py-32 px-6 lg:px-24 bg-white text-[#222222] rounded-t-[3rem] lg:rounded-t-[4rem] shadow-[0_-4px_24px_rgba(0,0,0,0.03)] flex flex-col justify-center">
      <div className="max-w-7xl mx-auto w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="space-y-16 lg:space-y-24"
        >
          <motion.div variants={slideInLeft} className="flex flex-col md:flex-row md:items-end justify-between pb-12 lg:pb-16 gap-6 lg:gap-8 border-b border-[#E5E5E5]">
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-light tracking-tight">
              About Me
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-[#7B7B7B] font-light max-w-lg md:text-right pb-2 leading-relaxed">
              I&apos;m a developer from Uganda focused on building elegant web applications and intelligent AI-powered systems.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 pt-4">
            
            <motion.div variants={slideInLeft} className="lg:col-span-7 space-y-24">
              
              <motion.div variants={slideInLeft} className="space-y-12">
                <motion.h3 variants={slideInLeft} className="text-xs font-medium text-[#7B7B7B] uppercase tracking-widest border-b border-[#E5E5E5] pb-4">
                  Experience & Education
                </motion.h3>
                <div className="flex flex-col gap-12">
                  {experience.map((item, i) => (
                    <motion.div
                      key={item.title}
                      variants={slideInLeft}
                      custom={i}
                      className="group flex flex-col md:flex-row md:items-start justify-between gap-4 transition-all duration-300"
                    >
                      <div className="flex flex-col gap-2 flex-1 relative">
                        <p className="text-2xl md:text-3xl font-light text-[#222222] group-hover:translate-x-2 transition-transform duration-500">
                          {item.title}
                        </p>
                        <p className="text-base text-[#7B7B7B] font-light">
                          {item.company}
                        </p>
                      </div>
                      <div className="mt-2 md:mt-1">
                        <span className="text-[10px] sm:text-xs font-medium tracking-widest text-[#7B7B7B] uppercase">
                          {item.period}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div variants={slideInLeft} className="space-y-12 pt-12 border-t border-[#E5E5E5]">
                <motion.h3 variants={slideInLeft} className="text-xs font-medium text-[#7B7B7B] uppercase tracking-widest border-b border-[#E5E5E5] pb-4">
                  Recognition
                </motion.h3>
                <div className="flex flex-col gap-12">
                  {achievements.map((item) => (
                    <motion.div key={item.title} variants={slideInLeft} className="group">
                      <p className="text-2xl md:text-3xl font-light text-[#222222] mb-3 group-hover:translate-x-2 transition-transform duration-500">
                        {item.title}
                      </p>
                      <div className="text-base text-[#7B7B7B] font-light leading-relaxed flex flex-col gap-2 items-start mt-2">
                        <p>{item.desc}</p>
                        <a 
                          href="https://www.must.ac.ug/must-students-sweep-top-spots-at-the-national-industry-4-0-hackathon/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[#222222] hover:text-[#7B7B7B] transition-colors"
                        >
                          <span className="border-b border-[#222222] hover:border-[#7B7B7B] pb-0.5 transition-colors">Read official news</span> <span className="text-xs">↗</span>
                        </a>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

            </motion.div>

            <motion.div variants={slideInLeft} className="lg:col-span-5 space-y-12">
              <motion.h3 variants={slideInLeft} className="text-xs font-medium text-[#7B7B7B] uppercase tracking-widest border-b border-[#E5E5E5] pb-4">
                Capabilities
              </motion.h3>
              <div className="flex flex-col gap-12">
                {skills.map((group) => (
                  <motion.div key={group.category} variants={slideInLeft} className="group">
                    <p className="text-[10px] text-[#A0A0A0] uppercase tracking-widest mb-5 font-medium">
                      {group.category}
                    </p>
                    <div className="flex flex-wrap gap-2 sm:gap-3">
                      {group.items.map((item) => (
                        <span 
                          key={item} 
                          className="px-4 py-2 rounded-none border border-[#E5E5E5] text-[#222222] text-sm sm:text-base font-light hover:bg-[#222222] hover:text-white hover:border-[#222222] transition-colors duration-300 cursor-default"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
