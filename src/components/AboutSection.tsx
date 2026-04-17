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
          className="space-y-16 lg:space-y-24"
        >
          {/* Main About Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between pb-12 lg:pb-16 gap-6 lg:gap-8 border-b border-[#E5E5E5]">
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-light tracking-tight">
              About
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-[#7B7B7B] font-light max-w-lg md:text-right pb-2 leading-relaxed">
              I'm a developer from Uganda focused on building elegant web applications and intelligent AI-powered systems.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 pt-4">
            
            {/* Experience list */}
            <div className="lg:col-span-7 space-y-12">
              <h3 className="text-xs font-medium text-[#7B7B7B] uppercase tracking-widest mb-8">
                Experience & Education
              </h3>
              <div className="flex flex-col">
                {experience.map((item, index) => (
                  <div 
                    key={item.title} 
                    className={`group flex flex-col md:flex-row md:items-start justify-between py-8 md:py-10 border-[#E5E5E5] gap-4 transition-all duration-300 ${index !== 0 ? 'border-t' : ''}`}
                  >
                    <div className="flex flex-col gap-2 flex-1">
                      <p className="text-2xl md:text-3xl font-light text-[#222222] group-hover:translate-x-2 transition-transform duration-500">
                        {item.title}
                      </p>
                      <p className="text-base text-[#7B7B7B] font-light">
                        {item.company}
                      </p>
                    </div>
                    <div className="mt-2 md:mt-1">
                      <span className="inline-block px-3 py-1 bg-[#F8F8F8] border border-[#E5E5E5] rounded-full text-[10px] sm:text-xs font-medium tracking-widest text-[#222222] uppercase">
                        {item.period}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills block */}
            <div className="lg:col-span-5 space-y-12">
              <h3 className="text-xs font-medium text-[#7B7B7B] uppercase tracking-widest mb-8 border-b border-[#E5E5E5] pb-8">
                Capabilities
              </h3>
              <div className="flex flex-col gap-12">
                {skills.map((group) => (
                  <div key={group.category} className="group">
                    <p className="text-sm text-[#222222] uppercase tracking-widest mb-6 font-medium">
                      {group.category}
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {group.items.map((skill) => (
                        <span
                          key={skill}
                          className="px-4 py-2 bg-white border border-[#E5E5E5] rounded-full text-sm text-[#7B7B7B] font-light group-hover:border-[#222222] group-hover:text-[#222222] transition-colors duration-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Mini Achievements section */}
              <div className="pt-12 mt-12 border-t border-[#E5E5E5]">
                <h3 className="text-xs font-medium text-[#7B7B7B] uppercase tracking-widest mb-8">
                  Recognition
                </h3>
                <div className="flex flex-col gap-6">
                  {achievements.map((item) => (
                    <div key={item.title} className="group">
                      <p className="text-xl font-light text-[#222222] mb-2">{item.title}</p>
                      <p className="text-sm text-[#7B7B7B] font-light leading-relaxed">
                        {item.desc}{" "}
                        <a 
                          href="https://www.must.ac.ug/must-students-sweep-top-spots-at-the-national-industry-4-0-hackathon/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[#222222] hover:text-[#7B7B7B] transition-colors mt-2"
                        >
                          <span className="border-b border-[#222222] group-hover:border-[#7B7B7B] pb-0.5">Read passing</span> <span className="text-xs">↗</span>
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
