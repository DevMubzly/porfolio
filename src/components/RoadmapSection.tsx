"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import React, { useRef } from "react";

interface RoadmapPhase { id: number; title: string; blurb: string; items: string[]; }
const roadmap: RoadmapPhase[] = [
  {
    id: 1,
    title: 'Ideation & Research',
    blurb: 'Understand the problem and who we are building for before coding anything.',
    items: [
      'Talk to potential users',
      'List real pains & goals',
      'Check similar products',
      'Write simple success goals'
    ]
  },
  {
    id: 2,
    title: 'Design & Prototyping',
    blurb: 'Sketch screens and test a quick prototype to see if it makes sense.',
    items: [
      'Basic wireframes',
      'Clickable demo',
      'Tidy user flow',
      'Add basic accessibility'
    ]
  },
  {
    id: 3,
    title: 'Development',
    blurb: 'Build a small first version that actually works end to end.',
    items: [
      'Set up project basics',
      'Code core features',
      'Write key tests',
      'Add simple tracking'
    ]
  },
  {
    id: 4,
    title: 'Testing & Feedback',
    blurb: 'Try it, fix bugs, and ask a few users what feels rough.',
    items: [
      'Manual & automated tests',
      'Fix obvious bugs',
      'Collect user comments',
      'Tidy rough edges'
    ]
  },
  {
    id: 5,
    title: 'Launch',
    blurb: 'Put it live and help new users understand it quickly.',
    items: [
      'Deploy to production',
      'Simple landing page',
      'Basic onboarding',
      'Watch errors & usage'
    ]
  },
  {
    id: 6,
    title: 'Iteration & Growth',
    blurb: 'Improve what matters, add what’s missing, and tidy what slows us down.',
    items: [
      'Check key metrics',
      'Improve popular features',
      'Remove friction & debt',
      'Plan the next steps'
    ]
  }
];

