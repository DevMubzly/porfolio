"use client";

import { Printer } from "lucide-react";

const experience: { title: string; company?: string; period: string; desc?: string; points?: string[] }[] = [
  {
    title: "Assistant Store Manager",
    company: "GBK Grain Milling Co. Limited",
    period: "October 2026 - Present",
    desc: "Assisting in running the store and production side of a grain milling company, from maize flour production through to what leaves the yard.",
    points: [
      "Oversee the production of maize flour and other milled products, keeping output and quality consistent.",
      "Manage store workers, assigning duties and keeping day-to-day store operations running smoothly.",
      "Responsible for security and accuracy of production, safeguarding stock and checking that what is recorded matches what is produced.",
    ],
  },
  {
    title: "Office & Operations Assistant",
    company: "Rotim Gorilla Tours and Travel, Kabale",
    period: "June 2026 - Present",
    points: [
      "Prepared and organised client travel itineraries and operational documents.",
      "Processed tour bookings and maintained accurate booking records.",
      "Supported daily office operations and ensured timely completion of administrative tasks.",
      "Utilised Microsoft Office applications for documentation, reporting, and record keeping.",
    ],
  },
  {
    title: "Intern Data Clerk",
    company: "National Identification and Registration Authority (NIRA), Kabale",
    period: "June 2025 - July 2025",
    points: [
      "Assisted in data entry and updating citizen registration records.",
      "Verified and maintained accuracy of information within databases.",
      "Organised and managed digital and physical records.",
      "Assisted clients during registration and information verification processes.",
      "Ensured confidentiality and security of sensitive personal information.",
      "Supported administrative and record management activities within the office.",
    ],
  },
];

const skills = [
  { category: "Databases", items: ["Database Management Systems", "MySQL", "Microsoft Access"] },
  { category: "IT Support", items: ["IT Support", "Systems Analysis", "Computer Maintenance"] },
  { category: "Office Tools", items: ["Microsoft Word", "Microsoft Excel", "Microsoft PowerPoint", "Microsoft Access"] },
  {
    category: "Core IT",
    items: ["Windows Operating Systems", "Networking Fundamentals", "Information Systems Management", "Data Entry and Records Management"],
  },
];

const personalSkills = [
  { category: "Working Style", items: ["Strong analytical and problem-solving skills", "Attention to detail", "Time management and organisation"] },
  { category: "Communication", items: ["Excellent communication skills", "Interpersonal skills", "Teamwork and collaboration"] },
  { category: "Growth", items: ["Adaptability and willingness to learn", "Integrity and professionalism"] },
  { category: "Administration", items: ["Office administration"] },
];

const education = [
  { title: "Mbarara University of Science and Technology (MUST)", period: "2023 - To date", degree: "Bachelor of Information Technology" },
  { title: "St. Mary's College Rushoroza", period: "2020 - 2022", degree: "Uganda Advanced Certificate of Education (UACE)" },
  { title: "St. Mary's College Rushoroza", period: "2017 - 2019", degree: "Uganda Certificate of Education (UCE)" },
];

const achievements = [
  {
    title: "Member of the Winning Hackathon Team",
    subtitle: "Industry 4.0+ Hackathon for the ABQ Launch",
    desc: "Recognised as part of the team that won the Industry 4.0+ Hackathon for the ABQ Launch, contributing to a strong innovation-focused solution that earned top recognition.",
    url: "https://www.must.ac.ug/must-students-sweep-top-spots-at-the-national-industry-4-0-hackathon/",
  },
];

const interests = ["Technology and innovation", "Research and learning new IT skills", "reading", "community service", "content creation"];

const referees = [
  { name: "Balinda Mubarak", phone: "0771050357", role: "Software Engineer, Tricsoft Technologies Ltd" },
  { name: "Ismail Athman", phone: "0740112642", role: "Assistant ICT Officer, Software and Web Developments, USJM" },
  { name: "Mubiru Lasto", phone: "0702191349", role: "Lecturer, USJM" },
];

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[13px] font-bold uppercase tracking-wider text-neutral-900 border-b border-neutral-400 pb-1 mb-3">
      {children}
    </h2>
  );
}

export default function CVPreciousPage() {
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
          <h1 className="text-3xl font-bold uppercase tracking-wide">Namanya Precious</h1>
          <p className="text-[15px] font-semibold uppercase tracking-wide mt-1">Information Technology</p>
          <div className="border-b-[3px] border-neutral-900 mt-2 pt-1">
            <p className="text-[13px] pb-2">
              0774109597 / 074415672 | namanyapk@gmail.com | Kakiika, Mbarara, Uganda
            </p>
          </div>
        </header>

        {/* Profile */}
        <section className="mt-7">
          <SectionTitle>Profile</SectionTitle>
          <p className="text-sm leading-relaxed">
            A motivated and detail-oriented Information Technology student at Mbarara University of Science and Technology (MUST) with practical experience in IT support, systems administration, database management, and office administration. Experienced in managing documentation, coordinating operations, and preparing travel itineraries while maintaining high standards of accuracy and organisation. Strong analytical, problem-solving, and communication skills, with the ability to adapt quickly to new technologies and work efficiently in team environments.
          </p>
        </section>

        {/* Experience */}
        <section className="mt-7">
          <SectionTitle>Professional Experience</SectionTitle>
          <div className="space-y-4">
            {experience.map((item) => (
              <div key={item.title}>
                <div className="flex items-baseline justify-between gap-4">
                  <p className="text-[15px] font-medium">
                    {item.title}
                    {item.company ? ` - ${item.company}` : ""}
                  </p>
                  <span className="text-[13px] whitespace-nowrap shrink-0">{item.period}</span>
                </div>
                {item.desc && <p className="text-sm leading-relaxed mt-1">{item.desc}</p>}
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

        {/* Technical Skills */}
        <section className="mt-7">
          <SectionTitle>Technical Skills</SectionTitle>
          <ul className="space-y-1 list-disc pl-5">
            {skills.map((group) => (
              <li key={group.category} className="text-sm leading-relaxed">
                <span className="font-medium">{group.category}:</span> {group.items.join(", ")}
              </li>
            ))}
          </ul>
        </section>

        {/* Personal Skills */}
        <section className="mt-7">
          <SectionTitle>Personal Skills</SectionTitle>
          <ul className="space-y-1 list-disc pl-5">
            {personalSkills.map((group) => (
              <li key={group.category} className="text-sm leading-relaxed">
                <span className="font-medium">{group.category}:</span> {group.items.join(", ")}
              </li>
            ))}
          </ul>
        </section>

        {/* Education */}
        <section className="mt-7">
          <SectionTitle>Education</SectionTitle>
          <div className="space-y-2">
            {education.map((item) => (
              <div key={item.degree}>
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
        <section className="mt-7">
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
        <section className="mt-7">
          <SectionTitle>Interests</SectionTitle>
          <p className="text-sm leading-relaxed">{interests.join(", ")}</p>
        </section>

        {/* Referees */}
        <section className="mt-7">
          <SectionTitle>Referees</SectionTitle>
          <div className="space-y-2">
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
