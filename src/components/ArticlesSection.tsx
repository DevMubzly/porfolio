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
          className="space-y-24"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#E5E5E5] pb-12 gap-8">
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-light tracking-tight">
              Insights & Writing
            </h2>
            <p className="text-lg md:text-xl text-[#7B7B7B] font-light max-w-sm text-right">
              Thoughts on development, engineering, and artificial intelligence.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 rounded-3xl overflow-hidden bg-[#F8F8F8] p-4 lg:p-8">
            {articles.map((article, index) => (
              <motion.div
                key={article.slug}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300 border border-[#E5E5E5] flex flex-col justify-between"
              >
                <Link href={`/articles/${article.slug}`} className="block group flex-grow">
                  <div className="space-y-6 flex flex-col h-full">
                    <div className="flex items-center gap-4 flex-wrap">
                      <span className="text-[10px] lg:text-xs font-medium text-[#222222] uppercase border border-[#E5E5E5] px-3 py-1 tracking-widest bg-[#F8F8F8] rounded-full">
                        {article.tag}
                      </span>
                      <div className="flex items-center gap-2 text-[10px] lg:text-xs font-medium text-[#7B7B7B] tracking-wider uppercase">
                        <span>{article.date}</span>
                        <span className="w-1 h-1 rounded-full bg-[#E5E5E5]"></span>
                        <span>{article.readTime}</span>
                      </div>
                    </div>
                    
                    <h3 className="text-xl lg:text-2xl font-light text-[#222222] group-hover:underline underline-offset-4 decoration-[#E5E5E5] transition-all duration-300 line-clamp-3">
                      {article.title}
                    </h3>
                    
                    <p className="text-sm lg:text-base text-[#7B7B7B] font-light line-clamp-3 leading-relaxed flex-grow">
                      {article.description}
                    </p>

                    <div className="flex items-center text-xs lg:text-sm font-medium text-[#222222] group-hover:text-[#7B7B7B] transition-colors gap-2 uppercase tracking-widest pt-4 mt-auto border-t border-[#E5E5E5]">
                      Read Article <ArrowUpRight className="w-4 h-4 ml-auto" />
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
