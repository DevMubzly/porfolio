"use client";
import { motion, useReducedMotion } from "motion/react";
import React, { useMemo } from "react";

interface AnimatedNameProps {
  name?: string;
  className?: string;
}

// Fancy animated name badge with:
// - Staggered per-letter rise in
// - Continuous subtle shimmer sweep
// - Hover ripple lifting letters + soft glow ring pulse
// - Respects prefers-reduced-motion
export const AnimatedName: React.FC<AnimatedNameProps> = ({ name = "Balinda Mubarak", className = "" }) => {
  const shouldReduce = useReducedMotion();
  const letters = useMemo(() => name.split(""), [name]);

  const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
  const container = {
    hidden: { opacity: 0, y: 6, scale: 0.96 },
    show: {
      opacity: 1, y: 0, scale: 1,
      transition: { duration: 0.55, ease: EASE, staggerChildren: shouldReduce ? 0 : 0.035, delayChildren: 0.15 }
    }
  } as const;

  const letterVar = {
    hidden: { y: 18, opacity: 0, filter: "blur(6px)" },
    show: (i: number) => ({
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: { duration: 0.6, ease: EASE, delay: shouldReduce ? 0 : i * 0.007 }
    })
  } as const;

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      whileHover="hover"
      className={`relative inline-flex items-center group px-6 sm:px-7 py-3 rounded-full overflow-hidden select-none ${className}`}
      aria-label={name}
    >
      {/* Simplified subtle gradient backdrop for clarity */}
  <div className="absolute inset-0 rounded-full backdrop-blur-md border border-black/5 shadow-[0_4px_14px_-6px_rgba(0,0,0,0.35)]" style={{ background: "linear-gradient(135deg,#f5f5f5 0%,#e5e5e5 40%,#d0d0d0 55%,#ececec 100%)" }} />
      {/* Soft focus ring on hover */}
  <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-600" style={{ background: "radial-gradient(circle at 35% 30%,rgba(255,255,255,0.65),rgba(255,255,255,0) 65%)" }} />
      {/* Shimmer only on hover for less distraction */}
      <span className="pointer-events-none absolute inset-0 before:absolute before:inset-0 before:opacity-0 group-hover:before:opacity-100 before:transition-opacity before:duration-500 before:bg-[linear-gradient(120deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.9)_45%,rgba(255,255,255,0)_75%)] group-hover:before:animate-[shimmer_2.8s_linear_infinite] before:translate-x-[-70%] mix-blend-overlay" />
      {/* Per-letter animation with clearer high-contrast gradient text */}
  <motion.span className="relative z-10 text-[12px] sm:text-[13px] font-semibold tracking-[0.16em] uppercase flex" aria-hidden>
        {letters.map((ch, i) => (
          <motion.span
            key={i + ch}
            custom={i}
            variants={letterVar}
            className={`inline-block ${ch === ' ' ? 'w-4 sm:w-5' : ''}`}
            whileHover={{ y: -4 }}
            transition={{ type: 'spring', stiffness: 300, damping: 22 }}
          >
            <span
              className="relative inline-block bg-clip-text text-transparent transition duration-600"
              style={{
                backgroundImage: 'linear-gradient(180deg,#111 0%,#222 30%,#3e3e3e 55%,#1a1a1a 85%)'
              }}
              data-dark-gradient
            >
              {ch}
            </span>
          </motion.span>
        ))}
      </motion.span>
      {/* Soft outer halo on hover */}
      <span className="absolute -inset-2 rounded-full pointer-events-none opacity-0 group-hover:opacity-40 transition-opacity duration-700" style={{ background: "radial-gradient(circle at 50% 50%, rgba(0,0,0,0.25), transparent 70%)" }} />
      
      <style jsx>{`
        @keyframes shimmer { 0% { transform: translateX(-70%); } 55% { transform: translateX(120%); } 100% { transform: translateX(120%); } }
        @media (prefers-reduced-motion: reduce) { .group:before { animation: none !important; } }
      `}</style>
    </motion.div>
  );
};
