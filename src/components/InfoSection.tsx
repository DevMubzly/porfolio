import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { createPortal } from "react-dom";
import { NetworkLines } from "./NetworkLines";
import { ConnectWhorly } from "./ConnectWhorly";
import { AnimatedName } from "./AnimatedName";
import { SocialRail } from "./SocialRail";
// Shared custom cubic-bezier easing (typed so Framer's TS accepts it)
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
import React from "react";

interface SkillCategory {
  label: string;
  items: string[];
}

const skillCategories: SkillCategory[] = [
  {
    label: 'Frontend',
    items: [
      'React',
      'Tailwind CSS',
      'Next.js',
      'TypeScript',
      'Performance Optimisation'
    ]
  },
  {
    label: 'Backend',
    items: [
      'Node.js',
      'REST APIs',
      'PostgreSQL & SQL',
      'Express.js',
      'Hono.js',
      'Next.js'
    ]
  },
  {
    label: 'AI / ML',
    items: [
      'LLM Integrations',
      'Prompt Engineering',
      'LangChain'
    ]
  },
  {
    label: 'Blockchain',
    items: [
      'Smart Contract Basics (Solidity)',
      'Ethers.js',
      'Wallet Integration',
    ]
  }
];

// Inline monochrome SVG icons (minimal, high‑tech style)
const Icon = {
  typescript: (
    <svg viewBox="0 0 24 24" className="w-4 h-4" aria-hidden="true"><rect width="24" height="24" rx="4" fill="#2f74c0"/><path fill="#fff" d="M10.6 8.7h6.8v2.1h-2.3v6.5h-2.2v-6.5h-2.3V8.7Zm-5.2 2.2c0-1.5 1.1-2.4 2.8-2.4 1.3 0 2.4.5 3.1 1.5l-1.6 1.2c-.4-.6-.9-.9-1.5-.9-.7 0-1.1.3-1.1.8 0 1.7 4.3.8 4.3 3.9 0 1.6-1.4 2.6-3.2 2.6-1.5 0-2.8-.6-3.5-1.9l1.7-1.1c.3.7 1 1.2 1.8 1.2.6 0 1.1-.3 1.1-.9 0-1.6-4.3-.8-4.3-3.9Z"/></svg>
  ),
  react: (
    <svg viewBox="0 0 24 24" className="w-4 h-4" aria-hidden="true"><circle cx="12" cy="12" r="2.4" fill="#61dafb"/><g stroke="#61dafb" strokeWidth="1.3" fill="none"><ellipse cx="12" cy="12" rx="10" ry="4.6"/><ellipse cx="12" cy="12" rx="10" ry="4.6" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4.6" transform="rotate(120 12 12)"/></g></svg>
  ),
  next: (
    <svg viewBox="0 0 24 24" className="w-4 h-4" aria-hidden="true"><rect width="24" height="24" rx="4" fill="#111"/><path d="M9.5 7h2.1v10H9.5z" fill="#fff"/><path d="M13 7h2l2.9 5v5h-2.1v-4.2L13 7Z" fill="#fff"/></svg>
  ),
  tailwind: (
    <svg viewBox="0 0 24 24" className="w-4 h-4" aria-hidden="true"><path fill="#38bdf8" d="M12 6.5c-3.2 0-5.2 1.6-6 4.9.9-1.6 2.1-2.2 3.7-1.8 1 .3 1.7 1.1 2.5 1.9 1.3 1.4 2.7 2.9 5.8 2.9 3.2 0 5.2-1.6 6-4.9-.9 1.6-2.1 2.2-3.7 1.8-1-.3-1.7-1.1-2.5-1.9C16.5 8 15.1 6.5 12 6.5Z"/></svg>
  ),
  node: (
    <svg viewBox="0 0 24 24" className="w-4 h-4" aria-hidden="true"><path fill="#3c873a" d="M12.1 2 3 7.2v9.6l9.1 5.2 9.1-5.2V7.2L12.1 2Zm4.6 13.2c0 2-1.2 2.9-3.1 2.9-.9 0-1.6-.2-2.2-.6-.1-.1-.2-.2-.2-.4v-1.3c0-.3.2-.5.5-.5h.3c.1 0 .2 0 .3.1.5.3.9.4 1.4.4.7 0 1-.3 1-.9 0-.5-.3-.8-1.4-1.2-1.8-.6-2.6-1.3-2.6-2.7 0-1.8 1.2-2.8 3-2.8.9 0 1.5.1 2.1.4.2.1.3.3.3.4v1.2c0 .3-.2.5-.5.5h-.3l-.3-.1c-.4-.2-.7-.3-1.3-.3-.6 0-.9.3-.9.8 0 .5.4.7 1.5 1.1 1.7.6 2.5 1.3 2.5 2.8Z"/></svg>
  ),
  postgres: (
    <svg viewBox="0 0 24 24" className="w-4 h-4" aria-hidden="true"><path fill="#336791" d="M12 3c-4.2 0-7.6 1.9-7.6 4.2 0 1.1.9 2.1 2.4 2.9-.1.5-.4 1-.9 1.5-.4.4-.3.8.3.8 1.1 0 2-.4 2.6-.8.9.2 1.9.3 3 .3s2.1-.1 3-.3c.6.4 1.5.8 2.6.8.6 0 .7-.4.3-.8-.5-.5-.8-1-.9-1.5 1.5-.8 2.4-1.8 2.4-2.9C19.6 4.9 16.2 3 12 3Z"/></svg>
  ),
  prisma: (
    <svg viewBox="0 0 24 24" className="w-4 h-4" aria-hidden="true"><path fill="#0c344b" d="M17 20.5 4.6 15.4a.7.7 0 0 1-.2-1.2L14.7 3.5a.7.7 0 0 1 1.1.3l4.6 13a.7.7 0 0 1-.4.9l-2.5 1Z"/></svg>
  ),
  redis: (
    <svg viewBox="0 0 24 24" className="w-4 h-4" aria-hidden="true"><rect width="24" height="24" rx="4" fill="#a41e11"/><path fill="#fff" d="M7 10.5 12 9l5 1.5-5 1.6-5-1.6Zm0 3 5-1.5 5 1.5-5 1.5-5-1.5Z"/></svg>
  ),
  docker: (
    <svg viewBox="0 0 24 24" className="w-4 h-4" aria-hidden="true"><path fill="#2496ed" d="M4 13h16.2c.2-.6.3-1.2.3-1.8 0-.6-.1-1.2-.2-1.7h-2.4V7.5h-2.6v2H13V7.5h-2.6v2H7.9V7.5H5.3v4.3H3.5c-.2.6-.3 1.1-.3 1.7 0 2.9 1.9 5 5.2 5 3.8 0 6.2-1.7 7.7-4.3H4c-.4-.6-.6-1.2-.6-1.7Z"/></svg>
  ),
  vercel: (
    <svg viewBox="0 0 24 24" className="w-4 h-4" aria-hidden="true"><path fill="#000" d="m12 5 8 14H4l8-14Z"/></svg>
  ),
  cloudflare: (
    <svg viewBox="0 0 24 24" className="w-4 h-4" aria-hidden="true"><path fill="#f38020" d="M16.5 9.2a4.9 4.9 0 0 0-9.6 1.2v.2A3.6 3.6 0 0 0 4 14.1h14.4c1.6 0 2.9-1.3 2.9-3 0-1.5-1.2-2.8-2.7-2.9-.5-2-2.3-3.5-4.4-3.5Z"/></svg>
  ),
  figma: (
    <svg viewBox="0 0 24 24" className="w-4 h-4" aria-hidden="true"><path fill="#0acf83" d="M10.5 21a3 3 0 0 0 3-3v-3h-3a3 3 0 1 0 0 6Z"/><path fill="#a259ff" d="M7.5 12a3 3 0 1 1 0-6h3v6h-3Z"/><path fill="#f24e1e" d="M10.5 12h3V6h-3z"/><path fill="#ff7262" d="M13.5 12h3a3 3 0 1 1 0 6h-3v-6Z"/><path fill="#1abcfe" d="M10.5 3h3v3h-3z"/></svg>
  ),
  langchain: (
    <svg viewBox="0 0 24 24" className="w-4 h-4" aria-hidden="true"><rect x="3" y="3" width="7" height="7" rx="2" fill="#0b0b0b"/><rect x="14" y="3" width="7" height="7" rx="2" fill="#0b0b0b"/><rect x="3" y="14" width="7" height="7" rx="2" fill="#0b0b0b"/><rect x="14" y="14" width="7" height="7" rx="2" fill="#0b0b0b"/><path stroke="#0b0b0b" strokeWidth="1.5" d="M7 10.5v3M17 10.5v3M10.5 7h3M10.5 17h3"/></svg>
  ),
  solidity: (
    <svg viewBox="0 0 24 24" className="w-4 h-4" aria-hidden="true"><path fill="#333" d="m7.7 3 4.3 7.5H5.4L7.7 3Zm4.3 7.5L9.4 18H4.3l3.1-7.5h4.6Zm1.4 0L17.7 3h-5.1L13.4 10.5Zm0 0H18l-3.2 7.5h-5.1l3.7-7.5Z"/></svg>
  ),
  ethers: (
    <svg viewBox="0 0 24 24" className="w-4 h-4" aria-hidden="true"><path fill="#000" d="M12 3 6 12l6 3 6-3-6-9Zm0 20 6-8-6 3-6-3 6 8Z"/></svg>
  ),
  express: (
    <svg viewBox="0 0 24 24" className="w-4 h-4" aria-hidden="true"><rect width="24" height="24" rx="4" fill="#111"/><text x="5" y="16" fontSize="8" fill="#fff" fontFamily="'Inter',sans-serif">ex</text></svg>
  ),
  hono: (
    <svg viewBox="0 0 24 24" className="w-4 h-4" aria-hidden="true"><rect width="24" height="24" rx="4" fill="#f5f5f5"/><path d="M7 16c0-3 2-5.5 5-7.5C14 6.5 15 5 15 4.2c1.8 2 .6 4.2-.6 5.4 2.4.4 3.6 2.2 3.6 4.4A5 5 0 0 1 13 19h-2a4 4 0 0 1-4-3Z" fill="#ff7300" opacity=".85"/></svg>
  ),
  redisCache: null,
};

