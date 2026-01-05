"use client";
import { motion } from "motion/react";
import React from "react";
import { Github, Send, Phone, Twitter } from "lucide-react";
import Link from "next/link";

interface SocialLink {
  href: string;
  label: string;
  icon: React.ReactNode;
}

const socials: SocialLink[] = [
  { href: "https://github.com/DevMubzly", label: "Dev Mubzly", icon: <Github className="w-4 h-4" /> },
  { href: "https://wa.me/+256771050357", label: "0771050357", icon: <Phone className="w-4 h-4" /> },
  { href: "https://t.me/fx_mubzly", label: "fx_mubzly", icon: <Send className="w-4 h-4" /> },
  { href: "https://x.com/TtnlxMubz", label: "TtnlxMubz", icon: <Twitter className="w-4 h-4" /> },
];

export function SocialRail() {
  const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
  return (
    <motion.nav
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: EASE }}
      data-social-rail
      className="flex flex-col items-center gap-3"
      aria-label="Social links"
    >
      {socials.map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, y: 26, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.05 * i, duration: 0.65, ease: EASE }}
          className="relative flex items-center"
        >
          <motion.div
            whileHover={{ y: -4, scale: 1.08, rotateZ: 0.0001 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 300, damping: 26, mass: 0.7 }}
            className="relative"
          >
            <Link
              href={s.href}
              target="_blank"
              aria-label={s.label}
              title={s.label}
              className="relative w-12 h-12 flex items-center justify-center glass border-gradient rounded-2xl focus-ring shadow-[0_0_0_1px_rgba(0,0,0,0.08)] overflow-hidden"
            >
              {/* Continuous subtle rotating sheen */}
              <motion.span
                aria-hidden
                className="absolute -inset-[40%] opacity-30"
                style={{ background: 'conic-gradient(from_0deg, rgba(0,0,0,0.07), transparent 60%, rgba(0,0,0,0.07))' }}
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 16, ease: 'linear' }}
              />
              {/* Hover intensified inner ring (no new content revealed) */}
              <motion.span
                aria-hidden
                className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{ background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.65), transparent 70%)', mixBlendMode: 'overlay' }}
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 0.55, scale: 1.05 }}
                transition={{ duration: 0.8, ease: EASE }}
              />
              <motion.span
                className="relative text-neutral-800"
                whileHover={{ scale: 1.12 }}
                transition={{ type: 'spring', stiffness: 360, damping: 30, mass: 0.7 }}
              >
                {s.icon}
              </motion.span>
              {/* Animated border shimmer */}
              <motion.span
                aria-hidden
                className="absolute -inset-px rounded-2xl pointer-events-none"
                style={{ background: 'linear-gradient(125deg, rgba(255,255,255,0.9), rgba(255,255,255,0) 35%, rgba(255,255,255,0.9) 65%, rgba(255,255,255,0) 90%)', mixBlendMode: 'overlay' }}
                animate={{ backgroundPosition: ['0% 50%', '100% 50%'] }}
                transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
              />
            </Link>
          </motion.div>
        </motion.div>
      ))}
    </motion.nav>
  );
}
