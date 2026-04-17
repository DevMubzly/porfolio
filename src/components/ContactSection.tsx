"use client";

import { motion } from "motion/react";
import { Github, Mail, ArrowUpRight } from "lucide-react";

export function ContactSection() {
  return (
    <section id="contact" className="relative z-[5] py-24 lg:py-32 px-6 lg:px-24 bg-[#F8F8F8] text-[#222222] rounded-t-[3rem] lg:rounded-t-[4rem] shadow-[0_-4px_24px_rgba(0,0,0,0.03)] flex flex-col justify-center -mt-8 lg:-mt-12">
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="space-y-24"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#E5E5E5] pb-12 gap-8">
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-light tracking-tight">
              Get in touch
            </h2>
            <p className="text-lg md:text-xl text-[#7B7B7B] font-light max-w-sm text-right">
              Available for opportunities or collaborations. Let's work together.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
            <a
              href="mailto:bmubs15@gmail.com"
              className="group flex items-center justify-between p-8 bg-white border border-[#E5E5E5] hover:border-[#222222] transition-colors"
            >
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 bg-[#F8F8F8] flex items-center justify-center rounded-full group-hover:bg-[#222222] group-hover:text-white transition-colors duration-500">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-medium text-[#7B7B7B] uppercase tracking-widest mb-1">Email</p>
                  <p className="text-xl lg:text-2xl font-light text-[#222222]">bmubs15@gmail.com</p>
                </div>
              </div>
              <div className="w-10 h-10 border border-[#E5E5E5] rounded-full flex items-center justify-center group-hover:bg-[#222222] group-hover:border-[#222222] transition-colors duration-500">
                <ArrowUpRight className="w-5 h-5 text-[#7B7B7B] group-hover:text-white transition-colors duration-500" />
              </div>
            </a>

            <a
              href="https://github.com/DevMubzly"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between p-8 bg-white border border-[#E5E5E5] hover:border-[#222222] transition-colors"
            >
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 bg-[#F8F8F8] flex items-center justify-center rounded-full group-hover:bg-[#222222] group-hover:text-white transition-colors duration-500">
                  <Github className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-medium text-[#7B7B7B] uppercase tracking-widest mb-1">GitHub</p>
                  <p className="text-xl lg:text-2xl font-light text-[#222222]">@DevMubzly</p>
                </div>
              </div>
              <div className="w-10 h-10 border border-[#E5E5E5] rounded-full flex items-center justify-center group-hover:bg-[#222222] group-hover:border-[#222222] transition-colors duration-500">
                <ArrowUpRight className="w-5 h-5 text-[#7B7B7B] group-hover:text-white transition-colors duration-500" />
              </div>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