function getIconsFor(item: string) {
  const icons: React.ReactNode[] = [];
  const push = (k: keyof typeof Icon) => { const ic = Icon[k]; if (ic) icons.push(<span key={k}>{ic}</span>); };
  const lower = item.toLowerCase();
  if (lower.includes('typescript')) push('typescript');
  if (lower.includes('react')) push('react');
  if (lower.includes('next')) push('next');
  if (lower.includes('tailwind')) push('tailwind');
  if (lower.includes('node')) push('node');
  if (lower.includes('postgres')) push('postgres');
  if (lower.includes('prisma')) push('prisma');
  if (lower.includes('redis')) push('redis');
  if (lower.includes('docker')) push('docker');
  if (lower.includes('vercel')) push('vercel');
  if (lower.includes('cloudflare')) push('cloudflare');
  if (lower.includes('figma')) push('figma');
  if (lower.includes('langchain')) push('langchain');
  if (lower.includes('solidity')) push('solidity');
  if (lower.includes('ethers')) push('ethers');
  if (lower.includes('wallet')) push('ethers');
  if (lower.includes('express')) push('express');
  if (lower.includes('hono')) push('hono');
  return icons;
}

interface TimelineItem {
  title: string;
  org: string;
  period: string;
  detail: string;
}

// Hover-based panel system (simplified logic):
// Opens on hover/focus/click of a trigger, stays open while over triggers or modal,
// closes immediately when pointer leaves both (modal handles its own leave detection).
const HoverPanels: React.FC = () => {
  const [active, setActive] = React.useState<'skills' | 'education' | 'experience' | null>(null);
  const triggersRef = React.useRef<HTMLDivElement | null>(null);
  const baseBtn = "relative group px-5 py-3 rounded-full text-xs font-semibold tracking-wider uppercase transition-all focus-ring";
  const closeTimer = React.useRef<number | null>(null);
  const scheduleClose = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setActive(null), 160); // grace window allows travel to modal
  };
  const cancelClose = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = null;
  };
  React.useEffect(() => () => { if (closeTimer.current) window.clearTimeout(closeTimer.current); }, []);

  return (
    <div
      id="hover-triggers"
      className="relative z-10"
      ref={triggersRef}
      onMouseLeave={scheduleClose}
      onMouseEnter={cancelClose}
    >
  <div className="flex flex-wrap gap-3 items-center">
        {(['skills','education','experience'] as const).map(k => {
          const activeState = active === k;
          return (
            <button
              key={k}
              onMouseEnter={() => { if (active !== k) setActive(k); }}
              onFocus={() => { if (active !== k) setActive(k); }}
              onClick={() => { if (active !== k) setActive(k); }}
              className={baseBtn + ' ' + (activeState ? 'glass shadow-lg text-neutral-900' : 'glass text-neutral-500 hover:text-neutral-800')}
            >
              <span className="relative z-10">{k}</span>
              {activeState && <span className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(0,0,0,0.08),transparent_70%)]" />}
            </button>
          );
  })}
  <ConnectWhorly className="flex-shrink-0" label="Let's Connect" />
      </div>
      {active && <HoverPanelModal active={active} setActive={setActive} scheduleClose={scheduleClose} cancelClose={cancelClose} />}
    </div>
  );
};

