"use client";
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface LinePath {
  d: string;
  id: string;
  delay: number;
  length: number;
}

/**
 * Renders animated bezier "whorly" connector lines between elements that have
 * data-skill-cat attribute inside the provided container (by id or ref).
 * Lightweight, recalculates on resize + when tab becomes visible.
 */
export const SkillNetwork: React.FC<{ containerId: string }> = ({ containerId }) => {
  const [lines, setLines] = useState<LinePath[]>([]);
  const raf = useRef<number | undefined>(undefined);

  const build = () => {
    const container = document.getElementById(containerId);
    if (!container) return;
    const cards = Array.from(container.querySelectorAll<HTMLElement>('[data-skill-cat]'));
    if (cards.length < 2) { setLines([]); return; }
    const cRect = container.getBoundingClientRect();
    const pts = cards.map(el => {
      const r = el.getBoundingClientRect();
      return {
        x: (r.left + r.width / 2) - cRect.left,
        y: (r.top + r.height / 2) - cRect.top,
      };
    });
    const newLines: LinePath[] = [];
    for (let i = 0; i < pts.length - 1; i++) {
      const a = pts[i];
      const b = pts[i + 1];
      const midx = a.x + (b.x - a.x) / 2;
      const verticalSwing = 70 + (i % 3) * 18; // varied curvature
      const dir = i % 2 === 0 ? 1 : -1;
      const c1x = midx;
      const c1y = a.y - verticalSwing * dir;
      const c2x = midx;
      const c2y = b.y + verticalSwing * dir;
      const d = `M ${a.x.toFixed(1)},${a.y.toFixed(1)} C ${c1x.toFixed(1)},${c1y.toFixed(1)} ${c2x.toFixed(1)},${c2y.toFixed(1)} ${b.x.toFixed(1)},${b.y.toFixed(1)}`;
      newLines.push({ d, id: `skill-line-${i}`, delay: i * 0.35, length: 0 });
    }
    setLines(newLines);
  };

  useEffect(() => {
    build();
    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(raf.current!);
      raf.current = requestAnimationFrame(build);
    });
    const container = document.getElementById(containerId);
    if (container) ro.observe(container);
    window.addEventListener('resize', build);
    return () => {
      window.removeEventListener('resize', build);
      ro.disconnect();
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [containerId]);

  return (
    <div className="pointer-events-none absolute inset-0 -z-10">
      <svg className="w-full h-full overflow-visible" aria-hidden>
        <defs>
          <linearGradient id="skill-line-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#000" stopOpacity={0.55} />
            <stop offset="60%" stopColor="#555" stopOpacity={0.35} />
            <stop offset="100%" stopColor="#777" stopOpacity={0.15} />
          </linearGradient>
          <filter id="glow-skill" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="b" />
            <feColorMatrix in="b" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.6 0" result="g" />
            <feBlend in="SourceGraphic" in2="g" mode="screen" />
          </filter>
        </defs>
        {lines.map(l => (
          <motion.path
            key={l.id}
            d={l.d}
            stroke="url(#skill-line-grad)"
            strokeWidth={1.2}
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1], delay: l.delay }}
            style={{ filter: 'url(#glow-skill)' }}
          />
        ))}
        {/* subtle moving dots */}
        {lines.map((l, i) => (
          <motion.circle
            key={l.id + '-dot'}
            r={3.2}
            fill="#000"
            initial={{ offsetDistance: '0%' }}
            animate={{ offsetDistance: '100%' }}
            transition={{ duration: 6 + i * 0.8, repeat: Infinity, ease: 'linear', delay: 1 + i * 0.2 }}
          >
            <animateMotion dur={`${6 + i * 0.8}s`} repeatCount="indefinite" rotate="auto" keyPoints="0;1" keyTimes="0;1">
              <mpath href={`#${l.id}`} />
            </animateMotion>
          </motion.circle>
        ))}
      </svg>
    </div>
  );
};
