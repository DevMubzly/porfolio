"use client";
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface LinePath { d: string; id: string; delay: number; }

interface NetworkLinesProps {
  containerId: string;          // id of wrapping panel
  selector?: string;            // selector for nodes (default: [data-net])
  strokeWidth?: number;
  curve?: number;               // base curve intensity
  animateOnce?: boolean;
}

export const NetworkLines: React.FC<NetworkLinesProps> = ({
  containerId,
  selector = '[data-net]',
  strokeWidth = 1.1,
  curve = 70,
  animateOnce = false,
}) => {
  const [lines, setLines] = useState<LinePath[]>([]);
  const drawnRef = useRef(false);

  useEffect(() => {
    const build = () => {
      const container = document.getElementById(containerId);
      if (!container) return;
      const nodes = Array.from(container.querySelectorAll<HTMLElement>(selector));
      if (nodes.length < 2) { setLines([]); return; }
      const cRect = container.getBoundingClientRect();
      const pts = nodes.map(el => {
        const r = el.getBoundingClientRect();
        return { x: r.left + r.width / 2 - cRect.left, y: r.top + r.height / 2 - cRect.top };
      });
      const next: LinePath[] = [];
      for (let i=0;i<pts.length-1;i++) {
        const a = pts[i];
        const b = pts[i+1];
        const midx = (a.x + b.x)/2;
        const dir = i % 2 === 0 ? 1 : -1;
        const swing = curve + (i % 4) * 12;
        const c1 = { x: midx, y: a.y - swing * dir };
        const c2 = { x: midx, y: b.y + swing * dir };
        const d = `M ${a.x.toFixed(1)},${a.y.toFixed(1)} C ${c1.x.toFixed(1)},${c1.y.toFixed(1)} ${c2.x.toFixed(1)},${c2.y.toFixed(1)} ${b.x.toFixed(1)},${b.y.toFixed(1)}`;
        next.push({ d, id: `${containerId}-line-${i}`, delay: i * 0.28 });
      }
      setLines(next);
    };
    build();
    const ro = new ResizeObserver(() => build());
    const el = document.getElementById(containerId);
    if (el) ro.observe(el);
    window.addEventListener('resize', build);
    return () => { ro.disconnect(); window.removeEventListener('resize', build); };
  }, [containerId, selector, curve]);

  if (!lines.length) return null;

  return (
    <div className="pointer-events-none absolute inset-0 -z-10">
      <svg className="w-full h-full overflow-visible" aria-hidden>
        <defs>
          <linearGradient id={`${containerId}-grad`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#000" stopOpacity={0.55} />
            <stop offset="70%" stopColor="#555" stopOpacity={0.25} />
            <stop offset="100%" stopColor="#777" stopOpacity={0.1} />
          </linearGradient>
        </defs>
        {lines.map(l => (
          <motion.path
            key={l.id}
            d={l.d}
            stroke={`url(#${containerId}-grad)`}
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1], delay: l.delay }}
            onAnimationComplete={() => { if (animateOnce) drawnRef.current = true; }}
          />
        ))}
      </svg>
    </div>
  );
};