interface HoverPanelModalProps {
  active: 'skills' | 'education' | 'experience';
  setActive: React.Dispatch<React.SetStateAction<'skills' | 'education' | 'experience' | null>>;
  scheduleClose: () => void;
  cancelClose: () => void;
}

const HoverPanelModal: React.FC<HoverPanelModalProps> = ({ active, setActive, scheduleClose, cancelClose }) => {
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setActive(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [setActive]);

  const content = active === 'skills' ? <SkillsPanel /> : active === 'education' ? <EducationPanel /> : <ExperiencePanel />;

  // Guard SSR: don't attempt to render portal on server (prevents explicit any fallback)
  if (typeof window === 'undefined' || typeof document === 'undefined') return null;

  return createPortal(
    <div
      className="fixed inset-0 z-40 flex items-start justify-center pt-40 md:pt-48 pointer-events-none"
      aria-modal="true" role="dialog"
    >
      <motion.div
        id="hover-panel-modal"
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 6, scale: 0.98 }}
        transition={{ duration: 0.4, ease: EASE }}
        className="pointer-events-auto relative w-[min(100%-2rem,1100px)] max-h-[70vh] overflow-y-auto rounded-2xl bg-white/85 backdrop-blur-xl shadow-xl border border-black/5 p-8 md:p-10 glass"
        onMouseEnter={cancelClose}
        onMouseLeave={scheduleClose}
      >
        <button
          onClick={() => setActive(null)}
          className="absolute top-3 right-3 h-8 w-8 rounded-full flex items-center justify-center text-neutral-500 hover:text-neutral-800 focus-ring"
          aria-label="Close panel"
        >
          ×
        </button>
        {content}
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="pointer-events-none fixed inset-0 bg-gradient-to-b from-white/60 via-white/30 to-white/60 backdrop-blur-sm -z-10" />
    </div>,
    document.body
  );
};

