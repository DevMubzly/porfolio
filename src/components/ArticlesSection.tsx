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

          <div className="grid md:grid-cols-2 gap-16 lg:gap-24">
            {articles.map((article, index) => (
              <motion.div
                key={article.slug}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link href={`/articles/${article.slug}`} className="block group">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <span className="text-xs font-medium text-[#222222] uppercase border border-[#E5E5E5] px-3 py-1 tracking-widest bg-[#F8F8F8]">
                        {article.tag}
                      </span>
                      <div className="flex items-center gap-2 text-xs font-medium text-[#7B7B7B] tracking-wider uppercase">
                        <span>{article.date}</span>
                        <span className="w-1 h-1 rounded-full bg-[#E5E5E5]"></span>
                        <span>{article.readTime}</span>
                      </div>
                    </div>
                    
                    <h3 className="text-2xl lg:text-3xl font-light text-[#222222] group-hover:text-[#7B7B7B] transition-colors duration-500 line-clamp-2">
                      {article.title}
                    </h3>
                    
                    <p className="text-base lg:text-lg text-[#7B7B7B] font-light line-clamp-3 leading-relaxed">
                      {article.description}
                    </p>

                    <div className="flex items-center text-sm font-medium text-[#222222] group-hover:opacity-60 transition-opacity gap-2 uppercase tracking-widest pt-2">
                      Read Article <ArrowUpRight className="w-4 h-4" />
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
