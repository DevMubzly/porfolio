"use client";
import { useCallback, useEffect, useState } from "react";
import { FloatingBar, Tab } from "@/components/FloatingBar";
import { InfoSection } from "@/components/InfoSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { ArticlesSection } from "@/components/ArticlesSection";
import { motion } from "motion/react";
import { Github, Twitter, Mail } from "lucide-react";

export default function Home() {
  const [active, setActive] = useState<Tab>("profile");

  const scrollToTab = useCallback((tab: Tab) => {
    setActive(tab);
    const targetId = tab === "profile" ? "profile" : tab === "projects" ? "projects" : "articles";
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  useEffect(() => {
    const sections: { tab: Tab; el: HTMLElement | null }[] = [
      { tab: "profile", el: document.getElementById("profile") },
      { tab: "projects", el: document.getElementById("projects") },
      { tab: "articles", el: document.getElementById("articles") },
    ];
    const elementToTab = new Map<Element, Tab>();
    const observer = new IntersectionObserver(
      (entries) => {
        let maxEntry: IntersectionObserverEntry | null = null;
        for (const entry of entries) {
          if (!maxEntry || entry.intersectionRatio > maxEntry.intersectionRatio) {
            maxEntry = entry;
          }
        }
        if (maxEntry && maxEntry.isIntersecting) {
          const tab = elementToTab.get(maxEntry.target);
          if (tab) {
            setActive(tab);
          }
        }
      },
      { threshold: 0.4 }
    );
    sections.forEach(({ tab, el }) => {
      if (el) {
        elementToTab.set(el, tab);
        observer.observe(el);
      }
    });
    return () => observer.disconnect();
  }, []);

  return (
    <main className="relative h-dvh overflow-y-auto snap-y snap-mandatory">
      <FloatingBar active={active} onChange={scrollToTab} />
      <div className="fixed top-4 right-4 sm:right-6 lg:right-10 z-40 pointer-events-none">
        <nav
          aria-label="Social links"
          className="pointer-events-auto flex items-center gap-2 sm:gap-3 rounded-full bg-white/80 backdrop-blur-md border border-black/5 px-2.5 py-1.5 shadow-sm"
        >
          <a
            href="https://github.com/DevMubzly"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="p-1.5 rounded-full text-neutral-700 hover:text-black hover:bg-neutral-100 transition-colors focus-ring"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href="https://x.com/TtnlxMubz"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter / X"
            className="p-1.5 rounded-full text-neutral-700 hover:text-black hover:bg-neutral-100 transition-colors focus-ring"
          >
            <Twitter className="w-4 h-4" />
          </a>
          <a
            href="mailto:bmubs15@gmail.com"
            aria-label="Email"
            className="hidden sm:inline-flex p-1.5 rounded-full text-neutral-700 hover:text-black hover:bg-neutral-100 transition-colors focus-ring"
          >
            <Mail className="w-4 h-4" />
          </a>
        </nav>
        <motion.svg
          viewBox="0 0 160 80"
          className="hidden md:block absolute -left-40 top-12 h-16 w-40 text-neutral-500 dark:text-neutral-300 pointer-events-none"
          initial={{ opacity: 0, pathLength: 0 }}
          animate={{ opacity: 1, pathLength: 1 }}
          transition={{ duration: 1.2, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden="true"
        >
          <motion.path
            d="M10 70 C 35 45, 55 40, 80 40 S 130 30, 150 10"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round" />
          <motion.path
            d="M142 14 L 150 10 L 146 18"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round" />
        </motion.svg>
      </div>
    {/* </div> */}
    <motion.div
      key="sections"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
        <div id="profile" className="snap-start">
          <InfoSection />
        </div>
        <div id="projects" className="snap-start">
          <ProjectsSection />
        </div>
        <div id="articles" className="snap-start">
          <ArticlesSection />
        </div>
        <footer className="max-w-6xl mx-auto px-6 pb-16 text-xs text-neutral-500 flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
          <div>&copy; {new Date().getFullYear()} Balinda Mubarak</div>
          <div className="flex gap-5 font-medium">
            <a href="https://github.com/DevMubzly" className="hover:underline">GitHub</a>
            <a href="https://www.X.com/TtnlxMubz/" className="hover:underline">Twitter</a>
            <a href="mailto:bmubs15@gmail.com" className="hover:underline">Email</a>
          </div>
        </footer>
      </motion.div>
    </main>
  );
}