const education: TimelineItem[] = [
  {
    title: 'BSc Computer Science',
    org: 'Mbarara University of Science and Technology',
    period: '2023 – 2026 (Final Year)',
    detail: 'Focus: Data Structures and Algorithms, Applied AI, Web and Mobile Application Development.'
  },
  {
    title: 'UACE (Advanced Level Certificate)',
    org: "St. Henry's College Kitovu",
    period: '2020 – 2022',
    detail: 'Concentrated on Mathematics, Chemistry, and ICT—foundation for software engineering discipline & problem solving.'
  },
  {
    title: 'UCE (O‑Level Certificate)',
    org: "St. Henry's College Kitovu",
    period: '2016 – 2019',
    detail: 'Built strong grounding in sciences & analytical thinking; kick‑started interest in computing.'
  },
];

const experience: TimelineItem[] = [
  {
    title: 'Lead Frontend & Backend Engineer (MFC Ordering App)',
    org: 'Altech Company',
    period: 'June 2025 – Present',
    detail: 'Leading full-stack development of Metro Fried Chicken (MFC) Ordering App: architected React Native (Expo) frontend, TypeScript API layer, state & data flows, and backend services; driving performance, code quality, and feature delivery across ordering, tracking, auth & branch logic.'
  },
  // {
  //   title: 'Full‑Stack / AI Integrations (Freelance)',
  //   org: 'Client projects',
  //   period: '2023 – Present',
  //   detail: 'Built data‑driven web apps, integrated LLM features (RAG, function calling), performance tuning.'
  // },
  // {
  //   title: 'Open Source Contributions',
  //   org: 'GitHub',
  //   period: 'Ongoing',
  //   detail: 'Libraries / experiments around prompt tooling, vector indexing & dev productivity.'
  // },
];

