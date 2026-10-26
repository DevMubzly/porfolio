"use client";

import { Printer } from "lucide-react";

const experience: { title: string; company: string; period: string; desc: string; points?: string[] }[] = [
  {
    title: "Software Engineer",
    company: "Tricsoft Technologies Ltd",
    period: "June 2026 - September 2026",
    desc: "Founding full-stack engineer on a multi-tenant immersive learning platform, taking it from requirements and architecture through to delivery across database, API, and user interface.",
    points: [
      "Strengthened login security by keeping admin accounts fully separate from regular users, each with its own login system, plus safe session refresh and login rate limiting.",
      "Built school and classroom management (creating schools, inviting members, joining classes with a code, pausing or reactivating students) with a review flow where learning materials get approved before publishing, teachers assign work, students submit it, and teachers grade it with instant notifications.",
      "Delivered the content library used by teachers, schools, and admins, supporting both in-browser 3D scenes and uploaded WebGL builds with previews, one-click importing, and fast tile-based browsing.",
      "Built a desktop app for rendering 3D scenes, similar to EON XR, packaged for both Windows and Linux (AppImage) so students can explore experiences outside the browser.",
    ],
  },
  {
    title: "Lead Full-Stack Mobile Engineer",
    company: "Metro Fried Chicken by Chello",
    period: "June 2025 - December 2025",
    desc: "Leading the end-to-end development of a cross-platform mobile ordering application using React Native, Expo, and Zustand. Focusing on a seamless food ordering experience with menu browsing, cart management, and order tracking.",
    points: [
      "Built a kitchen display system (KDS) with a kanban-style board and a clean, smooth interface so kitchen staff can track and progress orders in real time.",
    ],
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
    subtitle: "E-commerce platform",
    desc: "A business operation system that organizes merchant inventory and exposes it as a store, Shopify-style. Built with Node.js, React, PostgreSQL, and deployed on Cloudflare.",
    tags: ["Node.js", "React", "PostgreSQL", "Cloudflare"],
    url: "https://salastores.com",
  },
  {
    title: "EdgeKeeper",
    subtitle: "Visual Algorithmic Trading Platform",
    desc: "A sophisticated no-code platform for building, backtesting, and deploying automated trading strategies using a visual node-based interface.",
    tags: ["Next.js", "TypeScript", "Python", "WebSockets"],
    url: "https://edgekeeper.app",
  },
  {
    title: "Fortress",
    subtitle: "Enterprise LLM Deployment Platform",
    desc: "Open-source platform designed for running large language models on-premises with strict security, auditing, and compliance safeguards built-in.",
    tags: ["FastAPI", "Docker", "Next.js", "Prometheus", "Nginx", "React", "TypeScript", "Ollama"],
    url: "https://fortress-stack.tech",
  },
];

const skills = [
  { category: "Frontend", items: ["React", "React Native", "Next.js", "TypeScript", "Tailwind CSS"] },
  { category: "Backend", items: ["Node.js", "NestJS", "Python", "FastAPI", "PostgreSQL"] },
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

const interests = ["Building innovations", "music", "swimming", "football", "table tennis", "being a huge anime fan", "playing a lot of PUBG and CODM"];

const referees = [
  { name: "Mr. Baguma Asuman", phone: "+256701988620", role: "Systems Officer, Ministry of Finance, Planning and Economic Development" },
  { name: "Mr. Buri Gershom", phone: "+256773635525", role: "Lecturer, Mbarara University of Science and Technology" },
  { name: "Muhesi Joyce", phone: "+256784789636", role: "Nursing Officer In-Charge, Maternity Ward, Fort Portal Regional Referral Hospital" },
];

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[13px] font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-400 pb-1 mb-3">
      {children}
    </h2>
  );
}

