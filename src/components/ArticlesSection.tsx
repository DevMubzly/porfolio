"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { articles } from "@/app/articles/articlesData";
import { ArrowUpRight } from "lucide-react";

export function ArticlesSection() {
  return (
    <section id="articles" className="relative z-[4] py-24 lg:py-32 px-6 lg:px-24 bg-white text-[#222222] rounded-t-[3rem] lg:rounded-t-[4rem] shadow-[0_-4px_24px_rgba(0,0,0,0.03)] flex flex-col justify-center -mt-8 lg:-mt-12">
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="space-y-16 lg:space-y-24"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between pb-12 lg:pb-16 gap-6 lg:gap-8">
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-light tracking-tight">
              Insights & Writing
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-[#7B7B7B] font-light max-w-sm md:text-right pb-2">
              Thoughts on development, engineering, and artificial intelligence.
            </p>
          </div>

          <div className="flex flex-col border-t border-[#E5E5E5]">
            {articles.map((article, index) => (
              <motion.div
                key={article.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link 
                  href={`/articles/${article.slug}`} 
                  className="group flex flex-col md:flex-row md:items-center justify-between py-8 lg:py-12 border-b border-[#E5E5E5] gap-6 hover:px-6 lg:hover:px-10 hover:bg-[#F8F8F8] transition-all duration-500 rounded-2xl md:-mx-6 lg:-mx-10"
                >
                  <div className="flex-1 max-w-4xl space-y-4">
                    <div className="flex items-center gap-3 text-[10px] lg:text-xs font-medium tracking-widest uppercase">
                      <span className="text-[#222222] px-3 py-1 bg-white border border-[#E5E5E5] rounded-full shadow-sm">
                        {article.tag}
                      </span>
                      <span className="text-[#7B7B7B]">{article.date}</span>
                      <span className="w-1 h-1 rounded-full bg-[#E5E5E5]"></span>
                      <span className="text-[#7B7B7B]">{article.readTime}</span>
                    </div>
                    
                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-light text-[#222222] group-hover:translate-x-2 transition-transform duration-500">
                      {article.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-4 mt-4 md:mt-0">
                    <span className="md:hidden text-xs uppercase tracking-widest text-[#7B7B7B] group-hover:text-[#222222] transition-colors duration-300">
                      Read Article
                    </span>
                    <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-full border border-[#E5E5E5] bg-white flex items-center justify-center group-hover:bg-[#222222] group-hover:text-white group-hover:border-[#222222] shadow-sm transition-all duration-500 flex-shrink-0">
                      <ArrowUpRight className="w-5 h-5 lg:w-6 lg:h-6 group-hover:rotate-45 transition-transform duration-500" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