export function InfoSection() {
  const shouldReduce = useReducedMotion();

  const heading = "Crafting high-performance web experiences & intelligent AI integrations.";
  const words = heading.split(/\s+/);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: shouldReduce ? 0 : 0.045, delayChildren: 0.15 }
    }
  };
  const wordVar = {
    hidden: { y: 28, opacity: 0, filter: 'blur(6px)' },
    show: { y: 0, opacity: 1, filter: 'blur(0px)', transition: { duration: 0.65, ease: EASE } }
  };

  const fadeRise = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } }
  };

  const inView = {
    hidden: { opacity: 0, y: 32 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } }
  };

  return (
  <section className="relative max-w-6xl mx-auto px-6 pt-36 pb-40">
      {/* background flourishes */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        {/* Decorative top-left stripes restored */}
        <div className="absolute inset-0">
          <motion.div
            initial={{ opacity: 0, y: -24, rotate: -18 }}
            animate={{ opacity: 0.3, y: 0, rotate: -14 }}
            transition={{ duration: 1.2, ease: EASE }}
            className="absolute -top-10 -left-24 h-12 w-[640px] max-w-none bg-black/80 dark:bg-black/70 rounded-full rotate-[-14deg] [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)] shadow-[0_8px_28px_-10px_rgba(0,0,0,0.35)] mix-blend-multiply"
          />
          <motion.div
            initial={{ opacity: 0, y: -16, rotate: -10 }}
            animate={{ opacity: 0.15, y: 0, rotate: -8 }}
            transition={{ duration: 1.1, ease: EASE, delay: 0.15 }}
            className="absolute top-4 -left-10 h-8 w-[420px] bg-black/70 dark:bg-black/60 rounded-full rotate-[-8deg] [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] shadow-[0_6px_22px_-12px_rgba(0,0,0,0.35)] mix-blend-multiply"
          />
        </div>
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[620px] w-[620px] rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.08),transparent_70%)]" />
        <div className="absolute top-10 -left-10 h-72 w-72 rounded-full bg-[radial-gradient(circle_at_40%_30%,rgba(0,0,0,0.08),transparent_70%)] blur-xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-[radial-gradient(circle_at_60%_60%,rgba(0,0,0,0.07),transparent_70%)] blur-xl" />
      </div>
      <motion.div
        variants={fadeRise}
        initial="hidden"
        animate="show"
        className="space-y-14"
      >
        <div className="relative grid gap-12 lg:gap-16 lg:grid-cols-[minmax(0,1fr)_420px] items-start">
          <header className="space-y-6 relative order-2 lg:order-1">
            <AnimatedName className="mb-1" />

          <motion.h1
            variants={container}
            initial="hidden"
            animate="show"
            className="text-4xl sm:text-5xl md:text-6xl font-semibold leading-tight tracking-tight max-w-5xl text-balance"
          >
            {words.map((w, i) => (
              <motion.span
                aria-hidden
                className="inline-block will-change-transform pr-2"
                key={i}
                variants={wordVar}
              >
                <span className="bg-[linear-gradient(180deg,#000,#4d4d4d)] bg-clip-text text-transparent">{w}</span>
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: shouldReduce ? 0.15 : words.length * 0.045 * 0.6 }}
            className="text-neutral-600/90 text-base sm:text-lg leading-relaxed max-w-3xl"
          >
            I&apos;m a final year Computer Science student specialising in modern web development and applied AI. I craft elegant frontends, resilient backends, and integrate LLMs/AI systems that feel seamless, not stitched on. I love performance budgets, design systems, and solving real product problems with code.
          </motion.p>

          <div className="pt-2 flex gap-4 flex-wrap items-center">
            <a href="/cv.pdf" download className="group glass hover-card-transition rounded-full px-8 py-4 text-sm font-medium tracking-wide text-neutral-900 focus-ring relative overflow-hidden">
              <span className="relative z-10 flex items-center gap-2">Download CV <span className="group-hover:translate-x-1 transition-transform">→</span></span>
              <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-[linear-gradient(120deg,rgba(0,0,0,0.05),rgba(0,0,0,0.15))]" />
            </a>
            <span className="text-[11px] uppercase tracking-widest text-neutral-500 font-medium flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-neutral-400 animate-pulse" /> Currently Available
            </span>
          </div>
          </header>
          {/* Photo Column with theme toggle above */}
          <div className="order-1 lg:order-2 relative mx-auto lg:mx-0 w-[260px] sm:w-[300px] lg:w-full max-w-[420px] flex flex-col items-stretch">
            {/* Theme toggle removed */}
            <div className="relative w-full aspect-[4/5] [perspective:1600px]">
              <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.9, rotate: 2 }}
                animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
                whileHover={{ rotateY: 180 }}
                whileTap={{ rotateY: 180 }}
                transition={{ duration: 0.95, ease: EASE }}
                className="relative h-full w-full rounded-[2.2rem] shadow-[0_12px_40px_-8px_rgba(0,0,0,0.25),0_0_0_1px_rgba(0,0,0,0.05)] [transform-style:preserve-3d] cursor-pointer"
              >
                {/* Front Face */}
                <div className="absolute inset-0 rounded-[2.2rem] overflow-hidden [backface-visibility:hidden]">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.55),transparent_65%)] pointer-events-none z-10" />
                  <Image
                    src="/profile.jpg"
                    alt="Portrait of Balinda Mubarak"
                    fill
                    priority
                    className="object-cover select-none"
                  />
                  <span className="pointer-events-none absolute inset-0 rounded-[2.2rem] ring-1 ring-black/10 bg-gradient-to-br from-white/20 via-transparent to-white/10 mix-blend-overlay" />
                </div>
                {/* Back Face */}
                <div className="absolute inset-0 rounded-[2.2rem] overflow-hidden flex items-center justify-center bg-[radial-gradient(circle_at_30%_20%,rgba(0,0,0,0.08),transparent_70%)] [transform:rotateY(180deg)] [backface-visibility:hidden]">
                  <div className="absolute inset-0 bg-gradient-to-br from-neutral-200 via-neutral-300 to-neutral-100" />
                  <div className="relative z-10 flex flex-col items-center gap-4 text-center px-6">
                    <span className="text-xs tracking-widest font-semibold uppercase text-neutral-600">Balinda Mubarak</span>
                    <span className="text-[10px] font-medium tracking-wide text-neutral-500">Full‑Stack & AI Engineering</span>
                  </div>
                  <span className="pointer-events-none absolute inset-0 rounded-[2.2rem] ring-1 ring-black/10 bg-gradient-to-br from-white/50 via-transparent to-white/20 mix-blend-overlay" />
                </div>
              </motion.div>
            </div>
            {/* Floating tag */}
            {/* <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6, ease: EASE }}
              className="absolute -bottom-5 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full text-[10px] tracking-wider font-semibold uppercase bg-white/70 backdrop-blur-md shadow border border-black/5 text-neutral-700"
            >Building the Future</motion.span> */}
            <div className="pt-10 flex justify-center">
              <SocialRail />
            </div>
          </div>
        </div>{/* end grid */}
        <div className="mt-8">
          <HoverPanels />
        </div>
        <div className="mt-24" />
      </motion.div>
    </section>
  );
}

