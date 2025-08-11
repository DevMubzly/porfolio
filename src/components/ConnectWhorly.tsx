"use client";
import { motion } from "framer-motion";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

interface ConnectWhorlyProps { label?: string; className?: string; }

export function ConnectWhorly({ label = "Let's Connect", className = "" }: ConnectWhorlyProps) {
  const pathRef = useRef<SVGPathElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [pathD, setPathD] = useState<string>("");
  const [box, setBox] = useState<{ w: number; h: number }>({ w: 0, h: 0 });
  const [hovered, setHovered] = useState(false);
  const pathname = usePathname();

  const buildPath = useCallback(() => {
    if (!buttonRef.current) return;
    const btn = buttonRef.current.getBoundingClientRect();
    const socialLinks = Array.from(document.querySelectorAll<HTMLElement>('nav[data-social-rail] a'));
    if (!socialLinks.length) return;
    const socialLast = socialLinks[socialLinks.length - 1].getBoundingClientRect();
    const vw = window.innerWidth; const vh = window.innerHeight; setBox({ w: vw, h: vh });
    const start = { x: btn.right + 16, y: btn.top + btn.height / 2 };
    const end = { x: socialLast.left + socialLast.width / 2, y: socialLast.bottom };
    const samples = 22;
    const dxTotal = end.x - start.x;
    const dyTotal = end.y - start.y;
    const baseAmp = Math.min(60, Math.abs(dxTotal) * 0.18);
    const secondaryAmp = baseAmp * 0.35;
    const tertiaryAmp = baseAmp * 0.18;
    const pts: { x: number; y: number }[] = [];
    for (let i = 0; i <= samples; i++) {
      const t = i / samples;
      const easeT = t * t * (3 - 2 * t);
      const x = start.x + dxTotal * easeT;
      const twistEnvelope = Math.sin(Math.PI * Math.min(1, t * 1.05));
      const yTwist = (
        Math.sin(t * Math.PI * 2.2) * baseAmp +
        Math.sin(t * Math.PI * 5.4 + 1.2) * secondaryAmp +
        Math.sin(t * Math.PI * 9.0 + 0.6) * tertiaryAmp
      ) * twistEnvelope;
      const verticalBlend = Math.pow(t, 1.15);
      const y = start.y + dyTotal * verticalBlend * 0.95 + yTwist * (1 - t * 0.4);
      pts.push({ x, y });
    }
    pts[pts.length - 1] = { ...end };
    const tension = 0.5;
    if (pts.length < 2) return;
    let d = `M ${pts[0].x.toFixed(2)} ${pts[0].y.toFixed(2)}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i - 1] || pts[i];
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const p3 = pts[i + 2] || p2;
      const c1x = p1.x + (p2.x - p0.x) / 6 * tension;
      const c1y = p1.y + (p2.y - p0.y) / 6 * tension;
      const c2x = p2.x - (p3.x - p1.x) / 6 * tension;
      const c2y = p2.y - (p3.y - p1.y) / 6 * tension;
      d += ` C ${c1x.toFixed(2)} ${c1y.toFixed(2)}, ${c2x.toFixed(2)} ${c2y.toFixed(2)}, ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`;
    }
    setPathD(d);
  }, []);

  useLayoutEffect(() => { buildPath(); }, [buildPath]);

  useEffect(() => {
    let frame: number | null = null;
    const onResize = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => buildPath());
    };
    window.addEventListener('resize', onResize, { passive: true });
    const ro = new ResizeObserver(() => onResize());
    if (buttonRef.current) ro.observe(buttonRef.current);
    const socialNav = document.querySelector('nav[data-social-rail]');
    if (socialNav) ro.observe(socialNav);
    return () => { window.removeEventListener('resize', onResize); ro.disconnect(); if (frame) cancelAnimationFrame(frame); };
  }, [buildPath]);

  useEffect(() => {
    const id = setTimeout(() => buildPath(), 60);
    return () => clearTimeout(id);
  }, [pathname, buildPath]);

  const restart = useCallback(() => { buildPath(); }, [buildPath]);

  // Hide hover effect on scroll
  useEffect(() => {
    if (!hovered) return; // only attach temporarily while active to reduce listeners firing
    const handleScroll = () => { setHovered(false); };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hovered]);

  return (
    <div className={`relative ${className}`}>
      <motion.button
        ref={buttonRef}
        type="button"
        whileHover={{ y: -4, scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
        onMouseEnter={() => { setHovered(true); restart(); }}
        onMouseLeave={() => setHovered(false)}
        transition={{ type: 'tween', duration: 0.65, ease: [0.22,1,0.36,1] }}
  className="group relative z-10 px-10 py-4 rounded-full glass border-gradient text-sm font-semibold tracking-wide text-neutral-900 shadow-lg hover:shadow-xl focus-ring transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)]"
      >
        <span className="relative flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-neutral-900 animate-pulse transition-all duration-700" />
          <span className="transition-colors duration-700">{label}</span>
          <span className="h-2 w-2 rounded-full bg-neutral-400 group-hover:bg-neutral-700 transition-colors duration-700" />
        </span>
  <span className="pointer-events-none absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-[cubic-bezier(.22,1,.36,1)] bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.7),transparent_70%)]" />
      </motion.button>
      {hovered && pathD && (
        <div className="pointer-events-none fixed inset-0 z-0">
          <svg className="w-full h-full" viewBox={`0 0 ${box.w} ${box.h}`} preserveAspectRatio="none">
            <defs>
              <linearGradient id="whorlStroke" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#000" stopOpacity="0.85" />
                <stop offset="55%" stopColor="#6b6b6b" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#000" stopOpacity="0.9" />
              </linearGradient>
              <filter id="glow" x="-10%" y="-10%" width="120%" height="120%">
                <feGaussianBlur stdDeviation="3" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="boltSoft" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="8" />
              </filter>
            </defs>
            <motion.path
              ref={pathRef}
              d={pathD}
              animate={{ d: pathD }}
              transition={{ duration: 1.6, ease: [0.22,1,0.36,1] }}
              stroke="url(#whorlStroke)"
              strokeWidth={3}
              fill="none"
              strokeLinecap="round"
              className="whorl-path"
            />
            {/* Lightning layers */}
            <path d={pathD} className="whorl-lightning-base" fill="none" stroke="#fff" strokeWidth={5} strokeLinecap="round" />
            <path d={pathD} className="whorl-lightning-core" fill="none" stroke="#fff" strokeWidth={2.4} strokeLinecap="round" />
            <path d={pathD} className="whorl-lightning-sparks" fill="none" stroke="#fff" strokeWidth={1.2} strokeLinecap="round" />
            <motion.circle
              key={pathD}
              r={6}
              fill="#111"
              stroke="#fff"
              strokeWidth={2}
            >
              <animateMotion dur="10s" repeatCount="indefinite" rotate="auto" path={pathD} />
            </motion.circle>
          </svg>
        </div>
      )}
      <style jsx>{`
  .whorl-path { stroke-dasharray: 1800; stroke-dashoffset: 1800; animation: dashDraw 5.2s cubic-bezier(.22,1,.36,1) forwards, dashPulse 11s linear 5.2s infinite; filter: url(#glow); }
        @keyframes dashDraw { to { stroke-dashoffset: 0; } }
        @keyframes dashPulse { 0% { stroke-dashoffset: 0; } 50% { stroke-dashoffset: -1800; } 100% { stroke-dashoffset: -3600; } }
  /* Lightning animations */
  .whorl-lightning-base { stroke-dasharray: 1400; stroke-dashoffset: 1400; opacity:0.08; filter:url(#boltSoft); animation: baseReveal 3.3s ease forwards, basePulse 8s ease-in-out 3.3s infinite; }
  @keyframes baseReveal { to { stroke-dashoffset:0; opacity:0.1; } }
  @keyframes basePulse { 0%,100% { opacity:0.06; } 50% { opacity:0.14; } }
  .whorl-lightning-core { stroke-dasharray: 120 1200; stroke-dashoffset:0; filter:drop-shadow(0 0 6px rgba(255,255,255,0.85)); animation: coreTravel 3.2s linear infinite, coreFlicker 1.6s steps(10) infinite; }
  @keyframes coreTravel { 0% { stroke-dashoffset:0; } 100% { stroke-dashoffset:-1320; } }
  @keyframes coreFlicker { 0%,18%,42%,67%,89% { opacity:1; } 9%,30%,55%,76% { opacity:0.35; } }
  .whorl-lightning-sparks { stroke-dasharray: 10 18; stroke-dashoffset:0; opacity:0.55; mix-blend-mode:plus-lighter; animation: sparksDrift 3.4s linear infinite; }
  @keyframes sparksDrift { 0% { stroke-dashoffset:0; opacity:0.2; } 25% { opacity:0.7; } 50% { stroke-dashoffset:-600; opacity:0.3; } 75% { opacity:0.6; } 100% { stroke-dashoffset:-1200; opacity:0.2; } }
  @media (prefers-reduced-motion: reduce) { .whorl-lightning-base, .whorl-lightning-core, .whorl-lightning-sparks { animation:none !important; } }
      `}</style>
    </div>
  );
}