export default function CVPage() {
  return (
    <main className="min-h-screen bg-white text-neutral-900 pt-28 pb-16 px-6 print:pt-0 print:pb-0 print:px-0">
      <div className="max-w-3xl mx-auto">
        {/* Download PDF Button */}
        <div className="flex justify-end mb-8 print:hidden">
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-neutral-300 bg-neutral-100 text-xs font-medium text-neutral-600 hover:text-neutral-900 hover:border-neutral-400 transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            Download PDF
          </button>
        </div>

        {/* Header */}
        <header>
          <h1 className="text-3xl font-bold uppercase tracking-wide">Balinda Mubarak</h1>
          <p className="text-[15px] font-semibold uppercase tracking-wide mt-1">Developer</p>
          <div className="border-b-[3px] border-neutral-900 mt-2 pt-1">
            <p className="text-[13px] pb-2">
              +256771050357 | bmubs15@gmail.com | https://bmubarak.xyz
            </p>
          </div>
        </header>

        {/* Profile */}
        <section className="mt-8">
          <SectionTitle>Profile</SectionTitle>
          <p className="text-sm leading-relaxed">
            I am a developer focused on building elegant web applications and intelligent AI-powered systems. I specialize in crafting minimal, resilient architectures from backend infrastructure down to the frontend user experience.
          </p>
        </section>

        {/* Experience */}
        <section className="mt-10">
          <SectionTitle>Professional Experience</SectionTitle>
          <div className="space-y-4">
            {experience.map((item) => (
              <div key={item.title}>
                <div className="flex items-baseline justify-between gap-4">
                  <p className="text-[15px] font-medium">
                    {item.title} - {item.company}
                  </p>
                  <span className="text-[13px] whitespace-nowrap shrink-0">{item.period}</span>
                </div>
                <p className="text-sm leading-relaxed mt-1">{item.desc}</p>
                {item.points && (
                  <ul className="mt-1 space-y-1 list-disc pl-5">
                    {item.points.map((point) => (
                      <li key={point.slice(0, 24)} className="text-sm leading-relaxed">
                        {point}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Selected Works */}
        <section className="mt-10">
          <SectionTitle>Selected Works</SectionTitle>
          <div className="space-y-4">
            {projects.map((project) => (
              <div key={project.title}>
                <p className="text-[15px] font-medium">
                  {project.title} - {project.subtitle}
                </p>
                <p className="text-sm leading-relaxed mt-1">{project.desc}</p>
                <p className="text-[13px] mt-1">
                  <a href={project.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
                    {project.url.replace("https://", "")}
                  </a>
                  {" | "}
                  {project.tags.join(", ")}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Capabilities */}
        <section className="mt-10">
          <SectionTitle>Professional Skills</SectionTitle>
          <ul className="space-y-1 list-disc pl-5">
            {skills.map((group) => (
              <li key={group.category} className="text-sm leading-relaxed">
                <span className="font-medium">{group.category}:</span> {group.items.join(", ")}
              </li>
            ))}
          </ul>
        </section>

        {/* Education */}
        <section className="mt-10">
          <SectionTitle>Education</SectionTitle>
          <div className="space-y-3">
            {education.map((item) => (
              <div key={item.title}>
                <div className="flex items-baseline justify-between gap-4">
                  <p className="text-[15px] font-medium">{item.degree}</p>
                  <span className="text-[13px] whitespace-nowrap shrink-0">{item.period}</span>
                </div>
                <p className="text-sm">{item.title}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Achievements */}
        <section className="mt-10">
          <SectionTitle>Achievements</SectionTitle>
          {achievements.map((item) => (
            <div key={item.title}>
              <p className="text-[15px] font-medium">
                {item.title} - {item.subtitle}
              </p>
              <p className="text-sm leading-relaxed mt-1">{item.desc}</p>
              <p className="text-[13px] mt-1">
                <a href={item.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
                  Read official news
                </a>
              </p>
            </div>
          ))}
        </section>

        {/* Interests */}
        <section className="mt-10">
          <SectionTitle>Interests</SectionTitle>
          <p className="text-sm leading-relaxed">{interests.join(", ")}</p>
        </section>

        {/* Referees */}
        <section className="mt-10">
          <SectionTitle>Referees</SectionTitle>
          <div className="space-y-3">
            {referees.map((ref) => (
              <div key={ref.name}>
                <div className="flex items-baseline justify-between gap-4">
                  <p className="text-[15px] font-medium">{ref.name}</p>
                  <span className="text-[13px] whitespace-nowrap shrink-0">{ref.phone}</span>
                </div>
                <p className="text-sm">{ref.role}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
