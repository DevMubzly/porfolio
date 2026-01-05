"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";

export interface SkillCategory {
  label: string;
  items: string[];
}

interface SkillCategoriesProps {
  categories: SkillCategory[];
}

interface PatternItem {
  colSpan: number; // 1-3 (in lg 6-col grid we map to col-span-{colSpan*2})
  rowSpan: number; // 1-2
  height: number; // px height fallback for non-row-span browsers
}

function generatePattern(count: number): PatternItem[] {
  const pattern: PatternItem[] = [];
  for (let i = 0; i < count; i++) {
    const colSpan = Math.random() < 0.35 ? 3 : Math.random() < 0.55 ? 2 : 1; // bias medium sizes
    const rowSpan = Math.random() < 0.25 ? 2 : 1;
    const heightBase = 180;
    const height = heightBase * rowSpan + (rowSpan - 1) * 24;
    pattern.push({ colSpan, rowSpan, height });
  }
  return pattern;
}

export function SkillCategories({ categories }: SkillCategoriesProps) {
  const [pattern, setPattern] = useState<PatternItem[]>(() => generatePattern(categories.length));
  const [scrambleKey, setScrambleKey] = useState(0);

  const scramble = useCallback(() => {
    setPattern(generatePattern(categories.length));
    setScrambleKey(k => k + 1);
  }, [categories.length]);

  // Periodic subtle reshuffle for ambient motion (optional)
  useEffect(() => {
    const id = setInterval(() => scramble(), 12000);
    return () => clearInterval(id);
  }, [scramble]);

  return (
    <div
      className="group/skills relative"
      onMouseEnter={() => scramble()}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 auto-rows-[180px] gap-7 transition-all">
        {categories.map((cat, i) => {
          const p = pattern[i];
          // Map colSpan (1-3) to actual lg:col-span-x within 6-col grid => multiply by 2 but cap at 6
          const lgCol = Math.min(p.colSpan * 2, 6);
          const colClass = `lg:col-span-${lgCol}`;
          const rowClass = p.rowSpan === 2 ? 'row-span-2' : 'row-span-1';

          return (
            <motion.div
              key={cat.label + scrambleKey}
              layout
              onMouseEnter={() => scramble()}
              transition={{ layout: { duration: 0.8, type: 'spring', bounce: 0.25 } }}
              className={`relative glass border-gradient rounded-xl p-5 flex flex-col gap-4 overflow-hidden cursor-pointer ${colClass} ${rowClass}`}
              style={{ minHeight: p.height }}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-semibold tracking-wider uppercase text-neutral-600">{cat.label}</h3>
                <span className="h-2 w-2 rounded-full bg-gradient-to-br from-neutral-400 to-neutral-300 shadow-inner" />
              </div>
              <ul className="flex flex-col gap-2 text-[13px]">
                <AnimatePresence initial={false}>
                  {cat.items.map(item => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.35 }}
                      className="relative rounded-md px-3 py-2 font-medium text-neutral-800 glass hover-card-transition bg-[linear-gradient(140deg,rgba(255,255,255,0.85),rgba(215,215,215,0.55))] border border-black/5"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-neutral-400/70" />
                        {item}
                      </span>
                      <span className="pointer-events-none absolute inset-0 rounded-md opacity-0 group/skills-hover:opacity-100 transition-opacity bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.35),transparent_70%)]" />
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/70 via-white/40 to-white/20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          );
        })}
      </div>
      <button
        type="button"
        onClick={scramble}
        className="mt-6 mx-auto block text-[11px] tracking-wider uppercase font-medium text-neutral-500 hover:text-neutral-800 transition-colors"
      >
        Shuffle Layout
      </button>
    </div>
  );
}