const SkillsPanel: React.FC = () => {
  return (
    <div id="skills-panel" className="relative">
      <h2 className="sr-only">Core Skills</h2>
  <div id="skill-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 relative">
        {skillCategories.map(cat => (
          <div
            key={cat.label}
            data-net
            className="glass rounded-xl p-4 flex flex-col gap-3 group relative overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-[linear-gradient(140deg,#ffffff_0%,#ededed_50%,#d9d9d9_100%)] text-[13px]"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-semibold tracking-wider uppercase text-neutral-600">{cat.label}</h3>
              <span className="h-2 w-2 rounded-full bg-gradient-to-br from-neutral-400 to-neutral-300 shadow-inner" />
            </div>
            <ul className="flex flex-col gap-1.5 text-[12px]">
              {cat.items.map(item => {
                const icons = getIconsFor(item);
                return (
                  <li
                    key={item}
                    className="relative rounded-md px-2.5 py-1.5 font-medium text-neutral-800 glass hover-card-transition bg-[linear-gradient(145deg,#ffffff_0%,#f1f1f1_40%,#e0e0e0_100%)]"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      {icons.length > 0 ? (
                        <span className="flex items-center gap-1">{icons}</span>
                      ) : (
                        <span className="h-1.5 w-1.5 rounded-full bg-neutral-400/70" />
                      )}
                      <span>{item}</span>
                    </span>
                    <span className="pointer-events-none absolute inset-0 rounded-md opacity-0 group-hover:opacity-100 transition-opacity bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.35),transparent_70%)]" />
                  </li>
                );
              })}
            </ul>
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/70 via-white/30 to-white/10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        ))}
        <NetworkLines containerId="skill-grid" />
      </div>
    </div>
  );
};

