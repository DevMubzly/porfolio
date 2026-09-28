"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { articles } from "@/app/articles/articlesData";
import { ArrowUpRight } from "lucide-react";

export function ArticlesSection() {
  return (
    <section id="articles" className="py-16 lg:py-20 px-6 lg:px-24">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="space-y-10"
        >
          <div>
            <h2 className="text-xs font-semibold text-[var(--text-primary)] uppercase tracking-wider mb-4">
              Insights & Writing
            </h2>
            <p className="text-base text-[var(--text-muted)] font-light">
              Thoughts on development, engineering, and artificial intelligence.
            </p>
          </div>

          <div className="border-t border-[var(--border)]">
            {articles.map((article, index) => (
              <motion.div
                key={article.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <Link
                  href={`/articles/${article.slug}`}
                  className="group flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-5 border-b border-[var(--border)] last:border-b-0"
                >
                  <div className="flex-1 min-w-0 space-y-2">
                    <div className="flex items-center gap-3 text-xs text-[var(--text-muted)]">
                      <span className="font-medium">{article.tag}</span>
                      <span className="w-1 h-1 rounded-full bg-[var(--border)]"></span>
                      <span>{article.date}</span>
                      <span className="w-1 h-1 rounded-full bg-[var(--border)]"></span>
                      <span>{article.readTime}</span>
                    </div>
                    <h3 className="text-lg font-light text-[var(--text-primary)] group-hover:text-[var(--text-secondary)] transition-colors">
                      {article.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className="text-xs text-[var(--text-muted)] group-hover:text-[var(--text-primary)] transition-colors">
                      Read
                    </span>
                    <div className="w-8 h-8 rounded-full border border-[var(--border)] flex items-center justify-center group-hover:bg-[var(--text-primary)] group-hover:text-[var(--bg)] group-hover:border-[var(--text-primary)] transition-all duration-300">
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover:rotate-45 transition-transform duration-300" />
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
