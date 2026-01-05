"use client";
import { useCallback, useEffect, useState } from "react";
import { FloatingBar, Tab } from "@/components/FloatingBar";
import { InfoSection } from "@/components/InfoSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { ArticlesSection } from "@/components/ArticlesSection";
import { motion } from "framer-motion";

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
