"use client";

import { motion } from "motion/react";
import Image from "next/image";

export function HeroSection() {
  return (
    <section className="sticky top-0 z-[1] min-h-[100dvh] lg:h-screen w-full bg-[#F8F8F8] text-[#222222] font-sans flex flex-col justify-center pt-28 lg:pt-24 rounded-b-[3rem] lg:rounded-b-[4rem] shadow-sm overflow-hidden">
      {/* Side decorative texts */}
      <div className="absolute left-8 lg:left-16 top-1/2 -translate-y-1/2 -rotate-90 origin-left text-[#7B7B7B] text-xs tracking-widest uppercase hidden lg:block border-b border-[#E5E5E5] pb-4">
        Balinda Mubarak
      </div>
      <div className="absolute right-8 lg:right-16 top-1/2 -translate-y-1/2 rotate-90 origin-right text-[#7B7B7B] text-xs tracking-widest uppercase hidden lg:block border-b border-[#E5E5E5] pb-4">
        {new Date().getFullYear()} Edition
      </div>

      <div className="max-w-7xl mx-auto w-full px-6 lg:px-24 flex-1 flex flex-col justify-center relative z-10 py-12 lg:py-0">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full flex flex-col items-center text-center mt-10 md:mt-0"
        >
          {/* Main Heading with Inline Circular Image */}
          <h1 className="text-[3.5rem] sm:text-[5rem] md:text-[6.5rem] lg:text-[8rem] xl:text-[9rem] leading-[1.1] font-light tracking-tight mb-8">
            Hello, I'm{" "}
            <span className="inline-flex items-center justify-center align-middle mx-1 sm:mx-4">
              <div className="relative w-[50px] h-[50px] sm:w-[70px] sm:h-[70px] md:w-[90px] md:h-[90px] lg:w-[120px] lg:h-[120px] rounded-full overflow-hidden border border-[#E5E5E5] shadow-sm bg-white -rotate-6 hover:rotate-0 transition-transform duration-500 will-change-transform">
                <Image
                  src="/profile.png"
                  alt="Balinda Mubarak"
                  fill
                  sizes="(max-width: 640px) 50px, (max-width: 768px) 90px, 120px"
                  className="object-cover object-top scale-110"
                  priority
                />
              </div>
            </span>
            <br className="hidden sm:block" />
            Balinda.
          </h1>

          {/* Subtext */}
          <p className="text-lg sm:text-xl lg:text-2xl text-[#7B7B7B] font-light max-w-2xl mx-auto mt-2 px-4 leading-relaxed">
            An AI & software engineer crafting minimal, resilient systems.
          </p>

          {/* Stats Floating Pill Row at Bottom */}
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-12 lg:gap-16 mt-16 sm:mt-24 border border-[#E5E5E5] bg-white rounded-full px-8 sm:px-12 py-4 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
            <div className="flex items-center gap-3">
              <span className="text-2xl sm:text-3xl font-light text-[#222222]">3+</span>
              <span className="text-[9px] sm:text-[10px] text-[#7B7B7B] uppercase tracking-widest text-left leading-tight">Years<br/>Experience</span>
            </div>
            <div className="w-[1px] h-6 bg-[#E5E5E5]"></div>
            <div className="flex items-center gap-3">
              <span className="text-2xl sm:text-3xl font-light text-[#222222]">20+</span>
              <span className="text-[9px] sm:text-[10px] text-[#7B7B7B] uppercase tracking-widest text-left leading-tight">Projects<br/>Built</span>
            </div>
            <div className="hidden sm:block w-[1px] h-6 bg-[#E5E5E5]"></div>
            <div className="hidden sm:flex items-center gap-3">
              <span className="text-[10px] text-[#222222] uppercase tracking-widest font-medium">Scroll down</span>
              <div className="w-8 h-[1px] bg-[#222222]"></div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