export const RoadmapSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 68%", "end 20%"] });

  // Transform for progress bar + subtle glow shift
  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const glowOpacity = useTransform(scrollYProgress, [0, 1], [0.2, 0.55]);

  // Variant cycles for each phase card to keep motion fresh
  const variantCycle = [
    {
      hidden: { opacity: 0, y: 48, scale: 0.9, rotateX: 14, rotateY: -10, filter: 'blur(10px) saturate(0.7)' },
      show: { opacity: 1, y: 0, scale: 1, rotateX: 0, rotateY: 0, filter: 'blur(0px) saturate(1)' }
    },
    {
      hidden: { opacity: 0, y: 70, scale: 0.92, rotateZ: -5, skewY: 4, filter: 'blur(12px) brightness(0.85)' },
      show: { opacity: 1, y: 0, scale: 1, rotateZ: 0, skewY: 0, filter: 'blur(0px) brightness(1)' }
    },
    {
      hidden: { opacity: 0, y: 60, scale: 0.88, rotateX: -16, rotateY: 12, filter: 'blur(14px) contrast(0.85)' },
      show: { opacity: 1, y: 0, scale: 1, rotateX: 0, rotateY: 0, filter: 'blur(0px) contrast(1)' }
    },
    {
      hidden: { opacity: 0, y: 54, scale: 0.93, rotateZ: 7, skewX: -4, filter: 'blur(10px) saturate(0.75)' },
      show: { opacity: 1, y: 0, scale: 1, rotateZ: 0, skewX: 0, filter: 'blur(0px) saturate(1)' }
    }
  ];

  return (
    <section ref={sectionRef} aria-labelledby="roadmap-heading" className="relative mt-32">
      <div className="relative z-10 grid gap-12 lg:grid-cols-[220px_minmax(0,1fr)] max-w-[900px] mx-auto">
        <div className="space-y-5 lg:sticky lg:top-32 self-start">
          <h2 id="roadmap-heading" className="text-2xl font-semibold tracking-tight leading-tight">Product Execution Roadmap</h2>
          <p className="text-sm leading-relaxed text-neutral-600 max-w-[32ch]">Clear, simple steps: learn → design → build → test → launch → improve.</p>
          <motion.div
            aria-hidden
            className="mt-6 h-px w-16 origin-left bg-gradient-to-r from-neutral-800 via-neutral-500 to-transparent"
            style={{ scaleX: progressScale }}
          />
        </div>
        <div ref={listRef} className="grid gap-6 md:gap-7 max-w-xl perspective-[1400px]">
          {/* Scroll progress rail */}
          <motion.div
            aria-hidden
            className="hidden md:block absolute left-[calc(-1.25rem)] top-0 w-px bg-gradient-to-b from-neutral-400/70 via-neutral-300/30 to-transparent origin-top"
            style={{ scaleY: progressScale }}
          />
          {roadmap.map((phase, idx) => {
            const variants = variantCycle[idx % variantCycle.length];
            return (
              <motion.div
                key={phase.id}
                variants={variants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: false, amount: 0.4 }}
                transition={{ duration: 0.9, ease: [0.22,1,0.36,1], delay: (idx % variantCycle.length) * 0.05 }}
                className="group relative flex gap-6 md:gap-8 px-2 md:px-3 py-4 md:py-5 will-change-transform"
              >
                <div className="flex flex-col items-center">
                  <motion.span
                    className="h-9 w-9 rounded-full flex items-center justify-center text-[13px] font-semibold tracking-wide bg-black text-white shadow-sm ring-1 ring-black/10"
                    initial={{ scale: 0.6, rotate: -18, opacity: 0 }}
                    whileInView={{ scale: 1, rotate: 0, opacity: 1 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ type: 'spring', stiffness: 320, damping: 24, mass: 0.9 }}
                  >{phase.id}</motion.span>
                  {phase.id !== roadmap.length && (
                    <motion.span
                      className="flex-1 w-px bg-gradient-to-b from-neutral-400/60 via-neutral-300/30 to-transparent mt-2"
                      initial={{ scaleY: 0, opacity: 0 }}
                      whileInView={{ scaleY: 1, opacity: 1 }}
                      viewport={{ once: true, amount: 0.4 }}
                      transition={{ duration: 0.8, ease: [0.22,1,0.36,1] }}
                      style={{ transformOrigin: 'top' }}
                    />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap mb-1.5">
                    <h3 className="text-[14px] font-semibold uppercase tracking-wide text-neutral-800">{phase.title}</h3>
                    <motion.span
                      className="text-[10px] px-2 py-0.5 rounded-full bg-neutral-900 text-white font-medium tracking-wider"
                      initial={{ y: -8, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{ duration: 0.5, ease: [0.33,1,0.68,1] }}
                    >Phase {phase.id}</motion.span>
                  </div>
                  <motion.p
                    className="text-[12.5px] leading-relaxed text-neutral-700 mb-3 max-w-prose"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.55 }}
                    transition={{ duration: 0.55, ease: [0.22,1,0.36,1] }}
                  >{phase.blurb}</motion.p>
                  <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-2">
                    {phase.items.map(it => (
                      <motion.li
                        key={it}
                        className="text-[12.5px] flex items-start gap-2 text-neutral-800"
                        initial={{ opacity: 0, x: -8 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.6 }}
                        transition={{ duration: 0.45, ease: [0.42,0,0.58,1] }}
                      >
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-neutral-500/60 flex-shrink-0" />
                        <span className="leading-snug">{it}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
                {/* Ambient glow that subtly strengthens as user scrolls through list */}
                <motion.div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{ background: 'radial-gradient(circle at 65% 35%, rgba(255,255,255,0.55), transparent 70%)', mixBlendMode: 'overlay', opacity: glowOpacity }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
      <div aria-hidden className="absolute inset-0 -z-10 opacity-[0.35]">
        <div className="absolute left-1/4 top-8 h-72 w-72 rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.08),transparent_70%)]" />
        <div className="absolute right-10 -bottom-10 h-80 w-80 rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.06),transparent_70%)]" />
      </div>
    </section>
  );
};
