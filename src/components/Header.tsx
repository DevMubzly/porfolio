"use client";

import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { ArrowUpRight, Github, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

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
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-3 group focus:outline-none">
          <div className="w-6 h-6 border-[1.5px] border-[#222222] rounded flex items-center justify-center rotate-45 group-hover:bg-[#222222] transition-colors duration-300">
            <span className="w-2 h-2 bg-[#222222] rounded-full group-hover:bg-[#F8F8F8] transition-colors duration-300"></span>
          </div>
          <span className="text-6xl tracking-wide sr-only md:not-sr-only font-[family-name:var(--font-brooklyn)] pt-1">
            Balinda Mubarak
          </span>
        </button>

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
        <div className="flex items-center gap-4 lg:gap-6">
          <a
            href="https://github.com/DevMubzly"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:block text-[#7B7B7B] hover:text-[#222222] transition-colors"
            aria-label="GitHub"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href="https://wa.me/256771050357"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] sm:text-xs md:text-sm font-medium border-b border-[#222222] pb-0.5 hover:text-[#7B7B7B] hover:border-[#7B7B7B] transition-all flex items-center gap-1 uppercase tracking-wider"
          >
            WhatsApp <ArrowUpRight className="w-3 md:w-3.5 h-3 md:h-3.5" />
          </a>
          <button
            className="md:hidden p-2 -mr-2 text-[#222222] hover:text-[#7B7B7B] transition-colors"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open Menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.header>

    {/* Mobile Menu Overlay */}
    <AnimatePresence>
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: "-100%" }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] bg-white h-[100dvh] w-full flex flex-col px-6 py-8 pointer-events-auto overflow-y-auto"
        >
          {/* Top Bar for Mobile Menu */}
          <div className="flex items-center justify-between">
            <button onClick={() => { setIsMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="flex items-center gap-3 group focus:outline-none">
              <div className="w-6 h-6 border-[1.5px] border-[#222222] rounded flex items-center justify-center rotate-45 group-hover:bg-[#222222] transition-colors duration-300">
                <span className="w-2 h-2 bg-[#222222] rounded-full group-hover:bg-white transition-colors duration-300"></span>
              </div>
              <span className="text-xl tracking-wide font-[family-name:var(--font-brooklyn)] pt-1">
                Balinda Mubarak
              </span>
            </button>
            <button
              className="p-2 -mr-2 text-[#222222] hover:text-[#7B7B7B] transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close Menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Links */}
          <nav className="flex flex-col gap-8 mt-24">
            {navItems.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
              >
                <Link
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-4xl sm:text-5xl font-light text-[#222222] tracking-tight hover:text-[#7B7B7B] transition-colors inline-block"
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Bottom Socials */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-auto pt-12 flex items-center gap-6 border-t border-[#E5E5E5]"
          >
            <a
              href="https://github.com/DevMubzly"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#222222] hover:text-[#7B7B7B] transition-colors flex items-center gap-2 text-sm uppercase tracking-widest font-medium"
            >
              <Github className="w-4 h-4" /> GitHub
            </a>
            <a
              href="mailto:bmubs15@gmail.com"
              className="text-[#222222] hover:text-[#7B7B7B] transition-colors flex items-center gap-2 text-sm uppercase tracking-widest font-medium"
            >
              Email <ArrowUpRight className="w-4 h-4" />
            </a>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
  );
}