const EducationPanel: React.FC = () => (
  <div id="education-panel" className="relative">
    <h2 className="sr-only">Education</h2>
    <ul id="education-lines" className="grid md:grid-cols-2 gap-6 relative">
      {education.map(e => (
  <li key={e.title} data-net className="glass rounded-xl p-5 hover-card-transition relative bg-[linear-gradient(140deg,#ffffff_0%,#eeeeee_50%,#dcdcdc_100%)] shadow-sm">
          <div className="flex items-center justify-between gap-4 mb-2">
            <h3 className="font-semibold text-neutral-900 leading-snug">{e.title}</h3>
            <span className="text-[10px] uppercase tracking-wider bg-black text-white rounded-full px-2 py-1 shadow">Student</span>
          </div>
          <p className="text-xs font-mono text-neutral-500 mb-2">{e.org}</p>
          <p className="text-xs text-neutral-500 mb-3">{e.period}</p>
          <p className="text-sm text-neutral-700 leading-relaxed">{e.detail}</p>
        </li>
      ))}
      <NetworkLines containerId="education-lines" />
    </ul>
  </div>
);

const ExperiencePanel: React.FC = () => (
  <div id="experience-panel" className="relative">
    <h2 className="sr-only">Experience</h2>
  <ul id="experience-lines" className="relative grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {experience.map(x => (
  <li key={x.title} data-net className="glass rounded-xl p-5 hover-card-transition relative bg-[linear-gradient(140deg,#ffffff_0%,#f0f0f0_50%,#dadada_100%)] shadow-sm">
          <div className="flex items-center justify-between gap-4 mb-2">
            <h3 className="font-semibold text-neutral-900 leading-snug max-w-[70%]">{x.title}</h3>
            <span className="text-[10px] uppercase tracking-wider bg-neutral-900 text-white rounded-full px-2 py-1 shadow">{x.org}</span>
          </div>
          <p className="text-xs text-neutral-500 mb-2 font-mono">{x.period}</p>
          <p className="text-sm text-neutral-700 leading-relaxed">{x.detail}</p>
        </li>
      ))}
      <NetworkLines containerId="experience-lines" />
    </ul>
  </div>
);

// Roadmap moved to ProjectsSection; removed here.
