"use client";

import { motion } from "motion/react";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { ArticlesSection } from "@/components/ArticlesSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F8F8F8]">
      <Header />

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <ArticlesSection />
        <ContactSection />
      </motion.main>

      <div className="relative z-50">
        <Footer />
      </div>
    </div>
  );
}
