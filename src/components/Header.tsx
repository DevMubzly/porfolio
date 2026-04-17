"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ArrowUpRight, Github } from "lucide-react";
import { useState, useEffect } from "react";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // If we scroll down past 50px, become the floating pill
      if (currentScrollY > 50 && currentScrollY > lastScrollY) {
        setIsScrolled(true);
      } else {
        // If we scroll up, or are back at the top, revert to original
        setIsScrolled(false);
      }
      
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "About Me", href: "#about" },
    { label: "Portfolio", href: "#projects" },
    { label: "Articles", href: "#articles" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none">
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`pointer-events-auto transition-all duration-500 ease-out flex items-center justify-center ${
          isScrolled
            ? "w-[95%] max-w-6xl bg-white/95 backdrop-blur-md border border-[#E5E5E5] rounded-[3rem] px-6 lg:px-12 mt-6 h-[90px] lg:h-[100px] shadow-sm"
            : "w-full max-w-none bg-[#F8F8F8] border border-transparent px-6 lg:px-24 mt-0 h-[80px] lg:h-[90px] shadow-none rounded-none"
        }`}
      >
        <div className={`flex items-center justify-between text-[#222222] w-full transition-all duration-500 ${!isScrolled && "max-w-7xl"}`}>
        
        {/* Left Side: Logo/Name */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-6 h-6 border-[1.5px] border-[#222222] rounded flex items-center justify-center rotate-45 group-hover:bg-[#222222] transition-colors duration-300">
            <span className="w-2 h-2 bg-[#222222] rounded-full group-hover:bg-[#F8F8F8] transition-colors duration-300"></span>
          </div>
          <span className="text-sm font-medium tracking-wide sr-only md:not-sr-only">
            Balinda Mubarak
          </span>
        </Link>

        {/* Center: Navigation Navigation */}
        <nav className="hidden md:flex flex-1 items-center justify-center gap-8 lg:gap-12">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-xs lg:text-sm text-[#222222] hover:text-[#7B7B7B] transition-colors uppercase tracking-widest font-medium"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right Side: Action/Links */}
        <div className="flex items-center gap-6">
          <a
            href="https://github.com/DevMubzly"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#7B7B7B] hover:text-[#222222] transition-colors"
            aria-label="GitHub"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href="https://wa.me/256771050357"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs sm:text-sm font-medium border-b border-[#222222] pb-0.5 hover:text-[#7B7B7B] hover:border-[#7B7B7B] transition-all flex items-center gap-1 uppercase tracking-wider"
          >
            WhatsApp <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </motion.header>    </div>  );
}
