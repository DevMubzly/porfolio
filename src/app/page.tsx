"use client";

import { motion } from "motion/react";
import { useEffect, useRef } from "react";
import LocomotiveScroll from "locomotive-scroll";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { ArticlesSection } from "@/components/ArticlesSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const locomotiveRef = useRef<LocomotiveScroll | null>(null);

  useEffect(() => {
    if (!scrollRef.current) return;

    const scroll = new LocomotiveScroll({
      el: scrollRef.current,
      smooth: true,
      multiplier: 1,
      lerp: 0.1,
    });

    locomotiveRef.current = scroll;

    return () => {
      scroll.destroy();
    };
  }, []);

  return (
    <div ref={scrollRef} className="min-h-screen" data-scroll-container>
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <HeroSection />
        <div className="max-w-4xl mx-auto px-6 lg:px-24 py-8">
          <div className="border-t-2 border-[var(--text-primary)]" />
        </div>
        <AboutSection />
        <div className="max-w-4xl mx-auto px-6 lg:px-24 py-8">
          <div className="border-t-2 border-[var(--text-primary)]" />
        </div>
        <ProjectsSection />
        <div className="max-w-4xl mx-auto px-6 lg:px-24">
          <div className="border-t-2 border-[var(--text-primary)]" />
        </div>
        <ArticlesSection />
        <div className="max-w-4xl mx-auto px-6 lg:px-24">
          <div className="border-t-2 border-[var(--text-primary)]" />
        </div>
        <ContactSection />
        <div className="max-w-4xl mx-auto px-6 lg:px-24">
          <div className="border-t-2 border-[var(--text-primary)]" />
        </div>
        <div className="max-w-4xl mx-auto px-6 lg:px-24 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative flex flex-col sm:flex-row items-center justify-center gap-8"
          >
            <div className="relative max-w-2xl text-center sm:text-left">
              <span className="absolute -top-8 -left-4 text-6xl sm:text-7xl font-serif text-[var(--border)] select-none pointer-events-none">&ldquo;</span>
              <blockquote className="relative text-lg sm:text-xl font-bold italic text-[var(--text-primary)] leading-relaxed">
                You&apos;ll never know. If you&apos;re not the one who&apos;s continuing to take that path... unless you keep moving forward.
              </blockquote>
              <p className="text-sm text-[var(--text-muted)] mt-4">
                — Eren Yeager
              </p>
            </div>
            <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden flex-shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/eren.svg" alt="Eren Yeager" className="w-full h-full object-cover" />
            </div>
          </motion.div>
        </div>
      </motion.main>
      <Footer />
    </div>
  );
}
