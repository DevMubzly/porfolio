"use client";

import { motion } from "motion/react";
import Image from "next/image";

export function HeroSection() {
  return (
    <section className="sticky top-0 z-[1] min-h-[100dvh] lg:h-screen w-full bg-[#F8F8F8] text-[#222222] font-sans flex flex-col justify-center lg:justify-end pt-28 lg:pt-24 rounded-b-[3rem] lg:rounded-b-[4rem] shadow-sm overflow-hidden">
      {/* Side decorative texts */}
      <div className="absolute left-8 lg:left-16 top-1/2 -translate-y-1/2 -rotate-90 origin-left text-[#7B7B7B] text-xs tracking-widest uppercase hidden lg:block">
        Full-Stack Developer
      </div>
      <div className="absolute left-8 lg:left-16 bottom-24 -rotate-90 origin-left text-[#7B7B7B] text-xs tracking-widest hidden lg:block">
        {new Date().getFullYear()}
      </div>

      <div className="max-w-7xl mx-auto w-full px-6 lg:px-24 flex-1 flex flex-col justify-center relative z-10">
        <div className="flex flex-col lg:flex-row items-end justify-between w-full relative">
          
          {/* Left Content Area */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 flex flex-col justify-center pt-8 sm:pt-12 lg:pt-0 pb-8 sm:pb-12 lg:pb-32 z-20 mt-10 md:mt-16 lg:mt-0"
          >
            {/* Stats */}
            <div className="flex flex-wrap gap-8 lg:gap-12 mb-12 sm:mb-16">
              <div>
                <div className="text-3xl lg:text-4xl font-light mb-1">3+</div>
                <div className="text-[10px] sm:text-[11px] text-[#7B7B7B] uppercase tracking-wider">Years Experience</div>
              </div>
              <div>
                <div className="text-3xl lg:text-4xl font-light mb-1">20+</div>
                <div className="text-[10px] sm:text-[11px] text-[#7B7B7B] uppercase tracking-wider">Projects Built</div>
              </div>
            </div>

            {/* Main Heading */}
            <h1 className="text-[5rem] sm:text-[7rem] md:text-[8rem] lg:text-[10rem] leading-none font-light tracking-tight mb-6">
              Hello.
            </h1>

            {/* Subtext */}
            <div className="text-base sm:text-lg lg:text-xl text-[#222222] font-light flex items-center gap-4">
              <span className="w-6 sm:w-8 h-[1px] bg-[#222222]"></span>
              <p>I'm Balinda, an AI & software engineer.</p>
            </div>

            {/* Scroll Down */}
            <div className="mt-24 flex items-center gap-4 hidden lg:flex">
              <span className="text-[10px] uppercase tracking-widest font-medium text-[#7B7B7B]">
                Scroll to explore
              </span>
              <div className="w-[1px] h-16 bg-[#E5E5E5] relative overflow-hidden">
                <motion.div 
                  initial={{ y: "-100%" }}
                  animate={{ y: "100%" }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                  className="absolute top-0 w-full h-1/2 bg-[#222222]" 
                />
              </div>
            </div>
          </motion.div>

          {/* Right Image Area */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="w-full lg:w-1/2 relative lg:translate-x-12 z-10 pointer-events-none flex justify-center lg:justify-end items-end mt-auto pt-8 lg:pt-0"
          >
            <div className="relative w-[280px] h-[350px] sm:w-[400px] sm:h-[500px] lg:w-[600px] lg:h-[700px] mx-auto lg:ml-auto select-none opacity-90 lg:opacity-100">
              <Image
                src="/profile.png"
                alt="Balinda Mubarak"
                fill
                sizes="(max-width: 640px) 280px, (max-width: 768px) 400px, 600px"
                className="object-contain object-bottom"
                priority
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
